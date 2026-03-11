
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions

export type PrismaPromise<T> = $Public.PrismaPromise<T>


export type DepartmentPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Department"
  objects: {
    courses: CoursePayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: number
    name: string
    slug: string
    description: string | null
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["department"]>
  composites: {}
}

/**
 * Model Department
 * 
 */
export type Department = runtime.Types.DefaultSelection<DepartmentPayload>
export type CoursePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Course"
  objects: {
    department: DepartmentPayload<ExtArgs> | null
    roadmaps: RoadmapPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: number
    slug: string
    title: string
    description: string | null
    type: CourseType
    departmentId: number | null
    priorityJob: string[]
    structure: Prisma.JsonValue | null
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["course"]>
  composites: {}
}

/**
 * Model Course
 * 
 */
export type Course = runtime.Types.DefaultSelection<CoursePayload>
export type RoadmapPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Roadmap"
  objects: {
    course: CoursePayload<ExtArgs> | null
    nodes: RoadmapNodePayload<ExtArgs>[]
    edges: RoadmapEdgePayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
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

/**
 * Model Roadmap
 * 
 */
export type Roadmap = runtime.Types.DefaultSelection<RoadmapPayload>
export type RoadmapNodePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "RoadmapNode"
  objects: {
    roadmap: RoadmapPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
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

/**
 * Model RoadmapNode
 * 
 */
export type RoadmapNode = runtime.Types.DefaultSelection<RoadmapNodePayload>
export type RoadmapEdgePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "RoadmapEdge"
  objects: {
    roadmap: RoadmapPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: number
    roadmapId: number
    sourceKey: string
    targetKey: string
    createdAt: Date
  }, ExtArgs["result"]["roadmapEdge"]>
  composites: {}
}

/**
 * Model RoadmapEdge
 * 
 */
export type RoadmapEdge = runtime.Types.DefaultSelection<RoadmapEdgePayload>

/**
 * Enums
 */

export const CourseType: {
  BASIC: 'BASIC',
  JOB: 'JOB'
};

export type CourseType = (typeof CourseType)[keyof typeof CourseType]


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
   * // Fetch zero or more Departments
   * const departments = await prisma.department.findMany()
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
   * `prisma.department`: Exposes CRUD operations for the **Department** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Departments
    * const departments = await prisma.department.findMany()
    * ```
    */
  get department(): Prisma.DepartmentDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): Prisma.CourseDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.roadmap`: Exposes CRUD operations for the **Roadmap** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roadmaps
    * const roadmaps = await prisma.roadmap.findMany()
    * ```
    */
  get roadmap(): Prisma.RoadmapDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.roadmapNode`: Exposes CRUD operations for the **RoadmapNode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoadmapNodes
    * const roadmapNodes = await prisma.roadmapNode.findMany()
    * ```
    */
  get roadmapNode(): Prisma.RoadmapNodeDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.roadmapEdge`: Exposes CRUD operations for the **RoadmapEdge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoadmapEdges
    * const roadmapEdges = await prisma.roadmapEdge.findMany()
    * ```
    */
  get roadmapEdge(): Prisma.RoadmapEdgeDelegate<GlobalReject, ExtArgs>;
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
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
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


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.Args}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'department' | 'course' | 'roadmap' | 'roadmapNode' | 'roadmapEdge'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      Department: {
        payload: DepartmentPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.DepartmentFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<DepartmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DepartmentFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<DepartmentPayload>
          }
          findFirst: {
            args: Prisma.DepartmentFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<DepartmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DepartmentFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<DepartmentPayload>
          }
          findMany: {
            args: Prisma.DepartmentFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<DepartmentPayload>[]
          }
          create: {
            args: Prisma.DepartmentCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<DepartmentPayload>
          }
          createMany: {
            args: Prisma.DepartmentCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.DepartmentDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<DepartmentPayload>
          }
          update: {
            args: Prisma.DepartmentUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<DepartmentPayload>
          }
          deleteMany: {
            args: Prisma.DepartmentDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.DepartmentUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.DepartmentUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<DepartmentPayload>
          }
          aggregate: {
            args: Prisma.DepartmentAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateDepartment>
          }
          groupBy: {
            args: Prisma.DepartmentGroupByArgs<ExtArgs>,
            result: $Utils.Optional<DepartmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DepartmentCountArgs<ExtArgs>,
            result: $Utils.Optional<DepartmentCountAggregateOutputType> | number
          }
        }
      }
      Course: {
        payload: CoursePayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.CourseFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CoursePayload>
          }
          findFirst: {
            args: Prisma.CourseFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CoursePayload>
          }
          findMany: {
            args: Prisma.CourseFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CoursePayload>[]
          }
          create: {
            args: Prisma.CourseCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CoursePayload>
          }
          createMany: {
            args: Prisma.CourseCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.CourseDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CoursePayload>
          }
          update: {
            args: Prisma.CourseUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CoursePayload>
          }
          deleteMany: {
            args: Prisma.CourseDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.CourseUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.CourseUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CoursePayload>
          }
          aggregate: {
            args: Prisma.CourseAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateCourse>
          }
          groupBy: {
            args: Prisma.CourseGroupByArgs<ExtArgs>,
            result: $Utils.Optional<CourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseCountArgs<ExtArgs>,
            result: $Utils.Optional<CourseCountAggregateOutputType> | number
          }
        }
      }
      Roadmap: {
        payload: RoadmapPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.RoadmapFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoadmapFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapPayload>
          }
          findFirst: {
            args: Prisma.RoadmapFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoadmapFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapPayload>
          }
          findMany: {
            args: Prisma.RoadmapFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapPayload>[]
          }
          create: {
            args: Prisma.RoadmapCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapPayload>
          }
          createMany: {
            args: Prisma.RoadmapCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.RoadmapDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapPayload>
          }
          update: {
            args: Prisma.RoadmapUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapPayload>
          }
          deleteMany: {
            args: Prisma.RoadmapDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.RoadmapUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.RoadmapUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapPayload>
          }
          aggregate: {
            args: Prisma.RoadmapAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateRoadmap>
          }
          groupBy: {
            args: Prisma.RoadmapGroupByArgs<ExtArgs>,
            result: $Utils.Optional<RoadmapGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoadmapCountArgs<ExtArgs>,
            result: $Utils.Optional<RoadmapCountAggregateOutputType> | number
          }
        }
      }
      RoadmapNode: {
        payload: RoadmapNodePayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.RoadmapNodeFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapNodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoadmapNodeFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapNodePayload>
          }
          findFirst: {
            args: Prisma.RoadmapNodeFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapNodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoadmapNodeFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapNodePayload>
          }
          findMany: {
            args: Prisma.RoadmapNodeFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapNodePayload>[]
          }
          create: {
            args: Prisma.RoadmapNodeCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapNodePayload>
          }
          createMany: {
            args: Prisma.RoadmapNodeCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.RoadmapNodeDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapNodePayload>
          }
          update: {
            args: Prisma.RoadmapNodeUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapNodePayload>
          }
          deleteMany: {
            args: Prisma.RoadmapNodeDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.RoadmapNodeUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.RoadmapNodeUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapNodePayload>
          }
          aggregate: {
            args: Prisma.RoadmapNodeAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateRoadmapNode>
          }
          groupBy: {
            args: Prisma.RoadmapNodeGroupByArgs<ExtArgs>,
            result: $Utils.Optional<RoadmapNodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoadmapNodeCountArgs<ExtArgs>,
            result: $Utils.Optional<RoadmapNodeCountAggregateOutputType> | number
          }
        }
      }
      RoadmapEdge: {
        payload: RoadmapEdgePayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.RoadmapEdgeFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapEdgePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoadmapEdgeFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapEdgePayload>
          }
          findFirst: {
            args: Prisma.RoadmapEdgeFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapEdgePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoadmapEdgeFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapEdgePayload>
          }
          findMany: {
            args: Prisma.RoadmapEdgeFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapEdgePayload>[]
          }
          create: {
            args: Prisma.RoadmapEdgeCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapEdgePayload>
          }
          createMany: {
            args: Prisma.RoadmapEdgeCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.RoadmapEdgeDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapEdgePayload>
          }
          update: {
            args: Prisma.RoadmapEdgeUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapEdgePayload>
          }
          deleteMany: {
            args: Prisma.RoadmapEdgeDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.RoadmapEdgeUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.RoadmapEdgeUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RoadmapEdgePayload>
          }
          aggregate: {
            args: Prisma.RoadmapEdgeAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateRoadmapEdge>
          }
          groupBy: {
            args: Prisma.RoadmapEdgeGroupByArgs<ExtArgs>,
            result: $Utils.Optional<RoadmapEdgeGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoadmapEdgeCountArgs<ExtArgs>,
            result: $Utils.Optional<RoadmapEdgeCountAggregateOutputType> | number
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
   * Count Type DepartmentCountOutputType
   */


  export type DepartmentCountOutputType = {
    courses: number
  }

  export type DepartmentCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    courses?: boolean | DepartmentCountOutputTypeCountCoursesArgs
  }

  // Custom InputTypes

  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DepartmentCountOutputType
     */
    select?: DepartmentCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeCountCoursesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
  }



  /**
   * Count Type CourseCountOutputType
   */


  export type CourseCountOutputType = {
    roadmaps: number
  }

  export type CourseCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    roadmaps?: boolean | CourseCountOutputTypeCountRoadmapsArgs
  }

  // Custom InputTypes

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     */
    select?: CourseCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountRoadmapsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: RoadmapWhereInput
  }



  /**
   * Count Type RoadmapCountOutputType
   */


  export type RoadmapCountOutputType = {
    nodes: number
    edges: number
  }

  export type RoadmapCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    nodes?: boolean | RoadmapCountOutputTypeCountNodesArgs
    edges?: boolean | RoadmapCountOutputTypeCountEdgesArgs
  }

  // Custom InputTypes

  /**
   * RoadmapCountOutputType without action
   */
  export type RoadmapCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapCountOutputType
     */
    select?: RoadmapCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * RoadmapCountOutputType without action
   */
  export type RoadmapCountOutputTypeCountNodesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: RoadmapNodeWhereInput
  }


  /**
   * RoadmapCountOutputType without action
   */
  export type RoadmapCountOutputTypeCountEdgesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
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

  export type DepartmentAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Department to aggregate.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: Enumerable<DepartmentOrderByWithRelationInput>
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




  export type DepartmentGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: DepartmentWhereInput
    orderBy?: Enumerable<DepartmentOrderByWithAggregationInput>
    by: DepartmentScalarFieldEnum[]
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
      PickArray<DepartmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DepartmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
            : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
        }
      >
    >


  export type DepartmentSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    courses?: boolean | Department$coursesArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DepartmentInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    courses?: boolean | Department$coursesArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeArgs<ExtArgs>
  }


  type DepartmentGetPayload<S extends boolean | null | undefined | DepartmentArgs> = $Types.GetResult<DepartmentPayload, S>

  type DepartmentCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<DepartmentFindManyArgs, 'select' | 'include'> & {
      select?: DepartmentCountAggregateInputType | true
    }

  export interface DepartmentDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
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
    **/
    findUnique<T extends DepartmentFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DepartmentFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Department'> extends True ? Prisma__DepartmentClient<$Types.GetResult<DepartmentPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__DepartmentClient<$Types.GetResult<DepartmentPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Department that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {DepartmentFindUniqueOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DepartmentFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, DepartmentFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__DepartmentClient<$Types.GetResult<DepartmentPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

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
    **/
    findFirst<T extends DepartmentFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DepartmentFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Department'> extends True ? Prisma__DepartmentClient<$Types.GetResult<DepartmentPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__DepartmentClient<$Types.GetResult<DepartmentPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Department that matches the filter or
     * throw `NotFoundError` if no matches were found.
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
    **/
    findFirstOrThrow<T extends DepartmentFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, DepartmentFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__DepartmentClient<$Types.GetResult<DepartmentPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Departments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindManyArgs=} args - Arguments to filter and select certain fields only.
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
    **/
    findMany<T extends DepartmentFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DepartmentFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<DepartmentPayload<ExtArgs>, T, 'findMany', never>>

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
    **/
    create<T extends DepartmentCreateArgs<ExtArgs>>(
      args: SelectSubset<T, DepartmentCreateArgs<ExtArgs>>
    ): Prisma__DepartmentClient<$Types.GetResult<DepartmentPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Departments.
     *     @param {DepartmentCreateManyArgs} args - Arguments to create many Departments.
     *     @example
     *     // Create many Departments
     *     const department = await prisma.department.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DepartmentCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DepartmentCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    **/
    delete<T extends DepartmentDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, DepartmentDeleteArgs<ExtArgs>>
    ): Prisma__DepartmentClient<$Types.GetResult<DepartmentPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

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
    **/
    update<T extends DepartmentUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, DepartmentUpdateArgs<ExtArgs>>
    ): Prisma__DepartmentClient<$Types.GetResult<DepartmentPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

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
    **/
    deleteMany<T extends DepartmentDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DepartmentDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    **/
    updateMany<T extends DepartmentUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, DepartmentUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    **/
    upsert<T extends DepartmentUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, DepartmentUpsertArgs<ExtArgs>>
    ): Prisma__DepartmentClient<$Types.GetResult<DepartmentPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

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
    >(args: SubsetIntersection<T, DepartmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDepartmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Department.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DepartmentClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
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

    courses<T extends Department$coursesArgs<ExtArgs> = {}>(args?: Subset<T, Department$coursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<CoursePayload<ExtArgs>, T, 'findMany', never>| Null>;

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
   * Department base type for findUnique actions
   */
  export type DepartmentFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findUnique
   */
  export interface DepartmentFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends DepartmentFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Department findUniqueOrThrow
   */
  export type DepartmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }


  /**
   * Department base type for findFirst actions
   */
  export type DepartmentFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
    orderBy?: Enumerable<DepartmentOrderByWithRelationInput>
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
    distinct?: Enumerable<DepartmentScalarFieldEnum>
  }

  /**
   * Department findFirst
   */
  export interface DepartmentFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends DepartmentFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Department findFirstOrThrow
   */
  export type DepartmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
    orderBy?: Enumerable<DepartmentOrderByWithRelationInput>
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
    distinct?: Enumerable<DepartmentScalarFieldEnum>
  }


  /**
   * Department findMany
   */
  export type DepartmentFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
    orderBy?: Enumerable<DepartmentOrderByWithRelationInput>
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
    distinct?: Enumerable<DepartmentScalarFieldEnum>
  }


  /**
   * Department create
   */
  export type DepartmentCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type DepartmentCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Departments.
     */
    data: Enumerable<DepartmentCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Department update
   */
  export type DepartmentUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type DepartmentUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
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
  export type DepartmentUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type DepartmentDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type DepartmentDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Departments to delete
     */
    where?: DepartmentWhereInput
  }


  /**
   * Department.courses
   */
  export type Department$coursesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
    orderBy?: Enumerable<CourseOrderByWithRelationInput>
    cursor?: CourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<CourseScalarFieldEnum>
  }


  /**
   * Department without action
   */
  export type DepartmentArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
    type: CourseType | null
    departmentId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseMaxAggregateOutputType = {
    id: number | null
    slug: string | null
    title: string | null
    description: string | null
    type: CourseType | null
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

  export type CourseAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Course to aggregate.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: Enumerable<CourseOrderByWithRelationInput>
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




  export type CourseGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
    orderBy?: Enumerable<CourseOrderByWithAggregationInput>
    by: CourseScalarFieldEnum[]
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
    type: CourseType
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
      PickArray<CourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseGroupByOutputType[P]>
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
        }
      >
    >


  export type CourseSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    _count?: boolean | CourseCountOutputTypeArgs<ExtArgs>
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

  export type CourseInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    department?: boolean | Course$departmentArgs<ExtArgs>
    roadmaps?: boolean | Course$roadmapsArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeArgs<ExtArgs>
  }


  type CourseGetPayload<S extends boolean | null | undefined | CourseArgs> = $Types.GetResult<CoursePayload, S>

  type CourseCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<CourseFindManyArgs, 'select' | 'include'> & {
      select?: CourseCountAggregateInputType | true
    }

  export interface CourseDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
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
    **/
    findUnique<T extends CourseFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Course'> extends True ? Prisma__CourseClient<$Types.GetResult<CoursePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__CourseClient<$Types.GetResult<CoursePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Course that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__CourseClient<$Types.GetResult<CoursePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

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
    **/
    findFirst<T extends CourseFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Course'> extends True ? Prisma__CourseClient<$Types.GetResult<CoursePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__CourseClient<$Types.GetResult<CoursePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Course that matches the filter or
     * throw `NotFoundError` if no matches were found.
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
    **/
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__CourseClient<$Types.GetResult<CoursePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs=} args - Arguments to filter and select certain fields only.
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
    **/
    findMany<T extends CourseFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<CoursePayload<ExtArgs>, T, 'findMany', never>>

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
    **/
    create<T extends CourseCreateArgs<ExtArgs>>(
      args: SelectSubset<T, CourseCreateArgs<ExtArgs>>
    ): Prisma__CourseClient<$Types.GetResult<CoursePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Courses.
     *     @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     *     @example
     *     // Create many Courses
     *     const course = await prisma.course.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CourseCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    **/
    delete<T extends CourseDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>
    ): Prisma__CourseClient<$Types.GetResult<CoursePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

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
    **/
    update<T extends CourseUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>
    ): Prisma__CourseClient<$Types.GetResult<CoursePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

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
    **/
    deleteMany<T extends CourseDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    **/
    updateMany<T extends CourseUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    **/
    upsert<T extends CourseUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>
    ): Prisma__CourseClient<$Types.GetResult<CoursePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

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
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CourseClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
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

    department<T extends Course$departmentArgs<ExtArgs> = {}>(args?: Subset<T, Course$departmentArgs<ExtArgs>>): Prisma__DepartmentClient<$Types.GetResult<DepartmentPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    roadmaps<T extends Course$roadmapsArgs<ExtArgs> = {}>(args?: Subset<T, Course$roadmapsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<RoadmapPayload<ExtArgs>, T, 'findMany', never>| Null>;

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
   * Course base type for findUnique actions
   */
  export type CourseFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findUnique
   */
  export interface CourseFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends CourseFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Course findUniqueOrThrow
   */
  export type CourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }


  /**
   * Course base type for findFirst actions
   */
  export type CourseFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
    orderBy?: Enumerable<CourseOrderByWithRelationInput>
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
    distinct?: Enumerable<CourseScalarFieldEnum>
  }

  /**
   * Course findFirst
   */
  export interface CourseFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends CourseFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Course findFirstOrThrow
   */
  export type CourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
    orderBy?: Enumerable<CourseOrderByWithRelationInput>
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
    distinct?: Enumerable<CourseScalarFieldEnum>
  }


  /**
   * Course findMany
   */
  export type CourseFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
    orderBy?: Enumerable<CourseOrderByWithRelationInput>
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
    distinct?: Enumerable<CourseScalarFieldEnum>
  }


  /**
   * Course create
   */
  export type CourseCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type CourseCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Courses.
     */
    data: Enumerable<CourseCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Course update
   */
  export type CourseUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type CourseUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
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
  export type CourseUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type CourseDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type CourseDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Courses to delete
     */
    where?: CourseWhereInput
  }


  /**
   * Course.department
   */
  export type Course$departmentArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DepartmentInclude<ExtArgs> | null
    where?: DepartmentWhereInput
  }


  /**
   * Course.roadmaps
   */
  export type Course$roadmapsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RoadmapInclude<ExtArgs> | null
    where?: RoadmapWhereInput
    orderBy?: Enumerable<RoadmapOrderByWithRelationInput>
    cursor?: RoadmapWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<RoadmapScalarFieldEnum>
  }


  /**
   * Course without action
   */
  export type CourseArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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

  export type RoadmapAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roadmap to aggregate.
     */
    where?: RoadmapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roadmaps to fetch.
     */
    orderBy?: Enumerable<RoadmapOrderByWithRelationInput>
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




  export type RoadmapGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: RoadmapWhereInput
    orderBy?: Enumerable<RoadmapOrderByWithAggregationInput>
    by: RoadmapScalarFieldEnum[]
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
      PickArray<RoadmapGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoadmapGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoadmapGroupByOutputType[P]>
            : GetScalarType<T[P], RoadmapGroupByOutputType[P]>
        }
      >
    >


  export type RoadmapSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    _count?: boolean | RoadmapCountOutputTypeArgs<ExtArgs>
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

  export type RoadmapInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    course?: boolean | Roadmap$courseArgs<ExtArgs>
    nodes?: boolean | Roadmap$nodesArgs<ExtArgs>
    edges?: boolean | Roadmap$edgesArgs<ExtArgs>
    _count?: boolean | RoadmapCountOutputTypeArgs<ExtArgs>
  }


  type RoadmapGetPayload<S extends boolean | null | undefined | RoadmapArgs> = $Types.GetResult<RoadmapPayload, S>

  type RoadmapCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<RoadmapFindManyArgs, 'select' | 'include'> & {
      select?: RoadmapCountAggregateInputType | true
    }

  export interface RoadmapDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
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
    **/
    findUnique<T extends RoadmapFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, RoadmapFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Roadmap'> extends True ? Prisma__RoadmapClient<$Types.GetResult<RoadmapPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__RoadmapClient<$Types.GetResult<RoadmapPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Roadmap that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {RoadmapFindUniqueOrThrowArgs} args - Arguments to find a Roadmap
     * @example
     * // Get one Roadmap
     * const roadmap = await prisma.roadmap.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends RoadmapFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RoadmapFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__RoadmapClient<$Types.GetResult<RoadmapPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

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
    **/
    findFirst<T extends RoadmapFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, RoadmapFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Roadmap'> extends True ? Prisma__RoadmapClient<$Types.GetResult<RoadmapPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__RoadmapClient<$Types.GetResult<RoadmapPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Roadmap that matches the filter or
     * throw `NotFoundError` if no matches were found.
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
    **/
    findFirstOrThrow<T extends RoadmapFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RoadmapFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__RoadmapClient<$Types.GetResult<RoadmapPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Roadmaps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapFindManyArgs=} args - Arguments to filter and select certain fields only.
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
    **/
    findMany<T extends RoadmapFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RoadmapFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<RoadmapPayload<ExtArgs>, T, 'findMany', never>>

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
    **/
    create<T extends RoadmapCreateArgs<ExtArgs>>(
      args: SelectSubset<T, RoadmapCreateArgs<ExtArgs>>
    ): Prisma__RoadmapClient<$Types.GetResult<RoadmapPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Roadmaps.
     *     @param {RoadmapCreateManyArgs} args - Arguments to create many Roadmaps.
     *     @example
     *     // Create many Roadmaps
     *     const roadmap = await prisma.roadmap.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends RoadmapCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RoadmapCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    **/
    delete<T extends RoadmapDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, RoadmapDeleteArgs<ExtArgs>>
    ): Prisma__RoadmapClient<$Types.GetResult<RoadmapPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

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
    **/
    update<T extends RoadmapUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, RoadmapUpdateArgs<ExtArgs>>
    ): Prisma__RoadmapClient<$Types.GetResult<RoadmapPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

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
    **/
    deleteMany<T extends RoadmapDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RoadmapDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    **/
    updateMany<T extends RoadmapUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, RoadmapUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    **/
    upsert<T extends RoadmapUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, RoadmapUpsertArgs<ExtArgs>>
    ): Prisma__RoadmapClient<$Types.GetResult<RoadmapPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

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
    >(args: SubsetIntersection<T, RoadmapGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoadmapGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Roadmap.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__RoadmapClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
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

    course<T extends Roadmap$courseArgs<ExtArgs> = {}>(args?: Subset<T, Roadmap$courseArgs<ExtArgs>>): Prisma__CourseClient<$Types.GetResult<CoursePayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    nodes<T extends Roadmap$nodesArgs<ExtArgs> = {}>(args?: Subset<T, Roadmap$nodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<RoadmapNodePayload<ExtArgs>, T, 'findMany', never>| Null>;

    edges<T extends Roadmap$edgesArgs<ExtArgs> = {}>(args?: Subset<T, Roadmap$edgesArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<RoadmapEdgePayload<ExtArgs>, T, 'findMany', never>| Null>;

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
   * Roadmap base type for findUnique actions
   */
  export type RoadmapFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RoadmapInclude<ExtArgs> | null
    /**
     * Filter, which Roadmap to fetch.
     */
    where: RoadmapWhereUniqueInput
  }

  /**
   * Roadmap findUnique
   */
  export interface RoadmapFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends RoadmapFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Roadmap findUniqueOrThrow
   */
  export type RoadmapFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RoadmapInclude<ExtArgs> | null
    /**
     * Filter, which Roadmap to fetch.
     */
    where: RoadmapWhereUniqueInput
  }


  /**
   * Roadmap base type for findFirst actions
   */
  export type RoadmapFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
    orderBy?: Enumerable<RoadmapOrderByWithRelationInput>
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
    distinct?: Enumerable<RoadmapScalarFieldEnum>
  }

  /**
   * Roadmap findFirst
   */
  export interface RoadmapFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends RoadmapFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Roadmap findFirstOrThrow
   */
  export type RoadmapFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
    orderBy?: Enumerable<RoadmapOrderByWithRelationInput>
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
    distinct?: Enumerable<RoadmapScalarFieldEnum>
  }


  /**
   * Roadmap findMany
   */
  export type RoadmapFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
    orderBy?: Enumerable<RoadmapOrderByWithRelationInput>
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
    distinct?: Enumerable<RoadmapScalarFieldEnum>
  }


  /**
   * Roadmap create
   */
  export type RoadmapCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type RoadmapCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roadmaps.
     */
    data: Enumerable<RoadmapCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Roadmap update
   */
  export type RoadmapUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type RoadmapUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
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
  export type RoadmapUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type RoadmapDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type RoadmapDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roadmaps to delete
     */
    where?: RoadmapWhereInput
  }


  /**
   * Roadmap.course
   */
  export type Roadmap$courseArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
  }


  /**
   * Roadmap.nodes
   */
  export type Roadmap$nodesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RoadmapNodeInclude<ExtArgs> | null
    where?: RoadmapNodeWhereInput
    orderBy?: Enumerable<RoadmapNodeOrderByWithRelationInput>
    cursor?: RoadmapNodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<RoadmapNodeScalarFieldEnum>
  }


  /**
   * Roadmap.edges
   */
  export type Roadmap$edgesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RoadmapEdgeInclude<ExtArgs> | null
    where?: RoadmapEdgeWhereInput
    orderBy?: Enumerable<RoadmapEdgeOrderByWithRelationInput>
    cursor?: RoadmapEdgeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<RoadmapEdgeScalarFieldEnum>
  }


  /**
   * Roadmap without action
   */
  export type RoadmapArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roadmap
     */
    select?: RoadmapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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

  export type RoadmapNodeAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoadmapNode to aggregate.
     */
    where?: RoadmapNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoadmapNodes to fetch.
     */
    orderBy?: Enumerable<RoadmapNodeOrderByWithRelationInput>
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




  export type RoadmapNodeGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: RoadmapNodeWhereInput
    orderBy?: Enumerable<RoadmapNodeOrderByWithAggregationInput>
    by: RoadmapNodeScalarFieldEnum[]
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
      PickArray<RoadmapNodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoadmapNodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoadmapNodeGroupByOutputType[P]>
            : GetScalarType<T[P], RoadmapNodeGroupByOutputType[P]>
        }
      >
    >


  export type RoadmapNodeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    roadmap?: boolean | RoadmapArgs<ExtArgs>
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

  export type RoadmapNodeInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    roadmap?: boolean | RoadmapArgs<ExtArgs>
  }


  type RoadmapNodeGetPayload<S extends boolean | null | undefined | RoadmapNodeArgs> = $Types.GetResult<RoadmapNodePayload, S>

  type RoadmapNodeCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<RoadmapNodeFindManyArgs, 'select' | 'include'> & {
      select?: RoadmapNodeCountAggregateInputType | true
    }

  export interface RoadmapNodeDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
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
    **/
    findUnique<T extends RoadmapNodeFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, RoadmapNodeFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'RoadmapNode'> extends True ? Prisma__RoadmapNodeClient<$Types.GetResult<RoadmapNodePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__RoadmapNodeClient<$Types.GetResult<RoadmapNodePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one RoadmapNode that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {RoadmapNodeFindUniqueOrThrowArgs} args - Arguments to find a RoadmapNode
     * @example
     * // Get one RoadmapNode
     * const roadmapNode = await prisma.roadmapNode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends RoadmapNodeFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RoadmapNodeFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__RoadmapNodeClient<$Types.GetResult<RoadmapNodePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

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
    **/
    findFirst<T extends RoadmapNodeFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, RoadmapNodeFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'RoadmapNode'> extends True ? Prisma__RoadmapNodeClient<$Types.GetResult<RoadmapNodePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__RoadmapNodeClient<$Types.GetResult<RoadmapNodePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first RoadmapNode that matches the filter or
     * throw `NotFoundError` if no matches were found.
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
    **/
    findFirstOrThrow<T extends RoadmapNodeFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RoadmapNodeFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__RoadmapNodeClient<$Types.GetResult<RoadmapNodePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more RoadmapNodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapNodeFindManyArgs=} args - Arguments to filter and select certain fields only.
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
    **/
    findMany<T extends RoadmapNodeFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RoadmapNodeFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<RoadmapNodePayload<ExtArgs>, T, 'findMany', never>>

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
    **/
    create<T extends RoadmapNodeCreateArgs<ExtArgs>>(
      args: SelectSubset<T, RoadmapNodeCreateArgs<ExtArgs>>
    ): Prisma__RoadmapNodeClient<$Types.GetResult<RoadmapNodePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many RoadmapNodes.
     *     @param {RoadmapNodeCreateManyArgs} args - Arguments to create many RoadmapNodes.
     *     @example
     *     // Create many RoadmapNodes
     *     const roadmapNode = await prisma.roadmapNode.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends RoadmapNodeCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RoadmapNodeCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    **/
    delete<T extends RoadmapNodeDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, RoadmapNodeDeleteArgs<ExtArgs>>
    ): Prisma__RoadmapNodeClient<$Types.GetResult<RoadmapNodePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

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
    **/
    update<T extends RoadmapNodeUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, RoadmapNodeUpdateArgs<ExtArgs>>
    ): Prisma__RoadmapNodeClient<$Types.GetResult<RoadmapNodePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

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
    **/
    deleteMany<T extends RoadmapNodeDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RoadmapNodeDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    **/
    updateMany<T extends RoadmapNodeUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, RoadmapNodeUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    **/
    upsert<T extends RoadmapNodeUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, RoadmapNodeUpsertArgs<ExtArgs>>
    ): Prisma__RoadmapNodeClient<$Types.GetResult<RoadmapNodePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

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
    >(args: SubsetIntersection<T, RoadmapNodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoadmapNodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for RoadmapNode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__RoadmapNodeClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
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

    roadmap<T extends RoadmapArgs<ExtArgs> = {}>(args?: Subset<T, RoadmapArgs<ExtArgs>>): Prisma__RoadmapClient<$Types.GetResult<RoadmapPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

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
   * RoadmapNode base type for findUnique actions
   */
  export type RoadmapNodeFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RoadmapNodeInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapNode to fetch.
     */
    where: RoadmapNodeWhereUniqueInput
  }

  /**
   * RoadmapNode findUnique
   */
  export interface RoadmapNodeFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends RoadmapNodeFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * RoadmapNode findUniqueOrThrow
   */
  export type RoadmapNodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RoadmapNodeInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapNode to fetch.
     */
    where: RoadmapNodeWhereUniqueInput
  }


  /**
   * RoadmapNode base type for findFirst actions
   */
  export type RoadmapNodeFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
    orderBy?: Enumerable<RoadmapNodeOrderByWithRelationInput>
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
    distinct?: Enumerable<RoadmapNodeScalarFieldEnum>
  }

  /**
   * RoadmapNode findFirst
   */
  export interface RoadmapNodeFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends RoadmapNodeFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * RoadmapNode findFirstOrThrow
   */
  export type RoadmapNodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
    orderBy?: Enumerable<RoadmapNodeOrderByWithRelationInput>
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
    distinct?: Enumerable<RoadmapNodeScalarFieldEnum>
  }


  /**
   * RoadmapNode findMany
   */
  export type RoadmapNodeFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
    orderBy?: Enumerable<RoadmapNodeOrderByWithRelationInput>
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
    distinct?: Enumerable<RoadmapNodeScalarFieldEnum>
  }


  /**
   * RoadmapNode create
   */
  export type RoadmapNodeCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type RoadmapNodeCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoadmapNodes.
     */
    data: Enumerable<RoadmapNodeCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * RoadmapNode update
   */
  export type RoadmapNodeUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type RoadmapNodeUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
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
  export type RoadmapNodeUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type RoadmapNodeDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type RoadmapNodeDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoadmapNodes to delete
     */
    where?: RoadmapNodeWhereInput
  }


  /**
   * RoadmapNode without action
   */
  export type RoadmapNodeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapNode
     */
    select?: RoadmapNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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

  export type RoadmapEdgeAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoadmapEdge to aggregate.
     */
    where?: RoadmapEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoadmapEdges to fetch.
     */
    orderBy?: Enumerable<RoadmapEdgeOrderByWithRelationInput>
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




  export type RoadmapEdgeGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: RoadmapEdgeWhereInput
    orderBy?: Enumerable<RoadmapEdgeOrderByWithAggregationInput>
    by: RoadmapEdgeScalarFieldEnum[]
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
      PickArray<RoadmapEdgeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoadmapEdgeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoadmapEdgeGroupByOutputType[P]>
            : GetScalarType<T[P], RoadmapEdgeGroupByOutputType[P]>
        }
      >
    >


  export type RoadmapEdgeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roadmapId?: boolean
    sourceKey?: boolean
    targetKey?: boolean
    createdAt?: boolean
    roadmap?: boolean | RoadmapArgs<ExtArgs>
  }, ExtArgs["result"]["roadmapEdge"]>

  export type RoadmapEdgeSelectScalar = {
    id?: boolean
    roadmapId?: boolean
    sourceKey?: boolean
    targetKey?: boolean
    createdAt?: boolean
  }

  export type RoadmapEdgeInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    roadmap?: boolean | RoadmapArgs<ExtArgs>
  }


  type RoadmapEdgeGetPayload<S extends boolean | null | undefined | RoadmapEdgeArgs> = $Types.GetResult<RoadmapEdgePayload, S>

  type RoadmapEdgeCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<RoadmapEdgeFindManyArgs, 'select' | 'include'> & {
      select?: RoadmapEdgeCountAggregateInputType | true
    }

  export interface RoadmapEdgeDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
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
    **/
    findUnique<T extends RoadmapEdgeFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, RoadmapEdgeFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'RoadmapEdge'> extends True ? Prisma__RoadmapEdgeClient<$Types.GetResult<RoadmapEdgePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__RoadmapEdgeClient<$Types.GetResult<RoadmapEdgePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one RoadmapEdge that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {RoadmapEdgeFindUniqueOrThrowArgs} args - Arguments to find a RoadmapEdge
     * @example
     * // Get one RoadmapEdge
     * const roadmapEdge = await prisma.roadmapEdge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends RoadmapEdgeFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RoadmapEdgeFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__RoadmapEdgeClient<$Types.GetResult<RoadmapEdgePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

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
    **/
    findFirst<T extends RoadmapEdgeFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, RoadmapEdgeFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'RoadmapEdge'> extends True ? Prisma__RoadmapEdgeClient<$Types.GetResult<RoadmapEdgePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__RoadmapEdgeClient<$Types.GetResult<RoadmapEdgePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first RoadmapEdge that matches the filter or
     * throw `NotFoundError` if no matches were found.
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
    **/
    findFirstOrThrow<T extends RoadmapEdgeFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RoadmapEdgeFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__RoadmapEdgeClient<$Types.GetResult<RoadmapEdgePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more RoadmapEdges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapEdgeFindManyArgs=} args - Arguments to filter and select certain fields only.
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
    **/
    findMany<T extends RoadmapEdgeFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RoadmapEdgeFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<RoadmapEdgePayload<ExtArgs>, T, 'findMany', never>>

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
    **/
    create<T extends RoadmapEdgeCreateArgs<ExtArgs>>(
      args: SelectSubset<T, RoadmapEdgeCreateArgs<ExtArgs>>
    ): Prisma__RoadmapEdgeClient<$Types.GetResult<RoadmapEdgePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many RoadmapEdges.
     *     @param {RoadmapEdgeCreateManyArgs} args - Arguments to create many RoadmapEdges.
     *     @example
     *     // Create many RoadmapEdges
     *     const roadmapEdge = await prisma.roadmapEdge.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends RoadmapEdgeCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RoadmapEdgeCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    **/
    delete<T extends RoadmapEdgeDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, RoadmapEdgeDeleteArgs<ExtArgs>>
    ): Prisma__RoadmapEdgeClient<$Types.GetResult<RoadmapEdgePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

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
    **/
    update<T extends RoadmapEdgeUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, RoadmapEdgeUpdateArgs<ExtArgs>>
    ): Prisma__RoadmapEdgeClient<$Types.GetResult<RoadmapEdgePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

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
    **/
    deleteMany<T extends RoadmapEdgeDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RoadmapEdgeDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    **/
    updateMany<T extends RoadmapEdgeUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, RoadmapEdgeUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    **/
    upsert<T extends RoadmapEdgeUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, RoadmapEdgeUpsertArgs<ExtArgs>>
    ): Prisma__RoadmapEdgeClient<$Types.GetResult<RoadmapEdgePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

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
    >(args: SubsetIntersection<T, RoadmapEdgeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoadmapEdgeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for RoadmapEdge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__RoadmapEdgeClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
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

    roadmap<T extends RoadmapArgs<ExtArgs> = {}>(args?: Subset<T, RoadmapArgs<ExtArgs>>): Prisma__RoadmapClient<$Types.GetResult<RoadmapPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

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
   * RoadmapEdge base type for findUnique actions
   */
  export type RoadmapEdgeFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RoadmapEdgeInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapEdge to fetch.
     */
    where: RoadmapEdgeWhereUniqueInput
  }

  /**
   * RoadmapEdge findUnique
   */
  export interface RoadmapEdgeFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends RoadmapEdgeFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * RoadmapEdge findUniqueOrThrow
   */
  export type RoadmapEdgeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RoadmapEdgeInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapEdge to fetch.
     */
    where: RoadmapEdgeWhereUniqueInput
  }


  /**
   * RoadmapEdge base type for findFirst actions
   */
  export type RoadmapEdgeFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
    orderBy?: Enumerable<RoadmapEdgeOrderByWithRelationInput>
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
    distinct?: Enumerable<RoadmapEdgeScalarFieldEnum>
  }

  /**
   * RoadmapEdge findFirst
   */
  export interface RoadmapEdgeFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends RoadmapEdgeFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * RoadmapEdge findFirstOrThrow
   */
  export type RoadmapEdgeFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
    orderBy?: Enumerable<RoadmapEdgeOrderByWithRelationInput>
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
    distinct?: Enumerable<RoadmapEdgeScalarFieldEnum>
  }


  /**
   * RoadmapEdge findMany
   */
  export type RoadmapEdgeFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
    orderBy?: Enumerable<RoadmapEdgeOrderByWithRelationInput>
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
    distinct?: Enumerable<RoadmapEdgeScalarFieldEnum>
  }


  /**
   * RoadmapEdge create
   */
  export type RoadmapEdgeCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type RoadmapEdgeCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoadmapEdges.
     */
    data: Enumerable<RoadmapEdgeCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * RoadmapEdge update
   */
  export type RoadmapEdgeUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type RoadmapEdgeUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
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
  export type RoadmapEdgeUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type RoadmapEdgeDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type RoadmapEdgeDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoadmapEdges to delete
     */
    where?: RoadmapEdgeWhereInput
  }


  /**
   * RoadmapEdge without action
   */
  export type RoadmapEdgeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapEdge
     */
    select?: RoadmapEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
    AND?: Enumerable<DepartmentWhereInput>
    OR?: Enumerable<DepartmentWhereInput>
    NOT?: Enumerable<DepartmentWhereInput>
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
    AND?: Enumerable<DepartmentWhereInput>
    OR?: Enumerable<DepartmentWhereInput>
    NOT?: Enumerable<DepartmentWhereInput>
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
    AND?: Enumerable<DepartmentScalarWhereWithAggregatesInput>
    OR?: Enumerable<DepartmentScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DepartmentScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter<"Department"> | number
    name?: StringWithAggregatesFilter<"Department"> | string
    slug?: StringWithAggregatesFilter<"Department"> | string
    description?: StringNullableWithAggregatesFilter<"Department"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Department"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Department"> | Date | string
  }

  export type CourseWhereInput = {
    AND?: Enumerable<CourseWhereInput>
    OR?: Enumerable<CourseWhereInput>
    NOT?: Enumerable<CourseWhereInput>
    id?: IntFilter<"Course"> | number
    slug?: StringFilter<"Course"> | string
    title?: StringFilter<"Course"> | string
    description?: StringNullableFilter<"Course"> | string | null
    type?: EnumCourseTypeFilter<"Course"> | CourseType
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
    AND?: Enumerable<CourseWhereInput>
    OR?: Enumerable<CourseWhereInput>
    NOT?: Enumerable<CourseWhereInput>
    title?: StringFilter<"Course"> | string
    description?: StringNullableFilter<"Course"> | string | null
    type?: EnumCourseTypeFilter<"Course"> | CourseType
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
    AND?: Enumerable<CourseScalarWhereWithAggregatesInput>
    OR?: Enumerable<CourseScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CourseScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter<"Course"> | number
    slug?: StringWithAggregatesFilter<"Course"> | string
    title?: StringWithAggregatesFilter<"Course"> | string
    description?: StringNullableWithAggregatesFilter<"Course"> | string | null
    type?: EnumCourseTypeWithAggregatesFilter<"Course"> | CourseType
    departmentId?: IntNullableWithAggregatesFilter<"Course"> | number | null
    priorityJob?: StringNullableListFilter<"Course">
    structure?: JsonNullableWithAggregatesFilter<"Course">
    createdAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
  }

  export type RoadmapWhereInput = {
    AND?: Enumerable<RoadmapWhereInput>
    OR?: Enumerable<RoadmapWhereInput>
    NOT?: Enumerable<RoadmapWhereInput>
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
    AND?: Enumerable<RoadmapWhereInput>
    OR?: Enumerable<RoadmapWhereInput>
    NOT?: Enumerable<RoadmapWhereInput>
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
    AND?: Enumerable<RoadmapScalarWhereWithAggregatesInput>
    OR?: Enumerable<RoadmapScalarWhereWithAggregatesInput>
    NOT?: Enumerable<RoadmapScalarWhereWithAggregatesInput>
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
    AND?: Enumerable<RoadmapNodeWhereInput>
    OR?: Enumerable<RoadmapNodeWhereInput>
    NOT?: Enumerable<RoadmapNodeWhereInput>
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
    AND?: Enumerable<RoadmapNodeWhereInput>
    OR?: Enumerable<RoadmapNodeWhereInput>
    NOT?: Enumerable<RoadmapNodeWhereInput>
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
    AND?: Enumerable<RoadmapNodeScalarWhereWithAggregatesInput>
    OR?: Enumerable<RoadmapNodeScalarWhereWithAggregatesInput>
    NOT?: Enumerable<RoadmapNodeScalarWhereWithAggregatesInput>
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
    AND?: Enumerable<RoadmapEdgeWhereInput>
    OR?: Enumerable<RoadmapEdgeWhereInput>
    NOT?: Enumerable<RoadmapEdgeWhereInput>
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
    AND?: Enumerable<RoadmapEdgeWhereInput>
    OR?: Enumerable<RoadmapEdgeWhereInput>
    NOT?: Enumerable<RoadmapEdgeWhereInput>
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
    AND?: Enumerable<RoadmapEdgeScalarWhereWithAggregatesInput>
    OR?: Enumerable<RoadmapEdgeScalarWhereWithAggregatesInput>
    NOT?: Enumerable<RoadmapEdgeScalarWhereWithAggregatesInput>
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
    type: CourseType
    priorityJob?: CourseCreatepriorityJobInput | Enumerable<string>
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
    type: CourseType
    departmentId?: number | null
    priorityJob?: CourseCreatepriorityJobInput | Enumerable<string>
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    roadmaps?: RoadmapUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumCourseTypeFieldUpdateOperationsInput | CourseType
    priorityJob?: CourseUpdatepriorityJobInput | Enumerable<string>
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
    type?: EnumCourseTypeFieldUpdateOperationsInput | CourseType
    departmentId?: NullableIntFieldUpdateOperationsInput | number | null
    priorityJob?: CourseUpdatepriorityJobInput | Enumerable<string>
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
    type: CourseType
    departmentId?: number | null
    priorityJob?: CourseCreatepriorityJobInput | Enumerable<string>
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumCourseTypeFieldUpdateOperationsInput | CourseType
    priorityJob?: CourseUpdatepriorityJobInput | Enumerable<string>
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumCourseTypeFieldUpdateOperationsInput | CourseType
    departmentId?: NullableIntFieldUpdateOperationsInput | number | null
    priorityJob?: CourseUpdatepriorityJobInput | Enumerable<string>
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
    in?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel>
    notIn?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
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
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
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
    in?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel>
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
    in?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel>
    notIn?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel>
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
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
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
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
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
    in?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel>
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
    equals?: CourseType | EnumCourseTypeFieldRefInput<$PrismaModel>
    in?: Enumerable<CourseType> | ListEnumCourseTypeFieldRefInput<$PrismaModel>
    notIn?: Enumerable<CourseType> | ListEnumCourseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCourseTypeFilter<$PrismaModel> | CourseType
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    hasSome?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
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
    equals?: CourseType | EnumCourseTypeFieldRefInput<$PrismaModel>
    in?: Enumerable<CourseType> | ListEnumCourseTypeFieldRefInput<$PrismaModel>
    notIn?: Enumerable<CourseType> | ListEnumCourseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCourseTypeWithAggregatesFilter<$PrismaModel> | CourseType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCourseTypeFilter<$PrismaModel>
    _max?: NestedEnumCourseTypeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel> | null
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
    create?: XOR<Enumerable<CourseCreateWithoutDepartmentInput>, Enumerable<CourseUncheckedCreateWithoutDepartmentInput>>
    connectOrCreate?: Enumerable<CourseCreateOrConnectWithoutDepartmentInput>
    createMany?: CourseCreateManyDepartmentInputEnvelope
    connect?: Enumerable<CourseWhereUniqueInput>
  }

  export type CourseUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<Enumerable<CourseCreateWithoutDepartmentInput>, Enumerable<CourseUncheckedCreateWithoutDepartmentInput>>
    connectOrCreate?: Enumerable<CourseCreateOrConnectWithoutDepartmentInput>
    createMany?: CourseCreateManyDepartmentInputEnvelope
    connect?: Enumerable<CourseWhereUniqueInput>
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
    create?: XOR<Enumerable<CourseCreateWithoutDepartmentInput>, Enumerable<CourseUncheckedCreateWithoutDepartmentInput>>
    connectOrCreate?: Enumerable<CourseCreateOrConnectWithoutDepartmentInput>
    upsert?: Enumerable<CourseUpsertWithWhereUniqueWithoutDepartmentInput>
    createMany?: CourseCreateManyDepartmentInputEnvelope
    set?: Enumerable<CourseWhereUniqueInput>
    disconnect?: Enumerable<CourseWhereUniqueInput>
    delete?: Enumerable<CourseWhereUniqueInput>
    connect?: Enumerable<CourseWhereUniqueInput>
    update?: Enumerable<CourseUpdateWithWhereUniqueWithoutDepartmentInput>
    updateMany?: Enumerable<CourseUpdateManyWithWhereWithoutDepartmentInput>
    deleteMany?: Enumerable<CourseScalarWhereInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CourseUncheckedUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<Enumerable<CourseCreateWithoutDepartmentInput>, Enumerable<CourseUncheckedCreateWithoutDepartmentInput>>
    connectOrCreate?: Enumerable<CourseCreateOrConnectWithoutDepartmentInput>
    upsert?: Enumerable<CourseUpsertWithWhereUniqueWithoutDepartmentInput>
    createMany?: CourseCreateManyDepartmentInputEnvelope
    set?: Enumerable<CourseWhereUniqueInput>
    disconnect?: Enumerable<CourseWhereUniqueInput>
    delete?: Enumerable<CourseWhereUniqueInput>
    connect?: Enumerable<CourseWhereUniqueInput>
    update?: Enumerable<CourseUpdateWithWhereUniqueWithoutDepartmentInput>
    updateMany?: Enumerable<CourseUpdateManyWithWhereWithoutDepartmentInput>
    deleteMany?: Enumerable<CourseScalarWhereInput>
  }

  export type CourseCreatepriorityJobInput = {
    set: Enumerable<string>
  }

  export type DepartmentCreateNestedOneWithoutCoursesInput = {
    create?: XOR<DepartmentCreateWithoutCoursesInput, DepartmentUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutCoursesInput
    connect?: DepartmentWhereUniqueInput
  }

  export type RoadmapCreateNestedManyWithoutCourseInput = {
    create?: XOR<Enumerable<RoadmapCreateWithoutCourseInput>, Enumerable<RoadmapUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<RoadmapCreateOrConnectWithoutCourseInput>
    createMany?: RoadmapCreateManyCourseInputEnvelope
    connect?: Enumerable<RoadmapWhereUniqueInput>
  }

  export type RoadmapUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<Enumerable<RoadmapCreateWithoutCourseInput>, Enumerable<RoadmapUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<RoadmapCreateOrConnectWithoutCourseInput>
    createMany?: RoadmapCreateManyCourseInputEnvelope
    connect?: Enumerable<RoadmapWhereUniqueInput>
  }

  export type EnumCourseTypeFieldUpdateOperationsInput = {
    set?: CourseType
  }

  export type CourseUpdatepriorityJobInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
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
    create?: XOR<Enumerable<RoadmapCreateWithoutCourseInput>, Enumerable<RoadmapUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<RoadmapCreateOrConnectWithoutCourseInput>
    upsert?: Enumerable<RoadmapUpsertWithWhereUniqueWithoutCourseInput>
    createMany?: RoadmapCreateManyCourseInputEnvelope
    set?: Enumerable<RoadmapWhereUniqueInput>
    disconnect?: Enumerable<RoadmapWhereUniqueInput>
    delete?: Enumerable<RoadmapWhereUniqueInput>
    connect?: Enumerable<RoadmapWhereUniqueInput>
    update?: Enumerable<RoadmapUpdateWithWhereUniqueWithoutCourseInput>
    updateMany?: Enumerable<RoadmapUpdateManyWithWhereWithoutCourseInput>
    deleteMany?: Enumerable<RoadmapScalarWhereInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RoadmapUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<Enumerable<RoadmapCreateWithoutCourseInput>, Enumerable<RoadmapUncheckedCreateWithoutCourseInput>>
    connectOrCreate?: Enumerable<RoadmapCreateOrConnectWithoutCourseInput>
    upsert?: Enumerable<RoadmapUpsertWithWhereUniqueWithoutCourseInput>
    createMany?: RoadmapCreateManyCourseInputEnvelope
    set?: Enumerable<RoadmapWhereUniqueInput>
    disconnect?: Enumerable<RoadmapWhereUniqueInput>
    delete?: Enumerable<RoadmapWhereUniqueInput>
    connect?: Enumerable<RoadmapWhereUniqueInput>
    update?: Enumerable<RoadmapUpdateWithWhereUniqueWithoutCourseInput>
    updateMany?: Enumerable<RoadmapUpdateManyWithWhereWithoutCourseInput>
    deleteMany?: Enumerable<RoadmapScalarWhereInput>
  }

  export type CourseCreateNestedOneWithoutRoadmapsInput = {
    create?: XOR<CourseCreateWithoutRoadmapsInput, CourseUncheckedCreateWithoutRoadmapsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutRoadmapsInput
    connect?: CourseWhereUniqueInput
  }

  export type RoadmapNodeCreateNestedManyWithoutRoadmapInput = {
    create?: XOR<Enumerable<RoadmapNodeCreateWithoutRoadmapInput>, Enumerable<RoadmapNodeUncheckedCreateWithoutRoadmapInput>>
    connectOrCreate?: Enumerable<RoadmapNodeCreateOrConnectWithoutRoadmapInput>
    createMany?: RoadmapNodeCreateManyRoadmapInputEnvelope
    connect?: Enumerable<RoadmapNodeWhereUniqueInput>
  }

  export type RoadmapEdgeCreateNestedManyWithoutRoadmapInput = {
    create?: XOR<Enumerable<RoadmapEdgeCreateWithoutRoadmapInput>, Enumerable<RoadmapEdgeUncheckedCreateWithoutRoadmapInput>>
    connectOrCreate?: Enumerable<RoadmapEdgeCreateOrConnectWithoutRoadmapInput>
    createMany?: RoadmapEdgeCreateManyRoadmapInputEnvelope
    connect?: Enumerable<RoadmapEdgeWhereUniqueInput>
  }

  export type RoadmapNodeUncheckedCreateNestedManyWithoutRoadmapInput = {
    create?: XOR<Enumerable<RoadmapNodeCreateWithoutRoadmapInput>, Enumerable<RoadmapNodeUncheckedCreateWithoutRoadmapInput>>
    connectOrCreate?: Enumerable<RoadmapNodeCreateOrConnectWithoutRoadmapInput>
    createMany?: RoadmapNodeCreateManyRoadmapInputEnvelope
    connect?: Enumerable<RoadmapNodeWhereUniqueInput>
  }

  export type RoadmapEdgeUncheckedCreateNestedManyWithoutRoadmapInput = {
    create?: XOR<Enumerable<RoadmapEdgeCreateWithoutRoadmapInput>, Enumerable<RoadmapEdgeUncheckedCreateWithoutRoadmapInput>>
    connectOrCreate?: Enumerable<RoadmapEdgeCreateOrConnectWithoutRoadmapInput>
    createMany?: RoadmapEdgeCreateManyRoadmapInputEnvelope
    connect?: Enumerable<RoadmapEdgeWhereUniqueInput>
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
    create?: XOR<Enumerable<RoadmapNodeCreateWithoutRoadmapInput>, Enumerable<RoadmapNodeUncheckedCreateWithoutRoadmapInput>>
    connectOrCreate?: Enumerable<RoadmapNodeCreateOrConnectWithoutRoadmapInput>
    upsert?: Enumerable<RoadmapNodeUpsertWithWhereUniqueWithoutRoadmapInput>
    createMany?: RoadmapNodeCreateManyRoadmapInputEnvelope
    set?: Enumerable<RoadmapNodeWhereUniqueInput>
    disconnect?: Enumerable<RoadmapNodeWhereUniqueInput>
    delete?: Enumerable<RoadmapNodeWhereUniqueInput>
    connect?: Enumerable<RoadmapNodeWhereUniqueInput>
    update?: Enumerable<RoadmapNodeUpdateWithWhereUniqueWithoutRoadmapInput>
    updateMany?: Enumerable<RoadmapNodeUpdateManyWithWhereWithoutRoadmapInput>
    deleteMany?: Enumerable<RoadmapNodeScalarWhereInput>
  }

  export type RoadmapEdgeUpdateManyWithoutRoadmapNestedInput = {
    create?: XOR<Enumerable<RoadmapEdgeCreateWithoutRoadmapInput>, Enumerable<RoadmapEdgeUncheckedCreateWithoutRoadmapInput>>
    connectOrCreate?: Enumerable<RoadmapEdgeCreateOrConnectWithoutRoadmapInput>
    upsert?: Enumerable<RoadmapEdgeUpsertWithWhereUniqueWithoutRoadmapInput>
    createMany?: RoadmapEdgeCreateManyRoadmapInputEnvelope
    set?: Enumerable<RoadmapEdgeWhereUniqueInput>
    disconnect?: Enumerable<RoadmapEdgeWhereUniqueInput>
    delete?: Enumerable<RoadmapEdgeWhereUniqueInput>
    connect?: Enumerable<RoadmapEdgeWhereUniqueInput>
    update?: Enumerable<RoadmapEdgeUpdateWithWhereUniqueWithoutRoadmapInput>
    updateMany?: Enumerable<RoadmapEdgeUpdateManyWithWhereWithoutRoadmapInput>
    deleteMany?: Enumerable<RoadmapEdgeScalarWhereInput>
  }

  export type RoadmapNodeUncheckedUpdateManyWithoutRoadmapNestedInput = {
    create?: XOR<Enumerable<RoadmapNodeCreateWithoutRoadmapInput>, Enumerable<RoadmapNodeUncheckedCreateWithoutRoadmapInput>>
    connectOrCreate?: Enumerable<RoadmapNodeCreateOrConnectWithoutRoadmapInput>
    upsert?: Enumerable<RoadmapNodeUpsertWithWhereUniqueWithoutRoadmapInput>
    createMany?: RoadmapNodeCreateManyRoadmapInputEnvelope
    set?: Enumerable<RoadmapNodeWhereUniqueInput>
    disconnect?: Enumerable<RoadmapNodeWhereUniqueInput>
    delete?: Enumerable<RoadmapNodeWhereUniqueInput>
    connect?: Enumerable<RoadmapNodeWhereUniqueInput>
    update?: Enumerable<RoadmapNodeUpdateWithWhereUniqueWithoutRoadmapInput>
    updateMany?: Enumerable<RoadmapNodeUpdateManyWithWhereWithoutRoadmapInput>
    deleteMany?: Enumerable<RoadmapNodeScalarWhereInput>
  }

  export type RoadmapEdgeUncheckedUpdateManyWithoutRoadmapNestedInput = {
    create?: XOR<Enumerable<RoadmapEdgeCreateWithoutRoadmapInput>, Enumerable<RoadmapEdgeUncheckedCreateWithoutRoadmapInput>>
    connectOrCreate?: Enumerable<RoadmapEdgeCreateOrConnectWithoutRoadmapInput>
    upsert?: Enumerable<RoadmapEdgeUpsertWithWhereUniqueWithoutRoadmapInput>
    createMany?: RoadmapEdgeCreateManyRoadmapInputEnvelope
    set?: Enumerable<RoadmapEdgeWhereUniqueInput>
    disconnect?: Enumerable<RoadmapEdgeWhereUniqueInput>
    delete?: Enumerable<RoadmapEdgeWhereUniqueInput>
    connect?: Enumerable<RoadmapEdgeWhereUniqueInput>
    update?: Enumerable<RoadmapEdgeUpdateWithWhereUniqueWithoutRoadmapInput>
    updateMany?: Enumerable<RoadmapEdgeUpdateManyWithWhereWithoutRoadmapInput>
    deleteMany?: Enumerable<RoadmapEdgeScalarWhereInput>
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
    in?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel>
    notIn?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
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
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
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
    in?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel>
    notIn?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel>
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
    in?: Enumerable<number> | ListFloatFieldRefInput<$PrismaModel>
    notIn?: Enumerable<number> | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
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
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
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
    in?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel>
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
    equals?: CourseType | EnumCourseTypeFieldRefInput<$PrismaModel>
    in?: Enumerable<CourseType> | ListEnumCourseTypeFieldRefInput<$PrismaModel>
    notIn?: Enumerable<CourseType> | ListEnumCourseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCourseTypeFilter<$PrismaModel> | CourseType
  }

  export type NestedEnumCourseTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: CourseType | EnumCourseTypeFieldRefInput<$PrismaModel>
    in?: Enumerable<CourseType> | ListEnumCourseTypeFieldRefInput<$PrismaModel>
    notIn?: Enumerable<CourseType> | ListEnumCourseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCourseTypeWithAggregatesFilter<$PrismaModel> | CourseType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCourseTypeFilter<$PrismaModel>
    _max?: NestedEnumCourseTypeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel> | null
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
    in?: Enumerable<number> | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<number> | ListFloatFieldRefInput<$PrismaModel> | null
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
    type: CourseType
    priorityJob?: CourseCreatepriorityJobInput | Enumerable<string>
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
    type: CourseType
    priorityJob?: CourseCreatepriorityJobInput | Enumerable<string>
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
    data: Enumerable<CourseCreateManyDepartmentInput>
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
    AND?: Enumerable<CourseScalarWhereInput>
    OR?: Enumerable<CourseScalarWhereInput>
    NOT?: Enumerable<CourseScalarWhereInput>
    id?: IntFilter<"Course"> | number
    slug?: StringFilter<"Course"> | string
    title?: StringFilter<"Course"> | string
    description?: StringNullableFilter<"Course"> | string | null
    type?: EnumCourseTypeFilter<"Course"> | CourseType
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
    data: Enumerable<RoadmapCreateManyCourseInput>
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
    AND?: Enumerable<RoadmapScalarWhereInput>
    OR?: Enumerable<RoadmapScalarWhereInput>
    NOT?: Enumerable<RoadmapScalarWhereInput>
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
    type: CourseType
    priorityJob?: CourseCreatepriorityJobInput | Enumerable<string>
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
    type: CourseType
    departmentId?: number | null
    priorityJob?: CourseCreatepriorityJobInput | Enumerable<string>
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
    data: Enumerable<RoadmapNodeCreateManyRoadmapInput>
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
    data: Enumerable<RoadmapEdgeCreateManyRoadmapInput>
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
    type?: EnumCourseTypeFieldUpdateOperationsInput | CourseType
    priorityJob?: CourseUpdatepriorityJobInput | Enumerable<string>
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
    type?: EnumCourseTypeFieldUpdateOperationsInput | CourseType
    departmentId?: NullableIntFieldUpdateOperationsInput | number | null
    priorityJob?: CourseUpdatepriorityJobInput | Enumerable<string>
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
    AND?: Enumerable<RoadmapNodeScalarWhereInput>
    OR?: Enumerable<RoadmapNodeScalarWhereInput>
    NOT?: Enumerable<RoadmapNodeScalarWhereInput>
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
    AND?: Enumerable<RoadmapEdgeScalarWhereInput>
    OR?: Enumerable<RoadmapEdgeScalarWhereInput>
    NOT?: Enumerable<RoadmapEdgeScalarWhereInput>
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
    type: CourseType
    priorityJob?: CourseCreatepriorityJobInput | Enumerable<string>
    structure?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseUpdateWithoutDepartmentInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumCourseTypeFieldUpdateOperationsInput | CourseType
    priorityJob?: CourseUpdatepriorityJobInput | Enumerable<string>
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
    type?: EnumCourseTypeFieldUpdateOperationsInput | CourseType
    priorityJob?: CourseUpdatepriorityJobInput | Enumerable<string>
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
    type?: EnumCourseTypeFieldUpdateOperationsInput | CourseType
    priorityJob?: CourseUpdatepriorityJobInput | Enumerable<string>
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