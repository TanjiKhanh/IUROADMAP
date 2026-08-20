
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions

export type PrismaPromise<T> = $Public.PrismaPromise<T>


export type USER_ROADMAPS_PROGRESSPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "USER_ROADMAPS_PROGRESS"
  objects: {
    userNodeProgress: USER_NODE_PROGRESSPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: number
    user_id: number
    roadmap_id: number
    enrollment_status: EnrollmentStatus
    completion_percentage: number
    total_credits_earned: number
    total_credits_required: number
    created_at: Date
    updated_at: Date
  }, ExtArgs["result"]["uSER_ROADMAPS_PROGRESS"]>
  composites: {}
}

/**
 * Model USER_ROADMAPS_PROGRESS
 * 
 */
export type USER_ROADMAPS_PROGRESS = runtime.Types.DefaultSelection<USER_ROADMAPS_PROGRESSPayload>
export type USER_NODE_PROGRESSPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "USER_NODE_PROGRESS"
  objects: {
    userRoadmap: USER_ROADMAPS_PROGRESSPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: number
    user_roadmap_id: number
    course_node_id: number
    status: NodeProgressStatus
    credits_earned: number
    created_at: Date
    updated_at: Date
  }, ExtArgs["result"]["uSER_NODE_PROGRESS"]>
  composites: {}
}

/**
 * Model USER_NODE_PROGRESS
 * 
 */
export type USER_NODE_PROGRESS = runtime.Types.DefaultSelection<USER_NODE_PROGRESSPayload>

/**
 * Enums
 */

export const EnrollmentStatus: {
  ENROLLED: 'ENROLLED',
  COMPLETED: 'COMPLETED',
  DROPPED: 'DROPPED'
};

export type EnrollmentStatus = (typeof EnrollmentStatus)[keyof typeof EnrollmentStatus]


export const NodeProgressStatus: {
  AVAILABLE: 'AVAILABLE',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED'
};

