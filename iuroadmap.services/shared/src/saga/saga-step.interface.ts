/**
 * Interface representing an individual step in a Saga.
 * Every step must implement both execute (forward action) and compensate (rollback/undo action).
 */
export interface SagaStep<TContext> {
  /**
   * Descriptive name of the step for logging and debugging
   */
  readonly name: string;

  /**
   * Executes the forward business logic of this step.
   * Modifies the context with output data if needed.
   * @param context Shared state passed between saga steps
   */
  execute(context: TContext): Promise<void>;

  /**
   * Compensating transaction: Undoes the effects of this step if subsequent steps fail.
   * Must be idempotent and safe to retry.
   * @param context Shared state containing data created during execution
   */
  compensate(context: TContext): Promise<void>;
}
