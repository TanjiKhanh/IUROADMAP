
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions

export type PrismaPromise<T> = $Public.PrismaPromise<T>


export type UserRoadmapPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "UserRoadmap"
  objects: {
    nodes: UserRoadmapNodePayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: number
    userId: number
    masterRoadmapId: number
    title: string
    slug: string | null
    progressPercent: number
    totalNodes: number
    completedNodes: number
    startDate: Date
    targetDate: Date | null
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["userRoadmap"]>
  composites: {}
}

/**
 * Model UserRoadmap
 * 
 */
export type UserRoadmap = runtime.Types.DefaultSelection<UserRoadmapPayload>
export type UserRoadmapNodePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "UserRoadmapNode"
  objects: {
    userRoadmap: UserRoadmapPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: number
    userRoadmapId: number
    nodeKey: string
    status: RoadmapNodeStatus
    userNotesMd: string | null
    userResources: Prisma.JsonValue | null
    startedAt: Date | null
    completedAt: Date | null
    timeSpentMinutes: number
    difficultyRating: number | null
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["userRoadmapNode"]>
  composites: {}
}

/**
 * Model UserRoadmapNode
 * 
 */
export type UserRoadmapNode = runtime.Types.DefaultSelection<UserRoadmapNodePayload>
export type LearnerProfilePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "LearnerProfile"
  objects: {}
  scalars: $Extensions.GetResult<{
    userId: number
    universityDepartment: string | null
    major: string | null
    bio: Prisma.JsonValue | null
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["learnerProfile"]>
  composites: {}
}

/**
 * Model LearnerProfile
 * 
 */
export type LearnerProfile = runtime.Types.DefaultSelection<LearnerProfilePayload>

/**
 * Enums
 */

export const RoadmapNodeStatus: {
  AVAILABLE: 'AVAILABLE',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  SKIPPED: 'SKIPPED',
  LOCKED: 'LOCKED'
};

