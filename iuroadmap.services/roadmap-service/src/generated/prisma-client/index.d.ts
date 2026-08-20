
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
 * Model DEPARTMENTS
 * 
 */
export type DEPARTMENTS = $Result.DefaultSelection<Prisma.$DEPARTMENTSPayload>
/**
 * Model MAJOR_ROADMAPS
 * 
 */
export type MAJOR_ROADMAPS = $Result.DefaultSelection<Prisma.$MAJOR_ROADMAPSPayload>
/**
 * Model COURSE_NODES
 * 
 */
export type COURSE_NODES = $Result.DefaultSelection<Prisma.$COURSE_NODESPayload>
/**
 * Model COURSE_NODE_PREREQUISITES
 * 
 */
export type COURSE_NODE_PREREQUISITES = $Result.DefaultSelection<Prisma.$COURSE_NODE_PREREQUISITESPayload>
/**
 * Model COURSE_TOPICS_NODE
 * 
 */
export type COURSE_TOPICS_NODE = $Result.DefaultSelection<Prisma.$COURSE_TOPICS_NODEPayload>
/**
 * Model COURSE_TOPICS_EDGE
 * 
 */
export type COURSE_TOPICS_EDGE = $Result.DefaultSelection<Prisma.$COURSE_TOPICS_EDGEPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more DEPARTMENTS
 * const dEPARTMENTS = await prisma.dEPARTMENTS.findMany()
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
   * // Fetch zero or more DEPARTMENTS
   * const dEPARTMENTS = await prisma.dEPARTMENTS.findMany()
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
   * `prisma.dEPARTMENTS`: Exposes CRUD operations for the **DEPARTMENTS** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DEPARTMENTS
    * const dEPARTMENTS = await prisma.dEPARTMENTS.findMany()
    * ```
    */
  get dEPARTMENTS(): Prisma.DEPARTMENTSDelegate<ExtArgs>;

  /**
   * `prisma.mAJOR_ROADMAPS`: Exposes CRUD operations for the **MAJOR_ROADMAPS** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MAJOR_ROADMAPS
    * const mAJOR_ROADMAPS = await prisma.mAJOR_ROADMAPS.findMany()
    * ```
    */
  get mAJOR_ROADMAPS(): Prisma.MAJOR_ROADMAPSDelegate<ExtArgs>;

  /**
   * `prisma.cOURSE_NODES`: Exposes CRUD operations for the **COURSE_NODES** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more COURSE_NODES
    * const cOURSE_NODES = await prisma.cOURSE_NODES.findMany()
    * ```
    */
  get cOURSE_NODES(): Prisma.COURSE_NODESDelegate<ExtArgs>;

  /**
   * `prisma.cOURSE_NODE_PREREQUISITES`: Exposes CRUD operations for the **COURSE_NODE_PREREQUISITES** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more COURSE_NODE_PREREQUISITES
    * const cOURSE_NODE_PREREQUISITES = await prisma.cOURSE_NODE_PREREQUISITES.findMany()
    * ```
    */
  get cOURSE_NODE_PREREQUISITES(): Prisma.COURSE_NODE_PREREQUISITESDelegate<ExtArgs>;

  /**
   * `prisma.cOURSE_TOPICS_NODE`: Exposes CRUD operations for the **COURSE_TOPICS_NODE** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more COURSE_TOPICS_NODES
    * const cOURSE_TOPICS_NODES = await prisma.cOURSE_TOPICS_NODE.findMany()
    * ```
    */
  get cOURSE_TOPICS_NODE(): Prisma.COURSE_TOPICS_NODEDelegate<ExtArgs>;

  /**
   * `prisma.cOURSE_TOPICS_EDGE`: Exposes CRUD operations for the **COURSE_TOPICS_EDGE** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more COURSE_TOPICS_EDGES
    * const cOURSE_TOPICS_EDGES = await prisma.cOURSE_TOPICS_EDGE.findMany()
    * ```
    */
  get cOURSE_TOPICS_EDGE(): Prisma.COURSE_TOPICS_EDGEDelegate<ExtArgs>;
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
    DEPARTMENTS: 'DEPARTMENTS',
    MAJOR_ROADMAPS: 'MAJOR_ROADMAPS',
    COURSE_NODES: 'COURSE_NODES',
    COURSE_NODE_PREREQUISITES: 'COURSE_NODE_PREREQUISITES',
    COURSE_TOPICS_NODE: 'COURSE_TOPICS_NODE',
    COURSE_TOPICS_EDGE: 'COURSE_TOPICS_EDGE'
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
      modelProps: "dEPARTMENTS" | "mAJOR_ROADMAPS" | "cOURSE_NODES" | "cOURSE_NODE_PREREQUISITES" | "cOURSE_TOPICS_NODE" | "cOURSE_TOPICS_EDGE"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      DEPARTMENTS: {
        payload: Prisma.$DEPARTMENTSPayload<ExtArgs>
        fields: Prisma.DEPARTMENTSFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DEPARTMENTSFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DEPARTMENTSPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DEPARTMENTSFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DEPARTMENTSPayload>
          }
          findFirst: {
            args: Prisma.DEPARTMENTSFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DEPARTMENTSPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DEPARTMENTSFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DEPARTMENTSPayload>
          }
          findMany: {
            args: Prisma.DEPARTMENTSFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DEPARTMENTSPayload>[]
          }
          create: {
            args: Prisma.DEPARTMENTSCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DEPARTMENTSPayload>
          }
          createMany: {
            args: Prisma.DEPARTMENTSCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DEPARTMENTSCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DEPARTMENTSPayload>[]
          }
          delete: {
            args: Prisma.DEPARTMENTSDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DEPARTMENTSPayload>
          }
          update: {
            args: Prisma.DEPARTMENTSUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DEPARTMENTSPayload>
          }
          deleteMany: {
            args: Prisma.DEPARTMENTSDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DEPARTMENTSUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DEPARTMENTSUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DEPARTMENTSPayload>
          }
          aggregate: {
            args: Prisma.DEPARTMENTSAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDEPARTMENTS>
          }
          groupBy: {
            args: Prisma.DEPARTMENTSGroupByArgs<ExtArgs>
            result: $Utils.Optional<DEPARTMENTSGroupByOutputType>[]
          }
          count: {
            args: Prisma.DEPARTMENTSCountArgs<ExtArgs>
            result: $Utils.Optional<DEPARTMENTSCountAggregateOutputType> | number
          }
        }
      }
      MAJOR_ROADMAPS: {
        payload: Prisma.$MAJOR_ROADMAPSPayload<ExtArgs>
        fields: Prisma.MAJOR_ROADMAPSFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MAJOR_ROADMAPSFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MAJOR_ROADMAPSPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MAJOR_ROADMAPSFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MAJOR_ROADMAPSPayload>
          }
          findFirst: {
            args: Prisma.MAJOR_ROADMAPSFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MAJOR_ROADMAPSPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MAJOR_ROADMAPSFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MAJOR_ROADMAPSPayload>
          }
          findMany: {
            args: Prisma.MAJOR_ROADMAPSFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MAJOR_ROADMAPSPayload>[]
          }
          create: {
            args: Prisma.MAJOR_ROADMAPSCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MAJOR_ROADMAPSPayload>
          }
          createMany: {
            args: Prisma.MAJOR_ROADMAPSCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MAJOR_ROADMAPSCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MAJOR_ROADMAPSPayload>[]
          }
          delete: {
            args: Prisma.MAJOR_ROADMAPSDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MAJOR_ROADMAPSPayload>
          }
          update: {
            args: Prisma.MAJOR_ROADMAPSUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MAJOR_ROADMAPSPayload>
          }
          deleteMany: {
            args: Prisma.MAJOR_ROADMAPSDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MAJOR_ROADMAPSUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MAJOR_ROADMAPSUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MAJOR_ROADMAPSPayload>
          }
          aggregate: {
            args: Prisma.MAJOR_ROADMAPSAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMAJOR_ROADMAPS>
          }
          groupBy: {
            args: Prisma.MAJOR_ROADMAPSGroupByArgs<ExtArgs>
            result: $Utils.Optional<MAJOR_ROADMAPSGroupByOutputType>[]
          }
          count: {
            args: Prisma.MAJOR_ROADMAPSCountArgs<ExtArgs>
            result: $Utils.Optional<MAJOR_ROADMAPSCountAggregateOutputType> | number
          }
        }
      }
      COURSE_NODES: {
        payload: Prisma.$COURSE_NODESPayload<ExtArgs>
        fields: Prisma.COURSE_NODESFieldRefs
        operations: {
          findUnique: {
            args: Prisma.COURSE_NODESFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_NODESPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.COURSE_NODESFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_NODESPayload>
          }
          findFirst: {
            args: Prisma.COURSE_NODESFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_NODESPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.COURSE_NODESFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_NODESPayload>
          }
          findMany: {
            args: Prisma.COURSE_NODESFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_NODESPayload>[]
          }
          create: {
            args: Prisma.COURSE_NODESCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_NODESPayload>
          }
          createMany: {
            args: Prisma.COURSE_NODESCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.COURSE_NODESCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_NODESPayload>[]
          }
          delete: {
            args: Prisma.COURSE_NODESDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_NODESPayload>
          }
          update: {
            args: Prisma.COURSE_NODESUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_NODESPayload>
          }
          deleteMany: {
            args: Prisma.COURSE_NODESDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.COURSE_NODESUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.COURSE_NODESUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_NODESPayload>
          }
          aggregate: {
            args: Prisma.COURSE_NODESAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCOURSE_NODES>
          }
          groupBy: {
            args: Prisma.COURSE_NODESGroupByArgs<ExtArgs>
            result: $Utils.Optional<COURSE_NODESGroupByOutputType>[]
          }
          count: {
            args: Prisma.COURSE_NODESCountArgs<ExtArgs>
            result: $Utils.Optional<COURSE_NODESCountAggregateOutputType> | number
          }
        }
      }
      COURSE_NODE_PREREQUISITES: {
        payload: Prisma.$COURSE_NODE_PREREQUISITESPayload<ExtArgs>
        fields: Prisma.COURSE_NODE_PREREQUISITESFieldRefs
        operations: {
          findUnique: {
            args: Prisma.COURSE_NODE_PREREQUISITESFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_NODE_PREREQUISITESPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.COURSE_NODE_PREREQUISITESFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_NODE_PREREQUISITESPayload>
          }
          findFirst: {
            args: Prisma.COURSE_NODE_PREREQUISITESFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_NODE_PREREQUISITESPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.COURSE_NODE_PREREQUISITESFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_NODE_PREREQUISITESPayload>
          }
          findMany: {
            args: Prisma.COURSE_NODE_PREREQUISITESFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_NODE_PREREQUISITESPayload>[]
          }
          create: {
            args: Prisma.COURSE_NODE_PREREQUISITESCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_NODE_PREREQUISITESPayload>
          }
          createMany: {
            args: Prisma.COURSE_NODE_PREREQUISITESCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.COURSE_NODE_PREREQUISITESCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_NODE_PREREQUISITESPayload>[]
          }
          delete: {
            args: Prisma.COURSE_NODE_PREREQUISITESDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_NODE_PREREQUISITESPayload>
          }
          update: {
            args: Prisma.COURSE_NODE_PREREQUISITESUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_NODE_PREREQUISITESPayload>
          }
          deleteMany: {
            args: Prisma.COURSE_NODE_PREREQUISITESDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.COURSE_NODE_PREREQUISITESUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.COURSE_NODE_PREREQUISITESUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_NODE_PREREQUISITESPayload>
          }
          aggregate: {
            args: Prisma.COURSE_NODE_PREREQUISITESAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCOURSE_NODE_PREREQUISITES>
          }
          groupBy: {
            args: Prisma.COURSE_NODE_PREREQUISITESGroupByArgs<ExtArgs>
            result: $Utils.Optional<COURSE_NODE_PREREQUISITESGroupByOutputType>[]
          }
          count: {
            args: Prisma.COURSE_NODE_PREREQUISITESCountArgs<ExtArgs>
            result: $Utils.Optional<COURSE_NODE_PREREQUISITESCountAggregateOutputType> | number
          }
        }
      }
      COURSE_TOPICS_NODE: {
        payload: Prisma.$COURSE_TOPICS_NODEPayload<ExtArgs>
        fields: Prisma.COURSE_TOPICS_NODEFieldRefs
        operations: {
          findUnique: {
            args: Prisma.COURSE_TOPICS_NODEFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_TOPICS_NODEPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.COURSE_TOPICS_NODEFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_TOPICS_NODEPayload>
          }
          findFirst: {
            args: Prisma.COURSE_TOPICS_NODEFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_TOPICS_NODEPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.COURSE_TOPICS_NODEFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_TOPICS_NODEPayload>
          }
          findMany: {
            args: Prisma.COURSE_TOPICS_NODEFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_TOPICS_NODEPayload>[]
          }
          create: {
            args: Prisma.COURSE_TOPICS_NODECreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_TOPICS_NODEPayload>
          }
          createMany: {
            args: Prisma.COURSE_TOPICS_NODECreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.COURSE_TOPICS_NODECreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_TOPICS_NODEPayload>[]
          }
          delete: {
            args: Prisma.COURSE_TOPICS_NODEDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_TOPICS_NODEPayload>
          }
          update: {
            args: Prisma.COURSE_TOPICS_NODEUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_TOPICS_NODEPayload>
          }
          deleteMany: {
            args: Prisma.COURSE_TOPICS_NODEDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.COURSE_TOPICS_NODEUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.COURSE_TOPICS_NODEUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_TOPICS_NODEPayload>
          }
          aggregate: {
            args: Prisma.COURSE_TOPICS_NODEAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCOURSE_TOPICS_NODE>
          }
          groupBy: {
            args: Prisma.COURSE_TOPICS_NODEGroupByArgs<ExtArgs>
            result: $Utils.Optional<COURSE_TOPICS_NODEGroupByOutputType>[]
          }
          count: {
            args: Prisma.COURSE_TOPICS_NODECountArgs<ExtArgs>
            result: $Utils.Optional<COURSE_TOPICS_NODECountAggregateOutputType> | number
          }
        }
      }
      COURSE_TOPICS_EDGE: {
        payload: Prisma.$COURSE_TOPICS_EDGEPayload<ExtArgs>
        fields: Prisma.COURSE_TOPICS_EDGEFieldRefs
        operations: {
          findUnique: {
            args: Prisma.COURSE_TOPICS_EDGEFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_TOPICS_EDGEPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.COURSE_TOPICS_EDGEFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_TOPICS_EDGEPayload>
          }
          findFirst: {
            args: Prisma.COURSE_TOPICS_EDGEFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_TOPICS_EDGEPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.COURSE_TOPICS_EDGEFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_TOPICS_EDGEPayload>
          }
          findMany: {
            args: Prisma.COURSE_TOPICS_EDGEFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_TOPICS_EDGEPayload>[]
          }
          create: {
            args: Prisma.COURSE_TOPICS_EDGECreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_TOPICS_EDGEPayload>
          }
          createMany: {
            args: Prisma.COURSE_TOPICS_EDGECreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.COURSE_TOPICS_EDGECreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_TOPICS_EDGEPayload>[]
          }
          delete: {
            args: Prisma.COURSE_TOPICS_EDGEDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_TOPICS_EDGEPayload>
          }
          update: {
            args: Prisma.COURSE_TOPICS_EDGEUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_TOPICS_EDGEPayload>
          }
          deleteMany: {
            args: Prisma.COURSE_TOPICS_EDGEDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.COURSE_TOPICS_EDGEUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.COURSE_TOPICS_EDGEUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$COURSE_TOPICS_EDGEPayload>
          }
          aggregate: {
            args: Prisma.COURSE_TOPICS_EDGEAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCOURSE_TOPICS_EDGE>
          }
          groupBy: {
            args: Prisma.COURSE_TOPICS_EDGEGroupByArgs<ExtArgs>
            result: $Utils.Optional<COURSE_TOPICS_EDGEGroupByOutputType>[]
          }
          count: {
            args: Prisma.COURSE_TOPICS_EDGECountArgs<ExtArgs>
            result: $Utils.Optional<COURSE_TOPICS_EDGECountAggregateOutputType> | number
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
   * Count Type DEPARTMENTSCountOutputType
   */

  export type DEPARTMENTSCountOutputType = {
    roadmaps: number
  }

  export type DEPARTMENTSCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roadmaps?: boolean | DEPARTMENTSCountOutputTypeCountRoadmapsArgs
  }

  // Custom InputTypes
  /**
   * DEPARTMENTSCountOutputType without action
   */
  export type DEPARTMENTSCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DEPARTMENTSCountOutputType
     */
    select?: DEPARTMENTSCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DEPARTMENTSCountOutputType without action
   */
  export type DEPARTMENTSCountOutputTypeCountRoadmapsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MAJOR_ROADMAPSWhereInput
  }


  /**
   * Count Type MAJOR_ROADMAPSCountOutputType
   */

  export type MAJOR_ROADMAPSCountOutputType = {
    courseNodes: number
  }

  export type MAJOR_ROADMAPSCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courseNodes?: boolean | MAJOR_ROADMAPSCountOutputTypeCountCourseNodesArgs
  }

  // Custom InputTypes
  /**
   * MAJOR_ROADMAPSCountOutputType without action
   */
  export type MAJOR_ROADMAPSCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MAJOR_ROADMAPSCountOutputType
     */
    select?: MAJOR_ROADMAPSCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MAJOR_ROADMAPSCountOutputType without action
   */
  export type MAJOR_ROADMAPSCountOutputTypeCountCourseNodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: COURSE_NODESWhereInput
  }


  /**
   * Count Type COURSE_NODESCountOutputType
   */

  export type COURSE_NODESCountOutputType = {
    courseTopics: number
    prerequisitesAsSource: number
    prerequisitesAsTarget: number
  }

  export type COURSE_NODESCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courseTopics?: boolean | COURSE_NODESCountOutputTypeCountCourseTopicsArgs
    prerequisitesAsSource?: boolean | COURSE_NODESCountOutputTypeCountPrerequisitesAsSourceArgs
    prerequisitesAsTarget?: boolean | COURSE_NODESCountOutputTypeCountPrerequisitesAsTargetArgs
  }

  // Custom InputTypes
  /**
   * COURSE_NODESCountOutputType without action
   */
  export type COURSE_NODESCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODESCountOutputType
     */
    select?: COURSE_NODESCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * COURSE_NODESCountOutputType without action
   */
  export type COURSE_NODESCountOutputTypeCountCourseTopicsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: COURSE_TOPICS_NODEWhereInput
  }

  /**
   * COURSE_NODESCountOutputType without action
   */
  export type COURSE_NODESCountOutputTypeCountPrerequisitesAsSourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: COURSE_NODE_PREREQUISITESWhereInput
  }

  /**
   * COURSE_NODESCountOutputType without action
   */
  export type COURSE_NODESCountOutputTypeCountPrerequisitesAsTargetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: COURSE_NODE_PREREQUISITESWhereInput
  }


  /**
   * Count Type COURSE_TOPICS_NODECountOutputType
   */

  export type COURSE_TOPICS_NODECountOutputType = {
    topicEdgesAsSource: number
    topicEdgesAsTarget: number
  }

  export type COURSE_TOPICS_NODECountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    topicEdgesAsSource?: boolean | COURSE_TOPICS_NODECountOutputTypeCountTopicEdgesAsSourceArgs
    topicEdgesAsTarget?: boolean | COURSE_TOPICS_NODECountOutputTypeCountTopicEdgesAsTargetArgs
  }

  // Custom InputTypes
  /**
   * COURSE_TOPICS_NODECountOutputType without action
   */
  export type COURSE_TOPICS_NODECountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_NODECountOutputType
     */
    select?: COURSE_TOPICS_NODECountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * COURSE_TOPICS_NODECountOutputType without action
   */
  export type COURSE_TOPICS_NODECountOutputTypeCountTopicEdgesAsSourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: COURSE_TOPICS_EDGEWhereInput
  }

  /**
   * COURSE_TOPICS_NODECountOutputType without action
   */
  export type COURSE_TOPICS_NODECountOutputTypeCountTopicEdgesAsTargetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: COURSE_TOPICS_EDGEWhereInput
  }


  /**
   * Models
   */

  /**
   * Model DEPARTMENTS
   */

  export type AggregateDEPARTMENTS = {
    _count: DEPARTMENTSCountAggregateOutputType | null
    _avg: DEPARTMENTSAvgAggregateOutputType | null
    _sum: DEPARTMENTSSumAggregateOutputType | null
    _min: DEPARTMENTSMinAggregateOutputType | null
    _max: DEPARTMENTSMaxAggregateOutputType | null
  }

  export type DEPARTMENTSAvgAggregateOutputType = {
    id: number | null
  }

  export type DEPARTMENTSSumAggregateOutputType = {
    id: number | null
  }

  export type DEPARTMENTSMinAggregateOutputType = {
    id: number | null
    slug: string | null
    name: string | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DEPARTMENTSMaxAggregateOutputType = {
    id: number | null
    slug: string | null
    name: string | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DEPARTMENTSCountAggregateOutputType = {
    id: number
    slug: number
    name: number
    description: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type DEPARTMENTSAvgAggregateInputType = {
    id?: true
  }

  export type DEPARTMENTSSumAggregateInputType = {
    id?: true
  }

  export type DEPARTMENTSMinAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    description?: true
    created_at?: true
    updated_at?: true
  }

  export type DEPARTMENTSMaxAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    description?: true
    created_at?: true
    updated_at?: true
  }

  export type DEPARTMENTSCountAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    description?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type DEPARTMENTSAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DEPARTMENTS to aggregate.
     */
    where?: DEPARTMENTSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DEPARTMENTS to fetch.
     */
    orderBy?: DEPARTMENTSOrderByWithRelationInput | DEPARTMENTSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DEPARTMENTSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DEPARTMENTS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DEPARTMENTS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DEPARTMENTS
    **/
    _count?: true | DEPARTMENTSCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DEPARTMENTSAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DEPARTMENTSSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DEPARTMENTSMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DEPARTMENTSMaxAggregateInputType
  }

  export type GetDEPARTMENTSAggregateType<T extends DEPARTMENTSAggregateArgs> = {
        [P in keyof T & keyof AggregateDEPARTMENTS]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDEPARTMENTS[P]>
      : GetScalarType<T[P], AggregateDEPARTMENTS[P]>
  }




  export type DEPARTMENTSGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DEPARTMENTSWhereInput
    orderBy?: DEPARTMENTSOrderByWithAggregationInput | DEPARTMENTSOrderByWithAggregationInput[]
    by: DEPARTMENTSScalarFieldEnum[] | DEPARTMENTSScalarFieldEnum
    having?: DEPARTMENTSScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DEPARTMENTSCountAggregateInputType | true
    _avg?: DEPARTMENTSAvgAggregateInputType
    _sum?: DEPARTMENTSSumAggregateInputType
    _min?: DEPARTMENTSMinAggregateInputType
    _max?: DEPARTMENTSMaxAggregateInputType
  }

  export type DEPARTMENTSGroupByOutputType = {
    id: number
    slug: string
    name: string
    description: string | null
    created_at: Date
    updated_at: Date
    _count: DEPARTMENTSCountAggregateOutputType | null
    _avg: DEPARTMENTSAvgAggregateOutputType | null
    _sum: DEPARTMENTSSumAggregateOutputType | null
    _min: DEPARTMENTSMinAggregateOutputType | null
    _max: DEPARTMENTSMaxAggregateOutputType | null
  }

  type GetDEPARTMENTSGroupByPayload<T extends DEPARTMENTSGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DEPARTMENTSGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DEPARTMENTSGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DEPARTMENTSGroupByOutputType[P]>
            : GetScalarType<T[P], DEPARTMENTSGroupByOutputType[P]>
        }
      >
    >


  export type DEPARTMENTSSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    roadmaps?: boolean | DEPARTMENTS$roadmapsArgs<ExtArgs>
    _count?: boolean | DEPARTMENTSCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dEPARTMENTS"]>

  export type DEPARTMENTSSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["dEPARTMENTS"]>

  export type DEPARTMENTSSelectScalar = {
    id?: boolean
    slug?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type DEPARTMENTSInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roadmaps?: boolean | DEPARTMENTS$roadmapsArgs<ExtArgs>
    _count?: boolean | DEPARTMENTSCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DEPARTMENTSIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DEPARTMENTSPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DEPARTMENTS"
    objects: {
      roadmaps: Prisma.$MAJOR_ROADMAPSPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      slug: string
      name: string
      description: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["dEPARTMENTS"]>
    composites: {}
  }

  type DEPARTMENTSGetPayload<S extends boolean | null | undefined | DEPARTMENTSDefaultArgs> = $Result.GetResult<Prisma.$DEPARTMENTSPayload, S>

  type DEPARTMENTSCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DEPARTMENTSFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DEPARTMENTSCountAggregateInputType | true
    }

  export interface DEPARTMENTSDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DEPARTMENTS'], meta: { name: 'DEPARTMENTS' } }
    /**
     * Find zero or one DEPARTMENTS that matches the filter.
     * @param {DEPARTMENTSFindUniqueArgs} args - Arguments to find a DEPARTMENTS
     * @example
     * // Get one DEPARTMENTS
     * const dEPARTMENTS = await prisma.dEPARTMENTS.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DEPARTMENTSFindUniqueArgs>(args: SelectSubset<T, DEPARTMENTSFindUniqueArgs<ExtArgs>>): Prisma__DEPARTMENTSClient<$Result.GetResult<Prisma.$DEPARTMENTSPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DEPARTMENTS that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DEPARTMENTSFindUniqueOrThrowArgs} args - Arguments to find a DEPARTMENTS
     * @example
     * // Get one DEPARTMENTS
     * const dEPARTMENTS = await prisma.dEPARTMENTS.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DEPARTMENTSFindUniqueOrThrowArgs>(args: SelectSubset<T, DEPARTMENTSFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DEPARTMENTSClient<$Result.GetResult<Prisma.$DEPARTMENTSPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DEPARTMENTS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DEPARTMENTSFindFirstArgs} args - Arguments to find a DEPARTMENTS
     * @example
     * // Get one DEPARTMENTS
     * const dEPARTMENTS = await prisma.dEPARTMENTS.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DEPARTMENTSFindFirstArgs>(args?: SelectSubset<T, DEPARTMENTSFindFirstArgs<ExtArgs>>): Prisma__DEPARTMENTSClient<$Result.GetResult<Prisma.$DEPARTMENTSPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DEPARTMENTS that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DEPARTMENTSFindFirstOrThrowArgs} args - Arguments to find a DEPARTMENTS
     * @example
     * // Get one DEPARTMENTS
     * const dEPARTMENTS = await prisma.dEPARTMENTS.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DEPARTMENTSFindFirstOrThrowArgs>(args?: SelectSubset<T, DEPARTMENTSFindFirstOrThrowArgs<ExtArgs>>): Prisma__DEPARTMENTSClient<$Result.GetResult<Prisma.$DEPARTMENTSPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DEPARTMENTS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DEPARTMENTSFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DEPARTMENTS
     * const dEPARTMENTS = await prisma.dEPARTMENTS.findMany()
     * 
     * // Get first 10 DEPARTMENTS
     * const dEPARTMENTS = await prisma.dEPARTMENTS.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dEPARTMENTSWithIdOnly = await prisma.dEPARTMENTS.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DEPARTMENTSFindManyArgs>(args?: SelectSubset<T, DEPARTMENTSFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DEPARTMENTSPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DEPARTMENTS.
     * @param {DEPARTMENTSCreateArgs} args - Arguments to create a DEPARTMENTS.
     * @example
     * // Create one DEPARTMENTS
     * const DEPARTMENTS = await prisma.dEPARTMENTS.create({
     *   data: {
     *     // ... data to create a DEPARTMENTS
     *   }
     * })
     * 
     */
    create<T extends DEPARTMENTSCreateArgs>(args: SelectSubset<T, DEPARTMENTSCreateArgs<ExtArgs>>): Prisma__DEPARTMENTSClient<$Result.GetResult<Prisma.$DEPARTMENTSPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DEPARTMENTS.
     * @param {DEPARTMENTSCreateManyArgs} args - Arguments to create many DEPARTMENTS.
     * @example
     * // Create many DEPARTMENTS
     * const dEPARTMENTS = await prisma.dEPARTMENTS.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DEPARTMENTSCreateManyArgs>(args?: SelectSubset<T, DEPARTMENTSCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DEPARTMENTS and returns the data saved in the database.
     * @param {DEPARTMENTSCreateManyAndReturnArgs} args - Arguments to create many DEPARTMENTS.
     * @example
     * // Create many DEPARTMENTS
     * const dEPARTMENTS = await prisma.dEPARTMENTS.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DEPARTMENTS and only return the `id`
     * const dEPARTMENTSWithIdOnly = await prisma.dEPARTMENTS.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DEPARTMENTSCreateManyAndReturnArgs>(args?: SelectSubset<T, DEPARTMENTSCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DEPARTMENTSPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DEPARTMENTS.
     * @param {DEPARTMENTSDeleteArgs} args - Arguments to delete one DEPARTMENTS.
     * @example
     * // Delete one DEPARTMENTS
     * const DEPARTMENTS = await prisma.dEPARTMENTS.delete({
     *   where: {
     *     // ... filter to delete one DEPARTMENTS
     *   }
     * })
     * 
     */
    delete<T extends DEPARTMENTSDeleteArgs>(args: SelectSubset<T, DEPARTMENTSDeleteArgs<ExtArgs>>): Prisma__DEPARTMENTSClient<$Result.GetResult<Prisma.$DEPARTMENTSPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DEPARTMENTS.
     * @param {DEPARTMENTSUpdateArgs} args - Arguments to update one DEPARTMENTS.
     * @example
     * // Update one DEPARTMENTS
     * const dEPARTMENTS = await prisma.dEPARTMENTS.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DEPARTMENTSUpdateArgs>(args: SelectSubset<T, DEPARTMENTSUpdateArgs<ExtArgs>>): Prisma__DEPARTMENTSClient<$Result.GetResult<Prisma.$DEPARTMENTSPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DEPARTMENTS.
     * @param {DEPARTMENTSDeleteManyArgs} args - Arguments to filter DEPARTMENTS to delete.
     * @example
     * // Delete a few DEPARTMENTS
     * const { count } = await prisma.dEPARTMENTS.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DEPARTMENTSDeleteManyArgs>(args?: SelectSubset<T, DEPARTMENTSDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DEPARTMENTS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DEPARTMENTSUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DEPARTMENTS
     * const dEPARTMENTS = await prisma.dEPARTMENTS.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DEPARTMENTSUpdateManyArgs>(args: SelectSubset<T, DEPARTMENTSUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DEPARTMENTS.
     * @param {DEPARTMENTSUpsertArgs} args - Arguments to update or create a DEPARTMENTS.
     * @example
     * // Update or create a DEPARTMENTS
     * const dEPARTMENTS = await prisma.dEPARTMENTS.upsert({
     *   create: {
     *     // ... data to create a DEPARTMENTS
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DEPARTMENTS we want to update
     *   }
     * })
     */
    upsert<T extends DEPARTMENTSUpsertArgs>(args: SelectSubset<T, DEPARTMENTSUpsertArgs<ExtArgs>>): Prisma__DEPARTMENTSClient<$Result.GetResult<Prisma.$DEPARTMENTSPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DEPARTMENTS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DEPARTMENTSCountArgs} args - Arguments to filter DEPARTMENTS to count.
     * @example
     * // Count the number of DEPARTMENTS
     * const count = await prisma.dEPARTMENTS.count({
     *   where: {
     *     // ... the filter for the DEPARTMENTS we want to count
     *   }
     * })
    **/
    count<T extends DEPARTMENTSCountArgs>(
      args?: Subset<T, DEPARTMENTSCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DEPARTMENTSCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DEPARTMENTS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DEPARTMENTSAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DEPARTMENTSAggregateArgs>(args: Subset<T, DEPARTMENTSAggregateArgs>): Prisma.PrismaPromise<GetDEPARTMENTSAggregateType<T>>

    /**
     * Group by DEPARTMENTS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DEPARTMENTSGroupByArgs} args - Group by arguments.
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
      T extends DEPARTMENTSGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DEPARTMENTSGroupByArgs['orderBy'] }
        : { orderBy?: DEPARTMENTSGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DEPARTMENTSGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDEPARTMENTSGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DEPARTMENTS model
   */
  readonly fields: DEPARTMENTSFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DEPARTMENTS.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DEPARTMENTSClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roadmaps<T extends DEPARTMENTS$roadmapsArgs<ExtArgs> = {}>(args?: Subset<T, DEPARTMENTS$roadmapsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MAJOR_ROADMAPSPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the DEPARTMENTS model
   */ 
  interface DEPARTMENTSFieldRefs {
    readonly id: FieldRef<"DEPARTMENTS", 'Int'>
    readonly slug: FieldRef<"DEPARTMENTS", 'String'>
    readonly name: FieldRef<"DEPARTMENTS", 'String'>
    readonly description: FieldRef<"DEPARTMENTS", 'String'>
    readonly created_at: FieldRef<"DEPARTMENTS", 'DateTime'>
    readonly updated_at: FieldRef<"DEPARTMENTS", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DEPARTMENTS findUnique
   */
  export type DEPARTMENTSFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DEPARTMENTS
     */
    select?: DEPARTMENTSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DEPARTMENTSInclude<ExtArgs> | null
    /**
     * Filter, which DEPARTMENTS to fetch.
     */
    where: DEPARTMENTSWhereUniqueInput
  }

  /**
   * DEPARTMENTS findUniqueOrThrow
   */
  export type DEPARTMENTSFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DEPARTMENTS
     */
    select?: DEPARTMENTSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DEPARTMENTSInclude<ExtArgs> | null
    /**
     * Filter, which DEPARTMENTS to fetch.
     */
    where: DEPARTMENTSWhereUniqueInput
  }

  /**
   * DEPARTMENTS findFirst
   */
  export type DEPARTMENTSFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DEPARTMENTS
     */
    select?: DEPARTMENTSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DEPARTMENTSInclude<ExtArgs> | null
    /**
     * Filter, which DEPARTMENTS to fetch.
     */
    where?: DEPARTMENTSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DEPARTMENTS to fetch.
     */
    orderBy?: DEPARTMENTSOrderByWithRelationInput | DEPARTMENTSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DEPARTMENTS.
     */
    cursor?: DEPARTMENTSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DEPARTMENTS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DEPARTMENTS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DEPARTMENTS.
     */
    distinct?: DEPARTMENTSScalarFieldEnum | DEPARTMENTSScalarFieldEnum[]
  }

  /**
   * DEPARTMENTS findFirstOrThrow
   */
  export type DEPARTMENTSFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DEPARTMENTS
     */
    select?: DEPARTMENTSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DEPARTMENTSInclude<ExtArgs> | null
    /**
     * Filter, which DEPARTMENTS to fetch.
     */
    where?: DEPARTMENTSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DEPARTMENTS to fetch.
     */
    orderBy?: DEPARTMENTSOrderByWithRelationInput | DEPARTMENTSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DEPARTMENTS.
     */
    cursor?: DEPARTMENTSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DEPARTMENTS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DEPARTMENTS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DEPARTMENTS.
     */
    distinct?: DEPARTMENTSScalarFieldEnum | DEPARTMENTSScalarFieldEnum[]
  }

  /**
   * DEPARTMENTS findMany
   */
  export type DEPARTMENTSFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DEPARTMENTS
     */
    select?: DEPARTMENTSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DEPARTMENTSInclude<ExtArgs> | null
    /**
     * Filter, which DEPARTMENTS to fetch.
     */
    where?: DEPARTMENTSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DEPARTMENTS to fetch.
     */
    orderBy?: DEPARTMENTSOrderByWithRelationInput | DEPARTMENTSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DEPARTMENTS.
     */
    cursor?: DEPARTMENTSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DEPARTMENTS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DEPARTMENTS.
     */
    skip?: number
    distinct?: DEPARTMENTSScalarFieldEnum | DEPARTMENTSScalarFieldEnum[]
  }

  /**
   * DEPARTMENTS create
   */
  export type DEPARTMENTSCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DEPARTMENTS
     */
    select?: DEPARTMENTSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DEPARTMENTSInclude<ExtArgs> | null
    /**
     * The data needed to create a DEPARTMENTS.
     */
    data: XOR<DEPARTMENTSCreateInput, DEPARTMENTSUncheckedCreateInput>
  }

  /**
   * DEPARTMENTS createMany
   */
  export type DEPARTMENTSCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DEPARTMENTS.
     */
    data: DEPARTMENTSCreateManyInput | DEPARTMENTSCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DEPARTMENTS createManyAndReturn
   */
  export type DEPARTMENTSCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DEPARTMENTS
     */
    select?: DEPARTMENTSSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DEPARTMENTS.
     */
    data: DEPARTMENTSCreateManyInput | DEPARTMENTSCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DEPARTMENTS update
   */
  export type DEPARTMENTSUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DEPARTMENTS
     */
    select?: DEPARTMENTSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DEPARTMENTSInclude<ExtArgs> | null
    /**
     * The data needed to update a DEPARTMENTS.
     */
    data: XOR<DEPARTMENTSUpdateInput, DEPARTMENTSUncheckedUpdateInput>
    /**
     * Choose, which DEPARTMENTS to update.
     */
    where: DEPARTMENTSWhereUniqueInput
  }

  /**
   * DEPARTMENTS updateMany
   */
  export type DEPARTMENTSUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DEPARTMENTS.
     */
    data: XOR<DEPARTMENTSUpdateManyMutationInput, DEPARTMENTSUncheckedUpdateManyInput>
    /**
     * Filter which DEPARTMENTS to update
     */
    where?: DEPARTMENTSWhereInput
  }

  /**
   * DEPARTMENTS upsert
   */
  export type DEPARTMENTSUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DEPARTMENTS
     */
    select?: DEPARTMENTSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DEPARTMENTSInclude<ExtArgs> | null
    /**
     * The filter to search for the DEPARTMENTS to update in case it exists.
     */
    where: DEPARTMENTSWhereUniqueInput
    /**
     * In case the DEPARTMENTS found by the `where` argument doesn't exist, create a new DEPARTMENTS with this data.
     */
    create: XOR<DEPARTMENTSCreateInput, DEPARTMENTSUncheckedCreateInput>
    /**
     * In case the DEPARTMENTS was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DEPARTMENTSUpdateInput, DEPARTMENTSUncheckedUpdateInput>
  }

  /**
   * DEPARTMENTS delete
   */
  export type DEPARTMENTSDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DEPARTMENTS
     */
    select?: DEPARTMENTSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DEPARTMENTSInclude<ExtArgs> | null
    /**
     * Filter which DEPARTMENTS to delete.
     */
    where: DEPARTMENTSWhereUniqueInput
  }

  /**
   * DEPARTMENTS deleteMany
   */
  export type DEPARTMENTSDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DEPARTMENTS to delete
     */
    where?: DEPARTMENTSWhereInput
  }

  /**
   * DEPARTMENTS.roadmaps
   */
  export type DEPARTMENTS$roadmapsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MAJOR_ROADMAPS
     */
    select?: MAJOR_ROADMAPSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MAJOR_ROADMAPSInclude<ExtArgs> | null
    where?: MAJOR_ROADMAPSWhereInput
    orderBy?: MAJOR_ROADMAPSOrderByWithRelationInput | MAJOR_ROADMAPSOrderByWithRelationInput[]
    cursor?: MAJOR_ROADMAPSWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MAJOR_ROADMAPSScalarFieldEnum | MAJOR_ROADMAPSScalarFieldEnum[]
  }

  /**
   * DEPARTMENTS without action
   */
  export type DEPARTMENTSDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DEPARTMENTS
     */
    select?: DEPARTMENTSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DEPARTMENTSInclude<ExtArgs> | null
  }


  /**
   * Model MAJOR_ROADMAPS
   */

  export type AggregateMAJOR_ROADMAPS = {
    _count: MAJOR_ROADMAPSCountAggregateOutputType | null
    _avg: MAJOR_ROADMAPSAvgAggregateOutputType | null
    _sum: MAJOR_ROADMAPSSumAggregateOutputType | null
    _min: MAJOR_ROADMAPSMinAggregateOutputType | null
    _max: MAJOR_ROADMAPSMaxAggregateOutputType | null
  }

  export type MAJOR_ROADMAPSAvgAggregateOutputType = {
    id: number | null
    total_credits: number | null
    department_id: number | null
  }

  export type MAJOR_ROADMAPSSumAggregateOutputType = {
    id: number | null
    total_credits: number | null
    department_id: number | null
  }

  export type MAJOR_ROADMAPSMinAggregateOutputType = {
    id: number | null
    slug: string | null
    name: string | null
    total_credits: number | null
    description: string | null
    department_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type MAJOR_ROADMAPSMaxAggregateOutputType = {
    id: number | null
    slug: string | null
    name: string | null
    total_credits: number | null
    description: string | null
    department_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type MAJOR_ROADMAPSCountAggregateOutputType = {
    id: number
    slug: number
    name: number
    total_credits: number
    description: number
    department_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type MAJOR_ROADMAPSAvgAggregateInputType = {
    id?: true
    total_credits?: true
    department_id?: true
  }

  export type MAJOR_ROADMAPSSumAggregateInputType = {
    id?: true
    total_credits?: true
    department_id?: true
  }

  export type MAJOR_ROADMAPSMinAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    total_credits?: true
    description?: true
    department_id?: true
    created_at?: true
    updated_at?: true
  }

  export type MAJOR_ROADMAPSMaxAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    total_credits?: true
    description?: true
    department_id?: true
    created_at?: true
    updated_at?: true
  }

  export type MAJOR_ROADMAPSCountAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    total_credits?: true
    description?: true
    department_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type MAJOR_ROADMAPSAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MAJOR_ROADMAPS to aggregate.
     */
    where?: MAJOR_ROADMAPSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MAJOR_ROADMAPS to fetch.
     */
    orderBy?: MAJOR_ROADMAPSOrderByWithRelationInput | MAJOR_ROADMAPSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MAJOR_ROADMAPSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MAJOR_ROADMAPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MAJOR_ROADMAPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MAJOR_ROADMAPS
    **/
    _count?: true | MAJOR_ROADMAPSCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MAJOR_ROADMAPSAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MAJOR_ROADMAPSSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MAJOR_ROADMAPSMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MAJOR_ROADMAPSMaxAggregateInputType
  }

  export type GetMAJOR_ROADMAPSAggregateType<T extends MAJOR_ROADMAPSAggregateArgs> = {
        [P in keyof T & keyof AggregateMAJOR_ROADMAPS]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMAJOR_ROADMAPS[P]>
      : GetScalarType<T[P], AggregateMAJOR_ROADMAPS[P]>
  }




  export type MAJOR_ROADMAPSGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MAJOR_ROADMAPSWhereInput
    orderBy?: MAJOR_ROADMAPSOrderByWithAggregationInput | MAJOR_ROADMAPSOrderByWithAggregationInput[]
    by: MAJOR_ROADMAPSScalarFieldEnum[] | MAJOR_ROADMAPSScalarFieldEnum
    having?: MAJOR_ROADMAPSScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MAJOR_ROADMAPSCountAggregateInputType | true
    _avg?: MAJOR_ROADMAPSAvgAggregateInputType
    _sum?: MAJOR_ROADMAPSSumAggregateInputType
    _min?: MAJOR_ROADMAPSMinAggregateInputType
    _max?: MAJOR_ROADMAPSMaxAggregateInputType
  }

  export type MAJOR_ROADMAPSGroupByOutputType = {
    id: number
    slug: string
    name: string
    total_credits: number
    description: string | null
    department_id: number
    created_at: Date
    updated_at: Date
    _count: MAJOR_ROADMAPSCountAggregateOutputType | null
    _avg: MAJOR_ROADMAPSAvgAggregateOutputType | null
    _sum: MAJOR_ROADMAPSSumAggregateOutputType | null
    _min: MAJOR_ROADMAPSMinAggregateOutputType | null
    _max: MAJOR_ROADMAPSMaxAggregateOutputType | null
  }

  type GetMAJOR_ROADMAPSGroupByPayload<T extends MAJOR_ROADMAPSGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MAJOR_ROADMAPSGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MAJOR_ROADMAPSGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MAJOR_ROADMAPSGroupByOutputType[P]>
            : GetScalarType<T[P], MAJOR_ROADMAPSGroupByOutputType[P]>
        }
      >
    >


  export type MAJOR_ROADMAPSSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    total_credits?: boolean
    description?: boolean
    department_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    department?: boolean | DEPARTMENTSDefaultArgs<ExtArgs>
    courseNodes?: boolean | MAJOR_ROADMAPS$courseNodesArgs<ExtArgs>
    _count?: boolean | MAJOR_ROADMAPSCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mAJOR_ROADMAPS"]>

  export type MAJOR_ROADMAPSSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    total_credits?: boolean
    description?: boolean
    department_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    department?: boolean | DEPARTMENTSDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mAJOR_ROADMAPS"]>

  export type MAJOR_ROADMAPSSelectScalar = {
    id?: boolean
    slug?: boolean
    name?: boolean
    total_credits?: boolean
    description?: boolean
    department_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type MAJOR_ROADMAPSInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | DEPARTMENTSDefaultArgs<ExtArgs>
    courseNodes?: boolean | MAJOR_ROADMAPS$courseNodesArgs<ExtArgs>
    _count?: boolean | MAJOR_ROADMAPSCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MAJOR_ROADMAPSIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | DEPARTMENTSDefaultArgs<ExtArgs>
  }

  export type $MAJOR_ROADMAPSPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MAJOR_ROADMAPS"
    objects: {
      department: Prisma.$DEPARTMENTSPayload<ExtArgs>
      courseNodes: Prisma.$COURSE_NODESPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      slug: string
      name: string
      total_credits: number
      description: string | null
      department_id: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["mAJOR_ROADMAPS"]>
    composites: {}
  }

  type MAJOR_ROADMAPSGetPayload<S extends boolean | null | undefined | MAJOR_ROADMAPSDefaultArgs> = $Result.GetResult<Prisma.$MAJOR_ROADMAPSPayload, S>

  type MAJOR_ROADMAPSCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MAJOR_ROADMAPSFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MAJOR_ROADMAPSCountAggregateInputType | true
    }

  export interface MAJOR_ROADMAPSDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MAJOR_ROADMAPS'], meta: { name: 'MAJOR_ROADMAPS' } }
    /**
     * Find zero or one MAJOR_ROADMAPS that matches the filter.
     * @param {MAJOR_ROADMAPSFindUniqueArgs} args - Arguments to find a MAJOR_ROADMAPS
     * @example
     * // Get one MAJOR_ROADMAPS
     * const mAJOR_ROADMAPS = await prisma.mAJOR_ROADMAPS.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MAJOR_ROADMAPSFindUniqueArgs>(args: SelectSubset<T, MAJOR_ROADMAPSFindUniqueArgs<ExtArgs>>): Prisma__MAJOR_ROADMAPSClient<$Result.GetResult<Prisma.$MAJOR_ROADMAPSPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MAJOR_ROADMAPS that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MAJOR_ROADMAPSFindUniqueOrThrowArgs} args - Arguments to find a MAJOR_ROADMAPS
     * @example
     * // Get one MAJOR_ROADMAPS
     * const mAJOR_ROADMAPS = await prisma.mAJOR_ROADMAPS.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MAJOR_ROADMAPSFindUniqueOrThrowArgs>(args: SelectSubset<T, MAJOR_ROADMAPSFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MAJOR_ROADMAPSClient<$Result.GetResult<Prisma.$MAJOR_ROADMAPSPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MAJOR_ROADMAPS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MAJOR_ROADMAPSFindFirstArgs} args - Arguments to find a MAJOR_ROADMAPS
     * @example
     * // Get one MAJOR_ROADMAPS
     * const mAJOR_ROADMAPS = await prisma.mAJOR_ROADMAPS.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MAJOR_ROADMAPSFindFirstArgs>(args?: SelectSubset<T, MAJOR_ROADMAPSFindFirstArgs<ExtArgs>>): Prisma__MAJOR_ROADMAPSClient<$Result.GetResult<Prisma.$MAJOR_ROADMAPSPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MAJOR_ROADMAPS that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MAJOR_ROADMAPSFindFirstOrThrowArgs} args - Arguments to find a MAJOR_ROADMAPS
     * @example
     * // Get one MAJOR_ROADMAPS
     * const mAJOR_ROADMAPS = await prisma.mAJOR_ROADMAPS.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MAJOR_ROADMAPSFindFirstOrThrowArgs>(args?: SelectSubset<T, MAJOR_ROADMAPSFindFirstOrThrowArgs<ExtArgs>>): Prisma__MAJOR_ROADMAPSClient<$Result.GetResult<Prisma.$MAJOR_ROADMAPSPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MAJOR_ROADMAPS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MAJOR_ROADMAPSFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MAJOR_ROADMAPS
     * const mAJOR_ROADMAPS = await prisma.mAJOR_ROADMAPS.findMany()
     * 
     * // Get first 10 MAJOR_ROADMAPS
     * const mAJOR_ROADMAPS = await prisma.mAJOR_ROADMAPS.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mAJOR_ROADMAPSWithIdOnly = await prisma.mAJOR_ROADMAPS.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MAJOR_ROADMAPSFindManyArgs>(args?: SelectSubset<T, MAJOR_ROADMAPSFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MAJOR_ROADMAPSPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MAJOR_ROADMAPS.
     * @param {MAJOR_ROADMAPSCreateArgs} args - Arguments to create a MAJOR_ROADMAPS.
     * @example
     * // Create one MAJOR_ROADMAPS
     * const MAJOR_ROADMAPS = await prisma.mAJOR_ROADMAPS.create({
     *   data: {
     *     // ... data to create a MAJOR_ROADMAPS
     *   }
     * })
     * 
     */
    create<T extends MAJOR_ROADMAPSCreateArgs>(args: SelectSubset<T, MAJOR_ROADMAPSCreateArgs<ExtArgs>>): Prisma__MAJOR_ROADMAPSClient<$Result.GetResult<Prisma.$MAJOR_ROADMAPSPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MAJOR_ROADMAPS.
     * @param {MAJOR_ROADMAPSCreateManyArgs} args - Arguments to create many MAJOR_ROADMAPS.
     * @example
     * // Create many MAJOR_ROADMAPS
     * const mAJOR_ROADMAPS = await prisma.mAJOR_ROADMAPS.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MAJOR_ROADMAPSCreateManyArgs>(args?: SelectSubset<T, MAJOR_ROADMAPSCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MAJOR_ROADMAPS and returns the data saved in the database.
     * @param {MAJOR_ROADMAPSCreateManyAndReturnArgs} args - Arguments to create many MAJOR_ROADMAPS.
     * @example
     * // Create many MAJOR_ROADMAPS
     * const mAJOR_ROADMAPS = await prisma.mAJOR_ROADMAPS.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MAJOR_ROADMAPS and only return the `id`
     * const mAJOR_ROADMAPSWithIdOnly = await prisma.mAJOR_ROADMAPS.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MAJOR_ROADMAPSCreateManyAndReturnArgs>(args?: SelectSubset<T, MAJOR_ROADMAPSCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MAJOR_ROADMAPSPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MAJOR_ROADMAPS.
     * @param {MAJOR_ROADMAPSDeleteArgs} args - Arguments to delete one MAJOR_ROADMAPS.
     * @example
     * // Delete one MAJOR_ROADMAPS
     * const MAJOR_ROADMAPS = await prisma.mAJOR_ROADMAPS.delete({
     *   where: {
     *     // ... filter to delete one MAJOR_ROADMAPS
     *   }
     * })
     * 
     */
    delete<T extends MAJOR_ROADMAPSDeleteArgs>(args: SelectSubset<T, MAJOR_ROADMAPSDeleteArgs<ExtArgs>>): Prisma__MAJOR_ROADMAPSClient<$Result.GetResult<Prisma.$MAJOR_ROADMAPSPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MAJOR_ROADMAPS.
     * @param {MAJOR_ROADMAPSUpdateArgs} args - Arguments to update one MAJOR_ROADMAPS.
     * @example
     * // Update one MAJOR_ROADMAPS
     * const mAJOR_ROADMAPS = await prisma.mAJOR_ROADMAPS.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MAJOR_ROADMAPSUpdateArgs>(args: SelectSubset<T, MAJOR_ROADMAPSUpdateArgs<ExtArgs>>): Prisma__MAJOR_ROADMAPSClient<$Result.GetResult<Prisma.$MAJOR_ROADMAPSPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MAJOR_ROADMAPS.
     * @param {MAJOR_ROADMAPSDeleteManyArgs} args - Arguments to filter MAJOR_ROADMAPS to delete.
     * @example
     * // Delete a few MAJOR_ROADMAPS
     * const { count } = await prisma.mAJOR_ROADMAPS.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MAJOR_ROADMAPSDeleteManyArgs>(args?: SelectSubset<T, MAJOR_ROADMAPSDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MAJOR_ROADMAPS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MAJOR_ROADMAPSUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MAJOR_ROADMAPS
     * const mAJOR_ROADMAPS = await prisma.mAJOR_ROADMAPS.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MAJOR_ROADMAPSUpdateManyArgs>(args: SelectSubset<T, MAJOR_ROADMAPSUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MAJOR_ROADMAPS.
     * @param {MAJOR_ROADMAPSUpsertArgs} args - Arguments to update or create a MAJOR_ROADMAPS.
     * @example
     * // Update or create a MAJOR_ROADMAPS
     * const mAJOR_ROADMAPS = await prisma.mAJOR_ROADMAPS.upsert({
     *   create: {
     *     // ... data to create a MAJOR_ROADMAPS
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MAJOR_ROADMAPS we want to update
     *   }
     * })
     */
    upsert<T extends MAJOR_ROADMAPSUpsertArgs>(args: SelectSubset<T, MAJOR_ROADMAPSUpsertArgs<ExtArgs>>): Prisma__MAJOR_ROADMAPSClient<$Result.GetResult<Prisma.$MAJOR_ROADMAPSPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MAJOR_ROADMAPS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MAJOR_ROADMAPSCountArgs} args - Arguments to filter MAJOR_ROADMAPS to count.
     * @example
     * // Count the number of MAJOR_ROADMAPS
     * const count = await prisma.mAJOR_ROADMAPS.count({
     *   where: {
     *     // ... the filter for the MAJOR_ROADMAPS we want to count
     *   }
     * })
    **/
    count<T extends MAJOR_ROADMAPSCountArgs>(
      args?: Subset<T, MAJOR_ROADMAPSCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MAJOR_ROADMAPSCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MAJOR_ROADMAPS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MAJOR_ROADMAPSAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MAJOR_ROADMAPSAggregateArgs>(args: Subset<T, MAJOR_ROADMAPSAggregateArgs>): Prisma.PrismaPromise<GetMAJOR_ROADMAPSAggregateType<T>>

    /**
     * Group by MAJOR_ROADMAPS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MAJOR_ROADMAPSGroupByArgs} args - Group by arguments.
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
      T extends MAJOR_ROADMAPSGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MAJOR_ROADMAPSGroupByArgs['orderBy'] }
        : { orderBy?: MAJOR_ROADMAPSGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MAJOR_ROADMAPSGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMAJOR_ROADMAPSGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MAJOR_ROADMAPS model
   */
  readonly fields: MAJOR_ROADMAPSFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MAJOR_ROADMAPS.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MAJOR_ROADMAPSClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    department<T extends DEPARTMENTSDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DEPARTMENTSDefaultArgs<ExtArgs>>): Prisma__DEPARTMENTSClient<$Result.GetResult<Prisma.$DEPARTMENTSPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    courseNodes<T extends MAJOR_ROADMAPS$courseNodesArgs<ExtArgs> = {}>(args?: Subset<T, MAJOR_ROADMAPS$courseNodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$COURSE_NODESPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the MAJOR_ROADMAPS model
   */ 
  interface MAJOR_ROADMAPSFieldRefs {
    readonly id: FieldRef<"MAJOR_ROADMAPS", 'Int'>
    readonly slug: FieldRef<"MAJOR_ROADMAPS", 'String'>
    readonly name: FieldRef<"MAJOR_ROADMAPS", 'String'>
    readonly total_credits: FieldRef<"MAJOR_ROADMAPS", 'Int'>
    readonly description: FieldRef<"MAJOR_ROADMAPS", 'String'>
    readonly department_id: FieldRef<"MAJOR_ROADMAPS", 'Int'>
    readonly created_at: FieldRef<"MAJOR_ROADMAPS", 'DateTime'>
    readonly updated_at: FieldRef<"MAJOR_ROADMAPS", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MAJOR_ROADMAPS findUnique
   */
  export type MAJOR_ROADMAPSFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MAJOR_ROADMAPS
     */
    select?: MAJOR_ROADMAPSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MAJOR_ROADMAPSInclude<ExtArgs> | null
    /**
     * Filter, which MAJOR_ROADMAPS to fetch.
     */
    where: MAJOR_ROADMAPSWhereUniqueInput
  }

  /**
   * MAJOR_ROADMAPS findUniqueOrThrow
   */
  export type MAJOR_ROADMAPSFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MAJOR_ROADMAPS
     */
    select?: MAJOR_ROADMAPSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MAJOR_ROADMAPSInclude<ExtArgs> | null
    /**
     * Filter, which MAJOR_ROADMAPS to fetch.
     */
    where: MAJOR_ROADMAPSWhereUniqueInput
  }

  /**
   * MAJOR_ROADMAPS findFirst
   */
  export type MAJOR_ROADMAPSFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MAJOR_ROADMAPS
     */
    select?: MAJOR_ROADMAPSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MAJOR_ROADMAPSInclude<ExtArgs> | null
    /**
     * Filter, which MAJOR_ROADMAPS to fetch.
     */
    where?: MAJOR_ROADMAPSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MAJOR_ROADMAPS to fetch.
     */
    orderBy?: MAJOR_ROADMAPSOrderByWithRelationInput | MAJOR_ROADMAPSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MAJOR_ROADMAPS.
     */
    cursor?: MAJOR_ROADMAPSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MAJOR_ROADMAPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MAJOR_ROADMAPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MAJOR_ROADMAPS.
     */
    distinct?: MAJOR_ROADMAPSScalarFieldEnum | MAJOR_ROADMAPSScalarFieldEnum[]
  }

  /**
   * MAJOR_ROADMAPS findFirstOrThrow
   */
  export type MAJOR_ROADMAPSFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MAJOR_ROADMAPS
     */
    select?: MAJOR_ROADMAPSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MAJOR_ROADMAPSInclude<ExtArgs> | null
    /**
     * Filter, which MAJOR_ROADMAPS to fetch.
     */
    where?: MAJOR_ROADMAPSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MAJOR_ROADMAPS to fetch.
     */
    orderBy?: MAJOR_ROADMAPSOrderByWithRelationInput | MAJOR_ROADMAPSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MAJOR_ROADMAPS.
     */
    cursor?: MAJOR_ROADMAPSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MAJOR_ROADMAPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MAJOR_ROADMAPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MAJOR_ROADMAPS.
     */
    distinct?: MAJOR_ROADMAPSScalarFieldEnum | MAJOR_ROADMAPSScalarFieldEnum[]
  }

  /**
   * MAJOR_ROADMAPS findMany
   */
  export type MAJOR_ROADMAPSFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MAJOR_ROADMAPS
     */
    select?: MAJOR_ROADMAPSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MAJOR_ROADMAPSInclude<ExtArgs> | null
    /**
     * Filter, which MAJOR_ROADMAPS to fetch.
     */
    where?: MAJOR_ROADMAPSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MAJOR_ROADMAPS to fetch.
     */
    orderBy?: MAJOR_ROADMAPSOrderByWithRelationInput | MAJOR_ROADMAPSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MAJOR_ROADMAPS.
     */
    cursor?: MAJOR_ROADMAPSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MAJOR_ROADMAPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MAJOR_ROADMAPS.
     */
    skip?: number
    distinct?: MAJOR_ROADMAPSScalarFieldEnum | MAJOR_ROADMAPSScalarFieldEnum[]
  }

  /**
   * MAJOR_ROADMAPS create
   */
  export type MAJOR_ROADMAPSCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MAJOR_ROADMAPS
     */
    select?: MAJOR_ROADMAPSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MAJOR_ROADMAPSInclude<ExtArgs> | null
    /**
     * The data needed to create a MAJOR_ROADMAPS.
     */
    data: XOR<MAJOR_ROADMAPSCreateInput, MAJOR_ROADMAPSUncheckedCreateInput>
  }

  /**
   * MAJOR_ROADMAPS createMany
   */
  export type MAJOR_ROADMAPSCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MAJOR_ROADMAPS.
     */
    data: MAJOR_ROADMAPSCreateManyInput | MAJOR_ROADMAPSCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MAJOR_ROADMAPS createManyAndReturn
   */
  export type MAJOR_ROADMAPSCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MAJOR_ROADMAPS
     */
    select?: MAJOR_ROADMAPSSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MAJOR_ROADMAPS.
     */
    data: MAJOR_ROADMAPSCreateManyInput | MAJOR_ROADMAPSCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MAJOR_ROADMAPSIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MAJOR_ROADMAPS update
   */
  export type MAJOR_ROADMAPSUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MAJOR_ROADMAPS
     */
    select?: MAJOR_ROADMAPSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MAJOR_ROADMAPSInclude<ExtArgs> | null
    /**
     * The data needed to update a MAJOR_ROADMAPS.
     */
    data: XOR<MAJOR_ROADMAPSUpdateInput, MAJOR_ROADMAPSUncheckedUpdateInput>
    /**
     * Choose, which MAJOR_ROADMAPS to update.
     */
    where: MAJOR_ROADMAPSWhereUniqueInput
  }

  /**
   * MAJOR_ROADMAPS updateMany
   */
  export type MAJOR_ROADMAPSUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MAJOR_ROADMAPS.
     */
    data: XOR<MAJOR_ROADMAPSUpdateManyMutationInput, MAJOR_ROADMAPSUncheckedUpdateManyInput>
    /**
     * Filter which MAJOR_ROADMAPS to update
     */
    where?: MAJOR_ROADMAPSWhereInput
  }

  /**
   * MAJOR_ROADMAPS upsert
   */
  export type MAJOR_ROADMAPSUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MAJOR_ROADMAPS
     */
    select?: MAJOR_ROADMAPSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MAJOR_ROADMAPSInclude<ExtArgs> | null
    /**
     * The filter to search for the MAJOR_ROADMAPS to update in case it exists.
     */
    where: MAJOR_ROADMAPSWhereUniqueInput
    /**
     * In case the MAJOR_ROADMAPS found by the `where` argument doesn't exist, create a new MAJOR_ROADMAPS with this data.
     */
    create: XOR<MAJOR_ROADMAPSCreateInput, MAJOR_ROADMAPSUncheckedCreateInput>
    /**
     * In case the MAJOR_ROADMAPS was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MAJOR_ROADMAPSUpdateInput, MAJOR_ROADMAPSUncheckedUpdateInput>
  }

  /**
   * MAJOR_ROADMAPS delete
   */
  export type MAJOR_ROADMAPSDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MAJOR_ROADMAPS
     */
    select?: MAJOR_ROADMAPSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MAJOR_ROADMAPSInclude<ExtArgs> | null
    /**
     * Filter which MAJOR_ROADMAPS to delete.
     */
    where: MAJOR_ROADMAPSWhereUniqueInput
  }

  /**
   * MAJOR_ROADMAPS deleteMany
   */
  export type MAJOR_ROADMAPSDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MAJOR_ROADMAPS to delete
     */
    where?: MAJOR_ROADMAPSWhereInput
  }

  /**
   * MAJOR_ROADMAPS.courseNodes
   */
  export type MAJOR_ROADMAPS$courseNodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODES
     */
    select?: COURSE_NODESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODESInclude<ExtArgs> | null
    where?: COURSE_NODESWhereInput
    orderBy?: COURSE_NODESOrderByWithRelationInput | COURSE_NODESOrderByWithRelationInput[]
    cursor?: COURSE_NODESWhereUniqueInput
    take?: number
    skip?: number
    distinct?: COURSE_NODESScalarFieldEnum | COURSE_NODESScalarFieldEnum[]
  }

  /**
   * MAJOR_ROADMAPS without action
   */
  export type MAJOR_ROADMAPSDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MAJOR_ROADMAPS
     */
    select?: MAJOR_ROADMAPSSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MAJOR_ROADMAPSInclude<ExtArgs> | null
  }


  /**
   * Model COURSE_NODES
   */

  export type AggregateCOURSE_NODES = {
    _count: COURSE_NODESCountAggregateOutputType | null
    _avg: COURSE_NODESAvgAggregateOutputType | null
    _sum: COURSE_NODESSumAggregateOutputType | null
    _min: COURSE_NODESMinAggregateOutputType | null
    _max: COURSE_NODESMaxAggregateOutputType | null
  }

  export type COURSE_NODESAvgAggregateOutputType = {
    id: number | null
    roadmap_id: number | null
    credits: number | null
  }

  export type COURSE_NODESSumAggregateOutputType = {
    id: number | null
    roadmap_id: number | null
    credits: number | null
  }

  export type COURSE_NODESMinAggregateOutputType = {
    id: number | null
    roadmap_id: number | null
    slug: string | null
    name: string | null
    credits: number | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type COURSE_NODESMaxAggregateOutputType = {
    id: number | null
    roadmap_id: number | null
    slug: string | null
    name: string | null
    credits: number | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type COURSE_NODESCountAggregateOutputType = {
    id: number
    roadmap_id: number
    slug: number
    name: number
    coords: number
    credits: number
    description: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type COURSE_NODESAvgAggregateInputType = {
    id?: true
    roadmap_id?: true
    credits?: true
  }

  export type COURSE_NODESSumAggregateInputType = {
    id?: true
    roadmap_id?: true
    credits?: true
  }

  export type COURSE_NODESMinAggregateInputType = {
    id?: true
    roadmap_id?: true
    slug?: true
    name?: true
    credits?: true
    description?: true
    created_at?: true
    updated_at?: true
  }

  export type COURSE_NODESMaxAggregateInputType = {
    id?: true
    roadmap_id?: true
    slug?: true
    name?: true
    credits?: true
    description?: true
    created_at?: true
    updated_at?: true
  }

  export type COURSE_NODESCountAggregateInputType = {
    id?: true
    roadmap_id?: true
    slug?: true
    name?: true
    coords?: true
    credits?: true
    description?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type COURSE_NODESAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which COURSE_NODES to aggregate.
     */
    where?: COURSE_NODESWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of COURSE_NODES to fetch.
     */
    orderBy?: COURSE_NODESOrderByWithRelationInput | COURSE_NODESOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: COURSE_NODESWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` COURSE_NODES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` COURSE_NODES.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned COURSE_NODES
    **/
    _count?: true | COURSE_NODESCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: COURSE_NODESAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: COURSE_NODESSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: COURSE_NODESMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: COURSE_NODESMaxAggregateInputType
  }

  export type GetCOURSE_NODESAggregateType<T extends COURSE_NODESAggregateArgs> = {
        [P in keyof T & keyof AggregateCOURSE_NODES]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCOURSE_NODES[P]>
      : GetScalarType<T[P], AggregateCOURSE_NODES[P]>
  }




  export type COURSE_NODESGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: COURSE_NODESWhereInput
    orderBy?: COURSE_NODESOrderByWithAggregationInput | COURSE_NODESOrderByWithAggregationInput[]
    by: COURSE_NODESScalarFieldEnum[] | COURSE_NODESScalarFieldEnum
    having?: COURSE_NODESScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: COURSE_NODESCountAggregateInputType | true
    _avg?: COURSE_NODESAvgAggregateInputType
    _sum?: COURSE_NODESSumAggregateInputType
    _min?: COURSE_NODESMinAggregateInputType
    _max?: COURSE_NODESMaxAggregateInputType
  }

  export type COURSE_NODESGroupByOutputType = {
    id: number
    roadmap_id: number
    slug: string
    name: string
    coords: JsonValue | null
    credits: number
    description: string | null
    created_at: Date
    updated_at: Date
    _count: COURSE_NODESCountAggregateOutputType | null
    _avg: COURSE_NODESAvgAggregateOutputType | null
    _sum: COURSE_NODESSumAggregateOutputType | null
    _min: COURSE_NODESMinAggregateOutputType | null
    _max: COURSE_NODESMaxAggregateOutputType | null
  }

  type GetCOURSE_NODESGroupByPayload<T extends COURSE_NODESGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<COURSE_NODESGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof COURSE_NODESGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], COURSE_NODESGroupByOutputType[P]>
            : GetScalarType<T[P], COURSE_NODESGroupByOutputType[P]>
        }
      >
    >


  export type COURSE_NODESSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roadmap_id?: boolean
    slug?: boolean
    name?: boolean
    coords?: boolean
    credits?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    roadmap?: boolean | MAJOR_ROADMAPSDefaultArgs<ExtArgs>
    courseTopics?: boolean | COURSE_NODES$courseTopicsArgs<ExtArgs>
    prerequisitesAsSource?: boolean | COURSE_NODES$prerequisitesAsSourceArgs<ExtArgs>
    prerequisitesAsTarget?: boolean | COURSE_NODES$prerequisitesAsTargetArgs<ExtArgs>
    _count?: boolean | COURSE_NODESCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cOURSE_NODES"]>

  export type COURSE_NODESSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roadmap_id?: boolean
    slug?: boolean
    name?: boolean
    coords?: boolean
    credits?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    roadmap?: boolean | MAJOR_ROADMAPSDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cOURSE_NODES"]>

  export type COURSE_NODESSelectScalar = {
    id?: boolean
    roadmap_id?: boolean
    slug?: boolean
    name?: boolean
    coords?: boolean
    credits?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type COURSE_NODESInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roadmap?: boolean | MAJOR_ROADMAPSDefaultArgs<ExtArgs>
    courseTopics?: boolean | COURSE_NODES$courseTopicsArgs<ExtArgs>
    prerequisitesAsSource?: boolean | COURSE_NODES$prerequisitesAsSourceArgs<ExtArgs>
    prerequisitesAsTarget?: boolean | COURSE_NODES$prerequisitesAsTargetArgs<ExtArgs>
    _count?: boolean | COURSE_NODESCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type COURSE_NODESIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roadmap?: boolean | MAJOR_ROADMAPSDefaultArgs<ExtArgs>
  }

  export type $COURSE_NODESPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "COURSE_NODES"
    objects: {
      roadmap: Prisma.$MAJOR_ROADMAPSPayload<ExtArgs>
      courseTopics: Prisma.$COURSE_TOPICS_NODEPayload<ExtArgs>[]
      prerequisitesAsSource: Prisma.$COURSE_NODE_PREREQUISITESPayload<ExtArgs>[]
      prerequisitesAsTarget: Prisma.$COURSE_NODE_PREREQUISITESPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      roadmap_id: number
      slug: string
      name: string
      coords: Prisma.JsonValue | null
      credits: number
      description: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["cOURSE_NODES"]>
    composites: {}
  }

  type COURSE_NODESGetPayload<S extends boolean | null | undefined | COURSE_NODESDefaultArgs> = $Result.GetResult<Prisma.$COURSE_NODESPayload, S>

  type COURSE_NODESCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<COURSE_NODESFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: COURSE_NODESCountAggregateInputType | true
    }

  export interface COURSE_NODESDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['COURSE_NODES'], meta: { name: 'COURSE_NODES' } }
    /**
     * Find zero or one COURSE_NODES that matches the filter.
     * @param {COURSE_NODESFindUniqueArgs} args - Arguments to find a COURSE_NODES
     * @example
     * // Get one COURSE_NODES
     * const cOURSE_NODES = await prisma.cOURSE_NODES.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends COURSE_NODESFindUniqueArgs>(args: SelectSubset<T, COURSE_NODESFindUniqueArgs<ExtArgs>>): Prisma__COURSE_NODESClient<$Result.GetResult<Prisma.$COURSE_NODESPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one COURSE_NODES that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {COURSE_NODESFindUniqueOrThrowArgs} args - Arguments to find a COURSE_NODES
     * @example
     * // Get one COURSE_NODES
     * const cOURSE_NODES = await prisma.cOURSE_NODES.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends COURSE_NODESFindUniqueOrThrowArgs>(args: SelectSubset<T, COURSE_NODESFindUniqueOrThrowArgs<ExtArgs>>): Prisma__COURSE_NODESClient<$Result.GetResult<Prisma.$COURSE_NODESPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first COURSE_NODES that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_NODESFindFirstArgs} args - Arguments to find a COURSE_NODES
     * @example
     * // Get one COURSE_NODES
     * const cOURSE_NODES = await prisma.cOURSE_NODES.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends COURSE_NODESFindFirstArgs>(args?: SelectSubset<T, COURSE_NODESFindFirstArgs<ExtArgs>>): Prisma__COURSE_NODESClient<$Result.GetResult<Prisma.$COURSE_NODESPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first COURSE_NODES that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_NODESFindFirstOrThrowArgs} args - Arguments to find a COURSE_NODES
     * @example
     * // Get one COURSE_NODES
     * const cOURSE_NODES = await prisma.cOURSE_NODES.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends COURSE_NODESFindFirstOrThrowArgs>(args?: SelectSubset<T, COURSE_NODESFindFirstOrThrowArgs<ExtArgs>>): Prisma__COURSE_NODESClient<$Result.GetResult<Prisma.$COURSE_NODESPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more COURSE_NODES that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_NODESFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all COURSE_NODES
     * const cOURSE_NODES = await prisma.cOURSE_NODES.findMany()
     * 
     * // Get first 10 COURSE_NODES
     * const cOURSE_NODES = await prisma.cOURSE_NODES.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cOURSE_NODESWithIdOnly = await prisma.cOURSE_NODES.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends COURSE_NODESFindManyArgs>(args?: SelectSubset<T, COURSE_NODESFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$COURSE_NODESPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a COURSE_NODES.
     * @param {COURSE_NODESCreateArgs} args - Arguments to create a COURSE_NODES.
     * @example
     * // Create one COURSE_NODES
     * const COURSE_NODES = await prisma.cOURSE_NODES.create({
     *   data: {
     *     // ... data to create a COURSE_NODES
     *   }
     * })
     * 
     */
    create<T extends COURSE_NODESCreateArgs>(args: SelectSubset<T, COURSE_NODESCreateArgs<ExtArgs>>): Prisma__COURSE_NODESClient<$Result.GetResult<Prisma.$COURSE_NODESPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many COURSE_NODES.
     * @param {COURSE_NODESCreateManyArgs} args - Arguments to create many COURSE_NODES.
     * @example
     * // Create many COURSE_NODES
     * const cOURSE_NODES = await prisma.cOURSE_NODES.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends COURSE_NODESCreateManyArgs>(args?: SelectSubset<T, COURSE_NODESCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many COURSE_NODES and returns the data saved in the database.
     * @param {COURSE_NODESCreateManyAndReturnArgs} args - Arguments to create many COURSE_NODES.
     * @example
     * // Create many COURSE_NODES
     * const cOURSE_NODES = await prisma.cOURSE_NODES.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many COURSE_NODES and only return the `id`
     * const cOURSE_NODESWithIdOnly = await prisma.cOURSE_NODES.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends COURSE_NODESCreateManyAndReturnArgs>(args?: SelectSubset<T, COURSE_NODESCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$COURSE_NODESPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a COURSE_NODES.
     * @param {COURSE_NODESDeleteArgs} args - Arguments to delete one COURSE_NODES.
     * @example
     * // Delete one COURSE_NODES
     * const COURSE_NODES = await prisma.cOURSE_NODES.delete({
     *   where: {
     *     // ... filter to delete one COURSE_NODES
     *   }
     * })
     * 
     */
    delete<T extends COURSE_NODESDeleteArgs>(args: SelectSubset<T, COURSE_NODESDeleteArgs<ExtArgs>>): Prisma__COURSE_NODESClient<$Result.GetResult<Prisma.$COURSE_NODESPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one COURSE_NODES.
     * @param {COURSE_NODESUpdateArgs} args - Arguments to update one COURSE_NODES.
     * @example
     * // Update one COURSE_NODES
     * const cOURSE_NODES = await prisma.cOURSE_NODES.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends COURSE_NODESUpdateArgs>(args: SelectSubset<T, COURSE_NODESUpdateArgs<ExtArgs>>): Prisma__COURSE_NODESClient<$Result.GetResult<Prisma.$COURSE_NODESPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more COURSE_NODES.
     * @param {COURSE_NODESDeleteManyArgs} args - Arguments to filter COURSE_NODES to delete.
     * @example
     * // Delete a few COURSE_NODES
     * const { count } = await prisma.cOURSE_NODES.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends COURSE_NODESDeleteManyArgs>(args?: SelectSubset<T, COURSE_NODESDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more COURSE_NODES.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_NODESUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many COURSE_NODES
     * const cOURSE_NODES = await prisma.cOURSE_NODES.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends COURSE_NODESUpdateManyArgs>(args: SelectSubset<T, COURSE_NODESUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one COURSE_NODES.
     * @param {COURSE_NODESUpsertArgs} args - Arguments to update or create a COURSE_NODES.
     * @example
     * // Update or create a COURSE_NODES
     * const cOURSE_NODES = await prisma.cOURSE_NODES.upsert({
     *   create: {
     *     // ... data to create a COURSE_NODES
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the COURSE_NODES we want to update
     *   }
     * })
     */
    upsert<T extends COURSE_NODESUpsertArgs>(args: SelectSubset<T, COURSE_NODESUpsertArgs<ExtArgs>>): Prisma__COURSE_NODESClient<$Result.GetResult<Prisma.$COURSE_NODESPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of COURSE_NODES.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_NODESCountArgs} args - Arguments to filter COURSE_NODES to count.
     * @example
     * // Count the number of COURSE_NODES
     * const count = await prisma.cOURSE_NODES.count({
     *   where: {
     *     // ... the filter for the COURSE_NODES we want to count
     *   }
     * })
    **/
    count<T extends COURSE_NODESCountArgs>(
      args?: Subset<T, COURSE_NODESCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], COURSE_NODESCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a COURSE_NODES.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_NODESAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends COURSE_NODESAggregateArgs>(args: Subset<T, COURSE_NODESAggregateArgs>): Prisma.PrismaPromise<GetCOURSE_NODESAggregateType<T>>

    /**
     * Group by COURSE_NODES.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_NODESGroupByArgs} args - Group by arguments.
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
      T extends COURSE_NODESGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: COURSE_NODESGroupByArgs['orderBy'] }
        : { orderBy?: COURSE_NODESGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, COURSE_NODESGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCOURSE_NODESGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the COURSE_NODES model
   */
  readonly fields: COURSE_NODESFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for COURSE_NODES.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__COURSE_NODESClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roadmap<T extends MAJOR_ROADMAPSDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MAJOR_ROADMAPSDefaultArgs<ExtArgs>>): Prisma__MAJOR_ROADMAPSClient<$Result.GetResult<Prisma.$MAJOR_ROADMAPSPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    courseTopics<T extends COURSE_NODES$courseTopicsArgs<ExtArgs> = {}>(args?: Subset<T, COURSE_NODES$courseTopicsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$COURSE_TOPICS_NODEPayload<ExtArgs>, T, "findMany"> | Null>
    prerequisitesAsSource<T extends COURSE_NODES$prerequisitesAsSourceArgs<ExtArgs> = {}>(args?: Subset<T, COURSE_NODES$prerequisitesAsSourceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$COURSE_NODE_PREREQUISITESPayload<ExtArgs>, T, "findMany"> | Null>
    prerequisitesAsTarget<T extends COURSE_NODES$prerequisitesAsTargetArgs<ExtArgs> = {}>(args?: Subset<T, COURSE_NODES$prerequisitesAsTargetArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$COURSE_NODE_PREREQUISITESPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the COURSE_NODES model
   */ 
  interface COURSE_NODESFieldRefs {
    readonly id: FieldRef<"COURSE_NODES", 'Int'>
    readonly roadmap_id: FieldRef<"COURSE_NODES", 'Int'>
    readonly slug: FieldRef<"COURSE_NODES", 'String'>
    readonly name: FieldRef<"COURSE_NODES", 'String'>
    readonly coords: FieldRef<"COURSE_NODES", 'Json'>
    readonly credits: FieldRef<"COURSE_NODES", 'Int'>
    readonly description: FieldRef<"COURSE_NODES", 'String'>
    readonly created_at: FieldRef<"COURSE_NODES", 'DateTime'>
    readonly updated_at: FieldRef<"COURSE_NODES", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * COURSE_NODES findUnique
   */
  export type COURSE_NODESFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODES
     */
    select?: COURSE_NODESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODESInclude<ExtArgs> | null
    /**
     * Filter, which COURSE_NODES to fetch.
     */
    where: COURSE_NODESWhereUniqueInput
  }

  /**
   * COURSE_NODES findUniqueOrThrow
   */
  export type COURSE_NODESFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODES
     */
    select?: COURSE_NODESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODESInclude<ExtArgs> | null
    /**
     * Filter, which COURSE_NODES to fetch.
     */
    where: COURSE_NODESWhereUniqueInput
  }

  /**
   * COURSE_NODES findFirst
   */
  export type COURSE_NODESFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODES
     */
    select?: COURSE_NODESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODESInclude<ExtArgs> | null
    /**
     * Filter, which COURSE_NODES to fetch.
     */
    where?: COURSE_NODESWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of COURSE_NODES to fetch.
     */
    orderBy?: COURSE_NODESOrderByWithRelationInput | COURSE_NODESOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for COURSE_NODES.
     */
    cursor?: COURSE_NODESWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` COURSE_NODES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` COURSE_NODES.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of COURSE_NODES.
     */
    distinct?: COURSE_NODESScalarFieldEnum | COURSE_NODESScalarFieldEnum[]
  }

  /**
   * COURSE_NODES findFirstOrThrow
   */
  export type COURSE_NODESFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODES
     */
    select?: COURSE_NODESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODESInclude<ExtArgs> | null
    /**
     * Filter, which COURSE_NODES to fetch.
     */
    where?: COURSE_NODESWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of COURSE_NODES to fetch.
     */
    orderBy?: COURSE_NODESOrderByWithRelationInput | COURSE_NODESOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for COURSE_NODES.
     */
    cursor?: COURSE_NODESWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` COURSE_NODES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` COURSE_NODES.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of COURSE_NODES.
     */
    distinct?: COURSE_NODESScalarFieldEnum | COURSE_NODESScalarFieldEnum[]
  }

  /**
   * COURSE_NODES findMany
   */
  export type COURSE_NODESFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODES
     */
    select?: COURSE_NODESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODESInclude<ExtArgs> | null
    /**
     * Filter, which COURSE_NODES to fetch.
     */
    where?: COURSE_NODESWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of COURSE_NODES to fetch.
     */
    orderBy?: COURSE_NODESOrderByWithRelationInput | COURSE_NODESOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing COURSE_NODES.
     */
    cursor?: COURSE_NODESWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` COURSE_NODES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` COURSE_NODES.
     */
    skip?: number
    distinct?: COURSE_NODESScalarFieldEnum | COURSE_NODESScalarFieldEnum[]
  }

  /**
   * COURSE_NODES create
   */
  export type COURSE_NODESCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODES
     */
    select?: COURSE_NODESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODESInclude<ExtArgs> | null
    /**
     * The data needed to create a COURSE_NODES.
     */
    data: XOR<COURSE_NODESCreateInput, COURSE_NODESUncheckedCreateInput>
  }

  /**
   * COURSE_NODES createMany
   */
  export type COURSE_NODESCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many COURSE_NODES.
     */
    data: COURSE_NODESCreateManyInput | COURSE_NODESCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * COURSE_NODES createManyAndReturn
   */
  export type COURSE_NODESCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODES
     */
    select?: COURSE_NODESSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many COURSE_NODES.
     */
    data: COURSE_NODESCreateManyInput | COURSE_NODESCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODESIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * COURSE_NODES update
   */
  export type COURSE_NODESUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODES
     */
    select?: COURSE_NODESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODESInclude<ExtArgs> | null
    /**
     * The data needed to update a COURSE_NODES.
     */
    data: XOR<COURSE_NODESUpdateInput, COURSE_NODESUncheckedUpdateInput>
    /**
     * Choose, which COURSE_NODES to update.
     */
    where: COURSE_NODESWhereUniqueInput
  }

  /**
   * COURSE_NODES updateMany
   */
  export type COURSE_NODESUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update COURSE_NODES.
     */
    data: XOR<COURSE_NODESUpdateManyMutationInput, COURSE_NODESUncheckedUpdateManyInput>
    /**
     * Filter which COURSE_NODES to update
     */
    where?: COURSE_NODESWhereInput
  }

  /**
   * COURSE_NODES upsert
   */
  export type COURSE_NODESUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODES
     */
    select?: COURSE_NODESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODESInclude<ExtArgs> | null
    /**
     * The filter to search for the COURSE_NODES to update in case it exists.
     */
    where: COURSE_NODESWhereUniqueInput
    /**
     * In case the COURSE_NODES found by the `where` argument doesn't exist, create a new COURSE_NODES with this data.
     */
    create: XOR<COURSE_NODESCreateInput, COURSE_NODESUncheckedCreateInput>
    /**
     * In case the COURSE_NODES was found with the provided `where` argument, update it with this data.
     */
    update: XOR<COURSE_NODESUpdateInput, COURSE_NODESUncheckedUpdateInput>
  }

  /**
   * COURSE_NODES delete
   */
  export type COURSE_NODESDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODES
     */
    select?: COURSE_NODESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODESInclude<ExtArgs> | null
    /**
     * Filter which COURSE_NODES to delete.
     */
    where: COURSE_NODESWhereUniqueInput
  }

  /**
   * COURSE_NODES deleteMany
   */
  export type COURSE_NODESDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which COURSE_NODES to delete
     */
    where?: COURSE_NODESWhereInput
  }

  /**
   * COURSE_NODES.courseTopics
   */
  export type COURSE_NODES$courseTopicsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_NODE
     */
    select?: COURSE_TOPICS_NODESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_NODEInclude<ExtArgs> | null
    where?: COURSE_TOPICS_NODEWhereInput
    orderBy?: COURSE_TOPICS_NODEOrderByWithRelationInput | COURSE_TOPICS_NODEOrderByWithRelationInput[]
    cursor?: COURSE_TOPICS_NODEWhereUniqueInput
    take?: number
    skip?: number
    distinct?: COURSE_TOPICS_NODEScalarFieldEnum | COURSE_TOPICS_NODEScalarFieldEnum[]
  }

  /**
   * COURSE_NODES.prerequisitesAsSource
   */
  export type COURSE_NODES$prerequisitesAsSourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODE_PREREQUISITES
     */
    select?: COURSE_NODE_PREREQUISITESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODE_PREREQUISITESInclude<ExtArgs> | null
    where?: COURSE_NODE_PREREQUISITESWhereInput
    orderBy?: COURSE_NODE_PREREQUISITESOrderByWithRelationInput | COURSE_NODE_PREREQUISITESOrderByWithRelationInput[]
    cursor?: COURSE_NODE_PREREQUISITESWhereUniqueInput
    take?: number
    skip?: number
    distinct?: COURSE_NODE_PREREQUISITESScalarFieldEnum | COURSE_NODE_PREREQUISITESScalarFieldEnum[]
  }

  /**
   * COURSE_NODES.prerequisitesAsTarget
   */
  export type COURSE_NODES$prerequisitesAsTargetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODE_PREREQUISITES
     */
    select?: COURSE_NODE_PREREQUISITESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODE_PREREQUISITESInclude<ExtArgs> | null
    where?: COURSE_NODE_PREREQUISITESWhereInput
    orderBy?: COURSE_NODE_PREREQUISITESOrderByWithRelationInput | COURSE_NODE_PREREQUISITESOrderByWithRelationInput[]
    cursor?: COURSE_NODE_PREREQUISITESWhereUniqueInput
    take?: number
    skip?: number
    distinct?: COURSE_NODE_PREREQUISITESScalarFieldEnum | COURSE_NODE_PREREQUISITESScalarFieldEnum[]
  }

  /**
   * COURSE_NODES without action
   */
  export type COURSE_NODESDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODES
     */
    select?: COURSE_NODESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODESInclude<ExtArgs> | null
  }


  /**
   * Model COURSE_NODE_PREREQUISITES
   */

  export type AggregateCOURSE_NODE_PREREQUISITES = {
    _count: COURSE_NODE_PREREQUISITESCountAggregateOutputType | null
    _avg: COURSE_NODE_PREREQUISITESAvgAggregateOutputType | null
    _sum: COURSE_NODE_PREREQUISITESSumAggregateOutputType | null
    _min: COURSE_NODE_PREREQUISITESMinAggregateOutputType | null
    _max: COURSE_NODE_PREREQUISITESMaxAggregateOutputType | null
  }

  export type COURSE_NODE_PREREQUISITESAvgAggregateOutputType = {
    id: number | null
    course_node_id: number | null
    prerequisite_node_id: number | null
  }

  export type COURSE_NODE_PREREQUISITESSumAggregateOutputType = {
    id: number | null
    course_node_id: number | null
    prerequisite_node_id: number | null
  }

  export type COURSE_NODE_PREREQUISITESMinAggregateOutputType = {
    id: number | null
    course_node_id: number | null
    prerequisite_node_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type COURSE_NODE_PREREQUISITESMaxAggregateOutputType = {
    id: number | null
    course_node_id: number | null
    prerequisite_node_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type COURSE_NODE_PREREQUISITESCountAggregateOutputType = {
    id: number
    course_node_id: number
    prerequisite_node_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type COURSE_NODE_PREREQUISITESAvgAggregateInputType = {
    id?: true
    course_node_id?: true
    prerequisite_node_id?: true
  }

  export type COURSE_NODE_PREREQUISITESSumAggregateInputType = {
    id?: true
    course_node_id?: true
    prerequisite_node_id?: true
  }

  export type COURSE_NODE_PREREQUISITESMinAggregateInputType = {
    id?: true
    course_node_id?: true
    prerequisite_node_id?: true
    created_at?: true
    updated_at?: true
  }

  export type COURSE_NODE_PREREQUISITESMaxAggregateInputType = {
    id?: true
    course_node_id?: true
    prerequisite_node_id?: true
    created_at?: true
    updated_at?: true
  }

  export type COURSE_NODE_PREREQUISITESCountAggregateInputType = {
    id?: true
    course_node_id?: true
    prerequisite_node_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type COURSE_NODE_PREREQUISITESAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which COURSE_NODE_PREREQUISITES to aggregate.
     */
    where?: COURSE_NODE_PREREQUISITESWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of COURSE_NODE_PREREQUISITES to fetch.
     */
    orderBy?: COURSE_NODE_PREREQUISITESOrderByWithRelationInput | COURSE_NODE_PREREQUISITESOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: COURSE_NODE_PREREQUISITESWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` COURSE_NODE_PREREQUISITES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` COURSE_NODE_PREREQUISITES.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned COURSE_NODE_PREREQUISITES
    **/
    _count?: true | COURSE_NODE_PREREQUISITESCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: COURSE_NODE_PREREQUISITESAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: COURSE_NODE_PREREQUISITESSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: COURSE_NODE_PREREQUISITESMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: COURSE_NODE_PREREQUISITESMaxAggregateInputType
  }

  export type GetCOURSE_NODE_PREREQUISITESAggregateType<T extends COURSE_NODE_PREREQUISITESAggregateArgs> = {
        [P in keyof T & keyof AggregateCOURSE_NODE_PREREQUISITES]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCOURSE_NODE_PREREQUISITES[P]>
      : GetScalarType<T[P], AggregateCOURSE_NODE_PREREQUISITES[P]>
  }




  export type COURSE_NODE_PREREQUISITESGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: COURSE_NODE_PREREQUISITESWhereInput
    orderBy?: COURSE_NODE_PREREQUISITESOrderByWithAggregationInput | COURSE_NODE_PREREQUISITESOrderByWithAggregationInput[]
    by: COURSE_NODE_PREREQUISITESScalarFieldEnum[] | COURSE_NODE_PREREQUISITESScalarFieldEnum
    having?: COURSE_NODE_PREREQUISITESScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: COURSE_NODE_PREREQUISITESCountAggregateInputType | true
    _avg?: COURSE_NODE_PREREQUISITESAvgAggregateInputType
    _sum?: COURSE_NODE_PREREQUISITESSumAggregateInputType
    _min?: COURSE_NODE_PREREQUISITESMinAggregateInputType
    _max?: COURSE_NODE_PREREQUISITESMaxAggregateInputType
  }

  export type COURSE_NODE_PREREQUISITESGroupByOutputType = {
    id: number
    course_node_id: number
    prerequisite_node_id: number
    created_at: Date
    updated_at: Date
    _count: COURSE_NODE_PREREQUISITESCountAggregateOutputType | null
    _avg: COURSE_NODE_PREREQUISITESAvgAggregateOutputType | null
    _sum: COURSE_NODE_PREREQUISITESSumAggregateOutputType | null
    _min: COURSE_NODE_PREREQUISITESMinAggregateOutputType | null
    _max: COURSE_NODE_PREREQUISITESMaxAggregateOutputType | null
  }

  type GetCOURSE_NODE_PREREQUISITESGroupByPayload<T extends COURSE_NODE_PREREQUISITESGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<COURSE_NODE_PREREQUISITESGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof COURSE_NODE_PREREQUISITESGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], COURSE_NODE_PREREQUISITESGroupByOutputType[P]>
            : GetScalarType<T[P], COURSE_NODE_PREREQUISITESGroupByOutputType[P]>
        }
      >
    >


  export type COURSE_NODE_PREREQUISITESSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    course_node_id?: boolean
    prerequisite_node_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    courseNode?: boolean | COURSE_NODESDefaultArgs<ExtArgs>
    prerequisiteNode?: boolean | COURSE_NODESDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cOURSE_NODE_PREREQUISITES"]>

  export type COURSE_NODE_PREREQUISITESSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    course_node_id?: boolean
    prerequisite_node_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    courseNode?: boolean | COURSE_NODESDefaultArgs<ExtArgs>
    prerequisiteNode?: boolean | COURSE_NODESDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cOURSE_NODE_PREREQUISITES"]>

  export type COURSE_NODE_PREREQUISITESSelectScalar = {
    id?: boolean
    course_node_id?: boolean
    prerequisite_node_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type COURSE_NODE_PREREQUISITESInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courseNode?: boolean | COURSE_NODESDefaultArgs<ExtArgs>
    prerequisiteNode?: boolean | COURSE_NODESDefaultArgs<ExtArgs>
  }
  export type COURSE_NODE_PREREQUISITESIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courseNode?: boolean | COURSE_NODESDefaultArgs<ExtArgs>
    prerequisiteNode?: boolean | COURSE_NODESDefaultArgs<ExtArgs>
  }

  export type $COURSE_NODE_PREREQUISITESPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "COURSE_NODE_PREREQUISITES"
    objects: {
      courseNode: Prisma.$COURSE_NODESPayload<ExtArgs>
      prerequisiteNode: Prisma.$COURSE_NODESPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      course_node_id: number
      prerequisite_node_id: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["cOURSE_NODE_PREREQUISITES"]>
    composites: {}
  }

  type COURSE_NODE_PREREQUISITESGetPayload<S extends boolean | null | undefined | COURSE_NODE_PREREQUISITESDefaultArgs> = $Result.GetResult<Prisma.$COURSE_NODE_PREREQUISITESPayload, S>

  type COURSE_NODE_PREREQUISITESCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<COURSE_NODE_PREREQUISITESFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: COURSE_NODE_PREREQUISITESCountAggregateInputType | true
    }

  export interface COURSE_NODE_PREREQUISITESDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['COURSE_NODE_PREREQUISITES'], meta: { name: 'COURSE_NODE_PREREQUISITES' } }
    /**
     * Find zero or one COURSE_NODE_PREREQUISITES that matches the filter.
     * @param {COURSE_NODE_PREREQUISITESFindUniqueArgs} args - Arguments to find a COURSE_NODE_PREREQUISITES
     * @example
     * // Get one COURSE_NODE_PREREQUISITES
     * const cOURSE_NODE_PREREQUISITES = await prisma.cOURSE_NODE_PREREQUISITES.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends COURSE_NODE_PREREQUISITESFindUniqueArgs>(args: SelectSubset<T, COURSE_NODE_PREREQUISITESFindUniqueArgs<ExtArgs>>): Prisma__COURSE_NODE_PREREQUISITESClient<$Result.GetResult<Prisma.$COURSE_NODE_PREREQUISITESPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one COURSE_NODE_PREREQUISITES that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {COURSE_NODE_PREREQUISITESFindUniqueOrThrowArgs} args - Arguments to find a COURSE_NODE_PREREQUISITES
     * @example
     * // Get one COURSE_NODE_PREREQUISITES
     * const cOURSE_NODE_PREREQUISITES = await prisma.cOURSE_NODE_PREREQUISITES.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends COURSE_NODE_PREREQUISITESFindUniqueOrThrowArgs>(args: SelectSubset<T, COURSE_NODE_PREREQUISITESFindUniqueOrThrowArgs<ExtArgs>>): Prisma__COURSE_NODE_PREREQUISITESClient<$Result.GetResult<Prisma.$COURSE_NODE_PREREQUISITESPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first COURSE_NODE_PREREQUISITES that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_NODE_PREREQUISITESFindFirstArgs} args - Arguments to find a COURSE_NODE_PREREQUISITES
     * @example
     * // Get one COURSE_NODE_PREREQUISITES
     * const cOURSE_NODE_PREREQUISITES = await prisma.cOURSE_NODE_PREREQUISITES.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends COURSE_NODE_PREREQUISITESFindFirstArgs>(args?: SelectSubset<T, COURSE_NODE_PREREQUISITESFindFirstArgs<ExtArgs>>): Prisma__COURSE_NODE_PREREQUISITESClient<$Result.GetResult<Prisma.$COURSE_NODE_PREREQUISITESPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first COURSE_NODE_PREREQUISITES that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_NODE_PREREQUISITESFindFirstOrThrowArgs} args - Arguments to find a COURSE_NODE_PREREQUISITES
     * @example
     * // Get one COURSE_NODE_PREREQUISITES
     * const cOURSE_NODE_PREREQUISITES = await prisma.cOURSE_NODE_PREREQUISITES.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends COURSE_NODE_PREREQUISITESFindFirstOrThrowArgs>(args?: SelectSubset<T, COURSE_NODE_PREREQUISITESFindFirstOrThrowArgs<ExtArgs>>): Prisma__COURSE_NODE_PREREQUISITESClient<$Result.GetResult<Prisma.$COURSE_NODE_PREREQUISITESPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more COURSE_NODE_PREREQUISITES that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_NODE_PREREQUISITESFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all COURSE_NODE_PREREQUISITES
     * const cOURSE_NODE_PREREQUISITES = await prisma.cOURSE_NODE_PREREQUISITES.findMany()
     * 
     * // Get first 10 COURSE_NODE_PREREQUISITES
     * const cOURSE_NODE_PREREQUISITES = await prisma.cOURSE_NODE_PREREQUISITES.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cOURSE_NODE_PREREQUISITESWithIdOnly = await prisma.cOURSE_NODE_PREREQUISITES.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends COURSE_NODE_PREREQUISITESFindManyArgs>(args?: SelectSubset<T, COURSE_NODE_PREREQUISITESFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$COURSE_NODE_PREREQUISITESPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a COURSE_NODE_PREREQUISITES.
     * @param {COURSE_NODE_PREREQUISITESCreateArgs} args - Arguments to create a COURSE_NODE_PREREQUISITES.
     * @example
     * // Create one COURSE_NODE_PREREQUISITES
     * const COURSE_NODE_PREREQUISITES = await prisma.cOURSE_NODE_PREREQUISITES.create({
     *   data: {
     *     // ... data to create a COURSE_NODE_PREREQUISITES
     *   }
     * })
     * 
     */
    create<T extends COURSE_NODE_PREREQUISITESCreateArgs>(args: SelectSubset<T, COURSE_NODE_PREREQUISITESCreateArgs<ExtArgs>>): Prisma__COURSE_NODE_PREREQUISITESClient<$Result.GetResult<Prisma.$COURSE_NODE_PREREQUISITESPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many COURSE_NODE_PREREQUISITES.
     * @param {COURSE_NODE_PREREQUISITESCreateManyArgs} args - Arguments to create many COURSE_NODE_PREREQUISITES.
     * @example
     * // Create many COURSE_NODE_PREREQUISITES
     * const cOURSE_NODE_PREREQUISITES = await prisma.cOURSE_NODE_PREREQUISITES.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends COURSE_NODE_PREREQUISITESCreateManyArgs>(args?: SelectSubset<T, COURSE_NODE_PREREQUISITESCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many COURSE_NODE_PREREQUISITES and returns the data saved in the database.
     * @param {COURSE_NODE_PREREQUISITESCreateManyAndReturnArgs} args - Arguments to create many COURSE_NODE_PREREQUISITES.
     * @example
     * // Create many COURSE_NODE_PREREQUISITES
     * const cOURSE_NODE_PREREQUISITES = await prisma.cOURSE_NODE_PREREQUISITES.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many COURSE_NODE_PREREQUISITES and only return the `id`
     * const cOURSE_NODE_PREREQUISITESWithIdOnly = await prisma.cOURSE_NODE_PREREQUISITES.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends COURSE_NODE_PREREQUISITESCreateManyAndReturnArgs>(args?: SelectSubset<T, COURSE_NODE_PREREQUISITESCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$COURSE_NODE_PREREQUISITESPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a COURSE_NODE_PREREQUISITES.
     * @param {COURSE_NODE_PREREQUISITESDeleteArgs} args - Arguments to delete one COURSE_NODE_PREREQUISITES.
     * @example
     * // Delete one COURSE_NODE_PREREQUISITES
     * const COURSE_NODE_PREREQUISITES = await prisma.cOURSE_NODE_PREREQUISITES.delete({
     *   where: {
     *     // ... filter to delete one COURSE_NODE_PREREQUISITES
     *   }
     * })
     * 
     */
    delete<T extends COURSE_NODE_PREREQUISITESDeleteArgs>(args: SelectSubset<T, COURSE_NODE_PREREQUISITESDeleteArgs<ExtArgs>>): Prisma__COURSE_NODE_PREREQUISITESClient<$Result.GetResult<Prisma.$COURSE_NODE_PREREQUISITESPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one COURSE_NODE_PREREQUISITES.
     * @param {COURSE_NODE_PREREQUISITESUpdateArgs} args - Arguments to update one COURSE_NODE_PREREQUISITES.
     * @example
     * // Update one COURSE_NODE_PREREQUISITES
     * const cOURSE_NODE_PREREQUISITES = await prisma.cOURSE_NODE_PREREQUISITES.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends COURSE_NODE_PREREQUISITESUpdateArgs>(args: SelectSubset<T, COURSE_NODE_PREREQUISITESUpdateArgs<ExtArgs>>): Prisma__COURSE_NODE_PREREQUISITESClient<$Result.GetResult<Prisma.$COURSE_NODE_PREREQUISITESPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more COURSE_NODE_PREREQUISITES.
     * @param {COURSE_NODE_PREREQUISITESDeleteManyArgs} args - Arguments to filter COURSE_NODE_PREREQUISITES to delete.
     * @example
     * // Delete a few COURSE_NODE_PREREQUISITES
     * const { count } = await prisma.cOURSE_NODE_PREREQUISITES.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends COURSE_NODE_PREREQUISITESDeleteManyArgs>(args?: SelectSubset<T, COURSE_NODE_PREREQUISITESDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more COURSE_NODE_PREREQUISITES.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_NODE_PREREQUISITESUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many COURSE_NODE_PREREQUISITES
     * const cOURSE_NODE_PREREQUISITES = await prisma.cOURSE_NODE_PREREQUISITES.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends COURSE_NODE_PREREQUISITESUpdateManyArgs>(args: SelectSubset<T, COURSE_NODE_PREREQUISITESUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one COURSE_NODE_PREREQUISITES.
     * @param {COURSE_NODE_PREREQUISITESUpsertArgs} args - Arguments to update or create a COURSE_NODE_PREREQUISITES.
     * @example
     * // Update or create a COURSE_NODE_PREREQUISITES
     * const cOURSE_NODE_PREREQUISITES = await prisma.cOURSE_NODE_PREREQUISITES.upsert({
     *   create: {
     *     // ... data to create a COURSE_NODE_PREREQUISITES
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the COURSE_NODE_PREREQUISITES we want to update
     *   }
     * })
     */
    upsert<T extends COURSE_NODE_PREREQUISITESUpsertArgs>(args: SelectSubset<T, COURSE_NODE_PREREQUISITESUpsertArgs<ExtArgs>>): Prisma__COURSE_NODE_PREREQUISITESClient<$Result.GetResult<Prisma.$COURSE_NODE_PREREQUISITESPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of COURSE_NODE_PREREQUISITES.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_NODE_PREREQUISITESCountArgs} args - Arguments to filter COURSE_NODE_PREREQUISITES to count.
     * @example
     * // Count the number of COURSE_NODE_PREREQUISITES
     * const count = await prisma.cOURSE_NODE_PREREQUISITES.count({
     *   where: {
     *     // ... the filter for the COURSE_NODE_PREREQUISITES we want to count
     *   }
     * })
    **/
    count<T extends COURSE_NODE_PREREQUISITESCountArgs>(
      args?: Subset<T, COURSE_NODE_PREREQUISITESCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], COURSE_NODE_PREREQUISITESCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a COURSE_NODE_PREREQUISITES.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_NODE_PREREQUISITESAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends COURSE_NODE_PREREQUISITESAggregateArgs>(args: Subset<T, COURSE_NODE_PREREQUISITESAggregateArgs>): Prisma.PrismaPromise<GetCOURSE_NODE_PREREQUISITESAggregateType<T>>

    /**
     * Group by COURSE_NODE_PREREQUISITES.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_NODE_PREREQUISITESGroupByArgs} args - Group by arguments.
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
      T extends COURSE_NODE_PREREQUISITESGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: COURSE_NODE_PREREQUISITESGroupByArgs['orderBy'] }
        : { orderBy?: COURSE_NODE_PREREQUISITESGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, COURSE_NODE_PREREQUISITESGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCOURSE_NODE_PREREQUISITESGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the COURSE_NODE_PREREQUISITES model
   */
  readonly fields: COURSE_NODE_PREREQUISITESFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for COURSE_NODE_PREREQUISITES.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__COURSE_NODE_PREREQUISITESClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    courseNode<T extends COURSE_NODESDefaultArgs<ExtArgs> = {}>(args?: Subset<T, COURSE_NODESDefaultArgs<ExtArgs>>): Prisma__COURSE_NODESClient<$Result.GetResult<Prisma.$COURSE_NODESPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    prerequisiteNode<T extends COURSE_NODESDefaultArgs<ExtArgs> = {}>(args?: Subset<T, COURSE_NODESDefaultArgs<ExtArgs>>): Prisma__COURSE_NODESClient<$Result.GetResult<Prisma.$COURSE_NODESPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the COURSE_NODE_PREREQUISITES model
   */ 
  interface COURSE_NODE_PREREQUISITESFieldRefs {
    readonly id: FieldRef<"COURSE_NODE_PREREQUISITES", 'Int'>
    readonly course_node_id: FieldRef<"COURSE_NODE_PREREQUISITES", 'Int'>
    readonly prerequisite_node_id: FieldRef<"COURSE_NODE_PREREQUISITES", 'Int'>
    readonly created_at: FieldRef<"COURSE_NODE_PREREQUISITES", 'DateTime'>
    readonly updated_at: FieldRef<"COURSE_NODE_PREREQUISITES", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * COURSE_NODE_PREREQUISITES findUnique
   */
  export type COURSE_NODE_PREREQUISITESFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODE_PREREQUISITES
     */
    select?: COURSE_NODE_PREREQUISITESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODE_PREREQUISITESInclude<ExtArgs> | null
    /**
     * Filter, which COURSE_NODE_PREREQUISITES to fetch.
     */
    where: COURSE_NODE_PREREQUISITESWhereUniqueInput
  }

  /**
   * COURSE_NODE_PREREQUISITES findUniqueOrThrow
   */
  export type COURSE_NODE_PREREQUISITESFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODE_PREREQUISITES
     */
    select?: COURSE_NODE_PREREQUISITESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODE_PREREQUISITESInclude<ExtArgs> | null
    /**
     * Filter, which COURSE_NODE_PREREQUISITES to fetch.
     */
    where: COURSE_NODE_PREREQUISITESWhereUniqueInput
  }

  /**
   * COURSE_NODE_PREREQUISITES findFirst
   */
  export type COURSE_NODE_PREREQUISITESFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODE_PREREQUISITES
     */
    select?: COURSE_NODE_PREREQUISITESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODE_PREREQUISITESInclude<ExtArgs> | null
    /**
     * Filter, which COURSE_NODE_PREREQUISITES to fetch.
     */
    where?: COURSE_NODE_PREREQUISITESWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of COURSE_NODE_PREREQUISITES to fetch.
     */
    orderBy?: COURSE_NODE_PREREQUISITESOrderByWithRelationInput | COURSE_NODE_PREREQUISITESOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for COURSE_NODE_PREREQUISITES.
     */
    cursor?: COURSE_NODE_PREREQUISITESWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` COURSE_NODE_PREREQUISITES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` COURSE_NODE_PREREQUISITES.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of COURSE_NODE_PREREQUISITES.
     */
    distinct?: COURSE_NODE_PREREQUISITESScalarFieldEnum | COURSE_NODE_PREREQUISITESScalarFieldEnum[]
  }

  /**
   * COURSE_NODE_PREREQUISITES findFirstOrThrow
   */
  export type COURSE_NODE_PREREQUISITESFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODE_PREREQUISITES
     */
    select?: COURSE_NODE_PREREQUISITESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODE_PREREQUISITESInclude<ExtArgs> | null
    /**
     * Filter, which COURSE_NODE_PREREQUISITES to fetch.
     */
    where?: COURSE_NODE_PREREQUISITESWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of COURSE_NODE_PREREQUISITES to fetch.
     */
    orderBy?: COURSE_NODE_PREREQUISITESOrderByWithRelationInput | COURSE_NODE_PREREQUISITESOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for COURSE_NODE_PREREQUISITES.
     */
    cursor?: COURSE_NODE_PREREQUISITESWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` COURSE_NODE_PREREQUISITES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` COURSE_NODE_PREREQUISITES.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of COURSE_NODE_PREREQUISITES.
     */
    distinct?: COURSE_NODE_PREREQUISITESScalarFieldEnum | COURSE_NODE_PREREQUISITESScalarFieldEnum[]
  }

  /**
   * COURSE_NODE_PREREQUISITES findMany
   */
  export type COURSE_NODE_PREREQUISITESFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODE_PREREQUISITES
     */
    select?: COURSE_NODE_PREREQUISITESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODE_PREREQUISITESInclude<ExtArgs> | null
    /**
     * Filter, which COURSE_NODE_PREREQUISITES to fetch.
     */
    where?: COURSE_NODE_PREREQUISITESWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of COURSE_NODE_PREREQUISITES to fetch.
     */
    orderBy?: COURSE_NODE_PREREQUISITESOrderByWithRelationInput | COURSE_NODE_PREREQUISITESOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing COURSE_NODE_PREREQUISITES.
     */
    cursor?: COURSE_NODE_PREREQUISITESWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` COURSE_NODE_PREREQUISITES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` COURSE_NODE_PREREQUISITES.
     */
    skip?: number
    distinct?: COURSE_NODE_PREREQUISITESScalarFieldEnum | COURSE_NODE_PREREQUISITESScalarFieldEnum[]
  }

  /**
   * COURSE_NODE_PREREQUISITES create
   */
  export type COURSE_NODE_PREREQUISITESCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODE_PREREQUISITES
     */
    select?: COURSE_NODE_PREREQUISITESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODE_PREREQUISITESInclude<ExtArgs> | null
    /**
     * The data needed to create a COURSE_NODE_PREREQUISITES.
     */
    data: XOR<COURSE_NODE_PREREQUISITESCreateInput, COURSE_NODE_PREREQUISITESUncheckedCreateInput>
  }

  /**
   * COURSE_NODE_PREREQUISITES createMany
   */
  export type COURSE_NODE_PREREQUISITESCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many COURSE_NODE_PREREQUISITES.
     */
    data: COURSE_NODE_PREREQUISITESCreateManyInput | COURSE_NODE_PREREQUISITESCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * COURSE_NODE_PREREQUISITES createManyAndReturn
   */
  export type COURSE_NODE_PREREQUISITESCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODE_PREREQUISITES
     */
    select?: COURSE_NODE_PREREQUISITESSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many COURSE_NODE_PREREQUISITES.
     */
    data: COURSE_NODE_PREREQUISITESCreateManyInput | COURSE_NODE_PREREQUISITESCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODE_PREREQUISITESIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * COURSE_NODE_PREREQUISITES update
   */
  export type COURSE_NODE_PREREQUISITESUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODE_PREREQUISITES
     */
    select?: COURSE_NODE_PREREQUISITESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODE_PREREQUISITESInclude<ExtArgs> | null
    /**
     * The data needed to update a COURSE_NODE_PREREQUISITES.
     */
    data: XOR<COURSE_NODE_PREREQUISITESUpdateInput, COURSE_NODE_PREREQUISITESUncheckedUpdateInput>
    /**
     * Choose, which COURSE_NODE_PREREQUISITES to update.
     */
    where: COURSE_NODE_PREREQUISITESWhereUniqueInput
  }

  /**
   * COURSE_NODE_PREREQUISITES updateMany
   */
  export type COURSE_NODE_PREREQUISITESUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update COURSE_NODE_PREREQUISITES.
     */
    data: XOR<COURSE_NODE_PREREQUISITESUpdateManyMutationInput, COURSE_NODE_PREREQUISITESUncheckedUpdateManyInput>
    /**
     * Filter which COURSE_NODE_PREREQUISITES to update
     */
    where?: COURSE_NODE_PREREQUISITESWhereInput
  }

  /**
   * COURSE_NODE_PREREQUISITES upsert
   */
  export type COURSE_NODE_PREREQUISITESUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODE_PREREQUISITES
     */
    select?: COURSE_NODE_PREREQUISITESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODE_PREREQUISITESInclude<ExtArgs> | null
    /**
     * The filter to search for the COURSE_NODE_PREREQUISITES to update in case it exists.
     */
    where: COURSE_NODE_PREREQUISITESWhereUniqueInput
    /**
     * In case the COURSE_NODE_PREREQUISITES found by the `where` argument doesn't exist, create a new COURSE_NODE_PREREQUISITES with this data.
     */
    create: XOR<COURSE_NODE_PREREQUISITESCreateInput, COURSE_NODE_PREREQUISITESUncheckedCreateInput>
    /**
     * In case the COURSE_NODE_PREREQUISITES was found with the provided `where` argument, update it with this data.
     */
    update: XOR<COURSE_NODE_PREREQUISITESUpdateInput, COURSE_NODE_PREREQUISITESUncheckedUpdateInput>
  }

  /**
   * COURSE_NODE_PREREQUISITES delete
   */
  export type COURSE_NODE_PREREQUISITESDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODE_PREREQUISITES
     */
    select?: COURSE_NODE_PREREQUISITESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODE_PREREQUISITESInclude<ExtArgs> | null
    /**
     * Filter which COURSE_NODE_PREREQUISITES to delete.
     */
    where: COURSE_NODE_PREREQUISITESWhereUniqueInput
  }

  /**
   * COURSE_NODE_PREREQUISITES deleteMany
   */
  export type COURSE_NODE_PREREQUISITESDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which COURSE_NODE_PREREQUISITES to delete
     */
    where?: COURSE_NODE_PREREQUISITESWhereInput
  }

  /**
   * COURSE_NODE_PREREQUISITES without action
   */
  export type COURSE_NODE_PREREQUISITESDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_NODE_PREREQUISITES
     */
    select?: COURSE_NODE_PREREQUISITESSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_NODE_PREREQUISITESInclude<ExtArgs> | null
  }


  /**
   * Model COURSE_TOPICS_NODE
   */

  export type AggregateCOURSE_TOPICS_NODE = {
    _count: COURSE_TOPICS_NODECountAggregateOutputType | null
    _avg: COURSE_TOPICS_NODEAvgAggregateOutputType | null
    _sum: COURSE_TOPICS_NODESumAggregateOutputType | null
    _min: COURSE_TOPICS_NODEMinAggregateOutputType | null
    _max: COURSE_TOPICS_NODEMaxAggregateOutputType | null
  }

  export type COURSE_TOPICS_NODEAvgAggregateOutputType = {
    id: number | null
    course_node_id: number | null
  }

  export type COURSE_TOPICS_NODESumAggregateOutputType = {
    id: number | null
    course_node_id: number | null
  }

  export type COURSE_TOPICS_NODEMinAggregateOutputType = {
    id: number | null
    course_node_id: number | null
    slug: string | null
    title: string | null
    description: string | null
    learning_objectives: string | null
    resources_url: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type COURSE_TOPICS_NODEMaxAggregateOutputType = {
    id: number | null
    course_node_id: number | null
    slug: string | null
    title: string | null
    description: string | null
    learning_objectives: string | null
    resources_url: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type COURSE_TOPICS_NODECountAggregateOutputType = {
    id: number
    course_node_id: number
    slug: number
    title: number
    description: number
    coords: number
    learning_objectives: number
    resources_url: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type COURSE_TOPICS_NODEAvgAggregateInputType = {
    id?: true
    course_node_id?: true
  }

  export type COURSE_TOPICS_NODESumAggregateInputType = {
    id?: true
    course_node_id?: true
  }

  export type COURSE_TOPICS_NODEMinAggregateInputType = {
    id?: true
    course_node_id?: true
    slug?: true
    title?: true
    description?: true
    learning_objectives?: true
    resources_url?: true
    created_at?: true
    updated_at?: true
  }

  export type COURSE_TOPICS_NODEMaxAggregateInputType = {
    id?: true
    course_node_id?: true
    slug?: true
    title?: true
    description?: true
    learning_objectives?: true
    resources_url?: true
    created_at?: true
    updated_at?: true
  }

  export type COURSE_TOPICS_NODECountAggregateInputType = {
    id?: true
    course_node_id?: true
    slug?: true
    title?: true
    description?: true
    coords?: true
    learning_objectives?: true
    resources_url?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type COURSE_TOPICS_NODEAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which COURSE_TOPICS_NODE to aggregate.
     */
    where?: COURSE_TOPICS_NODEWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of COURSE_TOPICS_NODES to fetch.
     */
    orderBy?: COURSE_TOPICS_NODEOrderByWithRelationInput | COURSE_TOPICS_NODEOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: COURSE_TOPICS_NODEWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` COURSE_TOPICS_NODES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` COURSE_TOPICS_NODES.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned COURSE_TOPICS_NODES
    **/
    _count?: true | COURSE_TOPICS_NODECountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: COURSE_TOPICS_NODEAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: COURSE_TOPICS_NODESumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: COURSE_TOPICS_NODEMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: COURSE_TOPICS_NODEMaxAggregateInputType
  }

  export type GetCOURSE_TOPICS_NODEAggregateType<T extends COURSE_TOPICS_NODEAggregateArgs> = {
        [P in keyof T & keyof AggregateCOURSE_TOPICS_NODE]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCOURSE_TOPICS_NODE[P]>
      : GetScalarType<T[P], AggregateCOURSE_TOPICS_NODE[P]>
  }




  export type COURSE_TOPICS_NODEGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: COURSE_TOPICS_NODEWhereInput
    orderBy?: COURSE_TOPICS_NODEOrderByWithAggregationInput | COURSE_TOPICS_NODEOrderByWithAggregationInput[]
    by: COURSE_TOPICS_NODEScalarFieldEnum[] | COURSE_TOPICS_NODEScalarFieldEnum
    having?: COURSE_TOPICS_NODEScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: COURSE_TOPICS_NODECountAggregateInputType | true
    _avg?: COURSE_TOPICS_NODEAvgAggregateInputType
    _sum?: COURSE_TOPICS_NODESumAggregateInputType
    _min?: COURSE_TOPICS_NODEMinAggregateInputType
    _max?: COURSE_TOPICS_NODEMaxAggregateInputType
  }

  export type COURSE_TOPICS_NODEGroupByOutputType = {
    id: number
    course_node_id: number
    slug: string
    title: string
    description: string | null
    coords: JsonValue | null
    learning_objectives: string | null
    resources_url: string | null
    created_at: Date
    updated_at: Date
    _count: COURSE_TOPICS_NODECountAggregateOutputType | null
    _avg: COURSE_TOPICS_NODEAvgAggregateOutputType | null
    _sum: COURSE_TOPICS_NODESumAggregateOutputType | null
    _min: COURSE_TOPICS_NODEMinAggregateOutputType | null
    _max: COURSE_TOPICS_NODEMaxAggregateOutputType | null
  }

  type GetCOURSE_TOPICS_NODEGroupByPayload<T extends COURSE_TOPICS_NODEGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<COURSE_TOPICS_NODEGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof COURSE_TOPICS_NODEGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], COURSE_TOPICS_NODEGroupByOutputType[P]>
            : GetScalarType<T[P], COURSE_TOPICS_NODEGroupByOutputType[P]>
        }
      >
    >


  export type COURSE_TOPICS_NODESelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    course_node_id?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    coords?: boolean
    learning_objectives?: boolean
    resources_url?: boolean
    created_at?: boolean
    updated_at?: boolean
    courseNode?: boolean | COURSE_NODESDefaultArgs<ExtArgs>
    topicEdgesAsSource?: boolean | COURSE_TOPICS_NODE$topicEdgesAsSourceArgs<ExtArgs>
    topicEdgesAsTarget?: boolean | COURSE_TOPICS_NODE$topicEdgesAsTargetArgs<ExtArgs>
    _count?: boolean | COURSE_TOPICS_NODECountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cOURSE_TOPICS_NODE"]>

  export type COURSE_TOPICS_NODESelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    course_node_id?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    coords?: boolean
    learning_objectives?: boolean
    resources_url?: boolean
    created_at?: boolean
    updated_at?: boolean
    courseNode?: boolean | COURSE_NODESDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cOURSE_TOPICS_NODE"]>

  export type COURSE_TOPICS_NODESelectScalar = {
    id?: boolean
    course_node_id?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    coords?: boolean
    learning_objectives?: boolean
    resources_url?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type COURSE_TOPICS_NODEInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courseNode?: boolean | COURSE_NODESDefaultArgs<ExtArgs>
    topicEdgesAsSource?: boolean | COURSE_TOPICS_NODE$topicEdgesAsSourceArgs<ExtArgs>
    topicEdgesAsTarget?: boolean | COURSE_TOPICS_NODE$topicEdgesAsTargetArgs<ExtArgs>
    _count?: boolean | COURSE_TOPICS_NODECountOutputTypeDefaultArgs<ExtArgs>
  }
  export type COURSE_TOPICS_NODEIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courseNode?: boolean | COURSE_NODESDefaultArgs<ExtArgs>
  }

  export type $COURSE_TOPICS_NODEPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "COURSE_TOPICS_NODE"
    objects: {
      courseNode: Prisma.$COURSE_NODESPayload<ExtArgs>
      topicEdgesAsSource: Prisma.$COURSE_TOPICS_EDGEPayload<ExtArgs>[]
      topicEdgesAsTarget: Prisma.$COURSE_TOPICS_EDGEPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      course_node_id: number
      slug: string
      title: string
      description: string | null
      coords: Prisma.JsonValue | null
      learning_objectives: string | null
      resources_url: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["cOURSE_TOPICS_NODE"]>
    composites: {}
  }

  type COURSE_TOPICS_NODEGetPayload<S extends boolean | null | undefined | COURSE_TOPICS_NODEDefaultArgs> = $Result.GetResult<Prisma.$COURSE_TOPICS_NODEPayload, S>

  type COURSE_TOPICS_NODECountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<COURSE_TOPICS_NODEFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: COURSE_TOPICS_NODECountAggregateInputType | true
    }

  export interface COURSE_TOPICS_NODEDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['COURSE_TOPICS_NODE'], meta: { name: 'COURSE_TOPICS_NODE' } }
    /**
     * Find zero or one COURSE_TOPICS_NODE that matches the filter.
     * @param {COURSE_TOPICS_NODEFindUniqueArgs} args - Arguments to find a COURSE_TOPICS_NODE
     * @example
     * // Get one COURSE_TOPICS_NODE
     * const cOURSE_TOPICS_NODE = await prisma.cOURSE_TOPICS_NODE.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends COURSE_TOPICS_NODEFindUniqueArgs>(args: SelectSubset<T, COURSE_TOPICS_NODEFindUniqueArgs<ExtArgs>>): Prisma__COURSE_TOPICS_NODEClient<$Result.GetResult<Prisma.$COURSE_TOPICS_NODEPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one COURSE_TOPICS_NODE that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {COURSE_TOPICS_NODEFindUniqueOrThrowArgs} args - Arguments to find a COURSE_TOPICS_NODE
     * @example
     * // Get one COURSE_TOPICS_NODE
     * const cOURSE_TOPICS_NODE = await prisma.cOURSE_TOPICS_NODE.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends COURSE_TOPICS_NODEFindUniqueOrThrowArgs>(args: SelectSubset<T, COURSE_TOPICS_NODEFindUniqueOrThrowArgs<ExtArgs>>): Prisma__COURSE_TOPICS_NODEClient<$Result.GetResult<Prisma.$COURSE_TOPICS_NODEPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first COURSE_TOPICS_NODE that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_TOPICS_NODEFindFirstArgs} args - Arguments to find a COURSE_TOPICS_NODE
     * @example
     * // Get one COURSE_TOPICS_NODE
     * const cOURSE_TOPICS_NODE = await prisma.cOURSE_TOPICS_NODE.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends COURSE_TOPICS_NODEFindFirstArgs>(args?: SelectSubset<T, COURSE_TOPICS_NODEFindFirstArgs<ExtArgs>>): Prisma__COURSE_TOPICS_NODEClient<$Result.GetResult<Prisma.$COURSE_TOPICS_NODEPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first COURSE_TOPICS_NODE that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_TOPICS_NODEFindFirstOrThrowArgs} args - Arguments to find a COURSE_TOPICS_NODE
     * @example
     * // Get one COURSE_TOPICS_NODE
     * const cOURSE_TOPICS_NODE = await prisma.cOURSE_TOPICS_NODE.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends COURSE_TOPICS_NODEFindFirstOrThrowArgs>(args?: SelectSubset<T, COURSE_TOPICS_NODEFindFirstOrThrowArgs<ExtArgs>>): Prisma__COURSE_TOPICS_NODEClient<$Result.GetResult<Prisma.$COURSE_TOPICS_NODEPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more COURSE_TOPICS_NODES that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_TOPICS_NODEFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all COURSE_TOPICS_NODES
     * const cOURSE_TOPICS_NODES = await prisma.cOURSE_TOPICS_NODE.findMany()
     * 
     * // Get first 10 COURSE_TOPICS_NODES
     * const cOURSE_TOPICS_NODES = await prisma.cOURSE_TOPICS_NODE.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cOURSE_TOPICS_NODEWithIdOnly = await prisma.cOURSE_TOPICS_NODE.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends COURSE_TOPICS_NODEFindManyArgs>(args?: SelectSubset<T, COURSE_TOPICS_NODEFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$COURSE_TOPICS_NODEPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a COURSE_TOPICS_NODE.
     * @param {COURSE_TOPICS_NODECreateArgs} args - Arguments to create a COURSE_TOPICS_NODE.
     * @example
     * // Create one COURSE_TOPICS_NODE
     * const COURSE_TOPICS_NODE = await prisma.cOURSE_TOPICS_NODE.create({
     *   data: {
     *     // ... data to create a COURSE_TOPICS_NODE
     *   }
     * })
     * 
     */
    create<T extends COURSE_TOPICS_NODECreateArgs>(args: SelectSubset<T, COURSE_TOPICS_NODECreateArgs<ExtArgs>>): Prisma__COURSE_TOPICS_NODEClient<$Result.GetResult<Prisma.$COURSE_TOPICS_NODEPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many COURSE_TOPICS_NODES.
     * @param {COURSE_TOPICS_NODECreateManyArgs} args - Arguments to create many COURSE_TOPICS_NODES.
     * @example
     * // Create many COURSE_TOPICS_NODES
     * const cOURSE_TOPICS_NODE = await prisma.cOURSE_TOPICS_NODE.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends COURSE_TOPICS_NODECreateManyArgs>(args?: SelectSubset<T, COURSE_TOPICS_NODECreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many COURSE_TOPICS_NODES and returns the data saved in the database.
     * @param {COURSE_TOPICS_NODECreateManyAndReturnArgs} args - Arguments to create many COURSE_TOPICS_NODES.
     * @example
     * // Create many COURSE_TOPICS_NODES
     * const cOURSE_TOPICS_NODE = await prisma.cOURSE_TOPICS_NODE.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many COURSE_TOPICS_NODES and only return the `id`
     * const cOURSE_TOPICS_NODEWithIdOnly = await prisma.cOURSE_TOPICS_NODE.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends COURSE_TOPICS_NODECreateManyAndReturnArgs>(args?: SelectSubset<T, COURSE_TOPICS_NODECreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$COURSE_TOPICS_NODEPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a COURSE_TOPICS_NODE.
     * @param {COURSE_TOPICS_NODEDeleteArgs} args - Arguments to delete one COURSE_TOPICS_NODE.
     * @example
     * // Delete one COURSE_TOPICS_NODE
     * const COURSE_TOPICS_NODE = await prisma.cOURSE_TOPICS_NODE.delete({
     *   where: {
     *     // ... filter to delete one COURSE_TOPICS_NODE
     *   }
     * })
     * 
     */
    delete<T extends COURSE_TOPICS_NODEDeleteArgs>(args: SelectSubset<T, COURSE_TOPICS_NODEDeleteArgs<ExtArgs>>): Prisma__COURSE_TOPICS_NODEClient<$Result.GetResult<Prisma.$COURSE_TOPICS_NODEPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one COURSE_TOPICS_NODE.
     * @param {COURSE_TOPICS_NODEUpdateArgs} args - Arguments to update one COURSE_TOPICS_NODE.
     * @example
     * // Update one COURSE_TOPICS_NODE
     * const cOURSE_TOPICS_NODE = await prisma.cOURSE_TOPICS_NODE.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends COURSE_TOPICS_NODEUpdateArgs>(args: SelectSubset<T, COURSE_TOPICS_NODEUpdateArgs<ExtArgs>>): Prisma__COURSE_TOPICS_NODEClient<$Result.GetResult<Prisma.$COURSE_TOPICS_NODEPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more COURSE_TOPICS_NODES.
     * @param {COURSE_TOPICS_NODEDeleteManyArgs} args - Arguments to filter COURSE_TOPICS_NODES to delete.
     * @example
     * // Delete a few COURSE_TOPICS_NODES
     * const { count } = await prisma.cOURSE_TOPICS_NODE.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends COURSE_TOPICS_NODEDeleteManyArgs>(args?: SelectSubset<T, COURSE_TOPICS_NODEDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more COURSE_TOPICS_NODES.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_TOPICS_NODEUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many COURSE_TOPICS_NODES
     * const cOURSE_TOPICS_NODE = await prisma.cOURSE_TOPICS_NODE.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends COURSE_TOPICS_NODEUpdateManyArgs>(args: SelectSubset<T, COURSE_TOPICS_NODEUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one COURSE_TOPICS_NODE.
     * @param {COURSE_TOPICS_NODEUpsertArgs} args - Arguments to update or create a COURSE_TOPICS_NODE.
     * @example
     * // Update or create a COURSE_TOPICS_NODE
     * const cOURSE_TOPICS_NODE = await prisma.cOURSE_TOPICS_NODE.upsert({
     *   create: {
     *     // ... data to create a COURSE_TOPICS_NODE
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the COURSE_TOPICS_NODE we want to update
     *   }
     * })
     */
    upsert<T extends COURSE_TOPICS_NODEUpsertArgs>(args: SelectSubset<T, COURSE_TOPICS_NODEUpsertArgs<ExtArgs>>): Prisma__COURSE_TOPICS_NODEClient<$Result.GetResult<Prisma.$COURSE_TOPICS_NODEPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of COURSE_TOPICS_NODES.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_TOPICS_NODECountArgs} args - Arguments to filter COURSE_TOPICS_NODES to count.
     * @example
     * // Count the number of COURSE_TOPICS_NODES
     * const count = await prisma.cOURSE_TOPICS_NODE.count({
     *   where: {
     *     // ... the filter for the COURSE_TOPICS_NODES we want to count
     *   }
     * })
    **/
    count<T extends COURSE_TOPICS_NODECountArgs>(
      args?: Subset<T, COURSE_TOPICS_NODECountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], COURSE_TOPICS_NODECountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a COURSE_TOPICS_NODE.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_TOPICS_NODEAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends COURSE_TOPICS_NODEAggregateArgs>(args: Subset<T, COURSE_TOPICS_NODEAggregateArgs>): Prisma.PrismaPromise<GetCOURSE_TOPICS_NODEAggregateType<T>>

    /**
     * Group by COURSE_TOPICS_NODE.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_TOPICS_NODEGroupByArgs} args - Group by arguments.
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
      T extends COURSE_TOPICS_NODEGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: COURSE_TOPICS_NODEGroupByArgs['orderBy'] }
        : { orderBy?: COURSE_TOPICS_NODEGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, COURSE_TOPICS_NODEGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCOURSE_TOPICS_NODEGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the COURSE_TOPICS_NODE model
   */
  readonly fields: COURSE_TOPICS_NODEFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for COURSE_TOPICS_NODE.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__COURSE_TOPICS_NODEClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    courseNode<T extends COURSE_NODESDefaultArgs<ExtArgs> = {}>(args?: Subset<T, COURSE_NODESDefaultArgs<ExtArgs>>): Prisma__COURSE_NODESClient<$Result.GetResult<Prisma.$COURSE_NODESPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    topicEdgesAsSource<T extends COURSE_TOPICS_NODE$topicEdgesAsSourceArgs<ExtArgs> = {}>(args?: Subset<T, COURSE_TOPICS_NODE$topicEdgesAsSourceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$COURSE_TOPICS_EDGEPayload<ExtArgs>, T, "findMany"> | Null>
    topicEdgesAsTarget<T extends COURSE_TOPICS_NODE$topicEdgesAsTargetArgs<ExtArgs> = {}>(args?: Subset<T, COURSE_TOPICS_NODE$topicEdgesAsTargetArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$COURSE_TOPICS_EDGEPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the COURSE_TOPICS_NODE model
   */ 
  interface COURSE_TOPICS_NODEFieldRefs {
    readonly id: FieldRef<"COURSE_TOPICS_NODE", 'Int'>
    readonly course_node_id: FieldRef<"COURSE_TOPICS_NODE", 'Int'>
    readonly slug: FieldRef<"COURSE_TOPICS_NODE", 'String'>
    readonly title: FieldRef<"COURSE_TOPICS_NODE", 'String'>
    readonly description: FieldRef<"COURSE_TOPICS_NODE", 'String'>
    readonly coords: FieldRef<"COURSE_TOPICS_NODE", 'Json'>
    readonly learning_objectives: FieldRef<"COURSE_TOPICS_NODE", 'String'>
    readonly resources_url: FieldRef<"COURSE_TOPICS_NODE", 'String'>
    readonly created_at: FieldRef<"COURSE_TOPICS_NODE", 'DateTime'>
    readonly updated_at: FieldRef<"COURSE_TOPICS_NODE", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * COURSE_TOPICS_NODE findUnique
   */
  export type COURSE_TOPICS_NODEFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_NODE
     */
    select?: COURSE_TOPICS_NODESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_NODEInclude<ExtArgs> | null
    /**
     * Filter, which COURSE_TOPICS_NODE to fetch.
     */
    where: COURSE_TOPICS_NODEWhereUniqueInput
  }

  /**
   * COURSE_TOPICS_NODE findUniqueOrThrow
   */
  export type COURSE_TOPICS_NODEFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_NODE
     */
    select?: COURSE_TOPICS_NODESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_NODEInclude<ExtArgs> | null
    /**
     * Filter, which COURSE_TOPICS_NODE to fetch.
     */
    where: COURSE_TOPICS_NODEWhereUniqueInput
  }

  /**
   * COURSE_TOPICS_NODE findFirst
   */
  export type COURSE_TOPICS_NODEFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_NODE
     */
    select?: COURSE_TOPICS_NODESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_NODEInclude<ExtArgs> | null
    /**
     * Filter, which COURSE_TOPICS_NODE to fetch.
     */
    where?: COURSE_TOPICS_NODEWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of COURSE_TOPICS_NODES to fetch.
     */
    orderBy?: COURSE_TOPICS_NODEOrderByWithRelationInput | COURSE_TOPICS_NODEOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for COURSE_TOPICS_NODES.
     */
    cursor?: COURSE_TOPICS_NODEWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` COURSE_TOPICS_NODES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` COURSE_TOPICS_NODES.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of COURSE_TOPICS_NODES.
     */
    distinct?: COURSE_TOPICS_NODEScalarFieldEnum | COURSE_TOPICS_NODEScalarFieldEnum[]
  }

  /**
   * COURSE_TOPICS_NODE findFirstOrThrow
   */
  export type COURSE_TOPICS_NODEFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_NODE
     */
    select?: COURSE_TOPICS_NODESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_NODEInclude<ExtArgs> | null
    /**
     * Filter, which COURSE_TOPICS_NODE to fetch.
     */
    where?: COURSE_TOPICS_NODEWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of COURSE_TOPICS_NODES to fetch.
     */
    orderBy?: COURSE_TOPICS_NODEOrderByWithRelationInput | COURSE_TOPICS_NODEOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for COURSE_TOPICS_NODES.
     */
    cursor?: COURSE_TOPICS_NODEWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` COURSE_TOPICS_NODES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` COURSE_TOPICS_NODES.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of COURSE_TOPICS_NODES.
     */
    distinct?: COURSE_TOPICS_NODEScalarFieldEnum | COURSE_TOPICS_NODEScalarFieldEnum[]
  }

  /**
   * COURSE_TOPICS_NODE findMany
   */
  export type COURSE_TOPICS_NODEFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_NODE
     */
    select?: COURSE_TOPICS_NODESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_NODEInclude<ExtArgs> | null
    /**
     * Filter, which COURSE_TOPICS_NODES to fetch.
     */
    where?: COURSE_TOPICS_NODEWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of COURSE_TOPICS_NODES to fetch.
     */
    orderBy?: COURSE_TOPICS_NODEOrderByWithRelationInput | COURSE_TOPICS_NODEOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing COURSE_TOPICS_NODES.
     */
    cursor?: COURSE_TOPICS_NODEWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` COURSE_TOPICS_NODES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` COURSE_TOPICS_NODES.
     */
    skip?: number
    distinct?: COURSE_TOPICS_NODEScalarFieldEnum | COURSE_TOPICS_NODEScalarFieldEnum[]
  }

  /**
   * COURSE_TOPICS_NODE create
   */
  export type COURSE_TOPICS_NODECreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_NODE
     */
    select?: COURSE_TOPICS_NODESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_NODEInclude<ExtArgs> | null
    /**
     * The data needed to create a COURSE_TOPICS_NODE.
     */
    data: XOR<COURSE_TOPICS_NODECreateInput, COURSE_TOPICS_NODEUncheckedCreateInput>
  }

  /**
   * COURSE_TOPICS_NODE createMany
   */
  export type COURSE_TOPICS_NODECreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many COURSE_TOPICS_NODES.
     */
    data: COURSE_TOPICS_NODECreateManyInput | COURSE_TOPICS_NODECreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * COURSE_TOPICS_NODE createManyAndReturn
   */
  export type COURSE_TOPICS_NODECreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_NODE
     */
    select?: COURSE_TOPICS_NODESelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many COURSE_TOPICS_NODES.
     */
    data: COURSE_TOPICS_NODECreateManyInput | COURSE_TOPICS_NODECreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_NODEIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * COURSE_TOPICS_NODE update
   */
  export type COURSE_TOPICS_NODEUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_NODE
     */
    select?: COURSE_TOPICS_NODESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_NODEInclude<ExtArgs> | null
    /**
     * The data needed to update a COURSE_TOPICS_NODE.
     */
    data: XOR<COURSE_TOPICS_NODEUpdateInput, COURSE_TOPICS_NODEUncheckedUpdateInput>
    /**
     * Choose, which COURSE_TOPICS_NODE to update.
     */
    where: COURSE_TOPICS_NODEWhereUniqueInput
  }

  /**
   * COURSE_TOPICS_NODE updateMany
   */
  export type COURSE_TOPICS_NODEUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update COURSE_TOPICS_NODES.
     */
    data: XOR<COURSE_TOPICS_NODEUpdateManyMutationInput, COURSE_TOPICS_NODEUncheckedUpdateManyInput>
    /**
     * Filter which COURSE_TOPICS_NODES to update
     */
    where?: COURSE_TOPICS_NODEWhereInput
  }

  /**
   * COURSE_TOPICS_NODE upsert
   */
  export type COURSE_TOPICS_NODEUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_NODE
     */
    select?: COURSE_TOPICS_NODESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_NODEInclude<ExtArgs> | null
    /**
     * The filter to search for the COURSE_TOPICS_NODE to update in case it exists.
     */
    where: COURSE_TOPICS_NODEWhereUniqueInput
    /**
     * In case the COURSE_TOPICS_NODE found by the `where` argument doesn't exist, create a new COURSE_TOPICS_NODE with this data.
     */
    create: XOR<COURSE_TOPICS_NODECreateInput, COURSE_TOPICS_NODEUncheckedCreateInput>
    /**
     * In case the COURSE_TOPICS_NODE was found with the provided `where` argument, update it with this data.
     */
    update: XOR<COURSE_TOPICS_NODEUpdateInput, COURSE_TOPICS_NODEUncheckedUpdateInput>
  }

  /**
   * COURSE_TOPICS_NODE delete
   */
  export type COURSE_TOPICS_NODEDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_NODE
     */
    select?: COURSE_TOPICS_NODESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_NODEInclude<ExtArgs> | null
    /**
     * Filter which COURSE_TOPICS_NODE to delete.
     */
    where: COURSE_TOPICS_NODEWhereUniqueInput
  }

  /**
   * COURSE_TOPICS_NODE deleteMany
   */
  export type COURSE_TOPICS_NODEDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which COURSE_TOPICS_NODES to delete
     */
    where?: COURSE_TOPICS_NODEWhereInput
  }

  /**
   * COURSE_TOPICS_NODE.topicEdgesAsSource
   */
  export type COURSE_TOPICS_NODE$topicEdgesAsSourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_EDGE
     */
    select?: COURSE_TOPICS_EDGESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_EDGEInclude<ExtArgs> | null
    where?: COURSE_TOPICS_EDGEWhereInput
    orderBy?: COURSE_TOPICS_EDGEOrderByWithRelationInput | COURSE_TOPICS_EDGEOrderByWithRelationInput[]
    cursor?: COURSE_TOPICS_EDGEWhereUniqueInput
    take?: number
    skip?: number
    distinct?: COURSE_TOPICS_EDGEScalarFieldEnum | COURSE_TOPICS_EDGEScalarFieldEnum[]
  }

  /**
   * COURSE_TOPICS_NODE.topicEdgesAsTarget
   */
  export type COURSE_TOPICS_NODE$topicEdgesAsTargetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_EDGE
     */
    select?: COURSE_TOPICS_EDGESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_EDGEInclude<ExtArgs> | null
    where?: COURSE_TOPICS_EDGEWhereInput
    orderBy?: COURSE_TOPICS_EDGEOrderByWithRelationInput | COURSE_TOPICS_EDGEOrderByWithRelationInput[]
    cursor?: COURSE_TOPICS_EDGEWhereUniqueInput
    take?: number
    skip?: number
    distinct?: COURSE_TOPICS_EDGEScalarFieldEnum | COURSE_TOPICS_EDGEScalarFieldEnum[]
  }

  /**
   * COURSE_TOPICS_NODE without action
   */
  export type COURSE_TOPICS_NODEDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_NODE
     */
    select?: COURSE_TOPICS_NODESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_NODEInclude<ExtArgs> | null
  }


  /**
   * Model COURSE_TOPICS_EDGE
   */

  export type AggregateCOURSE_TOPICS_EDGE = {
    _count: COURSE_TOPICS_EDGECountAggregateOutputType | null
    _avg: COURSE_TOPICS_EDGEAvgAggregateOutputType | null
    _sum: COURSE_TOPICS_EDGESumAggregateOutputType | null
    _min: COURSE_TOPICS_EDGEMinAggregateOutputType | null
    _max: COURSE_TOPICS_EDGEMaxAggregateOutputType | null
  }

  export type COURSE_TOPICS_EDGEAvgAggregateOutputType = {
    id: number | null
    source_topic_id: number | null
    target_topic_id: number | null
  }

  export type COURSE_TOPICS_EDGESumAggregateOutputType = {
    id: number | null
    source_topic_id: number | null
    target_topic_id: number | null
  }

  export type COURSE_TOPICS_EDGEMinAggregateOutputType = {
    id: number | null
    source_topic_id: number | null
    target_topic_id: number | null
    created_at: Date | null
  }

  export type COURSE_TOPICS_EDGEMaxAggregateOutputType = {
    id: number | null
    source_topic_id: number | null
    target_topic_id: number | null
    created_at: Date | null
  }

  export type COURSE_TOPICS_EDGECountAggregateOutputType = {
    id: number
    source_topic_id: number
    target_topic_id: number
    created_at: number
    _all: number
  }


  export type COURSE_TOPICS_EDGEAvgAggregateInputType = {
    id?: true
    source_topic_id?: true
    target_topic_id?: true
  }

  export type COURSE_TOPICS_EDGESumAggregateInputType = {
    id?: true
    source_topic_id?: true
    target_topic_id?: true
  }

  export type COURSE_TOPICS_EDGEMinAggregateInputType = {
    id?: true
    source_topic_id?: true
    target_topic_id?: true
    created_at?: true
  }

  export type COURSE_TOPICS_EDGEMaxAggregateInputType = {
    id?: true
    source_topic_id?: true
    target_topic_id?: true
    created_at?: true
  }

  export type COURSE_TOPICS_EDGECountAggregateInputType = {
    id?: true
    source_topic_id?: true
    target_topic_id?: true
    created_at?: true
    _all?: true
  }

  export type COURSE_TOPICS_EDGEAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which COURSE_TOPICS_EDGE to aggregate.
     */
    where?: COURSE_TOPICS_EDGEWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of COURSE_TOPICS_EDGES to fetch.
     */
    orderBy?: COURSE_TOPICS_EDGEOrderByWithRelationInput | COURSE_TOPICS_EDGEOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: COURSE_TOPICS_EDGEWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` COURSE_TOPICS_EDGES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` COURSE_TOPICS_EDGES.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned COURSE_TOPICS_EDGES
    **/
    _count?: true | COURSE_TOPICS_EDGECountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: COURSE_TOPICS_EDGEAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: COURSE_TOPICS_EDGESumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: COURSE_TOPICS_EDGEMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: COURSE_TOPICS_EDGEMaxAggregateInputType
  }

  export type GetCOURSE_TOPICS_EDGEAggregateType<T extends COURSE_TOPICS_EDGEAggregateArgs> = {
        [P in keyof T & keyof AggregateCOURSE_TOPICS_EDGE]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCOURSE_TOPICS_EDGE[P]>
      : GetScalarType<T[P], AggregateCOURSE_TOPICS_EDGE[P]>
  }




  export type COURSE_TOPICS_EDGEGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: COURSE_TOPICS_EDGEWhereInput
    orderBy?: COURSE_TOPICS_EDGEOrderByWithAggregationInput | COURSE_TOPICS_EDGEOrderByWithAggregationInput[]
    by: COURSE_TOPICS_EDGEScalarFieldEnum[] | COURSE_TOPICS_EDGEScalarFieldEnum
    having?: COURSE_TOPICS_EDGEScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: COURSE_TOPICS_EDGECountAggregateInputType | true
    _avg?: COURSE_TOPICS_EDGEAvgAggregateInputType
    _sum?: COURSE_TOPICS_EDGESumAggregateInputType
    _min?: COURSE_TOPICS_EDGEMinAggregateInputType
    _max?: COURSE_TOPICS_EDGEMaxAggregateInputType
  }

  export type COURSE_TOPICS_EDGEGroupByOutputType = {
    id: number
    source_topic_id: number
    target_topic_id: number
    created_at: Date
    _count: COURSE_TOPICS_EDGECountAggregateOutputType | null
    _avg: COURSE_TOPICS_EDGEAvgAggregateOutputType | null
    _sum: COURSE_TOPICS_EDGESumAggregateOutputType | null
    _min: COURSE_TOPICS_EDGEMinAggregateOutputType | null
    _max: COURSE_TOPICS_EDGEMaxAggregateOutputType | null
  }

  type GetCOURSE_TOPICS_EDGEGroupByPayload<T extends COURSE_TOPICS_EDGEGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<COURSE_TOPICS_EDGEGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof COURSE_TOPICS_EDGEGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], COURSE_TOPICS_EDGEGroupByOutputType[P]>
            : GetScalarType<T[P], COURSE_TOPICS_EDGEGroupByOutputType[P]>
        }
      >
    >


  export type COURSE_TOPICS_EDGESelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source_topic_id?: boolean
    target_topic_id?: boolean
    created_at?: boolean
    sourceTopic?: boolean | COURSE_TOPICS_NODEDefaultArgs<ExtArgs>
    targetTopic?: boolean | COURSE_TOPICS_NODEDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cOURSE_TOPICS_EDGE"]>

  export type COURSE_TOPICS_EDGESelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source_topic_id?: boolean
    target_topic_id?: boolean
    created_at?: boolean
    sourceTopic?: boolean | COURSE_TOPICS_NODEDefaultArgs<ExtArgs>
    targetTopic?: boolean | COURSE_TOPICS_NODEDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cOURSE_TOPICS_EDGE"]>

  export type COURSE_TOPICS_EDGESelectScalar = {
    id?: boolean
    source_topic_id?: boolean
    target_topic_id?: boolean
    created_at?: boolean
  }

  export type COURSE_TOPICS_EDGEInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sourceTopic?: boolean | COURSE_TOPICS_NODEDefaultArgs<ExtArgs>
    targetTopic?: boolean | COURSE_TOPICS_NODEDefaultArgs<ExtArgs>
  }
  export type COURSE_TOPICS_EDGEIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sourceTopic?: boolean | COURSE_TOPICS_NODEDefaultArgs<ExtArgs>
    targetTopic?: boolean | COURSE_TOPICS_NODEDefaultArgs<ExtArgs>
  }

  export type $COURSE_TOPICS_EDGEPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "COURSE_TOPICS_EDGE"
    objects: {
      sourceTopic: Prisma.$COURSE_TOPICS_NODEPayload<ExtArgs>
      targetTopic: Prisma.$COURSE_TOPICS_NODEPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      source_topic_id: number
      target_topic_id: number
      created_at: Date
    }, ExtArgs["result"]["cOURSE_TOPICS_EDGE"]>
    composites: {}
  }

  type COURSE_TOPICS_EDGEGetPayload<S extends boolean | null | undefined | COURSE_TOPICS_EDGEDefaultArgs> = $Result.GetResult<Prisma.$COURSE_TOPICS_EDGEPayload, S>

  type COURSE_TOPICS_EDGECountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<COURSE_TOPICS_EDGEFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: COURSE_TOPICS_EDGECountAggregateInputType | true
    }

  export interface COURSE_TOPICS_EDGEDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['COURSE_TOPICS_EDGE'], meta: { name: 'COURSE_TOPICS_EDGE' } }
    /**
     * Find zero or one COURSE_TOPICS_EDGE that matches the filter.
     * @param {COURSE_TOPICS_EDGEFindUniqueArgs} args - Arguments to find a COURSE_TOPICS_EDGE
     * @example
     * // Get one COURSE_TOPICS_EDGE
     * const cOURSE_TOPICS_EDGE = await prisma.cOURSE_TOPICS_EDGE.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends COURSE_TOPICS_EDGEFindUniqueArgs>(args: SelectSubset<T, COURSE_TOPICS_EDGEFindUniqueArgs<ExtArgs>>): Prisma__COURSE_TOPICS_EDGEClient<$Result.GetResult<Prisma.$COURSE_TOPICS_EDGEPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one COURSE_TOPICS_EDGE that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {COURSE_TOPICS_EDGEFindUniqueOrThrowArgs} args - Arguments to find a COURSE_TOPICS_EDGE
     * @example
     * // Get one COURSE_TOPICS_EDGE
     * const cOURSE_TOPICS_EDGE = await prisma.cOURSE_TOPICS_EDGE.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends COURSE_TOPICS_EDGEFindUniqueOrThrowArgs>(args: SelectSubset<T, COURSE_TOPICS_EDGEFindUniqueOrThrowArgs<ExtArgs>>): Prisma__COURSE_TOPICS_EDGEClient<$Result.GetResult<Prisma.$COURSE_TOPICS_EDGEPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first COURSE_TOPICS_EDGE that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_TOPICS_EDGEFindFirstArgs} args - Arguments to find a COURSE_TOPICS_EDGE
     * @example
     * // Get one COURSE_TOPICS_EDGE
     * const cOURSE_TOPICS_EDGE = await prisma.cOURSE_TOPICS_EDGE.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends COURSE_TOPICS_EDGEFindFirstArgs>(args?: SelectSubset<T, COURSE_TOPICS_EDGEFindFirstArgs<ExtArgs>>): Prisma__COURSE_TOPICS_EDGEClient<$Result.GetResult<Prisma.$COURSE_TOPICS_EDGEPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first COURSE_TOPICS_EDGE that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_TOPICS_EDGEFindFirstOrThrowArgs} args - Arguments to find a COURSE_TOPICS_EDGE
     * @example
     * // Get one COURSE_TOPICS_EDGE
     * const cOURSE_TOPICS_EDGE = await prisma.cOURSE_TOPICS_EDGE.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends COURSE_TOPICS_EDGEFindFirstOrThrowArgs>(args?: SelectSubset<T, COURSE_TOPICS_EDGEFindFirstOrThrowArgs<ExtArgs>>): Prisma__COURSE_TOPICS_EDGEClient<$Result.GetResult<Prisma.$COURSE_TOPICS_EDGEPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more COURSE_TOPICS_EDGES that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_TOPICS_EDGEFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all COURSE_TOPICS_EDGES
     * const cOURSE_TOPICS_EDGES = await prisma.cOURSE_TOPICS_EDGE.findMany()
     * 
     * // Get first 10 COURSE_TOPICS_EDGES
     * const cOURSE_TOPICS_EDGES = await prisma.cOURSE_TOPICS_EDGE.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cOURSE_TOPICS_EDGEWithIdOnly = await prisma.cOURSE_TOPICS_EDGE.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends COURSE_TOPICS_EDGEFindManyArgs>(args?: SelectSubset<T, COURSE_TOPICS_EDGEFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$COURSE_TOPICS_EDGEPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a COURSE_TOPICS_EDGE.
     * @param {COURSE_TOPICS_EDGECreateArgs} args - Arguments to create a COURSE_TOPICS_EDGE.
     * @example
     * // Create one COURSE_TOPICS_EDGE
     * const COURSE_TOPICS_EDGE = await prisma.cOURSE_TOPICS_EDGE.create({
     *   data: {
     *     // ... data to create a COURSE_TOPICS_EDGE
     *   }
     * })
     * 
     */
    create<T extends COURSE_TOPICS_EDGECreateArgs>(args: SelectSubset<T, COURSE_TOPICS_EDGECreateArgs<ExtArgs>>): Prisma__COURSE_TOPICS_EDGEClient<$Result.GetResult<Prisma.$COURSE_TOPICS_EDGEPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many COURSE_TOPICS_EDGES.
     * @param {COURSE_TOPICS_EDGECreateManyArgs} args - Arguments to create many COURSE_TOPICS_EDGES.
     * @example
     * // Create many COURSE_TOPICS_EDGES
     * const cOURSE_TOPICS_EDGE = await prisma.cOURSE_TOPICS_EDGE.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends COURSE_TOPICS_EDGECreateManyArgs>(args?: SelectSubset<T, COURSE_TOPICS_EDGECreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many COURSE_TOPICS_EDGES and returns the data saved in the database.
     * @param {COURSE_TOPICS_EDGECreateManyAndReturnArgs} args - Arguments to create many COURSE_TOPICS_EDGES.
     * @example
     * // Create many COURSE_TOPICS_EDGES
     * const cOURSE_TOPICS_EDGE = await prisma.cOURSE_TOPICS_EDGE.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many COURSE_TOPICS_EDGES and only return the `id`
     * const cOURSE_TOPICS_EDGEWithIdOnly = await prisma.cOURSE_TOPICS_EDGE.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends COURSE_TOPICS_EDGECreateManyAndReturnArgs>(args?: SelectSubset<T, COURSE_TOPICS_EDGECreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$COURSE_TOPICS_EDGEPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a COURSE_TOPICS_EDGE.
     * @param {COURSE_TOPICS_EDGEDeleteArgs} args - Arguments to delete one COURSE_TOPICS_EDGE.
     * @example
     * // Delete one COURSE_TOPICS_EDGE
     * const COURSE_TOPICS_EDGE = await prisma.cOURSE_TOPICS_EDGE.delete({
     *   where: {
     *     // ... filter to delete one COURSE_TOPICS_EDGE
     *   }
     * })
     * 
     */
    delete<T extends COURSE_TOPICS_EDGEDeleteArgs>(args: SelectSubset<T, COURSE_TOPICS_EDGEDeleteArgs<ExtArgs>>): Prisma__COURSE_TOPICS_EDGEClient<$Result.GetResult<Prisma.$COURSE_TOPICS_EDGEPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one COURSE_TOPICS_EDGE.
     * @param {COURSE_TOPICS_EDGEUpdateArgs} args - Arguments to update one COURSE_TOPICS_EDGE.
     * @example
     * // Update one COURSE_TOPICS_EDGE
     * const cOURSE_TOPICS_EDGE = await prisma.cOURSE_TOPICS_EDGE.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends COURSE_TOPICS_EDGEUpdateArgs>(args: SelectSubset<T, COURSE_TOPICS_EDGEUpdateArgs<ExtArgs>>): Prisma__COURSE_TOPICS_EDGEClient<$Result.GetResult<Prisma.$COURSE_TOPICS_EDGEPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more COURSE_TOPICS_EDGES.
     * @param {COURSE_TOPICS_EDGEDeleteManyArgs} args - Arguments to filter COURSE_TOPICS_EDGES to delete.
     * @example
     * // Delete a few COURSE_TOPICS_EDGES
     * const { count } = await prisma.cOURSE_TOPICS_EDGE.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends COURSE_TOPICS_EDGEDeleteManyArgs>(args?: SelectSubset<T, COURSE_TOPICS_EDGEDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more COURSE_TOPICS_EDGES.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_TOPICS_EDGEUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many COURSE_TOPICS_EDGES
     * const cOURSE_TOPICS_EDGE = await prisma.cOURSE_TOPICS_EDGE.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends COURSE_TOPICS_EDGEUpdateManyArgs>(args: SelectSubset<T, COURSE_TOPICS_EDGEUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one COURSE_TOPICS_EDGE.
     * @param {COURSE_TOPICS_EDGEUpsertArgs} args - Arguments to update or create a COURSE_TOPICS_EDGE.
     * @example
     * // Update or create a COURSE_TOPICS_EDGE
     * const cOURSE_TOPICS_EDGE = await prisma.cOURSE_TOPICS_EDGE.upsert({
     *   create: {
     *     // ... data to create a COURSE_TOPICS_EDGE
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the COURSE_TOPICS_EDGE we want to update
     *   }
     * })
     */
    upsert<T extends COURSE_TOPICS_EDGEUpsertArgs>(args: SelectSubset<T, COURSE_TOPICS_EDGEUpsertArgs<ExtArgs>>): Prisma__COURSE_TOPICS_EDGEClient<$Result.GetResult<Prisma.$COURSE_TOPICS_EDGEPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of COURSE_TOPICS_EDGES.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_TOPICS_EDGECountArgs} args - Arguments to filter COURSE_TOPICS_EDGES to count.
     * @example
     * // Count the number of COURSE_TOPICS_EDGES
     * const count = await prisma.cOURSE_TOPICS_EDGE.count({
     *   where: {
     *     // ... the filter for the COURSE_TOPICS_EDGES we want to count
     *   }
     * })
    **/
    count<T extends COURSE_TOPICS_EDGECountArgs>(
      args?: Subset<T, COURSE_TOPICS_EDGECountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], COURSE_TOPICS_EDGECountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a COURSE_TOPICS_EDGE.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_TOPICS_EDGEAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends COURSE_TOPICS_EDGEAggregateArgs>(args: Subset<T, COURSE_TOPICS_EDGEAggregateArgs>): Prisma.PrismaPromise<GetCOURSE_TOPICS_EDGEAggregateType<T>>

    /**
     * Group by COURSE_TOPICS_EDGE.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {COURSE_TOPICS_EDGEGroupByArgs} args - Group by arguments.
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
      T extends COURSE_TOPICS_EDGEGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: COURSE_TOPICS_EDGEGroupByArgs['orderBy'] }
        : { orderBy?: COURSE_TOPICS_EDGEGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, COURSE_TOPICS_EDGEGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCOURSE_TOPICS_EDGEGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the COURSE_TOPICS_EDGE model
   */
  readonly fields: COURSE_TOPICS_EDGEFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for COURSE_TOPICS_EDGE.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__COURSE_TOPICS_EDGEClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sourceTopic<T extends COURSE_TOPICS_NODEDefaultArgs<ExtArgs> = {}>(args?: Subset<T, COURSE_TOPICS_NODEDefaultArgs<ExtArgs>>): Prisma__COURSE_TOPICS_NODEClient<$Result.GetResult<Prisma.$COURSE_TOPICS_NODEPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    targetTopic<T extends COURSE_TOPICS_NODEDefaultArgs<ExtArgs> = {}>(args?: Subset<T, COURSE_TOPICS_NODEDefaultArgs<ExtArgs>>): Prisma__COURSE_TOPICS_NODEClient<$Result.GetResult<Prisma.$COURSE_TOPICS_NODEPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the COURSE_TOPICS_EDGE model
   */ 
  interface COURSE_TOPICS_EDGEFieldRefs {
    readonly id: FieldRef<"COURSE_TOPICS_EDGE", 'Int'>
    readonly source_topic_id: FieldRef<"COURSE_TOPICS_EDGE", 'Int'>
    readonly target_topic_id: FieldRef<"COURSE_TOPICS_EDGE", 'Int'>
    readonly created_at: FieldRef<"COURSE_TOPICS_EDGE", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * COURSE_TOPICS_EDGE findUnique
   */
  export type COURSE_TOPICS_EDGEFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_EDGE
     */
    select?: COURSE_TOPICS_EDGESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_EDGEInclude<ExtArgs> | null
    /**
     * Filter, which COURSE_TOPICS_EDGE to fetch.
     */
    where: COURSE_TOPICS_EDGEWhereUniqueInput
  }

  /**
   * COURSE_TOPICS_EDGE findUniqueOrThrow
   */
  export type COURSE_TOPICS_EDGEFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_EDGE
     */
    select?: COURSE_TOPICS_EDGESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_EDGEInclude<ExtArgs> | null
    /**
     * Filter, which COURSE_TOPICS_EDGE to fetch.
     */
    where: COURSE_TOPICS_EDGEWhereUniqueInput
  }

  /**
   * COURSE_TOPICS_EDGE findFirst
   */
  export type COURSE_TOPICS_EDGEFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_EDGE
     */
    select?: COURSE_TOPICS_EDGESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_EDGEInclude<ExtArgs> | null
    /**
     * Filter, which COURSE_TOPICS_EDGE to fetch.
     */
    where?: COURSE_TOPICS_EDGEWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of COURSE_TOPICS_EDGES to fetch.
     */
    orderBy?: COURSE_TOPICS_EDGEOrderByWithRelationInput | COURSE_TOPICS_EDGEOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for COURSE_TOPICS_EDGES.
     */
    cursor?: COURSE_TOPICS_EDGEWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` COURSE_TOPICS_EDGES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` COURSE_TOPICS_EDGES.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of COURSE_TOPICS_EDGES.
     */
    distinct?: COURSE_TOPICS_EDGEScalarFieldEnum | COURSE_TOPICS_EDGEScalarFieldEnum[]
  }

  /**
   * COURSE_TOPICS_EDGE findFirstOrThrow
   */
  export type COURSE_TOPICS_EDGEFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_EDGE
     */
    select?: COURSE_TOPICS_EDGESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_EDGEInclude<ExtArgs> | null
    /**
     * Filter, which COURSE_TOPICS_EDGE to fetch.
     */
    where?: COURSE_TOPICS_EDGEWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of COURSE_TOPICS_EDGES to fetch.
     */
    orderBy?: COURSE_TOPICS_EDGEOrderByWithRelationInput | COURSE_TOPICS_EDGEOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for COURSE_TOPICS_EDGES.
     */
    cursor?: COURSE_TOPICS_EDGEWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` COURSE_TOPICS_EDGES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` COURSE_TOPICS_EDGES.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of COURSE_TOPICS_EDGES.
     */
    distinct?: COURSE_TOPICS_EDGEScalarFieldEnum | COURSE_TOPICS_EDGEScalarFieldEnum[]
  }

  /**
   * COURSE_TOPICS_EDGE findMany
   */
  export type COURSE_TOPICS_EDGEFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_EDGE
     */
    select?: COURSE_TOPICS_EDGESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_EDGEInclude<ExtArgs> | null
    /**
     * Filter, which COURSE_TOPICS_EDGES to fetch.
     */
    where?: COURSE_TOPICS_EDGEWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of COURSE_TOPICS_EDGES to fetch.
     */
    orderBy?: COURSE_TOPICS_EDGEOrderByWithRelationInput | COURSE_TOPICS_EDGEOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing COURSE_TOPICS_EDGES.
     */
    cursor?: COURSE_TOPICS_EDGEWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` COURSE_TOPICS_EDGES from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` COURSE_TOPICS_EDGES.
     */
    skip?: number
    distinct?: COURSE_TOPICS_EDGEScalarFieldEnum | COURSE_TOPICS_EDGEScalarFieldEnum[]
  }

  /**
   * COURSE_TOPICS_EDGE create
   */
  export type COURSE_TOPICS_EDGECreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_EDGE
     */
    select?: COURSE_TOPICS_EDGESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_EDGEInclude<ExtArgs> | null
    /**
     * The data needed to create a COURSE_TOPICS_EDGE.
     */
    data: XOR<COURSE_TOPICS_EDGECreateInput, COURSE_TOPICS_EDGEUncheckedCreateInput>
  }

  /**
   * COURSE_TOPICS_EDGE createMany
   */
  export type COURSE_TOPICS_EDGECreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many COURSE_TOPICS_EDGES.
     */
    data: COURSE_TOPICS_EDGECreateManyInput | COURSE_TOPICS_EDGECreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * COURSE_TOPICS_EDGE createManyAndReturn
   */
  export type COURSE_TOPICS_EDGECreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_EDGE
     */
    select?: COURSE_TOPICS_EDGESelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many COURSE_TOPICS_EDGES.
     */
    data: COURSE_TOPICS_EDGECreateManyInput | COURSE_TOPICS_EDGECreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_EDGEIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * COURSE_TOPICS_EDGE update
   */
  export type COURSE_TOPICS_EDGEUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_EDGE
     */
    select?: COURSE_TOPICS_EDGESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_EDGEInclude<ExtArgs> | null
    /**
     * The data needed to update a COURSE_TOPICS_EDGE.
     */
    data: XOR<COURSE_TOPICS_EDGEUpdateInput, COURSE_TOPICS_EDGEUncheckedUpdateInput>
    /**
     * Choose, which COURSE_TOPICS_EDGE to update.
     */
    where: COURSE_TOPICS_EDGEWhereUniqueInput
  }

  /**
   * COURSE_TOPICS_EDGE updateMany
   */
  export type COURSE_TOPICS_EDGEUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update COURSE_TOPICS_EDGES.
     */
    data: XOR<COURSE_TOPICS_EDGEUpdateManyMutationInput, COURSE_TOPICS_EDGEUncheckedUpdateManyInput>
    /**
     * Filter which COURSE_TOPICS_EDGES to update
     */
    where?: COURSE_TOPICS_EDGEWhereInput
  }

  /**
   * COURSE_TOPICS_EDGE upsert
   */
  export type COURSE_TOPICS_EDGEUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_EDGE
     */
    select?: COURSE_TOPICS_EDGESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_EDGEInclude<ExtArgs> | null
    /**
     * The filter to search for the COURSE_TOPICS_EDGE to update in case it exists.
     */
    where: COURSE_TOPICS_EDGEWhereUniqueInput
    /**
     * In case the COURSE_TOPICS_EDGE found by the `where` argument doesn't exist, create a new COURSE_TOPICS_EDGE with this data.
     */
    create: XOR<COURSE_TOPICS_EDGECreateInput, COURSE_TOPICS_EDGEUncheckedCreateInput>
    /**
     * In case the COURSE_TOPICS_EDGE was found with the provided `where` argument, update it with this data.
     */
    update: XOR<COURSE_TOPICS_EDGEUpdateInput, COURSE_TOPICS_EDGEUncheckedUpdateInput>
  }

  /**
   * COURSE_TOPICS_EDGE delete
   */
  export type COURSE_TOPICS_EDGEDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_EDGE
     */
    select?: COURSE_TOPICS_EDGESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_EDGEInclude<ExtArgs> | null
    /**
     * Filter which COURSE_TOPICS_EDGE to delete.
     */
    where: COURSE_TOPICS_EDGEWhereUniqueInput
  }

  /**
   * COURSE_TOPICS_EDGE deleteMany
   */
  export type COURSE_TOPICS_EDGEDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which COURSE_TOPICS_EDGES to delete
     */
    where?: COURSE_TOPICS_EDGEWhereInput
  }

  /**
   * COURSE_TOPICS_EDGE without action
   */
  export type COURSE_TOPICS_EDGEDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the COURSE_TOPICS_EDGE
     */
    select?: COURSE_TOPICS_EDGESelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: COURSE_TOPICS_EDGEInclude<ExtArgs> | null
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


  export const DEPARTMENTSScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    name: 'name',
    description: 'description',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type DEPARTMENTSScalarFieldEnum = (typeof DEPARTMENTSScalarFieldEnum)[keyof typeof DEPARTMENTSScalarFieldEnum]


  export const MAJOR_ROADMAPSScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    name: 'name',
    total_credits: 'total_credits',
    description: 'description',
    department_id: 'department_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type MAJOR_ROADMAPSScalarFieldEnum = (typeof MAJOR_ROADMAPSScalarFieldEnum)[keyof typeof MAJOR_ROADMAPSScalarFieldEnum]


  export const COURSE_NODESScalarFieldEnum: {
    id: 'id',
    roadmap_id: 'roadmap_id',
    slug: 'slug',
    name: 'name',
    coords: 'coords',
    credits: 'credits',
    description: 'description',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type COURSE_NODESScalarFieldEnum = (typeof COURSE_NODESScalarFieldEnum)[keyof typeof COURSE_NODESScalarFieldEnum]


  export const COURSE_NODE_PREREQUISITESScalarFieldEnum: {
    id: 'id',
    course_node_id: 'course_node_id',
    prerequisite_node_id: 'prerequisite_node_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type COURSE_NODE_PREREQUISITESScalarFieldEnum = (typeof COURSE_NODE_PREREQUISITESScalarFieldEnum)[keyof typeof COURSE_NODE_PREREQUISITESScalarFieldEnum]


  export const COURSE_TOPICS_NODEScalarFieldEnum: {
    id: 'id',
    course_node_id: 'course_node_id',
    slug: 'slug',
    title: 'title',
    description: 'description',
    coords: 'coords',
    learning_objectives: 'learning_objectives',
    resources_url: 'resources_url',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type COURSE_TOPICS_NODEScalarFieldEnum = (typeof COURSE_TOPICS_NODEScalarFieldEnum)[keyof typeof COURSE_TOPICS_NODEScalarFieldEnum]


  export const COURSE_TOPICS_EDGEScalarFieldEnum: {
    id: 'id',
    source_topic_id: 'source_topic_id',
    target_topic_id: 'target_topic_id',
    created_at: 'created_at'
  };

  export type COURSE_TOPICS_EDGEScalarFieldEnum = (typeof COURSE_TOPICS_EDGEScalarFieldEnum)[keyof typeof COURSE_TOPICS_EDGEScalarFieldEnum]


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
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


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


  export type DEPARTMENTSWhereInput = {
    AND?: DEPARTMENTSWhereInput | DEPARTMENTSWhereInput[]
    OR?: DEPARTMENTSWhereInput[]
    NOT?: DEPARTMENTSWhereInput | DEPARTMENTSWhereInput[]
    id?: IntFilter<"DEPARTMENTS"> | number
    slug?: StringFilter<"DEPARTMENTS"> | string
    name?: StringFilter<"DEPARTMENTS"> | string
    description?: StringNullableFilter<"DEPARTMENTS"> | string | null
    created_at?: DateTimeFilter<"DEPARTMENTS"> | Date | string
    updated_at?: DateTimeFilter<"DEPARTMENTS"> | Date | string
    roadmaps?: MAJOR_ROADMAPSListRelationFilter
  }

  export type DEPARTMENTSOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    roadmaps?: MAJOR_ROADMAPSOrderByRelationAggregateInput
  }

  export type DEPARTMENTSWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: DEPARTMENTSWhereInput | DEPARTMENTSWhereInput[]
    OR?: DEPARTMENTSWhereInput[]
    NOT?: DEPARTMENTSWhereInput | DEPARTMENTSWhereInput[]
    name?: StringFilter<"DEPARTMENTS"> | string
    description?: StringNullableFilter<"DEPARTMENTS"> | string | null
    created_at?: DateTimeFilter<"DEPARTMENTS"> | Date | string
    updated_at?: DateTimeFilter<"DEPARTMENTS"> | Date | string
    roadmaps?: MAJOR_ROADMAPSListRelationFilter
  }, "id" | "slug">

  export type DEPARTMENTSOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: DEPARTMENTSCountOrderByAggregateInput
    _avg?: DEPARTMENTSAvgOrderByAggregateInput
    _max?: DEPARTMENTSMaxOrderByAggregateInput
    _min?: DEPARTMENTSMinOrderByAggregateInput
    _sum?: DEPARTMENTSSumOrderByAggregateInput
  }

  export type DEPARTMENTSScalarWhereWithAggregatesInput = {
    AND?: DEPARTMENTSScalarWhereWithAggregatesInput | DEPARTMENTSScalarWhereWithAggregatesInput[]
    OR?: DEPARTMENTSScalarWhereWithAggregatesInput[]
    NOT?: DEPARTMENTSScalarWhereWithAggregatesInput | DEPARTMENTSScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DEPARTMENTS"> | number
    slug?: StringWithAggregatesFilter<"DEPARTMENTS"> | string
    name?: StringWithAggregatesFilter<"DEPARTMENTS"> | string
    description?: StringNullableWithAggregatesFilter<"DEPARTMENTS"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"DEPARTMENTS"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"DEPARTMENTS"> | Date | string
  }

  export type MAJOR_ROADMAPSWhereInput = {
    AND?: MAJOR_ROADMAPSWhereInput | MAJOR_ROADMAPSWhereInput[]
    OR?: MAJOR_ROADMAPSWhereInput[]
    NOT?: MAJOR_ROADMAPSWhereInput | MAJOR_ROADMAPSWhereInput[]
    id?: IntFilter<"MAJOR_ROADMAPS"> | number
    slug?: StringFilter<"MAJOR_ROADMAPS"> | string
    name?: StringFilter<"MAJOR_ROADMAPS"> | string
    total_credits?: IntFilter<"MAJOR_ROADMAPS"> | number
    description?: StringNullableFilter<"MAJOR_ROADMAPS"> | string | null
    department_id?: IntFilter<"MAJOR_ROADMAPS"> | number
    created_at?: DateTimeFilter<"MAJOR_ROADMAPS"> | Date | string
    updated_at?: DateTimeFilter<"MAJOR_ROADMAPS"> | Date | string
    department?: XOR<DEPARTMENTSRelationFilter, DEPARTMENTSWhereInput>
    courseNodes?: COURSE_NODESListRelationFilter
  }

  export type MAJOR_ROADMAPSOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    total_credits?: SortOrder
    description?: SortOrderInput | SortOrder
    department_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    department?: DEPARTMENTSOrderByWithRelationInput
    courseNodes?: COURSE_NODESOrderByRelationAggregateInput
  }

  export type MAJOR_ROADMAPSWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: MAJOR_ROADMAPSWhereInput | MAJOR_ROADMAPSWhereInput[]
    OR?: MAJOR_ROADMAPSWhereInput[]
    NOT?: MAJOR_ROADMAPSWhereInput | MAJOR_ROADMAPSWhereInput[]
    name?: StringFilter<"MAJOR_ROADMAPS"> | string
    total_credits?: IntFilter<"MAJOR_ROADMAPS"> | number
    description?: StringNullableFilter<"MAJOR_ROADMAPS"> | string | null
    department_id?: IntFilter<"MAJOR_ROADMAPS"> | number
    created_at?: DateTimeFilter<"MAJOR_ROADMAPS"> | Date | string
    updated_at?: DateTimeFilter<"MAJOR_ROADMAPS"> | Date | string
    department?: XOR<DEPARTMENTSRelationFilter, DEPARTMENTSWhereInput>
    courseNodes?: COURSE_NODESListRelationFilter
  }, "id" | "slug">

  export type MAJOR_ROADMAPSOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    total_credits?: SortOrder
    description?: SortOrderInput | SortOrder
    department_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: MAJOR_ROADMAPSCountOrderByAggregateInput
    _avg?: MAJOR_ROADMAPSAvgOrderByAggregateInput
    _max?: MAJOR_ROADMAPSMaxOrderByAggregateInput
    _min?: MAJOR_ROADMAPSMinOrderByAggregateInput
    _sum?: MAJOR_ROADMAPSSumOrderByAggregateInput
  }

  export type MAJOR_ROADMAPSScalarWhereWithAggregatesInput = {
    AND?: MAJOR_ROADMAPSScalarWhereWithAggregatesInput | MAJOR_ROADMAPSScalarWhereWithAggregatesInput[]
    OR?: MAJOR_ROADMAPSScalarWhereWithAggregatesInput[]
    NOT?: MAJOR_ROADMAPSScalarWhereWithAggregatesInput | MAJOR_ROADMAPSScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MAJOR_ROADMAPS"> | number
    slug?: StringWithAggregatesFilter<"MAJOR_ROADMAPS"> | string
    name?: StringWithAggregatesFilter<"MAJOR_ROADMAPS"> | string
    total_credits?: IntWithAggregatesFilter<"MAJOR_ROADMAPS"> | number
    description?: StringNullableWithAggregatesFilter<"MAJOR_ROADMAPS"> | string | null
    department_id?: IntWithAggregatesFilter<"MAJOR_ROADMAPS"> | number
    created_at?: DateTimeWithAggregatesFilter<"MAJOR_ROADMAPS"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"MAJOR_ROADMAPS"> | Date | string
  }

  export type COURSE_NODESWhereInput = {
    AND?: COURSE_NODESWhereInput | COURSE_NODESWhereInput[]
    OR?: COURSE_NODESWhereInput[]
    NOT?: COURSE_NODESWhereInput | COURSE_NODESWhereInput[]
    id?: IntFilter<"COURSE_NODES"> | number
    roadmap_id?: IntFilter<"COURSE_NODES"> | number
    slug?: StringFilter<"COURSE_NODES"> | string
    name?: StringFilter<"COURSE_NODES"> | string
    coords?: JsonNullableFilter<"COURSE_NODES">
    credits?: IntFilter<"COURSE_NODES"> | number
    description?: StringNullableFilter<"COURSE_NODES"> | string | null
    created_at?: DateTimeFilter<"COURSE_NODES"> | Date | string
    updated_at?: DateTimeFilter<"COURSE_NODES"> | Date | string
    roadmap?: XOR<MAJOR_ROADMAPSRelationFilter, MAJOR_ROADMAPSWhereInput>
    courseTopics?: COURSE_TOPICS_NODEListRelationFilter
    prerequisitesAsSource?: COURSE_NODE_PREREQUISITESListRelationFilter
    prerequisitesAsTarget?: COURSE_NODE_PREREQUISITESListRelationFilter
  }

  export type COURSE_NODESOrderByWithRelationInput = {
    id?: SortOrder
    roadmap_id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    coords?: SortOrderInput | SortOrder
    credits?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    roadmap?: MAJOR_ROADMAPSOrderByWithRelationInput
    courseTopics?: COURSE_TOPICS_NODEOrderByRelationAggregateInput
    prerequisitesAsSource?: COURSE_NODE_PREREQUISITESOrderByRelationAggregateInput
    prerequisitesAsTarget?: COURSE_NODE_PREREQUISITESOrderByRelationAggregateInput
  }

  export type COURSE_NODESWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    roadmap_id_slug?: COURSE_NODESRoadmap_idSlugCompoundUniqueInput
    AND?: COURSE_NODESWhereInput | COURSE_NODESWhereInput[]
    OR?: COURSE_NODESWhereInput[]
    NOT?: COURSE_NODESWhereInput | COURSE_NODESWhereInput[]
    roadmap_id?: IntFilter<"COURSE_NODES"> | number
    slug?: StringFilter<"COURSE_NODES"> | string
    name?: StringFilter<"COURSE_NODES"> | string
    coords?: JsonNullableFilter<"COURSE_NODES">
    credits?: IntFilter<"COURSE_NODES"> | number
    description?: StringNullableFilter<"COURSE_NODES"> | string | null
    created_at?: DateTimeFilter<"COURSE_NODES"> | Date | string
    updated_at?: DateTimeFilter<"COURSE_NODES"> | Date | string
    roadmap?: XOR<MAJOR_ROADMAPSRelationFilter, MAJOR_ROADMAPSWhereInput>
    courseTopics?: COURSE_TOPICS_NODEListRelationFilter
    prerequisitesAsSource?: COURSE_NODE_PREREQUISITESListRelationFilter
    prerequisitesAsTarget?: COURSE_NODE_PREREQUISITESListRelationFilter
  }, "id" | "roadmap_id_slug">

  export type COURSE_NODESOrderByWithAggregationInput = {
    id?: SortOrder
    roadmap_id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    coords?: SortOrderInput | SortOrder
    credits?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: COURSE_NODESCountOrderByAggregateInput
    _avg?: COURSE_NODESAvgOrderByAggregateInput
    _max?: COURSE_NODESMaxOrderByAggregateInput
    _min?: COURSE_NODESMinOrderByAggregateInput
    _sum?: COURSE_NODESSumOrderByAggregateInput
  }

  export type COURSE_NODESScalarWhereWithAggregatesInput = {
    AND?: COURSE_NODESScalarWhereWithAggregatesInput | COURSE_NODESScalarWhereWithAggregatesInput[]
    OR?: COURSE_NODESScalarWhereWithAggregatesInput[]
    NOT?: COURSE_NODESScalarWhereWithAggregatesInput | COURSE_NODESScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"COURSE_NODES"> | number
    roadmap_id?: IntWithAggregatesFilter<"COURSE_NODES"> | number
    slug?: StringWithAggregatesFilter<"COURSE_NODES"> | string
    name?: StringWithAggregatesFilter<"COURSE_NODES"> | string
    coords?: JsonNullableWithAggregatesFilter<"COURSE_NODES">
    credits?: IntWithAggregatesFilter<"COURSE_NODES"> | number
    description?: StringNullableWithAggregatesFilter<"COURSE_NODES"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"COURSE_NODES"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"COURSE_NODES"> | Date | string
  }

  export type COURSE_NODE_PREREQUISITESWhereInput = {
    AND?: COURSE_NODE_PREREQUISITESWhereInput | COURSE_NODE_PREREQUISITESWhereInput[]
    OR?: COURSE_NODE_PREREQUISITESWhereInput[]
    NOT?: COURSE_NODE_PREREQUISITESWhereInput | COURSE_NODE_PREREQUISITESWhereInput[]
    id?: IntFilter<"COURSE_NODE_PREREQUISITES"> | number
    course_node_id?: IntFilter<"COURSE_NODE_PREREQUISITES"> | number
    prerequisite_node_id?: IntFilter<"COURSE_NODE_PREREQUISITES"> | number
    created_at?: DateTimeFilter<"COURSE_NODE_PREREQUISITES"> | Date | string
    updated_at?: DateTimeFilter<"COURSE_NODE_PREREQUISITES"> | Date | string
    courseNode?: XOR<COURSE_NODESRelationFilter, COURSE_NODESWhereInput>
    prerequisiteNode?: XOR<COURSE_NODESRelationFilter, COURSE_NODESWhereInput>
  }

  export type COURSE_NODE_PREREQUISITESOrderByWithRelationInput = {
    id?: SortOrder
    course_node_id?: SortOrder
    prerequisite_node_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    courseNode?: COURSE_NODESOrderByWithRelationInput
    prerequisiteNode?: COURSE_NODESOrderByWithRelationInput
  }

  export type COURSE_NODE_PREREQUISITESWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    course_node_id_prerequisite_node_id?: COURSE_NODE_PREREQUISITESCourse_node_idPrerequisite_node_idCompoundUniqueInput
    AND?: COURSE_NODE_PREREQUISITESWhereInput | COURSE_NODE_PREREQUISITESWhereInput[]
    OR?: COURSE_NODE_PREREQUISITESWhereInput[]
    NOT?: COURSE_NODE_PREREQUISITESWhereInput | COURSE_NODE_PREREQUISITESWhereInput[]
    course_node_id?: IntFilter<"COURSE_NODE_PREREQUISITES"> | number
    prerequisite_node_id?: IntFilter<"COURSE_NODE_PREREQUISITES"> | number
    created_at?: DateTimeFilter<"COURSE_NODE_PREREQUISITES"> | Date | string
    updated_at?: DateTimeFilter<"COURSE_NODE_PREREQUISITES"> | Date | string
    courseNode?: XOR<COURSE_NODESRelationFilter, COURSE_NODESWhereInput>
    prerequisiteNode?: XOR<COURSE_NODESRelationFilter, COURSE_NODESWhereInput>
  }, "id" | "course_node_id_prerequisite_node_id">

  export type COURSE_NODE_PREREQUISITESOrderByWithAggregationInput = {
    id?: SortOrder
    course_node_id?: SortOrder
    prerequisite_node_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: COURSE_NODE_PREREQUISITESCountOrderByAggregateInput
    _avg?: COURSE_NODE_PREREQUISITESAvgOrderByAggregateInput
    _max?: COURSE_NODE_PREREQUISITESMaxOrderByAggregateInput
    _min?: COURSE_NODE_PREREQUISITESMinOrderByAggregateInput
    _sum?: COURSE_NODE_PREREQUISITESSumOrderByAggregateInput
  }

  export type COURSE_NODE_PREREQUISITESScalarWhereWithAggregatesInput = {
    AND?: COURSE_NODE_PREREQUISITESScalarWhereWithAggregatesInput | COURSE_NODE_PREREQUISITESScalarWhereWithAggregatesInput[]
    OR?: COURSE_NODE_PREREQUISITESScalarWhereWithAggregatesInput[]
    NOT?: COURSE_NODE_PREREQUISITESScalarWhereWithAggregatesInput | COURSE_NODE_PREREQUISITESScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"COURSE_NODE_PREREQUISITES"> | number
    course_node_id?: IntWithAggregatesFilter<"COURSE_NODE_PREREQUISITES"> | number
    prerequisite_node_id?: IntWithAggregatesFilter<"COURSE_NODE_PREREQUISITES"> | number
    created_at?: DateTimeWithAggregatesFilter<"COURSE_NODE_PREREQUISITES"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"COURSE_NODE_PREREQUISITES"> | Date | string
  }

  export type COURSE_TOPICS_NODEWhereInput = {
    AND?: COURSE_TOPICS_NODEWhereInput | COURSE_TOPICS_NODEWhereInput[]
    OR?: COURSE_TOPICS_NODEWhereInput[]
    NOT?: COURSE_TOPICS_NODEWhereInput | COURSE_TOPICS_NODEWhereInput[]
    id?: IntFilter<"COURSE_TOPICS_NODE"> | number
    course_node_id?: IntFilter<"COURSE_TOPICS_NODE"> | number
    slug?: StringFilter<"COURSE_TOPICS_NODE"> | string
    title?: StringFilter<"COURSE_TOPICS_NODE"> | string
    description?: StringNullableFilter<"COURSE_TOPICS_NODE"> | string | null
    coords?: JsonNullableFilter<"COURSE_TOPICS_NODE">
    learning_objectives?: StringNullableFilter<"COURSE_TOPICS_NODE"> | string | null
    resources_url?: StringNullableFilter<"COURSE_TOPICS_NODE"> | string | null
    created_at?: DateTimeFilter<"COURSE_TOPICS_NODE"> | Date | string
    updated_at?: DateTimeFilter<"COURSE_TOPICS_NODE"> | Date | string
    courseNode?: XOR<COURSE_NODESRelationFilter, COURSE_NODESWhereInput>
    topicEdgesAsSource?: COURSE_TOPICS_EDGEListRelationFilter
    topicEdgesAsTarget?: COURSE_TOPICS_EDGEListRelationFilter
  }

  export type COURSE_TOPICS_NODEOrderByWithRelationInput = {
    id?: SortOrder
    course_node_id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    coords?: SortOrderInput | SortOrder
    learning_objectives?: SortOrderInput | SortOrder
    resources_url?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    courseNode?: COURSE_NODESOrderByWithRelationInput
    topicEdgesAsSource?: COURSE_TOPICS_EDGEOrderByRelationAggregateInput
    topicEdgesAsTarget?: COURSE_TOPICS_EDGEOrderByRelationAggregateInput
  }

  export type COURSE_TOPICS_NODEWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    course_node_id_slug?: COURSE_TOPICS_NODECourse_node_idSlugCompoundUniqueInput
    AND?: COURSE_TOPICS_NODEWhereInput | COURSE_TOPICS_NODEWhereInput[]
    OR?: COURSE_TOPICS_NODEWhereInput[]
    NOT?: COURSE_TOPICS_NODEWhereInput | COURSE_TOPICS_NODEWhereInput[]
    course_node_id?: IntFilter<"COURSE_TOPICS_NODE"> | number
    slug?: StringFilter<"COURSE_TOPICS_NODE"> | string
    title?: StringFilter<"COURSE_TOPICS_NODE"> | string
    description?: StringNullableFilter<"COURSE_TOPICS_NODE"> | string | null
    coords?: JsonNullableFilter<"COURSE_TOPICS_NODE">
    learning_objectives?: StringNullableFilter<"COURSE_TOPICS_NODE"> | string | null
    resources_url?: StringNullableFilter<"COURSE_TOPICS_NODE"> | string | null
    created_at?: DateTimeFilter<"COURSE_TOPICS_NODE"> | Date | string
    updated_at?: DateTimeFilter<"COURSE_TOPICS_NODE"> | Date | string
    courseNode?: XOR<COURSE_NODESRelationFilter, COURSE_NODESWhereInput>
    topicEdgesAsSource?: COURSE_TOPICS_EDGEListRelationFilter
    topicEdgesAsTarget?: COURSE_TOPICS_EDGEListRelationFilter
  }, "id" | "course_node_id_slug">

  export type COURSE_TOPICS_NODEOrderByWithAggregationInput = {
    id?: SortOrder
    course_node_id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    coords?: SortOrderInput | SortOrder
    learning_objectives?: SortOrderInput | SortOrder
    resources_url?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: COURSE_TOPICS_NODECountOrderByAggregateInput
    _avg?: COURSE_TOPICS_NODEAvgOrderByAggregateInput
    _max?: COURSE_TOPICS_NODEMaxOrderByAggregateInput
    _min?: COURSE_TOPICS_NODEMinOrderByAggregateInput
    _sum?: COURSE_TOPICS_NODESumOrderByAggregateInput
  }

  export type COURSE_TOPICS_NODEScalarWhereWithAggregatesInput = {
    AND?: COURSE_TOPICS_NODEScalarWhereWithAggregatesInput | COURSE_TOPICS_NODEScalarWhereWithAggregatesInput[]
    OR?: COURSE_TOPICS_NODEScalarWhereWithAggregatesInput[]
    NOT?: COURSE_TOPICS_NODEScalarWhereWithAggregatesInput | COURSE_TOPICS_NODEScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"COURSE_TOPICS_NODE"> | number
    course_node_id?: IntWithAggregatesFilter<"COURSE_TOPICS_NODE"> | number
    slug?: StringWithAggregatesFilter<"COURSE_TOPICS_NODE"> | string
    title?: StringWithAggregatesFilter<"COURSE_TOPICS_NODE"> | string
    description?: StringNullableWithAggregatesFilter<"COURSE_TOPICS_NODE"> | string | null
    coords?: JsonNullableWithAggregatesFilter<"COURSE_TOPICS_NODE">
    learning_objectives?: StringNullableWithAggregatesFilter<"COURSE_TOPICS_NODE"> | string | null
    resources_url?: StringNullableWithAggregatesFilter<"COURSE_TOPICS_NODE"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"COURSE_TOPICS_NODE"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"COURSE_TOPICS_NODE"> | Date | string
  }

  export type COURSE_TOPICS_EDGEWhereInput = {
    AND?: COURSE_TOPICS_EDGEWhereInput | COURSE_TOPICS_EDGEWhereInput[]
    OR?: COURSE_TOPICS_EDGEWhereInput[]
    NOT?: COURSE_TOPICS_EDGEWhereInput | COURSE_TOPICS_EDGEWhereInput[]
    id?: IntFilter<"COURSE_TOPICS_EDGE"> | number
    source_topic_id?: IntFilter<"COURSE_TOPICS_EDGE"> | number
    target_topic_id?: IntFilter<"COURSE_TOPICS_EDGE"> | number
    created_at?: DateTimeFilter<"COURSE_TOPICS_EDGE"> | Date | string
    sourceTopic?: XOR<COURSE_TOPICS_NODERelationFilter, COURSE_TOPICS_NODEWhereInput>
    targetTopic?: XOR<COURSE_TOPICS_NODERelationFilter, COURSE_TOPICS_NODEWhereInput>
  }

  export type COURSE_TOPICS_EDGEOrderByWithRelationInput = {
    id?: SortOrder
    source_topic_id?: SortOrder
    target_topic_id?: SortOrder
    created_at?: SortOrder
    sourceTopic?: COURSE_TOPICS_NODEOrderByWithRelationInput
    targetTopic?: COURSE_TOPICS_NODEOrderByWithRelationInput
  }

  export type COURSE_TOPICS_EDGEWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    source_topic_id_target_topic_id?: COURSE_TOPICS_EDGESource_topic_idTarget_topic_idCompoundUniqueInput
    AND?: COURSE_TOPICS_EDGEWhereInput | COURSE_TOPICS_EDGEWhereInput[]
    OR?: COURSE_TOPICS_EDGEWhereInput[]
    NOT?: COURSE_TOPICS_EDGEWhereInput | COURSE_TOPICS_EDGEWhereInput[]
    source_topic_id?: IntFilter<"COURSE_TOPICS_EDGE"> | number
    target_topic_id?: IntFilter<"COURSE_TOPICS_EDGE"> | number
    created_at?: DateTimeFilter<"COURSE_TOPICS_EDGE"> | Date | string
    sourceTopic?: XOR<COURSE_TOPICS_NODERelationFilter, COURSE_TOPICS_NODEWhereInput>
    targetTopic?: XOR<COURSE_TOPICS_NODERelationFilter, COURSE_TOPICS_NODEWhereInput>
  }, "id" | "source_topic_id_target_topic_id">

  export type COURSE_TOPICS_EDGEOrderByWithAggregationInput = {
    id?: SortOrder
    source_topic_id?: SortOrder
    target_topic_id?: SortOrder
    created_at?: SortOrder
    _count?: COURSE_TOPICS_EDGECountOrderByAggregateInput
    _avg?: COURSE_TOPICS_EDGEAvgOrderByAggregateInput
    _max?: COURSE_TOPICS_EDGEMaxOrderByAggregateInput
    _min?: COURSE_TOPICS_EDGEMinOrderByAggregateInput
    _sum?: COURSE_TOPICS_EDGESumOrderByAggregateInput
  }

  export type COURSE_TOPICS_EDGEScalarWhereWithAggregatesInput = {
    AND?: COURSE_TOPICS_EDGEScalarWhereWithAggregatesInput | COURSE_TOPICS_EDGEScalarWhereWithAggregatesInput[]
    OR?: COURSE_TOPICS_EDGEScalarWhereWithAggregatesInput[]
    NOT?: COURSE_TOPICS_EDGEScalarWhereWithAggregatesInput | COURSE_TOPICS_EDGEScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"COURSE_TOPICS_EDGE"> | number
    source_topic_id?: IntWithAggregatesFilter<"COURSE_TOPICS_EDGE"> | number
    target_topic_id?: IntWithAggregatesFilter<"COURSE_TOPICS_EDGE"> | number
    created_at?: DateTimeWithAggregatesFilter<"COURSE_TOPICS_EDGE"> | Date | string
  }

  export type DEPARTMENTSCreateInput = {
    slug: string
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    roadmaps?: MAJOR_ROADMAPSCreateNestedManyWithoutDepartmentInput
  }

  export type DEPARTMENTSUncheckedCreateInput = {
    id?: number
    slug: string
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    roadmaps?: MAJOR_ROADMAPSUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DEPARTMENTSUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roadmaps?: MAJOR_ROADMAPSUpdateManyWithoutDepartmentNestedInput
  }

  export type DEPARTMENTSUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roadmaps?: MAJOR_ROADMAPSUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type DEPARTMENTSCreateManyInput = {
    id?: number
    slug: string
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DEPARTMENTSUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DEPARTMENTSUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MAJOR_ROADMAPSCreateInput = {
    slug: string
    name: string
    total_credits: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    department: DEPARTMENTSCreateNestedOneWithoutRoadmapsInput
    courseNodes?: COURSE_NODESCreateNestedManyWithoutRoadmapInput
  }

  export type MAJOR_ROADMAPSUncheckedCreateInput = {
    id?: number
    slug: string
    name: string
    total_credits: number
    description?: string | null
    department_id: number
    created_at?: Date | string
    updated_at?: Date | string
    courseNodes?: COURSE_NODESUncheckedCreateNestedManyWithoutRoadmapInput
  }

  export type MAJOR_ROADMAPSUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    total_credits?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: DEPARTMENTSUpdateOneRequiredWithoutRoadmapsNestedInput
    courseNodes?: COURSE_NODESUpdateManyWithoutRoadmapNestedInput
  }

  export type MAJOR_ROADMAPSUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    total_credits?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    department_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    courseNodes?: COURSE_NODESUncheckedUpdateManyWithoutRoadmapNestedInput
  }

  export type MAJOR_ROADMAPSCreateManyInput = {
    id?: number
    slug: string
    name: string
    total_credits: number
    description?: string | null
    department_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type MAJOR_ROADMAPSUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    total_credits?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MAJOR_ROADMAPSUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    total_credits?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    department_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type COURSE_NODESCreateInput = {
    slug: string
    name: string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    roadmap: MAJOR_ROADMAPSCreateNestedOneWithoutCourseNodesInput
    courseTopics?: COURSE_TOPICS_NODECreateNestedManyWithoutCourseNodeInput
    prerequisitesAsSource?: COURSE_NODE_PREREQUISITESCreateNestedManyWithoutPrerequisiteNodeInput
    prerequisitesAsTarget?: COURSE_NODE_PREREQUISITESCreateNestedManyWithoutCourseNodeInput
  }

  export type COURSE_NODESUncheckedCreateInput = {
    id?: number
    roadmap_id: number
    slug: string
    name: string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    courseTopics?: COURSE_TOPICS_NODEUncheckedCreateNestedManyWithoutCourseNodeInput
    prerequisitesAsSource?: COURSE_NODE_PREREQUISITESUncheckedCreateNestedManyWithoutPrerequisiteNodeInput
    prerequisitesAsTarget?: COURSE_NODE_PREREQUISITESUncheckedCreateNestedManyWithoutCourseNodeInput
  }

  export type COURSE_NODESUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roadmap?: MAJOR_ROADMAPSUpdateOneRequiredWithoutCourseNodesNestedInput
    courseTopics?: COURSE_TOPICS_NODEUpdateManyWithoutCourseNodeNestedInput
    prerequisitesAsSource?: COURSE_NODE_PREREQUISITESUpdateManyWithoutPrerequisiteNodeNestedInput
    prerequisitesAsTarget?: COURSE_NODE_PREREQUISITESUpdateManyWithoutCourseNodeNestedInput
  }

  export type COURSE_NODESUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    roadmap_id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    courseTopics?: COURSE_TOPICS_NODEUncheckedUpdateManyWithoutCourseNodeNestedInput
    prerequisitesAsSource?: COURSE_NODE_PREREQUISITESUncheckedUpdateManyWithoutPrerequisiteNodeNestedInput
    prerequisitesAsTarget?: COURSE_NODE_PREREQUISITESUncheckedUpdateManyWithoutCourseNodeNestedInput
  }

  export type COURSE_NODESCreateManyInput = {
    id?: number
    roadmap_id: number
    slug: string
    name: string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type COURSE_NODESUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type COURSE_NODESUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    roadmap_id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type COURSE_NODE_PREREQUISITESCreateInput = {
    created_at?: Date | string
    updated_at?: Date | string
    courseNode: COURSE_NODESCreateNestedOneWithoutPrerequisitesAsTargetInput
    prerequisiteNode: COURSE_NODESCreateNestedOneWithoutPrerequisitesAsSourceInput
  }

  export type COURSE_NODE_PREREQUISITESUncheckedCreateInput = {
    id?: number
    course_node_id: number
    prerequisite_node_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type COURSE_NODE_PREREQUISITESUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    courseNode?: COURSE_NODESUpdateOneRequiredWithoutPrerequisitesAsTargetNestedInput
    prerequisiteNode?: COURSE_NODESUpdateOneRequiredWithoutPrerequisitesAsSourceNestedInput
  }

  export type COURSE_NODE_PREREQUISITESUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    course_node_id?: IntFieldUpdateOperationsInput | number
    prerequisite_node_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type COURSE_NODE_PREREQUISITESCreateManyInput = {
    id?: number
    course_node_id: number
    prerequisite_node_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type COURSE_NODE_PREREQUISITESUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type COURSE_NODE_PREREQUISITESUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    course_node_id?: IntFieldUpdateOperationsInput | number
    prerequisite_node_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type COURSE_TOPICS_NODECreateInput = {
    slug: string
    title: string
    description?: string | null
    coords?: NullableJsonNullValueInput | InputJsonValue
    learning_objectives?: string | null
    resources_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    courseNode: COURSE_NODESCreateNestedOneWithoutCourseTopicsInput
    topicEdgesAsSource?: COURSE_TOPICS_EDGECreateNestedManyWithoutSourceTopicInput
    topicEdgesAsTarget?: COURSE_TOPICS_EDGECreateNestedManyWithoutTargetTopicInput
  }

  export type COURSE_TOPICS_NODEUncheckedCreateInput = {
    id?: number
    course_node_id: number
    slug: string
    title: string
    description?: string | null
    coords?: NullableJsonNullValueInput | InputJsonValue
    learning_objectives?: string | null
    resources_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    topicEdgesAsSource?: COURSE_TOPICS_EDGEUncheckedCreateNestedManyWithoutSourceTopicInput
    topicEdgesAsTarget?: COURSE_TOPICS_EDGEUncheckedCreateNestedManyWithoutTargetTopicInput
  }

  export type COURSE_TOPICS_NODEUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coords?: NullableJsonNullValueInput | InputJsonValue
    learning_objectives?: NullableStringFieldUpdateOperationsInput | string | null
    resources_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    courseNode?: COURSE_NODESUpdateOneRequiredWithoutCourseTopicsNestedInput
    topicEdgesAsSource?: COURSE_TOPICS_EDGEUpdateManyWithoutSourceTopicNestedInput
    topicEdgesAsTarget?: COURSE_TOPICS_EDGEUpdateManyWithoutTargetTopicNestedInput
  }

  export type COURSE_TOPICS_NODEUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    course_node_id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coords?: NullableJsonNullValueInput | InputJsonValue
    learning_objectives?: NullableStringFieldUpdateOperationsInput | string | null
    resources_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    topicEdgesAsSource?: COURSE_TOPICS_EDGEUncheckedUpdateManyWithoutSourceTopicNestedInput
    topicEdgesAsTarget?: COURSE_TOPICS_EDGEUncheckedUpdateManyWithoutTargetTopicNestedInput
  }

  export type COURSE_TOPICS_NODECreateManyInput = {
    id?: number
    course_node_id: number
    slug: string
    title: string
    description?: string | null
    coords?: NullableJsonNullValueInput | InputJsonValue
    learning_objectives?: string | null
    resources_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type COURSE_TOPICS_NODEUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coords?: NullableJsonNullValueInput | InputJsonValue
    learning_objectives?: NullableStringFieldUpdateOperationsInput | string | null
    resources_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type COURSE_TOPICS_NODEUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    course_node_id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coords?: NullableJsonNullValueInput | InputJsonValue
    learning_objectives?: NullableStringFieldUpdateOperationsInput | string | null
    resources_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type COURSE_TOPICS_EDGECreateInput = {
    created_at?: Date | string
    sourceTopic: COURSE_TOPICS_NODECreateNestedOneWithoutTopicEdgesAsSourceInput
    targetTopic: COURSE_TOPICS_NODECreateNestedOneWithoutTopicEdgesAsTargetInput
  }

  export type COURSE_TOPICS_EDGEUncheckedCreateInput = {
    id?: number
    source_topic_id: number
    target_topic_id: number
    created_at?: Date | string
  }

  export type COURSE_TOPICS_EDGEUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceTopic?: COURSE_TOPICS_NODEUpdateOneRequiredWithoutTopicEdgesAsSourceNestedInput
    targetTopic?: COURSE_TOPICS_NODEUpdateOneRequiredWithoutTopicEdgesAsTargetNestedInput
  }

  export type COURSE_TOPICS_EDGEUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    source_topic_id?: IntFieldUpdateOperationsInput | number
    target_topic_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type COURSE_TOPICS_EDGECreateManyInput = {
    id?: number
    source_topic_id: number
    target_topic_id: number
    created_at?: Date | string
  }

  export type COURSE_TOPICS_EDGEUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type COURSE_TOPICS_EDGEUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    source_topic_id?: IntFieldUpdateOperationsInput | number
    target_topic_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type MAJOR_ROADMAPSListRelationFilter = {
    every?: MAJOR_ROADMAPSWhereInput
    some?: MAJOR_ROADMAPSWhereInput
    none?: MAJOR_ROADMAPSWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MAJOR_ROADMAPSOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DEPARTMENTSCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DEPARTMENTSAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DEPARTMENTSMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DEPARTMENTSMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DEPARTMENTSSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type DEPARTMENTSRelationFilter = {
    is?: DEPARTMENTSWhereInput
    isNot?: DEPARTMENTSWhereInput
  }

  export type COURSE_NODESListRelationFilter = {
    every?: COURSE_NODESWhereInput
    some?: COURSE_NODESWhereInput
    none?: COURSE_NODESWhereInput
  }

  export type COURSE_NODESOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MAJOR_ROADMAPSCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    total_credits?: SortOrder
    description?: SortOrder
    department_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type MAJOR_ROADMAPSAvgOrderByAggregateInput = {
    id?: SortOrder
    total_credits?: SortOrder
    department_id?: SortOrder
  }

  export type MAJOR_ROADMAPSMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    total_credits?: SortOrder
    description?: SortOrder
    department_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type MAJOR_ROADMAPSMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    total_credits?: SortOrder
    description?: SortOrder
    department_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type MAJOR_ROADMAPSSumOrderByAggregateInput = {
    id?: SortOrder
    total_credits?: SortOrder
    department_id?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type MAJOR_ROADMAPSRelationFilter = {
    is?: MAJOR_ROADMAPSWhereInput
    isNot?: MAJOR_ROADMAPSWhereInput
  }

  export type COURSE_TOPICS_NODEListRelationFilter = {
    every?: COURSE_TOPICS_NODEWhereInput
    some?: COURSE_TOPICS_NODEWhereInput
    none?: COURSE_TOPICS_NODEWhereInput
  }

  export type COURSE_NODE_PREREQUISITESListRelationFilter = {
    every?: COURSE_NODE_PREREQUISITESWhereInput
    some?: COURSE_NODE_PREREQUISITESWhereInput
    none?: COURSE_NODE_PREREQUISITESWhereInput
  }

  export type COURSE_TOPICS_NODEOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type COURSE_NODE_PREREQUISITESOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type COURSE_NODESRoadmap_idSlugCompoundUniqueInput = {
    roadmap_id: number
    slug: string
  }

  export type COURSE_NODESCountOrderByAggregateInput = {
    id?: SortOrder
    roadmap_id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    coords?: SortOrder
    credits?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type COURSE_NODESAvgOrderByAggregateInput = {
    id?: SortOrder
    roadmap_id?: SortOrder
    credits?: SortOrder
  }

  export type COURSE_NODESMaxOrderByAggregateInput = {
    id?: SortOrder
    roadmap_id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    credits?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type COURSE_NODESMinOrderByAggregateInput = {
    id?: SortOrder
    roadmap_id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    credits?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type COURSE_NODESSumOrderByAggregateInput = {
    id?: SortOrder
    roadmap_id?: SortOrder
    credits?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type COURSE_NODESRelationFilter = {
    is?: COURSE_NODESWhereInput
    isNot?: COURSE_NODESWhereInput
  }

  export type COURSE_NODE_PREREQUISITESCourse_node_idPrerequisite_node_idCompoundUniqueInput = {
    course_node_id: number
    prerequisite_node_id: number
  }

  export type COURSE_NODE_PREREQUISITESCountOrderByAggregateInput = {
    id?: SortOrder
    course_node_id?: SortOrder
    prerequisite_node_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type COURSE_NODE_PREREQUISITESAvgOrderByAggregateInput = {
    id?: SortOrder
    course_node_id?: SortOrder
    prerequisite_node_id?: SortOrder
  }

  export type COURSE_NODE_PREREQUISITESMaxOrderByAggregateInput = {
    id?: SortOrder
    course_node_id?: SortOrder
    prerequisite_node_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type COURSE_NODE_PREREQUISITESMinOrderByAggregateInput = {
    id?: SortOrder
    course_node_id?: SortOrder
    prerequisite_node_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type COURSE_NODE_PREREQUISITESSumOrderByAggregateInput = {
    id?: SortOrder
    course_node_id?: SortOrder
    prerequisite_node_id?: SortOrder
  }

  export type COURSE_TOPICS_EDGEListRelationFilter = {
    every?: COURSE_TOPICS_EDGEWhereInput
    some?: COURSE_TOPICS_EDGEWhereInput
    none?: COURSE_TOPICS_EDGEWhereInput
  }

  export type COURSE_TOPICS_EDGEOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type COURSE_TOPICS_NODECourse_node_idSlugCompoundUniqueInput = {
    course_node_id: number
    slug: string
  }

  export type COURSE_TOPICS_NODECountOrderByAggregateInput = {
    id?: SortOrder
    course_node_id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    coords?: SortOrder
    learning_objectives?: SortOrder
    resources_url?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type COURSE_TOPICS_NODEAvgOrderByAggregateInput = {
    id?: SortOrder
    course_node_id?: SortOrder
  }

  export type COURSE_TOPICS_NODEMaxOrderByAggregateInput = {
    id?: SortOrder
    course_node_id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    learning_objectives?: SortOrder
    resources_url?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type COURSE_TOPICS_NODEMinOrderByAggregateInput = {
    id?: SortOrder
    course_node_id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    learning_objectives?: SortOrder
    resources_url?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type COURSE_TOPICS_NODESumOrderByAggregateInput = {
    id?: SortOrder
    course_node_id?: SortOrder
  }

  export type COURSE_TOPICS_NODERelationFilter = {
    is?: COURSE_TOPICS_NODEWhereInput
    isNot?: COURSE_TOPICS_NODEWhereInput
  }

  export type COURSE_TOPICS_EDGESource_topic_idTarget_topic_idCompoundUniqueInput = {
    source_topic_id: number
    target_topic_id: number
  }

  export type COURSE_TOPICS_EDGECountOrderByAggregateInput = {
    id?: SortOrder
    source_topic_id?: SortOrder
    target_topic_id?: SortOrder
    created_at?: SortOrder
  }

  export type COURSE_TOPICS_EDGEAvgOrderByAggregateInput = {
    id?: SortOrder
    source_topic_id?: SortOrder
    target_topic_id?: SortOrder
  }

  export type COURSE_TOPICS_EDGEMaxOrderByAggregateInput = {
    id?: SortOrder
    source_topic_id?: SortOrder
    target_topic_id?: SortOrder
    created_at?: SortOrder
  }

  export type COURSE_TOPICS_EDGEMinOrderByAggregateInput = {
    id?: SortOrder
    source_topic_id?: SortOrder
    target_topic_id?: SortOrder
    created_at?: SortOrder
  }

  export type COURSE_TOPICS_EDGESumOrderByAggregateInput = {
    id?: SortOrder
    source_topic_id?: SortOrder
    target_topic_id?: SortOrder
  }

  export type MAJOR_ROADMAPSCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<MAJOR_ROADMAPSCreateWithoutDepartmentInput, MAJOR_ROADMAPSUncheckedCreateWithoutDepartmentInput> | MAJOR_ROADMAPSCreateWithoutDepartmentInput[] | MAJOR_ROADMAPSUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: MAJOR_ROADMAPSCreateOrConnectWithoutDepartmentInput | MAJOR_ROADMAPSCreateOrConnectWithoutDepartmentInput[]
    createMany?: MAJOR_ROADMAPSCreateManyDepartmentInputEnvelope
    connect?: MAJOR_ROADMAPSWhereUniqueInput | MAJOR_ROADMAPSWhereUniqueInput[]
  }

  export type MAJOR_ROADMAPSUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<MAJOR_ROADMAPSCreateWithoutDepartmentInput, MAJOR_ROADMAPSUncheckedCreateWithoutDepartmentInput> | MAJOR_ROADMAPSCreateWithoutDepartmentInput[] | MAJOR_ROADMAPSUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: MAJOR_ROADMAPSCreateOrConnectWithoutDepartmentInput | MAJOR_ROADMAPSCreateOrConnectWithoutDepartmentInput[]
    createMany?: MAJOR_ROADMAPSCreateManyDepartmentInputEnvelope
    connect?: MAJOR_ROADMAPSWhereUniqueInput | MAJOR_ROADMAPSWhereUniqueInput[]
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

  export type MAJOR_ROADMAPSUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<MAJOR_ROADMAPSCreateWithoutDepartmentInput, MAJOR_ROADMAPSUncheckedCreateWithoutDepartmentInput> | MAJOR_ROADMAPSCreateWithoutDepartmentInput[] | MAJOR_ROADMAPSUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: MAJOR_ROADMAPSCreateOrConnectWithoutDepartmentInput | MAJOR_ROADMAPSCreateOrConnectWithoutDepartmentInput[]
    upsert?: MAJOR_ROADMAPSUpsertWithWhereUniqueWithoutDepartmentInput | MAJOR_ROADMAPSUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: MAJOR_ROADMAPSCreateManyDepartmentInputEnvelope
    set?: MAJOR_ROADMAPSWhereUniqueInput | MAJOR_ROADMAPSWhereUniqueInput[]
    disconnect?: MAJOR_ROADMAPSWhereUniqueInput | MAJOR_ROADMAPSWhereUniqueInput[]
    delete?: MAJOR_ROADMAPSWhereUniqueInput | MAJOR_ROADMAPSWhereUniqueInput[]
    connect?: MAJOR_ROADMAPSWhereUniqueInput | MAJOR_ROADMAPSWhereUniqueInput[]
    update?: MAJOR_ROADMAPSUpdateWithWhereUniqueWithoutDepartmentInput | MAJOR_ROADMAPSUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: MAJOR_ROADMAPSUpdateManyWithWhereWithoutDepartmentInput | MAJOR_ROADMAPSUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: MAJOR_ROADMAPSScalarWhereInput | MAJOR_ROADMAPSScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MAJOR_ROADMAPSUncheckedUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<MAJOR_ROADMAPSCreateWithoutDepartmentInput, MAJOR_ROADMAPSUncheckedCreateWithoutDepartmentInput> | MAJOR_ROADMAPSCreateWithoutDepartmentInput[] | MAJOR_ROADMAPSUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: MAJOR_ROADMAPSCreateOrConnectWithoutDepartmentInput | MAJOR_ROADMAPSCreateOrConnectWithoutDepartmentInput[]
    upsert?: MAJOR_ROADMAPSUpsertWithWhereUniqueWithoutDepartmentInput | MAJOR_ROADMAPSUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: MAJOR_ROADMAPSCreateManyDepartmentInputEnvelope
    set?: MAJOR_ROADMAPSWhereUniqueInput | MAJOR_ROADMAPSWhereUniqueInput[]
    disconnect?: MAJOR_ROADMAPSWhereUniqueInput | MAJOR_ROADMAPSWhereUniqueInput[]
    delete?: MAJOR_ROADMAPSWhereUniqueInput | MAJOR_ROADMAPSWhereUniqueInput[]
    connect?: MAJOR_ROADMAPSWhereUniqueInput | MAJOR_ROADMAPSWhereUniqueInput[]
    update?: MAJOR_ROADMAPSUpdateWithWhereUniqueWithoutDepartmentInput | MAJOR_ROADMAPSUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: MAJOR_ROADMAPSUpdateManyWithWhereWithoutDepartmentInput | MAJOR_ROADMAPSUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: MAJOR_ROADMAPSScalarWhereInput | MAJOR_ROADMAPSScalarWhereInput[]
  }

  export type DEPARTMENTSCreateNestedOneWithoutRoadmapsInput = {
    create?: XOR<DEPARTMENTSCreateWithoutRoadmapsInput, DEPARTMENTSUncheckedCreateWithoutRoadmapsInput>
    connectOrCreate?: DEPARTMENTSCreateOrConnectWithoutRoadmapsInput
    connect?: DEPARTMENTSWhereUniqueInput
  }

  export type COURSE_NODESCreateNestedManyWithoutRoadmapInput = {
    create?: XOR<COURSE_NODESCreateWithoutRoadmapInput, COURSE_NODESUncheckedCreateWithoutRoadmapInput> | COURSE_NODESCreateWithoutRoadmapInput[] | COURSE_NODESUncheckedCreateWithoutRoadmapInput[]
    connectOrCreate?: COURSE_NODESCreateOrConnectWithoutRoadmapInput | COURSE_NODESCreateOrConnectWithoutRoadmapInput[]
    createMany?: COURSE_NODESCreateManyRoadmapInputEnvelope
    connect?: COURSE_NODESWhereUniqueInput | COURSE_NODESWhereUniqueInput[]
  }

  export type COURSE_NODESUncheckedCreateNestedManyWithoutRoadmapInput = {
    create?: XOR<COURSE_NODESCreateWithoutRoadmapInput, COURSE_NODESUncheckedCreateWithoutRoadmapInput> | COURSE_NODESCreateWithoutRoadmapInput[] | COURSE_NODESUncheckedCreateWithoutRoadmapInput[]
    connectOrCreate?: COURSE_NODESCreateOrConnectWithoutRoadmapInput | COURSE_NODESCreateOrConnectWithoutRoadmapInput[]
    createMany?: COURSE_NODESCreateManyRoadmapInputEnvelope
    connect?: COURSE_NODESWhereUniqueInput | COURSE_NODESWhereUniqueInput[]
  }

  export type DEPARTMENTSUpdateOneRequiredWithoutRoadmapsNestedInput = {
    create?: XOR<DEPARTMENTSCreateWithoutRoadmapsInput, DEPARTMENTSUncheckedCreateWithoutRoadmapsInput>
    connectOrCreate?: DEPARTMENTSCreateOrConnectWithoutRoadmapsInput
    upsert?: DEPARTMENTSUpsertWithoutRoadmapsInput
    connect?: DEPARTMENTSWhereUniqueInput
    update?: XOR<XOR<DEPARTMENTSUpdateToOneWithWhereWithoutRoadmapsInput, DEPARTMENTSUpdateWithoutRoadmapsInput>, DEPARTMENTSUncheckedUpdateWithoutRoadmapsInput>
  }

  export type COURSE_NODESUpdateManyWithoutRoadmapNestedInput = {
    create?: XOR<COURSE_NODESCreateWithoutRoadmapInput, COURSE_NODESUncheckedCreateWithoutRoadmapInput> | COURSE_NODESCreateWithoutRoadmapInput[] | COURSE_NODESUncheckedCreateWithoutRoadmapInput[]
    connectOrCreate?: COURSE_NODESCreateOrConnectWithoutRoadmapInput | COURSE_NODESCreateOrConnectWithoutRoadmapInput[]
    upsert?: COURSE_NODESUpsertWithWhereUniqueWithoutRoadmapInput | COURSE_NODESUpsertWithWhereUniqueWithoutRoadmapInput[]
    createMany?: COURSE_NODESCreateManyRoadmapInputEnvelope
    set?: COURSE_NODESWhereUniqueInput | COURSE_NODESWhereUniqueInput[]
    disconnect?: COURSE_NODESWhereUniqueInput | COURSE_NODESWhereUniqueInput[]
    delete?: COURSE_NODESWhereUniqueInput | COURSE_NODESWhereUniqueInput[]
    connect?: COURSE_NODESWhereUniqueInput | COURSE_NODESWhereUniqueInput[]
    update?: COURSE_NODESUpdateWithWhereUniqueWithoutRoadmapInput | COURSE_NODESUpdateWithWhereUniqueWithoutRoadmapInput[]
    updateMany?: COURSE_NODESUpdateManyWithWhereWithoutRoadmapInput | COURSE_NODESUpdateManyWithWhereWithoutRoadmapInput[]
    deleteMany?: COURSE_NODESScalarWhereInput | COURSE_NODESScalarWhereInput[]
  }

  export type COURSE_NODESUncheckedUpdateManyWithoutRoadmapNestedInput = {
    create?: XOR<COURSE_NODESCreateWithoutRoadmapInput, COURSE_NODESUncheckedCreateWithoutRoadmapInput> | COURSE_NODESCreateWithoutRoadmapInput[] | COURSE_NODESUncheckedCreateWithoutRoadmapInput[]
    connectOrCreate?: COURSE_NODESCreateOrConnectWithoutRoadmapInput | COURSE_NODESCreateOrConnectWithoutRoadmapInput[]
    upsert?: COURSE_NODESUpsertWithWhereUniqueWithoutRoadmapInput | COURSE_NODESUpsertWithWhereUniqueWithoutRoadmapInput[]
    createMany?: COURSE_NODESCreateManyRoadmapInputEnvelope
    set?: COURSE_NODESWhereUniqueInput | COURSE_NODESWhereUniqueInput[]
    disconnect?: COURSE_NODESWhereUniqueInput | COURSE_NODESWhereUniqueInput[]
    delete?: COURSE_NODESWhereUniqueInput | COURSE_NODESWhereUniqueInput[]
    connect?: COURSE_NODESWhereUniqueInput | COURSE_NODESWhereUniqueInput[]
    update?: COURSE_NODESUpdateWithWhereUniqueWithoutRoadmapInput | COURSE_NODESUpdateWithWhereUniqueWithoutRoadmapInput[]
    updateMany?: COURSE_NODESUpdateManyWithWhereWithoutRoadmapInput | COURSE_NODESUpdateManyWithWhereWithoutRoadmapInput[]
    deleteMany?: COURSE_NODESScalarWhereInput | COURSE_NODESScalarWhereInput[]
  }

  export type MAJOR_ROADMAPSCreateNestedOneWithoutCourseNodesInput = {
    create?: XOR<MAJOR_ROADMAPSCreateWithoutCourseNodesInput, MAJOR_ROADMAPSUncheckedCreateWithoutCourseNodesInput>
    connectOrCreate?: MAJOR_ROADMAPSCreateOrConnectWithoutCourseNodesInput
    connect?: MAJOR_ROADMAPSWhereUniqueInput
  }

  export type COURSE_TOPICS_NODECreateNestedManyWithoutCourseNodeInput = {
    create?: XOR<COURSE_TOPICS_NODECreateWithoutCourseNodeInput, COURSE_TOPICS_NODEUncheckedCreateWithoutCourseNodeInput> | COURSE_TOPICS_NODECreateWithoutCourseNodeInput[] | COURSE_TOPICS_NODEUncheckedCreateWithoutCourseNodeInput[]
    connectOrCreate?: COURSE_TOPICS_NODECreateOrConnectWithoutCourseNodeInput | COURSE_TOPICS_NODECreateOrConnectWithoutCourseNodeInput[]
    createMany?: COURSE_TOPICS_NODECreateManyCourseNodeInputEnvelope
    connect?: COURSE_TOPICS_NODEWhereUniqueInput | COURSE_TOPICS_NODEWhereUniqueInput[]
  }

  export type COURSE_NODE_PREREQUISITESCreateNestedManyWithoutPrerequisiteNodeInput = {
    create?: XOR<COURSE_NODE_PREREQUISITESCreateWithoutPrerequisiteNodeInput, COURSE_NODE_PREREQUISITESUncheckedCreateWithoutPrerequisiteNodeInput> | COURSE_NODE_PREREQUISITESCreateWithoutPrerequisiteNodeInput[] | COURSE_NODE_PREREQUISITESUncheckedCreateWithoutPrerequisiteNodeInput[]
    connectOrCreate?: COURSE_NODE_PREREQUISITESCreateOrConnectWithoutPrerequisiteNodeInput | COURSE_NODE_PREREQUISITESCreateOrConnectWithoutPrerequisiteNodeInput[]
    createMany?: COURSE_NODE_PREREQUISITESCreateManyPrerequisiteNodeInputEnvelope
    connect?: COURSE_NODE_PREREQUISITESWhereUniqueInput | COURSE_NODE_PREREQUISITESWhereUniqueInput[]
  }

  export type COURSE_NODE_PREREQUISITESCreateNestedManyWithoutCourseNodeInput = {
    create?: XOR<COURSE_NODE_PREREQUISITESCreateWithoutCourseNodeInput, COURSE_NODE_PREREQUISITESUncheckedCreateWithoutCourseNodeInput> | COURSE_NODE_PREREQUISITESCreateWithoutCourseNodeInput[] | COURSE_NODE_PREREQUISITESUncheckedCreateWithoutCourseNodeInput[]
    connectOrCreate?: COURSE_NODE_PREREQUISITESCreateOrConnectWithoutCourseNodeInput | COURSE_NODE_PREREQUISITESCreateOrConnectWithoutCourseNodeInput[]
    createMany?: COURSE_NODE_PREREQUISITESCreateManyCourseNodeInputEnvelope
    connect?: COURSE_NODE_PREREQUISITESWhereUniqueInput | COURSE_NODE_PREREQUISITESWhereUniqueInput[]
  }

  export type COURSE_TOPICS_NODEUncheckedCreateNestedManyWithoutCourseNodeInput = {
    create?: XOR<COURSE_TOPICS_NODECreateWithoutCourseNodeInput, COURSE_TOPICS_NODEUncheckedCreateWithoutCourseNodeInput> | COURSE_TOPICS_NODECreateWithoutCourseNodeInput[] | COURSE_TOPICS_NODEUncheckedCreateWithoutCourseNodeInput[]
    connectOrCreate?: COURSE_TOPICS_NODECreateOrConnectWithoutCourseNodeInput | COURSE_TOPICS_NODECreateOrConnectWithoutCourseNodeInput[]
    createMany?: COURSE_TOPICS_NODECreateManyCourseNodeInputEnvelope
    connect?: COURSE_TOPICS_NODEWhereUniqueInput | COURSE_TOPICS_NODEWhereUniqueInput[]
  }

  export type COURSE_NODE_PREREQUISITESUncheckedCreateNestedManyWithoutPrerequisiteNodeInput = {
    create?: XOR<COURSE_NODE_PREREQUISITESCreateWithoutPrerequisiteNodeInput, COURSE_NODE_PREREQUISITESUncheckedCreateWithoutPrerequisiteNodeInput> | COURSE_NODE_PREREQUISITESCreateWithoutPrerequisiteNodeInput[] | COURSE_NODE_PREREQUISITESUncheckedCreateWithoutPrerequisiteNodeInput[]
    connectOrCreate?: COURSE_NODE_PREREQUISITESCreateOrConnectWithoutPrerequisiteNodeInput | COURSE_NODE_PREREQUISITESCreateOrConnectWithoutPrerequisiteNodeInput[]
    createMany?: COURSE_NODE_PREREQUISITESCreateManyPrerequisiteNodeInputEnvelope
    connect?: COURSE_NODE_PREREQUISITESWhereUniqueInput | COURSE_NODE_PREREQUISITESWhereUniqueInput[]
  }

  export type COURSE_NODE_PREREQUISITESUncheckedCreateNestedManyWithoutCourseNodeInput = {
    create?: XOR<COURSE_NODE_PREREQUISITESCreateWithoutCourseNodeInput, COURSE_NODE_PREREQUISITESUncheckedCreateWithoutCourseNodeInput> | COURSE_NODE_PREREQUISITESCreateWithoutCourseNodeInput[] | COURSE_NODE_PREREQUISITESUncheckedCreateWithoutCourseNodeInput[]
    connectOrCreate?: COURSE_NODE_PREREQUISITESCreateOrConnectWithoutCourseNodeInput | COURSE_NODE_PREREQUISITESCreateOrConnectWithoutCourseNodeInput[]
    createMany?: COURSE_NODE_PREREQUISITESCreateManyCourseNodeInputEnvelope
    connect?: COURSE_NODE_PREREQUISITESWhereUniqueInput | COURSE_NODE_PREREQUISITESWhereUniqueInput[]
  }

  export type MAJOR_ROADMAPSUpdateOneRequiredWithoutCourseNodesNestedInput = {
    create?: XOR<MAJOR_ROADMAPSCreateWithoutCourseNodesInput, MAJOR_ROADMAPSUncheckedCreateWithoutCourseNodesInput>
    connectOrCreate?: MAJOR_ROADMAPSCreateOrConnectWithoutCourseNodesInput
    upsert?: MAJOR_ROADMAPSUpsertWithoutCourseNodesInput
    connect?: MAJOR_ROADMAPSWhereUniqueInput
    update?: XOR<XOR<MAJOR_ROADMAPSUpdateToOneWithWhereWithoutCourseNodesInput, MAJOR_ROADMAPSUpdateWithoutCourseNodesInput>, MAJOR_ROADMAPSUncheckedUpdateWithoutCourseNodesInput>
  }

  export type COURSE_TOPICS_NODEUpdateManyWithoutCourseNodeNestedInput = {
    create?: XOR<COURSE_TOPICS_NODECreateWithoutCourseNodeInput, COURSE_TOPICS_NODEUncheckedCreateWithoutCourseNodeInput> | COURSE_TOPICS_NODECreateWithoutCourseNodeInput[] | COURSE_TOPICS_NODEUncheckedCreateWithoutCourseNodeInput[]
    connectOrCreate?: COURSE_TOPICS_NODECreateOrConnectWithoutCourseNodeInput | COURSE_TOPICS_NODECreateOrConnectWithoutCourseNodeInput[]
    upsert?: COURSE_TOPICS_NODEUpsertWithWhereUniqueWithoutCourseNodeInput | COURSE_TOPICS_NODEUpsertWithWhereUniqueWithoutCourseNodeInput[]
    createMany?: COURSE_TOPICS_NODECreateManyCourseNodeInputEnvelope
    set?: COURSE_TOPICS_NODEWhereUniqueInput | COURSE_TOPICS_NODEWhereUniqueInput[]
    disconnect?: COURSE_TOPICS_NODEWhereUniqueInput | COURSE_TOPICS_NODEWhereUniqueInput[]
    delete?: COURSE_TOPICS_NODEWhereUniqueInput | COURSE_TOPICS_NODEWhereUniqueInput[]
    connect?: COURSE_TOPICS_NODEWhereUniqueInput | COURSE_TOPICS_NODEWhereUniqueInput[]
    update?: COURSE_TOPICS_NODEUpdateWithWhereUniqueWithoutCourseNodeInput | COURSE_TOPICS_NODEUpdateWithWhereUniqueWithoutCourseNodeInput[]
    updateMany?: COURSE_TOPICS_NODEUpdateManyWithWhereWithoutCourseNodeInput | COURSE_TOPICS_NODEUpdateManyWithWhereWithoutCourseNodeInput[]
    deleteMany?: COURSE_TOPICS_NODEScalarWhereInput | COURSE_TOPICS_NODEScalarWhereInput[]
  }

  export type COURSE_NODE_PREREQUISITESUpdateManyWithoutPrerequisiteNodeNestedInput = {
    create?: XOR<COURSE_NODE_PREREQUISITESCreateWithoutPrerequisiteNodeInput, COURSE_NODE_PREREQUISITESUncheckedCreateWithoutPrerequisiteNodeInput> | COURSE_NODE_PREREQUISITESCreateWithoutPrerequisiteNodeInput[] | COURSE_NODE_PREREQUISITESUncheckedCreateWithoutPrerequisiteNodeInput[]
    connectOrCreate?: COURSE_NODE_PREREQUISITESCreateOrConnectWithoutPrerequisiteNodeInput | COURSE_NODE_PREREQUISITESCreateOrConnectWithoutPrerequisiteNodeInput[]
    upsert?: COURSE_NODE_PREREQUISITESUpsertWithWhereUniqueWithoutPrerequisiteNodeInput | COURSE_NODE_PREREQUISITESUpsertWithWhereUniqueWithoutPrerequisiteNodeInput[]
    createMany?: COURSE_NODE_PREREQUISITESCreateManyPrerequisiteNodeInputEnvelope
    set?: COURSE_NODE_PREREQUISITESWhereUniqueInput | COURSE_NODE_PREREQUISITESWhereUniqueInput[]
    disconnect?: COURSE_NODE_PREREQUISITESWhereUniqueInput | COURSE_NODE_PREREQUISITESWhereUniqueInput[]
    delete?: COURSE_NODE_PREREQUISITESWhereUniqueInput | COURSE_NODE_PREREQUISITESWhereUniqueInput[]
    connect?: COURSE_NODE_PREREQUISITESWhereUniqueInput | COURSE_NODE_PREREQUISITESWhereUniqueInput[]
    update?: COURSE_NODE_PREREQUISITESUpdateWithWhereUniqueWithoutPrerequisiteNodeInput | COURSE_NODE_PREREQUISITESUpdateWithWhereUniqueWithoutPrerequisiteNodeInput[]
    updateMany?: COURSE_NODE_PREREQUISITESUpdateManyWithWhereWithoutPrerequisiteNodeInput | COURSE_NODE_PREREQUISITESUpdateManyWithWhereWithoutPrerequisiteNodeInput[]
    deleteMany?: COURSE_NODE_PREREQUISITESScalarWhereInput | COURSE_NODE_PREREQUISITESScalarWhereInput[]
  }

  export type COURSE_NODE_PREREQUISITESUpdateManyWithoutCourseNodeNestedInput = {
    create?: XOR<COURSE_NODE_PREREQUISITESCreateWithoutCourseNodeInput, COURSE_NODE_PREREQUISITESUncheckedCreateWithoutCourseNodeInput> | COURSE_NODE_PREREQUISITESCreateWithoutCourseNodeInput[] | COURSE_NODE_PREREQUISITESUncheckedCreateWithoutCourseNodeInput[]
    connectOrCreate?: COURSE_NODE_PREREQUISITESCreateOrConnectWithoutCourseNodeInput | COURSE_NODE_PREREQUISITESCreateOrConnectWithoutCourseNodeInput[]
    upsert?: COURSE_NODE_PREREQUISITESUpsertWithWhereUniqueWithoutCourseNodeInput | COURSE_NODE_PREREQUISITESUpsertWithWhereUniqueWithoutCourseNodeInput[]
    createMany?: COURSE_NODE_PREREQUISITESCreateManyCourseNodeInputEnvelope
    set?: COURSE_NODE_PREREQUISITESWhereUniqueInput | COURSE_NODE_PREREQUISITESWhereUniqueInput[]
    disconnect?: COURSE_NODE_PREREQUISITESWhereUniqueInput | COURSE_NODE_PREREQUISITESWhereUniqueInput[]
    delete?: COURSE_NODE_PREREQUISITESWhereUniqueInput | COURSE_NODE_PREREQUISITESWhereUniqueInput[]
    connect?: COURSE_NODE_PREREQUISITESWhereUniqueInput | COURSE_NODE_PREREQUISITESWhereUniqueInput[]
    update?: COURSE_NODE_PREREQUISITESUpdateWithWhereUniqueWithoutCourseNodeInput | COURSE_NODE_PREREQUISITESUpdateWithWhereUniqueWithoutCourseNodeInput[]
    updateMany?: COURSE_NODE_PREREQUISITESUpdateManyWithWhereWithoutCourseNodeInput | COURSE_NODE_PREREQUISITESUpdateManyWithWhereWithoutCourseNodeInput[]
    deleteMany?: COURSE_NODE_PREREQUISITESScalarWhereInput | COURSE_NODE_PREREQUISITESScalarWhereInput[]
  }

  export type COURSE_TOPICS_NODEUncheckedUpdateManyWithoutCourseNodeNestedInput = {
    create?: XOR<COURSE_TOPICS_NODECreateWithoutCourseNodeInput, COURSE_TOPICS_NODEUncheckedCreateWithoutCourseNodeInput> | COURSE_TOPICS_NODECreateWithoutCourseNodeInput[] | COURSE_TOPICS_NODEUncheckedCreateWithoutCourseNodeInput[]
    connectOrCreate?: COURSE_TOPICS_NODECreateOrConnectWithoutCourseNodeInput | COURSE_TOPICS_NODECreateOrConnectWithoutCourseNodeInput[]
    upsert?: COURSE_TOPICS_NODEUpsertWithWhereUniqueWithoutCourseNodeInput | COURSE_TOPICS_NODEUpsertWithWhereUniqueWithoutCourseNodeInput[]
    createMany?: COURSE_TOPICS_NODECreateManyCourseNodeInputEnvelope
    set?: COURSE_TOPICS_NODEWhereUniqueInput | COURSE_TOPICS_NODEWhereUniqueInput[]
    disconnect?: COURSE_TOPICS_NODEWhereUniqueInput | COURSE_TOPICS_NODEWhereUniqueInput[]
    delete?: COURSE_TOPICS_NODEWhereUniqueInput | COURSE_TOPICS_NODEWhereUniqueInput[]
    connect?: COURSE_TOPICS_NODEWhereUniqueInput | COURSE_TOPICS_NODEWhereUniqueInput[]
    update?: COURSE_TOPICS_NODEUpdateWithWhereUniqueWithoutCourseNodeInput | COURSE_TOPICS_NODEUpdateWithWhereUniqueWithoutCourseNodeInput[]
    updateMany?: COURSE_TOPICS_NODEUpdateManyWithWhereWithoutCourseNodeInput | COURSE_TOPICS_NODEUpdateManyWithWhereWithoutCourseNodeInput[]
    deleteMany?: COURSE_TOPICS_NODEScalarWhereInput | COURSE_TOPICS_NODEScalarWhereInput[]
  }

  export type COURSE_NODE_PREREQUISITESUncheckedUpdateManyWithoutPrerequisiteNodeNestedInput = {
    create?: XOR<COURSE_NODE_PREREQUISITESCreateWithoutPrerequisiteNodeInput, COURSE_NODE_PREREQUISITESUncheckedCreateWithoutPrerequisiteNodeInput> | COURSE_NODE_PREREQUISITESCreateWithoutPrerequisiteNodeInput[] | COURSE_NODE_PREREQUISITESUncheckedCreateWithoutPrerequisiteNodeInput[]
    connectOrCreate?: COURSE_NODE_PREREQUISITESCreateOrConnectWithoutPrerequisiteNodeInput | COURSE_NODE_PREREQUISITESCreateOrConnectWithoutPrerequisiteNodeInput[]
    upsert?: COURSE_NODE_PREREQUISITESUpsertWithWhereUniqueWithoutPrerequisiteNodeInput | COURSE_NODE_PREREQUISITESUpsertWithWhereUniqueWithoutPrerequisiteNodeInput[]
    createMany?: COURSE_NODE_PREREQUISITESCreateManyPrerequisiteNodeInputEnvelope
    set?: COURSE_NODE_PREREQUISITESWhereUniqueInput | COURSE_NODE_PREREQUISITESWhereUniqueInput[]
    disconnect?: COURSE_NODE_PREREQUISITESWhereUniqueInput | COURSE_NODE_PREREQUISITESWhereUniqueInput[]
    delete?: COURSE_NODE_PREREQUISITESWhereUniqueInput | COURSE_NODE_PREREQUISITESWhereUniqueInput[]
    connect?: COURSE_NODE_PREREQUISITESWhereUniqueInput | COURSE_NODE_PREREQUISITESWhereUniqueInput[]
    update?: COURSE_NODE_PREREQUISITESUpdateWithWhereUniqueWithoutPrerequisiteNodeInput | COURSE_NODE_PREREQUISITESUpdateWithWhereUniqueWithoutPrerequisiteNodeInput[]
    updateMany?: COURSE_NODE_PREREQUISITESUpdateManyWithWhereWithoutPrerequisiteNodeInput | COURSE_NODE_PREREQUISITESUpdateManyWithWhereWithoutPrerequisiteNodeInput[]
    deleteMany?: COURSE_NODE_PREREQUISITESScalarWhereInput | COURSE_NODE_PREREQUISITESScalarWhereInput[]
  }

  export type COURSE_NODE_PREREQUISITESUncheckedUpdateManyWithoutCourseNodeNestedInput = {
    create?: XOR<COURSE_NODE_PREREQUISITESCreateWithoutCourseNodeInput, COURSE_NODE_PREREQUISITESUncheckedCreateWithoutCourseNodeInput> | COURSE_NODE_PREREQUISITESCreateWithoutCourseNodeInput[] | COURSE_NODE_PREREQUISITESUncheckedCreateWithoutCourseNodeInput[]
    connectOrCreate?: COURSE_NODE_PREREQUISITESCreateOrConnectWithoutCourseNodeInput | COURSE_NODE_PREREQUISITESCreateOrConnectWithoutCourseNodeInput[]
    upsert?: COURSE_NODE_PREREQUISITESUpsertWithWhereUniqueWithoutCourseNodeInput | COURSE_NODE_PREREQUISITESUpsertWithWhereUniqueWithoutCourseNodeInput[]
    createMany?: COURSE_NODE_PREREQUISITESCreateManyCourseNodeInputEnvelope
    set?: COURSE_NODE_PREREQUISITESWhereUniqueInput | COURSE_NODE_PREREQUISITESWhereUniqueInput[]
    disconnect?: COURSE_NODE_PREREQUISITESWhereUniqueInput | COURSE_NODE_PREREQUISITESWhereUniqueInput[]
    delete?: COURSE_NODE_PREREQUISITESWhereUniqueInput | COURSE_NODE_PREREQUISITESWhereUniqueInput[]
    connect?: COURSE_NODE_PREREQUISITESWhereUniqueInput | COURSE_NODE_PREREQUISITESWhereUniqueInput[]
    update?: COURSE_NODE_PREREQUISITESUpdateWithWhereUniqueWithoutCourseNodeInput | COURSE_NODE_PREREQUISITESUpdateWithWhereUniqueWithoutCourseNodeInput[]
    updateMany?: COURSE_NODE_PREREQUISITESUpdateManyWithWhereWithoutCourseNodeInput | COURSE_NODE_PREREQUISITESUpdateManyWithWhereWithoutCourseNodeInput[]
    deleteMany?: COURSE_NODE_PREREQUISITESScalarWhereInput | COURSE_NODE_PREREQUISITESScalarWhereInput[]
  }

  export type COURSE_NODESCreateNestedOneWithoutPrerequisitesAsTargetInput = {
    create?: XOR<COURSE_NODESCreateWithoutPrerequisitesAsTargetInput, COURSE_NODESUncheckedCreateWithoutPrerequisitesAsTargetInput>
    connectOrCreate?: COURSE_NODESCreateOrConnectWithoutPrerequisitesAsTargetInput
    connect?: COURSE_NODESWhereUniqueInput
  }

  export type COURSE_NODESCreateNestedOneWithoutPrerequisitesAsSourceInput = {
    create?: XOR<COURSE_NODESCreateWithoutPrerequisitesAsSourceInput, COURSE_NODESUncheckedCreateWithoutPrerequisitesAsSourceInput>
    connectOrCreate?: COURSE_NODESCreateOrConnectWithoutPrerequisitesAsSourceInput
    connect?: COURSE_NODESWhereUniqueInput
  }

  export type COURSE_NODESUpdateOneRequiredWithoutPrerequisitesAsTargetNestedInput = {
    create?: XOR<COURSE_NODESCreateWithoutPrerequisitesAsTargetInput, COURSE_NODESUncheckedCreateWithoutPrerequisitesAsTargetInput>
    connectOrCreate?: COURSE_NODESCreateOrConnectWithoutPrerequisitesAsTargetInput
    upsert?: COURSE_NODESUpsertWithoutPrerequisitesAsTargetInput
    connect?: COURSE_NODESWhereUniqueInput
    update?: XOR<XOR<COURSE_NODESUpdateToOneWithWhereWithoutPrerequisitesAsTargetInput, COURSE_NODESUpdateWithoutPrerequisitesAsTargetInput>, COURSE_NODESUncheckedUpdateWithoutPrerequisitesAsTargetInput>
  }

  export type COURSE_NODESUpdateOneRequiredWithoutPrerequisitesAsSourceNestedInput = {
    create?: XOR<COURSE_NODESCreateWithoutPrerequisitesAsSourceInput, COURSE_NODESUncheckedCreateWithoutPrerequisitesAsSourceInput>
    connectOrCreate?: COURSE_NODESCreateOrConnectWithoutPrerequisitesAsSourceInput
    upsert?: COURSE_NODESUpsertWithoutPrerequisitesAsSourceInput
    connect?: COURSE_NODESWhereUniqueInput
    update?: XOR<XOR<COURSE_NODESUpdateToOneWithWhereWithoutPrerequisitesAsSourceInput, COURSE_NODESUpdateWithoutPrerequisitesAsSourceInput>, COURSE_NODESUncheckedUpdateWithoutPrerequisitesAsSourceInput>
  }

  export type COURSE_NODESCreateNestedOneWithoutCourseTopicsInput = {
    create?: XOR<COURSE_NODESCreateWithoutCourseTopicsInput, COURSE_NODESUncheckedCreateWithoutCourseTopicsInput>
    connectOrCreate?: COURSE_NODESCreateOrConnectWithoutCourseTopicsInput
    connect?: COURSE_NODESWhereUniqueInput
  }

  export type COURSE_TOPICS_EDGECreateNestedManyWithoutSourceTopicInput = {
    create?: XOR<COURSE_TOPICS_EDGECreateWithoutSourceTopicInput, COURSE_TOPICS_EDGEUncheckedCreateWithoutSourceTopicInput> | COURSE_TOPICS_EDGECreateWithoutSourceTopicInput[] | COURSE_TOPICS_EDGEUncheckedCreateWithoutSourceTopicInput[]
    connectOrCreate?: COURSE_TOPICS_EDGECreateOrConnectWithoutSourceTopicInput | COURSE_TOPICS_EDGECreateOrConnectWithoutSourceTopicInput[]
    createMany?: COURSE_TOPICS_EDGECreateManySourceTopicInputEnvelope
    connect?: COURSE_TOPICS_EDGEWhereUniqueInput | COURSE_TOPICS_EDGEWhereUniqueInput[]
  }

  export type COURSE_TOPICS_EDGECreateNestedManyWithoutTargetTopicInput = {
    create?: XOR<COURSE_TOPICS_EDGECreateWithoutTargetTopicInput, COURSE_TOPICS_EDGEUncheckedCreateWithoutTargetTopicInput> | COURSE_TOPICS_EDGECreateWithoutTargetTopicInput[] | COURSE_TOPICS_EDGEUncheckedCreateWithoutTargetTopicInput[]
    connectOrCreate?: COURSE_TOPICS_EDGECreateOrConnectWithoutTargetTopicInput | COURSE_TOPICS_EDGECreateOrConnectWithoutTargetTopicInput[]
    createMany?: COURSE_TOPICS_EDGECreateManyTargetTopicInputEnvelope
    connect?: COURSE_TOPICS_EDGEWhereUniqueInput | COURSE_TOPICS_EDGEWhereUniqueInput[]
  }

  export type COURSE_TOPICS_EDGEUncheckedCreateNestedManyWithoutSourceTopicInput = {
    create?: XOR<COURSE_TOPICS_EDGECreateWithoutSourceTopicInput, COURSE_TOPICS_EDGEUncheckedCreateWithoutSourceTopicInput> | COURSE_TOPICS_EDGECreateWithoutSourceTopicInput[] | COURSE_TOPICS_EDGEUncheckedCreateWithoutSourceTopicInput[]
    connectOrCreate?: COURSE_TOPICS_EDGECreateOrConnectWithoutSourceTopicInput | COURSE_TOPICS_EDGECreateOrConnectWithoutSourceTopicInput[]
    createMany?: COURSE_TOPICS_EDGECreateManySourceTopicInputEnvelope
    connect?: COURSE_TOPICS_EDGEWhereUniqueInput | COURSE_TOPICS_EDGEWhereUniqueInput[]
  }

  export type COURSE_TOPICS_EDGEUncheckedCreateNestedManyWithoutTargetTopicInput = {
    create?: XOR<COURSE_TOPICS_EDGECreateWithoutTargetTopicInput, COURSE_TOPICS_EDGEUncheckedCreateWithoutTargetTopicInput> | COURSE_TOPICS_EDGECreateWithoutTargetTopicInput[] | COURSE_TOPICS_EDGEUncheckedCreateWithoutTargetTopicInput[]
    connectOrCreate?: COURSE_TOPICS_EDGECreateOrConnectWithoutTargetTopicInput | COURSE_TOPICS_EDGECreateOrConnectWithoutTargetTopicInput[]
    createMany?: COURSE_TOPICS_EDGECreateManyTargetTopicInputEnvelope
    connect?: COURSE_TOPICS_EDGEWhereUniqueInput | COURSE_TOPICS_EDGEWhereUniqueInput[]
  }

  export type COURSE_NODESUpdateOneRequiredWithoutCourseTopicsNestedInput = {
    create?: XOR<COURSE_NODESCreateWithoutCourseTopicsInput, COURSE_NODESUncheckedCreateWithoutCourseTopicsInput>
    connectOrCreate?: COURSE_NODESCreateOrConnectWithoutCourseTopicsInput
    upsert?: COURSE_NODESUpsertWithoutCourseTopicsInput
    connect?: COURSE_NODESWhereUniqueInput
    update?: XOR<XOR<COURSE_NODESUpdateToOneWithWhereWithoutCourseTopicsInput, COURSE_NODESUpdateWithoutCourseTopicsInput>, COURSE_NODESUncheckedUpdateWithoutCourseTopicsInput>
  }

  export type COURSE_TOPICS_EDGEUpdateManyWithoutSourceTopicNestedInput = {
    create?: XOR<COURSE_TOPICS_EDGECreateWithoutSourceTopicInput, COURSE_TOPICS_EDGEUncheckedCreateWithoutSourceTopicInput> | COURSE_TOPICS_EDGECreateWithoutSourceTopicInput[] | COURSE_TOPICS_EDGEUncheckedCreateWithoutSourceTopicInput[]
    connectOrCreate?: COURSE_TOPICS_EDGECreateOrConnectWithoutSourceTopicInput | COURSE_TOPICS_EDGECreateOrConnectWithoutSourceTopicInput[]
    upsert?: COURSE_TOPICS_EDGEUpsertWithWhereUniqueWithoutSourceTopicInput | COURSE_TOPICS_EDGEUpsertWithWhereUniqueWithoutSourceTopicInput[]
    createMany?: COURSE_TOPICS_EDGECreateManySourceTopicInputEnvelope
    set?: COURSE_TOPICS_EDGEWhereUniqueInput | COURSE_TOPICS_EDGEWhereUniqueInput[]
    disconnect?: COURSE_TOPICS_EDGEWhereUniqueInput | COURSE_TOPICS_EDGEWhereUniqueInput[]
    delete?: COURSE_TOPICS_EDGEWhereUniqueInput | COURSE_TOPICS_EDGEWhereUniqueInput[]
    connect?: COURSE_TOPICS_EDGEWhereUniqueInput | COURSE_TOPICS_EDGEWhereUniqueInput[]
    update?: COURSE_TOPICS_EDGEUpdateWithWhereUniqueWithoutSourceTopicInput | COURSE_TOPICS_EDGEUpdateWithWhereUniqueWithoutSourceTopicInput[]
    updateMany?: COURSE_TOPICS_EDGEUpdateManyWithWhereWithoutSourceTopicInput | COURSE_TOPICS_EDGEUpdateManyWithWhereWithoutSourceTopicInput[]
    deleteMany?: COURSE_TOPICS_EDGEScalarWhereInput | COURSE_TOPICS_EDGEScalarWhereInput[]
  }

  export type COURSE_TOPICS_EDGEUpdateManyWithoutTargetTopicNestedInput = {
    create?: XOR<COURSE_TOPICS_EDGECreateWithoutTargetTopicInput, COURSE_TOPICS_EDGEUncheckedCreateWithoutTargetTopicInput> | COURSE_TOPICS_EDGECreateWithoutTargetTopicInput[] | COURSE_TOPICS_EDGEUncheckedCreateWithoutTargetTopicInput[]
    connectOrCreate?: COURSE_TOPICS_EDGECreateOrConnectWithoutTargetTopicInput | COURSE_TOPICS_EDGECreateOrConnectWithoutTargetTopicInput[]
    upsert?: COURSE_TOPICS_EDGEUpsertWithWhereUniqueWithoutTargetTopicInput | COURSE_TOPICS_EDGEUpsertWithWhereUniqueWithoutTargetTopicInput[]
    createMany?: COURSE_TOPICS_EDGECreateManyTargetTopicInputEnvelope
    set?: COURSE_TOPICS_EDGEWhereUniqueInput | COURSE_TOPICS_EDGEWhereUniqueInput[]
    disconnect?: COURSE_TOPICS_EDGEWhereUniqueInput | COURSE_TOPICS_EDGEWhereUniqueInput[]
    delete?: COURSE_TOPICS_EDGEWhereUniqueInput | COURSE_TOPICS_EDGEWhereUniqueInput[]
    connect?: COURSE_TOPICS_EDGEWhereUniqueInput | COURSE_TOPICS_EDGEWhereUniqueInput[]
    update?: COURSE_TOPICS_EDGEUpdateWithWhereUniqueWithoutTargetTopicInput | COURSE_TOPICS_EDGEUpdateWithWhereUniqueWithoutTargetTopicInput[]
    updateMany?: COURSE_TOPICS_EDGEUpdateManyWithWhereWithoutTargetTopicInput | COURSE_TOPICS_EDGEUpdateManyWithWhereWithoutTargetTopicInput[]
    deleteMany?: COURSE_TOPICS_EDGEScalarWhereInput | COURSE_TOPICS_EDGEScalarWhereInput[]
  }

  export type COURSE_TOPICS_EDGEUncheckedUpdateManyWithoutSourceTopicNestedInput = {
    create?: XOR<COURSE_TOPICS_EDGECreateWithoutSourceTopicInput, COURSE_TOPICS_EDGEUncheckedCreateWithoutSourceTopicInput> | COURSE_TOPICS_EDGECreateWithoutSourceTopicInput[] | COURSE_TOPICS_EDGEUncheckedCreateWithoutSourceTopicInput[]
    connectOrCreate?: COURSE_TOPICS_EDGECreateOrConnectWithoutSourceTopicInput | COURSE_TOPICS_EDGECreateOrConnectWithoutSourceTopicInput[]
    upsert?: COURSE_TOPICS_EDGEUpsertWithWhereUniqueWithoutSourceTopicInput | COURSE_TOPICS_EDGEUpsertWithWhereUniqueWithoutSourceTopicInput[]
    createMany?: COURSE_TOPICS_EDGECreateManySourceTopicInputEnvelope
    set?: COURSE_TOPICS_EDGEWhereUniqueInput | COURSE_TOPICS_EDGEWhereUniqueInput[]
    disconnect?: COURSE_TOPICS_EDGEWhereUniqueInput | COURSE_TOPICS_EDGEWhereUniqueInput[]
    delete?: COURSE_TOPICS_EDGEWhereUniqueInput | COURSE_TOPICS_EDGEWhereUniqueInput[]
    connect?: COURSE_TOPICS_EDGEWhereUniqueInput | COURSE_TOPICS_EDGEWhereUniqueInput[]
    update?: COURSE_TOPICS_EDGEUpdateWithWhereUniqueWithoutSourceTopicInput | COURSE_TOPICS_EDGEUpdateWithWhereUniqueWithoutSourceTopicInput[]
    updateMany?: COURSE_TOPICS_EDGEUpdateManyWithWhereWithoutSourceTopicInput | COURSE_TOPICS_EDGEUpdateManyWithWhereWithoutSourceTopicInput[]
    deleteMany?: COURSE_TOPICS_EDGEScalarWhereInput | COURSE_TOPICS_EDGEScalarWhereInput[]
  }

  export type COURSE_TOPICS_EDGEUncheckedUpdateManyWithoutTargetTopicNestedInput = {
    create?: XOR<COURSE_TOPICS_EDGECreateWithoutTargetTopicInput, COURSE_TOPICS_EDGEUncheckedCreateWithoutTargetTopicInput> | COURSE_TOPICS_EDGECreateWithoutTargetTopicInput[] | COURSE_TOPICS_EDGEUncheckedCreateWithoutTargetTopicInput[]
    connectOrCreate?: COURSE_TOPICS_EDGECreateOrConnectWithoutTargetTopicInput | COURSE_TOPICS_EDGECreateOrConnectWithoutTargetTopicInput[]
    upsert?: COURSE_TOPICS_EDGEUpsertWithWhereUniqueWithoutTargetTopicInput | COURSE_TOPICS_EDGEUpsertWithWhereUniqueWithoutTargetTopicInput[]
    createMany?: COURSE_TOPICS_EDGECreateManyTargetTopicInputEnvelope
    set?: COURSE_TOPICS_EDGEWhereUniqueInput | COURSE_TOPICS_EDGEWhereUniqueInput[]
    disconnect?: COURSE_TOPICS_EDGEWhereUniqueInput | COURSE_TOPICS_EDGEWhereUniqueInput[]
    delete?: COURSE_TOPICS_EDGEWhereUniqueInput | COURSE_TOPICS_EDGEWhereUniqueInput[]
    connect?: COURSE_TOPICS_EDGEWhereUniqueInput | COURSE_TOPICS_EDGEWhereUniqueInput[]
    update?: COURSE_TOPICS_EDGEUpdateWithWhereUniqueWithoutTargetTopicInput | COURSE_TOPICS_EDGEUpdateWithWhereUniqueWithoutTargetTopicInput[]
    updateMany?: COURSE_TOPICS_EDGEUpdateManyWithWhereWithoutTargetTopicInput | COURSE_TOPICS_EDGEUpdateManyWithWhereWithoutTargetTopicInput[]
    deleteMany?: COURSE_TOPICS_EDGEScalarWhereInput | COURSE_TOPICS_EDGEScalarWhereInput[]
  }

  export type COURSE_TOPICS_NODECreateNestedOneWithoutTopicEdgesAsSourceInput = {
    create?: XOR<COURSE_TOPICS_NODECreateWithoutTopicEdgesAsSourceInput, COURSE_TOPICS_NODEUncheckedCreateWithoutTopicEdgesAsSourceInput>
    connectOrCreate?: COURSE_TOPICS_NODECreateOrConnectWithoutTopicEdgesAsSourceInput
    connect?: COURSE_TOPICS_NODEWhereUniqueInput
  }

  export type COURSE_TOPICS_NODECreateNestedOneWithoutTopicEdgesAsTargetInput = {
    create?: XOR<COURSE_TOPICS_NODECreateWithoutTopicEdgesAsTargetInput, COURSE_TOPICS_NODEUncheckedCreateWithoutTopicEdgesAsTargetInput>
    connectOrCreate?: COURSE_TOPICS_NODECreateOrConnectWithoutTopicEdgesAsTargetInput
    connect?: COURSE_TOPICS_NODEWhereUniqueInput
  }

  export type COURSE_TOPICS_NODEUpdateOneRequiredWithoutTopicEdgesAsSourceNestedInput = {
    create?: XOR<COURSE_TOPICS_NODECreateWithoutTopicEdgesAsSourceInput, COURSE_TOPICS_NODEUncheckedCreateWithoutTopicEdgesAsSourceInput>
    connectOrCreate?: COURSE_TOPICS_NODECreateOrConnectWithoutTopicEdgesAsSourceInput
    upsert?: COURSE_TOPICS_NODEUpsertWithoutTopicEdgesAsSourceInput
    connect?: COURSE_TOPICS_NODEWhereUniqueInput
    update?: XOR<XOR<COURSE_TOPICS_NODEUpdateToOneWithWhereWithoutTopicEdgesAsSourceInput, COURSE_TOPICS_NODEUpdateWithoutTopicEdgesAsSourceInput>, COURSE_TOPICS_NODEUncheckedUpdateWithoutTopicEdgesAsSourceInput>
  }

  export type COURSE_TOPICS_NODEUpdateOneRequiredWithoutTopicEdgesAsTargetNestedInput = {
    create?: XOR<COURSE_TOPICS_NODECreateWithoutTopicEdgesAsTargetInput, COURSE_TOPICS_NODEUncheckedCreateWithoutTopicEdgesAsTargetInput>
    connectOrCreate?: COURSE_TOPICS_NODECreateOrConnectWithoutTopicEdgesAsTargetInput
    upsert?: COURSE_TOPICS_NODEUpsertWithoutTopicEdgesAsTargetInput
    connect?: COURSE_TOPICS_NODEWhereUniqueInput
    update?: XOR<XOR<COURSE_TOPICS_NODEUpdateToOneWithWhereWithoutTopicEdgesAsTargetInput, COURSE_TOPICS_NODEUpdateWithoutTopicEdgesAsTargetInput>, COURSE_TOPICS_NODEUncheckedUpdateWithoutTopicEdgesAsTargetInput>
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
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type MAJOR_ROADMAPSCreateWithoutDepartmentInput = {
    slug: string
    name: string
    total_credits: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    courseNodes?: COURSE_NODESCreateNestedManyWithoutRoadmapInput
  }

  export type MAJOR_ROADMAPSUncheckedCreateWithoutDepartmentInput = {
    id?: number
    slug: string
    name: string
    total_credits: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    courseNodes?: COURSE_NODESUncheckedCreateNestedManyWithoutRoadmapInput
  }

  export type MAJOR_ROADMAPSCreateOrConnectWithoutDepartmentInput = {
    where: MAJOR_ROADMAPSWhereUniqueInput
    create: XOR<MAJOR_ROADMAPSCreateWithoutDepartmentInput, MAJOR_ROADMAPSUncheckedCreateWithoutDepartmentInput>
  }

  export type MAJOR_ROADMAPSCreateManyDepartmentInputEnvelope = {
    data: MAJOR_ROADMAPSCreateManyDepartmentInput | MAJOR_ROADMAPSCreateManyDepartmentInput[]
    skipDuplicates?: boolean
  }

  export type MAJOR_ROADMAPSUpsertWithWhereUniqueWithoutDepartmentInput = {
    where: MAJOR_ROADMAPSWhereUniqueInput
    update: XOR<MAJOR_ROADMAPSUpdateWithoutDepartmentInput, MAJOR_ROADMAPSUncheckedUpdateWithoutDepartmentInput>
    create: XOR<MAJOR_ROADMAPSCreateWithoutDepartmentInput, MAJOR_ROADMAPSUncheckedCreateWithoutDepartmentInput>
  }

  export type MAJOR_ROADMAPSUpdateWithWhereUniqueWithoutDepartmentInput = {
    where: MAJOR_ROADMAPSWhereUniqueInput
    data: XOR<MAJOR_ROADMAPSUpdateWithoutDepartmentInput, MAJOR_ROADMAPSUncheckedUpdateWithoutDepartmentInput>
  }

  export type MAJOR_ROADMAPSUpdateManyWithWhereWithoutDepartmentInput = {
    where: MAJOR_ROADMAPSScalarWhereInput
    data: XOR<MAJOR_ROADMAPSUpdateManyMutationInput, MAJOR_ROADMAPSUncheckedUpdateManyWithoutDepartmentInput>
  }

  export type MAJOR_ROADMAPSScalarWhereInput = {
    AND?: MAJOR_ROADMAPSScalarWhereInput | MAJOR_ROADMAPSScalarWhereInput[]
    OR?: MAJOR_ROADMAPSScalarWhereInput[]
    NOT?: MAJOR_ROADMAPSScalarWhereInput | MAJOR_ROADMAPSScalarWhereInput[]
    id?: IntFilter<"MAJOR_ROADMAPS"> | number
    slug?: StringFilter<"MAJOR_ROADMAPS"> | string
    name?: StringFilter<"MAJOR_ROADMAPS"> | string
    total_credits?: IntFilter<"MAJOR_ROADMAPS"> | number
    description?: StringNullableFilter<"MAJOR_ROADMAPS"> | string | null
    department_id?: IntFilter<"MAJOR_ROADMAPS"> | number
    created_at?: DateTimeFilter<"MAJOR_ROADMAPS"> | Date | string
    updated_at?: DateTimeFilter<"MAJOR_ROADMAPS"> | Date | string
  }

  export type DEPARTMENTSCreateWithoutRoadmapsInput = {
    slug: string
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DEPARTMENTSUncheckedCreateWithoutRoadmapsInput = {
    id?: number
    slug: string
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DEPARTMENTSCreateOrConnectWithoutRoadmapsInput = {
    where: DEPARTMENTSWhereUniqueInput
    create: XOR<DEPARTMENTSCreateWithoutRoadmapsInput, DEPARTMENTSUncheckedCreateWithoutRoadmapsInput>
  }

  export type COURSE_NODESCreateWithoutRoadmapInput = {
    slug: string
    name: string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    courseTopics?: COURSE_TOPICS_NODECreateNestedManyWithoutCourseNodeInput
    prerequisitesAsSource?: COURSE_NODE_PREREQUISITESCreateNestedManyWithoutPrerequisiteNodeInput
    prerequisitesAsTarget?: COURSE_NODE_PREREQUISITESCreateNestedManyWithoutCourseNodeInput
  }

  export type COURSE_NODESUncheckedCreateWithoutRoadmapInput = {
    id?: number
    slug: string
    name: string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    courseTopics?: COURSE_TOPICS_NODEUncheckedCreateNestedManyWithoutCourseNodeInput
    prerequisitesAsSource?: COURSE_NODE_PREREQUISITESUncheckedCreateNestedManyWithoutPrerequisiteNodeInput
    prerequisitesAsTarget?: COURSE_NODE_PREREQUISITESUncheckedCreateNestedManyWithoutCourseNodeInput
  }

  export type COURSE_NODESCreateOrConnectWithoutRoadmapInput = {
    where: COURSE_NODESWhereUniqueInput
    create: XOR<COURSE_NODESCreateWithoutRoadmapInput, COURSE_NODESUncheckedCreateWithoutRoadmapInput>
  }

  export type COURSE_NODESCreateManyRoadmapInputEnvelope = {
    data: COURSE_NODESCreateManyRoadmapInput | COURSE_NODESCreateManyRoadmapInput[]
    skipDuplicates?: boolean
  }

  export type DEPARTMENTSUpsertWithoutRoadmapsInput = {
    update: XOR<DEPARTMENTSUpdateWithoutRoadmapsInput, DEPARTMENTSUncheckedUpdateWithoutRoadmapsInput>
    create: XOR<DEPARTMENTSCreateWithoutRoadmapsInput, DEPARTMENTSUncheckedCreateWithoutRoadmapsInput>
    where?: DEPARTMENTSWhereInput
  }

  export type DEPARTMENTSUpdateToOneWithWhereWithoutRoadmapsInput = {
    where?: DEPARTMENTSWhereInput
    data: XOR<DEPARTMENTSUpdateWithoutRoadmapsInput, DEPARTMENTSUncheckedUpdateWithoutRoadmapsInput>
  }

  export type DEPARTMENTSUpdateWithoutRoadmapsInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DEPARTMENTSUncheckedUpdateWithoutRoadmapsInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type COURSE_NODESUpsertWithWhereUniqueWithoutRoadmapInput = {
    where: COURSE_NODESWhereUniqueInput
    update: XOR<COURSE_NODESUpdateWithoutRoadmapInput, COURSE_NODESUncheckedUpdateWithoutRoadmapInput>
    create: XOR<COURSE_NODESCreateWithoutRoadmapInput, COURSE_NODESUncheckedCreateWithoutRoadmapInput>
  }

  export type COURSE_NODESUpdateWithWhereUniqueWithoutRoadmapInput = {
    where: COURSE_NODESWhereUniqueInput
    data: XOR<COURSE_NODESUpdateWithoutRoadmapInput, COURSE_NODESUncheckedUpdateWithoutRoadmapInput>
  }

  export type COURSE_NODESUpdateManyWithWhereWithoutRoadmapInput = {
    where: COURSE_NODESScalarWhereInput
    data: XOR<COURSE_NODESUpdateManyMutationInput, COURSE_NODESUncheckedUpdateManyWithoutRoadmapInput>
  }

  export type COURSE_NODESScalarWhereInput = {
    AND?: COURSE_NODESScalarWhereInput | COURSE_NODESScalarWhereInput[]
    OR?: COURSE_NODESScalarWhereInput[]
    NOT?: COURSE_NODESScalarWhereInput | COURSE_NODESScalarWhereInput[]
    id?: IntFilter<"COURSE_NODES"> | number
    roadmap_id?: IntFilter<"COURSE_NODES"> | number
    slug?: StringFilter<"COURSE_NODES"> | string
    name?: StringFilter<"COURSE_NODES"> | string
    coords?: JsonNullableFilter<"COURSE_NODES">
    credits?: IntFilter<"COURSE_NODES"> | number
    description?: StringNullableFilter<"COURSE_NODES"> | string | null
    created_at?: DateTimeFilter<"COURSE_NODES"> | Date | string
    updated_at?: DateTimeFilter<"COURSE_NODES"> | Date | string
  }

  export type MAJOR_ROADMAPSCreateWithoutCourseNodesInput = {
    slug: string
    name: string
    total_credits: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    department: DEPARTMENTSCreateNestedOneWithoutRoadmapsInput
  }

  export type MAJOR_ROADMAPSUncheckedCreateWithoutCourseNodesInput = {
    id?: number
    slug: string
    name: string
    total_credits: number
    description?: string | null
    department_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type MAJOR_ROADMAPSCreateOrConnectWithoutCourseNodesInput = {
    where: MAJOR_ROADMAPSWhereUniqueInput
    create: XOR<MAJOR_ROADMAPSCreateWithoutCourseNodesInput, MAJOR_ROADMAPSUncheckedCreateWithoutCourseNodesInput>
  }

  export type COURSE_TOPICS_NODECreateWithoutCourseNodeInput = {
    slug: string
    title: string
    description?: string | null
    coords?: NullableJsonNullValueInput | InputJsonValue
    learning_objectives?: string | null
    resources_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    topicEdgesAsSource?: COURSE_TOPICS_EDGECreateNestedManyWithoutSourceTopicInput
    topicEdgesAsTarget?: COURSE_TOPICS_EDGECreateNestedManyWithoutTargetTopicInput
  }

  export type COURSE_TOPICS_NODEUncheckedCreateWithoutCourseNodeInput = {
    id?: number
    slug: string
    title: string
    description?: string | null
    coords?: NullableJsonNullValueInput | InputJsonValue
    learning_objectives?: string | null
    resources_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    topicEdgesAsSource?: COURSE_TOPICS_EDGEUncheckedCreateNestedManyWithoutSourceTopicInput
    topicEdgesAsTarget?: COURSE_TOPICS_EDGEUncheckedCreateNestedManyWithoutTargetTopicInput
  }

  export type COURSE_TOPICS_NODECreateOrConnectWithoutCourseNodeInput = {
    where: COURSE_TOPICS_NODEWhereUniqueInput
    create: XOR<COURSE_TOPICS_NODECreateWithoutCourseNodeInput, COURSE_TOPICS_NODEUncheckedCreateWithoutCourseNodeInput>
  }

  export type COURSE_TOPICS_NODECreateManyCourseNodeInputEnvelope = {
    data: COURSE_TOPICS_NODECreateManyCourseNodeInput | COURSE_TOPICS_NODECreateManyCourseNodeInput[]
    skipDuplicates?: boolean
  }

  export type COURSE_NODE_PREREQUISITESCreateWithoutPrerequisiteNodeInput = {
    created_at?: Date | string
    updated_at?: Date | string
    courseNode: COURSE_NODESCreateNestedOneWithoutPrerequisitesAsTargetInput
  }

  export type COURSE_NODE_PREREQUISITESUncheckedCreateWithoutPrerequisiteNodeInput = {
    id?: number
    course_node_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type COURSE_NODE_PREREQUISITESCreateOrConnectWithoutPrerequisiteNodeInput = {
    where: COURSE_NODE_PREREQUISITESWhereUniqueInput
    create: XOR<COURSE_NODE_PREREQUISITESCreateWithoutPrerequisiteNodeInput, COURSE_NODE_PREREQUISITESUncheckedCreateWithoutPrerequisiteNodeInput>
  }

  export type COURSE_NODE_PREREQUISITESCreateManyPrerequisiteNodeInputEnvelope = {
    data: COURSE_NODE_PREREQUISITESCreateManyPrerequisiteNodeInput | COURSE_NODE_PREREQUISITESCreateManyPrerequisiteNodeInput[]
    skipDuplicates?: boolean
  }

  export type COURSE_NODE_PREREQUISITESCreateWithoutCourseNodeInput = {
    created_at?: Date | string
    updated_at?: Date | string
    prerequisiteNode: COURSE_NODESCreateNestedOneWithoutPrerequisitesAsSourceInput
  }

  export type COURSE_NODE_PREREQUISITESUncheckedCreateWithoutCourseNodeInput = {
    id?: number
    prerequisite_node_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type COURSE_NODE_PREREQUISITESCreateOrConnectWithoutCourseNodeInput = {
    where: COURSE_NODE_PREREQUISITESWhereUniqueInput
    create: XOR<COURSE_NODE_PREREQUISITESCreateWithoutCourseNodeInput, COURSE_NODE_PREREQUISITESUncheckedCreateWithoutCourseNodeInput>
  }

  export type COURSE_NODE_PREREQUISITESCreateManyCourseNodeInputEnvelope = {
    data: COURSE_NODE_PREREQUISITESCreateManyCourseNodeInput | COURSE_NODE_PREREQUISITESCreateManyCourseNodeInput[]
    skipDuplicates?: boolean
  }

  export type MAJOR_ROADMAPSUpsertWithoutCourseNodesInput = {
    update: XOR<MAJOR_ROADMAPSUpdateWithoutCourseNodesInput, MAJOR_ROADMAPSUncheckedUpdateWithoutCourseNodesInput>
    create: XOR<MAJOR_ROADMAPSCreateWithoutCourseNodesInput, MAJOR_ROADMAPSUncheckedCreateWithoutCourseNodesInput>
    where?: MAJOR_ROADMAPSWhereInput
  }

  export type MAJOR_ROADMAPSUpdateToOneWithWhereWithoutCourseNodesInput = {
    where?: MAJOR_ROADMAPSWhereInput
    data: XOR<MAJOR_ROADMAPSUpdateWithoutCourseNodesInput, MAJOR_ROADMAPSUncheckedUpdateWithoutCourseNodesInput>
  }

  export type MAJOR_ROADMAPSUpdateWithoutCourseNodesInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    total_credits?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: DEPARTMENTSUpdateOneRequiredWithoutRoadmapsNestedInput
  }

  export type MAJOR_ROADMAPSUncheckedUpdateWithoutCourseNodesInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    total_credits?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    department_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type COURSE_TOPICS_NODEUpsertWithWhereUniqueWithoutCourseNodeInput = {
    where: COURSE_TOPICS_NODEWhereUniqueInput
    update: XOR<COURSE_TOPICS_NODEUpdateWithoutCourseNodeInput, COURSE_TOPICS_NODEUncheckedUpdateWithoutCourseNodeInput>
    create: XOR<COURSE_TOPICS_NODECreateWithoutCourseNodeInput, COURSE_TOPICS_NODEUncheckedCreateWithoutCourseNodeInput>
  }

  export type COURSE_TOPICS_NODEUpdateWithWhereUniqueWithoutCourseNodeInput = {
    where: COURSE_TOPICS_NODEWhereUniqueInput
    data: XOR<COURSE_TOPICS_NODEUpdateWithoutCourseNodeInput, COURSE_TOPICS_NODEUncheckedUpdateWithoutCourseNodeInput>
  }

  export type COURSE_TOPICS_NODEUpdateManyWithWhereWithoutCourseNodeInput = {
    where: COURSE_TOPICS_NODEScalarWhereInput
    data: XOR<COURSE_TOPICS_NODEUpdateManyMutationInput, COURSE_TOPICS_NODEUncheckedUpdateManyWithoutCourseNodeInput>
  }

  export type COURSE_TOPICS_NODEScalarWhereInput = {
    AND?: COURSE_TOPICS_NODEScalarWhereInput | COURSE_TOPICS_NODEScalarWhereInput[]
    OR?: COURSE_TOPICS_NODEScalarWhereInput[]
    NOT?: COURSE_TOPICS_NODEScalarWhereInput | COURSE_TOPICS_NODEScalarWhereInput[]
    id?: IntFilter<"COURSE_TOPICS_NODE"> | number
    course_node_id?: IntFilter<"COURSE_TOPICS_NODE"> | number
    slug?: StringFilter<"COURSE_TOPICS_NODE"> | string
    title?: StringFilter<"COURSE_TOPICS_NODE"> | string
    description?: StringNullableFilter<"COURSE_TOPICS_NODE"> | string | null
    coords?: JsonNullableFilter<"COURSE_TOPICS_NODE">
    learning_objectives?: StringNullableFilter<"COURSE_TOPICS_NODE"> | string | null
    resources_url?: StringNullableFilter<"COURSE_TOPICS_NODE"> | string | null
    created_at?: DateTimeFilter<"COURSE_TOPICS_NODE"> | Date | string
    updated_at?: DateTimeFilter<"COURSE_TOPICS_NODE"> | Date | string
  }

  export type COURSE_NODE_PREREQUISITESUpsertWithWhereUniqueWithoutPrerequisiteNodeInput = {
    where: COURSE_NODE_PREREQUISITESWhereUniqueInput
    update: XOR<COURSE_NODE_PREREQUISITESUpdateWithoutPrerequisiteNodeInput, COURSE_NODE_PREREQUISITESUncheckedUpdateWithoutPrerequisiteNodeInput>
    create: XOR<COURSE_NODE_PREREQUISITESCreateWithoutPrerequisiteNodeInput, COURSE_NODE_PREREQUISITESUncheckedCreateWithoutPrerequisiteNodeInput>
  }

  export type COURSE_NODE_PREREQUISITESUpdateWithWhereUniqueWithoutPrerequisiteNodeInput = {
    where: COURSE_NODE_PREREQUISITESWhereUniqueInput
    data: XOR<COURSE_NODE_PREREQUISITESUpdateWithoutPrerequisiteNodeInput, COURSE_NODE_PREREQUISITESUncheckedUpdateWithoutPrerequisiteNodeInput>
  }

  export type COURSE_NODE_PREREQUISITESUpdateManyWithWhereWithoutPrerequisiteNodeInput = {
    where: COURSE_NODE_PREREQUISITESScalarWhereInput
    data: XOR<COURSE_NODE_PREREQUISITESUpdateManyMutationInput, COURSE_NODE_PREREQUISITESUncheckedUpdateManyWithoutPrerequisiteNodeInput>
  }

  export type COURSE_NODE_PREREQUISITESScalarWhereInput = {
    AND?: COURSE_NODE_PREREQUISITESScalarWhereInput | COURSE_NODE_PREREQUISITESScalarWhereInput[]
    OR?: COURSE_NODE_PREREQUISITESScalarWhereInput[]
    NOT?: COURSE_NODE_PREREQUISITESScalarWhereInput | COURSE_NODE_PREREQUISITESScalarWhereInput[]
    id?: IntFilter<"COURSE_NODE_PREREQUISITES"> | number
    course_node_id?: IntFilter<"COURSE_NODE_PREREQUISITES"> | number
    prerequisite_node_id?: IntFilter<"COURSE_NODE_PREREQUISITES"> | number
    created_at?: DateTimeFilter<"COURSE_NODE_PREREQUISITES"> | Date | string
    updated_at?: DateTimeFilter<"COURSE_NODE_PREREQUISITES"> | Date | string
  }

  export type COURSE_NODE_PREREQUISITESUpsertWithWhereUniqueWithoutCourseNodeInput = {
    where: COURSE_NODE_PREREQUISITESWhereUniqueInput
    update: XOR<COURSE_NODE_PREREQUISITESUpdateWithoutCourseNodeInput, COURSE_NODE_PREREQUISITESUncheckedUpdateWithoutCourseNodeInput>
    create: XOR<COURSE_NODE_PREREQUISITESCreateWithoutCourseNodeInput, COURSE_NODE_PREREQUISITESUncheckedCreateWithoutCourseNodeInput>
  }

  export type COURSE_NODE_PREREQUISITESUpdateWithWhereUniqueWithoutCourseNodeInput = {
    where: COURSE_NODE_PREREQUISITESWhereUniqueInput
    data: XOR<COURSE_NODE_PREREQUISITESUpdateWithoutCourseNodeInput, COURSE_NODE_PREREQUISITESUncheckedUpdateWithoutCourseNodeInput>
  }

  export type COURSE_NODE_PREREQUISITESUpdateManyWithWhereWithoutCourseNodeInput = {
    where: COURSE_NODE_PREREQUISITESScalarWhereInput
    data: XOR<COURSE_NODE_PREREQUISITESUpdateManyMutationInput, COURSE_NODE_PREREQUISITESUncheckedUpdateManyWithoutCourseNodeInput>
  }

  export type COURSE_NODESCreateWithoutPrerequisitesAsTargetInput = {
    slug: string
    name: string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    roadmap: MAJOR_ROADMAPSCreateNestedOneWithoutCourseNodesInput
    courseTopics?: COURSE_TOPICS_NODECreateNestedManyWithoutCourseNodeInput
    prerequisitesAsSource?: COURSE_NODE_PREREQUISITESCreateNestedManyWithoutPrerequisiteNodeInput
  }

  export type COURSE_NODESUncheckedCreateWithoutPrerequisitesAsTargetInput = {
    id?: number
    roadmap_id: number
    slug: string
    name: string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    courseTopics?: COURSE_TOPICS_NODEUncheckedCreateNestedManyWithoutCourseNodeInput
    prerequisitesAsSource?: COURSE_NODE_PREREQUISITESUncheckedCreateNestedManyWithoutPrerequisiteNodeInput
  }

  export type COURSE_NODESCreateOrConnectWithoutPrerequisitesAsTargetInput = {
    where: COURSE_NODESWhereUniqueInput
    create: XOR<COURSE_NODESCreateWithoutPrerequisitesAsTargetInput, COURSE_NODESUncheckedCreateWithoutPrerequisitesAsTargetInput>
  }

  export type COURSE_NODESCreateWithoutPrerequisitesAsSourceInput = {
    slug: string
    name: string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    roadmap: MAJOR_ROADMAPSCreateNestedOneWithoutCourseNodesInput
    courseTopics?: COURSE_TOPICS_NODECreateNestedManyWithoutCourseNodeInput
    prerequisitesAsTarget?: COURSE_NODE_PREREQUISITESCreateNestedManyWithoutCourseNodeInput
  }

  export type COURSE_NODESUncheckedCreateWithoutPrerequisitesAsSourceInput = {
    id?: number
    roadmap_id: number
    slug: string
    name: string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    courseTopics?: COURSE_TOPICS_NODEUncheckedCreateNestedManyWithoutCourseNodeInput
    prerequisitesAsTarget?: COURSE_NODE_PREREQUISITESUncheckedCreateNestedManyWithoutCourseNodeInput
  }

  export type COURSE_NODESCreateOrConnectWithoutPrerequisitesAsSourceInput = {
    where: COURSE_NODESWhereUniqueInput
    create: XOR<COURSE_NODESCreateWithoutPrerequisitesAsSourceInput, COURSE_NODESUncheckedCreateWithoutPrerequisitesAsSourceInput>
  }

  export type COURSE_NODESUpsertWithoutPrerequisitesAsTargetInput = {
    update: XOR<COURSE_NODESUpdateWithoutPrerequisitesAsTargetInput, COURSE_NODESUncheckedUpdateWithoutPrerequisitesAsTargetInput>
    create: XOR<COURSE_NODESCreateWithoutPrerequisitesAsTargetInput, COURSE_NODESUncheckedCreateWithoutPrerequisitesAsTargetInput>
    where?: COURSE_NODESWhereInput
  }

  export type COURSE_NODESUpdateToOneWithWhereWithoutPrerequisitesAsTargetInput = {
    where?: COURSE_NODESWhereInput
    data: XOR<COURSE_NODESUpdateWithoutPrerequisitesAsTargetInput, COURSE_NODESUncheckedUpdateWithoutPrerequisitesAsTargetInput>
  }

  export type COURSE_NODESUpdateWithoutPrerequisitesAsTargetInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roadmap?: MAJOR_ROADMAPSUpdateOneRequiredWithoutCourseNodesNestedInput
    courseTopics?: COURSE_TOPICS_NODEUpdateManyWithoutCourseNodeNestedInput
    prerequisitesAsSource?: COURSE_NODE_PREREQUISITESUpdateManyWithoutPrerequisiteNodeNestedInput
  }

  export type COURSE_NODESUncheckedUpdateWithoutPrerequisitesAsTargetInput = {
    id?: IntFieldUpdateOperationsInput | number
    roadmap_id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    courseTopics?: COURSE_TOPICS_NODEUncheckedUpdateManyWithoutCourseNodeNestedInput
    prerequisitesAsSource?: COURSE_NODE_PREREQUISITESUncheckedUpdateManyWithoutPrerequisiteNodeNestedInput
  }

  export type COURSE_NODESUpsertWithoutPrerequisitesAsSourceInput = {
    update: XOR<COURSE_NODESUpdateWithoutPrerequisitesAsSourceInput, COURSE_NODESUncheckedUpdateWithoutPrerequisitesAsSourceInput>
    create: XOR<COURSE_NODESCreateWithoutPrerequisitesAsSourceInput, COURSE_NODESUncheckedCreateWithoutPrerequisitesAsSourceInput>
    where?: COURSE_NODESWhereInput
  }

  export type COURSE_NODESUpdateToOneWithWhereWithoutPrerequisitesAsSourceInput = {
    where?: COURSE_NODESWhereInput
    data: XOR<COURSE_NODESUpdateWithoutPrerequisitesAsSourceInput, COURSE_NODESUncheckedUpdateWithoutPrerequisitesAsSourceInput>
  }

  export type COURSE_NODESUpdateWithoutPrerequisitesAsSourceInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roadmap?: MAJOR_ROADMAPSUpdateOneRequiredWithoutCourseNodesNestedInput
    courseTopics?: COURSE_TOPICS_NODEUpdateManyWithoutCourseNodeNestedInput
    prerequisitesAsTarget?: COURSE_NODE_PREREQUISITESUpdateManyWithoutCourseNodeNestedInput
  }

  export type COURSE_NODESUncheckedUpdateWithoutPrerequisitesAsSourceInput = {
    id?: IntFieldUpdateOperationsInput | number
    roadmap_id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    courseTopics?: COURSE_TOPICS_NODEUncheckedUpdateManyWithoutCourseNodeNestedInput
    prerequisitesAsTarget?: COURSE_NODE_PREREQUISITESUncheckedUpdateManyWithoutCourseNodeNestedInput
  }

  export type COURSE_NODESCreateWithoutCourseTopicsInput = {
    slug: string
    name: string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    roadmap: MAJOR_ROADMAPSCreateNestedOneWithoutCourseNodesInput
    prerequisitesAsSource?: COURSE_NODE_PREREQUISITESCreateNestedManyWithoutPrerequisiteNodeInput
    prerequisitesAsTarget?: COURSE_NODE_PREREQUISITESCreateNestedManyWithoutCourseNodeInput
  }

  export type COURSE_NODESUncheckedCreateWithoutCourseTopicsInput = {
    id?: number
    roadmap_id: number
    slug: string
    name: string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    prerequisitesAsSource?: COURSE_NODE_PREREQUISITESUncheckedCreateNestedManyWithoutPrerequisiteNodeInput
    prerequisitesAsTarget?: COURSE_NODE_PREREQUISITESUncheckedCreateNestedManyWithoutCourseNodeInput
  }

  export type COURSE_NODESCreateOrConnectWithoutCourseTopicsInput = {
    where: COURSE_NODESWhereUniqueInput
    create: XOR<COURSE_NODESCreateWithoutCourseTopicsInput, COURSE_NODESUncheckedCreateWithoutCourseTopicsInput>
  }

  export type COURSE_TOPICS_EDGECreateWithoutSourceTopicInput = {
    created_at?: Date | string
    targetTopic: COURSE_TOPICS_NODECreateNestedOneWithoutTopicEdgesAsTargetInput
  }

  export type COURSE_TOPICS_EDGEUncheckedCreateWithoutSourceTopicInput = {
    id?: number
    target_topic_id: number
    created_at?: Date | string
  }

  export type COURSE_TOPICS_EDGECreateOrConnectWithoutSourceTopicInput = {
    where: COURSE_TOPICS_EDGEWhereUniqueInput
    create: XOR<COURSE_TOPICS_EDGECreateWithoutSourceTopicInput, COURSE_TOPICS_EDGEUncheckedCreateWithoutSourceTopicInput>
  }

  export type COURSE_TOPICS_EDGECreateManySourceTopicInputEnvelope = {
    data: COURSE_TOPICS_EDGECreateManySourceTopicInput | COURSE_TOPICS_EDGECreateManySourceTopicInput[]
    skipDuplicates?: boolean
  }

  export type COURSE_TOPICS_EDGECreateWithoutTargetTopicInput = {
    created_at?: Date | string
    sourceTopic: COURSE_TOPICS_NODECreateNestedOneWithoutTopicEdgesAsSourceInput
  }

  export type COURSE_TOPICS_EDGEUncheckedCreateWithoutTargetTopicInput = {
    id?: number
    source_topic_id: number
    created_at?: Date | string
  }

  export type COURSE_TOPICS_EDGECreateOrConnectWithoutTargetTopicInput = {
    where: COURSE_TOPICS_EDGEWhereUniqueInput
    create: XOR<COURSE_TOPICS_EDGECreateWithoutTargetTopicInput, COURSE_TOPICS_EDGEUncheckedCreateWithoutTargetTopicInput>
  }

  export type COURSE_TOPICS_EDGECreateManyTargetTopicInputEnvelope = {
    data: COURSE_TOPICS_EDGECreateManyTargetTopicInput | COURSE_TOPICS_EDGECreateManyTargetTopicInput[]
    skipDuplicates?: boolean
  }

  export type COURSE_NODESUpsertWithoutCourseTopicsInput = {
    update: XOR<COURSE_NODESUpdateWithoutCourseTopicsInput, COURSE_NODESUncheckedUpdateWithoutCourseTopicsInput>
    create: XOR<COURSE_NODESCreateWithoutCourseTopicsInput, COURSE_NODESUncheckedCreateWithoutCourseTopicsInput>
    where?: COURSE_NODESWhereInput
  }

  export type COURSE_NODESUpdateToOneWithWhereWithoutCourseTopicsInput = {
    where?: COURSE_NODESWhereInput
    data: XOR<COURSE_NODESUpdateWithoutCourseTopicsInput, COURSE_NODESUncheckedUpdateWithoutCourseTopicsInput>
  }

  export type COURSE_NODESUpdateWithoutCourseTopicsInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roadmap?: MAJOR_ROADMAPSUpdateOneRequiredWithoutCourseNodesNestedInput
    prerequisitesAsSource?: COURSE_NODE_PREREQUISITESUpdateManyWithoutPrerequisiteNodeNestedInput
    prerequisitesAsTarget?: COURSE_NODE_PREREQUISITESUpdateManyWithoutCourseNodeNestedInput
  }

  export type COURSE_NODESUncheckedUpdateWithoutCourseTopicsInput = {
    id?: IntFieldUpdateOperationsInput | number
    roadmap_id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    prerequisitesAsSource?: COURSE_NODE_PREREQUISITESUncheckedUpdateManyWithoutPrerequisiteNodeNestedInput
    prerequisitesAsTarget?: COURSE_NODE_PREREQUISITESUncheckedUpdateManyWithoutCourseNodeNestedInput
  }

  export type COURSE_TOPICS_EDGEUpsertWithWhereUniqueWithoutSourceTopicInput = {
    where: COURSE_TOPICS_EDGEWhereUniqueInput
    update: XOR<COURSE_TOPICS_EDGEUpdateWithoutSourceTopicInput, COURSE_TOPICS_EDGEUncheckedUpdateWithoutSourceTopicInput>
    create: XOR<COURSE_TOPICS_EDGECreateWithoutSourceTopicInput, COURSE_TOPICS_EDGEUncheckedCreateWithoutSourceTopicInput>
  }

  export type COURSE_TOPICS_EDGEUpdateWithWhereUniqueWithoutSourceTopicInput = {
    where: COURSE_TOPICS_EDGEWhereUniqueInput
    data: XOR<COURSE_TOPICS_EDGEUpdateWithoutSourceTopicInput, COURSE_TOPICS_EDGEUncheckedUpdateWithoutSourceTopicInput>
  }

  export type COURSE_TOPICS_EDGEUpdateManyWithWhereWithoutSourceTopicInput = {
    where: COURSE_TOPICS_EDGEScalarWhereInput
    data: XOR<COURSE_TOPICS_EDGEUpdateManyMutationInput, COURSE_TOPICS_EDGEUncheckedUpdateManyWithoutSourceTopicInput>
  }

  export type COURSE_TOPICS_EDGEScalarWhereInput = {
    AND?: COURSE_TOPICS_EDGEScalarWhereInput | COURSE_TOPICS_EDGEScalarWhereInput[]
    OR?: COURSE_TOPICS_EDGEScalarWhereInput[]
    NOT?: COURSE_TOPICS_EDGEScalarWhereInput | COURSE_TOPICS_EDGEScalarWhereInput[]
    id?: IntFilter<"COURSE_TOPICS_EDGE"> | number
    source_topic_id?: IntFilter<"COURSE_TOPICS_EDGE"> | number
    target_topic_id?: IntFilter<"COURSE_TOPICS_EDGE"> | number
    created_at?: DateTimeFilter<"COURSE_TOPICS_EDGE"> | Date | string
  }

  export type COURSE_TOPICS_EDGEUpsertWithWhereUniqueWithoutTargetTopicInput = {
    where: COURSE_TOPICS_EDGEWhereUniqueInput
    update: XOR<COURSE_TOPICS_EDGEUpdateWithoutTargetTopicInput, COURSE_TOPICS_EDGEUncheckedUpdateWithoutTargetTopicInput>
    create: XOR<COURSE_TOPICS_EDGECreateWithoutTargetTopicInput, COURSE_TOPICS_EDGEUncheckedCreateWithoutTargetTopicInput>
  }

  export type COURSE_TOPICS_EDGEUpdateWithWhereUniqueWithoutTargetTopicInput = {
    where: COURSE_TOPICS_EDGEWhereUniqueInput
    data: XOR<COURSE_TOPICS_EDGEUpdateWithoutTargetTopicInput, COURSE_TOPICS_EDGEUncheckedUpdateWithoutTargetTopicInput>
  }

  export type COURSE_TOPICS_EDGEUpdateManyWithWhereWithoutTargetTopicInput = {
    where: COURSE_TOPICS_EDGEScalarWhereInput
    data: XOR<COURSE_TOPICS_EDGEUpdateManyMutationInput, COURSE_TOPICS_EDGEUncheckedUpdateManyWithoutTargetTopicInput>
  }

  export type COURSE_TOPICS_NODECreateWithoutTopicEdgesAsSourceInput = {
    slug: string
    title: string
    description?: string | null
    coords?: NullableJsonNullValueInput | InputJsonValue
    learning_objectives?: string | null
    resources_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    courseNode: COURSE_NODESCreateNestedOneWithoutCourseTopicsInput
    topicEdgesAsTarget?: COURSE_TOPICS_EDGECreateNestedManyWithoutTargetTopicInput
  }

  export type COURSE_TOPICS_NODEUncheckedCreateWithoutTopicEdgesAsSourceInput = {
    id?: number
    course_node_id: number
    slug: string
    title: string
    description?: string | null
    coords?: NullableJsonNullValueInput | InputJsonValue
    learning_objectives?: string | null
    resources_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    topicEdgesAsTarget?: COURSE_TOPICS_EDGEUncheckedCreateNestedManyWithoutTargetTopicInput
  }

  export type COURSE_TOPICS_NODECreateOrConnectWithoutTopicEdgesAsSourceInput = {
    where: COURSE_TOPICS_NODEWhereUniqueInput
    create: XOR<COURSE_TOPICS_NODECreateWithoutTopicEdgesAsSourceInput, COURSE_TOPICS_NODEUncheckedCreateWithoutTopicEdgesAsSourceInput>
  }

  export type COURSE_TOPICS_NODECreateWithoutTopicEdgesAsTargetInput = {
    slug: string
    title: string
    description?: string | null
    coords?: NullableJsonNullValueInput | InputJsonValue
    learning_objectives?: string | null
    resources_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    courseNode: COURSE_NODESCreateNestedOneWithoutCourseTopicsInput
    topicEdgesAsSource?: COURSE_TOPICS_EDGECreateNestedManyWithoutSourceTopicInput
  }

  export type COURSE_TOPICS_NODEUncheckedCreateWithoutTopicEdgesAsTargetInput = {
    id?: number
    course_node_id: number
    slug: string
    title: string
    description?: string | null
    coords?: NullableJsonNullValueInput | InputJsonValue
    learning_objectives?: string | null
    resources_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    topicEdgesAsSource?: COURSE_TOPICS_EDGEUncheckedCreateNestedManyWithoutSourceTopicInput
  }

  export type COURSE_TOPICS_NODECreateOrConnectWithoutTopicEdgesAsTargetInput = {
    where: COURSE_TOPICS_NODEWhereUniqueInput
    create: XOR<COURSE_TOPICS_NODECreateWithoutTopicEdgesAsTargetInput, COURSE_TOPICS_NODEUncheckedCreateWithoutTopicEdgesAsTargetInput>
  }

  export type COURSE_TOPICS_NODEUpsertWithoutTopicEdgesAsSourceInput = {
    update: XOR<COURSE_TOPICS_NODEUpdateWithoutTopicEdgesAsSourceInput, COURSE_TOPICS_NODEUncheckedUpdateWithoutTopicEdgesAsSourceInput>
    create: XOR<COURSE_TOPICS_NODECreateWithoutTopicEdgesAsSourceInput, COURSE_TOPICS_NODEUncheckedCreateWithoutTopicEdgesAsSourceInput>
    where?: COURSE_TOPICS_NODEWhereInput
  }

  export type COURSE_TOPICS_NODEUpdateToOneWithWhereWithoutTopicEdgesAsSourceInput = {
    where?: COURSE_TOPICS_NODEWhereInput
    data: XOR<COURSE_TOPICS_NODEUpdateWithoutTopicEdgesAsSourceInput, COURSE_TOPICS_NODEUncheckedUpdateWithoutTopicEdgesAsSourceInput>
  }

  export type COURSE_TOPICS_NODEUpdateWithoutTopicEdgesAsSourceInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coords?: NullableJsonNullValueInput | InputJsonValue
    learning_objectives?: NullableStringFieldUpdateOperationsInput | string | null
    resources_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    courseNode?: COURSE_NODESUpdateOneRequiredWithoutCourseTopicsNestedInput
    topicEdgesAsTarget?: COURSE_TOPICS_EDGEUpdateManyWithoutTargetTopicNestedInput
  }

  export type COURSE_TOPICS_NODEUncheckedUpdateWithoutTopicEdgesAsSourceInput = {
    id?: IntFieldUpdateOperationsInput | number
    course_node_id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coords?: NullableJsonNullValueInput | InputJsonValue
    learning_objectives?: NullableStringFieldUpdateOperationsInput | string | null
    resources_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    topicEdgesAsTarget?: COURSE_TOPICS_EDGEUncheckedUpdateManyWithoutTargetTopicNestedInput
  }

  export type COURSE_TOPICS_NODEUpsertWithoutTopicEdgesAsTargetInput = {
    update: XOR<COURSE_TOPICS_NODEUpdateWithoutTopicEdgesAsTargetInput, COURSE_TOPICS_NODEUncheckedUpdateWithoutTopicEdgesAsTargetInput>
    create: XOR<COURSE_TOPICS_NODECreateWithoutTopicEdgesAsTargetInput, COURSE_TOPICS_NODEUncheckedCreateWithoutTopicEdgesAsTargetInput>
    where?: COURSE_TOPICS_NODEWhereInput
  }

  export type COURSE_TOPICS_NODEUpdateToOneWithWhereWithoutTopicEdgesAsTargetInput = {
    where?: COURSE_TOPICS_NODEWhereInput
    data: XOR<COURSE_TOPICS_NODEUpdateWithoutTopicEdgesAsTargetInput, COURSE_TOPICS_NODEUncheckedUpdateWithoutTopicEdgesAsTargetInput>
  }

  export type COURSE_TOPICS_NODEUpdateWithoutTopicEdgesAsTargetInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coords?: NullableJsonNullValueInput | InputJsonValue
    learning_objectives?: NullableStringFieldUpdateOperationsInput | string | null
    resources_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    courseNode?: COURSE_NODESUpdateOneRequiredWithoutCourseTopicsNestedInput
    topicEdgesAsSource?: COURSE_TOPICS_EDGEUpdateManyWithoutSourceTopicNestedInput
  }

  export type COURSE_TOPICS_NODEUncheckedUpdateWithoutTopicEdgesAsTargetInput = {
    id?: IntFieldUpdateOperationsInput | number
    course_node_id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coords?: NullableJsonNullValueInput | InputJsonValue
    learning_objectives?: NullableStringFieldUpdateOperationsInput | string | null
    resources_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    topicEdgesAsSource?: COURSE_TOPICS_EDGEUncheckedUpdateManyWithoutSourceTopicNestedInput
  }

  export type MAJOR_ROADMAPSCreateManyDepartmentInput = {
    id?: number
    slug: string
    name: string
    total_credits: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type MAJOR_ROADMAPSUpdateWithoutDepartmentInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    total_credits?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    courseNodes?: COURSE_NODESUpdateManyWithoutRoadmapNestedInput
  }

  export type MAJOR_ROADMAPSUncheckedUpdateWithoutDepartmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    total_credits?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    courseNodes?: COURSE_NODESUncheckedUpdateManyWithoutRoadmapNestedInput
  }

  export type MAJOR_ROADMAPSUncheckedUpdateManyWithoutDepartmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    total_credits?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type COURSE_NODESCreateManyRoadmapInput = {
    id?: number
    slug: string
    name: string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type COURSE_NODESUpdateWithoutRoadmapInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    courseTopics?: COURSE_TOPICS_NODEUpdateManyWithoutCourseNodeNestedInput
    prerequisitesAsSource?: COURSE_NODE_PREREQUISITESUpdateManyWithoutPrerequisiteNodeNestedInput
    prerequisitesAsTarget?: COURSE_NODE_PREREQUISITESUpdateManyWithoutCourseNodeNestedInput
  }

  export type COURSE_NODESUncheckedUpdateWithoutRoadmapInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    courseTopics?: COURSE_TOPICS_NODEUncheckedUpdateManyWithoutCourseNodeNestedInput
    prerequisitesAsSource?: COURSE_NODE_PREREQUISITESUncheckedUpdateManyWithoutPrerequisiteNodeNestedInput
    prerequisitesAsTarget?: COURSE_NODE_PREREQUISITESUncheckedUpdateManyWithoutCourseNodeNestedInput
  }

  export type COURSE_NODESUncheckedUpdateManyWithoutRoadmapInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    coords?: NullableJsonNullValueInput | InputJsonValue
    credits?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type COURSE_TOPICS_NODECreateManyCourseNodeInput = {
    id?: number
    slug: string
    title: string
    description?: string | null
    coords?: NullableJsonNullValueInput | InputJsonValue
    learning_objectives?: string | null
    resources_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type COURSE_NODE_PREREQUISITESCreateManyPrerequisiteNodeInput = {
    id?: number
    course_node_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type COURSE_NODE_PREREQUISITESCreateManyCourseNodeInput = {
    id?: number
    prerequisite_node_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type COURSE_TOPICS_NODEUpdateWithoutCourseNodeInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coords?: NullableJsonNullValueInput | InputJsonValue
    learning_objectives?: NullableStringFieldUpdateOperationsInput | string | null
    resources_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    topicEdgesAsSource?: COURSE_TOPICS_EDGEUpdateManyWithoutSourceTopicNestedInput
    topicEdgesAsTarget?: COURSE_TOPICS_EDGEUpdateManyWithoutTargetTopicNestedInput
  }

  export type COURSE_TOPICS_NODEUncheckedUpdateWithoutCourseNodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coords?: NullableJsonNullValueInput | InputJsonValue
    learning_objectives?: NullableStringFieldUpdateOperationsInput | string | null
    resources_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    topicEdgesAsSource?: COURSE_TOPICS_EDGEUncheckedUpdateManyWithoutSourceTopicNestedInput
    topicEdgesAsTarget?: COURSE_TOPICS_EDGEUncheckedUpdateManyWithoutTargetTopicNestedInput
  }

  export type COURSE_TOPICS_NODEUncheckedUpdateManyWithoutCourseNodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coords?: NullableJsonNullValueInput | InputJsonValue
    learning_objectives?: NullableStringFieldUpdateOperationsInput | string | null
    resources_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type COURSE_NODE_PREREQUISITESUpdateWithoutPrerequisiteNodeInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    courseNode?: COURSE_NODESUpdateOneRequiredWithoutPrerequisitesAsTargetNestedInput
  }

  export type COURSE_NODE_PREREQUISITESUncheckedUpdateWithoutPrerequisiteNodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    course_node_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type COURSE_NODE_PREREQUISITESUncheckedUpdateManyWithoutPrerequisiteNodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    course_node_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type COURSE_NODE_PREREQUISITESUpdateWithoutCourseNodeInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    prerequisiteNode?: COURSE_NODESUpdateOneRequiredWithoutPrerequisitesAsSourceNestedInput
  }

  export type COURSE_NODE_PREREQUISITESUncheckedUpdateWithoutCourseNodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    prerequisite_node_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type COURSE_NODE_PREREQUISITESUncheckedUpdateManyWithoutCourseNodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    prerequisite_node_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type COURSE_TOPICS_EDGECreateManySourceTopicInput = {
    id?: number
    target_topic_id: number
    created_at?: Date | string
  }

  export type COURSE_TOPICS_EDGECreateManyTargetTopicInput = {
    id?: number
    source_topic_id: number
    created_at?: Date | string
  }

  export type COURSE_TOPICS_EDGEUpdateWithoutSourceTopicInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targetTopic?: COURSE_TOPICS_NODEUpdateOneRequiredWithoutTopicEdgesAsTargetNestedInput
  }

  export type COURSE_TOPICS_EDGEUncheckedUpdateWithoutSourceTopicInput = {
    id?: IntFieldUpdateOperationsInput | number
    target_topic_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type COURSE_TOPICS_EDGEUncheckedUpdateManyWithoutSourceTopicInput = {
    id?: IntFieldUpdateOperationsInput | number
    target_topic_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type COURSE_TOPICS_EDGEUpdateWithoutTargetTopicInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceTopic?: COURSE_TOPICS_NODEUpdateOneRequiredWithoutTopicEdgesAsSourceNestedInput
  }

  export type COURSE_TOPICS_EDGEUncheckedUpdateWithoutTargetTopicInput = {
    id?: IntFieldUpdateOperationsInput | number
    source_topic_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type COURSE_TOPICS_EDGEUncheckedUpdateManyWithoutTargetTopicInput = {
    id?: IntFieldUpdateOperationsInput | number
    source_topic_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use DEPARTMENTSCountOutputTypeDefaultArgs instead
     */
    export type DEPARTMENTSCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DEPARTMENTSCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MAJOR_ROADMAPSCountOutputTypeDefaultArgs instead
     */
    export type MAJOR_ROADMAPSCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MAJOR_ROADMAPSCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use COURSE_NODESCountOutputTypeDefaultArgs instead
     */
    export type COURSE_NODESCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = COURSE_NODESCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use COURSE_TOPICS_NODECountOutputTypeDefaultArgs instead
     */
    export type COURSE_TOPICS_NODECountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = COURSE_TOPICS_NODECountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DEPARTMENTSDefaultArgs instead
     */
    export type DEPARTMENTSArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DEPARTMENTSDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MAJOR_ROADMAPSDefaultArgs instead
     */
    export type MAJOR_ROADMAPSArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MAJOR_ROADMAPSDefaultArgs<ExtArgs>
    /**
     * @deprecated Use COURSE_NODESDefaultArgs instead
     */
    export type COURSE_NODESArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = COURSE_NODESDefaultArgs<ExtArgs>
    /**
     * @deprecated Use COURSE_NODE_PREREQUISITESDefaultArgs instead
     */
    export type COURSE_NODE_PREREQUISITESArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = COURSE_NODE_PREREQUISITESDefaultArgs<ExtArgs>
    /**
     * @deprecated Use COURSE_TOPICS_NODEDefaultArgs instead
     */
    export type COURSE_TOPICS_NODEArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = COURSE_TOPICS_NODEDefaultArgs<ExtArgs>
    /**
     * @deprecated Use COURSE_TOPICS_EDGEDefaultArgs instead
     */
    export type COURSE_TOPICS_EDGEArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = COURSE_TOPICS_EDGEDefaultArgs<ExtArgs>

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