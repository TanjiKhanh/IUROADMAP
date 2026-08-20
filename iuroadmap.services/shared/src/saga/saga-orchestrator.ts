import { Logger } from '@nestjs/common';
import { SagaStep } from './saga-step.interface';

export interface SagaExecutionResult<TContext> {
  success: boolean;
  context: TContext;
  executedSteps: string[];
  compensatedSteps?: string[];
  error?: Error;
}

/**
 * Generic Saga Orchestrator engine.
 * Coordinates multi-step distributed transactions across microservices.
 * Automatically triggers reverse compensation (rollback) if any step fails.
 */
export class SagaOrchestrator<TContext> {
  private readonly steps: SagaStep<TContext>[] = [];
  private readonly logger: Logger;

  constructor(sagaName = 'SagaOrchestrator') {
    this.logger = new Logger(sagaName);
  }

  /**
   * Registers a new step to the saga pipeline.
   * @param step The step implementing execute and compensate
   */
  addStep(step: SagaStep<TContext>): this {
    this.steps.push(step);
    return this;
  }

  /**
   * Executes all registered steps in order.
   * If any step fails, compensates all previously executed steps in reverse order.
   * @param context Initial context for the saga
   * @returns SagaExecutionResult containing final context or error details
   */
  async execute(context: TContext): Promise<SagaExecutionResult<TContext>> {
    const executedSteps: SagaStep<TContext>[] = [];

    this.logger.log(`Starting Saga execution with ${this.steps.length} steps`);

    for (const step of this.steps) {
      try {
        this.logger.log(`[Step: ${step.name}] Executing...`);
        await step.execute(context);
        executedSteps.push(step);
        this.logger.log(`[Step: ${step.name}] Completed successfully.`);
      } catch (stepError: any) {
        this.logger.error(
          `[Step: ${step.name}] Failed: ${stepError.message}. Initiating rollback compensation...`,
          stepError.stack,
        );

        const compensatedNames = await this.rollback(executedSteps, context);

        return {
          success: false,
          context,
          executedSteps: executedSteps.map((s) => s.name),
          compensatedSteps: compensatedNames,
          error: stepError,
        };
      }
    }

    this.logger.log(`Saga completed successfully!`);

    return {
      success: true,
      context,
      executedSteps: executedSteps.map((s) => s.name),
    };
  }

  /**
   * Performs reverse compensation for all completed steps.
   */
  private async rollback(
    executedSteps: SagaStep<TContext>[],
    context: TContext,
  ): Promise<string[]> {
    const compensatedSteps: string[] = [];
    const reversedSteps = [...executedSteps].reverse();

    for (const step of reversedSteps) {
      try {
        this.logger.warn(`[Compensate: ${step.name}] Rolling back step...`);
        await step.compensate(context);
        compensatedSteps.push(step.name);
        this.logger.warn(`[Compensate: ${step.name}] Rollback successful.`);
      } catch (compensationError: any) {
        this.logger.error(
          `[Compensate: ${step.name}] CRITICAL: Compensation failed: ${compensationError.message}`,
          compensationError.stack,
        );
        // Continue compensating remaining steps even if one fails
      }
    }

    return compensatedSteps;
  }
}
