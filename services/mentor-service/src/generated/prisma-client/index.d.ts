
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model MentorProfile
 * 
 */
export type MentorProfile = $Result.DefaultSelection<Prisma.$MentorProfilePayload>
/**
 * Model MentorSkill
 * 
 */
export type MentorSkill = $Result.DefaultSelection<Prisma.$MentorSkillPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more MentorProfiles
 * const mentorProfiles = await prisma.mentorProfile.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more MentorProfiles
   * const mentorProfiles = await prisma.mentorProfile.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.mentorProfile`: Exposes CRUD operations for the **MentorProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MentorProfiles
    * const mentorProfiles = await prisma.mentorProfile.findMany()
    * ```
    */
  get mentorProfile(): Prisma.MentorProfileDelegate<ExtArgs>;

  /**
   * `prisma.mentorSkill`: Exposes CRUD operations for the **MentorSkill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MentorSkills
    * const mentorSkills = await prisma.mentorSkill.findMany()
    * ```
    */
  get mentorSkill(): Prisma.MentorSkillDelegate<ExtArgs>;
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
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    MentorProfile: 'MentorProfile',
    MentorSkill: 'MentorSkill'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "mentorProfile" | "mentorSkill"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      MentorProfile: {
        payload: Prisma.$MentorProfilePayload<ExtArgs>
        fields: Prisma.MentorProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MentorProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MentorProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorProfilePayload>
          }
          findFirst: {
            args: Prisma.MentorProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MentorProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorProfilePayload>
          }
          findMany: {
            args: Prisma.MentorProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorProfilePayload>[]
          }
          create: {
            args: Prisma.MentorProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorProfilePayload>
          }
          createMany: {
            args: Prisma.MentorProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MentorProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorProfilePayload>[]
          }
          delete: {
            args: Prisma.MentorProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorProfilePayload>
          }
          update: {
            args: Prisma.MentorProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorProfilePayload>
          }
          deleteMany: {
            args: Prisma.MentorProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MentorProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MentorProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorProfilePayload>
          }
          aggregate: {
            args: Prisma.MentorProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMentorProfile>
          }
          groupBy: {
            args: Prisma.MentorProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<MentorProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.MentorProfileCountArgs<ExtArgs>
            result: $Utils.Optional<MentorProfileCountAggregateOutputType> | number
          }
        }
      }
      MentorSkill: {
        payload: Prisma.$MentorSkillPayload<ExtArgs>
        fields: Prisma.MentorSkillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MentorSkillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorSkillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MentorSkillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorSkillPayload>
          }
          findFirst: {
            args: Prisma.MentorSkillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorSkillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MentorSkillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorSkillPayload>
          }
          findMany: {
            args: Prisma.MentorSkillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorSkillPayload>[]
          }
          create: {
            args: Prisma.MentorSkillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorSkillPayload>
          }
          createMany: {
            args: Prisma.MentorSkillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MentorSkillCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorSkillPayload>[]
          }
          delete: {
            args: Prisma.MentorSkillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorSkillPayload>
          }
          update: {
            args: Prisma.MentorSkillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorSkillPayload>
          }
          deleteMany: {
            args: Prisma.MentorSkillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MentorSkillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MentorSkillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorSkillPayload>
          }
          aggregate: {
            args: Prisma.MentorSkillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMentorSkill>
          }
          groupBy: {
            args: Prisma.MentorSkillGroupByArgs<ExtArgs>
            result: $Utils.Optional<MentorSkillGroupByOutputType>[]
          }
          count: {
            args: Prisma.MentorSkillCountArgs<ExtArgs>
            result: $Utils.Optional<MentorSkillCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
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
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
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
    | 'groupBy'

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
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Models
   */

  /**
   * Model MentorProfile
   */

  export type AggregateMentorProfile = {
    _count: MentorProfileCountAggregateOutputType | null
    _avg: MentorProfileAvgAggregateOutputType | null
    _sum: MentorProfileSumAggregateOutputType | null
    _min: MentorProfileMinAggregateOutputType | null
    _max: MentorProfileMaxAggregateOutputType | null
  }

  export type MentorProfileAvgAggregateOutputType = {
    userId: number | null
  }

  export type MentorProfileSumAggregateOutputType = {
    userId: number | null
  }

  export type MentorProfileMinAggregateOutputType = {
    userId: number | null
    bio: string | null
    cvUrl: string | null
    linkedinUrl: string | null
    industry: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MentorProfileMaxAggregateOutputType = {
    userId: number | null
    bio: string | null
    cvUrl: string | null
    linkedinUrl: string | null
    industry: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MentorProfileCountAggregateOutputType = {
    userId: number
    bio: number
    cvUrl: number
    linkedinUrl: number
    industry: number
    skills: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MentorProfileAvgAggregateInputType = {
    userId?: true
  }

  export type MentorProfileSumAggregateInputType = {
    userId?: true
  }

  export type MentorProfileMinAggregateInputType = {
    userId?: true
    bio?: true
    cvUrl?: true
    linkedinUrl?: true
    industry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MentorProfileMaxAggregateInputType = {
    userId?: true
    bio?: true
    cvUrl?: true
    linkedinUrl?: true
    industry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MentorProfileCountAggregateInputType = {
    userId?: true
    bio?: true
    cvUrl?: true
    linkedinUrl?: true
    industry?: true
    skills?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MentorProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MentorProfile to aggregate.
     */
    where?: MentorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorProfiles to fetch.
     */
    orderBy?: MentorProfileOrderByWithRelationInput | MentorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MentorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MentorProfiles
    **/
    _count?: true | MentorProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MentorProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MentorProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MentorProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MentorProfileMaxAggregateInputType
  }

  export type GetMentorProfileAggregateType<T extends MentorProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateMentorProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMentorProfile[P]>
      : GetScalarType<T[P], AggregateMentorProfile[P]>
  }




  export type MentorProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MentorProfileWhereInput
    orderBy?: MentorProfileOrderByWithAggregationInput | MentorProfileOrderByWithAggregationInput[]
    by: MentorProfileScalarFieldEnum[] | MentorProfileScalarFieldEnum
    having?: MentorProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MentorProfileCountAggregateInputType | true
    _avg?: MentorProfileAvgAggregateInputType
    _sum?: MentorProfileSumAggregateInputType
    _min?: MentorProfileMinAggregateInputType
    _max?: MentorProfileMaxAggregateInputType
  }

  export type MentorProfileGroupByOutputType = {
    userId: number
    bio: string | null
    cvUrl: string | null
    linkedinUrl: string | null
    industry: string | null
    skills: string[]
    createdAt: Date
    updatedAt: Date
    _count: MentorProfileCountAggregateOutputType | null
    _avg: MentorProfileAvgAggregateOutputType | null
    _sum: MentorProfileSumAggregateOutputType | null
    _min: MentorProfileMinAggregateOutputType | null
    _max: MentorProfileMaxAggregateOutputType | null
  }

  type GetMentorProfileGroupByPayload<T extends MentorProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MentorProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MentorProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MentorProfileGroupByOutputType[P]>
            : GetScalarType<T[P], MentorProfileGroupByOutputType[P]>
        }
      >
    >


  export type MentorProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    bio?: boolean
    cvUrl?: boolean
    linkedinUrl?: boolean
    industry?: boolean
    skills?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mentorProfile"]>

  export type MentorProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    bio?: boolean
    cvUrl?: boolean
    linkedinUrl?: boolean
    industry?: boolean
    skills?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mentorProfile"]>

  export type MentorProfileSelectScalar = {
    userId?: boolean
    bio?: boolean
    cvUrl?: boolean
    linkedinUrl?: boolean
    industry?: boolean
    skills?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $MentorProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MentorProfile"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      userId: number
      bio: string | null
      cvUrl: string | null
      linkedinUrl: string | null
      industry: string | null
      skills: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mentorProfile"]>
    composites: {}
  }

  type MentorProfileGetPayload<S extends boolean | null | undefined | MentorProfileDefaultArgs> = $Result.GetResult<Prisma.$MentorProfilePayload, S>

  type MentorProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MentorProfileFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MentorProfileCountAggregateInputType | true
    }

  export interface MentorProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MentorProfile'], meta: { name: 'MentorProfile' } }
    /**
     * Find zero or one MentorProfile that matches the filter.
     * @param {MentorProfileFindUniqueArgs} args - Arguments to find a MentorProfile
     * @example
     * // Get one MentorProfile
     * const mentorProfile = await prisma.mentorProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MentorProfileFindUniqueArgs>(args: SelectSubset<T, MentorProfileFindUniqueArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MentorProfile that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MentorProfileFindUniqueOrThrowArgs} args - Arguments to find a MentorProfile
     * @example
     * // Get one MentorProfile
     * const mentorProfile = await prisma.mentorProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MentorProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, MentorProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MentorProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorProfileFindFirstArgs} args - Arguments to find a MentorProfile
     * @example
     * // Get one MentorProfile
     * const mentorProfile = await prisma.mentorProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MentorProfileFindFirstArgs>(args?: SelectSubset<T, MentorProfileFindFirstArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MentorProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorProfileFindFirstOrThrowArgs} args - Arguments to find a MentorProfile
     * @example
     * // Get one MentorProfile
     * const mentorProfile = await prisma.mentorProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MentorProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, MentorProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MentorProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MentorProfiles
     * const mentorProfiles = await prisma.mentorProfile.findMany()
     * 
     * // Get first 10 MentorProfiles
     * const mentorProfiles = await prisma.mentorProfile.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const mentorProfileWithUserIdOnly = await prisma.mentorProfile.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends MentorProfileFindManyArgs>(args?: SelectSubset<T, MentorProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MentorProfile.
     * @param {MentorProfileCreateArgs} args - Arguments to create a MentorProfile.
     * @example
     * // Create one MentorProfile
     * const MentorProfile = await prisma.mentorProfile.create({
     *   data: {
     *     // ... data to create a MentorProfile
     *   }
     * })
     * 
     */
    create<T extends MentorProfileCreateArgs>(args: SelectSubset<T, MentorProfileCreateArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MentorProfiles.
     * @param {MentorProfileCreateManyArgs} args - Arguments to create many MentorProfiles.
     * @example
     * // Create many MentorProfiles
     * const mentorProfile = await prisma.mentorProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MentorProfileCreateManyArgs>(args?: SelectSubset<T, MentorProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MentorProfiles and returns the data saved in the database.
     * @param {MentorProfileCreateManyAndReturnArgs} args - Arguments to create many MentorProfiles.
     * @example
     * // Create many MentorProfiles
     * const mentorProfile = await prisma.mentorProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MentorProfiles and only return the `userId`
     * const mentorProfileWithUserIdOnly = await prisma.mentorProfile.createManyAndReturn({ 
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MentorProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, MentorProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MentorProfile.
     * @param {MentorProfileDeleteArgs} args - Arguments to delete one MentorProfile.
     * @example
     * // Delete one MentorProfile
     * const MentorProfile = await prisma.mentorProfile.delete({
     *   where: {
     *     // ... filter to delete one MentorProfile
     *   }
     * })
     * 
     */
    delete<T extends MentorProfileDeleteArgs>(args: SelectSubset<T, MentorProfileDeleteArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MentorProfile.
     * @param {MentorProfileUpdateArgs} args - Arguments to update one MentorProfile.
     * @example
     * // Update one MentorProfile
     * const mentorProfile = await prisma.mentorProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MentorProfileUpdateArgs>(args: SelectSubset<T, MentorProfileUpdateArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MentorProfiles.
     * @param {MentorProfileDeleteManyArgs} args - Arguments to filter MentorProfiles to delete.
     * @example
     * // Delete a few MentorProfiles
     * const { count } = await prisma.mentorProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MentorProfileDeleteManyArgs>(args?: SelectSubset<T, MentorProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MentorProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MentorProfiles
     * const mentorProfile = await prisma.mentorProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MentorProfileUpdateManyArgs>(args: SelectSubset<T, MentorProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MentorProfile.
     * @param {MentorProfileUpsertArgs} args - Arguments to update or create a MentorProfile.
     * @example
     * // Update or create a MentorProfile
     * const mentorProfile = await prisma.mentorProfile.upsert({
     *   create: {
     *     // ... data to create a MentorProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MentorProfile we want to update
     *   }
     * })
     */
    upsert<T extends MentorProfileUpsertArgs>(args: SelectSubset<T, MentorProfileUpsertArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MentorProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorProfileCountArgs} args - Arguments to filter MentorProfiles to count.
     * @example
     * // Count the number of MentorProfiles
     * const count = await prisma.mentorProfile.count({
     *   where: {
     *     // ... the filter for the MentorProfiles we want to count
     *   }
     * })
    **/
    count<T extends MentorProfileCountArgs>(
      args?: Subset<T, MentorProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MentorProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MentorProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MentorProfileAggregateArgs>(args: Subset<T, MentorProfileAggregateArgs>): Prisma.PrismaPromise<GetMentorProfileAggregateType<T>>

    /**
     * Group by MentorProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorProfileGroupByArgs} args - Group by arguments.
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
      T extends MentorProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MentorProfileGroupByArgs['orderBy'] }
        : { orderBy?: MentorProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, MentorProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMentorProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MentorProfile model
   */
  readonly fields: MentorProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MentorProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MentorProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MentorProfile model
   */ 
  interface MentorProfileFieldRefs {
    readonly userId: FieldRef<"MentorProfile", 'Int'>
    readonly bio: FieldRef<"MentorProfile", 'String'>
    readonly cvUrl: FieldRef<"MentorProfile", 'String'>
    readonly linkedinUrl: FieldRef<"MentorProfile", 'String'>
    readonly industry: FieldRef<"MentorProfile", 'String'>
    readonly skills: FieldRef<"MentorProfile", 'String[]'>
    readonly createdAt: FieldRef<"MentorProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"MentorProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MentorProfile findUnique
   */
  export type MentorProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelect<ExtArgs> | null
    /**
     * Filter, which MentorProfile to fetch.
     */
    where: MentorProfileWhereUniqueInput
  }

  /**
   * MentorProfile findUniqueOrThrow
   */
  export type MentorProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelect<ExtArgs> | null
    /**
     * Filter, which MentorProfile to fetch.
     */
    where: MentorProfileWhereUniqueInput
  }

  /**
   * MentorProfile findFirst
   */
  export type MentorProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelect<ExtArgs> | null
    /**
     * Filter, which MentorProfile to fetch.
     */
    where?: MentorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorProfiles to fetch.
     */
    orderBy?: MentorProfileOrderByWithRelationInput | MentorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MentorProfiles.
     */
    cursor?: MentorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MentorProfiles.
     */
    distinct?: MentorProfileScalarFieldEnum | MentorProfileScalarFieldEnum[]
  }

  /**
   * MentorProfile findFirstOrThrow
   */
  export type MentorProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelect<ExtArgs> | null
    /**
     * Filter, which MentorProfile to fetch.
     */
    where?: MentorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorProfiles to fetch.
     */
    orderBy?: MentorProfileOrderByWithRelationInput | MentorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MentorProfiles.
     */
    cursor?: MentorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MentorProfiles.
     */
    distinct?: MentorProfileScalarFieldEnum | MentorProfileScalarFieldEnum[]
  }

  /**
   * MentorProfile findMany
   */
  export type MentorProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelect<ExtArgs> | null
    /**
     * Filter, which MentorProfiles to fetch.
     */
    where?: MentorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorProfiles to fetch.
     */
    orderBy?: MentorProfileOrderByWithRelationInput | MentorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MentorProfiles.
     */
    cursor?: MentorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorProfiles.
     */
    skip?: number
    distinct?: MentorProfileScalarFieldEnum | MentorProfileScalarFieldEnum[]
  }

  /**
   * MentorProfile create
   */
  export type MentorProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelect<ExtArgs> | null
    /**
     * The data needed to create a MentorProfile.
     */
    data: XOR<MentorProfileCreateInput, MentorProfileUncheckedCreateInput>
  }

  /**
   * MentorProfile createMany
   */
  export type MentorProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MentorProfiles.
     */
    data: MentorProfileCreateManyInput | MentorProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MentorProfile createManyAndReturn
   */
  export type MentorProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MentorProfiles.
     */
    data: MentorProfileCreateManyInput | MentorProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MentorProfile update
   */
  export type MentorProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelect<ExtArgs> | null
    /**
     * The data needed to update a MentorProfile.
     */
    data: XOR<MentorProfileUpdateInput, MentorProfileUncheckedUpdateInput>
    /**
     * Choose, which MentorProfile to update.
     */
    where: MentorProfileWhereUniqueInput
  }

  /**
   * MentorProfile updateMany
   */
  export type MentorProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MentorProfiles.
     */
    data: XOR<MentorProfileUpdateManyMutationInput, MentorProfileUncheckedUpdateManyInput>
    /**
     * Filter which MentorProfiles to update
     */
    where?: MentorProfileWhereInput
  }

  /**
   * MentorProfile upsert
   */
  export type MentorProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelect<ExtArgs> | null
    /**
     * The filter to search for the MentorProfile to update in case it exists.
     */
    where: MentorProfileWhereUniqueInput
    /**
     * In case the MentorProfile found by the `where` argument doesn't exist, create a new MentorProfile with this data.
     */
    create: XOR<MentorProfileCreateInput, MentorProfileUncheckedCreateInput>
    /**
     * In case the MentorProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MentorProfileUpdateInput, MentorProfileUncheckedUpdateInput>
  }

  /**
   * MentorProfile delete
   */
  export type MentorProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelect<ExtArgs> | null
    /**
     * Filter which MentorProfile to delete.
     */
    where: MentorProfileWhereUniqueInput
  }

  /**
   * MentorProfile deleteMany
   */
  export type MentorProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MentorProfiles to delete
     */
    where?: MentorProfileWhereInput
  }

  /**
   * MentorProfile without action
   */
  export type MentorProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelect<ExtArgs> | null
  }


  /**
   * Model MentorSkill
   */

  export type AggregateMentorSkill = {
    _count: MentorSkillCountAggregateOutputType | null
    _avg: MentorSkillAvgAggregateOutputType | null
    _sum: MentorSkillSumAggregateOutputType | null
    _min: MentorSkillMinAggregateOutputType | null
    _max: MentorSkillMaxAggregateOutputType | null
  }

  export type MentorSkillAvgAggregateOutputType = {
    id: number | null
    mentorId: number | null
  }

  export type MentorSkillSumAggregateOutputType = {
    id: number | null
    mentorId: number | null
  }

  export type MentorSkillMinAggregateOutputType = {
    id: number | null
    mentorId: number | null
    skillName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MentorSkillMaxAggregateOutputType = {
    id: number | null
    mentorId: number | null
    skillName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MentorSkillCountAggregateOutputType = {
    id: number
    mentorId: number
    skillName: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MentorSkillAvgAggregateInputType = {
    id?: true
    mentorId?: true
  }

  export type MentorSkillSumAggregateInputType = {
    id?: true
    mentorId?: true
  }

  export type MentorSkillMinAggregateInputType = {
    id?: true
    mentorId?: true
    skillName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MentorSkillMaxAggregateInputType = {
    id?: true
    mentorId?: true
    skillName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MentorSkillCountAggregateInputType = {
    id?: true
    mentorId?: true
    skillName?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MentorSkillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MentorSkill to aggregate.
     */
    where?: MentorSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorSkills to fetch.
     */
    orderBy?: MentorSkillOrderByWithRelationInput | MentorSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MentorSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MentorSkills
    **/
    _count?: true | MentorSkillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MentorSkillAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MentorSkillSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MentorSkillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MentorSkillMaxAggregateInputType
  }

  export type GetMentorSkillAggregateType<T extends MentorSkillAggregateArgs> = {
        [P in keyof T & keyof AggregateMentorSkill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMentorSkill[P]>
      : GetScalarType<T[P], AggregateMentorSkill[P]>
  }




  export type MentorSkillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MentorSkillWhereInput
    orderBy?: MentorSkillOrderByWithAggregationInput | MentorSkillOrderByWithAggregationInput[]
    by: MentorSkillScalarFieldEnum[] | MentorSkillScalarFieldEnum
    having?: MentorSkillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MentorSkillCountAggregateInputType | true
    _avg?: MentorSkillAvgAggregateInputType
    _sum?: MentorSkillSumAggregateInputType
    _min?: MentorSkillMinAggregateInputType
    _max?: MentorSkillMaxAggregateInputType
  }

  export type MentorSkillGroupByOutputType = {
    id: number
    mentorId: number
    skillName: string
    createdAt: Date
    updatedAt: Date
    _count: MentorSkillCountAggregateOutputType | null
    _avg: MentorSkillAvgAggregateOutputType | null
    _sum: MentorSkillSumAggregateOutputType | null
    _min: MentorSkillMinAggregateOutputType | null
    _max: MentorSkillMaxAggregateOutputType | null
  }

  type GetMentorSkillGroupByPayload<T extends MentorSkillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MentorSkillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MentorSkillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MentorSkillGroupByOutputType[P]>
            : GetScalarType<T[P], MentorSkillGroupByOutputType[P]>
        }
      >
    >


  export type MentorSkillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorId?: boolean
    skillName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mentorSkill"]>

  export type MentorSkillSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorId?: boolean
    skillName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mentorSkill"]>

  export type MentorSkillSelectScalar = {
    id?: boolean
    mentorId?: boolean
    skillName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $MentorSkillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MentorSkill"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      mentorId: number
      skillName: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mentorSkill"]>
    composites: {}
  }

  type MentorSkillGetPayload<S extends boolean | null | undefined | MentorSkillDefaultArgs> = $Result.GetResult<Prisma.$MentorSkillPayload, S>

  type MentorSkillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MentorSkillFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MentorSkillCountAggregateInputType | true
    }

  export interface MentorSkillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MentorSkill'], meta: { name: 'MentorSkill' } }
    /**
     * Find zero or one MentorSkill that matches the filter.
     * @param {MentorSkillFindUniqueArgs} args - Arguments to find a MentorSkill
     * @example
     * // Get one MentorSkill
     * const mentorSkill = await prisma.mentorSkill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MentorSkillFindUniqueArgs>(args: SelectSubset<T, MentorSkillFindUniqueArgs<ExtArgs>>): Prisma__MentorSkillClient<$Result.GetResult<Prisma.$MentorSkillPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MentorSkill that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MentorSkillFindUniqueOrThrowArgs} args - Arguments to find a MentorSkill
     * @example
     * // Get one MentorSkill
     * const mentorSkill = await prisma.mentorSkill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MentorSkillFindUniqueOrThrowArgs>(args: SelectSubset<T, MentorSkillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MentorSkillClient<$Result.GetResult<Prisma.$MentorSkillPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MentorSkill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorSkillFindFirstArgs} args - Arguments to find a MentorSkill
     * @example
     * // Get one MentorSkill
     * const mentorSkill = await prisma.mentorSkill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MentorSkillFindFirstArgs>(args?: SelectSubset<T, MentorSkillFindFirstArgs<ExtArgs>>): Prisma__MentorSkillClient<$Result.GetResult<Prisma.$MentorSkillPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MentorSkill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorSkillFindFirstOrThrowArgs} args - Arguments to find a MentorSkill
     * @example
     * // Get one MentorSkill
     * const mentorSkill = await prisma.mentorSkill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MentorSkillFindFirstOrThrowArgs>(args?: SelectSubset<T, MentorSkillFindFirstOrThrowArgs<ExtArgs>>): Prisma__MentorSkillClient<$Result.GetResult<Prisma.$MentorSkillPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MentorSkills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorSkillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MentorSkills
     * const mentorSkills = await prisma.mentorSkill.findMany()
     * 
     * // Get first 10 MentorSkills
     * const mentorSkills = await prisma.mentorSkill.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mentorSkillWithIdOnly = await prisma.mentorSkill.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MentorSkillFindManyArgs>(args?: SelectSubset<T, MentorSkillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorSkillPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MentorSkill.
     * @param {MentorSkillCreateArgs} args - Arguments to create a MentorSkill.
     * @example
     * // Create one MentorSkill
     * const MentorSkill = await prisma.mentorSkill.create({
     *   data: {
     *     // ... data to create a MentorSkill
     *   }
     * })
     * 
     */
    create<T extends MentorSkillCreateArgs>(args: SelectSubset<T, MentorSkillCreateArgs<ExtArgs>>): Prisma__MentorSkillClient<$Result.GetResult<Prisma.$MentorSkillPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MentorSkills.
     * @param {MentorSkillCreateManyArgs} args - Arguments to create many MentorSkills.
     * @example
     * // Create many MentorSkills
     * const mentorSkill = await prisma.mentorSkill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MentorSkillCreateManyArgs>(args?: SelectSubset<T, MentorSkillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MentorSkills and returns the data saved in the database.
     * @param {MentorSkillCreateManyAndReturnArgs} args - Arguments to create many MentorSkills.
     * @example
     * // Create many MentorSkills
     * const mentorSkill = await prisma.mentorSkill.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MentorSkills and only return the `id`
     * const mentorSkillWithIdOnly = await prisma.mentorSkill.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MentorSkillCreateManyAndReturnArgs>(args?: SelectSubset<T, MentorSkillCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorSkillPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MentorSkill.
     * @param {MentorSkillDeleteArgs} args - Arguments to delete one MentorSkill.
     * @example
     * // Delete one MentorSkill
     * const MentorSkill = await prisma.mentorSkill.delete({
     *   where: {
     *     // ... filter to delete one MentorSkill
     *   }
     * })
     * 
     */
    delete<T extends MentorSkillDeleteArgs>(args: SelectSubset<T, MentorSkillDeleteArgs<ExtArgs>>): Prisma__MentorSkillClient<$Result.GetResult<Prisma.$MentorSkillPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MentorSkill.
     * @param {MentorSkillUpdateArgs} args - Arguments to update one MentorSkill.
     * @example
     * // Update one MentorSkill
     * const mentorSkill = await prisma.mentorSkill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MentorSkillUpdateArgs>(args: SelectSubset<T, MentorSkillUpdateArgs<ExtArgs>>): Prisma__MentorSkillClient<$Result.GetResult<Prisma.$MentorSkillPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MentorSkills.
     * @param {MentorSkillDeleteManyArgs} args - Arguments to filter MentorSkills to delete.
     * @example
     * // Delete a few MentorSkills
     * const { count } = await prisma.mentorSkill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MentorSkillDeleteManyArgs>(args?: SelectSubset<T, MentorSkillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MentorSkills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorSkillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MentorSkills
     * const mentorSkill = await prisma.mentorSkill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MentorSkillUpdateManyArgs>(args: SelectSubset<T, MentorSkillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MentorSkill.
     * @param {MentorSkillUpsertArgs} args - Arguments to update or create a MentorSkill.
     * @example
     * // Update or create a MentorSkill
     * const mentorSkill = await prisma.mentorSkill.upsert({
     *   create: {
     *     // ... data to create a MentorSkill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MentorSkill we want to update
     *   }
     * })
     */
    upsert<T extends MentorSkillUpsertArgs>(args: SelectSubset<T, MentorSkillUpsertArgs<ExtArgs>>): Prisma__MentorSkillClient<$Result.GetResult<Prisma.$MentorSkillPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MentorSkills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorSkillCountArgs} args - Arguments to filter MentorSkills to count.
     * @example
     * // Count the number of MentorSkills
     * const count = await prisma.mentorSkill.count({
     *   where: {
     *     // ... the filter for the MentorSkills we want to count
     *   }
     * })
    **/
    count<T extends MentorSkillCountArgs>(
      args?: Subset<T, MentorSkillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MentorSkillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MentorSkill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorSkillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MentorSkillAggregateArgs>(args: Subset<T, MentorSkillAggregateArgs>): Prisma.PrismaPromise<GetMentorSkillAggregateType<T>>

    /**
     * Group by MentorSkill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorSkillGroupByArgs} args - Group by arguments.
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
      T extends MentorSkillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MentorSkillGroupByArgs['orderBy'] }
        : { orderBy?: MentorSkillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, MentorSkillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMentorSkillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MentorSkill model
   */
  readonly fields: MentorSkillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MentorSkill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MentorSkillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MentorSkill model
   */ 
  interface MentorSkillFieldRefs {
    readonly id: FieldRef<"MentorSkill", 'Int'>
    readonly mentorId: FieldRef<"MentorSkill", 'Int'>
    readonly skillName: FieldRef<"MentorSkill", 'String'>
    readonly createdAt: FieldRef<"MentorSkill", 'DateTime'>
    readonly updatedAt: FieldRef<"MentorSkill", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MentorSkill findUnique
   */
  export type MentorSkillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorSkill
     */
    select?: MentorSkillSelect<ExtArgs> | null
    /**
     * Filter, which MentorSkill to fetch.
     */
    where: MentorSkillWhereUniqueInput
  }

  /**
   * MentorSkill findUniqueOrThrow
   */
  export type MentorSkillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorSkill
     */
    select?: MentorSkillSelect<ExtArgs> | null
    /**
     * Filter, which MentorSkill to fetch.
     */
    where: MentorSkillWhereUniqueInput
  }

  /**
   * MentorSkill findFirst
   */
  export type MentorSkillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorSkill
     */
    select?: MentorSkillSelect<ExtArgs> | null
    /**
     * Filter, which MentorSkill to fetch.
     */
    where?: MentorSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorSkills to fetch.
     */
    orderBy?: MentorSkillOrderByWithRelationInput | MentorSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MentorSkills.
     */
    cursor?: MentorSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MentorSkills.
     */
    distinct?: MentorSkillScalarFieldEnum | MentorSkillScalarFieldEnum[]
  }

  /**
   * MentorSkill findFirstOrThrow
   */
  export type MentorSkillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorSkill
     */
    select?: MentorSkillSelect<ExtArgs> | null
    /**
     * Filter, which MentorSkill to fetch.
     */
    where?: MentorSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorSkills to fetch.
     */
    orderBy?: MentorSkillOrderByWithRelationInput | MentorSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MentorSkills.
     */
    cursor?: MentorSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MentorSkills.
     */
    distinct?: MentorSkillScalarFieldEnum | MentorSkillScalarFieldEnum[]
  }

  /**
   * MentorSkill findMany
   */
  export type MentorSkillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorSkill
     */
    select?: MentorSkillSelect<ExtArgs> | null
    /**
     * Filter, which MentorSkills to fetch.
     */
    where?: MentorSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorSkills to fetch.
     */
    orderBy?: MentorSkillOrderByWithRelationInput | MentorSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MentorSkills.
     */
    cursor?: MentorSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorSkills.
     */
    skip?: number
    distinct?: MentorSkillScalarFieldEnum | MentorSkillScalarFieldEnum[]
  }

  /**
   * MentorSkill create
   */
  export type MentorSkillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorSkill
     */
    select?: MentorSkillSelect<ExtArgs> | null
    /**
     * The data needed to create a MentorSkill.
     */
    data: XOR<MentorSkillCreateInput, MentorSkillUncheckedCreateInput>
  }

  /**
   * MentorSkill createMany
   */
  export type MentorSkillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MentorSkills.
     */
    data: MentorSkillCreateManyInput | MentorSkillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MentorSkill createManyAndReturn
   */
  export type MentorSkillCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorSkill
     */
    select?: MentorSkillSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MentorSkills.
     */
    data: MentorSkillCreateManyInput | MentorSkillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MentorSkill update
   */
  export type MentorSkillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorSkill
     */
    select?: MentorSkillSelect<ExtArgs> | null
    /**
     * The data needed to update a MentorSkill.
     */
    data: XOR<MentorSkillUpdateInput, MentorSkillUncheckedUpdateInput>
    /**
     * Choose, which MentorSkill to update.
     */
    where: MentorSkillWhereUniqueInput
  }

  /**
   * MentorSkill updateMany
   */
  export type MentorSkillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MentorSkills.
     */
    data: XOR<MentorSkillUpdateManyMutationInput, MentorSkillUncheckedUpdateManyInput>
    /**
     * Filter which MentorSkills to update
     */
    where?: MentorSkillWhereInput
  }

  /**
   * MentorSkill upsert
   */
  export type MentorSkillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorSkill
     */
    select?: MentorSkillSelect<ExtArgs> | null
    /**
     * The filter to search for the MentorSkill to update in case it exists.
     */
    where: MentorSkillWhereUniqueInput
    /**
     * In case the MentorSkill found by the `where` argument doesn't exist, create a new MentorSkill with this data.
     */
    create: XOR<MentorSkillCreateInput, MentorSkillUncheckedCreateInput>
    /**
     * In case the MentorSkill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MentorSkillUpdateInput, MentorSkillUncheckedUpdateInput>
  }

  /**
   * MentorSkill delete
   */
  export type MentorSkillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorSkill
     */
    select?: MentorSkillSelect<ExtArgs> | null
    /**
     * Filter which MentorSkill to delete.
     */
    where: MentorSkillWhereUniqueInput
  }

  /**
   * MentorSkill deleteMany
   */
  export type MentorSkillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MentorSkills to delete
     */
    where?: MentorSkillWhereInput
  }

  /**
   * MentorSkill without action
   */
  export type MentorSkillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorSkill
     */
    select?: MentorSkillSelect<ExtArgs> | null
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


  export const MentorProfileScalarFieldEnum: {
    userId: 'userId',
    bio: 'bio',
    cvUrl: 'cvUrl',
    linkedinUrl: 'linkedinUrl',
    industry: 'industry',
    skills: 'skills',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MentorProfileScalarFieldEnum = (typeof MentorProfileScalarFieldEnum)[keyof typeof MentorProfileScalarFieldEnum]


  export const MentorSkillScalarFieldEnum: {
    id: 'id',
    mentorId: 'mentorId',
    skillName: 'skillName',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MentorSkillScalarFieldEnum = (typeof MentorSkillScalarFieldEnum)[keyof typeof MentorSkillScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type MentorProfileWhereInput = {
    AND?: MentorProfileWhereInput | MentorProfileWhereInput[]
    OR?: MentorProfileWhereInput[]
    NOT?: MentorProfileWhereInput | MentorProfileWhereInput[]
    userId?: IntFilter<"MentorProfile"> | number
    bio?: StringNullableFilter<"MentorProfile"> | string | null
    cvUrl?: StringNullableFilter<"MentorProfile"> | string | null
    linkedinUrl?: StringNullableFilter<"MentorProfile"> | string | null
    industry?: StringNullableFilter<"MentorProfile"> | string | null
    skills?: StringNullableListFilter<"MentorProfile">
    createdAt?: DateTimeFilter<"MentorProfile"> | Date | string
    updatedAt?: DateTimeFilter<"MentorProfile"> | Date | string
  }

  export type MentorProfileOrderByWithRelationInput = {
    userId?: SortOrder
    bio?: SortOrderInput | SortOrder
    cvUrl?: SortOrderInput | SortOrder
    linkedinUrl?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    skills?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorProfileWhereUniqueInput = Prisma.AtLeast<{
    userId?: number
    AND?: MentorProfileWhereInput | MentorProfileWhereInput[]
    OR?: MentorProfileWhereInput[]
    NOT?: MentorProfileWhereInput | MentorProfileWhereInput[]
    bio?: StringNullableFilter<"MentorProfile"> | string | null
    cvUrl?: StringNullableFilter<"MentorProfile"> | string | null
    linkedinUrl?: StringNullableFilter<"MentorProfile"> | string | null
    industry?: StringNullableFilter<"MentorProfile"> | string | null
    skills?: StringNullableListFilter<"MentorProfile">
    createdAt?: DateTimeFilter<"MentorProfile"> | Date | string
    updatedAt?: DateTimeFilter<"MentorProfile"> | Date | string
  }, "userId">

  export type MentorProfileOrderByWithAggregationInput = {
    userId?: SortOrder
    bio?: SortOrderInput | SortOrder
    cvUrl?: SortOrderInput | SortOrder
    linkedinUrl?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    skills?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MentorProfileCountOrderByAggregateInput
    _avg?: MentorProfileAvgOrderByAggregateInput
    _max?: MentorProfileMaxOrderByAggregateInput
    _min?: MentorProfileMinOrderByAggregateInput
    _sum?: MentorProfileSumOrderByAggregateInput
  }

  export type MentorProfileScalarWhereWithAggregatesInput = {
    AND?: MentorProfileScalarWhereWithAggregatesInput | MentorProfileScalarWhereWithAggregatesInput[]
    OR?: MentorProfileScalarWhereWithAggregatesInput[]
    NOT?: MentorProfileScalarWhereWithAggregatesInput | MentorProfileScalarWhereWithAggregatesInput[]
    userId?: IntWithAggregatesFilter<"MentorProfile"> | number
    bio?: StringNullableWithAggregatesFilter<"MentorProfile"> | string | null
    cvUrl?: StringNullableWithAggregatesFilter<"MentorProfile"> | string | null
    linkedinUrl?: StringNullableWithAggregatesFilter<"MentorProfile"> | string | null
    industry?: StringNullableWithAggregatesFilter<"MentorProfile"> | string | null
    skills?: StringNullableListFilter<"MentorProfile">
    createdAt?: DateTimeWithAggregatesFilter<"MentorProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MentorProfile"> | Date | string
  }

  export type MentorSkillWhereInput = {
    AND?: MentorSkillWhereInput | MentorSkillWhereInput[]
    OR?: MentorSkillWhereInput[]
    NOT?: MentorSkillWhereInput | MentorSkillWhereInput[]
    id?: IntFilter<"MentorSkill"> | number
    mentorId?: IntFilter<"MentorSkill"> | number
    skillName?: StringFilter<"MentorSkill"> | string
    createdAt?: DateTimeFilter<"MentorSkill"> | Date | string
    updatedAt?: DateTimeFilter<"MentorSkill"> | Date | string
  }

  export type MentorSkillOrderByWithRelationInput = {
    id?: SortOrder
    mentorId?: SortOrder
    skillName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorSkillWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MentorSkillWhereInput | MentorSkillWhereInput[]
    OR?: MentorSkillWhereInput[]
    NOT?: MentorSkillWhereInput | MentorSkillWhereInput[]
    mentorId?: IntFilter<"MentorSkill"> | number
    skillName?: StringFilter<"MentorSkill"> | string
    createdAt?: DateTimeFilter<"MentorSkill"> | Date | string
    updatedAt?: DateTimeFilter<"MentorSkill"> | Date | string
  }, "id">

  export type MentorSkillOrderByWithAggregationInput = {
    id?: SortOrder
    mentorId?: SortOrder
    skillName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MentorSkillCountOrderByAggregateInput
    _avg?: MentorSkillAvgOrderByAggregateInput
    _max?: MentorSkillMaxOrderByAggregateInput
    _min?: MentorSkillMinOrderByAggregateInput
    _sum?: MentorSkillSumOrderByAggregateInput
  }

  export type MentorSkillScalarWhereWithAggregatesInput = {
    AND?: MentorSkillScalarWhereWithAggregatesInput | MentorSkillScalarWhereWithAggregatesInput[]
    OR?: MentorSkillScalarWhereWithAggregatesInput[]
    NOT?: MentorSkillScalarWhereWithAggregatesInput | MentorSkillScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MentorSkill"> | number
    mentorId?: IntWithAggregatesFilter<"MentorSkill"> | number
    skillName?: StringWithAggregatesFilter<"MentorSkill"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MentorSkill"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MentorSkill"> | Date | string
  }

  export type MentorProfileCreateInput = {
    userId: number
    bio?: string | null
    cvUrl?: string | null
    linkedinUrl?: string | null
    industry?: string | null
    skills?: MentorProfileCreateskillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorProfileUncheckedCreateInput = {
    userId: number
    bio?: string | null
    cvUrl?: string | null
    linkedinUrl?: string | null
    industry?: string | null
    skills?: MentorProfileCreateskillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorProfileUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cvUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: MentorProfileUpdateskillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorProfileUncheckedUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cvUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: MentorProfileUpdateskillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorProfileCreateManyInput = {
    userId: number
    bio?: string | null
    cvUrl?: string | null
    linkedinUrl?: string | null
    industry?: string | null
    skills?: MentorProfileCreateskillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorProfileUpdateManyMutationInput = {
    userId?: IntFieldUpdateOperationsInput | number
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cvUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: MentorProfileUpdateskillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorProfileUncheckedUpdateManyInput = {
    userId?: IntFieldUpdateOperationsInput | number
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    cvUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: MentorProfileUpdateskillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorSkillCreateInput = {
    mentorId: number
    skillName: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorSkillUncheckedCreateInput = {
    id?: number
    mentorId: number
    skillName: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorSkillUpdateInput = {
    mentorId?: IntFieldUpdateOperationsInput | number
    skillName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorSkillUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    mentorId?: IntFieldUpdateOperationsInput | number
    skillName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorSkillCreateManyInput = {
    id?: number
    mentorId: number
    skillName: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorSkillUpdateManyMutationInput = {
    mentorId?: IntFieldUpdateOperationsInput | number
    skillName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorSkillUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    mentorId?: IntFieldUpdateOperationsInput | number
    skillName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MentorProfileCountOrderByAggregateInput = {
    userId?: SortOrder
    bio?: SortOrder
    cvUrl?: SortOrder
    linkedinUrl?: SortOrder
    industry?: SortOrder
    skills?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorProfileAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type MentorProfileMaxOrderByAggregateInput = {
    userId?: SortOrder
    bio?: SortOrder
    cvUrl?: SortOrder
    linkedinUrl?: SortOrder
    industry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorProfileMinOrderByAggregateInput = {
    userId?: SortOrder
    bio?: SortOrder
    cvUrl?: SortOrder
    linkedinUrl?: SortOrder
    industry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorProfileSumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type MentorSkillCountOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    skillName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorSkillAvgOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
  }

  export type MentorSkillMaxOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    skillName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorSkillMinOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    skillName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorSkillSumOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type MentorProfileCreateskillsInput = {
    set: string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type MentorProfileUpdateskillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use MentorProfileDefaultArgs instead
     */
    export type MentorProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MentorProfileDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MentorSkillDefaultArgs instead
     */
    export type MentorSkillArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MentorSkillDefaultArgs<ExtArgs>

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