
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
 * Model Department
 * 
 */
export type Department = $Result.DefaultSelection<Prisma.$DepartmentPayload>
/**
 * Model Course
 * 
 */
export type Course = $Result.DefaultSelection<Prisma.$CoursePayload>
/**
 * Model Roadmap
 * 
 */
export type Roadmap = $Result.DefaultSelection<Prisma.$RoadmapPayload>
/**
 * Model RoadmapNode
 * 
 */
export type RoadmapNode = $Result.DefaultSelection<Prisma.$RoadmapNodePayload>
/**
 * Model RoadmapEdge
 * 
 */
export type RoadmapEdge = $Result.DefaultSelection<Prisma.$RoadmapEdgePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const CourseType: {
  BASIC: 'BASIC',
  JOB: 'JOB'
};

export type CourseType = (typeof CourseType)[keyof typeof CourseType]

}

export type CourseType = $Enums.CourseType

export const CourseType: typeof $Enums.CourseType

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Departments
 * const departments = await prisma.department.findMany()
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
   * // Fetch zero or more Departments
   * const departments = await prisma.department.findMany()
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
   * `prisma.department`: Exposes CRUD operations for the **Department** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Departments
    * const departments = await prisma.department.findMany()
    * ```
    */
  get department(): Prisma.DepartmentDelegate<ExtArgs>;

  /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): Prisma.CourseDelegate<ExtArgs>;

  /**
   * `prisma.roadmap`: Exposes CRUD operations for the **Roadmap** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roadmaps
    * const roadmaps = await prisma.roadmap.findMany()
    * ```
    */
  get roadmap(): Prisma.RoadmapDelegate<ExtArgs>;

  /**
   * `prisma.roadmapNode`: Exposes CRUD operations for the **RoadmapNode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoadmapNodes
    * const roadmapNodes = await prisma.roadmapNode.findMany()
    * ```
    */
  get roadmapNode(): Prisma.RoadmapNodeDelegate<ExtArgs>;

  /**
   * `prisma.roadmapEdge`: Exposes CRUD operations for the **RoadmapEdge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoadmapEdges
    * const roadmapEdges = await prisma.roadmapEdge.findMany()
    * ```
    */
  get roadmapEdge(): Prisma.RoadmapEdgeDelegate<ExtArgs>;
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
    Department: 'Department',
    Course: 'Course',
    Roadmap: 'Roadmap',
    RoadmapNode: 'RoadmapNode',
    RoadmapEdge: 'RoadmapEdge'
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
      modelProps: "department" | "course" | "roadmap" | "roadmapNode" | "roadmapEdge"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Department: {
        payload: Prisma.$DepartmentPayload<ExtArgs>
        fields: Prisma.DepartmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DepartmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DepartmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findFirst: {
            args: Prisma.DepartmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DepartmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findMany: {
            args: Prisma.DepartmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          create: {
            args: Prisma.DepartmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          createMany: {
            args: Prisma.DepartmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DepartmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          delete: {
            args: Prisma.DepartmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          update: {
            args: Prisma.DepartmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          deleteMany: {
            args: Prisma.DepartmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DepartmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DepartmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          aggregate: {
            args: Prisma.DepartmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDepartment>
          }
          groupBy: {
            args: Prisma.DepartmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DepartmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DepartmentCountArgs<ExtArgs>
            result: $Utils.Optional<DepartmentCountAggregateOutputType> | number
          }
        }
      }
      Course: {
        payload: Prisma.$CoursePayload<ExtArgs>
        fields: Prisma.CourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findFirst: {
            args: Prisma.CourseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findMany: {
            args: Prisma.CourseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          create: {
            args: Prisma.CourseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          createMany: {
            args: Prisma.CourseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CourseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          delete: {
            args: Prisma.CourseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          update: {
            args: Prisma.CourseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          deleteMany: {
            args: Prisma.CourseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CourseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          aggregate: {
            args: Prisma.CourseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourse>
          }
          groupBy: {
            args: Prisma.CourseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseCountArgs<ExtArgs>
            result: $Utils.Optional<CourseCountAggregateOutputType> | number
          }
        }
      }
      Roadmap: {
        payload: Prisma.$RoadmapPayload<ExtArgs>
        fields: Prisma.RoadmapFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoadmapFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoadmapFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapPayload>
          }
          findFirst: {
            args: Prisma.RoadmapFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoadmapFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapPayload>
          }
          findMany: {
            args: Prisma.RoadmapFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapPayload>[]
          }
          create: {
            args: Prisma.RoadmapCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapPayload>
          }
          createMany: {
            args: Prisma.RoadmapCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoadmapCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapPayload>[]
          }
          delete: {
            args: Prisma.RoadmapDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapPayload>
          }
          update: {
            args: Prisma.RoadmapUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapPayload>
          }
          deleteMany: {
            args: Prisma.RoadmapDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoadmapUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoadmapUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapPayload>
          }
          aggregate: {
            args: Prisma.RoadmapAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoadmap>
          }
          groupBy: {
            args: Prisma.RoadmapGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoadmapGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoadmapCountArgs<ExtArgs>
            result: $Utils.Optional<RoadmapCountAggregateOutputType> | number
          }
        }
      }
      RoadmapNode: {
        payload: Prisma.$RoadmapNodePayload<ExtArgs>
        fields: Prisma.RoadmapNodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoadmapNodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapNodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoadmapNodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapNodePayload>
          }
          findFirst: {
            args: Prisma.RoadmapNodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapNodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoadmapNodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapNodePayload>
          }
          findMany: {
            args: Prisma.RoadmapNodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapNodePayload>[]
          }
          create: {
            args: Prisma.RoadmapNodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapNodePayload>
          }
          createMany: {
            args: Prisma.RoadmapNodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoadmapNodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapNodePayload>[]
          }
          delete: {
            args: Prisma.RoadmapNodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapNodePayload>
          }
          update: {
            args: Prisma.RoadmapNodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapNodePayload>
          }
          deleteMany: {
            args: Prisma.RoadmapNodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoadmapNodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoadmapNodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapNodePayload>
          }
          aggregate: {
            args: Prisma.RoadmapNodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoadmapNode>
          }
          groupBy: {
            args: Prisma.RoadmapNodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoadmapNodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoadmapNodeCountArgs<ExtArgs>
            result: $Utils.Optional<RoadmapNodeCountAggregateOutputType> | number
          }
        }
      }
      RoadmapEdge: {
        payload: Prisma.$RoadmapEdgePayload<ExtArgs>
        fields: Prisma.RoadmapEdgeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoadmapEdgeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapEdgePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoadmapEdgeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapEdgePayload>
          }
          findFirst: {
            args: Prisma.RoadmapEdgeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapEdgePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoadmapEdgeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapEdgePayload>
          }
          findMany: {
            args: Prisma.RoadmapEdgeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapEdgePayload>[]
          }
          create: {
            args: Prisma.RoadmapEdgeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapEdgePayload>
          }
          createMany: {
            args: Prisma.RoadmapEdgeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoadmapEdgeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapEdgePayload>[]
          }
          delete: {
            args: Prisma.RoadmapEdgeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapEdgePayload>
          }
          update: {
            args: Prisma.RoadmapEdgeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapEdgePayload>
          }
          deleteMany: {
            args: Prisma.RoadmapEdgeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoadmapEdgeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoadmapEdgeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapEdgePayload>
          }
          aggregate: {
            args: Prisma.RoadmapEdgeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoadmapEdge>
          }
          groupBy: {
            args: Prisma.RoadmapEdgeGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoadmapEdgeGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoadmapEdgeCountArgs<ExtArgs>
            result: $Utils.Optional<RoadmapEdgeCountAggregateOutputType> | number
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
   * Count Type DepartmentCountOutputType
   */

  export type DepartmentCountOutputType = {
    courses: number
  }

  export type DepartmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | DepartmentCountOutputTypeCountCoursesArgs
  }

  // Custom InputTypes
  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DepartmentCountOutputType
     */
    select?: DepartmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeCountCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
  }


  /**
   * Count Type CourseCountOutputType
   */

  export type CourseCountOutputType = {
    roadmaps: number
  }

  export type CourseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roadmaps?: boolean | CourseCountOutputTypeCountRoadmapsArgs
  }

  // Custom InputTypes
  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     */
    select?: CourseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountRoadmapsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoadmapWhereInput
  }


  /**
   * Count Type RoadmapCountOutputType
   */

  export type RoadmapCountOutputType = {
    nodes: number
    edges: number
  }

  export type RoadmapCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nodes?: boolean | RoadmapCountOutputTypeCountNodesArgs
    edges?: boolean | RoadmapCountOutputTypeCountEdgesArgs
  }

  // Custom InputTypes
  /**
   * RoadmapCountOutputType without action
   */
  export type RoadmapCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapCountOutputType
     */
    select?: RoadmapCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoadmapCountOutputType without action
   */
  export type RoadmapCountOutputTypeCountNodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoadmapNodeWhereInput
  }

  /**
   * RoadmapCountOutputType without action
   */
  export type RoadmapCountOutputTypeCountEdgesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoadmapEdgeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Department
   */

  export type AggregateDepartment = {
    _count: DepartmentCountAggregateOutputType | null
    _avg: DepartmentAvgAggregateOutputType | null
    _sum: DepartmentSumAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  export type DepartmentAvgAggregateOutputType = {
    id: number | null
  }

  export type DepartmentSumAggregateOutputType = {
    id: number | null
  }

  export type DepartmentMinAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DepartmentMaxAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DepartmentCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DepartmentAvgAggregateInputType = {
    id?: true
  }

  export type DepartmentSumAggregateInputType = {
    id?: true
  }

  export type DepartmentMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DepartmentMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DepartmentCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DepartmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Department to aggregate.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Departments
    **/
    _count?: true | DepartmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DepartmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DepartmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DepartmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DepartmentMaxAggregateInputType
  }

  export type GetDepartmentAggregateType<T extends DepartmentAggregateArgs> = {
        [P in keyof T & keyof AggregateDepartment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDepartment[P]>
      : GetScalarType<T[P], AggregateDepartment[P]>
  }




  export type DepartmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DepartmentWhereInput
    orderBy?: DepartmentOrderByWithAggregationInput | DepartmentOrderByWithAggregationInput[]
    by: DepartmentScalarFieldEnum[] | DepartmentScalarFieldEnum
    having?: DepartmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DepartmentCountAggregateInputType | true
    _avg?: DepartmentAvgAggregateInputType
    _sum?: DepartmentSumAggregateInputType
    _min?: DepartmentMinAggregateInputType
    _max?: DepartmentMaxAggregateInputType
  }

  export type DepartmentGroupByOutputType = {
    id: number
    name: string
    slug: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: DepartmentCountAggregateOutputType | null
    _avg: DepartmentAvgAggregateOutputType | null
    _sum: DepartmentSumAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  type GetDepartmentGroupByPayload<T extends DepartmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DepartmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DepartmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
            : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
        }
      >
    >


  export type DepartmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    courses?: boolean | Department$coursesArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DepartmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | Department$coursesArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DepartmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DepartmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Department"
    objects: {
      courses: Prisma.$CoursePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      slug: string
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["department"]>
    composites: {}
  }

  type DepartmentGetPayload<S extends boolean | null | undefined | DepartmentDefaultArgs> = $Result.GetResult<Prisma.$DepartmentPayload, S>

  type DepartmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DepartmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DepartmentCountAggregateInputType | true
    }

  export interface DepartmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Department'], meta: { name: 'Department' } }
    /**
     * Find zero or one Department that matches the filter.
     * @param {DepartmentFindUniqueArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DepartmentFindUniqueArgs>(args: SelectSubset<T, DepartmentFindUniqueArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Department that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DepartmentFindUniqueOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DepartmentFindUniqueOrThrowArgs>(args: SelectSubset<T, DepartmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Department that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DepartmentFindFirstArgs>(args?: SelectSubset<T, DepartmentFindFirstArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Department that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DepartmentFindFirstOrThrowArgs>(args?: SelectSubset<T, DepartmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Departments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Departments
     * const departments = await prisma.department.findMany()
     * 
     * // Get first 10 Departments
     * const departments = await prisma.department.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const departmentWithIdOnly = await prisma.department.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DepartmentFindManyArgs>(args?: SelectSubset<T, DepartmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Department.
     * @param {DepartmentCreateArgs} args - Arguments to create a Department.
     * @example
     * // Create one Department
     * const Department = await prisma.department.create({
     *   data: {
     *     // ... data to create a Department
     *   }
     * })
     * 
     */
    create<T extends DepartmentCreateArgs>(args: SelectSubset<T, DepartmentCreateArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Departments.
     * @param {DepartmentCreateManyArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DepartmentCreateManyArgs>(args?: SelectSubset<T, DepartmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Departments and returns the data saved in the database.
     * @param {DepartmentCreateManyAndReturnArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Departments and only return the `id`
     * const departmentWithIdOnly = await prisma.department.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DepartmentCreateManyAndReturnArgs>(args?: SelectSubset<T, DepartmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Department.
     * @param {DepartmentDeleteArgs} args - Arguments to delete one Department.
     * @example
     * // Delete one Department
     * const Department = await prisma.department.delete({
     *   where: {
     *     // ... filter to delete one Department
     *   }
     * })
     * 
     */
    delete<T extends DepartmentDeleteArgs>(args: SelectSubset<T, DepartmentDeleteArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Department.
     * @param {DepartmentUpdateArgs} args - Arguments to update one Department.
     * @example
     * // Update one Department
     * const department = await prisma.department.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DepartmentUpdateArgs>(args: SelectSubset<T, DepartmentUpdateArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Departments.
     * @param {DepartmentDeleteManyArgs} args - Arguments to filter Departments to delete.
     * @example
     * // Delete a few Departments
     * const { count } = await prisma.department.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DepartmentDeleteManyArgs>(args?: SelectSubset<T, DepartmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DepartmentUpdateManyArgs>(args: SelectSubset<T, DepartmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Department.
     * @param {DepartmentUpsertArgs} args - Arguments to update or create a Department.
     * @example
     * // Update or create a Department
     * const department = await prisma.department.upsert({
     *   create: {
     *     // ... data to create a Department
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Department we want to update
     *   }
     * })
     */
    upsert<T extends DepartmentUpsertArgs>(args: SelectSubset<T, DepartmentUpsertArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentCountArgs} args - Arguments to filter Departments to count.
     * @example
     * // Count the number of Departments
     * const count = await prisma.department.count({
     *   where: {
     *     // ... the filter for the Departments we want to count
     *   }
     * })
    **/
    count<T extends DepartmentCountArgs>(
      args?: Subset<T, DepartmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DepartmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DepartmentAggregateArgs>(args: Subset<T, DepartmentAggregateArgs>): Prisma.PrismaPromise<GetDepartmentAggregateType<T>>

    /**
     * Group by Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentGroupByArgs} args - Group by arguments.
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
      T extends DepartmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DepartmentGroupByArgs['orderBy'] }
        : { orderBy?: DepartmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DepartmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDepartmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Department model
   */
  readonly fields: DepartmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Department.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DepartmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    courses<T extends Department$coursesArgs<ExtArgs> = {}>(args?: Subset<T, Department$coursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Department model
   */ 
  interface DepartmentFieldRefs {
    readonly id: FieldRef<"Department", 'Int'>
    readonly name: FieldRef<"Department", 'String'>
    readonly slug: FieldRef<"Department", 'String'>
    readonly description: FieldRef<"Department", 'String'>
    readonly createdAt: FieldRef<"Department", 'DateTime'>
    readonly updatedAt: FieldRef<"Department", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Department findUnique
   */
  export type DepartmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findUniqueOrThrow
   */
  export type DepartmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findFirst
   */
  export type DepartmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department findFirstOrThrow
   */
  export type DepartmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department findMany
   */
  export type DepartmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Departments to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department create
   */
  export type DepartmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Department.
     */
    data: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
  }

  /**
   * Department createMany
   */
  export type DepartmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Department createManyAndReturn
   */
  export type DepartmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Department update
   */
  export type DepartmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Department.
     */
    data: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
    /**
     * Choose, which Department to update.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department updateMany
   */
  export type DepartmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Departments.
     */
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyInput>
    /**
     * Filter which Departments to update
     */
    where?: DepartmentWhereInput
  }

  /**
   * Department upsert
   */
  export type DepartmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Department to update in case it exists.
     */
    where: DepartmentWhereUniqueInput
    /**
     * In case the Department found by the `where` argument doesn't exist, create a new Department with this data.
     */
    create: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
    /**
     * In case the Department was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
  }

  /**
   * Department delete
   */
  export type DepartmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter which Department to delete.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department deleteMany
   */
  export type DepartmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Departments to delete
     */
    where?: DepartmentWhereInput
  }

  /**
   * Department.courses
   */
  export type Department$coursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    cursor?: CourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Department without action
   */
  export type DepartmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
  }


  /**
   * Model Course
   */

  export type AggregateCourse = {
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  export type CourseAvgAggregateOutputType = {
    id: number | null
    departmentId: number | null
  }

  export type CourseSumAggregateOutputType = {
    id: number | null
    departmentId: number | null
  }

  export type CourseMinAggregateOutputType = {
    id: number | null
    slug: string | null
    title: string | null
    description: string | null
    type: $Enums.CourseType | null
    departmentId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseMaxAggregateOutputType = {
    id: number | null
    slug: string | null
    title: string | null
    description: string | null
    type: $Enums.CourseType | null
    departmentId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseCountAggregateOutputType = {
    id: number
    slug: number
    title: number
    description: number
    type: number
    departmentId: number
    priorityJob: number
    structure: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CourseAvgAggregateInputType = {
    id?: true
    departmentId?: true
  }

  export type CourseSumAggregateInputType = {
    id?: true
    departmentId?: true
  }

  export type CourseMinAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    description?: true
    type?: true
    departmentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CourseMaxAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    description?: true
    type?: true
    departmentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CourseCountAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    description?: true
    type?: true
    departmentId?: true
    priorityJob?: true
    structure?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Course to aggregate.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Courses
    **/
    _count?: true | CourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CourseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CourseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseMaxAggregateInputType
  }

  export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse[P]>
      : GetScalarType<T[P], AggregateCourse[P]>
  }




  export type CourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithAggregationInput | CourseOrderByWithAggregationInput[]
    by: CourseScalarFieldEnum[] | CourseScalarFieldEnum
    having?: CourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseCountAggregateInputType | true
    _avg?: CourseAvgAggregateInputType
    _sum?: CourseSumAggregateInputType
    _min?: CourseMinAggregateInputType
    _max?: CourseMaxAggregateInputType
  }

  export type CourseGroupByOutputType = {
    id: number
    slug: string
    title: string
    description: string | null
    type: $Enums.CourseType
    departmentId: number | null
    priorityJob: string[]
    structure: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseGroupByOutputType[P]>
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
        }
      >
    >


  export type CourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    departmentId?: boolean
    priorityJob?: boolean
    structure?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    department?: boolean | Course$departmentArgs<ExtArgs>
    roadmaps?: boolean | Course$roadmapsArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    departmentId?: boolean
    priorityJob?: boolean
    structure?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    department?: boolean | Course$departmentArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectScalar = {
    id?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    departmentId?: boolean
    priorityJob?: boolean
    structure?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | Course$departmentArgs<ExtArgs>
    roadmaps?: boolean | Course$roadmapsArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CourseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | Course$departmentArgs<ExtArgs>
  }

  export type $CoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Course"
    objects: {
      department: Prisma.$DepartmentPayload<ExtArgs> | null
      roadmaps: Prisma.$RoadmapPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      slug: string
      title: string
      description: string | null
      type: $Enums.CourseType
      departmentId: number | null
      priorityJob: string[]
      structure: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["course"]>
    composites: {}
  }

  type CourseGetPayload<S extends boolean | null | undefined | CourseDefaultArgs> = $Result.GetResult<Prisma.$CoursePayload, S>

  type CourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CourseFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CourseCountAggregateInputType | true
    }

  export interface CourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Course'], meta: { name: 'Course' } }
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseFindUniqueArgs>(args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Course that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseFindFirstArgs>(args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Course that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     * 
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseWithIdOnly = await prisma.course.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseFindManyArgs>(args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     * 
     */
    create<T extends CourseCreateArgs>(args: SelectSubset<T, CourseCreateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Courses.
     * @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseCreateManyArgs>(args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Courses and returns the data saved in the database.
     * @param {CourseCreateManyAndReturnArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CourseCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     * 
     */
    delete<T extends CourseDeleteArgs>(args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseUpdateArgs>(args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseDeleteManyArgs>(args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseUpdateManyArgs>(args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
     */
    upsert<T extends CourseUpsertArgs>(args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends CourseCountArgs>(
      args?: Subset<T, CourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>

    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
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
      T extends CourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseGroupByArgs['orderBy'] }
        : { orderBy?: CourseGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Course model
   */
  readonly fields: CourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    department<T extends Course$departmentArgs<ExtArgs> = {}>(args?: Subset<T, Course$departmentArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    roadmaps<T extends Course$roadmapsArgs<ExtArgs> = {}>(args?: Subset<T, Course$roadmapsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoadmapPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Course model
   */ 
  interface CourseFieldRefs {
    readonly id: FieldRef<"Course", 'Int'>
    readonly slug: FieldRef<"Course", 'String'>
    readonly title: FieldRef<"Course", 'String'>
    readonly description: FieldRef<"Course", 'String'>
    readonly type: FieldRef<"Course", 'CourseType'>
    readonly departmentId: FieldRef<"Course", 'Int'>
    readonly priorityJob: FieldRef<"Course", 'String[]'>
    readonly structure: FieldRef<"Course", 'Json'>
    readonly createdAt: FieldRef<"Course", 'DateTime'>
    readonly updatedAt: FieldRef<"Course", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Course findUnique
   */
  export type CourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findUniqueOrThrow
   */
  export type CourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findFirst
   */
  export type CourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findFirstOrThrow
   */
  export type CourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findMany
   */
  export type CourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Courses to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course create
   */
  export type CourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to create a Course.
     */
    data: XOR<CourseCreateInput, CourseUncheckedCreateInput>
  }

  /**
   * Course createMany
   */
  export type CourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Course createManyAndReturn
   */
  export type CourseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Course update
   */
  export type CourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to update a Course.
     */
    data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
    /**
     * Choose, which Course to update.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course updateMany
   */
  export type CourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
  }

  /**
   * Course upsert
   */
  export type CourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The filter to search for the Course to update in case it exists.
     */
    where: CourseWhereUniqueInput
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     */
    create: XOR<CourseCreateInput, CourseUncheckedCreateInput>
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
  }

  /**
   * Course delete
   */
  export type CourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter which Course to delete.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course deleteMany
   */
  export type CourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Courses to delete
     */
    where?: CourseWhereInput
  }

  /**
   * Course.department
   */
  export type Course$departmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    where?: DepartmentWhereInput
  }

  /**
   * Course.roadmaps
   */
  export type Course$roadmapsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapInclude<ExtArgs> | null
    where?: RoadmapWhereInput
    orderBy?: RoadmapOrderByWithRelationInput | RoadmapOrderByWithRelationInput[]
    cursor?: RoadmapWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoadmapScalarFieldEnum | RoadmapScalarFieldEnum[]
  }

  /**
   * Course without action
   */
  export type CourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
  }


  /**
   * Model Roadmap
   */

  export type AggregateRoadmap = {
    _count: RoadmapCountAggregateOutputType | null
    _avg: RoadmapAvgAggregateOutputType | null
    _sum: RoadmapSumAggregateOutputType | null
    _min: RoadmapMinAggregateOutputType | null
    _max: RoadmapMaxAggregateOutputType | null
  }

  export type RoadmapAvgAggregateOutputType = {
    id: number | null
    courseId: number | null
  }

  export type RoadmapSumAggregateOutputType = {
    id: number | null
    courseId: number | null
  }

  export type RoadmapMinAggregateOutputType = {
    id: number | null
    slug: string | null
    title: string | null
    description: string | null
    courseId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoadmapMaxAggregateOutputType = {
    id: number | null
    slug: string | null
    title: string | null
    description: string | null
    courseId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoadmapCountAggregateOutputType = {
    id: number
    slug: number
    title: number
    description: number
    courseId: number
    structure: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoadmapAvgAggregateInputType = {
    id?: true
    courseId?: true
  }

  export type RoadmapSumAggregateInputType = {
    id?: true
    courseId?: true
  }

  export type RoadmapMinAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    description?: true
    courseId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoadmapMaxAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    description?: true
    courseId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoadmapCountAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    description?: true
    courseId?: true
    structure?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoadmapAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roadmap to aggregate.
     */
    where?: RoadmapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roadmaps to fetch.
     */
    orderBy?: RoadmapOrderByWithRelationInput | RoadmapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoadmapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roadmaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roadmaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roadmaps
    **/
    _count?: true | RoadmapCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoadmapAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoadmapSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoadmapMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoadmapMaxAggregateInputType
  }

  export type GetRoadmapAggregateType<T extends RoadmapAggregateArgs> = {
        [P in keyof T & keyof AggregateRoadmap]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoadmap[P]>
      : GetScalarType<T[P], AggregateRoadmap[P]>
  }




  export type RoadmapGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoadmapWhereInput
    orderBy?: RoadmapOrderByWithAggregationInput | RoadmapOrderByWithAggregationInput[]
    by: RoadmapScalarFieldEnum[] | RoadmapScalarFieldEnum
    having?: RoadmapScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoadmapCountAggregateInputType | true
    _avg?: RoadmapAvgAggregateInputType
    _sum?: RoadmapSumAggregateInputType
    _min?: RoadmapMinAggregateInputType
    _max?: RoadmapMaxAggregateInputType
  }

  export type RoadmapGroupByOutputType = {
    id: number
    slug: string
    title: string
    description: string | null
    courseId: number | null
    structure: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: RoadmapCountAggregateOutputType | null
    _avg: RoadmapAvgAggregateOutputType | null
    _sum: RoadmapSumAggregateOutputType | null
    _min: RoadmapMinAggregateOutputType | null
    _max: RoadmapMaxAggregateOutputType | null
  }

  type GetRoadmapGroupByPayload<T extends RoadmapGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoadmapGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoadmapGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoadmapGroupByOutputType[P]>
            : GetScalarType<T[P], RoadmapGroupByOutputType[P]>
        }
      >
    >


  export type RoadmapSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    courseId?: boolean
    structure?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    course?: boolean | Roadmap$courseArgs<ExtArgs>
    nodes?: boolean | Roadmap$nodesArgs<ExtArgs>
    edges?: boolean | Roadmap$edgesArgs<ExtArgs>
    _count?: boolean | RoadmapCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roadmap"]>

  export type RoadmapSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    courseId?: boolean
    structure?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    course?: boolean | Roadmap$courseArgs<ExtArgs>
  }, ExtArgs["result"]["roadmap"]>

  export type RoadmapSelectScalar = {
    id?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    courseId?: boolean
    structure?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoadmapInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | Roadmap$courseArgs<ExtArgs>
    nodes?: boolean | Roadmap$nodesArgs<ExtArgs>
    edges?: boolean | Roadmap$edgesArgs<ExtArgs>
    _count?: boolean | RoadmapCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoadmapIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | Roadmap$courseArgs<ExtArgs>
  }

  export type $RoadmapPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Roadmap"
    objects: {
      course: Prisma.$CoursePayload<ExtArgs> | null
      nodes: Prisma.$RoadmapNodePayload<ExtArgs>[]
      edges: Prisma.$RoadmapEdgePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      slug: string
      title: string
      description: string | null
      courseId: number | null
      structure: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["roadmap"]>
    composites: {}
  }

  type RoadmapGetPayload<S extends boolean | null | undefined | RoadmapDefaultArgs> = $Result.GetResult<Prisma.$RoadmapPayload, S>

  type RoadmapCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RoadmapFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RoadmapCountAggregateInputType | true
    }

  export interface RoadmapDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Roadmap'], meta: { name: 'Roadmap' } }
    /**
     * Find zero or one Roadmap that matches the filter.
     * @param {RoadmapFindUniqueArgs} args - Arguments to find a Roadmap
     * @example
     * // Get one Roadmap
     * const roadmap = await prisma.roadmap.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoadmapFindUniqueArgs>(args: SelectSubset<T, RoadmapFindUniqueArgs<ExtArgs>>): Prisma__RoadmapClient<$Result.GetResult<Prisma.$RoadmapPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Roadmap that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RoadmapFindUniqueOrThrowArgs} args - Arguments to find a Roadmap
     * @example
     * // Get one Roadmap
     * const roadmap = await prisma.roadmap.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoadmapFindUniqueOrThrowArgs>(args: SelectSubset<T, RoadmapFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoadmapClient<$Result.GetResult<Prisma.$RoadmapPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Roadmap that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapFindFirstArgs} args - Arguments to find a Roadmap
     * @example
     * // Get one Roadmap
     * const roadmap = await prisma.roadmap.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoadmapFindFirstArgs>(args?: SelectSubset<T, RoadmapFindFirstArgs<ExtArgs>>): Prisma__RoadmapClient<$Result.GetResult<Prisma.$RoadmapPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Roadmap that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapFindFirstOrThrowArgs} args - Arguments to find a Roadmap
     * @example
     * // Get one Roadmap
     * const roadmap = await prisma.roadmap.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoadmapFindFirstOrThrowArgs>(args?: SelectSubset<T, RoadmapFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoadmapClient<$Result.GetResult<Prisma.$RoadmapPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Roadmaps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roadmaps
     * const roadmaps = await prisma.roadmap.findMany()
     * 
     * // Get first 10 Roadmaps
     * const roadmaps = await prisma.roadmap.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roadmapWithIdOnly = await prisma.roadmap.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoadmapFindManyArgs>(args?: SelectSubset<T, RoadmapFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoadmapPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Roadmap.
     * @param {RoadmapCreateArgs} args - Arguments to create a Roadmap.
     * @example
     * // Create one Roadmap
     * const Roadmap = await prisma.roadmap.create({
     *   data: {
     *     // ... data to create a Roadmap
     *   }
     * })
     * 
     */
    create<T extends RoadmapCreateArgs>(args: SelectSubset<T, RoadmapCreateArgs<ExtArgs>>): Prisma__RoadmapClient<$Result.GetResult<Prisma.$RoadmapPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Roadmaps.
     * @param {RoadmapCreateManyArgs} args - Arguments to create many Roadmaps.
     * @example
     * // Create many Roadmaps
     * const roadmap = await prisma.roadmap.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoadmapCreateManyArgs>(args?: SelectSubset<T, RoadmapCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Roadmaps and returns the data saved in the database.
     * @param {RoadmapCreateManyAndReturnArgs} args - Arguments to create many Roadmaps.
     * @example
     * // Create many Roadmaps
     * const roadmap = await prisma.roadmap.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Roadmaps and only return the `id`
     * const roadmapWithIdOnly = await prisma.roadmap.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoadmapCreateManyAndReturnArgs>(args?: SelectSubset<T, RoadmapCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoadmapPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Roadmap.
     * @param {RoadmapDeleteArgs} args - Arguments to delete one Roadmap.
     * @example
     * // Delete one Roadmap
     * const Roadmap = await prisma.roadmap.delete({
     *   where: {
     *     // ... filter to delete one Roadmap
     *   }
     * })
     * 
     */
    delete<T extends RoadmapDeleteArgs>(args: SelectSubset<T, RoadmapDeleteArgs<ExtArgs>>): Prisma__RoadmapClient<$Result.GetResult<Prisma.$RoadmapPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Roadmap.
     * @param {RoadmapUpdateArgs} args - Arguments to update one Roadmap.
     * @example
     * // Update one Roadmap
     * const roadmap = await prisma.roadmap.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoadmapUpdateArgs>(args: SelectSubset<T, RoadmapUpdateArgs<ExtArgs>>): Prisma__RoadmapClient<$Result.GetResult<Prisma.$RoadmapPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Roadmaps.
     * @param {RoadmapDeleteManyArgs} args - Arguments to filter Roadmaps to delete.
     * @example
     * // Delete a few Roadmaps
     * const { count } = await prisma.roadmap.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoadmapDeleteManyArgs>(args?: SelectSubset<T, RoadmapDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roadmaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roadmaps
     * const roadmap = await prisma.roadmap.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoadmapUpdateManyArgs>(args: SelectSubset<T, RoadmapUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Roadmap.
     * @param {RoadmapUpsertArgs} args - Arguments to update or create a Roadmap.
     * @example
     * // Update or create a Roadmap
     * const roadmap = await prisma.roadmap.upsert({
     *   create: {
     *     // ... data to create a Roadmap
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Roadmap we want to update
     *   }
     * })
     */
    upsert<T extends RoadmapUpsertArgs>(args: SelectSubset<T, RoadmapUpsertArgs<ExtArgs>>): Prisma__RoadmapClient<$Result.GetResult<Prisma.$RoadmapPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Roadmaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapCountArgs} args - Arguments to filter Roadmaps to count.
     * @example
     * // Count the number of Roadmaps
     * const count = await prisma.roadmap.count({
     *   where: {
     *     // ... the filter for the Roadmaps we want to count
     *   }
     * })
    **/
    count<T extends RoadmapCountArgs>(
      args?: Subset<T, RoadmapCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoadmapCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Roadmap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoadmapAggregateArgs>(args: Subset<T, RoadmapAggregateArgs>): Prisma.PrismaPromise<GetRoadmapAggregateType<T>>

    /**
     * Group by Roadmap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapGroupByArgs} args - Group by arguments.
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
      T extends RoadmapGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoadmapGroupByArgs['orderBy'] }
        : { orderBy?: RoadmapGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoadmapGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoadmapGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Roadmap model
   */
  readonly fields: RoadmapFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Roadmap.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoadmapClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    course<T extends Roadmap$courseArgs<ExtArgs> = {}>(args?: Subset<T, Roadmap$courseArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    nodes<T extends Roadmap$nodesArgs<ExtArgs> = {}>(args?: Subset<T, Roadmap$nodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoadmapNodePayload<ExtArgs>, T, "findMany"> | Null>
    edges<T extends Roadmap$edgesArgs<ExtArgs> = {}>(args?: Subset<T, Roadmap$edgesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoadmapEdgePayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Roadmap model
   */ 
  interface RoadmapFieldRefs {
    readonly id: FieldRef<"Roadmap", 'Int'>
    readonly slug: FieldRef<"Roadmap", 'String'>
    readonly title: FieldRef<"Roadmap", 'String'>
    readonly description: FieldRef<"Roadmap", 'String'>
    readonly courseId: FieldRef<"Roadmap", 'Int'>
    readonly structure: FieldRef<"Roadmap", 'Json'>
    readonly createdAt: FieldRef<"Roadmap", 'DateTime'>
    readonly updatedAt: FieldRef<"Roadmap", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Roadmap findUnique
   */
  export type RoadmapFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapInclude<ExtArgs> | null
    /**
     * Filter, which Roadmap to fetch.
     */
    where: RoadmapWhereUniqueInput
  }

  /**
   * Roadmap findUniqueOrThrow
   */
  export type RoadmapFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapInclude<ExtArgs> | null
    /**
     * Filter, which Roadmap to fetch.
     */
    where: RoadmapWhereUniqueInput
  }

  /**
   * Roadmap findFirst
   */
  export type RoadmapFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapInclude<ExtArgs> | null
    /**
     * Filter, which Roadmap to fetch.
     */
    where?: RoadmapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roadmaps to fetch.
     */
    orderBy?: RoadmapOrderByWithRelationInput | RoadmapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roadmaps.
     */
    cursor?: RoadmapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roadmaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roadmaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roadmaps.
     */
    distinct?: RoadmapScalarFieldEnum | RoadmapScalarFieldEnum[]
  }

  /**
   * Roadmap findFirstOrThrow
   */
  export type RoadmapFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapInclude<ExtArgs> | null
    /**
     * Filter, which Roadmap to fetch.
     */
    where?: RoadmapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roadmaps to fetch.
     */
    orderBy?: RoadmapOrderByWithRelationInput | RoadmapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roadmaps.
     */
    cursor?: RoadmapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roadmaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roadmaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roadmaps.
     */
    distinct?: RoadmapScalarFieldEnum | RoadmapScalarFieldEnum[]
  }

  /**
   * Roadmap findMany
   */
  export type RoadmapFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapInclude<ExtArgs> | null
    /**
     * Filter, which Roadmaps to fetch.
     */
    where?: RoadmapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roadmaps to fetch.
     */
    orderBy?: RoadmapOrderByWithRelationInput | RoadmapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roadmaps.
     */
    cursor?: RoadmapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roadmaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roadmaps.
     */
    skip?: number
    distinct?: RoadmapScalarFieldEnum | RoadmapScalarFieldEnum[]
  }

  /**
   * Roadmap create
   */
  export type RoadmapCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapInclude<ExtArgs> | null
    /**
     * The data needed to create a Roadmap.
     */
    data: XOR<RoadmapCreateInput, RoadmapUncheckedCreateInput>
  }

  /**
   * Roadmap createMany
   */
  export type RoadmapCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roadmaps.
     */
    data: RoadmapCreateManyInput | RoadmapCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Roadmap createManyAndReturn
   */
  export type RoadmapCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Roadmaps.
     */
    data: RoadmapCreateManyInput | RoadmapCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Roadmap update
   */
  export type RoadmapUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapInclude<ExtArgs> | null
    /**
     * The data needed to update a Roadmap.
     */
    data: XOR<RoadmapUpdateInput, RoadmapUncheckedUpdateInput>
    /**
     * Choose, which Roadmap to update.
     */
    where: RoadmapWhereUniqueInput
  }

  /**
   * Roadmap updateMany
   */
  export type RoadmapUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roadmaps.
     */
    data: XOR<RoadmapUpdateManyMutationInput, RoadmapUncheckedUpdateManyInput>
    /**
     * Filter which Roadmaps to update
     */
    where?: RoadmapWhereInput
  }

  /**
   * Roadmap upsert
   */
  export type RoadmapUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapInclude<ExtArgs> | null
    /**
     * The filter to search for the Roadmap to update in case it exists.
     */
    where: RoadmapWhereUniqueInput
    /**
     * In case the Roadmap found by the `where` argument doesn't exist, create a new Roadmap with this data.
     */
    create: XOR<RoadmapCreateInput, RoadmapUncheckedCreateInput>
    /**
     * In case the Roadmap was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoadmapUpdateInput, RoadmapUncheckedUpdateInput>
  }

  /**
   * Roadmap delete
   */
  export type RoadmapDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapInclude<ExtArgs> | null
    /**
     * Filter which Roadmap to delete.
     */
    where: RoadmapWhereUniqueInput
  }

  /**
   * Roadmap deleteMany
   */
  export type RoadmapDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roadmaps to delete
     */
    where?: RoadmapWhereInput
  }

  /**
   * Roadmap.course
   */
  export type Roadmap$courseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
  }

  /**
   * Roadmap.nodes
   */
  export type Roadmap$nodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapNodeInclude<ExtArgs> | null
    where?: RoadmapNodeWhereInput
    orderBy?: RoadmapNodeOrderByWithRelationInput | RoadmapNodeOrderByWithRelationInput[]
    cursor?: RoadmapNodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoadmapNodeScalarFieldEnum | RoadmapNodeScalarFieldEnum[]
  }

  /**
   * Roadmap.edges
   */
  export type Roadmap$edgesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapEdgeInclude<ExtArgs> | null
    where?: RoadmapEdgeWhereInput
    orderBy?: RoadmapEdgeOrderByWithRelationInput | RoadmapEdgeOrderByWithRelationInput[]
    cursor?: RoadmapEdgeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoadmapEdgeScalarFieldEnum | RoadmapEdgeScalarFieldEnum[]
  }

  /**
   * Roadmap without action
   */
  export type RoadmapDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapInclude<ExtArgs> | null
  }


  /**
   * Model RoadmapNode
   */

  export type AggregateRoadmapNode = {
    _count: RoadmapNodeCountAggregateOutputType | null
    _avg: RoadmapNodeAvgAggregateOutputType | null
    _sum: RoadmapNodeSumAggregateOutputType | null
    _min: RoadmapNodeMinAggregateOutputType | null
    _max: RoadmapNodeMaxAggregateOutputType | null
  }

  export type RoadmapNodeAvgAggregateOutputType = {
    id: number | null
    roadmapId: number | null
  }

  export type RoadmapNodeSumAggregateOutputType = {
    id: number | null
    roadmapId: number | null
  }

  export type RoadmapNodeMinAggregateOutputType = {
    id: number | null
    roadmapId: number | null
    nodeKey: string | null
    title: string | null
    summary: string | null
    contentMd: string | null
    isRequired: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoadmapNodeMaxAggregateOutputType = {
    id: number | null
    roadmapId: number | null
    nodeKey: string | null
    title: string | null
    summary: string | null
    contentMd: string | null
    isRequired: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoadmapNodeCountAggregateOutputType = {
    id: number
    roadmapId: number
    nodeKey: number
    title: number
    summary: number
    contentMd: number
    isRequired: number
    metadata: number
    coords: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoadmapNodeAvgAggregateInputType = {
    id?: true
    roadmapId?: true
  }

  export type RoadmapNodeSumAggregateInputType = {
    id?: true
    roadmapId?: true
  }

  export type RoadmapNodeMinAggregateInputType = {
    id?: true
    roadmapId?: true
    nodeKey?: true
    title?: true
    summary?: true
    contentMd?: true
    isRequired?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoadmapNodeMaxAggregateInputType = {
    id?: true
    roadmapId?: true
    nodeKey?: true
    title?: true
    summary?: true
    contentMd?: true
    isRequired?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoadmapNodeCountAggregateInputType = {
    id?: true
    roadmapId?: true
    nodeKey?: true
    title?: true
    summary?: true
    contentMd?: true
    isRequired?: true
    metadata?: true
    coords?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoadmapNodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoadmapNode to aggregate.
     */
    where?: RoadmapNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoadmapNodes to fetch.
     */
    orderBy?: RoadmapNodeOrderByWithRelationInput | RoadmapNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoadmapNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoadmapNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoadmapNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoadmapNodes
    **/
    _count?: true | RoadmapNodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoadmapNodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoadmapNodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoadmapNodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoadmapNodeMaxAggregateInputType
  }

  export type GetRoadmapNodeAggregateType<T extends RoadmapNodeAggregateArgs> = {
        [P in keyof T & keyof AggregateRoadmapNode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoadmapNode[P]>
      : GetScalarType<T[P], AggregateRoadmapNode[P]>
  }




  export type RoadmapNodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoadmapNodeWhereInput
    orderBy?: RoadmapNodeOrderByWithAggregationInput | RoadmapNodeOrderByWithAggregationInput[]
    by: RoadmapNodeScalarFieldEnum[] | RoadmapNodeScalarFieldEnum
    having?: RoadmapNodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoadmapNodeCountAggregateInputType | true
    _avg?: RoadmapNodeAvgAggregateInputType
    _sum?: RoadmapNodeSumAggregateInputType
    _min?: RoadmapNodeMinAggregateInputType
    _max?: RoadmapNodeMaxAggregateInputType
  }

  export type RoadmapNodeGroupByOutputType = {
    id: number
    roadmapId: number
    nodeKey: string
    title: string
    summary: string | null
    contentMd: string | null
    isRequired: boolean
    metadata: JsonValue | null
    coords: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: RoadmapNodeCountAggregateOutputType | null
    _avg: RoadmapNodeAvgAggregateOutputType | null
    _sum: RoadmapNodeSumAggregateOutputType | null
    _min: RoadmapNodeMinAggregateOutputType | null
    _max: RoadmapNodeMaxAggregateOutputType | null
  }

  type GetRoadmapNodeGroupByPayload<T extends RoadmapNodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoadmapNodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoadmapNodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoadmapNodeGroupByOutputType[P]>
            : GetScalarType<T[P], RoadmapNodeGroupByOutputType[P]>
        }
      >
    >


  export type RoadmapNodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roadmapId?: boolean
    nodeKey?: boolean
    title?: boolean
    summary?: boolean
    contentMd?: boolean
    isRequired?: boolean
    metadata?: boolean
    coords?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    roadmap?: boolean | RoadmapDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roadmapNode"]>

  export type RoadmapNodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roadmapId?: boolean
    nodeKey?: boolean
    title?: boolean
    summary?: boolean
    contentMd?: boolean
    isRequired?: boolean
    metadata?: boolean
    coords?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    roadmap?: boolean | RoadmapDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roadmapNode"]>

  export type RoadmapNodeSelectScalar = {
    id?: boolean
    roadmapId?: boolean
    nodeKey?: boolean
    title?: boolean
    summary?: boolean
    contentMd?: boolean
    isRequired?: boolean
    metadata?: boolean
    coords?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoadmapNodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roadmap?: boolean | RoadmapDefaultArgs<ExtArgs>
  }
  export type RoadmapNodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roadmap?: boolean | RoadmapDefaultArgs<ExtArgs>
  }

  export type $RoadmapNodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoadmapNode"
    objects: {
      roadmap: Prisma.$RoadmapPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      roadmapId: number
      nodeKey: string
      title: string
      summary: string | null
      contentMd: string | null
      isRequired: boolean
      metadata: Prisma.JsonValue | null
      coords: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["roadmapNode"]>
    composites: {}
  }

  type RoadmapNodeGetPayload<S extends boolean | null | undefined | RoadmapNodeDefaultArgs> = $Result.GetResult<Prisma.$RoadmapNodePayload, S>

  type RoadmapNodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RoadmapNodeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RoadmapNodeCountAggregateInputType | true
    }

  export interface RoadmapNodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoadmapNode'], meta: { name: 'RoadmapNode' } }
    /**
     * Find zero or one RoadmapNode that matches the filter.
     * @param {RoadmapNodeFindUniqueArgs} args - Arguments to find a RoadmapNode
     * @example
     * // Get one RoadmapNode
     * const roadmapNode = await prisma.roadmapNode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoadmapNodeFindUniqueArgs>(args: SelectSubset<T, RoadmapNodeFindUniqueArgs<ExtArgs>>): Prisma__RoadmapNodeClient<$Result.GetResult<Prisma.$RoadmapNodePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RoadmapNode that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RoadmapNodeFindUniqueOrThrowArgs} args - Arguments to find a RoadmapNode
     * @example
     * // Get one RoadmapNode
     * const roadmapNode = await prisma.roadmapNode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoadmapNodeFindUniqueOrThrowArgs>(args: SelectSubset<T, RoadmapNodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoadmapNodeClient<$Result.GetResult<Prisma.$RoadmapNodePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RoadmapNode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapNodeFindFirstArgs} args - Arguments to find a RoadmapNode
     * @example
     * // Get one RoadmapNode
     * const roadmapNode = await prisma.roadmapNode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoadmapNodeFindFirstArgs>(args?: SelectSubset<T, RoadmapNodeFindFirstArgs<ExtArgs>>): Prisma__RoadmapNodeClient<$Result.GetResult<Prisma.$RoadmapNodePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RoadmapNode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapNodeFindFirstOrThrowArgs} args - Arguments to find a RoadmapNode
     * @example
     * // Get one RoadmapNode
     * const roadmapNode = await prisma.roadmapNode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoadmapNodeFindFirstOrThrowArgs>(args?: SelectSubset<T, RoadmapNodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoadmapNodeClient<$Result.GetResult<Prisma.$RoadmapNodePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RoadmapNodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapNodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoadmapNodes
     * const roadmapNodes = await prisma.roadmapNode.findMany()
     * 
     * // Get first 10 RoadmapNodes
     * const roadmapNodes = await prisma.roadmapNode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roadmapNodeWithIdOnly = await prisma.roadmapNode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoadmapNodeFindManyArgs>(args?: SelectSubset<T, RoadmapNodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoadmapNodePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RoadmapNode.
     * @param {RoadmapNodeCreateArgs} args - Arguments to create a RoadmapNode.
     * @example
     * // Create one RoadmapNode
     * const RoadmapNode = await prisma.roadmapNode.create({
     *   data: {
     *     // ... data to create a RoadmapNode
     *   }
     * })
     * 
     */
    create<T extends RoadmapNodeCreateArgs>(args: SelectSubset<T, RoadmapNodeCreateArgs<ExtArgs>>): Prisma__RoadmapNodeClient<$Result.GetResult<Prisma.$RoadmapNodePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RoadmapNodes.
     * @param {RoadmapNodeCreateManyArgs} args - Arguments to create many RoadmapNodes.
     * @example
     * // Create many RoadmapNodes
     * const roadmapNode = await prisma.roadmapNode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoadmapNodeCreateManyArgs>(args?: SelectSubset<T, RoadmapNodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoadmapNodes and returns the data saved in the database.
     * @param {RoadmapNodeCreateManyAndReturnArgs} args - Arguments to create many RoadmapNodes.
     * @example
     * // Create many RoadmapNodes
     * const roadmapNode = await prisma.roadmapNode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoadmapNodes and only return the `id`
     * const roadmapNodeWithIdOnly = await prisma.roadmapNode.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoadmapNodeCreateManyAndReturnArgs>(args?: SelectSubset<T, RoadmapNodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoadmapNodePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RoadmapNode.
     * @param {RoadmapNodeDeleteArgs} args - Arguments to delete one RoadmapNode.
     * @example
     * // Delete one RoadmapNode
     * const RoadmapNode = await prisma.roadmapNode.delete({
     *   where: {
     *     // ... filter to delete one RoadmapNode
     *   }
     * })
     * 
     */
    delete<T extends RoadmapNodeDeleteArgs>(args: SelectSubset<T, RoadmapNodeDeleteArgs<ExtArgs>>): Prisma__RoadmapNodeClient<$Result.GetResult<Prisma.$RoadmapNodePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RoadmapNode.
     * @param {RoadmapNodeUpdateArgs} args - Arguments to update one RoadmapNode.
     * @example
     * // Update one RoadmapNode
     * const roadmapNode = await prisma.roadmapNode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoadmapNodeUpdateArgs>(args: SelectSubset<T, RoadmapNodeUpdateArgs<ExtArgs>>): Prisma__RoadmapNodeClient<$Result.GetResult<Prisma.$RoadmapNodePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RoadmapNodes.
     * @param {RoadmapNodeDeleteManyArgs} args - Arguments to filter RoadmapNodes to delete.
     * @example
     * // Delete a few RoadmapNodes
     * const { count } = await prisma.roadmapNode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoadmapNodeDeleteManyArgs>(args?: SelectSubset<T, RoadmapNodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoadmapNodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapNodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoadmapNodes
     * const roadmapNode = await prisma.roadmapNode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoadmapNodeUpdateManyArgs>(args: SelectSubset<T, RoadmapNodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RoadmapNode.
     * @param {RoadmapNodeUpsertArgs} args - Arguments to update or create a RoadmapNode.
     * @example
     * // Update or create a RoadmapNode
     * const roadmapNode = await prisma.roadmapNode.upsert({
     *   create: {
     *     // ... data to create a RoadmapNode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoadmapNode we want to update
     *   }
     * })
     */
    upsert<T extends RoadmapNodeUpsertArgs>(args: SelectSubset<T, RoadmapNodeUpsertArgs<ExtArgs>>): Prisma__RoadmapNodeClient<$Result.GetResult<Prisma.$RoadmapNodePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RoadmapNodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapNodeCountArgs} args - Arguments to filter RoadmapNodes to count.
     * @example
     * // Count the number of RoadmapNodes
     * const count = await prisma.roadmapNode.count({
     *   where: {
     *     // ... the filter for the RoadmapNodes we want to count
     *   }
     * })
    **/
    count<T extends RoadmapNodeCountArgs>(
      args?: Subset<T, RoadmapNodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoadmapNodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoadmapNode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapNodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoadmapNodeAggregateArgs>(args: Subset<T, RoadmapNodeAggregateArgs>): Prisma.PrismaPromise<GetRoadmapNodeAggregateType<T>>

    /**
     * Group by RoadmapNode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapNodeGroupByArgs} args - Group by arguments.
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
      T extends RoadmapNodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoadmapNodeGroupByArgs['orderBy'] }
        : { orderBy?: RoadmapNodeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoadmapNodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoadmapNodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoadmapNode model
   */
  readonly fields: RoadmapNodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoadmapNode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoadmapNodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roadmap<T extends RoadmapDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoadmapDefaultArgs<ExtArgs>>): Prisma__RoadmapClient<$Result.GetResult<Prisma.$RoadmapPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the RoadmapNode model
   */ 
  interface RoadmapNodeFieldRefs {
    readonly id: FieldRef<"RoadmapNode", 'Int'>
    readonly roadmapId: FieldRef<"RoadmapNode", 'Int'>
    readonly nodeKey: FieldRef<"RoadmapNode", 'String'>
    readonly title: FieldRef<"RoadmapNode", 'String'>
    readonly summary: FieldRef<"RoadmapNode", 'String'>
    readonly contentMd: FieldRef<"RoadmapNode", 'String'>
    readonly isRequired: FieldRef<"RoadmapNode", 'Boolean'>
    readonly metadata: FieldRef<"RoadmapNode", 'Json'>
    readonly coords: FieldRef<"RoadmapNode", 'Json'>
    readonly createdAt: FieldRef<"RoadmapNode", 'DateTime'>
    readonly updatedAt: FieldRef<"RoadmapNode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoadmapNode findUnique
   */
  export type RoadmapNodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapNodeInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapNode to fetch.
     */
    where: RoadmapNodeWhereUniqueInput
  }

  /**
   * RoadmapNode findUniqueOrThrow
   */
  export type RoadmapNodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapNodeInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapNode to fetch.
     */
    where: RoadmapNodeWhereUniqueInput
  }

  /**
   * RoadmapNode findFirst
   */
  export type RoadmapNodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapNodeInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapNode to fetch.
     */
    where?: RoadmapNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoadmapNodes to fetch.
     */
    orderBy?: RoadmapNodeOrderByWithRelationInput | RoadmapNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoadmapNodes.
     */
    cursor?: RoadmapNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoadmapNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoadmapNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoadmapNodes.
     */
    distinct?: RoadmapNodeScalarFieldEnum | RoadmapNodeScalarFieldEnum[]
  }

  /**
   * RoadmapNode findFirstOrThrow
   */
  export type RoadmapNodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapNodeInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapNode to fetch.
     */
    where?: RoadmapNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoadmapNodes to fetch.
     */
    orderBy?: RoadmapNodeOrderByWithRelationInput | RoadmapNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoadmapNodes.
     */
    cursor?: RoadmapNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoadmapNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoadmapNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoadmapNodes.
     */
    distinct?: RoadmapNodeScalarFieldEnum | RoadmapNodeScalarFieldEnum[]
  }

  /**
   * RoadmapNode findMany
   */
  export type RoadmapNodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapNodeInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapNodes to fetch.
     */
    where?: RoadmapNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoadmapNodes to fetch.
     */
    orderBy?: RoadmapNodeOrderByWithRelationInput | RoadmapNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoadmapNodes.
     */
    cursor?: RoadmapNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoadmapNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoadmapNodes.
     */
    skip?: number
    distinct?: RoadmapNodeScalarFieldEnum | RoadmapNodeScalarFieldEnum[]
  }

  /**
   * RoadmapNode create
   */
  export type RoadmapNodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapNodeInclude<ExtArgs> | null
    /**
     * The data needed to create a RoadmapNode.
     */
    data: XOR<RoadmapNodeCreateInput, RoadmapNodeUncheckedCreateInput>
  }

  /**
   * RoadmapNode createMany
   */
  export type RoadmapNodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoadmapNodes.
     */
    data: RoadmapNodeCreateManyInput | RoadmapNodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoadmapNode createManyAndReturn
   */
  export type RoadmapNodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RoadmapNodes.
     */
    data: RoadmapNodeCreateManyInput | RoadmapNodeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapNodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoadmapNode update
   */
  export type RoadmapNodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapNodeInclude<ExtArgs> | null
    /**
     * The data needed to update a RoadmapNode.
     */
    data: XOR<RoadmapNodeUpdateInput, RoadmapNodeUncheckedUpdateInput>
    /**
     * Choose, which RoadmapNode to update.
     */
    where: RoadmapNodeWhereUniqueInput
  }

  /**
   * RoadmapNode updateMany
   */
  export type RoadmapNodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoadmapNodes.
     */
    data: XOR<RoadmapNodeUpdateManyMutationInput, RoadmapNodeUncheckedUpdateManyInput>
    /**
     * Filter which RoadmapNodes to update
     */
    where?: RoadmapNodeWhereInput
  }

  /**
   * RoadmapNode upsert
   */
  export type RoadmapNodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapNodeInclude<ExtArgs> | null
    /**
     * The filter to search for the RoadmapNode to update in case it exists.
     */
    where: RoadmapNodeWhereUniqueInput
    /**
     * In case the RoadmapNode found by the `where` argument doesn't exist, create a new RoadmapNode with this data.
     */
    create: XOR<RoadmapNodeCreateInput, RoadmapNodeUncheckedCreateInput>
    /**
     * In case the RoadmapNode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoadmapNodeUpdateInput, RoadmapNodeUncheckedUpdateInput>
  }

  /**
   * RoadmapNode delete
   */
  export type RoadmapNodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapNodeInclude<ExtArgs> | null
    /**
     * Filter which RoadmapNode to delete.
     */
    where: RoadmapNodeWhereUniqueInput
  }

  /**
   * RoadmapNode deleteMany
   */
  export type RoadmapNodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoadmapNodes to delete
     */
    where?: RoadmapNodeWhereInput
  }

  /**
   * RoadmapNode without action
   */
  export type RoadmapNodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapNodeInclude<ExtArgs> | null
  }


  /**
   * Model RoadmapEdge
   */

  export type AggregateRoadmapEdge = {
    _count: RoadmapEdgeCountAggregateOutputType | null
    _avg: RoadmapEdgeAvgAggregateOutputType | null
    _sum: RoadmapEdgeSumAggregateOutputType | null
    _min: RoadmapEdgeMinAggregateOutputType | null
    _max: RoadmapEdgeMaxAggregateOutputType | null
  }

  export type RoadmapEdgeAvgAggregateOutputType = {
    id: number | null
    roadmapId: number | null
  }

  export type RoadmapEdgeSumAggregateOutputType = {
    id: number | null
    roadmapId: number | null
  }

  export type RoadmapEdgeMinAggregateOutputType = {
    id: number | null
    roadmapId: number | null
    sourceKey: string | null
    targetKey: string | null
    createdAt: Date | null
  }

  export type RoadmapEdgeMaxAggregateOutputType = {
    id: number | null
    roadmapId: number | null
    sourceKey: string | null
    targetKey: string | null
    createdAt: Date | null
  }

  export type RoadmapEdgeCountAggregateOutputType = {
    id: number
    roadmapId: number
    sourceKey: number
    targetKey: number
    createdAt: number
    _all: number
  }


  export type RoadmapEdgeAvgAggregateInputType = {
    id?: true
    roadmapId?: true
  }

  export type RoadmapEdgeSumAggregateInputType = {
    id?: true
    roadmapId?: true
  }

  export type RoadmapEdgeMinAggregateInputType = {
    id?: true
    roadmapId?: true
    sourceKey?: true
    targetKey?: true
    createdAt?: true
  }

  export type RoadmapEdgeMaxAggregateInputType = {
    id?: true
    roadmapId?: true
    sourceKey?: true
    targetKey?: true
    createdAt?: true
  }

  export type RoadmapEdgeCountAggregateInputType = {
    id?: true
    roadmapId?: true
    sourceKey?: true
    targetKey?: true
    createdAt?: true
    _all?: true
  }

  export type RoadmapEdgeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoadmapEdge to aggregate.
     */
    where?: RoadmapEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoadmapEdges to fetch.
     */
    orderBy?: RoadmapEdgeOrderByWithRelationInput | RoadmapEdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoadmapEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoadmapEdges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoadmapEdges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoadmapEdges
    **/
    _count?: true | RoadmapEdgeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoadmapEdgeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoadmapEdgeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoadmapEdgeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoadmapEdgeMaxAggregateInputType
  }

  export type GetRoadmapEdgeAggregateType<T extends RoadmapEdgeAggregateArgs> = {
        [P in keyof T & keyof AggregateRoadmapEdge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoadmapEdge[P]>
      : GetScalarType<T[P], AggregateRoadmapEdge[P]>
  }




  export type RoadmapEdgeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoadmapEdgeWhereInput
    orderBy?: RoadmapEdgeOrderByWithAggregationInput | RoadmapEdgeOrderByWithAggregationInput[]
    by: RoadmapEdgeScalarFieldEnum[] | RoadmapEdgeScalarFieldEnum
    having?: RoadmapEdgeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoadmapEdgeCountAggregateInputType | true
    _avg?: RoadmapEdgeAvgAggregateInputType
    _sum?: RoadmapEdgeSumAggregateInputType
    _min?: RoadmapEdgeMinAggregateInputType
    _max?: RoadmapEdgeMaxAggregateInputType
  }

  export type RoadmapEdgeGroupByOutputType = {
    id: number
    roadmapId: number
    sourceKey: string
    targetKey: string
    createdAt: Date
    _count: RoadmapEdgeCountAggregateOutputType | null
    _avg: RoadmapEdgeAvgAggregateOutputType | null
    _sum: RoadmapEdgeSumAggregateOutputType | null
    _min: RoadmapEdgeMinAggregateOutputType | null
    _max: RoadmapEdgeMaxAggregateOutputType | null
  }

  type GetRoadmapEdgeGroupByPayload<T extends RoadmapEdgeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoadmapEdgeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoadmapEdgeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoadmapEdgeGroupByOutputType[P]>
            : GetScalarType<T[P], RoadmapEdgeGroupByOutputType[P]>
        }
      >
    >


  export type RoadmapEdgeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roadmapId?: boolean
    sourceKey?: boolean
    targetKey?: boolean
    createdAt?: boolean
    roadmap?: boolean | RoadmapDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roadmapEdge"]>

  export type RoadmapEdgeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roadmapId?: boolean
    sourceKey?: boolean
    targetKey?: boolean
    createdAt?: boolean
    roadmap?: boolean | RoadmapDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roadmapEdge"]>

  export type RoadmapEdgeSelectScalar = {
    id?: boolean
    roadmapId?: boolean
    sourceKey?: boolean
    targetKey?: boolean
    createdAt?: boolean
  }

  export type RoadmapEdgeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roadmap?: boolean | RoadmapDefaultArgs<ExtArgs>
  }
  export type RoadmapEdgeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roadmap?: boolean | RoadmapDefaultArgs<ExtArgs>
  }

  export type $RoadmapEdgePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoadmapEdge"
    objects: {
      roadmap: Prisma.$RoadmapPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      roadmapId: number
      sourceKey: string
      targetKey: string
      createdAt: Date
    }, ExtArgs["result"]["roadmapEdge"]>
    composites: {}
  }

  type RoadmapEdgeGetPayload<S extends boolean | null | undefined | RoadmapEdgeDefaultArgs> = $Result.GetResult<Prisma.$RoadmapEdgePayload, S>

  type RoadmapEdgeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RoadmapEdgeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RoadmapEdgeCountAggregateInputType | true
    }

  export interface RoadmapEdgeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoadmapEdge'], meta: { name: 'RoadmapEdge' } }
    /**
     * Find zero or one RoadmapEdge that matches the filter.
     * @param {RoadmapEdgeFindUniqueArgs} args - Arguments to find a RoadmapEdge
     * @example
     * // Get one RoadmapEdge
     * const roadmapEdge = await prisma.roadmapEdge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoadmapEdgeFindUniqueArgs>(args: SelectSubset<T, RoadmapEdgeFindUniqueArgs<ExtArgs>>): Prisma__RoadmapEdgeClient<$Result.GetResult<Prisma.$RoadmapEdgePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RoadmapEdge that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RoadmapEdgeFindUniqueOrThrowArgs} args - Arguments to find a RoadmapEdge
     * @example
     * // Get one RoadmapEdge
     * const roadmapEdge = await prisma.roadmapEdge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoadmapEdgeFindUniqueOrThrowArgs>(args: SelectSubset<T, RoadmapEdgeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoadmapEdgeClient<$Result.GetResult<Prisma.$RoadmapEdgePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RoadmapEdge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapEdgeFindFirstArgs} args - Arguments to find a RoadmapEdge
     * @example
     * // Get one RoadmapEdge
     * const roadmapEdge = await prisma.roadmapEdge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoadmapEdgeFindFirstArgs>(args?: SelectSubset<T, RoadmapEdgeFindFirstArgs<ExtArgs>>): Prisma__RoadmapEdgeClient<$Result.GetResult<Prisma.$RoadmapEdgePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RoadmapEdge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapEdgeFindFirstOrThrowArgs} args - Arguments to find a RoadmapEdge
     * @example
     * // Get one RoadmapEdge
     * const roadmapEdge = await prisma.roadmapEdge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoadmapEdgeFindFirstOrThrowArgs>(args?: SelectSubset<T, RoadmapEdgeFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoadmapEdgeClient<$Result.GetResult<Prisma.$RoadmapEdgePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RoadmapEdges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapEdgeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoadmapEdges
     * const roadmapEdges = await prisma.roadmapEdge.findMany()
     * 
     * // Get first 10 RoadmapEdges
     * const roadmapEdges = await prisma.roadmapEdge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roadmapEdgeWithIdOnly = await prisma.roadmapEdge.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoadmapEdgeFindManyArgs>(args?: SelectSubset<T, RoadmapEdgeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoadmapEdgePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RoadmapEdge.
     * @param {RoadmapEdgeCreateArgs} args - Arguments to create a RoadmapEdge.
     * @example
     * // Create one RoadmapEdge
     * const RoadmapEdge = await prisma.roadmapEdge.create({
     *   data: {
     *     // ... data to create a RoadmapEdge
     *   }
     * })
     * 
     */
    create<T extends RoadmapEdgeCreateArgs>(args: SelectSubset<T, RoadmapEdgeCreateArgs<ExtArgs>>): Prisma__RoadmapEdgeClient<$Result.GetResult<Prisma.$RoadmapEdgePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RoadmapEdges.
     * @param {RoadmapEdgeCreateManyArgs} args - Arguments to create many RoadmapEdges.
     * @example
     * // Create many RoadmapEdges
     * const roadmapEdge = await prisma.roadmapEdge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoadmapEdgeCreateManyArgs>(args?: SelectSubset<T, RoadmapEdgeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoadmapEdges and returns the data saved in the database.
     * @param {RoadmapEdgeCreateManyAndReturnArgs} args - Arguments to create many RoadmapEdges.
     * @example
     * // Create many RoadmapEdges
     * const roadmapEdge = await prisma.roadmapEdge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoadmapEdges and only return the `id`
     * const roadmapEdgeWithIdOnly = await prisma.roadmapEdge.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoadmapEdgeCreateManyAndReturnArgs>(args?: SelectSubset<T, RoadmapEdgeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoadmapEdgePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RoadmapEdge.
     * @param {RoadmapEdgeDeleteArgs} args - Arguments to delete one RoadmapEdge.
     * @example
     * // Delete one RoadmapEdge
     * const RoadmapEdge = await prisma.roadmapEdge.delete({
     *   where: {
     *     // ... filter to delete one RoadmapEdge
     *   }
     * })
     * 
     */
    delete<T extends RoadmapEdgeDeleteArgs>(args: SelectSubset<T, RoadmapEdgeDeleteArgs<ExtArgs>>): Prisma__RoadmapEdgeClient<$Result.GetResult<Prisma.$RoadmapEdgePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RoadmapEdge.
     * @param {RoadmapEdgeUpdateArgs} args - Arguments to update one RoadmapEdge.
     * @example
     * // Update one RoadmapEdge
     * const roadmapEdge = await prisma.roadmapEdge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoadmapEdgeUpdateArgs>(args: SelectSubset<T, RoadmapEdgeUpdateArgs<ExtArgs>>): Prisma__RoadmapEdgeClient<$Result.GetResult<Prisma.$RoadmapEdgePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RoadmapEdges.
     * @param {RoadmapEdgeDeleteManyArgs} args - Arguments to filter RoadmapEdges to delete.
     * @example
     * // Delete a few RoadmapEdges
     * const { count } = await prisma.roadmapEdge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoadmapEdgeDeleteManyArgs>(args?: SelectSubset<T, RoadmapEdgeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoadmapEdges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapEdgeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoadmapEdges
     * const roadmapEdge = await prisma.roadmapEdge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoadmapEdgeUpdateManyArgs>(args: SelectSubset<T, RoadmapEdgeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RoadmapEdge.
     * @param {RoadmapEdgeUpsertArgs} args - Arguments to update or create a RoadmapEdge.
     * @example
     * // Update or create a RoadmapEdge
     * const roadmapEdge = await prisma.roadmapEdge.upsert({
     *   create: {
     *     // ... data to create a RoadmapEdge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoadmapEdge we want to update
     *   }
     * })
     */
    upsert<T extends RoadmapEdgeUpsertArgs>(args: SelectSubset<T, RoadmapEdgeUpsertArgs<ExtArgs>>): Prisma__RoadmapEdgeClient<$Result.GetResult<Prisma.$RoadmapEdgePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RoadmapEdges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapEdgeCountArgs} args - Arguments to filter RoadmapEdges to count.
     * @example
     * // Count the number of RoadmapEdges
     * const count = await prisma.roadmapEdge.count({
     *   where: {
     *     // ... the filter for the RoadmapEdges we want to count
     *   }
     * })
    **/
    count<T extends RoadmapEdgeCountArgs>(
      args?: Subset<T, RoadmapEdgeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoadmapEdgeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoadmapEdge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapEdgeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoadmapEdgeAggregateArgs>(args: Subset<T, RoadmapEdgeAggregateArgs>): Prisma.PrismaPromise<GetRoadmapEdgeAggregateType<T>>

    /**
     * Group by RoadmapEdge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapEdgeGroupByArgs} args - Group by arguments.
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
      T extends RoadmapEdgeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoadmapEdgeGroupByArgs['orderBy'] }
        : { orderBy?: RoadmapEdgeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoadmapEdgeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoadmapEdgeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoadmapEdge model
   */
  readonly fields: RoadmapEdgeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoadmapEdge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoadmapEdgeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roadmap<T extends RoadmapDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoadmapDefaultArgs<ExtArgs>>): Prisma__RoadmapClient<$Result.GetResult<Prisma.$RoadmapPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the RoadmapEdge model
   */ 
  interface RoadmapEdgeFieldRefs {
    readonly id: FieldRef<"RoadmapEdge", 'Int'>
    readonly roadmapId: FieldRef<"RoadmapEdge", 'Int'>
    readonly sourceKey: FieldRef<"RoadmapEdge", 'String'>
    readonly targetKey: FieldRef<"RoadmapEdge", 'String'>
    readonly createdAt: FieldRef<"RoadmapEdge", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoadmapEdge findUnique
   */
  export type RoadmapEdgeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapEdgeInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapEdge to fetch.
     */
    where: RoadmapEdgeWhereUniqueInput
  }

  /**
   * RoadmapEdge findUniqueOrThrow
   */
  export type RoadmapEdgeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapEdgeInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapEdge to fetch.
     */
    where: RoadmapEdgeWhereUniqueInput
  }

  /**
   * RoadmapEdge findFirst
   */
  export type RoadmapEdgeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapEdgeInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapEdge to fetch.
     */
    where?: RoadmapEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoadmapEdges to fetch.
     */
    orderBy?: RoadmapEdgeOrderByWithRelationInput | RoadmapEdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoadmapEdges.
     */
    cursor?: RoadmapEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoadmapEdges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoadmapEdges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoadmapEdges.
     */
    distinct?: RoadmapEdgeScalarFieldEnum | RoadmapEdgeScalarFieldEnum[]
  }

  /**
   * RoadmapEdge findFirstOrThrow
   */
  export type RoadmapEdgeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapEdgeInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapEdge to fetch.
     */
    where?: RoadmapEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoadmapEdges to fetch.
     */
    orderBy?: RoadmapEdgeOrderByWithRelationInput | RoadmapEdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoadmapEdges.
     */
    cursor?: RoadmapEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoadmapEdges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoadmapEdges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoadmapEdges.
     */
    distinct?: RoadmapEdgeScalarFieldEnum | RoadmapEdgeScalarFieldEnum[]
  }

  /**
   * RoadmapEdge findMany
   */
  export type RoadmapEdgeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapEdgeInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapEdges to fetch.
     */
    where?: RoadmapEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoadmapEdges to fetch.
     */
    orderBy?: RoadmapEdgeOrderByWithRelationInput | RoadmapEdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoadmapEdges.
     */
    cursor?: RoadmapEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoadmapEdges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoadmapEdges.
     */
    skip?: number
    distinct?: RoadmapEdgeScalarFieldEnum | RoadmapEdgeScalarFieldEnum[]
  }

  /**
   * RoadmapEdge create
   */
  export type RoadmapEdgeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapEdgeInclude<ExtArgs> | null
    /**
     * The data needed to create a RoadmapEdge.
     */
    data: XOR<RoadmapEdgeCreateInput, RoadmapEdgeUncheckedCreateInput>
  }

  /**
   * RoadmapEdge createMany
   */
  export type RoadmapEdgeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoadmapEdges.
     */
    data: RoadmapEdgeCreateManyInput | RoadmapEdgeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoadmapEdge createManyAndReturn
   */
  export type RoadmapEdgeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RoadmapEdges.
     */
    data: RoadmapEdgeCreateManyInput | RoadmapEdgeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapEdgeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoadmapEdge update
   */
  export type RoadmapEdgeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapEdgeInclude<ExtArgs> | null
    /**
     * The data needed to update a RoadmapEdge.
     */
    data: XOR<RoadmapEdgeUpdateInput, RoadmapEdgeUncheckedUpdateInput>
    /**
     * Choose, which RoadmapEdge to update.
     */
    where: RoadmapEdgeWhereUniqueInput
  }

  /**
   * RoadmapEdge updateMany
   */
  export type RoadmapEdgeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoadmapEdges.
     */
    data: XOR<RoadmapEdgeUpdateManyMutationInput, RoadmapEdgeUncheckedUpdateManyInput>
    /**
     * Filter which RoadmapEdges to update
     */
    where?: RoadmapEdgeWhereInput
  }

  /**
   * RoadmapEdge upsert
   */
  export type RoadmapEdgeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapEdgeInclude<ExtArgs> | null
    /**
     * The filter to search for the RoadmapEdge to update in case it exists.
     */
    where: RoadmapEdgeWhereUniqueInput
    /**
     * In case the RoadmapEdge found by the `where` argument doesn't exist, create a new RoadmapEdge with this data.
     */
    create: XOR<RoadmapEdgeCreateInput, RoadmapEdgeUncheckedCreateInput>
    /**
     * In case the RoadmapEdge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoadmapEdgeUpdateInput, RoadmapEdgeUncheckedUpdateInput>
  }

  /**
   * RoadmapEdge delete
   */
  export type RoadmapEdgeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapEdgeInclude<ExtArgs> | null
    /**
     * Filter which RoadmapEdge to delete.
     */
    where: RoadmapEdgeWhereUniqueInput
  }

  /**
   * RoadmapEdge deleteMany
   */
  export type RoadmapEdgeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoadmapEdges to delete
     */
    where?: RoadmapEdgeWhereInput
  }

  /**
   * RoadmapEdge without action
   */
  export type RoadmapEdgeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapEdgeInclude<ExtArgs> | null
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


  export const DepartmentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DepartmentScalarFieldEnum = (typeof DepartmentScalarFieldEnum)[keyof typeof DepartmentScalarFieldEnum]


  export const CourseScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    title: 'title',
    description: 'description',
    type: 'type',
    departmentId: 'departmentId',
    priorityJob: 'priorityJob',
    structure: 'structure',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum]


  export const RoadmapScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    title: 'title',
    description: 'description',
    courseId: 'courseId',
    structure: 'structure',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoadmapScalarFieldEnum = (typeof RoadmapScalarFieldEnum)[keyof typeof RoadmapScalarFieldEnum]


  export const RoadmapNodeScalarFieldEnum: {
    id: 'id',
    roadmapId: 'roadmapId',
    nodeKey: 'nodeKey',
    title: 'title',
    summary: 'summary',
    contentMd: 'contentMd',
    isRequired: 'isRequired',
    metadata: 'metadata',
    coords: 'coords',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoadmapNodeScalarFieldEnum = (typeof RoadmapNodeScalarFieldEnum)[keyof typeof RoadmapNodeScalarFieldEnum]


  export const RoadmapEdgeScalarFieldEnum: {
    id: 'id',
    roadmapId: 'roadmapId',
    sourceKey: 'sourceKey',
    targetKey: 'targetKey',
    createdAt: 'createdAt'
  };

  export type RoadmapEdgeScalarFieldEnum = (typeof RoadmapEdgeScalarFieldEnum)[keyof typeof RoadmapEdgeScalarFieldEnum]


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
   * Reference to a field of type 'CourseType'
   */
  export type EnumCourseTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CourseType'>
    


  /**
   * Reference to a field of type 'CourseType[]'
   */
  export type ListEnumCourseTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CourseType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


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


  export type DepartmentWhereInput = {
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    id?: IntFilter<"Department"> | number
    name?: StringFilter<"Department"> | string
    slug?: StringFilter<"Department"> | string
    description?: StringNullableFilter<"Department"> | string | null
    createdAt?: DateTimeFilter<"Department"> | Date | string
    updatedAt?: DateTimeFilter<"Department"> | Date | string
    courses?: CourseListRelationFilter
  }

  export type DepartmentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    courses?: CourseOrderByRelationAggregateInput
  }

  export type DepartmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    slug?: string
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    description?: StringNullableFilter<"Department"> | string | null
    createdAt?: DateTimeFilter<"Department"> | Date | string
    updatedAt?: DateTimeFilter<"Department"> | Date | string
    courses?: CourseListRelationFilter
  }, "id" | "name" | "slug">

  export type DepartmentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DepartmentCountOrderByAggregateInput
    _avg?: DepartmentAvgOrderByAggregateInput
    _max?: DepartmentMaxOrderByAggregateInput
    _min?: DepartmentMinOrderByAggregateInput
    _sum?: DepartmentSumOrderByAggregateInput
  }

  export type DepartmentScalarWhereWithAggregatesInput = {
    AND?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    OR?: DepartmentScalarWhereWithAggregatesInput[]
    NOT?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Department"> | number
    name?: StringWithAggregatesFilter<"Department"> | string
    slug?: StringWithAggregatesFilter<"Department"> | string
    description?: StringNullableWithAggregatesFilter<"Department"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Department"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Department"> | Date | string
  }

  export type CourseWhereInput = {
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    id?: IntFilter<"Course"> | number
    slug?: StringFilter<"Course"> | string
    title?: StringFilter<"Course"> | string
    description?: StringNullableFilter<"Course"> | string | null
    type?: EnumCourseTypeFilter<"Course"> | $Enums.CourseType
    departmentId?: IntNullableFilter<"Course"> | number | null
    priorityJob?: StringNullableListFilter<"Course">
    structure?: JsonNullableFilter<"Course">
    createdAt?: DateTimeFilter<"Course"> | Date | string
    updatedAt?: DateTimeFilter<"Course"> | Date | string
    department?: XOR<DepartmentNullableRelationFilter, DepartmentWhereInput> | null
    roadmaps?: RoadmapListRelationFilter
  }

  export type CourseOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    type?: SortOrder
    departmentId?: SortOrderInput | SortOrder
    priorityJob?: SortOrder
    structure?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    department?: DepartmentOrderByWithRelationInput
    roadmaps?: RoadmapOrderByRelationAggregateInput
  }

  export type CourseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    title?: StringFilter<"Course"> | string
    description?: StringNullableFilter<"Course"> | string | null
    type?: EnumCourseTypeFilter<"Course"> | $Enums.CourseType
    departmentId?: IntNullableFilter<"Course"> | number | null
    priorityJob?: StringNullableListFilter<"Course">
    structure?: JsonNullableFilter<"Course">
    createdAt?: DateTimeFilter<"Course"> | Date | string
    updatedAt?: DateTimeFilter<"Course"> | Date | string
    department?: XOR<DepartmentNullableRelationFilter, DepartmentWhereInput> | null
    roadmaps?: RoadmapListRelationFilter
  }, "id" | "slug">

  export type CourseOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    type?: SortOrder
    departmentId?: SortOrderInput | SortOrder
    priorityJob?: SortOrder
    structure?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CourseCountOrderByAggregateInput
    _avg?: CourseAvgOrderByAggregateInput
    _max?: CourseMaxOrderByAggregateInput
    _min?: CourseMinOrderByAggregateInput
    _sum?: CourseSumOrderByAggregateInput
  }

  export type CourseScalarWhereWithAggregatesInput = {
    AND?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    OR?: CourseScalarWhereWithAggregatesInput[]
    NOT?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Course"> | number
    slug?: StringWithAggregatesFilter<"Course"> | string
    title?: StringWithAggregatesFilter<"Course"> | string
    description?: StringNullableWithAggregatesFilter<"Course"> | string | null
    type?: EnumCourseTypeWithAggregatesFilter<"Course"> | $Enums.CourseType
    departmentId?: IntNullableWithAggregatesFilter<"Course"> | number | null
    priorityJob?: StringNullableListFilter<"Course">
    structure?: JsonNullableWithAggregatesFilter<"Course">
    createdAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
  }

  export type RoadmapWhereInput = {
    AND?: RoadmapWhereInput | RoadmapWhereInput[]
    OR?: RoadmapWhereInput[]
    NOT?: RoadmapWhereInput | RoadmapWhereInput[]
    id?: IntFilter<"Roadmap"> | number
    slug?: StringFilter<"Roadmap"> | string
    title?: StringFilter<"Roadmap"> | string
    description?: StringNullableFilter<"Roadmap"> | string | null
    courseId?: IntNullableFilter<"Roadmap"> | number | null
    structure?: JsonNullableFilter<"Roadmap">
    createdAt?: DateTimeFilter<"Roadmap"> | Date | string
    updatedAt?: DateTimeFilter<"Roadmap"> | Date | string
    course?: XOR<CourseNullableRelationFilter, CourseWhereInput> | null
    nodes?: RoadmapNodeListRelationFilter
    edges?: RoadmapEdgeListRelationFilter
  }

  export type RoadmapOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    courseId?: SortOrderInput | SortOrder
    structure?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    course?: CourseOrderByWithRelationInput
    nodes?: RoadmapNodeOrderByRelationAggregateInput
    edges?: RoadmapEdgeOrderByRelationAggregateInput
  }

  export type RoadmapWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: RoadmapWhereInput | RoadmapWhereInput[]
    OR?: RoadmapWhereInput[]
    NOT?: RoadmapWhereInput | RoadmapWhereInput[]
    title?: StringFilter<"Roadmap"> | string
    description?: StringNullableFilter<"Roadmap"> | string | null
    courseId?: IntNullableFilter<"Roadmap"> | number | null
    structure?: JsonNullableFilter<"Roadmap">
    createdAt?: DateTimeFilter<"Roadmap"> | Date | string
    updatedAt?: DateTimeFilter<"Roadmap"> | Date | string
    course?: XOR<CourseNullableRelationFilter, CourseWhereInput> | null
    nodes?: RoadmapNodeListRelationFilter
    edges?: RoadmapEdgeListRelationFilter
  }, "id" | "slug">

  export type RoadmapOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    courseId?: SortOrderInput | SortOrder
    structure?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoadmapCountOrderByAggregateInput
    _avg?: RoadmapAvgOrderByAggregateInput
    _max?: RoadmapMaxOrderByAggregateInput
    _min?: RoadmapMinOrderByAggregateInput
    _sum?: RoadmapSumOrderByAggregateInput
  }

  export type RoadmapScalarWhereWithAggregatesInput = {
    AND?: RoadmapScalarWhereWithAggregatesInput | RoadmapScalarWhereWithAggregatesInput[]
    OR?: RoadmapScalarWhereWithAggregatesInput[]
    NOT?: RoadmapScalarWhereWithAggregatesInput | RoadmapScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Roadmap"> | number
    slug?: StringWithAggregatesFilter<"Roadmap"> | string
    title?: StringWithAggregatesFilter<"Roadmap"> | string
    description?: StringNullableWithAggregatesFilter<"Roadmap"> | string | null
    courseId?: IntNullableWithAggregatesFilter<"Roadmap"> | number | null
    structure?: JsonNullableWithAggregatesFilter<"Roadmap">
    createdAt?: DateTimeWithAggregatesFilter<"Roadmap"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Roadmap"> | Date | string
  }

  export type RoadmapNodeWhereInput = {
    AND?: RoadmapNodeWhereInput | RoadmapNodeWhereInput[]
    OR?: RoadmapNodeWhereInput[]
    NOT?: RoadmapNodeWhereInput | RoadmapNodeWhereInput[]
    id?: IntFilter<"RoadmapNode"> | number
    roadmapId?: IntFilter<"RoadmapNode"> | number
    nodeKey?: StringFilter<"RoadmapNode"> | string
    title?: StringFilter<"RoadmapNode"> | string
    summary?: StringNullableFilter<"RoadmapNode"> | string | null
    contentMd?: StringNullableFilter<"RoadmapNode"> | string | null
    isRequired?: BoolFilter<"RoadmapNode"> | boolean
    metadata?: JsonNullableFilter<"RoadmapNode">
    coords?: JsonNullableFilter<"RoadmapNode">
    createdAt?: DateTimeFilter<"RoadmapNode"> | Date | string
    updatedAt?: DateTimeFilter<"RoadmapNode"> | Date | string
    roadmap?: XOR<RoadmapRelationFilter, RoadmapWhereInput>
  }

  export type RoadmapNodeOrderByWithRelationInput = {
    id?: SortOrder
    roadmapId?: SortOrder
    nodeKey?: SortOrder
    title?: SortOrder
    summary?: SortOrderInput | SortOrder
    contentMd?: SortOrderInput | SortOrder
    isRequired?: SortOrder
    metadata?: SortOrderInput | SortOrder
    coords?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    roadmap?: RoadmapOrderByWithRelationInput
  }

  export type RoadmapNodeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    roadmapId_nodeKey?: RoadmapNodeRoadmapIdNodeKeyCompoundUniqueInput
    AND?: RoadmapNodeWhereInput | RoadmapNodeWhereInput[]
    OR?: RoadmapNodeWhereInput[]
    NOT?: RoadmapNodeWhereInput | RoadmapNodeWhereInput[]
    roadmapId?: IntFilter<"RoadmapNode"> | number
    nodeKey?: StringFilter<"RoadmapNode"> | string
    title?: StringFilter<"RoadmapNode"> | string
    summary?: StringNullableFilter<"RoadmapNode"> | string | null
    contentMd?: StringNullableFilter<"RoadmapNode"> | string | null
    isRequired?: BoolFilter<"RoadmapNode"> | boolean
    metadata?: JsonNullableFilter<"RoadmapNode">
    coords?: JsonNullableFilter<"RoadmapNode">
    createdAt?: DateTimeFilter<"RoadmapNode"> | Date | string
    updatedAt?: DateTimeFilter<"RoadmapNode"> | Date | string
    roadmap?: XOR<RoadmapRelationFilter, RoadmapWhereInput>
  }, "id" | "roadmapId_nodeKey">

  export type RoadmapNodeOrderByWithAggregationInput = {
    id?: SortOrder
    roadmapId?: SortOrder
    nodeKey?: SortOrder
    title?: SortOrder
    summary?: SortOrderInput | SortOrder
    contentMd?: SortOrderInput | SortOrder
    isRequired?: SortOrder
    metadata?: SortOrderInput | SortOrder
    coords?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoadmapNodeCountOrderByAggregateInput
    _avg?: RoadmapNodeAvgOrderByAggregateInput
    _max?: RoadmapNodeMaxOrderByAggregateInput
    _min?: RoadmapNodeMinOrderByAggregateInput
    _sum?: RoadmapNodeSumOrderByAggregateInput
  }

  export type RoadmapNodeScalarWhereWithAggregatesInput = {
    AND?: RoadmapNodeScalarWhereWithAggregatesInput | RoadmapNodeScalarWhereWithAggregatesInput[]
    OR?: RoadmapNodeScalarWhereWithAggregatesInput[]
    NOT?: RoadmapNodeScalarWhereWithAggregatesInput | RoadmapNodeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RoadmapNode"> | number
    roadmapId?: IntWithAggregatesFilter<"RoadmapNode"> | number
    nodeKey?: StringWithAggregatesFilter<"RoadmapNode"> | string
    title?: StringWithAggregatesFilter<"RoadmapNode"> | string
    summary?: StringNullableWithAggregatesFilter<"RoadmapNode"> | string | null
    contentMd?: StringNullableWithAggregatesFilter<"RoadmapNode"> | string | null
    isRequired?: BoolWithAggregatesFilter<"RoadmapNode"> | boolean
    metadata?: JsonNullableWithAggregatesFilter<"RoadmapNode">
    coords?: JsonNullableWithAggregatesFilter<"RoadmapNode">
    createdAt?: DateTimeWithAggregatesFilter<"RoadmapNode"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RoadmapNode"> | Date | string
  }

  export type RoadmapEdgeWhereInput = {
    AND?: RoadmapEdgeWhereInput | RoadmapEdgeWhereInput[]
    OR?: RoadmapEdgeWhereInput[]
    NOT?: RoadmapEdgeWhereInput | RoadmapEdgeWhereInput[]
    id?: IntFilter<"RoadmapEdge"> | number
    roadmapId?: IntFilter<"RoadmapEdge"> | number
    sourceKey?: StringFilter<"RoadmapEdge"> | string
    targetKey?: StringFilter<"RoadmapEdge"> | string
    createdAt?: DateTimeFilter<"RoadmapEdge"> | Date | string
    roadmap?: XOR<RoadmapRelationFilter, RoadmapWhereInput>
  }

  export type RoadmapEdgeOrderByWithRelationInput = {
    id?: SortOrder
    roadmapId?: SortOrder
    sourceKey?: SortOrder
    targetKey?: SortOrder
    createdAt?: SortOrder
    roadmap?: RoadmapOrderByWithRelationInput
  }

  export type RoadmapEdgeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RoadmapEdgeWhereInput | RoadmapEdgeWhereInput[]
    OR?: RoadmapEdgeWhereInput[]
    NOT?: RoadmapEdgeWhereInput | RoadmapEdgeWhereInput[]
    roadmapId?: IntFilter<"RoadmapEdge"> | number
    sourceKey?: StringFilter<"RoadmapEdge"> | string
    targetKey?: StringFilter<"RoadmapEdge"> | string
    createdAt?: DateTimeFilter<"RoadmapEdge"> | Date | string
    roadmap?: XOR<RoadmapRelationFilter, RoadmapWhereInput>
  }, "id">

  export type RoadmapEdgeOrderByWithAggregationInput = {
    id?: SortOrder
    roadmapId?: SortOrder
    sourceKey?: SortOrder
    targetKey?: SortOrder
    createdAt?: SortOrder
    _count?: RoadmapEdgeCountOrderByAggregateInput
    _avg?: RoadmapEdgeAvgOrderByAggregateInput
    _max?: RoadmapEdgeMaxOrderByAggregateInput
    _min?: RoadmapEdgeMinOrderByAggregateInput
    _sum?: RoadmapEdgeSumOrderByAggregateInput
  }

  export type RoadmapEdgeScalarWhereWithAggregatesInput = {
    AND?: RoadmapEdgeScalarWhereWithAggregatesInput | RoadmapEdgeScalarWhereWithAggregatesInput[]
    OR?: RoadmapEdgeScalarWhereWithAggregatesInput[]
    NOT?: RoadmapEdgeScalarWhereWithAggregatesInput | RoadmapEdgeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RoadmapEdge"> | number
    roadmapId?: IntWithAggregatesFilter<"RoadmapEdge"> | number
    sourceKey?: StringWithAggregatesFilter<"RoadmapEdge"> | string
    targetKey?: StringWithAggregatesFilter<"RoadmapEdge"> | string
    createdAt?: DateTimeWithAggregatesFilter<"RoadmapEdge"> | Date | string
  }

  export type DepartmentCreateInput = {
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    courses?: CourseCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedCreateInput = {
    id?: number
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    courses?: CourseUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentCreateManyInput = {
    id?: number
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DepartmentUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DepartmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseCreateInput = {
    slug: string
    title: string
    description?: string | null
    type: $Enums.CourseType
    priorityJob?: CourseCreatepriorityJobInput | string[]
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    department?: DepartmentCreateNestedOneWithoutCoursesInput
    roadmaps?: RoadmapCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateInput = {
    id?: number
    slug: string
    title: string
    description?: string | null
    type: $Enums.CourseType
    departmentId?: number | null
    priorityJob?: CourseCreatepriorityJobInput | string[]
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    roadmaps?: RoadmapUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType
    priorityJob?: CourseUpdatepriorityJobInput | string[]
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: DepartmentUpdateOneWithoutCoursesNestedInput
    roadmaps?: RoadmapUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType
    departmentId?: NullableIntFieldUpdateOperationsInput | number | null
    priorityJob?: CourseUpdatepriorityJobInput | string[]
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roadmaps?: RoadmapUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseCreateManyInput = {
    id?: number
    slug: string
    title: string
    description?: string | null
    type: $Enums.CourseType
    departmentId?: number | null
    priorityJob?: CourseCreatepriorityJobInput | string[]
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType
    priorityJob?: CourseUpdatepriorityJobInput | string[]
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType
    departmentId?: NullableIntFieldUpdateOperationsInput | number | null
    priorityJob?: CourseUpdatepriorityJobInput | string[]
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapCreateInput = {
    slug: string
    title: string
    description?: string | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    course?: CourseCreateNestedOneWithoutRoadmapsInput
    nodes?: RoadmapNodeCreateNestedManyWithoutRoadmapInput
    edges?: RoadmapEdgeCreateNestedManyWithoutRoadmapInput
  }

  export type RoadmapUncheckedCreateInput = {
    id?: number
    slug: string
    title: string
    description?: string | null
    courseId?: number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    nodes?: RoadmapNodeUncheckedCreateNestedManyWithoutRoadmapInput
    edges?: RoadmapEdgeUncheckedCreateNestedManyWithoutRoadmapInput
  }

  export type RoadmapUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneWithoutRoadmapsNestedInput
    nodes?: RoadmapNodeUpdateManyWithoutRoadmapNestedInput
    edges?: RoadmapEdgeUpdateManyWithoutRoadmapNestedInput
  }

  export type RoadmapUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    courseId?: NullableIntFieldUpdateOperationsInput | number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nodes?: RoadmapNodeUncheckedUpdateManyWithoutRoadmapNestedInput
    edges?: RoadmapEdgeUncheckedUpdateManyWithoutRoadmapNestedInput
  }

  export type RoadmapCreateManyInput = {
    id?: number
    slug: string
    title: string
    description?: string | null
    courseId?: number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoadmapUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    courseId?: NullableIntFieldUpdateOperationsInput | number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapNodeCreateInput = {
    nodeKey: string
    title: string
    summary?: string | null
    contentMd?: string | null
    isRequired?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    coords?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    roadmap: RoadmapCreateNestedOneWithoutNodesInput
  }

  export type RoadmapNodeUncheckedCreateInput = {
    id?: number
    roadmapId: number
    nodeKey: string
    title: string
    summary?: string | null
    contentMd?: string | null
    isRequired?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    coords?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoadmapNodeUpdateInput = {
    nodeKey?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    contentMd?: NullableStringFieldUpdateOperationsInput | string | null
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    coords?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roadmap?: RoadmapUpdateOneRequiredWithoutNodesNestedInput
  }

  export type RoadmapNodeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    roadmapId?: IntFieldUpdateOperationsInput | number
    nodeKey?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    contentMd?: NullableStringFieldUpdateOperationsInput | string | null
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    coords?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapNodeCreateManyInput = {
    id?: number
    roadmapId: number
    nodeKey: string
    title: string
    summary?: string | null
    contentMd?: string | null
    isRequired?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    coords?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoadmapNodeUpdateManyMutationInput = {
    nodeKey?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    contentMd?: NullableStringFieldUpdateOperationsInput | string | null
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    coords?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapNodeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    roadmapId?: IntFieldUpdateOperationsInput | number
    nodeKey?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    contentMd?: NullableStringFieldUpdateOperationsInput | string | null
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    coords?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapEdgeCreateInput = {
    sourceKey: string
    targetKey: string
    createdAt?: Date | string
    roadmap: RoadmapCreateNestedOneWithoutEdgesInput
  }

  export type RoadmapEdgeUncheckedCreateInput = {
    id?: number
    roadmapId: number
    sourceKey: string
    targetKey: string
    createdAt?: Date | string
  }

  export type RoadmapEdgeUpdateInput = {
    sourceKey?: StringFieldUpdateOperationsInput | string
    targetKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roadmap?: RoadmapUpdateOneRequiredWithoutEdgesNestedInput
  }

  export type RoadmapEdgeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    roadmapId?: IntFieldUpdateOperationsInput | number
    sourceKey?: StringFieldUpdateOperationsInput | string
    targetKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapEdgeCreateManyInput = {
    id?: number
    roadmapId: number
    sourceKey: string
    targetKey: string
    createdAt?: Date | string
  }

  export type RoadmapEdgeUpdateManyMutationInput = {
    sourceKey?: StringFieldUpdateOperationsInput | string
    targetKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapEdgeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    roadmapId?: IntFieldUpdateOperationsInput | number
    sourceKey?: StringFieldUpdateOperationsInput | string
    targetKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type CourseListRelationFilter = {
    every?: CourseWhereInput
    some?: CourseWhereInput
    none?: CourseWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CourseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DepartmentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DepartmentAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DepartmentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DepartmentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DepartmentSumOrderByAggregateInput = {
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

  export type EnumCourseTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CourseType | EnumCourseTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CourseType[] | ListEnumCourseTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CourseType[] | ListEnumCourseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCourseTypeFilter<$PrismaModel> | $Enums.CourseType
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
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

  export type DepartmentNullableRelationFilter = {
    is?: DepartmentWhereInput | null
    isNot?: DepartmentWhereInput | null
  }

  export type RoadmapListRelationFilter = {
    every?: RoadmapWhereInput
    some?: RoadmapWhereInput
    none?: RoadmapWhereInput
  }

  export type RoadmapOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    departmentId?: SortOrder
    priorityJob?: SortOrder
    structure?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseAvgOrderByAggregateInput = {
    id?: SortOrder
    departmentId?: SortOrder
  }

  export type CourseMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    departmentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    departmentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseSumOrderByAggregateInput = {
    id?: SortOrder
    departmentId?: SortOrder
  }

  export type EnumCourseTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CourseType | EnumCourseTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CourseType[] | ListEnumCourseTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CourseType[] | ListEnumCourseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCourseTypeWithAggregatesFilter<$PrismaModel> | $Enums.CourseType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCourseTypeFilter<$PrismaModel>
    _max?: NestedEnumCourseTypeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type CourseNullableRelationFilter = {
    is?: CourseWhereInput | null
    isNot?: CourseWhereInput | null
  }

  export type RoadmapNodeListRelationFilter = {
    every?: RoadmapNodeWhereInput
    some?: RoadmapNodeWhereInput
    none?: RoadmapNodeWhereInput
  }

  export type RoadmapEdgeListRelationFilter = {
    every?: RoadmapEdgeWhereInput
    some?: RoadmapEdgeWhereInput
    none?: RoadmapEdgeWhereInput
  }

  export type RoadmapNodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoadmapEdgeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoadmapCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    courseId?: SortOrder
    structure?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoadmapAvgOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
  }

  export type RoadmapMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    courseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoadmapMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    courseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoadmapSumOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type RoadmapRelationFilter = {
    is?: RoadmapWhereInput
    isNot?: RoadmapWhereInput
  }

  export type RoadmapNodeRoadmapIdNodeKeyCompoundUniqueInput = {
    roadmapId: number
    nodeKey: string
  }

  export type RoadmapNodeCountOrderByAggregateInput = {
    id?: SortOrder
    roadmapId?: SortOrder
    nodeKey?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    contentMd?: SortOrder
    isRequired?: SortOrder
    metadata?: SortOrder
    coords?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoadmapNodeAvgOrderByAggregateInput = {
    id?: SortOrder
    roadmapId?: SortOrder
  }

  export type RoadmapNodeMaxOrderByAggregateInput = {
    id?: SortOrder
    roadmapId?: SortOrder
    nodeKey?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    contentMd?: SortOrder
    isRequired?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoadmapNodeMinOrderByAggregateInput = {
    id?: SortOrder
    roadmapId?: SortOrder
    nodeKey?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    contentMd?: SortOrder
    isRequired?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoadmapNodeSumOrderByAggregateInput = {
    id?: SortOrder
    roadmapId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type RoadmapEdgeCountOrderByAggregateInput = {
    id?: SortOrder
    roadmapId?: SortOrder
    sourceKey?: SortOrder
    targetKey?: SortOrder
    createdAt?: SortOrder
  }

  export type RoadmapEdgeAvgOrderByAggregateInput = {
    id?: SortOrder
    roadmapId?: SortOrder
  }

  export type RoadmapEdgeMaxOrderByAggregateInput = {
    id?: SortOrder
    roadmapId?: SortOrder
    sourceKey?: SortOrder
    targetKey?: SortOrder
    createdAt?: SortOrder
  }

  export type RoadmapEdgeMinOrderByAggregateInput = {
    id?: SortOrder
    roadmapId?: SortOrder
    sourceKey?: SortOrder
    targetKey?: SortOrder
    createdAt?: SortOrder
  }

  export type RoadmapEdgeSumOrderByAggregateInput = {
    id?: SortOrder
    roadmapId?: SortOrder
  }

  export type CourseCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<CourseCreateWithoutDepartmentInput, CourseUncheckedCreateWithoutDepartmentInput> | CourseCreateWithoutDepartmentInput[] | CourseUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutDepartmentInput | CourseCreateOrConnectWithoutDepartmentInput[]
    createMany?: CourseCreateManyDepartmentInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type CourseUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<CourseCreateWithoutDepartmentInput, CourseUncheckedCreateWithoutDepartmentInput> | CourseCreateWithoutDepartmentInput[] | CourseUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutDepartmentInput | CourseCreateOrConnectWithoutDepartmentInput[]
    createMany?: CourseCreateManyDepartmentInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
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

  export type CourseUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<CourseCreateWithoutDepartmentInput, CourseUncheckedCreateWithoutDepartmentInput> | CourseCreateWithoutDepartmentInput[] | CourseUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutDepartmentInput | CourseCreateOrConnectWithoutDepartmentInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutDepartmentInput | CourseUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: CourseCreateManyDepartmentInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutDepartmentInput | CourseUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutDepartmentInput | CourseUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CourseUncheckedUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<CourseCreateWithoutDepartmentInput, CourseUncheckedCreateWithoutDepartmentInput> | CourseCreateWithoutDepartmentInput[] | CourseUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutDepartmentInput | CourseCreateOrConnectWithoutDepartmentInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutDepartmentInput | CourseUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: CourseCreateManyDepartmentInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutDepartmentInput | CourseUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutDepartmentInput | CourseUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type CourseCreatepriorityJobInput = {
    set: string[]
  }

  export type DepartmentCreateNestedOneWithoutCoursesInput = {
    create?: XOR<DepartmentCreateWithoutCoursesInput, DepartmentUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutCoursesInput
    connect?: DepartmentWhereUniqueInput
  }

  export type RoadmapCreateNestedManyWithoutCourseInput = {
    create?: XOR<RoadmapCreateWithoutCourseInput, RoadmapUncheckedCreateWithoutCourseInput> | RoadmapCreateWithoutCourseInput[] | RoadmapUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: RoadmapCreateOrConnectWithoutCourseInput | RoadmapCreateOrConnectWithoutCourseInput[]
    createMany?: RoadmapCreateManyCourseInputEnvelope
    connect?: RoadmapWhereUniqueInput | RoadmapWhereUniqueInput[]
  }

  export type RoadmapUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<RoadmapCreateWithoutCourseInput, RoadmapUncheckedCreateWithoutCourseInput> | RoadmapCreateWithoutCourseInput[] | RoadmapUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: RoadmapCreateOrConnectWithoutCourseInput | RoadmapCreateOrConnectWithoutCourseInput[]
    createMany?: RoadmapCreateManyCourseInputEnvelope
    connect?: RoadmapWhereUniqueInput | RoadmapWhereUniqueInput[]
  }

  export type EnumCourseTypeFieldUpdateOperationsInput = {
    set?: $Enums.CourseType
  }

  export type CourseUpdatepriorityJobInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DepartmentUpdateOneWithoutCoursesNestedInput = {
    create?: XOR<DepartmentCreateWithoutCoursesInput, DepartmentUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutCoursesInput
    upsert?: DepartmentUpsertWithoutCoursesInput
    disconnect?: DepartmentWhereInput | boolean
    delete?: DepartmentWhereInput | boolean
    connect?: DepartmentWhereUniqueInput
    update?: XOR<XOR<DepartmentUpdateToOneWithWhereWithoutCoursesInput, DepartmentUpdateWithoutCoursesInput>, DepartmentUncheckedUpdateWithoutCoursesInput>
  }

  export type RoadmapUpdateManyWithoutCourseNestedInput = {
    create?: XOR<RoadmapCreateWithoutCourseInput, RoadmapUncheckedCreateWithoutCourseInput> | RoadmapCreateWithoutCourseInput[] | RoadmapUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: RoadmapCreateOrConnectWithoutCourseInput | RoadmapCreateOrConnectWithoutCourseInput[]
    upsert?: RoadmapUpsertWithWhereUniqueWithoutCourseInput | RoadmapUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: RoadmapCreateManyCourseInputEnvelope
    set?: RoadmapWhereUniqueInput | RoadmapWhereUniqueInput[]
    disconnect?: RoadmapWhereUniqueInput | RoadmapWhereUniqueInput[]
    delete?: RoadmapWhereUniqueInput | RoadmapWhereUniqueInput[]
    connect?: RoadmapWhereUniqueInput | RoadmapWhereUniqueInput[]
    update?: RoadmapUpdateWithWhereUniqueWithoutCourseInput | RoadmapUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: RoadmapUpdateManyWithWhereWithoutCourseInput | RoadmapUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: RoadmapScalarWhereInput | RoadmapScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RoadmapUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<RoadmapCreateWithoutCourseInput, RoadmapUncheckedCreateWithoutCourseInput> | RoadmapCreateWithoutCourseInput[] | RoadmapUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: RoadmapCreateOrConnectWithoutCourseInput | RoadmapCreateOrConnectWithoutCourseInput[]
    upsert?: RoadmapUpsertWithWhereUniqueWithoutCourseInput | RoadmapUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: RoadmapCreateManyCourseInputEnvelope
    set?: RoadmapWhereUniqueInput | RoadmapWhereUniqueInput[]
    disconnect?: RoadmapWhereUniqueInput | RoadmapWhereUniqueInput[]
    delete?: RoadmapWhereUniqueInput | RoadmapWhereUniqueInput[]
    connect?: RoadmapWhereUniqueInput | RoadmapWhereUniqueInput[]
    update?: RoadmapUpdateWithWhereUniqueWithoutCourseInput | RoadmapUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: RoadmapUpdateManyWithWhereWithoutCourseInput | RoadmapUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: RoadmapScalarWhereInput | RoadmapScalarWhereInput[]
  }

  export type CourseCreateNestedOneWithoutRoadmapsInput = {
    create?: XOR<CourseCreateWithoutRoadmapsInput, CourseUncheckedCreateWithoutRoadmapsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutRoadmapsInput
    connect?: CourseWhereUniqueInput
  }

  export type RoadmapNodeCreateNestedManyWithoutRoadmapInput = {
    create?: XOR<RoadmapNodeCreateWithoutRoadmapInput, RoadmapNodeUncheckedCreateWithoutRoadmapInput> | RoadmapNodeCreateWithoutRoadmapInput[] | RoadmapNodeUncheckedCreateWithoutRoadmapInput[]
    connectOrCreate?: RoadmapNodeCreateOrConnectWithoutRoadmapInput | RoadmapNodeCreateOrConnectWithoutRoadmapInput[]
    createMany?: RoadmapNodeCreateManyRoadmapInputEnvelope
    connect?: RoadmapNodeWhereUniqueInput | RoadmapNodeWhereUniqueInput[]
  }

  export type RoadmapEdgeCreateNestedManyWithoutRoadmapInput = {
    create?: XOR<RoadmapEdgeCreateWithoutRoadmapInput, RoadmapEdgeUncheckedCreateWithoutRoadmapInput> | RoadmapEdgeCreateWithoutRoadmapInput[] | RoadmapEdgeUncheckedCreateWithoutRoadmapInput[]
    connectOrCreate?: RoadmapEdgeCreateOrConnectWithoutRoadmapInput | RoadmapEdgeCreateOrConnectWithoutRoadmapInput[]
    createMany?: RoadmapEdgeCreateManyRoadmapInputEnvelope
    connect?: RoadmapEdgeWhereUniqueInput | RoadmapEdgeWhereUniqueInput[]
  }

  export type RoadmapNodeUncheckedCreateNestedManyWithoutRoadmapInput = {
    create?: XOR<RoadmapNodeCreateWithoutRoadmapInput, RoadmapNodeUncheckedCreateWithoutRoadmapInput> | RoadmapNodeCreateWithoutRoadmapInput[] | RoadmapNodeUncheckedCreateWithoutRoadmapInput[]
    connectOrCreate?: RoadmapNodeCreateOrConnectWithoutRoadmapInput | RoadmapNodeCreateOrConnectWithoutRoadmapInput[]
    createMany?: RoadmapNodeCreateManyRoadmapInputEnvelope
    connect?: RoadmapNodeWhereUniqueInput | RoadmapNodeWhereUniqueInput[]
  }

  export type RoadmapEdgeUncheckedCreateNestedManyWithoutRoadmapInput = {
    create?: XOR<RoadmapEdgeCreateWithoutRoadmapInput, RoadmapEdgeUncheckedCreateWithoutRoadmapInput> | RoadmapEdgeCreateWithoutRoadmapInput[] | RoadmapEdgeUncheckedCreateWithoutRoadmapInput[]
    connectOrCreate?: RoadmapEdgeCreateOrConnectWithoutRoadmapInput | RoadmapEdgeCreateOrConnectWithoutRoadmapInput[]
    createMany?: RoadmapEdgeCreateManyRoadmapInputEnvelope
    connect?: RoadmapEdgeWhereUniqueInput | RoadmapEdgeWhereUniqueInput[]
  }

  export type CourseUpdateOneWithoutRoadmapsNestedInput = {
    create?: XOR<CourseCreateWithoutRoadmapsInput, CourseUncheckedCreateWithoutRoadmapsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutRoadmapsInput
    upsert?: CourseUpsertWithoutRoadmapsInput
    disconnect?: CourseWhereInput | boolean
    delete?: CourseWhereInput | boolean
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutRoadmapsInput, CourseUpdateWithoutRoadmapsInput>, CourseUncheckedUpdateWithoutRoadmapsInput>
  }

  export type RoadmapNodeUpdateManyWithoutRoadmapNestedInput = {
    create?: XOR<RoadmapNodeCreateWithoutRoadmapInput, RoadmapNodeUncheckedCreateWithoutRoadmapInput> | RoadmapNodeCreateWithoutRoadmapInput[] | RoadmapNodeUncheckedCreateWithoutRoadmapInput[]
    connectOrCreate?: RoadmapNodeCreateOrConnectWithoutRoadmapInput | RoadmapNodeCreateOrConnectWithoutRoadmapInput[]
    upsert?: RoadmapNodeUpsertWithWhereUniqueWithoutRoadmapInput | RoadmapNodeUpsertWithWhereUniqueWithoutRoadmapInput[]
    createMany?: RoadmapNodeCreateManyRoadmapInputEnvelope
    set?: RoadmapNodeWhereUniqueInput | RoadmapNodeWhereUniqueInput[]
    disconnect?: RoadmapNodeWhereUniqueInput | RoadmapNodeWhereUniqueInput[]
    delete?: RoadmapNodeWhereUniqueInput | RoadmapNodeWhereUniqueInput[]
    connect?: RoadmapNodeWhereUniqueInput | RoadmapNodeWhereUniqueInput[]
    update?: RoadmapNodeUpdateWithWhereUniqueWithoutRoadmapInput | RoadmapNodeUpdateWithWhereUniqueWithoutRoadmapInput[]
    updateMany?: RoadmapNodeUpdateManyWithWhereWithoutRoadmapInput | RoadmapNodeUpdateManyWithWhereWithoutRoadmapInput[]
    deleteMany?: RoadmapNodeScalarWhereInput | RoadmapNodeScalarWhereInput[]
  }

  export type RoadmapEdgeUpdateManyWithoutRoadmapNestedInput = {
    create?: XOR<RoadmapEdgeCreateWithoutRoadmapInput, RoadmapEdgeUncheckedCreateWithoutRoadmapInput> | RoadmapEdgeCreateWithoutRoadmapInput[] | RoadmapEdgeUncheckedCreateWithoutRoadmapInput[]
    connectOrCreate?: RoadmapEdgeCreateOrConnectWithoutRoadmapInput | RoadmapEdgeCreateOrConnectWithoutRoadmapInput[]
    upsert?: RoadmapEdgeUpsertWithWhereUniqueWithoutRoadmapInput | RoadmapEdgeUpsertWithWhereUniqueWithoutRoadmapInput[]
    createMany?: RoadmapEdgeCreateManyRoadmapInputEnvelope
    set?: RoadmapEdgeWhereUniqueInput | RoadmapEdgeWhereUniqueInput[]
    disconnect?: RoadmapEdgeWhereUniqueInput | RoadmapEdgeWhereUniqueInput[]
    delete?: RoadmapEdgeWhereUniqueInput | RoadmapEdgeWhereUniqueInput[]
    connect?: RoadmapEdgeWhereUniqueInput | RoadmapEdgeWhereUniqueInput[]
    update?: RoadmapEdgeUpdateWithWhereUniqueWithoutRoadmapInput | RoadmapEdgeUpdateWithWhereUniqueWithoutRoadmapInput[]
    updateMany?: RoadmapEdgeUpdateManyWithWhereWithoutRoadmapInput | RoadmapEdgeUpdateManyWithWhereWithoutRoadmapInput[]
    deleteMany?: RoadmapEdgeScalarWhereInput | RoadmapEdgeScalarWhereInput[]
  }

  export type RoadmapNodeUncheckedUpdateManyWithoutRoadmapNestedInput = {
    create?: XOR<RoadmapNodeCreateWithoutRoadmapInput, RoadmapNodeUncheckedCreateWithoutRoadmapInput> | RoadmapNodeCreateWithoutRoadmapInput[] | RoadmapNodeUncheckedCreateWithoutRoadmapInput[]
    connectOrCreate?: RoadmapNodeCreateOrConnectWithoutRoadmapInput | RoadmapNodeCreateOrConnectWithoutRoadmapInput[]
    upsert?: RoadmapNodeUpsertWithWhereUniqueWithoutRoadmapInput | RoadmapNodeUpsertWithWhereUniqueWithoutRoadmapInput[]
    createMany?: RoadmapNodeCreateManyRoadmapInputEnvelope
    set?: RoadmapNodeWhereUniqueInput | RoadmapNodeWhereUniqueInput[]
    disconnect?: RoadmapNodeWhereUniqueInput | RoadmapNodeWhereUniqueInput[]
    delete?: RoadmapNodeWhereUniqueInput | RoadmapNodeWhereUniqueInput[]
    connect?: RoadmapNodeWhereUniqueInput | RoadmapNodeWhereUniqueInput[]
    update?: RoadmapNodeUpdateWithWhereUniqueWithoutRoadmapInput | RoadmapNodeUpdateWithWhereUniqueWithoutRoadmapInput[]
    updateMany?: RoadmapNodeUpdateManyWithWhereWithoutRoadmapInput | RoadmapNodeUpdateManyWithWhereWithoutRoadmapInput[]
    deleteMany?: RoadmapNodeScalarWhereInput | RoadmapNodeScalarWhereInput[]
  }

  export type RoadmapEdgeUncheckedUpdateManyWithoutRoadmapNestedInput = {
    create?: XOR<RoadmapEdgeCreateWithoutRoadmapInput, RoadmapEdgeUncheckedCreateWithoutRoadmapInput> | RoadmapEdgeCreateWithoutRoadmapInput[] | RoadmapEdgeUncheckedCreateWithoutRoadmapInput[]
    connectOrCreate?: RoadmapEdgeCreateOrConnectWithoutRoadmapInput | RoadmapEdgeCreateOrConnectWithoutRoadmapInput[]
    upsert?: RoadmapEdgeUpsertWithWhereUniqueWithoutRoadmapInput | RoadmapEdgeUpsertWithWhereUniqueWithoutRoadmapInput[]
    createMany?: RoadmapEdgeCreateManyRoadmapInputEnvelope
    set?: RoadmapEdgeWhereUniqueInput | RoadmapEdgeWhereUniqueInput[]
    disconnect?: RoadmapEdgeWhereUniqueInput | RoadmapEdgeWhereUniqueInput[]
    delete?: RoadmapEdgeWhereUniqueInput | RoadmapEdgeWhereUniqueInput[]
    connect?: RoadmapEdgeWhereUniqueInput | RoadmapEdgeWhereUniqueInput[]
    update?: RoadmapEdgeUpdateWithWhereUniqueWithoutRoadmapInput | RoadmapEdgeUpdateWithWhereUniqueWithoutRoadmapInput[]
    updateMany?: RoadmapEdgeUpdateManyWithWhereWithoutRoadmapInput | RoadmapEdgeUpdateManyWithWhereWithoutRoadmapInput[]
    deleteMany?: RoadmapEdgeScalarWhereInput | RoadmapEdgeScalarWhereInput[]
  }

  export type RoadmapCreateNestedOneWithoutNodesInput = {
    create?: XOR<RoadmapCreateWithoutNodesInput, RoadmapUncheckedCreateWithoutNodesInput>
    connectOrCreate?: RoadmapCreateOrConnectWithoutNodesInput
    connect?: RoadmapWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type RoadmapUpdateOneRequiredWithoutNodesNestedInput = {
    create?: XOR<RoadmapCreateWithoutNodesInput, RoadmapUncheckedCreateWithoutNodesInput>
    connectOrCreate?: RoadmapCreateOrConnectWithoutNodesInput
    upsert?: RoadmapUpsertWithoutNodesInput
    connect?: RoadmapWhereUniqueInput
    update?: XOR<XOR<RoadmapUpdateToOneWithWhereWithoutNodesInput, RoadmapUpdateWithoutNodesInput>, RoadmapUncheckedUpdateWithoutNodesInput>
  }

  export type RoadmapCreateNestedOneWithoutEdgesInput = {
    create?: XOR<RoadmapCreateWithoutEdgesInput, RoadmapUncheckedCreateWithoutEdgesInput>
    connectOrCreate?: RoadmapCreateOrConnectWithoutEdgesInput
    connect?: RoadmapWhereUniqueInput
  }

  export type RoadmapUpdateOneRequiredWithoutEdgesNestedInput = {
    create?: XOR<RoadmapCreateWithoutEdgesInput, RoadmapUncheckedCreateWithoutEdgesInput>
    connectOrCreate?: RoadmapCreateOrConnectWithoutEdgesInput
    upsert?: RoadmapUpsertWithoutEdgesInput
    connect?: RoadmapWhereUniqueInput
    update?: XOR<XOR<RoadmapUpdateToOneWithWhereWithoutEdgesInput, RoadmapUpdateWithoutEdgesInput>, RoadmapUncheckedUpdateWithoutEdgesInput>
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

  export type NestedEnumCourseTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CourseType | EnumCourseTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CourseType[] | ListEnumCourseTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CourseType[] | ListEnumCourseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCourseTypeFilter<$PrismaModel> | $Enums.CourseType
  }

  export type NestedEnumCourseTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CourseType | EnumCourseTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CourseType[] | ListEnumCourseTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CourseType[] | ListEnumCourseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCourseTypeWithAggregatesFilter<$PrismaModel> | $Enums.CourseType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCourseTypeFilter<$PrismaModel>
    _max?: NestedEnumCourseTypeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type CourseCreateWithoutDepartmentInput = {
    slug: string
    title: string
    description?: string | null
    type: $Enums.CourseType
    priorityJob?: CourseCreatepriorityJobInput | string[]
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    roadmaps?: RoadmapCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutDepartmentInput = {
    id?: number
    slug: string
    title: string
    description?: string | null
    type: $Enums.CourseType
    priorityJob?: CourseCreatepriorityJobInput | string[]
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    roadmaps?: RoadmapUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutDepartmentInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutDepartmentInput, CourseUncheckedCreateWithoutDepartmentInput>
  }

  export type CourseCreateManyDepartmentInputEnvelope = {
    data: CourseCreateManyDepartmentInput | CourseCreateManyDepartmentInput[]
    skipDuplicates?: boolean
  }

  export type CourseUpsertWithWhereUniqueWithoutDepartmentInput = {
    where: CourseWhereUniqueInput
    update: XOR<CourseUpdateWithoutDepartmentInput, CourseUncheckedUpdateWithoutDepartmentInput>
    create: XOR<CourseCreateWithoutDepartmentInput, CourseUncheckedCreateWithoutDepartmentInput>
  }

  export type CourseUpdateWithWhereUniqueWithoutDepartmentInput = {
    where: CourseWhereUniqueInput
    data: XOR<CourseUpdateWithoutDepartmentInput, CourseUncheckedUpdateWithoutDepartmentInput>
  }

  export type CourseUpdateManyWithWhereWithoutDepartmentInput = {
    where: CourseScalarWhereInput
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyWithoutDepartmentInput>
  }

  export type CourseScalarWhereInput = {
    AND?: CourseScalarWhereInput | CourseScalarWhereInput[]
    OR?: CourseScalarWhereInput[]
    NOT?: CourseScalarWhereInput | CourseScalarWhereInput[]
    id?: IntFilter<"Course"> | number
    slug?: StringFilter<"Course"> | string
    title?: StringFilter<"Course"> | string
    description?: StringNullableFilter<"Course"> | string | null
    type?: EnumCourseTypeFilter<"Course"> | $Enums.CourseType
    departmentId?: IntNullableFilter<"Course"> | number | null
    priorityJob?: StringNullableListFilter<"Course">
    structure?: JsonNullableFilter<"Course">
    createdAt?: DateTimeFilter<"Course"> | Date | string
    updatedAt?: DateTimeFilter<"Course"> | Date | string
  }

  export type DepartmentCreateWithoutCoursesInput = {
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DepartmentUncheckedCreateWithoutCoursesInput = {
    id?: number
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DepartmentCreateOrConnectWithoutCoursesInput = {
    where: DepartmentWhereUniqueInput
    create: XOR<DepartmentCreateWithoutCoursesInput, DepartmentUncheckedCreateWithoutCoursesInput>
  }

  export type RoadmapCreateWithoutCourseInput = {
    slug: string
    title: string
    description?: string | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    nodes?: RoadmapNodeCreateNestedManyWithoutRoadmapInput
    edges?: RoadmapEdgeCreateNestedManyWithoutRoadmapInput
  }

  export type RoadmapUncheckedCreateWithoutCourseInput = {
    id?: number
    slug: string
    title: string
    description?: string | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    nodes?: RoadmapNodeUncheckedCreateNestedManyWithoutRoadmapInput
    edges?: RoadmapEdgeUncheckedCreateNestedManyWithoutRoadmapInput
  }

  export type RoadmapCreateOrConnectWithoutCourseInput = {
    where: RoadmapWhereUniqueInput
    create: XOR<RoadmapCreateWithoutCourseInput, RoadmapUncheckedCreateWithoutCourseInput>
  }

  export type RoadmapCreateManyCourseInputEnvelope = {
    data: RoadmapCreateManyCourseInput | RoadmapCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type DepartmentUpsertWithoutCoursesInput = {
    update: XOR<DepartmentUpdateWithoutCoursesInput, DepartmentUncheckedUpdateWithoutCoursesInput>
    create: XOR<DepartmentCreateWithoutCoursesInput, DepartmentUncheckedCreateWithoutCoursesInput>
    where?: DepartmentWhereInput
  }

  export type DepartmentUpdateToOneWithWhereWithoutCoursesInput = {
    where?: DepartmentWhereInput
    data: XOR<DepartmentUpdateWithoutCoursesInput, DepartmentUncheckedUpdateWithoutCoursesInput>
  }

  export type DepartmentUpdateWithoutCoursesInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DepartmentUncheckedUpdateWithoutCoursesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapUpsertWithWhereUniqueWithoutCourseInput = {
    where: RoadmapWhereUniqueInput
    update: XOR<RoadmapUpdateWithoutCourseInput, RoadmapUncheckedUpdateWithoutCourseInput>
    create: XOR<RoadmapCreateWithoutCourseInput, RoadmapUncheckedCreateWithoutCourseInput>
  }

  export type RoadmapUpdateWithWhereUniqueWithoutCourseInput = {
    where: RoadmapWhereUniqueInput
    data: XOR<RoadmapUpdateWithoutCourseInput, RoadmapUncheckedUpdateWithoutCourseInput>
  }

  export type RoadmapUpdateManyWithWhereWithoutCourseInput = {
    where: RoadmapScalarWhereInput
    data: XOR<RoadmapUpdateManyMutationInput, RoadmapUncheckedUpdateManyWithoutCourseInput>
  }

  export type RoadmapScalarWhereInput = {
    AND?: RoadmapScalarWhereInput | RoadmapScalarWhereInput[]
    OR?: RoadmapScalarWhereInput[]
    NOT?: RoadmapScalarWhereInput | RoadmapScalarWhereInput[]
    id?: IntFilter<"Roadmap"> | number
    slug?: StringFilter<"Roadmap"> | string
    title?: StringFilter<"Roadmap"> | string
    description?: StringNullableFilter<"Roadmap"> | string | null
    courseId?: IntNullableFilter<"Roadmap"> | number | null
    structure?: JsonNullableFilter<"Roadmap">
    createdAt?: DateTimeFilter<"Roadmap"> | Date | string
    updatedAt?: DateTimeFilter<"Roadmap"> | Date | string
  }

  export type CourseCreateWithoutRoadmapsInput = {
    slug: string
    title: string
    description?: string | null
    type: $Enums.CourseType
    priorityJob?: CourseCreatepriorityJobInput | string[]
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    department?: DepartmentCreateNestedOneWithoutCoursesInput
  }

  export type CourseUncheckedCreateWithoutRoadmapsInput = {
    id?: number
    slug: string
    title: string
    description?: string | null
    type: $Enums.CourseType
    departmentId?: number | null
    priorityJob?: CourseCreatepriorityJobInput | string[]
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseCreateOrConnectWithoutRoadmapsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutRoadmapsInput, CourseUncheckedCreateWithoutRoadmapsInput>
  }

  export type RoadmapNodeCreateWithoutRoadmapInput = {
    nodeKey: string
    title: string
    summary?: string | null
    contentMd?: string | null
    isRequired?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    coords?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoadmapNodeUncheckedCreateWithoutRoadmapInput = {
    id?: number
    nodeKey: string
    title: string
    summary?: string | null
    contentMd?: string | null
    isRequired?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    coords?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoadmapNodeCreateOrConnectWithoutRoadmapInput = {
    where: RoadmapNodeWhereUniqueInput
    create: XOR<RoadmapNodeCreateWithoutRoadmapInput, RoadmapNodeUncheckedCreateWithoutRoadmapInput>
  }

  export type RoadmapNodeCreateManyRoadmapInputEnvelope = {
    data: RoadmapNodeCreateManyRoadmapInput | RoadmapNodeCreateManyRoadmapInput[]
    skipDuplicates?: boolean
  }

  export type RoadmapEdgeCreateWithoutRoadmapInput = {
    sourceKey: string
    targetKey: string
    createdAt?: Date | string
  }

  export type RoadmapEdgeUncheckedCreateWithoutRoadmapInput = {
    id?: number
    sourceKey: string
    targetKey: string
    createdAt?: Date | string
  }

  export type RoadmapEdgeCreateOrConnectWithoutRoadmapInput = {
    where: RoadmapEdgeWhereUniqueInput
    create: XOR<RoadmapEdgeCreateWithoutRoadmapInput, RoadmapEdgeUncheckedCreateWithoutRoadmapInput>
  }

  export type RoadmapEdgeCreateManyRoadmapInputEnvelope = {
    data: RoadmapEdgeCreateManyRoadmapInput | RoadmapEdgeCreateManyRoadmapInput[]
    skipDuplicates?: boolean
  }

  export type CourseUpsertWithoutRoadmapsInput = {
    update: XOR<CourseUpdateWithoutRoadmapsInput, CourseUncheckedUpdateWithoutRoadmapsInput>
    create: XOR<CourseCreateWithoutRoadmapsInput, CourseUncheckedCreateWithoutRoadmapsInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutRoadmapsInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutRoadmapsInput, CourseUncheckedUpdateWithoutRoadmapsInput>
  }

  export type CourseUpdateWithoutRoadmapsInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType
    priorityJob?: CourseUpdatepriorityJobInput | string[]
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: DepartmentUpdateOneWithoutCoursesNestedInput
  }

  export type CourseUncheckedUpdateWithoutRoadmapsInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType
    departmentId?: NullableIntFieldUpdateOperationsInput | number | null
    priorityJob?: CourseUpdatepriorityJobInput | string[]
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapNodeUpsertWithWhereUniqueWithoutRoadmapInput = {
    where: RoadmapNodeWhereUniqueInput
    update: XOR<RoadmapNodeUpdateWithoutRoadmapInput, RoadmapNodeUncheckedUpdateWithoutRoadmapInput>
    create: XOR<RoadmapNodeCreateWithoutRoadmapInput, RoadmapNodeUncheckedCreateWithoutRoadmapInput>
  }

  export type RoadmapNodeUpdateWithWhereUniqueWithoutRoadmapInput = {
    where: RoadmapNodeWhereUniqueInput
    data: XOR<RoadmapNodeUpdateWithoutRoadmapInput, RoadmapNodeUncheckedUpdateWithoutRoadmapInput>
  }

  export type RoadmapNodeUpdateManyWithWhereWithoutRoadmapInput = {
    where: RoadmapNodeScalarWhereInput
    data: XOR<RoadmapNodeUpdateManyMutationInput, RoadmapNodeUncheckedUpdateManyWithoutRoadmapInput>
  }

  export type RoadmapNodeScalarWhereInput = {
    AND?: RoadmapNodeScalarWhereInput | RoadmapNodeScalarWhereInput[]
    OR?: RoadmapNodeScalarWhereInput[]
    NOT?: RoadmapNodeScalarWhereInput | RoadmapNodeScalarWhereInput[]
    id?: IntFilter<"RoadmapNode"> | number
    roadmapId?: IntFilter<"RoadmapNode"> | number
    nodeKey?: StringFilter<"RoadmapNode"> | string
    title?: StringFilter<"RoadmapNode"> | string
    summary?: StringNullableFilter<"RoadmapNode"> | string | null
    contentMd?: StringNullableFilter<"RoadmapNode"> | string | null
    isRequired?: BoolFilter<"RoadmapNode"> | boolean
    metadata?: JsonNullableFilter<"RoadmapNode">
    coords?: JsonNullableFilter<"RoadmapNode">
    createdAt?: DateTimeFilter<"RoadmapNode"> | Date | string
    updatedAt?: DateTimeFilter<"RoadmapNode"> | Date | string
  }

  export type RoadmapEdgeUpsertWithWhereUniqueWithoutRoadmapInput = {
    where: RoadmapEdgeWhereUniqueInput
    update: XOR<RoadmapEdgeUpdateWithoutRoadmapInput, RoadmapEdgeUncheckedUpdateWithoutRoadmapInput>
    create: XOR<RoadmapEdgeCreateWithoutRoadmapInput, RoadmapEdgeUncheckedCreateWithoutRoadmapInput>
  }

  export type RoadmapEdgeUpdateWithWhereUniqueWithoutRoadmapInput = {
    where: RoadmapEdgeWhereUniqueInput
    data: XOR<RoadmapEdgeUpdateWithoutRoadmapInput, RoadmapEdgeUncheckedUpdateWithoutRoadmapInput>
  }

  export type RoadmapEdgeUpdateManyWithWhereWithoutRoadmapInput = {
    where: RoadmapEdgeScalarWhereInput
    data: XOR<RoadmapEdgeUpdateManyMutationInput, RoadmapEdgeUncheckedUpdateManyWithoutRoadmapInput>
  }

  export type RoadmapEdgeScalarWhereInput = {
    AND?: RoadmapEdgeScalarWhereInput | RoadmapEdgeScalarWhereInput[]
    OR?: RoadmapEdgeScalarWhereInput[]
    NOT?: RoadmapEdgeScalarWhereInput | RoadmapEdgeScalarWhereInput[]
    id?: IntFilter<"RoadmapEdge"> | number
    roadmapId?: IntFilter<"RoadmapEdge"> | number
    sourceKey?: StringFilter<"RoadmapEdge"> | string
    targetKey?: StringFilter<"RoadmapEdge"> | string
    createdAt?: DateTimeFilter<"RoadmapEdge"> | Date | string
  }

  export type RoadmapCreateWithoutNodesInput = {
    slug: string
    title: string
    description?: string | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    course?: CourseCreateNestedOneWithoutRoadmapsInput
    edges?: RoadmapEdgeCreateNestedManyWithoutRoadmapInput
  }

  export type RoadmapUncheckedCreateWithoutNodesInput = {
    id?: number
    slug: string
    title: string
    description?: string | null
    courseId?: number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    edges?: RoadmapEdgeUncheckedCreateNestedManyWithoutRoadmapInput
  }

  export type RoadmapCreateOrConnectWithoutNodesInput = {
    where: RoadmapWhereUniqueInput
    create: XOR<RoadmapCreateWithoutNodesInput, RoadmapUncheckedCreateWithoutNodesInput>
  }

  export type RoadmapUpsertWithoutNodesInput = {
    update: XOR<RoadmapUpdateWithoutNodesInput, RoadmapUncheckedUpdateWithoutNodesInput>
    create: XOR<RoadmapCreateWithoutNodesInput, RoadmapUncheckedCreateWithoutNodesInput>
    where?: RoadmapWhereInput
  }

  export type RoadmapUpdateToOneWithWhereWithoutNodesInput = {
    where?: RoadmapWhereInput
    data: XOR<RoadmapUpdateWithoutNodesInput, RoadmapUncheckedUpdateWithoutNodesInput>
  }

  export type RoadmapUpdateWithoutNodesInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneWithoutRoadmapsNestedInput
    edges?: RoadmapEdgeUpdateManyWithoutRoadmapNestedInput
  }

  export type RoadmapUncheckedUpdateWithoutNodesInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    courseId?: NullableIntFieldUpdateOperationsInput | number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    edges?: RoadmapEdgeUncheckedUpdateManyWithoutRoadmapNestedInput
  }

  export type RoadmapCreateWithoutEdgesInput = {
    slug: string
    title: string
    description?: string | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    course?: CourseCreateNestedOneWithoutRoadmapsInput
    nodes?: RoadmapNodeCreateNestedManyWithoutRoadmapInput
  }

  export type RoadmapUncheckedCreateWithoutEdgesInput = {
    id?: number
    slug: string
    title: string
    description?: string | null
    courseId?: number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    nodes?: RoadmapNodeUncheckedCreateNestedManyWithoutRoadmapInput
  }

  export type RoadmapCreateOrConnectWithoutEdgesInput = {
    where: RoadmapWhereUniqueInput
    create: XOR<RoadmapCreateWithoutEdgesInput, RoadmapUncheckedCreateWithoutEdgesInput>
  }

  export type RoadmapUpsertWithoutEdgesInput = {
    update: XOR<RoadmapUpdateWithoutEdgesInput, RoadmapUncheckedUpdateWithoutEdgesInput>
    create: XOR<RoadmapCreateWithoutEdgesInput, RoadmapUncheckedCreateWithoutEdgesInput>
    where?: RoadmapWhereInput
  }

  export type RoadmapUpdateToOneWithWhereWithoutEdgesInput = {
    where?: RoadmapWhereInput
    data: XOR<RoadmapUpdateWithoutEdgesInput, RoadmapUncheckedUpdateWithoutEdgesInput>
  }

  export type RoadmapUpdateWithoutEdgesInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneWithoutRoadmapsNestedInput
    nodes?: RoadmapNodeUpdateManyWithoutRoadmapNestedInput
  }

  export type RoadmapUncheckedUpdateWithoutEdgesInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    courseId?: NullableIntFieldUpdateOperationsInput | number | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nodes?: RoadmapNodeUncheckedUpdateManyWithoutRoadmapNestedInput
  }

  export type CourseCreateManyDepartmentInput = {
    id?: number
    slug: string
    title: string
    description?: string | null
    type: $Enums.CourseType
    priorityJob?: CourseCreatepriorityJobInput | string[]
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseUpdateWithoutDepartmentInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType
    priorityJob?: CourseUpdatepriorityJobInput | string[]
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roadmaps?: RoadmapUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutDepartmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType
    priorityJob?: CourseUpdatepriorityJobInput | string[]
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roadmaps?: RoadmapUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateManyWithoutDepartmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType
    priorityJob?: CourseUpdatepriorityJobInput | string[]
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapCreateManyCourseInput = {
    id?: number
    slug: string
    title: string
    description?: string | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoadmapUpdateWithoutCourseInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nodes?: RoadmapNodeUpdateManyWithoutRoadmapNestedInput
    edges?: RoadmapEdgeUpdateManyWithoutRoadmapNestedInput
  }

  export type RoadmapUncheckedUpdateWithoutCourseInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nodes?: RoadmapNodeUncheckedUpdateManyWithoutRoadmapNestedInput
    edges?: RoadmapEdgeUncheckedUpdateManyWithoutRoadmapNestedInput
  }

  export type RoadmapUncheckedUpdateManyWithoutCourseInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapNodeCreateManyRoadmapInput = {
    id?: number
    nodeKey: string
    title: string
    summary?: string | null
    contentMd?: string | null
    isRequired?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    coords?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoadmapEdgeCreateManyRoadmapInput = {
    id?: number
    sourceKey: string
    targetKey: string
    createdAt?: Date | string
  }

  export type RoadmapNodeUpdateWithoutRoadmapInput = {
    nodeKey?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    contentMd?: NullableStringFieldUpdateOperationsInput | string | null
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    coords?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapNodeUncheckedUpdateWithoutRoadmapInput = {
    id?: IntFieldUpdateOperationsInput | number
    nodeKey?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    contentMd?: NullableStringFieldUpdateOperationsInput | string | null
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    coords?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapNodeUncheckedUpdateManyWithoutRoadmapInput = {
    id?: IntFieldUpdateOperationsInput | number
    nodeKey?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    contentMd?: NullableStringFieldUpdateOperationsInput | string | null
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    coords?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapEdgeUpdateWithoutRoadmapInput = {
    sourceKey?: StringFieldUpdateOperationsInput | string
    targetKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapEdgeUncheckedUpdateWithoutRoadmapInput = {
    id?: IntFieldUpdateOperationsInput | number
    sourceKey?: StringFieldUpdateOperationsInput | string
    targetKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapEdgeUncheckedUpdateManyWithoutRoadmapInput = {
    id?: IntFieldUpdateOperationsInput | number
    sourceKey?: StringFieldUpdateOperationsInput | string
    targetKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use DepartmentCountOutputTypeDefaultArgs instead
     */
    export type DepartmentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DepartmentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CourseCountOutputTypeDefaultArgs instead
     */
    export type CourseCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CourseCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoadmapCountOutputTypeDefaultArgs instead
     */
    export type RoadmapCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoadmapCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DepartmentDefaultArgs instead
     */
    export type DepartmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DepartmentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CourseDefaultArgs instead
     */
    export type CourseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CourseDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoadmapDefaultArgs instead
     */
    export type RoadmapArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoadmapDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoadmapNodeDefaultArgs instead
     */
    export type RoadmapNodeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoadmapNodeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoadmapEdgeDefaultArgs instead
     */
    export type RoadmapEdgeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoadmapEdgeDefaultArgs<ExtArgs>

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