export type NodeProgressStatus = (typeof NodeProgressStatus)[keyof typeof NodeProgressStatus]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more USER_ROADMAPS_PROGRESSES
 * const uSER_ROADMAPS_PROGRESSES = await prisma.uSER_ROADMAPS_PROGRESS.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false,
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more USER_ROADMAPS_PROGRESSES
   * const uSER_ROADMAPS_PROGRESSES = await prisma.uSER_ROADMAPS_PROGRESS.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.uSER_ROADMAPS_PROGRESS`: Exposes CRUD operations for the **USER_ROADMAPS_PROGRESS** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more USER_ROADMAPS_PROGRESSES
    * const uSER_ROADMAPS_PROGRESSES = await prisma.uSER_ROADMAPS_PROGRESS.findMany()
    * ```
    */
  get uSER_ROADMAPS_PROGRESS(): Prisma.USER_ROADMAPS_PROGRESSDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.uSER_NODE_PROGRESS`: Exposes CRUD operations for the **USER_NODE_PROGRESS** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more USER_NODE_PROGRESSES
    * const uSER_NODE_PROGRESSES = await prisma.uSER_NODE_PROGRESS.findMany()
    * ```
    */
  get uSER_NODE_PROGRESS(): Prisma.USER_NODE_PROGRESSDelegate<GlobalReject, ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export type Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export type Args<T, F extends $Public.Operation> = $Public.Args<T, F>
  export type Payload<T, F extends $Public.Operation> = $Public.Payload<T, F>
  export type Result<T, A, F extends $Public.Operation> = $Public.Result<T, A, F>
  export type Exact<T, W> = $Public.Exact<T, W>

  /**
   * Prisma Client JS version: 4.16.2
   * Query Engine version: 4bc8b6e1b66cb932731fb1bdbbc550d1e010de81
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    USER_ROADMAPS_PROGRESS: 'USER_ROADMAPS_PROGRESS',
    USER_NODE_PROGRESS: 'USER_NODE_PROGRESS'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.Args}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'uSER_ROADMAPS_PROGRESS' | 'uSER_NODE_PROGRESS'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      USER_ROADMAPS_PROGRESS: {
        payload: USER_ROADMAPS_PROGRESSPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.USER_ROADMAPS_PROGRESSFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<USER_ROADMAPS_PROGRESSPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.USER_ROADMAPS_PROGRESSFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<USER_ROADMAPS_PROGRESSPayload>
          }
          findFirst: {
            args: Prisma.USER_ROADMAPS_PROGRESSFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<USER_ROADMAPS_PROGRESSPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.USER_ROADMAPS_PROGRESSFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<USER_ROADMAPS_PROGRESSPayload>
          }
          findMany: {
            args: Prisma.USER_ROADMAPS_PROGRESSFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<USER_ROADMAPS_PROGRESSPayload>[]
          }
          create: {
            args: Prisma.USER_ROADMAPS_PROGRESSCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<USER_ROADMAPS_PROGRESSPayload>
          }
          createMany: {
            args: Prisma.USER_ROADMAPS_PROGRESSCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.USER_ROADMAPS_PROGRESSDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<USER_ROADMAPS_PROGRESSPayload>
          }
          update: {
            args: Prisma.USER_ROADMAPS_PROGRESSUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<USER_ROADMAPS_PROGRESSPayload>
          }
          deleteMany: {
            args: Prisma.USER_ROADMAPS_PROGRESSDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.USER_ROADMAPS_PROGRESSUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.USER_ROADMAPS_PROGRESSUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<USER_ROADMAPS_PROGRESSPayload>
          }
          aggregate: {
            args: Prisma.USER_ROADMAPS_PROGRESSAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUSER_ROADMAPS_PROGRESS>
          }
          groupBy: {
            args: Prisma.USER_ROADMAPS_PROGRESSGroupByArgs<ExtArgs>,
            result: $Utils.Optional<USER_ROADMAPS_PROGRESSGroupByOutputType>[]
          }
          count: {
            args: Prisma.USER_ROADMAPS_PROGRESSCountArgs<ExtArgs>,
            result: $Utils.Optional<USER_ROADMAPS_PROGRESSCountAggregateOutputType> | number
          }
        }
      }
      USER_NODE_PROGRESS: {
        payload: USER_NODE_PROGRESSPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.USER_NODE_PROGRESSFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<USER_NODE_PROGRESSPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.USER_NODE_PROGRESSFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<USER_NODE_PROGRESSPayload>
          }
          findFirst: {
            args: Prisma.USER_NODE_PROGRESSFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<USER_NODE_PROGRESSPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.USER_NODE_PROGRESSFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<USER_NODE_PROGRESSPayload>
          }
          findMany: {
            args: Prisma.USER_NODE_PROGRESSFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<USER_NODE_PROGRESSPayload>[]
          }
          create: {
            args: Prisma.USER_NODE_PROGRESSCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<USER_NODE_PROGRESSPayload>
          }
          createMany: {
            args: Prisma.USER_NODE_PROGRESSCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.USER_NODE_PROGRESSDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<USER_NODE_PROGRESSPayload>
          }
          update: {
            args: Prisma.USER_NODE_PROGRESSUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<USER_NODE_PROGRESSPayload>
          }
          deleteMany: {
            args: Prisma.USER_NODE_PROGRESSDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.USER_NODE_PROGRESSUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.USER_NODE_PROGRESSUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<USER_NODE_PROGRESSPayload>
          }
          aggregate: {
            args: Prisma.USER_NODE_PROGRESSAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUSER_NODE_PROGRESS>
          }
          groupBy: {
            args: Prisma.USER_NODE_PROGRESSGroupByArgs<ExtArgs>,
            result: $Utils.Optional<USER_NODE_PROGRESSGroupByOutputType>[]
          }
          count: {
            args: Prisma.USER_NODE_PROGRESSCountArgs<ExtArgs>,
            result: $Utils.Optional<USER_NODE_PROGRESSCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type USER_ROADMAPS_PROGRESSCountOutputType
   */


  export type USER_ROADMAPS_PROGRESSCountOutputType = {
    userNodeProgress: number
  }

  export type USER_ROADMAPS_PROGRESSCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    userNodeProgress?: boolean | USER_ROADMAPS_PROGRESSCountOutputTypeCountUserNodeProgressArgs
  }

  // Custom InputTypes

  /**
   * USER_ROADMAPS_PROGRESSCountOutputType without action
   */
  export type USER_ROADMAPS_PROGRESSCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the USER_ROADMAPS_PROGRESSCountOutputType
     */
    select?: USER_ROADMAPS_PROGRESSCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * USER_ROADMAPS_PROGRESSCountOutputType without action
   */
  export type USER_ROADMAPS_PROGRESSCountOutputTypeCountUserNodeProgressArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: USER_NODE_PROGRESSWhereInput
  }



  /**
   * Models
   */

  /**
   * Model USER_ROADMAPS_PROGRESS
   */


  export type AggregateUSER_ROADMAPS_PROGRESS = {
    _count: USER_ROADMAPS_PROGRESSCountAggregateOutputType | null
    _avg: USER_ROADMAPS_PROGRESSAvgAggregateOutputType | null
    _sum: USER_ROADMAPS_PROGRESSSumAggregateOutputType | null
    _min: USER_ROADMAPS_PROGRESSMinAggregateOutputType | null
    _max: USER_ROADMAPS_PROGRESSMaxAggregateOutputType | null
  }

  export type USER_ROADMAPS_PROGRESSAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    roadmap_id: number | null
    completion_percentage: number | null
    total_credits_earned: number | null
    total_credits_required: number | null
  }

  export type USER_ROADMAPS_PROGRESSSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    roadmap_id: number | null
    completion_percentage: number | null
    total_credits_earned: number | null
    total_credits_required: number | null
  }

  export type USER_ROADMAPS_PROGRESSMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    roadmap_id: number | null
    enrollment_status: EnrollmentStatus | null
    completion_percentage: number | null
    total_credits_earned: number | null
    total_credits_required: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type USER_ROADMAPS_PROGRESSMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    roadmap_id: number | null
    enrollment_status: EnrollmentStatus | null
    completion_percentage: number | null
    total_credits_earned: number | null
    total_credits_required: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type USER_ROADMAPS_PROGRESSCountAggregateOutputType = {
    id: number
    user_id: number
    roadmap_id: number
    enrollment_status: number
    completion_percentage: number
    total_credits_earned: number
    total_credits_required: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type USER_ROADMAPS_PROGRESSAvgAggregateInputType = {
    id?: true
    user_id?: true
    roadmap_id?: true
    completion_percentage?: true
    total_credits_earned?: true
    total_credits_required?: true
  }

  export type USER_ROADMAPS_PROGRESSSumAggregateInputType = {
    id?: true
    user_id?: true
    roadmap_id?: true
    completion_percentage?: true
    total_credits_earned?: true
    total_credits_required?: true
  }

  export type USER_ROADMAPS_PROGRESSMinAggregateInputType = {
    id?: true
    user_id?: true
    roadmap_id?: true
    enrollment_status?: true
    completion_percentage?: true
    total_credits_earned?: true
    total_credits_required?: true
    created_at?: true
    updated_at?: true
  }

  export type USER_ROADMAPS_PROGRESSMaxAggregateInputType = {
    id?: true
    user_id?: true
    roadmap_id?: true
    enrollment_status?: true
    completion_percentage?: true
    total_credits_earned?: true
    total_credits_required?: true
    created_at?: true
    updated_at?: true
  }

  export type USER_ROADMAPS_PROGRESSCountAggregateInputType = {
    id?: true
    user_id?: true
    roadmap_id?: true
    enrollment_status?: true
    completion_percentage?: true
    total_credits_earned?: true
    total_credits_required?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type USER_ROADMAPS_PROGRESSAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which USER_ROADMAPS_PROGRESS to aggregate.
     */
    where?: USER_ROADMAPS_PROGRESSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of USER_ROADMAPS_PROGRESSES to fetch.
     */
    orderBy?: Enumerable<USER_ROADMAPS_PROGRESSOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: USER_ROADMAPS_PROGRESSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` USER_ROADMAPS_PROGRESSES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` USER_ROADMAPS_PROGRESSES.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned USER_ROADMAPS_PROGRESSES
    **/
    _count?: true | USER_ROADMAPS_PROGRESSCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: USER_ROADMAPS_PROGRESSAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: USER_ROADMAPS_PROGRESSSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: USER_ROADMAPS_PROGRESSMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: USER_ROADMAPS_PROGRESSMaxAggregateInputType
  }

  export type GetUSER_ROADMAPS_PROGRESSAggregateType<T extends USER_ROADMAPS_PROGRESSAggregateArgs> = {
        [P in keyof T & keyof AggregateUSER_ROADMAPS_PROGRESS]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUSER_ROADMAPS_PROGRESS[P]>
      : GetScalarType<T[P], AggregateUSER_ROADMAPS_PROGRESS[P]>
  }




  export type USER_ROADMAPS_PROGRESSGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: USER_ROADMAPS_PROGRESSWhereInput
    orderBy?: Enumerable<USER_ROADMAPS_PROGRESSOrderByWithAggregationInput>
    by: USER_ROADMAPS_PROGRESSScalarFieldEnum[]
    having?: USER_ROADMAPS_PROGRESSScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: USER_ROADMAPS_PROGRESSCountAggregateInputType | true
    _avg?: USER_ROADMAPS_PROGRESSAvgAggregateInputType
    _sum?: USER_ROADMAPS_PROGRESSSumAggregateInputType
    _min?: USER_ROADMAPS_PROGRESSMinAggregateInputType
    _max?: USER_ROADMAPS_PROGRESSMaxAggregateInputType
  }


  export type USER_ROADMAPS_PROGRESSGroupByOutputType = {
    id: number
    user_id: number
    roadmap_id: number
    enrollment_status: EnrollmentStatus
    completion_percentage: number
    total_credits_earned: number
    total_credits_required: number
    created_at: Date
    updated_at: Date
    _count: USER_ROADMAPS_PROGRESSCountAggregateOutputType | null
    _avg: USER_ROADMAPS_PROGRESSAvgAggregateOutputType | null
    _sum: USER_ROADMAPS_PROGRESSSumAggregateOutputType | null
    _min: USER_ROADMAPS_PROGRESSMinAggregateOutputType | null
    _max: USER_ROADMAPS_PROGRESSMaxAggregateOutputType | null
  }

  type GetUSER_ROADMAPS_PROGRESSGroupByPayload<T extends USER_ROADMAPS_PROGRESSGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<USER_ROADMAPS_PROGRESSGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof USER_ROADMAPS_PROGRESSGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], USER_ROADMAPS_PROGRESSGroupByOutputType[P]>
            : GetScalarType<T[P], USER_ROADMAPS_PROGRESSGroupByOutputType[P]>
        }
      >
    >


  export type USER_ROADMAPS_PROGRESSSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    roadmap_id?: boolean
    enrollment_status?: boolean
    completion_percentage?: boolean
    total_credits_earned?: boolean
    total_credits_required?: boolean
    created_at?: boolean
    updated_at?: boolean
    userNodeProgress?: boolean | USER_ROADMAPS_PROGRESS$userNodeProgressArgs<ExtArgs>
    _count?: boolean | USER_ROADMAPS_PROGRESSCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["uSER_ROADMAPS_PROGRESS"]>

  export type USER_ROADMAPS_PROGRESSSelectScalar = {
    id?: boolean
    user_id?: boolean
    roadmap_id?: boolean
    enrollment_status?: boolean
    completion_percentage?: boolean
    total_credits_earned?: boolean
    total_credits_required?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type USER_ROADMAPS_PROGRESSInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    userNodeProgress?: boolean | USER_ROADMAPS_PROGRESS$userNodeProgressArgs<ExtArgs>
    _count?: boolean | USER_ROADMAPS_PROGRESSCountOutputTypeArgs<ExtArgs>
  }


  type USER_ROADMAPS_PROGRESSGetPayload<S extends boolean | null | undefined | USER_ROADMAPS_PROGRESSArgs> = $Types.GetResult<USER_ROADMAPS_PROGRESSPayload, S>

  type USER_ROADMAPS_PROGRESSCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<USER_ROADMAPS_PROGRESSFindManyArgs, 'select' | 'include'> & {
      select?: USER_ROADMAPS_PROGRESSCountAggregateInputType | true
    }

  export interface USER_ROADMAPS_PROGRESSDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['USER_ROADMAPS_PROGRESS'], meta: { name: 'USER_ROADMAPS_PROGRESS' } }
    /**
     * Find zero or one USER_ROADMAPS_PROGRESS that matches the filter.
     * @param {USER_ROADMAPS_PROGRESSFindUniqueArgs} args - Arguments to find a USER_ROADMAPS_PROGRESS
     * @example
     * // Get one USER_ROADMAPS_PROGRESS
     * const uSER_ROADMAPS_PROGRESS = await prisma.uSER_ROADMAPS_PROGRESS.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends USER_ROADMAPS_PROGRESSFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, USER_ROADMAPS_PROGRESSFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'USER_ROADMAPS_PROGRESS'> extends True ? Prisma__USER_ROADMAPS_PROGRESSClient<$Types.GetResult<USER_ROADMAPS_PROGRESSPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__USER_ROADMAPS_PROGRESSClient<$Types.GetResult<USER_ROADMAPS_PROGRESSPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one USER_ROADMAPS_PROGRESS that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {USER_ROADMAPS_PROGRESSFindUniqueOrThrowArgs} args - Arguments to find a USER_ROADMAPS_PROGRESS
     * @example
     * // Get one USER_ROADMAPS_PROGRESS
     * const uSER_ROADMAPS_PROGRESS = await prisma.uSER_ROADMAPS_PROGRESS.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends USER_ROADMAPS_PROGRESSFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, USER_ROADMAPS_PROGRESSFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__USER_ROADMAPS_PROGRESSClient<$Types.GetResult<USER_ROADMAPS_PROGRESSPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first USER_ROADMAPS_PROGRESS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {USER_ROADMAPS_PROGRESSFindFirstArgs} args - Arguments to find a USER_ROADMAPS_PROGRESS
     * @example
     * // Get one USER_ROADMAPS_PROGRESS
     * const uSER_ROADMAPS_PROGRESS = await prisma.uSER_ROADMAPS_PROGRESS.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends USER_ROADMAPS_PROGRESSFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, USER_ROADMAPS_PROGRESSFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'USER_ROADMAPS_PROGRESS'> extends True ? Prisma__USER_ROADMAPS_PROGRESSClient<$Types.GetResult<USER_ROADMAPS_PROGRESSPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__USER_ROADMAPS_PROGRESSClient<$Types.GetResult<USER_ROADMAPS_PROGRESSPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first USER_ROADMAPS_PROGRESS that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {USER_ROADMAPS_PROGRESSFindFirstOrThrowArgs} args - Arguments to find a USER_ROADMAPS_PROGRESS
     * @example
     * // Get one USER_ROADMAPS_PROGRESS
     * const uSER_ROADMAPS_PROGRESS = await prisma.uSER_ROADMAPS_PROGRESS.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends USER_ROADMAPS_PROGRESSFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, USER_ROADMAPS_PROGRESSFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__USER_ROADMAPS_PROGRESSClient<$Types.GetResult<USER_ROADMAPS_PROGRESSPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more USER_ROADMAPS_PROGRESSES that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {USER_ROADMAPS_PROGRESSFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all USER_ROADMAPS_PROGRESSES
     * const uSER_ROADMAPS_PROGRESSES = await prisma.uSER_ROADMAPS_PROGRESS.findMany()
     * 
     * // Get first 10 USER_ROADMAPS_PROGRESSES
     * const uSER_ROADMAPS_PROGRESSES = await prisma.uSER_ROADMAPS_PROGRESS.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const uSER_ROADMAPS_PROGRESSWithIdOnly = await prisma.uSER_ROADMAPS_PROGRESS.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends USER_ROADMAPS_PROGRESSFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, USER_ROADMAPS_PROGRESSFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<USER_ROADMAPS_PROGRESSPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a USER_ROADMAPS_PROGRESS.
     * @param {USER_ROADMAPS_PROGRESSCreateArgs} args - Arguments to create a USER_ROADMAPS_PROGRESS.
     * @example
     * // Create one USER_ROADMAPS_PROGRESS
     * const USER_ROADMAPS_PROGRESS = await prisma.uSER_ROADMAPS_PROGRESS.create({
     *   data: {
     *     // ... data to create a USER_ROADMAPS_PROGRESS
     *   }
     * })
     * 
    **/
    create<T extends USER_ROADMAPS_PROGRESSCreateArgs<ExtArgs>>(
      args: SelectSubset<T, USER_ROADMAPS_PROGRESSCreateArgs<ExtArgs>>
    ): Prisma__USER_ROADMAPS_PROGRESSClient<$Types.GetResult<USER_ROADMAPS_PROGRESSPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many USER_ROADMAPS_PROGRESSES.
     *     @param {USER_ROADMAPS_PROGRESSCreateManyArgs} args - Arguments to create many USER_ROADMAPS_PROGRESSES.
     *     @example
     *     // Create many USER_ROADMAPS_PROGRESSES
     *     const uSER_ROADMAPS_PROGRESS = await prisma.uSER_ROADMAPS_PROGRESS.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends USER_ROADMAPS_PROGRESSCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, USER_ROADMAPS_PROGRESSCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a USER_ROADMAPS_PROGRESS.
     * @param {USER_ROADMAPS_PROGRESSDeleteArgs} args - Arguments to delete one USER_ROADMAPS_PROGRESS.
     * @example
     * // Delete one USER_ROADMAPS_PROGRESS
     * const USER_ROADMAPS_PROGRESS = await prisma.uSER_ROADMAPS_PROGRESS.delete({
     *   where: {
     *     // ... filter to delete one USER_ROADMAPS_PROGRESS
     *   }
     * })
     * 
    **/
    delete<T extends USER_ROADMAPS_PROGRESSDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, USER_ROADMAPS_PROGRESSDeleteArgs<ExtArgs>>
    ): Prisma__USER_ROADMAPS_PROGRESSClient<$Types.GetResult<USER_ROADMAPS_PROGRESSPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one USER_ROADMAPS_PROGRESS.
     * @param {USER_ROADMAPS_PROGRESSUpdateArgs} args - Arguments to update one USER_ROADMAPS_PROGRESS.
     * @example
     * // Update one USER_ROADMAPS_PROGRESS
     * const uSER_ROADMAPS_PROGRESS = await prisma.uSER_ROADMAPS_PROGRESS.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends USER_ROADMAPS_PROGRESSUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, USER_ROADMAPS_PROGRESSUpdateArgs<ExtArgs>>
    ): Prisma__USER_ROADMAPS_PROGRESSClient<$Types.GetResult<USER_ROADMAPS_PROGRESSPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more USER_ROADMAPS_PROGRESSES.
     * @param {USER_ROADMAPS_PROGRESSDeleteManyArgs} args - Arguments to filter USER_ROADMAPS_PROGRESSES to delete.
     * @example
     * // Delete a few USER_ROADMAPS_PROGRESSES
     * const { count } = await prisma.uSER_ROADMAPS_PROGRESS.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends USER_ROADMAPS_PROGRESSDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, USER_ROADMAPS_PROGRESSDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more USER_ROADMAPS_PROGRESSES.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {USER_ROADMAPS_PROGRESSUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many USER_ROADMAPS_PROGRESSES
     * const uSER_ROADMAPS_PROGRESS = await prisma.uSER_ROADMAPS_PROGRESS.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends USER_ROADMAPS_PROGRESSUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, USER_ROADMAPS_PROGRESSUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one USER_ROADMAPS_PROGRESS.
     * @param {USER_ROADMAPS_PROGRESSUpsertArgs} args - Arguments to update or create a USER_ROADMAPS_PROGRESS.
     * @example
     * // Update or create a USER_ROADMAPS_PROGRESS
     * const uSER_ROADMAPS_PROGRESS = await prisma.uSER_ROADMAPS_PROGRESS.upsert({
     *   create: {
     *     // ... data to create a USER_ROADMAPS_PROGRESS
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the USER_ROADMAPS_PROGRESS we want to update
     *   }
     * })
    **/
    upsert<T extends USER_ROADMAPS_PROGRESSUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, USER_ROADMAPS_PROGRESSUpsertArgs<ExtArgs>>
    ): Prisma__USER_ROADMAPS_PROGRESSClient<$Types.GetResult<USER_ROADMAPS_PROGRESSPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of USER_ROADMAPS_PROGRESSES.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {USER_ROADMAPS_PROGRESSCountArgs} args - Arguments to filter USER_ROADMAPS_PROGRESSES to count.
     * @example
     * // Count the number of USER_ROADMAPS_PROGRESSES
     * const count = await prisma.uSER_ROADMAPS_PROGRESS.count({
     *   where: {
     *     // ... the filter for the USER_ROADMAPS_PROGRESSES we want to count
     *   }
     * })
    **/
    count<T extends USER_ROADMAPS_PROGRESSCountArgs>(
      args?: Subset<T, USER_ROADMAPS_PROGRESSCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], USER_ROADMAPS_PROGRESSCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a USER_ROADMAPS_PROGRESS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {USER_ROADMAPS_PROGRESSAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends USER_ROADMAPS_PROGRESSAggregateArgs>(args: Subset<T, USER_ROADMAPS_PROGRESSAggregateArgs>): Prisma.PrismaPromise<GetUSER_ROADMAPS_PROGRESSAggregateType<T>>

    /**
     * Group by USER_ROADMAPS_PROGRESS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {USER_ROADMAPS_PROGRESSGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends USER_ROADMAPS_PROGRESSGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: USER_ROADMAPS_PROGRESSGroupByArgs['orderBy'] }
        : { orderBy?: USER_ROADMAPS_PROGRESSGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, USER_ROADMAPS_PROGRESSGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUSER_ROADMAPS_PROGRESSGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for USER_ROADMAPS_PROGRESS.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__USER_ROADMAPS_PROGRESSClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    userNodeProgress<T extends USER_ROADMAPS_PROGRESS$userNodeProgressArgs<ExtArgs> = {}>(args?: Subset<T, USER_ROADMAPS_PROGRESS$userNodeProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<USER_NODE_PROGRESSPayload<ExtArgs>, T, 'findMany', never>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * USER_ROADMAPS_PROGRESS base type for findUnique actions
   */
  export type USER_ROADMAPS_PROGRESSFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the USER_ROADMAPS_PROGRESS
     */
    select?: USER_ROADMAPS_PROGRESSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: USER_ROADMAPS_PROGRESSInclude<ExtArgs> | null
    /**
     * Filter, which USER_ROADMAPS_PROGRESS to fetch.
     */
    where: USER_ROADMAPS_PROGRESSWhereUniqueInput
  }

  /**
   * USER_ROADMAPS_PROGRESS findUnique
   */
  export interface USER_ROADMAPS_PROGRESSFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends USER_ROADMAPS_PROGRESSFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * USER_ROADMAPS_PROGRESS findUniqueOrThrow
   */
  export type USER_ROADMAPS_PROGRESSFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the USER_ROADMAPS_PROGRESS
     */
    select?: USER_ROADMAPS_PROGRESSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: USER_ROADMAPS_PROGRESSInclude<ExtArgs> | null
    /**
     * Filter, which USER_ROADMAPS_PROGRESS to fetch.
     */
    where: USER_ROADMAPS_PROGRESSWhereUniqueInput
  }


  /**
   * USER_ROADMAPS_PROGRESS base type for findFirst actions
   */
  export type USER_ROADMAPS_PROGRESSFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the USER_ROADMAPS_PROGRESS
     */
    select?: USER_ROADMAPS_PROGRESSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: USER_ROADMAPS_PROGRESSInclude<ExtArgs> | null
    /**
     * Filter, which USER_ROADMAPS_PROGRESS to fetch.
     */
    where?: USER_ROADMAPS_PROGRESSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of USER_ROADMAPS_PROGRESSES to fetch.
     */
    orderBy?: Enumerable<USER_ROADMAPS_PROGRESSOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for USER_ROADMAPS_PROGRESSES.
     */
    cursor?: USER_ROADMAPS_PROGRESSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` USER_ROADMAPS_PROGRESSES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` USER_ROADMAPS_PROGRESSES.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of USER_ROADMAPS_PROGRESSES.
     */
    distinct?: Enumerable<USER_ROADMAPS_PROGRESSScalarFieldEnum>
  }

  /**
   * USER_ROADMAPS_PROGRESS findFirst
   */
  export interface USER_ROADMAPS_PROGRESSFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends USER_ROADMAPS_PROGRESSFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * USER_ROADMAPS_PROGRESS findFirstOrThrow
   */
  export type USER_ROADMAPS_PROGRESSFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the USER_ROADMAPS_PROGRESS
     */
    select?: USER_ROADMAPS_PROGRESSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: USER_ROADMAPS_PROGRESSInclude<ExtArgs> | null
    /**
     * Filter, which USER_ROADMAPS_PROGRESS to fetch.
     */
    where?: USER_ROADMAPS_PROGRESSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of USER_ROADMAPS_PROGRESSES to fetch.
     */
    orderBy?: Enumerable<USER_ROADMAPS_PROGRESSOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for USER_ROADMAPS_PROGRESSES.
     */
    cursor?: USER_ROADMAPS_PROGRESSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` USER_ROADMAPS_PROGRESSES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` USER_ROADMAPS_PROGRESSES.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of USER_ROADMAPS_PROGRESSES.
     */
    distinct?: Enumerable<USER_ROADMAPS_PROGRESSScalarFieldEnum>
  }


  /**
   * USER_ROADMAPS_PROGRESS findMany
   */
  export type USER_ROADMAPS_PROGRESSFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the USER_ROADMAPS_PROGRESS
     */
    select?: USER_ROADMAPS_PROGRESSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: USER_ROADMAPS_PROGRESSInclude<ExtArgs> | null
    /**
     * Filter, which USER_ROADMAPS_PROGRESSES to fetch.
     */
    where?: USER_ROADMAPS_PROGRESSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of USER_ROADMAPS_PROGRESSES to fetch.
     */
    orderBy?: Enumerable<USER_ROADMAPS_PROGRESSOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing USER_ROADMAPS_PROGRESSES.
     */
    cursor?: USER_ROADMAPS_PROGRESSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` USER_ROADMAPS_PROGRESSES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` USER_ROADMAPS_PROGRESSES.
     */
    skip?: number
    distinct?: Enumerable<USER_ROADMAPS_PROGRESSScalarFieldEnum>
  }


  /**
   * USER_ROADMAPS_PROGRESS create
   */
  export type USER_ROADMAPS_PROGRESSCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the USER_ROADMAPS_PROGRESS
     */
    select?: USER_ROADMAPS_PROGRESSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: USER_ROADMAPS_PROGRESSInclude<ExtArgs> | null
    /**
     * The data needed to create a USER_ROADMAPS_PROGRESS.
     */
    data: XOR<USER_ROADMAPS_PROGRESSCreateInput, USER_ROADMAPS_PROGRESSUncheckedCreateInput>
  }


  /**
   * USER_ROADMAPS_PROGRESS createMany
   */
  export type USER_ROADMAPS_PROGRESSCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many USER_ROADMAPS_PROGRESSES.
     */
    data: Enumerable<USER_ROADMAPS_PROGRESSCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * USER_ROADMAPS_PROGRESS update
   */
  export type USER_ROADMAPS_PROGRESSUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the USER_ROADMAPS_PROGRESS
     */
    select?: USER_ROADMAPS_PROGRESSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: USER_ROADMAPS_PROGRESSInclude<ExtArgs> | null
    /**
     * The data needed to update a USER_ROADMAPS_PROGRESS.
     */
    data: XOR<USER_ROADMAPS_PROGRESSUpdateInput, USER_ROADMAPS_PROGRESSUncheckedUpdateInput>
    /**
     * Choose, which USER_ROADMAPS_PROGRESS to update.
     */
    where: USER_ROADMAPS_PROGRESSWhereUniqueInput
  }


  /**
   * USER_ROADMAPS_PROGRESS updateMany
   */
  export type USER_ROADMAPS_PROGRESSUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update USER_ROADMAPS_PROGRESSES.
     */
    data: XOR<USER_ROADMAPS_PROGRESSUpdateManyMutationInput, USER_ROADMAPS_PROGRESSUncheckedUpdateManyInput>
    /**
     * Filter which USER_ROADMAPS_PROGRESSES to update
     */
    where?: USER_ROADMAPS_PROGRESSWhereInput
  }


  /**
   * USER_ROADMAPS_PROGRESS upsert
   */
  export type USER_ROADMAPS_PROGRESSUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the USER_ROADMAPS_PROGRESS
     */
    select?: USER_ROADMAPS_PROGRESSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: USER_ROADMAPS_PROGRESSInclude<ExtArgs> | null
    /**
     * The filter to search for the USER_ROADMAPS_PROGRESS to update in case it exists.
     */
    where: USER_ROADMAPS_PROGRESSWhereUniqueInput
    /**
     * In case the USER_ROADMAPS_PROGRESS found by the `where` argument doesn't exist, create a new USER_ROADMAPS_PROGRESS with this data.
     */
    create: XOR<USER_ROADMAPS_PROGRESSCreateInput, USER_ROADMAPS_PROGRESSUncheckedCreateInput>
    /**
     * In case the USER_ROADMAPS_PROGRESS was found with the provided `where` argument, update it with this data.
     */
    update: XOR<USER_ROADMAPS_PROGRESSUpdateInput, USER_ROADMAPS_PROGRESSUncheckedUpdateInput>
  }


  /**
   * USER_ROADMAPS_PROGRESS delete
   */
  export type USER_ROADMAPS_PROGRESSDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the USER_ROADMAPS_PROGRESS
     */
    select?: USER_ROADMAPS_PROGRESSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: USER_ROADMAPS_PROGRESSInclude<ExtArgs> | null
    /**
     * Filter which USER_ROADMAPS_PROGRESS to delete.
     */
    where: USER_ROADMAPS_PROGRESSWhereUniqueInput
  }


  /**
   * USER_ROADMAPS_PROGRESS deleteMany
   */
  export type USER_ROADMAPS_PROGRESSDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which USER_ROADMAPS_PROGRESSES to delete
     */
    where?: USER_ROADMAPS_PROGRESSWhereInput
  }


  /**
   * USER_ROADMAPS_PROGRESS.userNodeProgress
   */
  export type USER_ROADMAPS_PROGRESS$userNodeProgressArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the USER_NODE_PROGRESS
     */
    select?: USER_NODE_PROGRESSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: USER_NODE_PROGRESSInclude<ExtArgs> | null
    where?: USER_NODE_PROGRESSWhereInput
    orderBy?: Enumerable<USER_NODE_PROGRESSOrderByWithRelationInput>
    cursor?: USER_NODE_PROGRESSWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<USER_NODE_PROGRESSScalarFieldEnum>
  }


  /**
   * USER_ROADMAPS_PROGRESS without action
   */
  export type USER_ROADMAPS_PROGRESSArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the USER_ROADMAPS_PROGRESS
     */
    select?: USER_ROADMAPS_PROGRESSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: USER_ROADMAPS_PROGRESSInclude<ExtArgs> | null
  }



  /**
   * Model USER_NODE_PROGRESS
   */


  export type AggregateUSER_NODE_PROGRESS = {
    _count: USER_NODE_PROGRESSCountAggregateOutputType | null
    _avg: USER_NODE_PROGRESSAvgAggregateOutputType | null
    _sum: USER_NODE_PROGRESSSumAggregateOutputType | null
    _min: USER_NODE_PROGRESSMinAggregateOutputType | null
    _max: USER_NODE_PROGRESSMaxAggregateOutputType | null
  }

  export type USER_NODE_PROGRESSAvgAggregateOutputType = {
    id: number | null
    user_roadmap_id: number | null
    course_node_id: number | null
    credits_earned: number | null
  }

  export type USER_NODE_PROGRESSSumAggregateOutputType = {
    id: number | null
    user_roadmap_id: number | null
    course_node_id: number | null
    credits_earned: number | null
  }

  export type USER_NODE_PROGRESSMinAggregateOutputType = {
    id: number | null
    user_roadmap_id: number | null
    course_node_id: number | null
    status: NodeProgressStatus | null
    credits_earned: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type USER_NODE_PROGRESSMaxAggregateOutputType = {
    id: number | null
    user_roadmap_id: number | null
    course_node_id: number | null
    status: NodeProgressStatus | null
    credits_earned: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type USER_NODE_PROGRESSCountAggregateOutputType = {
    id: number
    user_roadmap_id: number
    course_node_id: number
    status: number
    credits_earned: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type USER_NODE_PROGRESSAvgAggregateInputType = {
    id?: true
    user_roadmap_id?: true
    course_node_id?: true
    credits_earned?: true
  }

  export type USER_NODE_PROGRESSSumAggregateInputType = {
    id?: true
    user_roadmap_id?: true
    course_node_id?: true
    credits_earned?: true
  }

  export type USER_NODE_PROGRESSMinAggregateInputType = {
    id?: true
    user_roadmap_id?: true
    course_node_id?: true
    status?: true
    credits_earned?: true
    created_at?: true
    updated_at?: true
  }

  export type USER_NODE_PROGRESSMaxAggregateInputType = {
    id?: true
    user_roadmap_id?: true
    course_node_id?: true
    status?: true
    credits_earned?: true
    created_at?: true
    updated_at?: true
  }

  export type USER_NODE_PROGRESSCountAggregateInputType = {
    id?: true
    user_roadmap_id?: true
    course_node_id?: true
    status?: true
    credits_earned?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type USER_NODE_PROGRESSAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which USER_NODE_PROGRESS to aggregate.
     */
    where?: USER_NODE_PROGRESSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of USER_NODE_PROGRESSES to fetch.
     */
    orderBy?: Enumerable<USER_NODE_PROGRESSOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: USER_NODE_PROGRESSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` USER_NODE_PROGRESSES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` USER_NODE_PROGRESSES.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned USER_NODE_PROGRESSES
    **/
    _count?: true | USER_NODE_PROGRESSCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: USER_NODE_PROGRESSAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: USER_NODE_PROGRESSSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: USER_NODE_PROGRESSMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: USER_NODE_PROGRESSMaxAggregateInputType
  }

  export type GetUSER_NODE_PROGRESSAggregateType<T extends USER_NODE_PROGRESSAggregateArgs> = {
        [P in keyof T & keyof AggregateUSER_NODE_PROGRESS]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUSER_NODE_PROGRESS[P]>
      : GetScalarType<T[P], AggregateUSER_NODE_PROGRESS[P]>
  }




  export type USER_NODE_PROGRESSGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: USER_NODE_PROGRESSWhereInput
    orderBy?: Enumerable<USER_NODE_PROGRESSOrderByWithAggregationInput>
    by: USER_NODE_PROGRESSScalarFieldEnum[]
    having?: USER_NODE_PROGRESSScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: USER_NODE_PROGRESSCountAggregateInputType | true
    _avg?: USER_NODE_PROGRESSAvgAggregateInputType
    _sum?: USER_NODE_PROGRESSSumAggregateInputType
    _min?: USER_NODE_PROGRESSMinAggregateInputType
    _max?: USER_NODE_PROGRESSMaxAggregateInputType
  }


  export type USER_NODE_PROGRESSGroupByOutputType = {
    id: number
    user_roadmap_id: number
    course_node_id: number
    status: NodeProgressStatus
    credits_earned: number
    created_at: Date
    updated_at: Date
    _count: USER_NODE_PROGRESSCountAggregateOutputType | null
    _avg: USER_NODE_PROGRESSAvgAggregateOutputType | null
    _sum: USER_NODE_PROGRESSSumAggregateOutputType | null
    _min: USER_NODE_PROGRESSMinAggregateOutputType | null
    _max: USER_NODE_PROGRESSMaxAggregateOutputType | null
  }

  type GetUSER_NODE_PROGRESSGroupByPayload<T extends USER_NODE_PROGRESSGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<USER_NODE_PROGRESSGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof USER_NODE_PROGRESSGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], USER_NODE_PROGRESSGroupByOutputType[P]>
            : GetScalarType<T[P], USER_NODE_PROGRESSGroupByOutputType[P]>
        }
      >
    >


  export type USER_NODE_PROGRESSSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_roadmap_id?: boolean
    course_node_id?: boolean
    status?: boolean
    credits_earned?: boolean
    created_at?: boolean
    updated_at?: boolean
    userRoadmap?: boolean | USER_ROADMAPS_PROGRESSArgs<ExtArgs>
  }, ExtArgs["result"]["uSER_NODE_PROGRESS"]>

  export type USER_NODE_PROGRESSSelectScalar = {
    id?: boolean
    user_roadmap_id?: boolean
    course_node_id?: boolean
    status?: boolean
    credits_earned?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type USER_NODE_PROGRESSInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    userRoadmap?: boolean | USER_ROADMAPS_PROGRESSArgs<ExtArgs>
  }


  type USER_NODE_PROGRESSGetPayload<S extends boolean | null | undefined | USER_NODE_PROGRESSArgs> = $Types.GetResult<USER_NODE_PROGRESSPayload, S>

  type USER_NODE_PROGRESSCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<USER_NODE_PROGRESSFindManyArgs, 'select' | 'include'> & {
      select?: USER_NODE_PROGRESSCountAggregateInputType | true
    }

  export interface USER_NODE_PROGRESSDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['USER_NODE_PROGRESS'], meta: { name: 'USER_NODE_PROGRESS' } }
    /**
     * Find zero or one USER_NODE_PROGRESS that matches the filter.
     * @param {USER_NODE_PROGRESSFindUniqueArgs} args - Arguments to find a USER_NODE_PROGRESS
     * @example
     * // Get one USER_NODE_PROGRESS
     * const uSER_NODE_PROGRESS = await prisma.uSER_NODE_PROGRESS.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends USER_NODE_PROGRESSFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, USER_NODE_PROGRESSFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'USER_NODE_PROGRESS'> extends True ? Prisma__USER_NODE_PROGRESSClient<$Types.GetResult<USER_NODE_PROGRESSPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__USER_NODE_PROGRESSClient<$Types.GetResult<USER_NODE_PROGRESSPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one USER_NODE_PROGRESS that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {USER_NODE_PROGRESSFindUniqueOrThrowArgs} args - Arguments to find a USER_NODE_PROGRESS
     * @example
     * // Get one USER_NODE_PROGRESS
     * const uSER_NODE_PROGRESS = await prisma.uSER_NODE_PROGRESS.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends USER_NODE_PROGRESSFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, USER_NODE_PROGRESSFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__USER_NODE_PROGRESSClient<$Types.GetResult<USER_NODE_PROGRESSPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first USER_NODE_PROGRESS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {USER_NODE_PROGRESSFindFirstArgs} args - Arguments to find a USER_NODE_PROGRESS
     * @example
     * // Get one USER_NODE_PROGRESS
     * const uSER_NODE_PROGRESS = await prisma.uSER_NODE_PROGRESS.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends USER_NODE_PROGRESSFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, USER_NODE_PROGRESSFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'USER_NODE_PROGRESS'> extends True ? Prisma__USER_NODE_PROGRESSClient<$Types.GetResult<USER_NODE_PROGRESSPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__USER_NODE_PROGRESSClient<$Types.GetResult<USER_NODE_PROGRESSPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first USER_NODE_PROGRESS that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {USER_NODE_PROGRESSFindFirstOrThrowArgs} args - Arguments to find a USER_NODE_PROGRESS
     * @example
     * // Get one USER_NODE_PROGRESS
     * const uSER_NODE_PROGRESS = await prisma.uSER_NODE_PROGRESS.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends USER_NODE_PROGRESSFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, USER_NODE_PROGRESSFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__USER_NODE_PROGRESSClient<$Types.GetResult<USER_NODE_PROGRESSPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more USER_NODE_PROGRESSES that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {USER_NODE_PROGRESSFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all USER_NODE_PROGRESSES
     * const uSER_NODE_PROGRESSES = await prisma.uSER_NODE_PROGRESS.findMany()
     * 
     * // Get first 10 USER_NODE_PROGRESSES
     * const uSER_NODE_PROGRESSES = await prisma.uSER_NODE_PROGRESS.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const uSER_NODE_PROGRESSWithIdOnly = await prisma.uSER_NODE_PROGRESS.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends USER_NODE_PROGRESSFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, USER_NODE_PROGRESSFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<USER_NODE_PROGRESSPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a USER_NODE_PROGRESS.
     * @param {USER_NODE_PROGRESSCreateArgs} args - Arguments to create a USER_NODE_PROGRESS.
     * @example
     * // Create one USER_NODE_PROGRESS
     * const USER_NODE_PROGRESS = await prisma.uSER_NODE_PROGRESS.create({
     *   data: {
     *     // ... data to create a USER_NODE_PROGRESS
     *   }
     * })
     * 
    **/
    create<T extends USER_NODE_PROGRESSCreateArgs<ExtArgs>>(
      args: SelectSubset<T, USER_NODE_PROGRESSCreateArgs<ExtArgs>>
    ): Prisma__USER_NODE_PROGRESSClient<$Types.GetResult<USER_NODE_PROGRESSPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many USER_NODE_PROGRESSES.
     *     @param {USER_NODE_PROGRESSCreateManyArgs} args - Arguments to create many USER_NODE_PROGRESSES.
     *     @example
     *     // Create many USER_NODE_PROGRESSES
     *     const uSER_NODE_PROGRESS = await prisma.uSER_NODE_PROGRESS.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends USER_NODE_PROGRESSCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, USER_NODE_PROGRESSCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a USER_NODE_PROGRESS.
     * @param {USER_NODE_PROGRESSDeleteArgs} args - Arguments to delete one USER_NODE_PROGRESS.
     * @example
     * // Delete one USER_NODE_PROGRESS
     * const USER_NODE_PROGRESS = await prisma.uSER_NODE_PROGRESS.delete({
     *   where: {
     *     // ... filter to delete one USER_NODE_PROGRESS
     *   }
     * })
     * 
    **/
    delete<T extends USER_NODE_PROGRESSDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, USER_NODE_PROGRESSDeleteArgs<ExtArgs>>
    ): Prisma__USER_NODE_PROGRESSClient<$Types.GetResult<USER_NODE_PROGRESSPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one USER_NODE_PROGRESS.
     * @param {USER_NODE_PROGRESSUpdateArgs} args - Arguments to update one USER_NODE_PROGRESS.
     * @example
     * // Update one USER_NODE_PROGRESS
     * const uSER_NODE_PROGRESS = await prisma.uSER_NODE_PROGRESS.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends USER_NODE_PROGRESSUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, USER_NODE_PROGRESSUpdateArgs<ExtArgs>>
    ): Prisma__USER_NODE_PROGRESSClient<$Types.GetResult<USER_NODE_PROGRESSPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more USER_NODE_PROGRESSES.
     * @param {USER_NODE_PROGRESSDeleteManyArgs} args - Arguments to filter USER_NODE_PROGRESSES to delete.
     * @example
     * // Delete a few USER_NODE_PROGRESSES
     * const { count } = await prisma.uSER_NODE_PROGRESS.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends USER_NODE_PROGRESSDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, USER_NODE_PROGRESSDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more USER_NODE_PROGRESSES.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {USER_NODE_PROGRESSUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many USER_NODE_PROGRESSES
     * const uSER_NODE_PROGRESS = await prisma.uSER_NODE_PROGRESS.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends USER_NODE_PROGRESSUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, USER_NODE_PROGRESSUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one USER_NODE_PROGRESS.
     * @param {USER_NODE_PROGRESSUpsertArgs} args - Arguments to update or create a USER_NODE_PROGRESS.
     * @example
     * // Update or create a USER_NODE_PROGRESS
     * const uSER_NODE_PROGRESS = await prisma.uSER_NODE_PROGRESS.upsert({
     *   create: {
     *     // ... data to create a USER_NODE_PROGRESS
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the USER_NODE_PROGRESS we want to update
     *   }
     * })
    **/
    upsert<T extends USER_NODE_PROGRESSUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, USER_NODE_PROGRESSUpsertArgs<ExtArgs>>
    ): Prisma__USER_NODE_PROGRESSClient<$Types.GetResult<USER_NODE_PROGRESSPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of USER_NODE_PROGRESSES.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {USER_NODE_PROGRESSCountArgs} args - Arguments to filter USER_NODE_PROGRESSES to count.
     * @example
     * // Count the number of USER_NODE_PROGRESSES
     * const count = await prisma.uSER_NODE_PROGRESS.count({
     *   where: {
     *     // ... the filter for the USER_NODE_PROGRESSES we want to count
     *   }
     * })
    **/
    count<T extends USER_NODE_PROGRESSCountArgs>(
      args?: Subset<T, USER_NODE_PROGRESSCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], USER_NODE_PROGRESSCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a USER_NODE_PROGRESS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {USER_NODE_PROGRESSAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends USER_NODE_PROGRESSAggregateArgs>(args: Subset<T, USER_NODE_PROGRESSAggregateArgs>): Prisma.PrismaPromise<GetUSER_NODE_PROGRESSAggregateType<T>>

    /**
     * Group by USER_NODE_PROGRESS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {USER_NODE_PROGRESSGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends USER_NODE_PROGRESSGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: USER_NODE_PROGRESSGroupByArgs['orderBy'] }
        : { orderBy?: USER_NODE_PROGRESSGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, USER_NODE_PROGRESSGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUSER_NODE_PROGRESSGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for USER_NODE_PROGRESS.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__USER_NODE_PROGRESSClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    userRoadmap<T extends USER_ROADMAPS_PROGRESSArgs<ExtArgs> = {}>(args?: Subset<T, USER_ROADMAPS_PROGRESSArgs<ExtArgs>>): Prisma__USER_ROADMAPS_PROGRESSClient<$Types.GetResult<USER_ROADMAPS_PROGRESSPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * USER_NODE_PROGRESS base type for findUnique actions
   */
  export type USER_NODE_PROGRESSFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the USER_NODE_PROGRESS
     */
    select?: USER_NODE_PROGRESSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: USER_NODE_PROGRESSInclude<ExtArgs> | null
    /**
     * Filter, which USER_NODE_PROGRESS to fetch.
     */
    where: USER_NODE_PROGRESSWhereUniqueInput
  }

  /**
   * USER_NODE_PROGRESS findUnique
   */
  export interface USER_NODE_PROGRESSFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends USER_NODE_PROGRESSFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * USER_NODE_PROGRESS findUniqueOrThrow
   */
  export type USER_NODE_PROGRESSFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the USER_NODE_PROGRESS
     */
    select?: USER_NODE_PROGRESSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: USER_NODE_PROGRESSInclude<ExtArgs> | null
    /**
     * Filter, which USER_NODE_PROGRESS to fetch.
     */
    where: USER_NODE_PROGRESSWhereUniqueInput
  }


  /**
   * USER_NODE_PROGRESS base type for findFirst actions
   */
  export type USER_NODE_PROGRESSFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the USER_NODE_PROGRESS
     */
    select?: USER_NODE_PROGRESSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: USER_NODE_PROGRESSInclude<ExtArgs> | null
    /**
     * Filter, which USER_NODE_PROGRESS to fetch.
     */
    where?: USER_NODE_PROGRESSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of USER_NODE_PROGRESSES to fetch.
     */
    orderBy?: Enumerable<USER_NODE_PROGRESSOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for USER_NODE_PROGRESSES.
     */
    cursor?: USER_NODE_PROGRESSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` USER_NODE_PROGRESSES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` USER_NODE_PROGRESSES.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of USER_NODE_PROGRESSES.
     */
    distinct?: Enumerable<USER_NODE_PROGRESSScalarFieldEnum>
  }

  /**
   * USER_NODE_PROGRESS findFirst
   */
  export interface USER_NODE_PROGRESSFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends USER_NODE_PROGRESSFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * USER_NODE_PROGRESS findFirstOrThrow
   */
  export type USER_NODE_PROGRESSFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the USER_NODE_PROGRESS
     */
    select?: USER_NODE_PROGRESSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: USER_NODE_PROGRESSInclude<ExtArgs> | null
    /**
     * Filter, which USER_NODE_PROGRESS to fetch.
     */
    where?: USER_NODE_PROGRESSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of USER_NODE_PROGRESSES to fetch.
     */
    orderBy?: Enumerable<USER_NODE_PROGRESSOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for USER_NODE_PROGRESSES.
     */
    cursor?: USER_NODE_PROGRESSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` USER_NODE_PROGRESSES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` USER_NODE_PROGRESSES.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of USER_NODE_PROGRESSES.
     */
    distinct?: Enumerable<USER_NODE_PROGRESSScalarFieldEnum>
  }


  /**
   * USER_NODE_PROGRESS findMany
   */
  export type USER_NODE_PROGRESSFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the USER_NODE_PROGRESS
     */
    select?: USER_NODE_PROGRESSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: USER_NODE_PROGRESSInclude<ExtArgs> | null
    /**
     * Filter, which USER_NODE_PROGRESSES to fetch.
     */
    where?: USER_NODE_PROGRESSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of USER_NODE_PROGRESSES to fetch.
     */
    orderBy?: Enumerable<USER_NODE_PROGRESSOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing USER_NODE_PROGRESSES.
     */
    cursor?: USER_NODE_PROGRESSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` USER_NODE_PROGRESSES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` USER_NODE_PROGRESSES.
     */
    skip?: number
    distinct?: Enumerable<USER_NODE_PROGRESSScalarFieldEnum>
  }


  /**
   * USER_NODE_PROGRESS create
   */
  export type USER_NODE_PROGRESSCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the USER_NODE_PROGRESS
     */
    select?: USER_NODE_PROGRESSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: USER_NODE_PROGRESSInclude<ExtArgs> | null
    /**
     * The data needed to create a USER_NODE_PROGRESS.
     */
    data: XOR<USER_NODE_PROGRESSCreateInput, USER_NODE_PROGRESSUncheckedCreateInput>
  }


  /**
   * USER_NODE_PROGRESS createMany
   */
  export type USER_NODE_PROGRESSCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many USER_NODE_PROGRESSES.
     */
    data: Enumerable<USER_NODE_PROGRESSCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * USER_NODE_PROGRESS update
   */
  export type USER_NODE_PROGRESSUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the USER_NODE_PROGRESS
     */
    select?: USER_NODE_PROGRESSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: USER_NODE_PROGRESSInclude<ExtArgs> | null
    /**
     * The data needed to update a USER_NODE_PROGRESS.
     */
    data: XOR<USER_NODE_PROGRESSUpdateInput, USER_NODE_PROGRESSUncheckedUpdateInput>
    /**
     * Choose, which USER_NODE_PROGRESS to update.
     */
    where: USER_NODE_PROGRESSWhereUniqueInput
  }


  /**
   * USER_NODE_PROGRESS updateMany
   */
  export type USER_NODE_PROGRESSUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update USER_NODE_PROGRESSES.
     */
    data: XOR<USER_NODE_PROGRESSUpdateManyMutationInput, USER_NODE_PROGRESSUncheckedUpdateManyInput>
    /**
     * Filter which USER_NODE_PROGRESSES to update
     */
    where?: USER_NODE_PROGRESSWhereInput
  }


  /**
   * USER_NODE_PROGRESS upsert
   */
  export type USER_NODE_PROGRESSUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the USER_NODE_PROGRESS
     */
    select?: USER_NODE_PROGRESSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: USER_NODE_PROGRESSInclude<ExtArgs> | null
    /**
     * The filter to search for the USER_NODE_PROGRESS to update in case it exists.
     */
    where: USER_NODE_PROGRESSWhereUniqueInput
    /**
     * In case the USER_NODE_PROGRESS found by the `where` argument doesn't exist, create a new USER_NODE_PROGRESS with this data.
     */
    create: XOR<USER_NODE_PROGRESSCreateInput, USER_NODE_PROGRESSUncheckedCreateInput>
    /**
     * In case the USER_NODE_PROGRESS was found with the provided `where` argument, update it with this data.
     */
    update: XOR<USER_NODE_PROGRESSUpdateInput, USER_NODE_PROGRESSUncheckedUpdateInput>
  }


  /**
   * USER_NODE_PROGRESS delete
   */
  export type USER_NODE_PROGRESSDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the USER_NODE_PROGRESS
     */
    select?: USER_NODE_PROGRESSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: USER_NODE_PROGRESSInclude<ExtArgs> | null
    /**
     * Filter which USER_NODE_PROGRESS to delete.
     */
    where: USER_NODE_PROGRESSWhereUniqueInput
  }


  /**
   * USER_NODE_PROGRESS deleteMany
   */
  export type USER_NODE_PROGRESSDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which USER_NODE_PROGRESSES to delete
     */
    where?: USER_NODE_PROGRESSWhereInput
  }


  /**
   * USER_NODE_PROGRESS without action
   */
  export type USER_NODE_PROGRESSArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the USER_NODE_PROGRESS
     */
    select?: USER_NODE_PROGRESSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: USER_NODE_PROGRESSInclude<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const USER_ROADMAPS_PROGRESSScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    roadmap_id: 'roadmap_id',
    enrollment_status: 'enrollment_status',
    completion_percentage: 'completion_percentage',
    total_credits_earned: 'total_credits_earned',
    total_credits_required: 'total_credits_required',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type USER_ROADMAPS_PROGRESSScalarFieldEnum = (typeof USER_ROADMAPS_PROGRESSScalarFieldEnum)[keyof typeof USER_ROADMAPS_PROGRESSScalarFieldEnum]


  export const USER_NODE_PROGRESSScalarFieldEnum: {
    id: 'id',
    user_roadmap_id: 'user_roadmap_id',
    course_node_id: 'course_node_id',
    status: 'status',
    credits_earned: 'credits_earned',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type USER_NODE_PROGRESSScalarFieldEnum = (typeof USER_NODE_PROGRESSScalarFieldEnum)[keyof typeof USER_NODE_PROGRESSScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  /**
   * Deep Input Types
   */


  export type USER_ROADMAPS_PROGRESSWhereInput = {
    AND?: Enumerable<USER_ROADMAPS_PROGRESSWhereInput>
    OR?: Enumerable<USER_ROADMAPS_PROGRESSWhereInput>
    NOT?: Enumerable<USER_ROADMAPS_PROGRESSWhereInput>
    id?: IntFilter | number
    user_id?: IntFilter | number
    roadmap_id?: IntFilter | number
    enrollment_status?: EnumEnrollmentStatusFilter | EnrollmentStatus
    completion_percentage?: IntFilter | number
    total_credits_earned?: IntFilter | number
    total_credits_required?: IntFilter | number
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeFilter | Date | string
    userNodeProgress?: USER_NODE_PROGRESSListRelationFilter
  }

  export type USER_ROADMAPS_PROGRESSOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    roadmap_id?: SortOrder
    enrollment_status?: SortOrder
    completion_percentage?: SortOrder
    total_credits_earned?: SortOrder
    total_credits_required?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    userNodeProgress?: USER_NODE_PROGRESSOrderByRelationAggregateInput
  }

  export type USER_ROADMAPS_PROGRESSWhereUniqueInput = {
    id?: number
    user_id_roadmap_id?: USER_ROADMAPS_PROGRESSUser_idRoadmap_idCompoundUniqueInput
  }

  export type USER_ROADMAPS_PROGRESSOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    roadmap_id?: SortOrder
    enrollment_status?: SortOrder
    completion_percentage?: SortOrder
    total_credits_earned?: SortOrder
    total_credits_required?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: USER_ROADMAPS_PROGRESSCountOrderByAggregateInput
    _avg?: USER_ROADMAPS_PROGRESSAvgOrderByAggregateInput
    _max?: USER_ROADMAPS_PROGRESSMaxOrderByAggregateInput
    _min?: USER_ROADMAPS_PROGRESSMinOrderByAggregateInput
    _sum?: USER_ROADMAPS_PROGRESSSumOrderByAggregateInput
  }

  export type USER_ROADMAPS_PROGRESSScalarWhereWithAggregatesInput = {
    AND?: Enumerable<USER_ROADMAPS_PROGRESSScalarWhereWithAggregatesInput>
    OR?: Enumerable<USER_ROADMAPS_PROGRESSScalarWhereWithAggregatesInput>
    NOT?: Enumerable<USER_ROADMAPS_PROGRESSScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    user_id?: IntWithAggregatesFilter | number
    roadmap_id?: IntWithAggregatesFilter | number
    enrollment_status?: EnumEnrollmentStatusWithAggregatesFilter | EnrollmentStatus
    completion_percentage?: IntWithAggregatesFilter | number
    total_credits_earned?: IntWithAggregatesFilter | number
    total_credits_required?: IntWithAggregatesFilter | number
    created_at?: DateTimeWithAggregatesFilter | Date | string
    updated_at?: DateTimeWithAggregatesFilter | Date | string
  }

  export type USER_NODE_PROGRESSWhereInput = {
    AND?: Enumerable<USER_NODE_PROGRESSWhereInput>
    OR?: Enumerable<USER_NODE_PROGRESSWhereInput>
    NOT?: Enumerable<USER_NODE_PROGRESSWhereInput>
    id?: IntFilter | number
    user_roadmap_id?: IntFilter | number
    course_node_id?: IntFilter | number
    status?: EnumNodeProgressStatusFilter | NodeProgressStatus
    credits_earned?: IntFilter | number
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeFilter | Date | string
    userRoadmap?: XOR<USER_ROADMAPS_PROGRESSRelationFilter, USER_ROADMAPS_PROGRESSWhereInput>
  }

  export type USER_NODE_PROGRESSOrderByWithRelationInput = {
    id?: SortOrder
    user_roadmap_id?: SortOrder
    course_node_id?: SortOrder
    status?: SortOrder
    credits_earned?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    userRoadmap?: USER_ROADMAPS_PROGRESSOrderByWithRelationInput
  }

  export type USER_NODE_PROGRESSWhereUniqueInput = {
    id?: number
    user_roadmap_id_course_node_id?: USER_NODE_PROGRESSUser_roadmap_idCourse_node_idCompoundUniqueInput
  }

  export type USER_NODE_PROGRESSOrderByWithAggregationInput = {
    id?: SortOrder
    user_roadmap_id?: SortOrder
    course_node_id?: SortOrder
    status?: SortOrder
    credits_earned?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: USER_NODE_PROGRESSCountOrderByAggregateInput
    _avg?: USER_NODE_PROGRESSAvgOrderByAggregateInput
    _max?: USER_NODE_PROGRESSMaxOrderByAggregateInput
    _min?: USER_NODE_PROGRESSMinOrderByAggregateInput
    _sum?: USER_NODE_PROGRESSSumOrderByAggregateInput
  }

  export type USER_NODE_PROGRESSScalarWhereWithAggregatesInput = {
    AND?: Enumerable<USER_NODE_PROGRESSScalarWhereWithAggregatesInput>
    OR?: Enumerable<USER_NODE_PROGRESSScalarWhereWithAggregatesInput>
    NOT?: Enumerable<USER_NODE_PROGRESSScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    user_roadmap_id?: IntWithAggregatesFilter | number
    course_node_id?: IntWithAggregatesFilter | number
    status?: EnumNodeProgressStatusWithAggregatesFilter | NodeProgressStatus
    credits_earned?: IntWithAggregatesFilter | number
    created_at?: DateTimeWithAggregatesFilter | Date | string
    updated_at?: DateTimeWithAggregatesFilter | Date | string
  }

  export type USER_ROADMAPS_PROGRESSCreateInput = {
    user_id: number
    roadmap_id: number
    enrollment_status: EnrollmentStatus
    completion_percentage: number
    total_credits_earned: number
    total_credits_required: number
    created_at?: Date | string
    updated_at?: Date | string
    userNodeProgress?: USER_NODE_PROGRESSCreateNestedManyWithoutUserRoadmapInput
  }

  export type USER_ROADMAPS_PROGRESSUncheckedCreateInput = {
    id?: number
    user_id: number
    roadmap_id: number
    enrollment_status: EnrollmentStatus
    completion_percentage: number
    total_credits_earned: number
    total_credits_required: number
    created_at?: Date | string
    updated_at?: Date | string
    userNodeProgress?: USER_NODE_PROGRESSUncheckedCreateNestedManyWithoutUserRoadmapInput
  }

  export type USER_ROADMAPS_PROGRESSUpdateInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    roadmap_id?: IntFieldUpdateOperationsInput | number
    enrollment_status?: EnumEnrollmentStatusFieldUpdateOperationsInput | EnrollmentStatus
    completion_percentage?: IntFieldUpdateOperationsInput | number
    total_credits_earned?: IntFieldUpdateOperationsInput | number
    total_credits_required?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    userNodeProgress?: USER_NODE_PROGRESSUpdateManyWithoutUserRoadmapNestedInput
  }

  export type USER_ROADMAPS_PROGRESSUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    roadmap_id?: IntFieldUpdateOperationsInput | number
    enrollment_status?: EnumEnrollmentStatusFieldUpdateOperationsInput | EnrollmentStatus
    completion_percentage?: IntFieldUpdateOperationsInput | number
    total_credits_earned?: IntFieldUpdateOperationsInput | number
    total_credits_required?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    userNodeProgress?: USER_NODE_PROGRESSUncheckedUpdateManyWithoutUserRoadmapNestedInput
  }

  export type USER_ROADMAPS_PROGRESSCreateManyInput = {
    id?: number
    user_id: number
    roadmap_id: number
    enrollment_status: EnrollmentStatus
    completion_percentage: number
    total_credits_earned: number
    total_credits_required: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type USER_ROADMAPS_PROGRESSUpdateManyMutationInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    roadmap_id?: IntFieldUpdateOperationsInput | number
    enrollment_status?: EnumEnrollmentStatusFieldUpdateOperationsInput | EnrollmentStatus
    completion_percentage?: IntFieldUpdateOperationsInput | number
    total_credits_earned?: IntFieldUpdateOperationsInput | number
    total_credits_required?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type USER_ROADMAPS_PROGRESSUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    roadmap_id?: IntFieldUpdateOperationsInput | number
    enrollment_status?: EnumEnrollmentStatusFieldUpdateOperationsInput | EnrollmentStatus
    completion_percentage?: IntFieldUpdateOperationsInput | number
    total_credits_earned?: IntFieldUpdateOperationsInput | number
    total_credits_required?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type USER_NODE_PROGRESSCreateInput = {
    course_node_id: number
    status: NodeProgressStatus
    credits_earned: number
    created_at?: Date | string
    updated_at?: Date | string
    userRoadmap: USER_ROADMAPS_PROGRESSCreateNestedOneWithoutUserNodeProgressInput
  }

  export type USER_NODE_PROGRESSUncheckedCreateInput = {
    id?: number
    user_roadmap_id: number
    course_node_id: number
    status: NodeProgressStatus
    credits_earned: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type USER_NODE_PROGRESSUpdateInput = {
    course_node_id?: IntFieldUpdateOperationsInput | number
    status?: EnumNodeProgressStatusFieldUpdateOperationsInput | NodeProgressStatus
    credits_earned?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    userRoadmap?: USER_ROADMAPS_PROGRESSUpdateOneRequiredWithoutUserNodeProgressNestedInput
  }

  export type USER_NODE_PROGRESSUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_roadmap_id?: IntFieldUpdateOperationsInput | number
    course_node_id?: IntFieldUpdateOperationsInput | number
    status?: EnumNodeProgressStatusFieldUpdateOperationsInput | NodeProgressStatus
    credits_earned?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type USER_NODE_PROGRESSCreateManyInput = {
    id?: number
    user_roadmap_id: number
    course_node_id: number
    status: NodeProgressStatus
    credits_earned: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type USER_NODE_PROGRESSUpdateManyMutationInput = {
    course_node_id?: IntFieldUpdateOperationsInput | number
    status?: EnumNodeProgressStatusFieldUpdateOperationsInput | NodeProgressStatus
    credits_earned?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type USER_NODE_PROGRESSUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_roadmap_id?: IntFieldUpdateOperationsInput | number
    course_node_id?: IntFieldUpdateOperationsInput | number
    status?: EnumNodeProgressStatusFieldUpdateOperationsInput | NodeProgressStatus
    credits_earned?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type EnumEnrollmentStatusFilter = {
    equals?: EnrollmentStatus
    in?: Enumerable<EnrollmentStatus>
    notIn?: Enumerable<EnrollmentStatus>
    not?: NestedEnumEnrollmentStatusFilter | EnrollmentStatus
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type USER_NODE_PROGRESSListRelationFilter = {
    every?: USER_NODE_PROGRESSWhereInput
    some?: USER_NODE_PROGRESSWhereInput
    none?: USER_NODE_PROGRESSWhereInput
  }

  export type USER_NODE_PROGRESSOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type USER_ROADMAPS_PROGRESSUser_idRoadmap_idCompoundUniqueInput = {
    user_id: number
    roadmap_id: number
  }

  export type USER_ROADMAPS_PROGRESSCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    roadmap_id?: SortOrder
    enrollment_status?: SortOrder
    completion_percentage?: SortOrder
    total_credits_earned?: SortOrder
    total_credits_required?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type USER_ROADMAPS_PROGRESSAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    roadmap_id?: SortOrder
    completion_percentage?: SortOrder
    total_credits_earned?: SortOrder
    total_credits_required?: SortOrder
  }

  export type USER_ROADMAPS_PROGRESSMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    roadmap_id?: SortOrder
    enrollment_status?: SortOrder
    completion_percentage?: SortOrder
    total_credits_earned?: SortOrder
    total_credits_required?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type USER_ROADMAPS_PROGRESSMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    roadmap_id?: SortOrder
    enrollment_status?: SortOrder
    completion_percentage?: SortOrder
    total_credits_earned?: SortOrder
    total_credits_required?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type USER_ROADMAPS_PROGRESSSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    roadmap_id?: SortOrder
    completion_percentage?: SortOrder
    total_credits_earned?: SortOrder
    total_credits_required?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type EnumEnrollmentStatusWithAggregatesFilter = {
    equals?: EnrollmentStatus
    in?: Enumerable<EnrollmentStatus>
    notIn?: Enumerable<EnrollmentStatus>
    not?: NestedEnumEnrollmentStatusWithAggregatesFilter | EnrollmentStatus
    _count?: NestedIntFilter
    _min?: NestedEnumEnrollmentStatusFilter
    _max?: NestedEnumEnrollmentStatusFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type EnumNodeProgressStatusFilter = {
    equals?: NodeProgressStatus
    in?: Enumerable<NodeProgressStatus>
    notIn?: Enumerable<NodeProgressStatus>
    not?: NestedEnumNodeProgressStatusFilter | NodeProgressStatus
  }

  export type USER_ROADMAPS_PROGRESSRelationFilter = {
    is?: USER_ROADMAPS_PROGRESSWhereInput | null
    isNot?: USER_ROADMAPS_PROGRESSWhereInput | null
  }

  export type USER_NODE_PROGRESSUser_roadmap_idCourse_node_idCompoundUniqueInput = {
    user_roadmap_id: number
    course_node_id: number
  }

  export type USER_NODE_PROGRESSCountOrderByAggregateInput = {
    id?: SortOrder
    user_roadmap_id?: SortOrder
    course_node_id?: SortOrder
    status?: SortOrder
    credits_earned?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type USER_NODE_PROGRESSAvgOrderByAggregateInput = {
    id?: SortOrder
    user_roadmap_id?: SortOrder
    course_node_id?: SortOrder
    credits_earned?: SortOrder
  }

  export type USER_NODE_PROGRESSMaxOrderByAggregateInput = {
    id?: SortOrder
    user_roadmap_id?: SortOrder
    course_node_id?: SortOrder
    status?: SortOrder
    credits_earned?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type USER_NODE_PROGRESSMinOrderByAggregateInput = {
    id?: SortOrder
    user_roadmap_id?: SortOrder
    course_node_id?: SortOrder
    status?: SortOrder
    credits_earned?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type USER_NODE_PROGRESSSumOrderByAggregateInput = {
    id?: SortOrder
    user_roadmap_id?: SortOrder
    course_node_id?: SortOrder
    credits_earned?: SortOrder
  }

  export type EnumNodeProgressStatusWithAggregatesFilter = {
    equals?: NodeProgressStatus
    in?: Enumerable<NodeProgressStatus>
    notIn?: Enumerable<NodeProgressStatus>
    not?: NestedEnumNodeProgressStatusWithAggregatesFilter | NodeProgressStatus
    _count?: NestedIntFilter
    _min?: NestedEnumNodeProgressStatusFilter
    _max?: NestedEnumNodeProgressStatusFilter
  }

  export type USER_NODE_PROGRESSCreateNestedManyWithoutUserRoadmapInput = {
    create?: XOR<Enumerable<USER_NODE_PROGRESSCreateWithoutUserRoadmapInput>, Enumerable<USER_NODE_PROGRESSUncheckedCreateWithoutUserRoadmapInput>>
    connectOrCreate?: Enumerable<USER_NODE_PROGRESSCreateOrConnectWithoutUserRoadmapInput>
    createMany?: USER_NODE_PROGRESSCreateManyUserRoadmapInputEnvelope
    connect?: Enumerable<USER_NODE_PROGRESSWhereUniqueInput>
  }

  export type USER_NODE_PROGRESSUncheckedCreateNestedManyWithoutUserRoadmapInput = {
    create?: XOR<Enumerable<USER_NODE_PROGRESSCreateWithoutUserRoadmapInput>, Enumerable<USER_NODE_PROGRESSUncheckedCreateWithoutUserRoadmapInput>>
    connectOrCreate?: Enumerable<USER_NODE_PROGRESSCreateOrConnectWithoutUserRoadmapInput>
    createMany?: USER_NODE_PROGRESSCreateManyUserRoadmapInputEnvelope
    connect?: Enumerable<USER_NODE_PROGRESSWhereUniqueInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumEnrollmentStatusFieldUpdateOperationsInput = {
    set?: EnrollmentStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type USER_NODE_PROGRESSUpdateManyWithoutUserRoadmapNestedInput = {
    create?: XOR<Enumerable<USER_NODE_PROGRESSCreateWithoutUserRoadmapInput>, Enumerable<USER_NODE_PROGRESSUncheckedCreateWithoutUserRoadmapInput>>
    connectOrCreate?: Enumerable<USER_NODE_PROGRESSCreateOrConnectWithoutUserRoadmapInput>
    upsert?: Enumerable<USER_NODE_PROGRESSUpsertWithWhereUniqueWithoutUserRoadmapInput>
    createMany?: USER_NODE_PROGRESSCreateManyUserRoadmapInputEnvelope
    set?: Enumerable<USER_NODE_PROGRESSWhereUniqueInput>
    disconnect?: Enumerable<USER_NODE_PROGRESSWhereUniqueInput>
    delete?: Enumerable<USER_NODE_PROGRESSWhereUniqueInput>
    connect?: Enumerable<USER_NODE_PROGRESSWhereUniqueInput>
    update?: Enumerable<USER_NODE_PROGRESSUpdateWithWhereUniqueWithoutUserRoadmapInput>
    updateMany?: Enumerable<USER_NODE_PROGRESSUpdateManyWithWhereWithoutUserRoadmapInput>
    deleteMany?: Enumerable<USER_NODE_PROGRESSScalarWhereInput>
  }

  export type USER_NODE_PROGRESSUncheckedUpdateManyWithoutUserRoadmapNestedInput = {
    create?: XOR<Enumerable<USER_NODE_PROGRESSCreateWithoutUserRoadmapInput>, Enumerable<USER_NODE_PROGRESSUncheckedCreateWithoutUserRoadmapInput>>
    connectOrCreate?: Enumerable<USER_NODE_PROGRESSCreateOrConnectWithoutUserRoadmapInput>
    upsert?: Enumerable<USER_NODE_PROGRESSUpsertWithWhereUniqueWithoutUserRoadmapInput>
    createMany?: USER_NODE_PROGRESSCreateManyUserRoadmapInputEnvelope
    set?: Enumerable<USER_NODE_PROGRESSWhereUniqueInput>
    disconnect?: Enumerable<USER_NODE_PROGRESSWhereUniqueInput>
    delete?: Enumerable<USER_NODE_PROGRESSWhereUniqueInput>
    connect?: Enumerable<USER_NODE_PROGRESSWhereUniqueInput>
    update?: Enumerable<USER_NODE_PROGRESSUpdateWithWhereUniqueWithoutUserRoadmapInput>
    updateMany?: Enumerable<USER_NODE_PROGRESSUpdateManyWithWhereWithoutUserRoadmapInput>
    deleteMany?: Enumerable<USER_NODE_PROGRESSScalarWhereInput>
  }

  export type USER_ROADMAPS_PROGRESSCreateNestedOneWithoutUserNodeProgressInput = {
    create?: XOR<USER_ROADMAPS_PROGRESSCreateWithoutUserNodeProgressInput, USER_ROADMAPS_PROGRESSUncheckedCreateWithoutUserNodeProgressInput>
    connectOrCreate?: USER_ROADMAPS_PROGRESSCreateOrConnectWithoutUserNodeProgressInput
    connect?: USER_ROADMAPS_PROGRESSWhereUniqueInput
  }

  export type EnumNodeProgressStatusFieldUpdateOperationsInput = {
    set?: NodeProgressStatus
  }

  export type USER_ROADMAPS_PROGRESSUpdateOneRequiredWithoutUserNodeProgressNestedInput = {
    create?: XOR<USER_ROADMAPS_PROGRESSCreateWithoutUserNodeProgressInput, USER_ROADMAPS_PROGRESSUncheckedCreateWithoutUserNodeProgressInput>
    connectOrCreate?: USER_ROADMAPS_PROGRESSCreateOrConnectWithoutUserNodeProgressInput
    upsert?: USER_ROADMAPS_PROGRESSUpsertWithoutUserNodeProgressInput
    connect?: USER_ROADMAPS_PROGRESSWhereUniqueInput
    update?: XOR<USER_ROADMAPS_PROGRESSUpdateWithoutUserNodeProgressInput, USER_ROADMAPS_PROGRESSUncheckedUpdateWithoutUserNodeProgressInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedEnumEnrollmentStatusFilter = {
    equals?: EnrollmentStatus
    in?: Enumerable<EnrollmentStatus>
    notIn?: Enumerable<EnrollmentStatus>
    not?: NestedEnumEnrollmentStatusFilter | EnrollmentStatus
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedEnumEnrollmentStatusWithAggregatesFilter = {
    equals?: EnrollmentStatus
    in?: Enumerable<EnrollmentStatus>
    notIn?: Enumerable<EnrollmentStatus>
    not?: NestedEnumEnrollmentStatusWithAggregatesFilter | EnrollmentStatus
    _count?: NestedIntFilter
    _min?: NestedEnumEnrollmentStatusFilter
    _max?: NestedEnumEnrollmentStatusFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedEnumNodeProgressStatusFilter = {
    equals?: NodeProgressStatus
    in?: Enumerable<NodeProgressStatus>
    notIn?: Enumerable<NodeProgressStatus>
    not?: NestedEnumNodeProgressStatusFilter | NodeProgressStatus
  }

  export type NestedEnumNodeProgressStatusWithAggregatesFilter = {
    equals?: NodeProgressStatus
    in?: Enumerable<NodeProgressStatus>
    notIn?: Enumerable<NodeProgressStatus>
    not?: NestedEnumNodeProgressStatusWithAggregatesFilter | NodeProgressStatus
    _count?: NestedIntFilter
    _min?: NestedEnumNodeProgressStatusFilter
    _max?: NestedEnumNodeProgressStatusFilter
  }

  export type USER_NODE_PROGRESSCreateWithoutUserRoadmapInput = {
    course_node_id: number
    status: NodeProgressStatus
    credits_earned: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type USER_NODE_PROGRESSUncheckedCreateWithoutUserRoadmapInput = {
    id?: number
    course_node_id: number
    status: NodeProgressStatus
    credits_earned: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type USER_NODE_PROGRESSCreateOrConnectWithoutUserRoadmapInput = {
    where: USER_NODE_PROGRESSWhereUniqueInput
    create: XOR<USER_NODE_PROGRESSCreateWithoutUserRoadmapInput, USER_NODE_PROGRESSUncheckedCreateWithoutUserRoadmapInput>
  }

  export type USER_NODE_PROGRESSCreateManyUserRoadmapInputEnvelope = {
    data: Enumerable<USER_NODE_PROGRESSCreateManyUserRoadmapInput>
    skipDuplicates?: boolean
  }

  export type USER_NODE_PROGRESSUpsertWithWhereUniqueWithoutUserRoadmapInput = {
    where: USER_NODE_PROGRESSWhereUniqueInput
    update: XOR<USER_NODE_PROGRESSUpdateWithoutUserRoadmapInput, USER_NODE_PROGRESSUncheckedUpdateWithoutUserRoadmapInput>
    create: XOR<USER_NODE_PROGRESSCreateWithoutUserRoadmapInput, USER_NODE_PROGRESSUncheckedCreateWithoutUserRoadmapInput>
  }

  export type USER_NODE_PROGRESSUpdateWithWhereUniqueWithoutUserRoadmapInput = {
    where: USER_NODE_PROGRESSWhereUniqueInput
    data: XOR<USER_NODE_PROGRESSUpdateWithoutUserRoadmapInput, USER_NODE_PROGRESSUncheckedUpdateWithoutUserRoadmapInput>
  }

  export type USER_NODE_PROGRESSUpdateManyWithWhereWithoutUserRoadmapInput = {
    where: USER_NODE_PROGRESSScalarWhereInput
    data: XOR<USER_NODE_PROGRESSUpdateManyMutationInput, USER_NODE_PROGRESSUncheckedUpdateManyWithoutUserNodeProgressInput>
  }

  export type USER_NODE_PROGRESSScalarWhereInput = {
    AND?: Enumerable<USER_NODE_PROGRESSScalarWhereInput>
    OR?: Enumerable<USER_NODE_PROGRESSScalarWhereInput>
    NOT?: Enumerable<USER_NODE_PROGRESSScalarWhereInput>
    id?: IntFilter | number
    user_roadmap_id?: IntFilter | number
    course_node_id?: IntFilter | number
    status?: EnumNodeProgressStatusFilter | NodeProgressStatus
    credits_earned?: IntFilter | number
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeFilter | Date | string
  }

  export type USER_ROADMAPS_PROGRESSCreateWithoutUserNodeProgressInput = {
    user_id: number
    roadmap_id: number
    enrollment_status: EnrollmentStatus
    completion_percentage: number
    total_credits_earned: number
    total_credits_required: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type USER_ROADMAPS_PROGRESSUncheckedCreateWithoutUserNodeProgressInput = {
    id?: number
    user_id: number
    roadmap_id: number
    enrollment_status: EnrollmentStatus
    completion_percentage: number
    total_credits_earned: number
    total_credits_required: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type USER_ROADMAPS_PROGRESSCreateOrConnectWithoutUserNodeProgressInput = {
    where: USER_ROADMAPS_PROGRESSWhereUniqueInput
    create: XOR<USER_ROADMAPS_PROGRESSCreateWithoutUserNodeProgressInput, USER_ROADMAPS_PROGRESSUncheckedCreateWithoutUserNodeProgressInput>
  }

  export type USER_ROADMAPS_PROGRESSUpsertWithoutUserNodeProgressInput = {
    update: XOR<USER_ROADMAPS_PROGRESSUpdateWithoutUserNodeProgressInput, USER_ROADMAPS_PROGRESSUncheckedUpdateWithoutUserNodeProgressInput>
    create: XOR<USER_ROADMAPS_PROGRESSCreateWithoutUserNodeProgressInput, USER_ROADMAPS_PROGRESSUncheckedCreateWithoutUserNodeProgressInput>
  }

  export type USER_ROADMAPS_PROGRESSUpdateWithoutUserNodeProgressInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    roadmap_id?: IntFieldUpdateOperationsInput | number
    enrollment_status?: EnumEnrollmentStatusFieldUpdateOperationsInput | EnrollmentStatus
    completion_percentage?: IntFieldUpdateOperationsInput | number
    total_credits_earned?: IntFieldUpdateOperationsInput | number
    total_credits_required?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type USER_ROADMAPS_PROGRESSUncheckedUpdateWithoutUserNodeProgressInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    roadmap_id?: IntFieldUpdateOperationsInput | number
    enrollment_status?: EnumEnrollmentStatusFieldUpdateOperationsInput | EnrollmentStatus
    completion_percentage?: IntFieldUpdateOperationsInput | number
    total_credits_earned?: IntFieldUpdateOperationsInput | number
    total_credits_required?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type USER_NODE_PROGRESSCreateManyUserRoadmapInput = {
    id?: number
    course_node_id: number
    status: NodeProgressStatus
    credits_earned: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type USER_NODE_PROGRESSUpdateWithoutUserRoadmapInput = {
    course_node_id?: IntFieldUpdateOperationsInput | number
    status?: EnumNodeProgressStatusFieldUpdateOperationsInput | NodeProgressStatus
    credits_earned?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type USER_NODE_PROGRESSUncheckedUpdateWithoutUserRoadmapInput = {
    id?: IntFieldUpdateOperationsInput | number
    course_node_id?: IntFieldUpdateOperationsInput | number
    status?: EnumNodeProgressStatusFieldUpdateOperationsInput | NodeProgressStatus
    credits_earned?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type USER_NODE_PROGRESSUncheckedUpdateManyWithoutUserNodeProgressInput = {
    id?: IntFieldUpdateOperationsInput | number
    course_node_id?: IntFieldUpdateOperationsInput | number
    status?: EnumNodeProgressStatusFieldUpdateOperationsInput | NodeProgressStatus
    credits_earned?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}