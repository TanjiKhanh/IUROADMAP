import { Injectable, Logger, ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SagaOrchestrator, SagaStep, AccountStatus, MentorClientService } from '@iuroadmap/shared';
import { UsersService } from '../../users/services/users.service';
import { MentorRegisterRequestDto } from '../dto/requests/mentor-register.request.dto';

export interface RegisterMentorSagaContext {
  dto: MentorRegisterRequestDto;
  createdUser?: any;
  mentorProfileCreated?: boolean;
}

@Injectable()
export class RegisterMentorSaga {
  private readonly logger = new Logger(RegisterMentorSaga.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly mentorClientService: MentorClientService,
  ) {}

  async execute(dto: MentorRegisterRequestDto): Promise<any> {
    const orchestrator = new SagaOrchestrator<RegisterMentorSagaContext>('RegisterMentorSaga');

    // ----------------------------------------------------
    // STEP 1: Create User in Auth Database
    // ----------------------------------------------------
    const createAuthUserStep: SagaStep<RegisterMentorSagaContext> = {
      name: 'CreateAuthUserStep',
      execute: async (context) => {
        const existing = await this.usersService.findByEmail(context.dto.email);
        if (existing) {
          throw new ConflictException('User already exists');
        }

        const hashed = await bcrypt.hash(context.dto.password, 10);
        const created = await this.usersService.createUser({
          email: context.dto.email,
          password: hashed,
          role: {
            connectOrCreate: {
              where: { name: context.dto.role || 'MENTOR' },
              create: { name: context.dto.role || 'MENTOR' },
            },
          },
          name: context.dto.name,
          status: AccountStatus.PENDING_APPROVAL,
        } as any);

        context.createdUser = created;
      },
      compensate: async (context) => {
        if (context.createdUser?.id) {
          this.logger.warn(`[Saga Compensate] Deleting created user with ID: ${context.createdUser.id}`);
          try {
            await this.usersService.delete(context.createdUser.id);
            this.logger.log(`[Saga Compensate] User ${context.createdUser.id} successfully removed.`);
          } catch (delError: any) {
            this.logger.error(`[Saga Compensate] Failed to delete user ${context.createdUser.id}: ${delError.message}`);
          }
        }
      },
    };

    // ----------------------------------------------------
    // STEP 2: Create Mentor Profile in Mentor Service
    // ----------------------------------------------------
    const createMentorProfileStep: SagaStep<RegisterMentorSagaContext> = {
      name: 'CreateMentorProfileStep',
      execute: async (context) => {
        if (!context.createdUser?.id) {
          throw new InternalServerErrorException('Cannot create mentor profile without user ID');
        }

        await this.mentorClientService.createMentorProfile(context.createdUser.id, {
          cvUrl: context.dto.cvUrl,
          linkedinUrl: context.dto.linkedinUrl,
          industry: context.dto.industry,
          skills: context.dto.skills,
          bio: context.dto.bio,
        });

        context.mentorProfileCreated = true;
      },
      compensate: async (context) => {
        if (context.mentorProfileCreated && context.createdUser?.id) {
          this.logger.warn(`[Saga Compensate] Deleting mentor profile for user ID: ${context.createdUser.id}`);
          try {
            await this.mentorClientService.deleteMentorProfile(context.createdUser.id);
            this.logger.log(`[Saga Compensate] Mentor profile for user ${context.createdUser.id} successfully removed.`);
          } catch (compError: any) {
            this.logger.error(`[Saga Compensate] Failed to delete mentor profile: ${compError.message}`);
          }
        }
      },
    };

    orchestrator.addStep(createAuthUserStep).addStep(createMentorProfileStep);

    const context: RegisterMentorSagaContext = { dto };
    const result = await orchestrator.execute(context);

    if (!result.success) {
      throw result.error || new InternalServerErrorException('Mentor registration saga failed');
    }

    const { password, ...safe } = result.context.createdUser;
    return safe;
  }
}
