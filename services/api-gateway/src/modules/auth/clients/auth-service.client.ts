// gateway/src/modules/auth/clients/auth-service.client.ts
import {
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ServiceUrls } from '../../../config/service-urls.config';
import { LoginDto } from '../dtos/login.dto';
import { LearnerRegisterDto } from '../dtos/learner-register.dto';
import { MentorRegisterDto } from '../dtos/mentor-register.dto';

import { AuthLoginResponseDto ,  } from '../dtos/auth-login-response.dto';
import { UserResponseDto } from '../dtos';

@Injectable()
export class AuthServiceClient {
  private readonly logger = new Logger(AuthServiceClient.name);
  private readonly authServiceUrl =
    process.env.AUTH_SERVICE_URL || ServiceUrls.AUTH_SERVICE;

  constructor(private readonly http: HttpService) {}

  /**
   * REGISTER LEARNER
   * Gateway → Auth: POST /auth/register/learner
   */
  async registerLearner(dto: LearnerRegisterDto) {
    try {
      const res = await firstValueFrom(
        this.http.post(
          `${this.authServiceUrl}/auth/register/learner`,
          dto,
        ),
      );
      // Your auth controller returns { access_token, refresh_token, user } or just user?
      // Right now it returns whatever authService.registerLearner returns.
      return res.data;
    } catch (error: any) {
      this.logger.error(`registerLearner failed: ${error.message}`);

      if (error.response?.status === 409) {
        throw new HttpException(
          {
            status: 'error',
            code: 'USER_EXISTS',
            message: 'Email already registered',
          },
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        {
          status: 'error',
          code: 'AUTH_SERVICE_ERROR',
          message: 'Failed to register learner',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * REGISTER MENTOR
   * Gateway → Auth: POST /auth/register/mentor
   */
  async registerMentor(dto: MentorRegisterDto) {
    try {
      const res = await firstValueFrom(
        this.http.post(
          `${this.authServiceUrl}/auth/register/mentor`,
          dto,
        ),
      );
      return res.data;
    } catch (error: any) {
      this.logger.error(`registerMentor failed: ${error.message}`);

      if (error.response?.status === 409) {
        throw new HttpException(
          {
            status: 'error',
            code: 'USER_EXISTS',
            message: 'Email already registered',
          },
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        {
          status: 'error',
          code: 'AUTH_SERVICE_ERROR',
          message: 'Failed to register mentor',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * LOGIN
   * Gateway → Auth: POST /auth/login
   * Auth sets HTTP-only refresh cookie; gateway just forwards body.
   */
  async login(dto: LoginDto, headers: Record<string, string>): Promise<AuthLoginResponseDto> {
    try {
      const res = await firstValueFrom(
        this.http.post<AuthLoginResponseDto>(
          `${this.authServiceUrl}/auth/login`,
          dto,
          {
            // Forward user-agent, x-forwarded-for if you want
            headers,
            // Include cookies if gateway and auth share domain/origin (optional):
            withCredentials: true,
          },
        ),
      );
      return res.data;
    } catch (error: any) {
      this.logger.error(`login failed: ${error.message}`);

      if (error.response?.status === 401) {
        throw new HttpException(
          {
            status: 'error',
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      throw new HttpException(
        {
          status: 'error',
          code: 'AUTH_SERVICE_ERROR',
          message: 'Failed to login',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * REFRESH
   * Your Auth service reads refresh_token from cookie (server-side).
   * From gateway we usually just forward the request with cookies.
   */
  async refresh(headers: Record<string, string>) {
    try {
      const res = await firstValueFrom(
        this.http.post<AuthLoginResponseDto>(
          `${this.authServiceUrl}/auth/refresh`,
          {},
          {
            headers,
            withCredentials: true,
          },
        ),
      );
      return res.data;
    } catch (error: any) {
      this.logger.error(`refresh failed: ${error.message}`);

      if (error.response?.status === 401) {
        throw new HttpException(
          {
            status: 'error',
            code: 'TOKEN_EXPIRED',
            message: 'Refresh token expired or invalid',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      throw new HttpException(
        {
          status: 'error',
          code: 'AUTH_SERVICE_ERROR',
          message: 'Failed to refresh token',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * LOGOUT
   * Auth service clears refresh cookie and revokes refresh token.
   */
  async logout(headers: Record<string, string>) {
    try {
      await firstValueFrom(
        this.http.post(
          `${this.authServiceUrl}/auth/logout`,
          {},
          {
            headers,
            withCredentials: true,
          },
        ),
      );
      return;
    } catch (error: any) {
      this.logger.error(`logout failed: ${error.message}`);

      throw new HttpException(
        {
          status: 'error',
          code: 'AUTH_SERVICE_ERROR',
          message: 'Failed to logout',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET /auth/:id (find user)
   */
  async getUserById(id: number, headers: Record<string, string>) {
    try {
      const res = await firstValueFrom(
        this.http.get<UserResponseDto>(
          `${this.authServiceUrl}/auth/${id}`,
          {
            headers,
            withCredentials: true,
          },
        ),
      );
      return res.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new HttpException(
          {
            status: 'error',
            code: 'USER_NOT_FOUND',
            message: `User with ID ${id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      this.logger.error(`getUserById failed: ${error.message}`);
      throw new HttpException(
        {
          status: 'error',
          code: 'AUTH_SERVICE_ERROR',
          message: 'Failed to fetch user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Forgot / reset password can also be proxied if you want them in gateway
   */
  async forgotPassword(payload: any) {
    try {
      const res = await firstValueFrom(
        this.http.post(
          `${this.authServiceUrl}/auth/forgot-password`,
          payload,
        ),
      );
      return res.data;
    } catch (error: any) {
      this.logger.error(`forgotPassword failed: ${error.message}`);
      throw new HttpException(
        {
          status: 'error',
          code: 'AUTH_SERVICE_ERROR',
          message: 'Failed to send reset email',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async resetPassword(payload: any) {
    try {
      const res = await firstValueFrom(
        this.http.post(
          `${this.authServiceUrl}/auth/reset-password`,
          payload,
        ),
      );
      return res.data;
    } catch (error: any) {
      this.logger.error(`resetPassword failed: ${error.message}`);
      throw new HttpException(
        {
          status: 'error',
          code: 'AUTH_SERVICE_ERROR',
          message: 'Failed to reset password',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}