export type RoadmapNodeStatus = (typeof RoadmapNodeStatus)[keyof typeof RoadmapNodeStatus]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more UserRoadmaps
 * const userRoadmaps = await prisma.userRoadmap.findMany()
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
   * // Fetch zero or more UserRoadmaps
   * const userRoadmaps = await prisma.userRoadmap.findMany()
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
   * `prisma.userRoadmap`: Exposes CRUD operations for the **UserRoadmap** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserRoadmaps
    * const userRoadmaps = await prisma.userRoadmap.findMany()
    * ```
    */
  get userRoadmap(): Prisma.UserRoadmapDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.userRoadmapNode`: Exposes CRUD operations for the **UserRoadmapNode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserRoadmapNodes
    * const userRoadmapNodes = await prisma.userRoadmapNode.findMany()
    * ```
    */
  get userRoadmapNode(): Prisma.UserRoadmapNodeDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.learnerProfile`: Exposes CRUD operations for the **LearnerProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LearnerProfiles
    * const learnerProfiles = await prisma.learnerProfile.findMany()
    * ```
    */
  get learnerProfile(): Prisma.LearnerProfileDelegate<GlobalReject, ExtArgs>;
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
    UserRoadmap: 'UserRoadmap',
    UserRoadmapNode: 'UserRoadmapNode',
    LearnerProfile: 'LearnerProfile'
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
      modelProps: 'userRoadmap' | 'userRoadmapNode' | 'learnerProfile'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      UserRoadmap: {
        payload: UserRoadmapPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.UserRoadmapFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserRoadmapPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserRoadmapFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserRoadmapPayload>
          }
          findFirst: {
            args: Prisma.UserRoadmapFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserRoadmapPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserRoadmapFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserRoadmapPayload>
          }
          findMany: {
            args: Prisma.UserRoadmapFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserRoadmapPayload>[]
          }
          create: {
            args: Prisma.UserRoadmapCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserRoadmapPayload>
          }
          createMany: {
            args: Prisma.UserRoadmapCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserRoadmapDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserRoadmapPayload>
          }
          update: {
            args: Prisma.UserRoadmapUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserRoadmapPayload>
          }
          deleteMany: {
            args: Prisma.UserRoadmapDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserRoadmapUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserRoadmapUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserRoadmapPayload>
          }
          aggregate: {
            args: Prisma.UserRoadmapAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUserRoadmap>
          }
          groupBy: {
            args: Prisma.UserRoadmapGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserRoadmapGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserRoadmapCountArgs<ExtArgs>,
            result: $Utils.Optional<UserRoadmapCountAggregateOutputType> | number
          }
        }
      }
      UserRoadmapNode: {
        payload: UserRoadmapNodePayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.UserRoadmapNodeFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserRoadmapNodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserRoadmapNodeFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserRoadmapNodePayload>
          }
          findFirst: {
            args: Prisma.UserRoadmapNodeFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserRoadmapNodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserRoadmapNodeFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserRoadmapNodePayload>
          }
          findMany: {
            args: Prisma.UserRoadmapNodeFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserRoadmapNodePayload>[]
          }
          create: {
            args: Prisma.UserRoadmapNodeCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserRoadmapNodePayload>
          }
          createMany: {
            args: Prisma.UserRoadmapNodeCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserRoadmapNodeDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserRoadmapNodePayload>
          }
          update: {
            args: Prisma.UserRoadmapNodeUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserRoadmapNodePayload>
          }
          deleteMany: {
            args: Prisma.UserRoadmapNodeDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserRoadmapNodeUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserRoadmapNodeUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserRoadmapNodePayload>
          }
          aggregate: {
            args: Prisma.UserRoadmapNodeAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUserRoadmapNode>
          }
          groupBy: {
            args: Prisma.UserRoadmapNodeGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserRoadmapNodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserRoadmapNodeCountArgs<ExtArgs>,
            result: $Utils.Optional<UserRoadmapNodeCountAggregateOutputType> | number
          }
        }
      }
      LearnerProfile: {
        payload: LearnerProfilePayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.LearnerProfileFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<LearnerProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LearnerProfileFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<LearnerProfilePayload>
          }
          findFirst: {
            args: Prisma.LearnerProfileFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<LearnerProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LearnerProfileFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<LearnerProfilePayload>
          }
          findMany: {
            args: Prisma.LearnerProfileFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<LearnerProfilePayload>[]
          }
          create: {
            args: Prisma.LearnerProfileCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<LearnerProfilePayload>
          }
          createMany: {
            args: Prisma.LearnerProfileCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.LearnerProfileDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<LearnerProfilePayload>
          }
          update: {
            args: Prisma.LearnerProfileUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<LearnerProfilePayload>
          }
          deleteMany: {
            args: Prisma.LearnerProfileDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.LearnerProfileUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.LearnerProfileUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<LearnerProfilePayload>
          }
          aggregate: {
            args: Prisma.LearnerProfileAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateLearnerProfile>
          }
          groupBy: {
            args: Prisma.LearnerProfileGroupByArgs<ExtArgs>,
            result: $Utils.Optional<LearnerProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.LearnerProfileCountArgs<ExtArgs>,
            result: $Utils.Optional<LearnerProfileCountAggregateOutputType> | number
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
   * Count Type UserRoadmapCountOutputType
   */


  export type UserRoadmapCountOutputType = {
    nodes: number
  }

  export type UserRoadmapCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    nodes?: boolean | UserRoadmapCountOutputTypeCountNodesArgs
  }

  // Custom InputTypes

  /**
   * UserRoadmapCountOutputType without action
   */
  export type UserRoadmapCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoadmapCountOutputType
     */
    select?: UserRoadmapCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * UserRoadmapCountOutputType without action
   */
  export type UserRoadmapCountOutputTypeCountNodesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UserRoadmapNodeWhereInput
  }



  /**
   * Models
   */

  /**
   * Model UserRoadmap
   */


  export type AggregateUserRoadmap = {
    _count: UserRoadmapCountAggregateOutputType | null
    _avg: UserRoadmapAvgAggregateOutputType | null
    _sum: UserRoadmapSumAggregateOutputType | null
    _min: UserRoadmapMinAggregateOutputType | null
    _max: UserRoadmapMaxAggregateOutputType | null
  }

  export type UserRoadmapAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    masterRoadmapId: number | null
    progressPercent: number | null
    totalNodes: number | null
    completedNodes: number | null
  }

  export type UserRoadmapSumAggregateOutputType = {
    id: number | null
    userId: number | null
    masterRoadmapId: number | null
    progressPercent: number | null
    totalNodes: number | null
    completedNodes: number | null
  }

  export type UserRoadmapMinAggregateOutputType = {
    id: number | null
    userId: number | null
    masterRoadmapId: number | null
    title: string | null
    slug: string | null
    progressPercent: number | null
    totalNodes: number | null
    completedNodes: number | null
    startDate: Date | null
    targetDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserRoadmapMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    masterRoadmapId: number | null
    title: string | null
    slug: string | null
    progressPercent: number | null
    totalNodes: number | null
    completedNodes: number | null
    startDate: Date | null
    targetDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserRoadmapCountAggregateOutputType = {
    id: number
    userId: number
    masterRoadmapId: number
    title: number
    slug: number
    progressPercent: number
    totalNodes: number
    completedNodes: number
    startDate: number
    targetDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserRoadmapAvgAggregateInputType = {
    id?: true
    userId?: true
    masterRoadmapId?: true
    progressPercent?: true
    totalNodes?: true
    completedNodes?: true
  }

  export type UserRoadmapSumAggregateInputType = {
    id?: true
    userId?: true
    masterRoadmapId?: true
    progressPercent?: true
    totalNodes?: true
    completedNodes?: true
  }

  export type UserRoadmapMinAggregateInputType = {
    id?: true
    userId?: true
    masterRoadmapId?: true
    title?: true
    slug?: true
    progressPercent?: true
    totalNodes?: true
    completedNodes?: true
    startDate?: true
    targetDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserRoadmapMaxAggregateInputType = {
    id?: true
    userId?: true
    masterRoadmapId?: true
    title?: true
    slug?: true
    progressPercent?: true
    totalNodes?: true
    completedNodes?: true
    startDate?: true
    targetDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserRoadmapCountAggregateInputType = {
    id?: true
    userId?: true
    masterRoadmapId?: true
    title?: true
    slug?: true
    progressPercent?: true
    totalNodes?: true
    completedNodes?: true
    startDate?: true
    targetDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserRoadmapAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRoadmap to aggregate.
     */
    where?: UserRoadmapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoadmaps to fetch.
     */
    orderBy?: Enumerable<UserRoadmapOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserRoadmapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoadmaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoadmaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserRoadmaps
    **/
    _count?: true | UserRoadmapCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserRoadmapAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserRoadmapSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserRoadmapMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserRoadmapMaxAggregateInputType
  }

  export type GetUserRoadmapAggregateType<T extends UserRoadmapAggregateArgs> = {
        [P in keyof T & keyof AggregateUserRoadmap]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserRoadmap[P]>
      : GetScalarType<T[P], AggregateUserRoadmap[P]>
  }




  export type UserRoadmapGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UserRoadmapWhereInput
    orderBy?: Enumerable<UserRoadmapOrderByWithAggregationInput>
    by: UserRoadmapScalarFieldEnum[]
    having?: UserRoadmapScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserRoadmapCountAggregateInputType | true
    _avg?: UserRoadmapAvgAggregateInputType
    _sum?: UserRoadmapSumAggregateInputType
    _min?: UserRoadmapMinAggregateInputType
    _max?: UserRoadmapMaxAggregateInputType
  }


  export type UserRoadmapGroupByOutputType = {
    id: number
    userId: number
    masterRoadmapId: number
    title: string
    slug: string | null
    progressPercent: number
    totalNodes: number
    completedNodes: number
    startDate: Date
    targetDate: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserRoadmapCountAggregateOutputType | null
    _avg: UserRoadmapAvgAggregateOutputType | null
    _sum: UserRoadmapSumAggregateOutputType | null
    _min: UserRoadmapMinAggregateOutputType | null
    _max: UserRoadmapMaxAggregateOutputType | null
  }

  type GetUserRoadmapGroupByPayload<T extends UserRoadmapGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UserRoadmapGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserRoadmapGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserRoadmapGroupByOutputType[P]>
            : GetScalarType<T[P], UserRoadmapGroupByOutputType[P]>
        }
      >
    >


  export type UserRoadmapSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    masterRoadmapId?: boolean
    title?: boolean
    slug?: boolean
    progressPercent?: boolean
    totalNodes?: boolean
    completedNodes?: boolean
    startDate?: boolean
    targetDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    nodes?: boolean | UserRoadmap$nodesArgs<ExtArgs>
    _count?: boolean | UserRoadmapCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["userRoadmap"]>

  export type UserRoadmapSelectScalar = {
    id?: boolean
    userId?: boolean
    masterRoadmapId?: boolean
    title?: boolean
    slug?: boolean
    progressPercent?: boolean
    totalNodes?: boolean
    completedNodes?: boolean
    startDate?: boolean
    targetDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserRoadmapInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    nodes?: boolean | UserRoadmap$nodesArgs<ExtArgs>
    _count?: boolean | UserRoadmapCountOutputTypeArgs<ExtArgs>
  }


  type UserRoadmapGetPayload<S extends boolean | null | undefined | UserRoadmapArgs> = $Types.GetResult<UserRoadmapPayload, S>

  type UserRoadmapCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<UserRoadmapFindManyArgs, 'select' | 'include'> & {
      select?: UserRoadmapCountAggregateInputType | true
    }

  export interface UserRoadmapDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserRoadmap'], meta: { name: 'UserRoadmap' } }
    /**
     * Find zero or one UserRoadmap that matches the filter.
     * @param {UserRoadmapFindUniqueArgs} args - Arguments to find a UserRoadmap
     * @example
     * // Get one UserRoadmap
     * const userRoadmap = await prisma.userRoadmap.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserRoadmapFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserRoadmapFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'UserRoadmap'> extends True ? Prisma__UserRoadmapClient<$Types.GetResult<UserRoadmapPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__UserRoadmapClient<$Types.GetResult<UserRoadmapPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one UserRoadmap that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserRoadmapFindUniqueOrThrowArgs} args - Arguments to find a UserRoadmap
     * @example
     * // Get one UserRoadmap
     * const userRoadmap = await prisma.userRoadmap.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserRoadmapFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserRoadmapFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserRoadmapClient<$Types.GetResult<UserRoadmapPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first UserRoadmap that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoadmapFindFirstArgs} args - Arguments to find a UserRoadmap
     * @example
     * // Get one UserRoadmap
     * const userRoadmap = await prisma.userRoadmap.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserRoadmapFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserRoadmapFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'UserRoadmap'> extends True ? Prisma__UserRoadmapClient<$Types.GetResult<UserRoadmapPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__UserRoadmapClient<$Types.GetResult<UserRoadmapPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first UserRoadmap that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoadmapFindFirstOrThrowArgs} args - Arguments to find a UserRoadmap
     * @example
     * // Get one UserRoadmap
     * const userRoadmap = await prisma.userRoadmap.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserRoadmapFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserRoadmapFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserRoadmapClient<$Types.GetResult<UserRoadmapPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more UserRoadmaps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoadmapFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserRoadmaps
     * const userRoadmaps = await prisma.userRoadmap.findMany()
     * 
     * // Get first 10 UserRoadmaps
     * const userRoadmaps = await prisma.userRoadmap.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userRoadmapWithIdOnly = await prisma.userRoadmap.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserRoadmapFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserRoadmapFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<UserRoadmapPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a UserRoadmap.
     * @param {UserRoadmapCreateArgs} args - Arguments to create a UserRoadmap.
     * @example
     * // Create one UserRoadmap
     * const UserRoadmap = await prisma.userRoadmap.create({
     *   data: {
     *     // ... data to create a UserRoadmap
     *   }
     * })
     * 
    **/
    create<T extends UserRoadmapCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserRoadmapCreateArgs<ExtArgs>>
    ): Prisma__UserRoadmapClient<$Types.GetResult<UserRoadmapPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many UserRoadmaps.
     *     @param {UserRoadmapCreateManyArgs} args - Arguments to create many UserRoadmaps.
     *     @example
     *     // Create many UserRoadmaps
     *     const userRoadmap = await prisma.userRoadmap.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserRoadmapCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserRoadmapCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserRoadmap.
     * @param {UserRoadmapDeleteArgs} args - Arguments to delete one UserRoadmap.
     * @example
     * // Delete one UserRoadmap
     * const UserRoadmap = await prisma.userRoadmap.delete({
     *   where: {
     *     // ... filter to delete one UserRoadmap
     *   }
     * })
     * 
    **/
    delete<T extends UserRoadmapDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserRoadmapDeleteArgs<ExtArgs>>
    ): Prisma__UserRoadmapClient<$Types.GetResult<UserRoadmapPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one UserRoadmap.
     * @param {UserRoadmapUpdateArgs} args - Arguments to update one UserRoadmap.
     * @example
     * // Update one UserRoadmap
     * const userRoadmap = await prisma.userRoadmap.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserRoadmapUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserRoadmapUpdateArgs<ExtArgs>>
    ): Prisma__UserRoadmapClient<$Types.GetResult<UserRoadmapPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more UserRoadmaps.
     * @param {UserRoadmapDeleteManyArgs} args - Arguments to filter UserRoadmaps to delete.
     * @example
     * // Delete a few UserRoadmaps
     * const { count } = await prisma.userRoadmap.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserRoadmapDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserRoadmapDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRoadmaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoadmapUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserRoadmaps
     * const userRoadmap = await prisma.userRoadmap.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserRoadmapUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserRoadmapUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserRoadmap.
     * @param {UserRoadmapUpsertArgs} args - Arguments to update or create a UserRoadmap.
     * @example
     * // Update or create a UserRoadmap
     * const userRoadmap = await prisma.userRoadmap.upsert({
     *   create: {
     *     // ... data to create a UserRoadmap
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserRoadmap we want to update
     *   }
     * })
    **/
    upsert<T extends UserRoadmapUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserRoadmapUpsertArgs<ExtArgs>>
    ): Prisma__UserRoadmapClient<$Types.GetResult<UserRoadmapPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of UserRoadmaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoadmapCountArgs} args - Arguments to filter UserRoadmaps to count.
     * @example
     * // Count the number of UserRoadmaps
     * const count = await prisma.userRoadmap.count({
     *   where: {
     *     // ... the filter for the UserRoadmaps we want to count
     *   }
     * })
    **/
    count<T extends UserRoadmapCountArgs>(
      args?: Subset<T, UserRoadmapCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserRoadmapCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserRoadmap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoadmapAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserRoadmapAggregateArgs>(args: Subset<T, UserRoadmapAggregateArgs>): Prisma.PrismaPromise<GetUserRoadmapAggregateType<T>>

    /**
     * Group by UserRoadmap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoadmapGroupByArgs} args - Group by arguments.
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
      T extends UserRoadmapGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserRoadmapGroupByArgs['orderBy'] }
        : { orderBy?: UserRoadmapGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserRoadmapGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserRoadmapGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for UserRoadmap.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserRoadmapClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
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

    nodes<T extends UserRoadmap$nodesArgs<ExtArgs> = {}>(args?: Subset<T, UserRoadmap$nodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<UserRoadmapNodePayload<ExtArgs>, T, 'findMany', never>| Null>;

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
   * UserRoadmap base type for findUnique actions
   */
  export type UserRoadmapFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoadmap
     */
    select?: UserRoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoadmapInclude<ExtArgs> | null
    /**
     * Filter, which UserRoadmap to fetch.
     */
    where: UserRoadmapWhereUniqueInput
  }

  /**
   * UserRoadmap findUnique
   */
  export interface UserRoadmapFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends UserRoadmapFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * UserRoadmap findUniqueOrThrow
   */
  export type UserRoadmapFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoadmap
     */
    select?: UserRoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoadmapInclude<ExtArgs> | null
    /**
     * Filter, which UserRoadmap to fetch.
     */
    where: UserRoadmapWhereUniqueInput
  }


  /**
   * UserRoadmap base type for findFirst actions
   */
  export type UserRoadmapFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoadmap
     */
    select?: UserRoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoadmapInclude<ExtArgs> | null
    /**
     * Filter, which UserRoadmap to fetch.
     */
    where?: UserRoadmapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoadmaps to fetch.
     */
    orderBy?: Enumerable<UserRoadmapOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRoadmaps.
     */
    cursor?: UserRoadmapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoadmaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoadmaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoadmaps.
     */
    distinct?: Enumerable<UserRoadmapScalarFieldEnum>
  }

  /**
   * UserRoadmap findFirst
   */
  export interface UserRoadmapFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends UserRoadmapFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * UserRoadmap findFirstOrThrow
   */
  export type UserRoadmapFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoadmap
     */
    select?: UserRoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoadmapInclude<ExtArgs> | null
    /**
     * Filter, which UserRoadmap to fetch.
     */
    where?: UserRoadmapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoadmaps to fetch.
     */
    orderBy?: Enumerable<UserRoadmapOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRoadmaps.
     */
    cursor?: UserRoadmapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoadmaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoadmaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoadmaps.
     */
    distinct?: Enumerable<UserRoadmapScalarFieldEnum>
  }


  /**
   * UserRoadmap findMany
   */
  export type UserRoadmapFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoadmap
     */
    select?: UserRoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoadmapInclude<ExtArgs> | null
    /**
     * Filter, which UserRoadmaps to fetch.
     */
    where?: UserRoadmapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoadmaps to fetch.
     */
    orderBy?: Enumerable<UserRoadmapOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserRoadmaps.
     */
    cursor?: UserRoadmapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoadmaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoadmaps.
     */
    skip?: number
    distinct?: Enumerable<UserRoadmapScalarFieldEnum>
  }


  /**
   * UserRoadmap create
   */
  export type UserRoadmapCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoadmap
     */
    select?: UserRoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoadmapInclude<ExtArgs> | null
    /**
     * The data needed to create a UserRoadmap.
     */
    data: XOR<UserRoadmapCreateInput, UserRoadmapUncheckedCreateInput>
  }


  /**
   * UserRoadmap createMany
   */
  export type UserRoadmapCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserRoadmaps.
     */
    data: Enumerable<UserRoadmapCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * UserRoadmap update
   */
  export type UserRoadmapUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoadmap
     */
    select?: UserRoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoadmapInclude<ExtArgs> | null
    /**
     * The data needed to update a UserRoadmap.
     */
    data: XOR<UserRoadmapUpdateInput, UserRoadmapUncheckedUpdateInput>
    /**
     * Choose, which UserRoadmap to update.
     */
    where: UserRoadmapWhereUniqueInput
  }


  /**
   * UserRoadmap updateMany
   */
  export type UserRoadmapUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserRoadmaps.
     */
    data: XOR<UserRoadmapUpdateManyMutationInput, UserRoadmapUncheckedUpdateManyInput>
    /**
     * Filter which UserRoadmaps to update
     */
    where?: UserRoadmapWhereInput
  }


  /**
   * UserRoadmap upsert
   */
  export type UserRoadmapUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoadmap
     */
    select?: UserRoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoadmapInclude<ExtArgs> | null
    /**
     * The filter to search for the UserRoadmap to update in case it exists.
     */
    where: UserRoadmapWhereUniqueInput
    /**
     * In case the UserRoadmap found by the `where` argument doesn't exist, create a new UserRoadmap with this data.
     */
    create: XOR<UserRoadmapCreateInput, UserRoadmapUncheckedCreateInput>
    /**
     * In case the UserRoadmap was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserRoadmapUpdateInput, UserRoadmapUncheckedUpdateInput>
  }


  /**
   * UserRoadmap delete
   */
  export type UserRoadmapDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoadmap
     */
    select?: UserRoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoadmapInclude<ExtArgs> | null
    /**
     * Filter which UserRoadmap to delete.
     */
    where: UserRoadmapWhereUniqueInput
  }


  /**
   * UserRoadmap deleteMany
   */
  export type UserRoadmapDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRoadmaps to delete
     */
    where?: UserRoadmapWhereInput
  }


  /**
   * UserRoadmap.nodes
   */
  export type UserRoadmap$nodesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoadmapNode
     */
    select?: UserRoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoadmapNodeInclude<ExtArgs> | null
    where?: UserRoadmapNodeWhereInput
    orderBy?: Enumerable<UserRoadmapNodeOrderByWithRelationInput>
    cursor?: UserRoadmapNodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<UserRoadmapNodeScalarFieldEnum>
  }


  /**
   * UserRoadmap without action
   */
  export type UserRoadmapArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoadmap
     */
    select?: UserRoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoadmapInclude<ExtArgs> | null
  }



  /**
   * Model UserRoadmapNode
   */


  export type AggregateUserRoadmapNode = {
    _count: UserRoadmapNodeCountAggregateOutputType | null
    _avg: UserRoadmapNodeAvgAggregateOutputType | null
    _sum: UserRoadmapNodeSumAggregateOutputType | null
    _min: UserRoadmapNodeMinAggregateOutputType | null
    _max: UserRoadmapNodeMaxAggregateOutputType | null
  }

  export type UserRoadmapNodeAvgAggregateOutputType = {
    id: number | null
    userRoadmapId: number | null
    timeSpentMinutes: number | null
    difficultyRating: number | null
  }

  export type UserRoadmapNodeSumAggregateOutputType = {
    id: number | null
    userRoadmapId: number | null
    timeSpentMinutes: number | null
    difficultyRating: number | null
  }

  export type UserRoadmapNodeMinAggregateOutputType = {
    id: number | null
    userRoadmapId: number | null
    nodeKey: string | null
    status: RoadmapNodeStatus | null
    userNotesMd: string | null
    startedAt: Date | null
    completedAt: Date | null
    timeSpentMinutes: number | null
    difficultyRating: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserRoadmapNodeMaxAggregateOutputType = {
    id: number | null
    userRoadmapId: number | null
    nodeKey: string | null
    status: RoadmapNodeStatus | null
    userNotesMd: string | null
    startedAt: Date | null
    completedAt: Date | null
    timeSpentMinutes: number | null
    difficultyRating: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserRoadmapNodeCountAggregateOutputType = {
    id: number
    userRoadmapId: number
    nodeKey: number
    status: number
    userNotesMd: number
    userResources: number
    startedAt: number
    completedAt: number
    timeSpentMinutes: number
    difficultyRating: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserRoadmapNodeAvgAggregateInputType = {
    id?: true
    userRoadmapId?: true
    timeSpentMinutes?: true
    difficultyRating?: true
  }

  export type UserRoadmapNodeSumAggregateInputType = {
    id?: true
    userRoadmapId?: true
    timeSpentMinutes?: true
    difficultyRating?: true
  }

  export type UserRoadmapNodeMinAggregateInputType = {
    id?: true
    userRoadmapId?: true
    nodeKey?: true
    status?: true
    userNotesMd?: true
    startedAt?: true
    completedAt?: true
    timeSpentMinutes?: true
    difficultyRating?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserRoadmapNodeMaxAggregateInputType = {
    id?: true
    userRoadmapId?: true
    nodeKey?: true
    status?: true
    userNotesMd?: true
    startedAt?: true
    completedAt?: true
    timeSpentMinutes?: true
    difficultyRating?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserRoadmapNodeCountAggregateInputType = {
    id?: true
    userRoadmapId?: true
    nodeKey?: true
    status?: true
    userNotesMd?: true
    userResources?: true
    startedAt?: true
    completedAt?: true
    timeSpentMinutes?: true
    difficultyRating?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserRoadmapNodeAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRoadmapNode to aggregate.
     */
    where?: UserRoadmapNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoadmapNodes to fetch.
     */
    orderBy?: Enumerable<UserRoadmapNodeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserRoadmapNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoadmapNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoadmapNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserRoadmapNodes
    **/
    _count?: true | UserRoadmapNodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserRoadmapNodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserRoadmapNodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserRoadmapNodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserRoadmapNodeMaxAggregateInputType
  }

  export type GetUserRoadmapNodeAggregateType<T extends UserRoadmapNodeAggregateArgs> = {
        [P in keyof T & keyof AggregateUserRoadmapNode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserRoadmapNode[P]>
      : GetScalarType<T[P], AggregateUserRoadmapNode[P]>
  }




  export type UserRoadmapNodeGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UserRoadmapNodeWhereInput
    orderBy?: Enumerable<UserRoadmapNodeOrderByWithAggregationInput>
    by: UserRoadmapNodeScalarFieldEnum[]
    having?: UserRoadmapNodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserRoadmapNodeCountAggregateInputType | true
    _avg?: UserRoadmapNodeAvgAggregateInputType
    _sum?: UserRoadmapNodeSumAggregateInputType
    _min?: UserRoadmapNodeMinAggregateInputType
    _max?: UserRoadmapNodeMaxAggregateInputType
  }


  export type UserRoadmapNodeGroupByOutputType = {
    id: number
    userRoadmapId: number
    nodeKey: string
    status: RoadmapNodeStatus
    userNotesMd: string | null
    userResources: JsonValue | null
    startedAt: Date | null
    completedAt: Date | null
    timeSpentMinutes: number
    difficultyRating: number | null
    createdAt: Date
    updatedAt: Date
    _count: UserRoadmapNodeCountAggregateOutputType | null
    _avg: UserRoadmapNodeAvgAggregateOutputType | null
    _sum: UserRoadmapNodeSumAggregateOutputType | null
    _min: UserRoadmapNodeMinAggregateOutputType | null
    _max: UserRoadmapNodeMaxAggregateOutputType | null
  }

  type GetUserRoadmapNodeGroupByPayload<T extends UserRoadmapNodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UserRoadmapNodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserRoadmapNodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserRoadmapNodeGroupByOutputType[P]>
            : GetScalarType<T[P], UserRoadmapNodeGroupByOutputType[P]>
        }
      >
    >


  export type UserRoadmapNodeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userRoadmapId?: boolean
    nodeKey?: boolean
    status?: boolean
    userNotesMd?: boolean
    userResources?: boolean
    startedAt?: boolean
    completedAt?: boolean
    timeSpentMinutes?: boolean
    difficultyRating?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userRoadmap?: boolean | UserRoadmapArgs<ExtArgs>
  }, ExtArgs["result"]["userRoadmapNode"]>

  export type UserRoadmapNodeSelectScalar = {
    id?: boolean
    userRoadmapId?: boolean
    nodeKey?: boolean
    status?: boolean
    userNotesMd?: boolean
    userResources?: boolean
    startedAt?: boolean
    completedAt?: boolean
    timeSpentMinutes?: boolean
    difficultyRating?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserRoadmapNodeInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    userRoadmap?: boolean | UserRoadmapArgs<ExtArgs>
  }


  type UserRoadmapNodeGetPayload<S extends boolean | null | undefined | UserRoadmapNodeArgs> = $Types.GetResult<UserRoadmapNodePayload, S>

  type UserRoadmapNodeCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<UserRoadmapNodeFindManyArgs, 'select' | 'include'> & {
      select?: UserRoadmapNodeCountAggregateInputType | true
    }

  export interface UserRoadmapNodeDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserRoadmapNode'], meta: { name: 'UserRoadmapNode' } }
    /**
     * Find zero or one UserRoadmapNode that matches the filter.
     * @param {UserRoadmapNodeFindUniqueArgs} args - Arguments to find a UserRoadmapNode
     * @example
     * // Get one UserRoadmapNode
     * const userRoadmapNode = await prisma.userRoadmapNode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserRoadmapNodeFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserRoadmapNodeFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'UserRoadmapNode'> extends True ? Prisma__UserRoadmapNodeClient<$Types.GetResult<UserRoadmapNodePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__UserRoadmapNodeClient<$Types.GetResult<UserRoadmapNodePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one UserRoadmapNode that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserRoadmapNodeFindUniqueOrThrowArgs} args - Arguments to find a UserRoadmapNode
     * @example
     * // Get one UserRoadmapNode
     * const userRoadmapNode = await prisma.userRoadmapNode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserRoadmapNodeFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserRoadmapNodeFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserRoadmapNodeClient<$Types.GetResult<UserRoadmapNodePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first UserRoadmapNode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoadmapNodeFindFirstArgs} args - Arguments to find a UserRoadmapNode
     * @example
     * // Get one UserRoadmapNode
     * const userRoadmapNode = await prisma.userRoadmapNode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserRoadmapNodeFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserRoadmapNodeFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'UserRoadmapNode'> extends True ? Prisma__UserRoadmapNodeClient<$Types.GetResult<UserRoadmapNodePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__UserRoadmapNodeClient<$Types.GetResult<UserRoadmapNodePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first UserRoadmapNode that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoadmapNodeFindFirstOrThrowArgs} args - Arguments to find a UserRoadmapNode
     * @example
     * // Get one UserRoadmapNode
     * const userRoadmapNode = await prisma.userRoadmapNode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserRoadmapNodeFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserRoadmapNodeFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserRoadmapNodeClient<$Types.GetResult<UserRoadmapNodePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more UserRoadmapNodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoadmapNodeFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserRoadmapNodes
     * const userRoadmapNodes = await prisma.userRoadmapNode.findMany()
     * 
     * // Get first 10 UserRoadmapNodes
     * const userRoadmapNodes = await prisma.userRoadmapNode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userRoadmapNodeWithIdOnly = await prisma.userRoadmapNode.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserRoadmapNodeFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserRoadmapNodeFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<UserRoadmapNodePayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a UserRoadmapNode.
     * @param {UserRoadmapNodeCreateArgs} args - Arguments to create a UserRoadmapNode.
     * @example
     * // Create one UserRoadmapNode
     * const UserRoadmapNode = await prisma.userRoadmapNode.create({
     *   data: {
     *     // ... data to create a UserRoadmapNode
     *   }
     * })
     * 
    **/
    create<T extends UserRoadmapNodeCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserRoadmapNodeCreateArgs<ExtArgs>>
    ): Prisma__UserRoadmapNodeClient<$Types.GetResult<UserRoadmapNodePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many UserRoadmapNodes.
     *     @param {UserRoadmapNodeCreateManyArgs} args - Arguments to create many UserRoadmapNodes.
     *     @example
     *     // Create many UserRoadmapNodes
     *     const userRoadmapNode = await prisma.userRoadmapNode.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserRoadmapNodeCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserRoadmapNodeCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserRoadmapNode.
     * @param {UserRoadmapNodeDeleteArgs} args - Arguments to delete one UserRoadmapNode.
     * @example
     * // Delete one UserRoadmapNode
     * const UserRoadmapNode = await prisma.userRoadmapNode.delete({
     *   where: {
     *     // ... filter to delete one UserRoadmapNode
     *   }
     * })
     * 
    **/
    delete<T extends UserRoadmapNodeDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserRoadmapNodeDeleteArgs<ExtArgs>>
    ): Prisma__UserRoadmapNodeClient<$Types.GetResult<UserRoadmapNodePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one UserRoadmapNode.
     * @param {UserRoadmapNodeUpdateArgs} args - Arguments to update one UserRoadmapNode.
     * @example
     * // Update one UserRoadmapNode
     * const userRoadmapNode = await prisma.userRoadmapNode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserRoadmapNodeUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserRoadmapNodeUpdateArgs<ExtArgs>>
    ): Prisma__UserRoadmapNodeClient<$Types.GetResult<UserRoadmapNodePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more UserRoadmapNodes.
     * @param {UserRoadmapNodeDeleteManyArgs} args - Arguments to filter UserRoadmapNodes to delete.
     * @example
     * // Delete a few UserRoadmapNodes
     * const { count } = await prisma.userRoadmapNode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserRoadmapNodeDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserRoadmapNodeDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRoadmapNodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoadmapNodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserRoadmapNodes
     * const userRoadmapNode = await prisma.userRoadmapNode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserRoadmapNodeUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserRoadmapNodeUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserRoadmapNode.
     * @param {UserRoadmapNodeUpsertArgs} args - Arguments to update or create a UserRoadmapNode.
     * @example
     * // Update or create a UserRoadmapNode
     * const userRoadmapNode = await prisma.userRoadmapNode.upsert({
     *   create: {
     *     // ... data to create a UserRoadmapNode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserRoadmapNode we want to update
     *   }
     * })
    **/
    upsert<T extends UserRoadmapNodeUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserRoadmapNodeUpsertArgs<ExtArgs>>
    ): Prisma__UserRoadmapNodeClient<$Types.GetResult<UserRoadmapNodePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of UserRoadmapNodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoadmapNodeCountArgs} args - Arguments to filter UserRoadmapNodes to count.
     * @example
     * // Count the number of UserRoadmapNodes
     * const count = await prisma.userRoadmapNode.count({
     *   where: {
     *     // ... the filter for the UserRoadmapNodes we want to count
     *   }
     * })
    **/
    count<T extends UserRoadmapNodeCountArgs>(
      args?: Subset<T, UserRoadmapNodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserRoadmapNodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserRoadmapNode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoadmapNodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserRoadmapNodeAggregateArgs>(args: Subset<T, UserRoadmapNodeAggregateArgs>): Prisma.PrismaPromise<GetUserRoadmapNodeAggregateType<T>>

    /**
     * Group by UserRoadmapNode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoadmapNodeGroupByArgs} args - Group by arguments.
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
      T extends UserRoadmapNodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserRoadmapNodeGroupByArgs['orderBy'] }
        : { orderBy?: UserRoadmapNodeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserRoadmapNodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserRoadmapNodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for UserRoadmapNode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserRoadmapNodeClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
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

    userRoadmap<T extends UserRoadmapArgs<ExtArgs> = {}>(args?: Subset<T, UserRoadmapArgs<ExtArgs>>): Prisma__UserRoadmapClient<$Types.GetResult<UserRoadmapPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

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
   * UserRoadmapNode base type for findUnique actions
   */
  export type UserRoadmapNodeFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoadmapNode
     */
    select?: UserRoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoadmapNodeInclude<ExtArgs> | null
    /**
     * Filter, which UserRoadmapNode to fetch.
     */
    where: UserRoadmapNodeWhereUniqueInput
  }

  /**
   * UserRoadmapNode findUnique
   */
  export interface UserRoadmapNodeFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends UserRoadmapNodeFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * UserRoadmapNode findUniqueOrThrow
   */
  export type UserRoadmapNodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoadmapNode
     */
    select?: UserRoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoadmapNodeInclude<ExtArgs> | null
    /**
     * Filter, which UserRoadmapNode to fetch.
     */
    where: UserRoadmapNodeWhereUniqueInput
  }


  /**
   * UserRoadmapNode base type for findFirst actions
   */
  export type UserRoadmapNodeFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoadmapNode
     */
    select?: UserRoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoadmapNodeInclude<ExtArgs> | null
    /**
     * Filter, which UserRoadmapNode to fetch.
     */
    where?: UserRoadmapNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoadmapNodes to fetch.
     */
    orderBy?: Enumerable<UserRoadmapNodeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRoadmapNodes.
     */
    cursor?: UserRoadmapNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoadmapNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoadmapNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoadmapNodes.
     */
    distinct?: Enumerable<UserRoadmapNodeScalarFieldEnum>
  }

  /**
   * UserRoadmapNode findFirst
   */
  export interface UserRoadmapNodeFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends UserRoadmapNodeFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * UserRoadmapNode findFirstOrThrow
   */
  export type UserRoadmapNodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoadmapNode
     */
    select?: UserRoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoadmapNodeInclude<ExtArgs> | null
    /**
     * Filter, which UserRoadmapNode to fetch.
     */
    where?: UserRoadmapNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoadmapNodes to fetch.
     */
    orderBy?: Enumerable<UserRoadmapNodeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRoadmapNodes.
     */
    cursor?: UserRoadmapNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoadmapNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoadmapNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoadmapNodes.
     */
    distinct?: Enumerable<UserRoadmapNodeScalarFieldEnum>
  }


  /**
   * UserRoadmapNode findMany
   */
  export type UserRoadmapNodeFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoadmapNode
     */
    select?: UserRoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoadmapNodeInclude<ExtArgs> | null
    /**
     * Filter, which UserRoadmapNodes to fetch.
     */
    where?: UserRoadmapNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoadmapNodes to fetch.
     */
    orderBy?: Enumerable<UserRoadmapNodeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserRoadmapNodes.
     */
    cursor?: UserRoadmapNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoadmapNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoadmapNodes.
     */
    skip?: number
    distinct?: Enumerable<UserRoadmapNodeScalarFieldEnum>
  }


  /**
   * UserRoadmapNode create
   */
  export type UserRoadmapNodeCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoadmapNode
     */
    select?: UserRoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoadmapNodeInclude<ExtArgs> | null
    /**
     * The data needed to create a UserRoadmapNode.
     */
    data: XOR<UserRoadmapNodeCreateInput, UserRoadmapNodeUncheckedCreateInput>
  }


  /**
   * UserRoadmapNode createMany
   */
  export type UserRoadmapNodeCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserRoadmapNodes.
     */
    data: Enumerable<UserRoadmapNodeCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * UserRoadmapNode update
   */
  export type UserRoadmapNodeUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoadmapNode
     */
    select?: UserRoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoadmapNodeInclude<ExtArgs> | null
    /**
     * The data needed to update a UserRoadmapNode.
     */
    data: XOR<UserRoadmapNodeUpdateInput, UserRoadmapNodeUncheckedUpdateInput>
    /**
     * Choose, which UserRoadmapNode to update.
     */
    where: UserRoadmapNodeWhereUniqueInput
  }


  /**
   * UserRoadmapNode updateMany
   */
  export type UserRoadmapNodeUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserRoadmapNodes.
     */
    data: XOR<UserRoadmapNodeUpdateManyMutationInput, UserRoadmapNodeUncheckedUpdateManyInput>
    /**
     * Filter which UserRoadmapNodes to update
     */
    where?: UserRoadmapNodeWhereInput
  }


  /**
   * UserRoadmapNode upsert
   */
  export type UserRoadmapNodeUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoadmapNode
     */
    select?: UserRoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoadmapNodeInclude<ExtArgs> | null
    /**
     * The filter to search for the UserRoadmapNode to update in case it exists.
     */
    where: UserRoadmapNodeWhereUniqueInput
    /**
     * In case the UserRoadmapNode found by the `where` argument doesn't exist, create a new UserRoadmapNode with this data.
     */
    create: XOR<UserRoadmapNodeCreateInput, UserRoadmapNodeUncheckedCreateInput>
    /**
     * In case the UserRoadmapNode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserRoadmapNodeUpdateInput, UserRoadmapNodeUncheckedUpdateInput>
  }


  /**
   * UserRoadmapNode delete
   */
  export type UserRoadmapNodeDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoadmapNode
     */
    select?: UserRoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoadmapNodeInclude<ExtArgs> | null
    /**
     * Filter which UserRoadmapNode to delete.
     */
    where: UserRoadmapNodeWhereUniqueInput
  }


  /**
   * UserRoadmapNode deleteMany
   */
  export type UserRoadmapNodeDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRoadmapNodes to delete
     */
    where?: UserRoadmapNodeWhereInput
  }


  /**
   * UserRoadmapNode without action
   */
  export type UserRoadmapNodeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoadmapNode
     */
    select?: UserRoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserRoadmapNodeInclude<ExtArgs> | null
  }



  /**
   * Model LearnerProfile
   */


  export type AggregateLearnerProfile = {
    _count: LearnerProfileCountAggregateOutputType | null
    _avg: LearnerProfileAvgAggregateOutputType | null
    _sum: LearnerProfileSumAggregateOutputType | null
    _min: LearnerProfileMinAggregateOutputType | null
    _max: LearnerProfileMaxAggregateOutputType | null
  }

  export type LearnerProfileAvgAggregateOutputType = {
    userId: number | null
  }

  export type LearnerProfileSumAggregateOutputType = {
    userId: number | null
  }

  export type LearnerProfileMinAggregateOutputType = {
    userId: number | null
    universityDepartment: string | null
    major: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LearnerProfileMaxAggregateOutputType = {
    userId: number | null
    universityDepartment: string | null
    major: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LearnerProfileCountAggregateOutputType = {
    userId: number
    universityDepartment: number
    major: number
    bio: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LearnerProfileAvgAggregateInputType = {
    userId?: true
  }

  export type LearnerProfileSumAggregateInputType = {
    userId?: true
  }

  export type LearnerProfileMinAggregateInputType = {
    userId?: true
    universityDepartment?: true
    major?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LearnerProfileMaxAggregateInputType = {
    userId?: true
    universityDepartment?: true
    major?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LearnerProfileCountAggregateInputType = {
    userId?: true
    universityDepartment?: true
    major?: true
    bio?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LearnerProfileAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearnerProfile to aggregate.
     */
    where?: LearnerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearnerProfiles to fetch.
     */
    orderBy?: Enumerable<LearnerProfileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LearnerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearnerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearnerProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LearnerProfiles
    **/
    _count?: true | LearnerProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LearnerProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LearnerProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LearnerProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LearnerProfileMaxAggregateInputType
  }

  export type GetLearnerProfileAggregateType<T extends LearnerProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateLearnerProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLearnerProfile[P]>
      : GetScalarType<T[P], AggregateLearnerProfile[P]>
  }




  export type LearnerProfileGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: LearnerProfileWhereInput
    orderBy?: Enumerable<LearnerProfileOrderByWithAggregationInput>
    by: LearnerProfileScalarFieldEnum[]
    having?: LearnerProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LearnerProfileCountAggregateInputType | true
    _avg?: LearnerProfileAvgAggregateInputType
    _sum?: LearnerProfileSumAggregateInputType
    _min?: LearnerProfileMinAggregateInputType
    _max?: LearnerProfileMaxAggregateInputType
  }


  export type LearnerProfileGroupByOutputType = {
    userId: number
    universityDepartment: string | null
    major: string | null
    bio: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: LearnerProfileCountAggregateOutputType | null
    _avg: LearnerProfileAvgAggregateOutputType | null
    _sum: LearnerProfileSumAggregateOutputType | null
    _min: LearnerProfileMinAggregateOutputType | null
    _max: LearnerProfileMaxAggregateOutputType | null
  }

  type GetLearnerProfileGroupByPayload<T extends LearnerProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<LearnerProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LearnerProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LearnerProfileGroupByOutputType[P]>
            : GetScalarType<T[P], LearnerProfileGroupByOutputType[P]>
        }
      >
    >


  export type LearnerProfileSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    universityDepartment?: boolean
    major?: boolean
    bio?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["learnerProfile"]>

  export type LearnerProfileSelectScalar = {
    userId?: boolean
    universityDepartment?: boolean
    major?: boolean
    bio?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  type LearnerProfileGetPayload<S extends boolean | null | undefined | LearnerProfileArgs> = $Types.GetResult<LearnerProfilePayload, S>

  type LearnerProfileCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<LearnerProfileFindManyArgs, 'select' | 'include'> & {
      select?: LearnerProfileCountAggregateInputType | true
    }

  export interface LearnerProfileDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LearnerProfile'], meta: { name: 'LearnerProfile' } }
    /**
     * Find zero or one LearnerProfile that matches the filter.
     * @param {LearnerProfileFindUniqueArgs} args - Arguments to find a LearnerProfile
     * @example
     * // Get one LearnerProfile
     * const learnerProfile = await prisma.learnerProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends LearnerProfileFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, LearnerProfileFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'LearnerProfile'> extends True ? Prisma__LearnerProfileClient<$Types.GetResult<LearnerProfilePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__LearnerProfileClient<$Types.GetResult<LearnerProfilePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one LearnerProfile that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {LearnerProfileFindUniqueOrThrowArgs} args - Arguments to find a LearnerProfile
     * @example
     * // Get one LearnerProfile
     * const learnerProfile = await prisma.learnerProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends LearnerProfileFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, LearnerProfileFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__LearnerProfileClient<$Types.GetResult<LearnerProfilePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first LearnerProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearnerProfileFindFirstArgs} args - Arguments to find a LearnerProfile
     * @example
     * // Get one LearnerProfile
     * const learnerProfile = await prisma.learnerProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends LearnerProfileFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, LearnerProfileFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'LearnerProfile'> extends True ? Prisma__LearnerProfileClient<$Types.GetResult<LearnerProfilePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__LearnerProfileClient<$Types.GetResult<LearnerProfilePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first LearnerProfile that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearnerProfileFindFirstOrThrowArgs} args - Arguments to find a LearnerProfile
     * @example
     * // Get one LearnerProfile
     * const learnerProfile = await prisma.learnerProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends LearnerProfileFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, LearnerProfileFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__LearnerProfileClient<$Types.GetResult<LearnerProfilePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more LearnerProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearnerProfileFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LearnerProfiles
     * const learnerProfiles = await prisma.learnerProfile.findMany()
     * 
     * // Get first 10 LearnerProfiles
     * const learnerProfiles = await prisma.learnerProfile.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const learnerProfileWithUserIdOnly = await prisma.learnerProfile.findMany({ select: { userId: true } })
     * 
    **/
    findMany<T extends LearnerProfileFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, LearnerProfileFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<LearnerProfilePayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a LearnerProfile.
     * @param {LearnerProfileCreateArgs} args - Arguments to create a LearnerProfile.
     * @example
     * // Create one LearnerProfile
     * const LearnerProfile = await prisma.learnerProfile.create({
     *   data: {
     *     // ... data to create a LearnerProfile
     *   }
     * })
     * 
    **/
    create<T extends LearnerProfileCreateArgs<ExtArgs>>(
      args: SelectSubset<T, LearnerProfileCreateArgs<ExtArgs>>
    ): Prisma__LearnerProfileClient<$Types.GetResult<LearnerProfilePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many LearnerProfiles.
     *     @param {LearnerProfileCreateManyArgs} args - Arguments to create many LearnerProfiles.
     *     @example
     *     // Create many LearnerProfiles
     *     const learnerProfile = await prisma.learnerProfile.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends LearnerProfileCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, LearnerProfileCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a LearnerProfile.
     * @param {LearnerProfileDeleteArgs} args - Arguments to delete one LearnerProfile.
     * @example
     * // Delete one LearnerProfile
     * const LearnerProfile = await prisma.learnerProfile.delete({
     *   where: {
     *     // ... filter to delete one LearnerProfile
     *   }
     * })
     * 
    **/
    delete<T extends LearnerProfileDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, LearnerProfileDeleteArgs<ExtArgs>>
    ): Prisma__LearnerProfileClient<$Types.GetResult<LearnerProfilePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one LearnerProfile.
     * @param {LearnerProfileUpdateArgs} args - Arguments to update one LearnerProfile.
     * @example
     * // Update one LearnerProfile
     * const learnerProfile = await prisma.learnerProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends LearnerProfileUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, LearnerProfileUpdateArgs<ExtArgs>>
    ): Prisma__LearnerProfileClient<$Types.GetResult<LearnerProfilePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more LearnerProfiles.
     * @param {LearnerProfileDeleteManyArgs} args - Arguments to filter LearnerProfiles to delete.
     * @example
     * // Delete a few LearnerProfiles
     * const { count } = await prisma.learnerProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends LearnerProfileDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, LearnerProfileDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearnerProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearnerProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LearnerProfiles
     * const learnerProfile = await prisma.learnerProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends LearnerProfileUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, LearnerProfileUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LearnerProfile.
     * @param {LearnerProfileUpsertArgs} args - Arguments to update or create a LearnerProfile.
     * @example
     * // Update or create a LearnerProfile
     * const learnerProfile = await prisma.learnerProfile.upsert({
     *   create: {
     *     // ... data to create a LearnerProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LearnerProfile we want to update
     *   }
     * })
    **/
    upsert<T extends LearnerProfileUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, LearnerProfileUpsertArgs<ExtArgs>>
    ): Prisma__LearnerProfileClient<$Types.GetResult<LearnerProfilePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of LearnerProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearnerProfileCountArgs} args - Arguments to filter LearnerProfiles to count.
     * @example
     * // Count the number of LearnerProfiles
     * const count = await prisma.learnerProfile.count({
     *   where: {
     *     // ... the filter for the LearnerProfiles we want to count
     *   }
     * })
    **/
    count<T extends LearnerProfileCountArgs>(
      args?: Subset<T, LearnerProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LearnerProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LearnerProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearnerProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LearnerProfileAggregateArgs>(args: Subset<T, LearnerProfileAggregateArgs>): Prisma.PrismaPromise<GetLearnerProfileAggregateType<T>>

    /**
     * Group by LearnerProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearnerProfileGroupByArgs} args - Group by arguments.
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
      T extends LearnerProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LearnerProfileGroupByArgs['orderBy'] }
        : { orderBy?: LearnerProfileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LearnerProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLearnerProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for LearnerProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__LearnerProfileClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
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
   * LearnerProfile base type for findUnique actions
   */
  export type LearnerProfileFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearnerProfile
     */
    select?: LearnerProfileSelect<ExtArgs> | null
    /**
     * Filter, which LearnerProfile to fetch.
     */
    where: LearnerProfileWhereUniqueInput
  }

  /**
   * LearnerProfile findUnique
   */
  export interface LearnerProfileFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends LearnerProfileFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * LearnerProfile findUniqueOrThrow
   */
  export type LearnerProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearnerProfile
     */
    select?: LearnerProfileSelect<ExtArgs> | null
    /**
     * Filter, which LearnerProfile to fetch.
     */
    where: LearnerProfileWhereUniqueInput
  }


  /**
   * LearnerProfile base type for findFirst actions
   */
  export type LearnerProfileFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearnerProfile
     */
    select?: LearnerProfileSelect<ExtArgs> | null
    /**
     * Filter, which LearnerProfile to fetch.
     */
    where?: LearnerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearnerProfiles to fetch.
     */
    orderBy?: Enumerable<LearnerProfileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearnerProfiles.
     */
    cursor?: LearnerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearnerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearnerProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearnerProfiles.
     */
    distinct?: Enumerable<LearnerProfileScalarFieldEnum>
  }

  /**
   * LearnerProfile findFirst
   */
  export interface LearnerProfileFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends LearnerProfileFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * LearnerProfile findFirstOrThrow
   */
  export type LearnerProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearnerProfile
     */
    select?: LearnerProfileSelect<ExtArgs> | null
    /**
     * Filter, which LearnerProfile to fetch.
     */
    where?: LearnerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearnerProfiles to fetch.
     */
    orderBy?: Enumerable<LearnerProfileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearnerProfiles.
     */
    cursor?: LearnerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearnerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearnerProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearnerProfiles.
     */
    distinct?: Enumerable<LearnerProfileScalarFieldEnum>
  }


  /**
   * LearnerProfile findMany
   */
  export type LearnerProfileFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearnerProfile
     */
    select?: LearnerProfileSelect<ExtArgs> | null
    /**
     * Filter, which LearnerProfiles to fetch.
     */
    where?: LearnerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearnerProfiles to fetch.
     */
    orderBy?: Enumerable<LearnerProfileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LearnerProfiles.
     */
    cursor?: LearnerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearnerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearnerProfiles.
     */
    skip?: number
    distinct?: Enumerable<LearnerProfileScalarFieldEnum>
  }


  /**
   * LearnerProfile create
   */
  export type LearnerProfileCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearnerProfile
     */
    select?: LearnerProfileSelect<ExtArgs> | null
    /**
     * The data needed to create a LearnerProfile.
     */
    data: XOR<LearnerProfileCreateInput, LearnerProfileUncheckedCreateInput>
  }


  /**
   * LearnerProfile createMany
   */
  export type LearnerProfileCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LearnerProfiles.
     */
    data: Enumerable<LearnerProfileCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * LearnerProfile update
   */
  export type LearnerProfileUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearnerProfile
     */
    select?: LearnerProfileSelect<ExtArgs> | null
    /**
     * The data needed to update a LearnerProfile.
     */
    data: XOR<LearnerProfileUpdateInput, LearnerProfileUncheckedUpdateInput>
    /**
     * Choose, which LearnerProfile to update.
     */
    where: LearnerProfileWhereUniqueInput
  }


  /**
   * LearnerProfile updateMany
   */
  export type LearnerProfileUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LearnerProfiles.
     */
    data: XOR<LearnerProfileUpdateManyMutationInput, LearnerProfileUncheckedUpdateManyInput>
    /**
     * Filter which LearnerProfiles to update
     */
    where?: LearnerProfileWhereInput
  }


  /**
   * LearnerProfile upsert
   */
  export type LearnerProfileUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearnerProfile
     */
    select?: LearnerProfileSelect<ExtArgs> | null
    /**
     * The filter to search for the LearnerProfile to update in case it exists.
     */
    where: LearnerProfileWhereUniqueInput
    /**
     * In case the LearnerProfile found by the `where` argument doesn't exist, create a new LearnerProfile with this data.
     */
    create: XOR<LearnerProfileCreateInput, LearnerProfileUncheckedCreateInput>
    /**
     * In case the LearnerProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LearnerProfileUpdateInput, LearnerProfileUncheckedUpdateInput>
  }


  /**
   * LearnerProfile delete
   */
  export type LearnerProfileDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearnerProfile
     */
    select?: LearnerProfileSelect<ExtArgs> | null
    /**
     * Filter which LearnerProfile to delete.
     */
    where: LearnerProfileWhereUniqueInput
  }


  /**
   * LearnerProfile deleteMany
   */
  export type LearnerProfileDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearnerProfiles to delete
     */
    where?: LearnerProfileWhereInput
  }


  /**
   * LearnerProfile without action
   */
  export type LearnerProfileArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearnerProfile
     */
    select?: LearnerProfileSelect<ExtArgs> | null
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


  export const UserRoadmapScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    masterRoadmapId: 'masterRoadmapId',
    title: 'title',
    slug: 'slug',
    progressPercent: 'progressPercent',
    totalNodes: 'totalNodes',
    completedNodes: 'completedNodes',
    startDate: 'startDate',
    targetDate: 'targetDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserRoadmapScalarFieldEnum = (typeof UserRoadmapScalarFieldEnum)[keyof typeof UserRoadmapScalarFieldEnum]


  export const UserRoadmapNodeScalarFieldEnum: {
    id: 'id',
    userRoadmapId: 'userRoadmapId',
    nodeKey: 'nodeKey',
    status: 'status',
    userNotesMd: 'userNotesMd',
    userResources: 'userResources',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    timeSpentMinutes: 'timeSpentMinutes',
    difficultyRating: 'difficultyRating',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserRoadmapNodeScalarFieldEnum = (typeof UserRoadmapNodeScalarFieldEnum)[keyof typeof UserRoadmapNodeScalarFieldEnum]


  export const LearnerProfileScalarFieldEnum: {
    userId: 'userId',
    universityDepartment: 'universityDepartment',
    major: 'major',
    bio: 'bio',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LearnerProfileScalarFieldEnum = (typeof LearnerProfileScalarFieldEnum)[keyof typeof LearnerProfileScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Deep Input Types
   */


  export type UserRoadmapWhereInput = {
    AND?: Enumerable<UserRoadmapWhereInput>
    OR?: Enumerable<UserRoadmapWhereInput>
    NOT?: Enumerable<UserRoadmapWhereInput>
    id?: IntFilter | number
    userId?: IntFilter | number
    masterRoadmapId?: IntFilter | number
    title?: StringFilter | string
    slug?: StringNullableFilter | string | null
    progressPercent?: IntFilter | number
    totalNodes?: IntFilter | number
    completedNodes?: IntFilter | number
    startDate?: DateTimeFilter | Date | string
    targetDate?: DateTimeNullableFilter | Date | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    nodes?: UserRoadmapNodeListRelationFilter
  }

  export type UserRoadmapOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    masterRoadmapId?: SortOrder
    title?: SortOrder
    slug?: SortOrderInput | SortOrder
    progressPercent?: SortOrder
    totalNodes?: SortOrder
    completedNodes?: SortOrder
    startDate?: SortOrder
    targetDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    nodes?: UserRoadmapNodeOrderByRelationAggregateInput
  }

  export type UserRoadmapWhereUniqueInput = {
    id?: number
    userId_masterRoadmapId?: UserRoadmapUserIdMasterRoadmapIdCompoundUniqueInput
  }

  export type UserRoadmapOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    masterRoadmapId?: SortOrder
    title?: SortOrder
    slug?: SortOrderInput | SortOrder
    progressPercent?: SortOrder
    totalNodes?: SortOrder
    completedNodes?: SortOrder
    startDate?: SortOrder
    targetDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserRoadmapCountOrderByAggregateInput
    _avg?: UserRoadmapAvgOrderByAggregateInput
    _max?: UserRoadmapMaxOrderByAggregateInput
    _min?: UserRoadmapMinOrderByAggregateInput
    _sum?: UserRoadmapSumOrderByAggregateInput
  }

  export type UserRoadmapScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserRoadmapScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserRoadmapScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserRoadmapScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    userId?: IntWithAggregatesFilter | number
    masterRoadmapId?: IntWithAggregatesFilter | number
    title?: StringWithAggregatesFilter | string
    slug?: StringNullableWithAggregatesFilter | string | null
    progressPercent?: IntWithAggregatesFilter | number
    totalNodes?: IntWithAggregatesFilter | number
    completedNodes?: IntWithAggregatesFilter | number
    startDate?: DateTimeWithAggregatesFilter | Date | string
    targetDate?: DateTimeNullableWithAggregatesFilter | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type UserRoadmapNodeWhereInput = {
    AND?: Enumerable<UserRoadmapNodeWhereInput>
    OR?: Enumerable<UserRoadmapNodeWhereInput>
    NOT?: Enumerable<UserRoadmapNodeWhereInput>
    id?: IntFilter | number
    userRoadmapId?: IntFilter | number
    nodeKey?: StringFilter | string
    status?: EnumRoadmapNodeStatusFilter | RoadmapNodeStatus
    userNotesMd?: StringNullableFilter | string | null
    userResources?: JsonNullableFilter
    startedAt?: DateTimeNullableFilter | Date | string | null
    completedAt?: DateTimeNullableFilter | Date | string | null
    timeSpentMinutes?: IntFilter | number
    difficultyRating?: IntNullableFilter | number | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    userRoadmap?: XOR<UserRoadmapRelationFilter, UserRoadmapWhereInput>
  }

  export type UserRoadmapNodeOrderByWithRelationInput = {
    id?: SortOrder
    userRoadmapId?: SortOrder
    nodeKey?: SortOrder
    status?: SortOrder
    userNotesMd?: SortOrderInput | SortOrder
    userResources?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    timeSpentMinutes?: SortOrder
    difficultyRating?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userRoadmap?: UserRoadmapOrderByWithRelationInput
  }

  export type UserRoadmapNodeWhereUniqueInput = {
    id?: number
    userRoadmapId_nodeKey?: UserRoadmapNodeUserRoadmapIdNodeKeyCompoundUniqueInput
  }

  export type UserRoadmapNodeOrderByWithAggregationInput = {
    id?: SortOrder
    userRoadmapId?: SortOrder
    nodeKey?: SortOrder
    status?: SortOrder
    userNotesMd?: SortOrderInput | SortOrder
    userResources?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    timeSpentMinutes?: SortOrder
    difficultyRating?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserRoadmapNodeCountOrderByAggregateInput
    _avg?: UserRoadmapNodeAvgOrderByAggregateInput
    _max?: UserRoadmapNodeMaxOrderByAggregateInput
    _min?: UserRoadmapNodeMinOrderByAggregateInput
    _sum?: UserRoadmapNodeSumOrderByAggregateInput
  }

  export type UserRoadmapNodeScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserRoadmapNodeScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserRoadmapNodeScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserRoadmapNodeScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    userRoadmapId?: IntWithAggregatesFilter | number
    nodeKey?: StringWithAggregatesFilter | string
    status?: EnumRoadmapNodeStatusWithAggregatesFilter | RoadmapNodeStatus
    userNotesMd?: StringNullableWithAggregatesFilter | string | null
    userResources?: JsonNullableWithAggregatesFilter
    startedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    timeSpentMinutes?: IntWithAggregatesFilter | number
    difficultyRating?: IntNullableWithAggregatesFilter | number | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type LearnerProfileWhereInput = {
    AND?: Enumerable<LearnerProfileWhereInput>
    OR?: Enumerable<LearnerProfileWhereInput>
    NOT?: Enumerable<LearnerProfileWhereInput>
    userId?: IntFilter | number
    universityDepartment?: StringNullableFilter | string | null
    major?: StringNullableFilter | string | null
    bio?: JsonNullableFilter
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type LearnerProfileOrderByWithRelationInput = {
    userId?: SortOrder
    universityDepartment?: SortOrderInput | SortOrder
    major?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearnerProfileWhereUniqueInput = {
    userId?: number
  }

  export type LearnerProfileOrderByWithAggregationInput = {
    userId?: SortOrder
    universityDepartment?: SortOrderInput | SortOrder
    major?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LearnerProfileCountOrderByAggregateInput
    _avg?: LearnerProfileAvgOrderByAggregateInput
    _max?: LearnerProfileMaxOrderByAggregateInput
    _min?: LearnerProfileMinOrderByAggregateInput
    _sum?: LearnerProfileSumOrderByAggregateInput
  }

  export type LearnerProfileScalarWhereWithAggregatesInput = {
    AND?: Enumerable<LearnerProfileScalarWhereWithAggregatesInput>
    OR?: Enumerable<LearnerProfileScalarWhereWithAggregatesInput>
    NOT?: Enumerable<LearnerProfileScalarWhereWithAggregatesInput>
    userId?: IntWithAggregatesFilter | number
    universityDepartment?: StringNullableWithAggregatesFilter | string | null
    major?: StringNullableWithAggregatesFilter | string | null
    bio?: JsonNullableWithAggregatesFilter
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type UserRoadmapCreateInput = {
    userId: number
    masterRoadmapId: number
    title: string
    slug?: string | null
    progressPercent?: number
    totalNodes?: number
    completedNodes?: number
    startDate?: Date | string
    targetDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    nodes?: UserRoadmapNodeCreateNestedManyWithoutUserRoadmapInput
  }

  export type UserRoadmapUncheckedCreateInput = {
    id?: number
    userId: number
    masterRoadmapId: number
    title: string
    slug?: string | null
    progressPercent?: number
    totalNodes?: number
    completedNodes?: number
    startDate?: Date | string
    targetDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    nodes?: UserRoadmapNodeUncheckedCreateNestedManyWithoutUserRoadmapInput
  }

  export type UserRoadmapUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    masterRoadmapId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    progressPercent?: IntFieldUpdateOperationsInput | number
    totalNodes?: IntFieldUpdateOperationsInput | number
    completedNodes?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nodes?: UserRoadmapNodeUpdateManyWithoutUserRoadmapNestedInput
  }

  export type UserRoadmapUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    masterRoadmapId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    progressPercent?: IntFieldUpdateOperationsInput | number
    totalNodes?: IntFieldUpdateOperationsInput | number
    completedNodes?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nodes?: UserRoadmapNodeUncheckedUpdateManyWithoutUserRoadmapNestedInput
  }

  export type UserRoadmapCreateManyInput = {
    id?: number
    userId: number
    masterRoadmapId: number
    title: string
    slug?: string | null
    progressPercent?: number
    totalNodes?: number
    completedNodes?: number
    startDate?: Date | string
    targetDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserRoadmapUpdateManyMutationInput = {
    userId?: IntFieldUpdateOperationsInput | number
    masterRoadmapId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    progressPercent?: IntFieldUpdateOperationsInput | number
    totalNodes?: IntFieldUpdateOperationsInput | number
    completedNodes?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoadmapUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    masterRoadmapId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    progressPercent?: IntFieldUpdateOperationsInput | number
    totalNodes?: IntFieldUpdateOperationsInput | number
    completedNodes?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoadmapNodeCreateInput = {
    nodeKey: string
    status?: RoadmapNodeStatus
    userNotesMd?: string | null
    userResources?: NullableJsonNullValueInput | InputJsonValue
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    timeSpentMinutes?: number
    difficultyRating?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userRoadmap: UserRoadmapCreateNestedOneWithoutNodesInput
  }

  export type UserRoadmapNodeUncheckedCreateInput = {
    id?: number
    userRoadmapId: number
    nodeKey: string
    status?: RoadmapNodeStatus
    userNotesMd?: string | null
    userResources?: NullableJsonNullValueInput | InputJsonValue
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    timeSpentMinutes?: number
    difficultyRating?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserRoadmapNodeUpdateInput = {
    nodeKey?: StringFieldUpdateOperationsInput | string
    status?: EnumRoadmapNodeStatusFieldUpdateOperationsInput | RoadmapNodeStatus
    userNotesMd?: NullableStringFieldUpdateOperationsInput | string | null
    userResources?: NullableJsonNullValueInput | InputJsonValue
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpentMinutes?: IntFieldUpdateOperationsInput | number
    difficultyRating?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userRoadmap?: UserRoadmapUpdateOneRequiredWithoutNodesNestedInput
  }

  export type UserRoadmapNodeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userRoadmapId?: IntFieldUpdateOperationsInput | number
    nodeKey?: StringFieldUpdateOperationsInput | string
    status?: EnumRoadmapNodeStatusFieldUpdateOperationsInput | RoadmapNodeStatus
    userNotesMd?: NullableStringFieldUpdateOperationsInput | string | null
    userResources?: NullableJsonNullValueInput | InputJsonValue
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpentMinutes?: IntFieldUpdateOperationsInput | number
    difficultyRating?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoadmapNodeCreateManyInput = {
    id?: number
    userRoadmapId: number
    nodeKey: string
    status?: RoadmapNodeStatus
    userNotesMd?: string | null
    userResources?: NullableJsonNullValueInput | InputJsonValue
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    timeSpentMinutes?: number
    difficultyRating?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserRoadmapNodeUpdateManyMutationInput = {
    nodeKey?: StringFieldUpdateOperationsInput | string
    status?: EnumRoadmapNodeStatusFieldUpdateOperationsInput | RoadmapNodeStatus
    userNotesMd?: NullableStringFieldUpdateOperationsInput | string | null
    userResources?: NullableJsonNullValueInput | InputJsonValue
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpentMinutes?: IntFieldUpdateOperationsInput | number
    difficultyRating?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoadmapNodeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userRoadmapId?: IntFieldUpdateOperationsInput | number
    nodeKey?: StringFieldUpdateOperationsInput | string
    status?: EnumRoadmapNodeStatusFieldUpdateOperationsInput | RoadmapNodeStatus
    userNotesMd?: NullableStringFieldUpdateOperationsInput | string | null
    userResources?: NullableJsonNullValueInput | InputJsonValue
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpentMinutes?: IntFieldUpdateOperationsInput | number
    difficultyRating?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearnerProfileCreateInput = {
    userId: number
    universityDepartment?: string | null
    major?: string | null
    bio?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearnerProfileUncheckedCreateInput = {
    userId: number
    universityDepartment?: string | null
    major?: string | null
    bio?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearnerProfileUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    universityDepartment?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearnerProfileUncheckedUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    universityDepartment?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearnerProfileCreateManyInput = {
    userId: number
    universityDepartment?: string | null
    major?: string | null
    bio?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearnerProfileUpdateManyMutationInput = {
    userId?: IntFieldUpdateOperationsInput | number
    universityDepartment?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearnerProfileUncheckedUpdateManyInput = {
    userId?: IntFieldUpdateOperationsInput | number
    universityDepartment?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
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

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type UserRoadmapNodeListRelationFilter = {
    every?: UserRoadmapNodeWhereInput
    some?: UserRoadmapNodeWhereInput
    none?: UserRoadmapNodeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserRoadmapNodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserRoadmapUserIdMasterRoadmapIdCompoundUniqueInput = {
    userId: number
    masterRoadmapId: number
  }

  export type UserRoadmapCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    masterRoadmapId?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    progressPercent?: SortOrder
    totalNodes?: SortOrder
    completedNodes?: SortOrder
    startDate?: SortOrder
    targetDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserRoadmapAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    masterRoadmapId?: SortOrder
    progressPercent?: SortOrder
    totalNodes?: SortOrder
    completedNodes?: SortOrder
  }

  export type UserRoadmapMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    masterRoadmapId?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    progressPercent?: SortOrder
    totalNodes?: SortOrder
    completedNodes?: SortOrder
    startDate?: SortOrder
    targetDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserRoadmapMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    masterRoadmapId?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    progressPercent?: SortOrder
    totalNodes?: SortOrder
    completedNodes?: SortOrder
    startDate?: SortOrder
    targetDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserRoadmapSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    masterRoadmapId?: SortOrder
    progressPercent?: SortOrder
    totalNodes?: SortOrder
    completedNodes?: SortOrder
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

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
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

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type EnumRoadmapNodeStatusFilter = {
    equals?: RoadmapNodeStatus
    in?: Enumerable<RoadmapNodeStatus>
    notIn?: Enumerable<RoadmapNodeStatus>
    not?: NestedEnumRoadmapNodeStatusFilter | RoadmapNodeStatus
  }
  export type JsonNullableFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase>, Exclude<keyof Required<JsonNullableFilterBase>, 'path'>>,
        Required<JsonNullableFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase>, 'path'>>

  export type JsonNullableFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string[]
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type UserRoadmapRelationFilter = {
    is?: UserRoadmapWhereInput | null
    isNot?: UserRoadmapWhereInput | null
  }

  export type UserRoadmapNodeUserRoadmapIdNodeKeyCompoundUniqueInput = {
    userRoadmapId: number
    nodeKey: string
  }

  export type UserRoadmapNodeCountOrderByAggregateInput = {
    id?: SortOrder
    userRoadmapId?: SortOrder
    nodeKey?: SortOrder
    status?: SortOrder
    userNotesMd?: SortOrder
    userResources?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    timeSpentMinutes?: SortOrder
    difficultyRating?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserRoadmapNodeAvgOrderByAggregateInput = {
    id?: SortOrder
    userRoadmapId?: SortOrder
    timeSpentMinutes?: SortOrder
    difficultyRating?: SortOrder
  }

  export type UserRoadmapNodeMaxOrderByAggregateInput = {
    id?: SortOrder
    userRoadmapId?: SortOrder
    nodeKey?: SortOrder
    status?: SortOrder
    userNotesMd?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    timeSpentMinutes?: SortOrder
    difficultyRating?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserRoadmapNodeMinOrderByAggregateInput = {
    id?: SortOrder
    userRoadmapId?: SortOrder
    nodeKey?: SortOrder
    status?: SortOrder
    userNotesMd?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    timeSpentMinutes?: SortOrder
    difficultyRating?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserRoadmapNodeSumOrderByAggregateInput = {
    id?: SortOrder
    userRoadmapId?: SortOrder
    timeSpentMinutes?: SortOrder
    difficultyRating?: SortOrder
  }

  export type EnumRoadmapNodeStatusWithAggregatesFilter = {
    equals?: RoadmapNodeStatus
    in?: Enumerable<RoadmapNodeStatus>
    notIn?: Enumerable<RoadmapNodeStatus>
    not?: NestedEnumRoadmapNodeStatusWithAggregatesFilter | RoadmapNodeStatus
    _count?: NestedIntFilter
    _min?: NestedEnumRoadmapNodeStatusFilter
    _max?: NestedEnumRoadmapNodeStatusFilter
  }
  export type JsonNullableWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string[]
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
    _count?: NestedIntNullableFilter
    _min?: NestedJsonNullableFilter
    _max?: NestedJsonNullableFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type LearnerProfileCountOrderByAggregateInput = {
    userId?: SortOrder
    universityDepartment?: SortOrder
    major?: SortOrder
    bio?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearnerProfileAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type LearnerProfileMaxOrderByAggregateInput = {
    userId?: SortOrder
    universityDepartment?: SortOrder
    major?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearnerProfileMinOrderByAggregateInput = {
    userId?: SortOrder
    universityDepartment?: SortOrder
    major?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearnerProfileSumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type UserRoadmapNodeCreateNestedManyWithoutUserRoadmapInput = {
    create?: XOR<Enumerable<UserRoadmapNodeCreateWithoutUserRoadmapInput>, Enumerable<UserRoadmapNodeUncheckedCreateWithoutUserRoadmapInput>>
    connectOrCreate?: Enumerable<UserRoadmapNodeCreateOrConnectWithoutUserRoadmapInput>
    createMany?: UserRoadmapNodeCreateManyUserRoadmapInputEnvelope
    connect?: Enumerable<UserRoadmapNodeWhereUniqueInput>
  }

  export type UserRoadmapNodeUncheckedCreateNestedManyWithoutUserRoadmapInput = {
    create?: XOR<Enumerable<UserRoadmapNodeCreateWithoutUserRoadmapInput>, Enumerable<UserRoadmapNodeUncheckedCreateWithoutUserRoadmapInput>>
    connectOrCreate?: Enumerable<UserRoadmapNodeCreateOrConnectWithoutUserRoadmapInput>
    createMany?: UserRoadmapNodeCreateManyUserRoadmapInputEnvelope
    connect?: Enumerable<UserRoadmapNodeWhereUniqueInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserRoadmapNodeUpdateManyWithoutUserRoadmapNestedInput = {
    create?: XOR<Enumerable<UserRoadmapNodeCreateWithoutUserRoadmapInput>, Enumerable<UserRoadmapNodeUncheckedCreateWithoutUserRoadmapInput>>
    connectOrCreate?: Enumerable<UserRoadmapNodeCreateOrConnectWithoutUserRoadmapInput>
    upsert?: Enumerable<UserRoadmapNodeUpsertWithWhereUniqueWithoutUserRoadmapInput>
    createMany?: UserRoadmapNodeCreateManyUserRoadmapInputEnvelope
    set?: Enumerable<UserRoadmapNodeWhereUniqueInput>
    disconnect?: Enumerable<UserRoadmapNodeWhereUniqueInput>
    delete?: Enumerable<UserRoadmapNodeWhereUniqueInput>
    connect?: Enumerable<UserRoadmapNodeWhereUniqueInput>
    update?: Enumerable<UserRoadmapNodeUpdateWithWhereUniqueWithoutUserRoadmapInput>
    updateMany?: Enumerable<UserRoadmapNodeUpdateManyWithWhereWithoutUserRoadmapInput>
    deleteMany?: Enumerable<UserRoadmapNodeScalarWhereInput>
  }

  export type UserRoadmapNodeUncheckedUpdateManyWithoutUserRoadmapNestedInput = {
    create?: XOR<Enumerable<UserRoadmapNodeCreateWithoutUserRoadmapInput>, Enumerable<UserRoadmapNodeUncheckedCreateWithoutUserRoadmapInput>>
    connectOrCreate?: Enumerable<UserRoadmapNodeCreateOrConnectWithoutUserRoadmapInput>
    upsert?: Enumerable<UserRoadmapNodeUpsertWithWhereUniqueWithoutUserRoadmapInput>
    createMany?: UserRoadmapNodeCreateManyUserRoadmapInputEnvelope
    set?: Enumerable<UserRoadmapNodeWhereUniqueInput>
    disconnect?: Enumerable<UserRoadmapNodeWhereUniqueInput>
    delete?: Enumerable<UserRoadmapNodeWhereUniqueInput>
    connect?: Enumerable<UserRoadmapNodeWhereUniqueInput>
    update?: Enumerable<UserRoadmapNodeUpdateWithWhereUniqueWithoutUserRoadmapInput>
    updateMany?: Enumerable<UserRoadmapNodeUpdateManyWithWhereWithoutUserRoadmapInput>
    deleteMany?: Enumerable<UserRoadmapNodeScalarWhereInput>
  }

  export type UserRoadmapCreateNestedOneWithoutNodesInput = {
    create?: XOR<UserRoadmapCreateWithoutNodesInput, UserRoadmapUncheckedCreateWithoutNodesInput>
    connectOrCreate?: UserRoadmapCreateOrConnectWithoutNodesInput
    connect?: UserRoadmapWhereUniqueInput
  }

  export type EnumRoadmapNodeStatusFieldUpdateOperationsInput = {
    set?: RoadmapNodeStatus
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserRoadmapUpdateOneRequiredWithoutNodesNestedInput = {
    create?: XOR<UserRoadmapCreateWithoutNodesInput, UserRoadmapUncheckedCreateWithoutNodesInput>
    connectOrCreate?: UserRoadmapCreateOrConnectWithoutNodesInput
    upsert?: UserRoadmapUpsertWithoutNodesInput
    connect?: UserRoadmapWhereUniqueInput
    update?: XOR<UserRoadmapUpdateWithoutNodesInput, UserRoadmapUncheckedUpdateWithoutNodesInput>
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

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
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

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
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

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
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

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedEnumRoadmapNodeStatusFilter = {
    equals?: RoadmapNodeStatus
    in?: Enumerable<RoadmapNodeStatus>
    notIn?: Enumerable<RoadmapNodeStatus>
    not?: NestedEnumRoadmapNodeStatusFilter | RoadmapNodeStatus
  }

  export type NestedEnumRoadmapNodeStatusWithAggregatesFilter = {
    equals?: RoadmapNodeStatus
    in?: Enumerable<RoadmapNodeStatus>
    notIn?: Enumerable<RoadmapNodeStatus>
    not?: NestedEnumRoadmapNodeStatusWithAggregatesFilter | RoadmapNodeStatus
    _count?: NestedIntFilter
    _min?: NestedEnumRoadmapNodeStatusFilter
    _max?: NestedEnumRoadmapNodeStatusFilter
  }
  export type NestedJsonNullableFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase>, Exclude<keyof Required<NestedJsonNullableFilterBase>, 'path'>>,
        Required<NestedJsonNullableFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase>, 'path'>>

  export type NestedJsonNullableFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string[]
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type UserRoadmapNodeCreateWithoutUserRoadmapInput = {
    nodeKey: string
    status?: RoadmapNodeStatus
    userNotesMd?: string | null
    userResources?: NullableJsonNullValueInput | InputJsonValue
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    timeSpentMinutes?: number
    difficultyRating?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserRoadmapNodeUncheckedCreateWithoutUserRoadmapInput = {
    id?: number
    nodeKey: string
    status?: RoadmapNodeStatus
    userNotesMd?: string | null
    userResources?: NullableJsonNullValueInput | InputJsonValue
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    timeSpentMinutes?: number
    difficultyRating?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserRoadmapNodeCreateOrConnectWithoutUserRoadmapInput = {
    where: UserRoadmapNodeWhereUniqueInput
    create: XOR<UserRoadmapNodeCreateWithoutUserRoadmapInput, UserRoadmapNodeUncheckedCreateWithoutUserRoadmapInput>
  }

  export type UserRoadmapNodeCreateManyUserRoadmapInputEnvelope = {
    data: Enumerable<UserRoadmapNodeCreateManyUserRoadmapInput>
    skipDuplicates?: boolean
  }

  export type UserRoadmapNodeUpsertWithWhereUniqueWithoutUserRoadmapInput = {
    where: UserRoadmapNodeWhereUniqueInput
    update: XOR<UserRoadmapNodeUpdateWithoutUserRoadmapInput, UserRoadmapNodeUncheckedUpdateWithoutUserRoadmapInput>
    create: XOR<UserRoadmapNodeCreateWithoutUserRoadmapInput, UserRoadmapNodeUncheckedCreateWithoutUserRoadmapInput>
  }

  export type UserRoadmapNodeUpdateWithWhereUniqueWithoutUserRoadmapInput = {
    where: UserRoadmapNodeWhereUniqueInput
    data: XOR<UserRoadmapNodeUpdateWithoutUserRoadmapInput, UserRoadmapNodeUncheckedUpdateWithoutUserRoadmapInput>
  }

  export type UserRoadmapNodeUpdateManyWithWhereWithoutUserRoadmapInput = {
    where: UserRoadmapNodeScalarWhereInput
    data: XOR<UserRoadmapNodeUpdateManyMutationInput, UserRoadmapNodeUncheckedUpdateManyWithoutNodesInput>
  }

  export type UserRoadmapNodeScalarWhereInput = {
    AND?: Enumerable<UserRoadmapNodeScalarWhereInput>
    OR?: Enumerable<UserRoadmapNodeScalarWhereInput>
    NOT?: Enumerable<UserRoadmapNodeScalarWhereInput>
    id?: IntFilter | number
    userRoadmapId?: IntFilter | number
    nodeKey?: StringFilter | string
    status?: EnumRoadmapNodeStatusFilter | RoadmapNodeStatus
    userNotesMd?: StringNullableFilter | string | null
    userResources?: JsonNullableFilter
    startedAt?: DateTimeNullableFilter | Date | string | null
    completedAt?: DateTimeNullableFilter | Date | string | null
    timeSpentMinutes?: IntFilter | number
    difficultyRating?: IntNullableFilter | number | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type UserRoadmapCreateWithoutNodesInput = {
    userId: number
    masterRoadmapId: number
    title: string
    slug?: string | null
    progressPercent?: number
    totalNodes?: number
    completedNodes?: number
    startDate?: Date | string
    targetDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserRoadmapUncheckedCreateWithoutNodesInput = {
    id?: number
    userId: number
    masterRoadmapId: number
    title: string
    slug?: string | null
    progressPercent?: number
    totalNodes?: number
    completedNodes?: number
    startDate?: Date | string
    targetDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserRoadmapCreateOrConnectWithoutNodesInput = {
    where: UserRoadmapWhereUniqueInput
    create: XOR<UserRoadmapCreateWithoutNodesInput, UserRoadmapUncheckedCreateWithoutNodesInput>
  }

  export type UserRoadmapUpsertWithoutNodesInput = {
    update: XOR<UserRoadmapUpdateWithoutNodesInput, UserRoadmapUncheckedUpdateWithoutNodesInput>
    create: XOR<UserRoadmapCreateWithoutNodesInput, UserRoadmapUncheckedCreateWithoutNodesInput>
  }

  export type UserRoadmapUpdateWithoutNodesInput = {
    userId?: IntFieldUpdateOperationsInput | number
    masterRoadmapId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    progressPercent?: IntFieldUpdateOperationsInput | number
    totalNodes?: IntFieldUpdateOperationsInput | number
    completedNodes?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoadmapUncheckedUpdateWithoutNodesInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    masterRoadmapId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    progressPercent?: IntFieldUpdateOperationsInput | number
    totalNodes?: IntFieldUpdateOperationsInput | number
    completedNodes?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoadmapNodeCreateManyUserRoadmapInput = {
    id?: number
    nodeKey: string
    status?: RoadmapNodeStatus
    userNotesMd?: string | null
    userResources?: NullableJsonNullValueInput | InputJsonValue
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    timeSpentMinutes?: number
    difficultyRating?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserRoadmapNodeUpdateWithoutUserRoadmapInput = {
    nodeKey?: StringFieldUpdateOperationsInput | string
    status?: EnumRoadmapNodeStatusFieldUpdateOperationsInput | RoadmapNodeStatus
    userNotesMd?: NullableStringFieldUpdateOperationsInput | string | null
    userResources?: NullableJsonNullValueInput | InputJsonValue
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpentMinutes?: IntFieldUpdateOperationsInput | number
    difficultyRating?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoadmapNodeUncheckedUpdateWithoutUserRoadmapInput = {
    id?: IntFieldUpdateOperationsInput | number
    nodeKey?: StringFieldUpdateOperationsInput | string
    status?: EnumRoadmapNodeStatusFieldUpdateOperationsInput | RoadmapNodeStatus
    userNotesMd?: NullableStringFieldUpdateOperationsInput | string | null
    userResources?: NullableJsonNullValueInput | InputJsonValue
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpentMinutes?: IntFieldUpdateOperationsInput | number
    difficultyRating?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoadmapNodeUncheckedUpdateManyWithoutNodesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nodeKey?: StringFieldUpdateOperationsInput | string
    status?: EnumRoadmapNodeStatusFieldUpdateOperationsInput | RoadmapNodeStatus
    userNotesMd?: NullableStringFieldUpdateOperationsInput | string | null
    userResources?: NullableJsonNullValueInput | InputJsonValue
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpentMinutes?: IntFieldUpdateOperationsInput | number
    difficultyRating?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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