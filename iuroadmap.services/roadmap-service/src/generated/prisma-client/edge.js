
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/edge.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.DEPARTMENTSScalarFieldEnum = {
  id: 'id',
  slug: 'slug',
  name: 'name',
  description: 'description',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.MAJOR_ROADMAPSScalarFieldEnum = {
  id: 'id',
  slug: 'slug',
  name: 'name',
  description: 'description',
  department_id: 'department_id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.COURSE_CATEGORIESScalarFieldEnum = {
  id: 'id',
  code: 'code',
  name: 'name',
  fill_color: 'fill_color',
  border_color: 'border_color',
  sort_order: 'sort_order',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.COURSESScalarFieldEnum = {
  id: 'id',
  code: 'code',
  name: 'name',
  theory_credits: 'theory_credits',
  lab_credits: 'lab_credits',
  category_id: 'category_id',
  grading_mode: 'grading_mode',
  counts_toward_gpa: 'counts_toward_gpa',
  counts_toward_credits: 'counts_toward_credits',
  description: 'description',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.COURSE_OFFERINGSScalarFieldEnum = {
  id: 'id',
  course_id: 'course_id',
  academic_year: 'academic_year',
  status: 'status',
  student_guide: 'student_guide',
  syllabus_url: 'syllabus_url',
  weight_process: 'weight_process',
  weight_midterm: 'weight_midterm',
  weight_final: 'weight_final',
  has_project: 'has_project',
  project_description: 'project_description',
  copied_from_id: 'copied_from_id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.LECTURERSScalarFieldEnum = {
  id: 'id',
  full_name: 'full_name',
  title: 'title',
  department_id: 'department_id',
  email: 'email',
  status: 'status',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.COURSE_OFFERING_LECTURERSScalarFieldEnum = {
  id: 'id',
  offering_id: 'offering_id',
  lecturer_id: 'lecturer_id',
  role: 'role',
  term_in_year: 'term_in_year'
};

exports.Prisma.ROADMAP_VERSIONSScalarFieldEnum = {
  id: 'id',
  roadmap_id: 'roadmap_id',
  cohort_year: 'cohort_year',
  revision_no: 'revision_no',
  total_credits: 'total_credits',
  decision_ref: 'decision_ref',
  status: 'status',
  revision: 'revision',
  published_at: 'published_at',
  published_by: 'published_by',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.ROADMAP_TERMSScalarFieldEnum = {
  id: 'id',
  version_id: 'version_id',
  term_key: 'term_key',
  order_index: 'order_index',
  kind: 'kind',
  semester_no: 'semester_no'
};

exports.Prisma.ROADMAP_NODESScalarFieldEnum = {
  id: 'id',
  version_id: 'version_id',
  node_key: 'node_key',
  term_id: 'term_id',
  row_index: 'row_index',
  kind: 'kind',
  course_id: 'course_id',
  slot_label: 'slot_label',
  slot_theory_credits: 'slot_theory_credits',
  slot_lab_credits: 'slot_lab_credits',
  elective_group: 'elective_group',
  choice_group: 'choice_group',
  condition: 'condition'
};

exports.Prisma.ROADMAP_EDGESScalarFieldEnum = {
  id: 'id',
  version_id: 'version_id',
  edge_key: 'edge_key',
  source_node_id: 'source_node_id',
  target_node_id: 'target_node_id',
  type: 'type'
};

exports.Prisma.COURSE_TOPICS_NODEScalarFieldEnum = {
  id: 'id',
  offering_id: 'offering_id',
  slug: 'slug',
  title: 'title',
  description: 'description',
  coords: 'coords',
  learning_objectives: 'learning_objectives',
  resources_url: 'resources_url',
  estimated_hours: 'estimated_hours',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.COURSE_TOPICS_EDGEScalarFieldEnum = {
  id: 'id',
  source_topic_id: 'source_topic_id',
  target_topic_id: 'target_topic_id',
  created_at: 'created_at'
};

exports.Prisma.STUDENT_ROADMAPSScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  roadmap_id: 'roadmap_id',
  version_id: 'version_id',
  status: 'status',
  revision: 'revision',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.STUDENT_TERM_DELTASScalarFieldEnum = {
  id: 'id',
  student_roadmap_id: 'student_roadmap_id',
  term_key: 'term_key',
  origin: 'origin',
  kind: 'kind',
  after_term_key: 'after_term_key',
  custom_label: 'custom_label',
  academic_year: 'academic_year',
  term_in_year: 'term_in_year'
};

exports.Prisma.STUDENT_NODE_DELTASScalarFieldEnum = {
  id: 'id',
  student_roadmap_id: 'student_roadmap_id',
  node_key: 'node_key',
  origin: 'origin',
  term_key: 'term_key',
  row_order: 'row_order',
  course_id: 'course_id',
  custom_code: 'custom_code',
  custom_name: 'custom_name',
  custom_theory_credits: 'custom_theory_credits',
  custom_lab_credits: 'custom_lab_credits',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.STUDENT_EDGE_DELTASScalarFieldEnum = {
  id: 'id',
  student_roadmap_id: 'student_roadmap_id',
  edge_key: 'edge_key',
  source_node_key: 'source_node_key',
  target_node_key: 'target_node_key',
  type: 'type'
};

exports.Prisma.STUDENT_COURSE_RESULTSScalarFieldEnum = {
  id: 'id',
  student_roadmap_id: 'student_roadmap_id',
  node_key: 'node_key',
  status: 'status',
  weight_process: 'weight_process',
  weight_midterm: 'weight_midterm',
  weight_final: 'weight_final',
  score_process: 'score_process',
  score_midterm: 'score_midterm',
  score_final: 'score_final',
  total_score: 'total_score',
  is_passed: 'is_passed',
  note: 'note',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.COURSE_COMMENTSScalarFieldEnum = {
  id: 'id',
  course_id: 'course_id',
  parent_id: 'parent_id',
  user_id: 'user_id',
  academic_year: 'academic_year',
  author_display_name: 'author_display_name',
  content: 'content',
  status: 'status',
  pending_report_count: 'pending_report_count',
  edited_at: 'edited_at',
  moderated_by: 'moderated_by',
  moderated_at: 'moderated_at',
  moderation_reason: 'moderation_reason',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.COURSE_COMMENT_REPORTSScalarFieldEnum = {
  id: 'id',
  comment_id: 'comment_id',
  reporter_id: 'reporter_id',
  reason: 'reason',
  note: 'note',
  status: 'status',
  created_at: 'created_at'
};

exports.Prisma.GRADE_SCALESScalarFieldEnum = {
  id: 'id',
  letter: 'letter',
  min_score: 'min_score',
  max_score: 'max_score',
  grade_point: 'grade_point',
  is_passing: 'is_passing',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.ACADEMIC_CLASSIFICATIONSScalarFieldEnum = {
  id: 'id',
  label_key: 'label_key',
  min_gpa100: 'min_gpa100',
  max_gpa100: 'max_gpa100',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.GradingMode = exports.$Enums.GradingMode = {
  SCORE: 'SCORE',
  PASS_FAIL: 'PASS_FAIL'
};

exports.OfferingStatus = exports.$Enums.OfferingStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED'
};

exports.LecturerStatus = exports.$Enums.LecturerStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  RETIRED: 'RETIRED'
};

exports.LecturerRole = exports.$Enums.LecturerRole = {
  LECTURER: 'LECTURER',
  TA: 'TA'
};

exports.TermInYear = exports.$Enums.TermInYear = {
  SEMESTER_1: 'SEMESTER_1',
  SEMESTER_2: 'SEMESTER_2',
  SUMMER: 'SUMMER'
};

exports.RoadmapVersionStatus = exports.$Enums.RoadmapVersionStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED'
};

exports.TermKind = exports.$Enums.TermKind = {
  REGULAR: 'REGULAR',
  SUMMER: 'SUMMER',
  ELECTIVE_POOL: 'ELECTIVE_POOL'
};

exports.RoadmapNodeKind = exports.$Enums.RoadmapNodeKind = {
  COURSE: 'COURSE',
  ELECTIVE_SLOT: 'ELECTIVE_SLOT'
};

exports.RelationType = exports.$Enums.RelationType = {
  PREREQUISITE: 'PREREQUISITE',
  PREVIOUS: 'PREVIOUS',
  COREQUISITE: 'COREQUISITE'
};

exports.StudentRoadmapStatus = exports.$Enums.StudentRoadmapStatus = {
  ENROLLED: 'ENROLLED',
  COMPLETED: 'COMPLETED',
  DROPPED: 'DROPPED'
};

exports.DeltaOrigin = exports.$Enums.DeltaOrigin = {
  BASE: 'BASE',
  CUSTOM: 'CUSTOM'
};

exports.CourseResultStatus = exports.$Enums.CourseResultStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  GRADED: 'GRADED'
};

exports.CommentStatus = exports.$Enums.CommentStatus = {
  VISIBLE: 'VISIBLE',
  FLAGGED: 'FLAGGED',
  HIDDEN: 'HIDDEN',
  DELETED: 'DELETED'
};

exports.CommentReportReason = exports.$Enums.CommentReportReason = {
  SPAM: 'SPAM',
  OFFENSIVE: 'OFFENSIVE',
  OFF_TOPIC: 'OFF_TOPIC',
  MISINFORMATION: 'MISINFORMATION',
  OTHER: 'OTHER'
};

exports.CommentReportStatus = exports.$Enums.CommentReportStatus = {
  PENDING: 'PENDING',
  REVIEWED: 'REVIEWED',
  DISMISSED: 'DISMISSED'
};

exports.Prisma.ModelName = {
  DEPARTMENTS: 'DEPARTMENTS',
  MAJOR_ROADMAPS: 'MAJOR_ROADMAPS',
  COURSE_CATEGORIES: 'COURSE_CATEGORIES',
  COURSES: 'COURSES',
  COURSE_OFFERINGS: 'COURSE_OFFERINGS',
  LECTURERS: 'LECTURERS',
  COURSE_OFFERING_LECTURERS: 'COURSE_OFFERING_LECTURERS',
  ROADMAP_VERSIONS: 'ROADMAP_VERSIONS',
  ROADMAP_TERMS: 'ROADMAP_TERMS',
  ROADMAP_NODES: 'ROADMAP_NODES',
  ROADMAP_EDGES: 'ROADMAP_EDGES',
  COURSE_TOPICS_NODE: 'COURSE_TOPICS_NODE',
  COURSE_TOPICS_EDGE: 'COURSE_TOPICS_EDGE',
  STUDENT_ROADMAPS: 'STUDENT_ROADMAPS',
  STUDENT_TERM_DELTAS: 'STUDENT_TERM_DELTAS',
  STUDENT_NODE_DELTAS: 'STUDENT_NODE_DELTAS',
  STUDENT_EDGE_DELTAS: 'STUDENT_EDGE_DELTAS',
  STUDENT_COURSE_RESULTS: 'STUDENT_COURSE_RESULTS',
  COURSE_COMMENTS: 'COURSE_COMMENTS',
  COURSE_COMMENT_REPORTS: 'COURSE_COMMENT_REPORTS',
  GRADE_SCALES: 'GRADE_SCALES',
  ACADEMIC_CLASSIFICATIONS: 'ACADEMIC_CLASSIFICATIONS'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "D:\\TanKhanh\\Lecture\\2025-2026\\Second Semester\\Software Engineering\\IUROADMAP\\IUROADMAP\\iuroadmap.services\\roadmap-service\\src\\generated\\prisma-client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "D:\\TanKhanh\\Lecture\\2025-2026\\Second Semester\\Software Engineering\\IUROADMAP\\IUROADMAP\\iuroadmap.services\\roadmap-service\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "ADMIN_DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// roadmap-service/prisma/schema.prisma — Roadmap v2\n// Source of truth: iuroadmap.docs/schema/roadmap-schema.md (v2.1)\n// Constraints Prisma cannot express (partial unique indexes, CHECKs) are added by hand\n// in the migration SQL. Every user id is the auth User.id (uuid string), never a FK.\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"ADMIN_DATABASE_URL\")\n}\n\ngenerator client {\n  provider = \"prisma-client-js\"\n  output   = \"../src/generated/prisma-client\"\n}\n\n// ================= ENUMS =================\n\nenum RoadmapVersionStatus {\n  DRAFT\n  PUBLISHED\n  ARCHIVED\n}\n\nenum TermKind {\n  REGULAR\n  SUMMER\n  ELECTIVE_POOL\n}\n\nenum RoadmapNodeKind {\n  COURSE\n  ELECTIVE_SLOT\n}\n\nenum RelationType {\n  PREREQUISITE\n  PREVIOUS\n  COREQUISITE\n}\n\nenum StudentRoadmapStatus {\n  ENROLLED\n  COMPLETED\n  DROPPED\n}\n\nenum DeltaOrigin {\n  BASE\n  CUSTOM\n}\n\nenum CourseResultStatus {\n  IN_PROGRESS\n  GRADED\n}\n\nenum GradingMode {\n  SCORE\n  PASS_FAIL\n}\n\nenum OfferingStatus {\n  DRAFT\n  PUBLISHED\n}\n\nenum TermInYear {\n  SEMESTER_1\n  SEMESTER_2\n  SUMMER\n}\n\nenum LecturerRole {\n  LECTURER\n  TA\n}\n\nenum LecturerStatus {\n  ACTIVE\n  INACTIVE\n  RETIRED\n}\n\nenum CommentStatus {\n  VISIBLE\n  FLAGGED\n  HIDDEN\n  DELETED\n}\n\nenum CommentReportReason {\n  SPAM\n  OFFENSIVE\n  OFF_TOPIC\n  MISINFORMATION\n  OTHER\n}\n\nenum CommentReportStatus {\n  PENDING\n  REVIEWED\n  DISMISSED\n}\n\n// ================= ORGANISATION =================\n\nmodel DEPARTMENTS {\n  id          Int     @id @default(autoincrement())\n  slug        String  @unique\n  name        String\n  description String?\n\n  majors     MAJOR_ROADMAPS[]\n  lecturers  LECTURERS[]\n  created_at DateTime         @default(now())\n  updated_at DateTime         @updatedAt\n\n  @@map(\"departments\")\n}\n\nmodel MAJOR_ROADMAPS {\n  id            Int         @id @default(autoincrement())\n  slug          String      @unique\n  name          String\n  description   String?\n  department_id Int\n  department    DEPARTMENTS @relation(fields: [department_id], references: [id], onDelete: Restrict)\n\n  versions        ROADMAP_VERSIONS[]\n  studentRoadmaps STUDENT_ROADMAPS[]\n  created_at      DateTime           @default(now())\n  updated_at      DateTime           @updatedAt\n\n  @@index([department_id])\n  @@map(\"major_roadmaps\")\n}\n\n// ================= COURSE CATALOG =================\n\nmodel COURSE_CATEGORIES {\n  id           Int    @id @default(autoincrement())\n  code         String @unique\n  name         String\n  fill_color   String\n  border_color String\n  sort_order   Int    @default(0)\n\n  courses    COURSES[]\n  created_at DateTime  @default(now())\n  updated_at DateTime  @updatedAt\n\n  @@map(\"course_categories\")\n}\n\nmodel COURSES {\n  id                    Int               @id @default(autoincrement())\n  code                  String            @unique\n  name                  String\n  theory_credits        Int\n  lab_credits           Int               @default(0)\n  category_id           Int\n  category              COURSE_CATEGORIES @relation(fields: [category_id], references: [id], onDelete: Restrict)\n  grading_mode          GradingMode       @default(SCORE)\n  counts_toward_gpa     Boolean           @default(true)\n  counts_toward_credits Boolean           @default(true)\n  description           String?\n\n  roadmapNodes      ROADMAP_NODES[]\n  studentNodeDeltas STUDENT_NODE_DELTAS[]\n  offerings         COURSE_OFFERINGS[]\n  comments          COURSE_COMMENTS[]\n  created_at        DateTime              @default(now())\n  updated_at        DateTime              @updatedAt\n\n  @@index([category_id])\n  @@map(\"courses\")\n}\n\n// ================= COURSE OFFERING (course in one academic year) =================\n\nmodel COURSE_OFFERINGS {\n  id                  Int            @id @default(autoincrement())\n  course_id           Int\n  course              COURSES        @relation(fields: [course_id], references: [id], onDelete: Restrict)\n  academic_year       Int\n  status              OfferingStatus @default(DRAFT)\n  student_guide       String?        @db.Text\n  syllabus_url        String?\n  weight_process      Int?\n  weight_midterm      Int?\n  weight_final        Int?\n  has_project         Boolean        @default(false)\n  project_description String?        @db.Text\n  copied_from_id      Int?\n\n  lecturers  COURSE_OFFERING_LECTURERS[]\n  topics     COURSE_TOPICS_NODE[]\n  created_at DateTime                    @default(now())\n  updated_at DateTime                    @updatedAt\n\n  @@unique([course_id, academic_year])\n  @@index([academic_year, status])\n  @@map(\"course_offerings\")\n}\n\nmodel LECTURERS {\n  id            Int            @id @default(autoincrement())\n  full_name     String\n  title         String?\n  department_id Int\n  department    DEPARTMENTS    @relation(fields: [department_id], references: [id], onDelete: Restrict)\n  email         String?        @unique\n  status        LecturerStatus @default(ACTIVE)\n\n  offerings  COURSE_OFFERING_LECTURERS[]\n  created_at DateTime                    @default(now())\n  updated_at DateTime                    @updatedAt\n\n  @@index([department_id])\n  @@map(\"lecturers\")\n}\n\nmodel COURSE_OFFERING_LECTURERS {\n  id           Int              @id @default(autoincrement())\n  offering_id  Int\n  offering     COURSE_OFFERINGS @relation(fields: [offering_id], references: [id], onDelete: Cascade)\n  lecturer_id  Int\n  lecturer     LECTURERS        @relation(fields: [lecturer_id], references: [id], onDelete: Restrict)\n  role         LecturerRole     @default(LECTURER)\n  term_in_year TermInYear?\n\n  @@unique([offering_id, lecturer_id, term_in_year])\n  @@index([lecturer_id])\n  @@map(\"course_offering_lecturers\")\n}\n\n// ================= CURRICULUM BY YEAR (table keeps the name ROADMAP_VERSIONS) =================\n\nmodel ROADMAP_VERSIONS {\n  id            Int                  @id @default(autoincrement())\n  roadmap_id    Int\n  roadmap       MAJOR_ROADMAPS       @relation(fields: [roadmap_id], references: [id], onDelete: Cascade)\n  cohort_year   Int\n  revision_no   Int?\n  total_credits Int\n  decision_ref  String?\n  status        RoadmapVersionStatus @default(DRAFT)\n  revision      Int                  @default(0)\n  published_at  DateTime?\n  published_by  String?              @db.Uuid\n\n  terms           ROADMAP_TERMS[]\n  nodes           ROADMAP_NODES[]\n  edges           ROADMAP_EDGES[]\n  studentRoadmaps STUDENT_ROADMAPS[]\n  created_at      DateTime           @default(now())\n  updated_at      DateTime           @updatedAt\n\n  @@unique([roadmap_id, cohort_year, revision_no])\n  @@index([roadmap_id, cohort_year, status])\n  @@map(\"roadmap_versions\")\n}\n\nmodel ROADMAP_TERMS {\n  id          Int              @id @default(autoincrement())\n  version_id  Int\n  version     ROADMAP_VERSIONS @relation(fields: [version_id], references: [id], onDelete: Cascade)\n  term_key    String           @db.Uuid\n  order_index Int\n  kind        TermKind\n  semester_no Int?\n\n  nodes ROADMAP_NODES[]\n\n  @@unique([version_id, term_key])\n  @@unique([version_id, order_index])\n  @@map(\"roadmap_terms\")\n}\n\nmodel ROADMAP_NODES {\n  id                  Int              @id @default(autoincrement())\n  version_id          Int\n  version             ROADMAP_VERSIONS @relation(fields: [version_id], references: [id], onDelete: Cascade)\n  node_key            String           @db.Uuid\n  term_id             Int\n  term                ROADMAP_TERMS    @relation(fields: [term_id], references: [id], onDelete: Cascade)\n  row_index           Int\n  kind                RoadmapNodeKind\n  course_id           Int?\n  course              COURSES?         @relation(fields: [course_id], references: [id], onDelete: Restrict)\n  slot_label          String?\n  slot_theory_credits Int?\n  slot_lab_credits    Int?\n  elective_group      String?\n  choice_group        String?\n  condition           String?\n\n  edgesOut ROADMAP_EDGES[] @relation(\"source\")\n  edgesIn  ROADMAP_EDGES[] @relation(\"target\")\n\n  @@unique([version_id, node_key])\n  @@unique([term_id, row_index])\n  @@unique([version_id, course_id])\n  @@index([course_id])\n  @@map(\"roadmap_nodes\")\n}\n\nmodel ROADMAP_EDGES {\n  id             Int              @id @default(autoincrement())\n  version_id     Int\n  version        ROADMAP_VERSIONS @relation(fields: [version_id], references: [id], onDelete: Cascade)\n  edge_key       String           @db.Uuid\n  source_node_id Int\n  sourceNode     ROADMAP_NODES    @relation(\"source\", fields: [source_node_id], references: [id], onDelete: Cascade)\n  target_node_id Int\n  targetNode     ROADMAP_NODES    @relation(\"target\", fields: [target_node_id], references: [id], onDelete: Cascade)\n  type           RelationType\n\n  @@unique([version_id, edge_key])\n  @@unique([source_node_id, target_node_id])\n  @@index([target_node_id])\n  @@map(\"roadmap_edges\")\n}\n\n// ================= COURSE TOPICS (micro roadmap of one offering) =================\n\nmodel COURSE_TOPICS_NODE {\n  id                  Int              @id @default(autoincrement())\n  offering_id         Int\n  offering            COURSE_OFFERINGS @relation(fields: [offering_id], references: [id], onDelete: Cascade)\n  slug                String\n  title               String\n  description         String?\n  coords              Json?\n  learning_objectives String?\n  resources_url       String?\n  estimated_hours     Decimal?         @db.Decimal(6, 1)\n\n  topicEdgesAsSource COURSE_TOPICS_EDGE[] @relation(\"source\")\n  topicEdgesAsTarget COURSE_TOPICS_EDGE[] @relation(\"target\")\n  created_at         DateTime             @default(now())\n  updated_at         DateTime             @updatedAt\n\n  @@unique([offering_id, slug])\n  @@index([offering_id])\n  @@map(\"course_topics_node\")\n}\n\nmodel COURSE_TOPICS_EDGE {\n  id              Int                @id @default(autoincrement())\n  source_topic_id Int\n  sourceTopic     COURSE_TOPICS_NODE @relation(\"source\", fields: [source_topic_id], references: [id], onDelete: Cascade)\n  target_topic_id Int\n  targetTopic     COURSE_TOPICS_NODE @relation(\"target\", fields: [target_topic_id], references: [id], onDelete: Cascade)\n  created_at      DateTime           @default(now())\n\n  @@unique([source_topic_id, target_topic_id])\n  @@index([target_topic_id])\n  @@map(\"course_topics_edge\")\n}\n\n// ================= STUDENT ROADMAP (overlay) =================\n\nmodel STUDENT_ROADMAPS {\n  id         Int                  @id @default(autoincrement())\n  user_id    String               @db.Uuid\n  roadmap_id Int\n  roadmap    MAJOR_ROADMAPS       @relation(fields: [roadmap_id], references: [id], onDelete: Restrict)\n  version_id Int\n  version    ROADMAP_VERSIONS     @relation(fields: [version_id], references: [id], onDelete: Restrict)\n  status     StudentRoadmapStatus @default(ENROLLED)\n  revision   Int                  @default(0)\n\n  termDeltas STUDENT_TERM_DELTAS[]\n  nodeDeltas STUDENT_NODE_DELTAS[]\n  edgeDeltas STUDENT_EDGE_DELTAS[]\n  results    STUDENT_COURSE_RESULTS[]\n  created_at DateTime                 @default(now())\n  updated_at DateTime                 @updatedAt\n\n  @@unique([user_id, roadmap_id])\n  @@index([version_id])\n  @@map(\"student_roadmaps\")\n}\n\nmodel STUDENT_TERM_DELTAS {\n  id                 Int              @id @default(autoincrement())\n  student_roadmap_id Int\n  studentRoadmap     STUDENT_ROADMAPS @relation(fields: [student_roadmap_id], references: [id], onDelete: Cascade)\n  term_key           String           @db.Uuid\n  origin             DeltaOrigin\n  kind               TermKind?\n  after_term_key     String?          @db.Uuid\n  custom_label       String?\n  academic_year      Int?\n  term_in_year       TermInYear?\n\n  @@unique([student_roadmap_id, term_key])\n  @@map(\"student_term_deltas\")\n}\n\nmodel STUDENT_NODE_DELTAS {\n  id                    Int              @id @default(autoincrement())\n  student_roadmap_id    Int\n  studentRoadmap        STUDENT_ROADMAPS @relation(fields: [student_roadmap_id], references: [id], onDelete: Cascade)\n  node_key              String           @db.Uuid\n  origin                DeltaOrigin\n  term_key              String?          @db.Uuid\n  row_order             Decimal?         @db.Decimal(12, 6)\n  course_id             Int?\n  course                COURSES?         @relation(fields: [course_id], references: [id], onDelete: Restrict)\n  custom_code           String?\n  custom_name           String?\n  custom_theory_credits Int?\n  custom_lab_credits    Int?\n  created_at            DateTime         @default(now())\n  updated_at            DateTime         @updatedAt\n\n  @@unique([student_roadmap_id, node_key])\n  @@index([course_id])\n  @@map(\"student_node_deltas\")\n}\n\nmodel STUDENT_EDGE_DELTAS {\n  id                 Int              @id @default(autoincrement())\n  student_roadmap_id Int\n  studentRoadmap     STUDENT_ROADMAPS @relation(fields: [student_roadmap_id], references: [id], onDelete: Cascade)\n  edge_key           String           @db.Uuid\n  source_node_key    String           @db.Uuid\n  target_node_key    String           @db.Uuid\n  type               RelationType\n\n  @@unique([student_roadmap_id, edge_key])\n  @@unique([student_roadmap_id, source_node_key, target_node_key])\n  @@map(\"student_edge_deltas\")\n}\n\nmodel STUDENT_COURSE_RESULTS {\n  id                 Int                @id @default(autoincrement())\n  student_roadmap_id Int\n  studentRoadmap     STUDENT_ROADMAPS   @relation(fields: [student_roadmap_id], references: [id], onDelete: Cascade)\n  node_key           String             @db.Uuid\n  status             CourseResultStatus\n  weight_process     Int?\n  weight_midterm     Int?\n  weight_final       Int?\n  score_process      Decimal?           @db.Decimal(4, 1)\n  score_midterm      Decimal?           @db.Decimal(4, 1)\n  score_final        Decimal?           @db.Decimal(4, 1)\n  total_score        Int?\n  is_passed          Boolean?\n  note               String?\n  created_at         DateTime           @default(now())\n  updated_at         DateTime           @updatedAt\n\n  @@unique([student_roadmap_id, node_key])\n  @@map(\"student_course_results\")\n}\n\n// ================= COURSE COMMENTS (post-moderation) =================\n\nmodel COURSE_COMMENTS {\n  id                   Int               @id @default(autoincrement())\n  course_id            Int\n  course               COURSES           @relation(fields: [course_id], references: [id], onDelete: Restrict)\n  parent_id            Int?\n  parent               COURSE_COMMENTS?  @relation(\"replies\", fields: [parent_id], references: [id], onDelete: Restrict)\n  replies              COURSE_COMMENTS[] @relation(\"replies\")\n  user_id              String            @db.Uuid\n  academic_year        Int?\n  author_display_name  String?\n  content              String            @db.Text\n  status               CommentStatus     @default(VISIBLE)\n  pending_report_count Int               @default(0)\n  edited_at            DateTime?\n  moderated_by         String?           @db.Uuid\n  moderated_at         DateTime?\n  moderation_reason    String?\n\n  reports    COURSE_COMMENT_REPORTS[]\n  created_at DateTime                 @default(now())\n  updated_at DateTime                 @updatedAt\n\n  @@index([course_id, parent_id, status, created_at])\n  @@index([status, pending_report_count])\n  @@index([user_id, created_at])\n  @@map(\"course_comments\")\n}\n\nmodel COURSE_COMMENT_REPORTS {\n  id          Int                 @id @default(autoincrement())\n  comment_id  Int\n  comment     COURSE_COMMENTS     @relation(fields: [comment_id], references: [id], onDelete: Cascade)\n  reporter_id String              @db.Uuid\n  reason      CommentReportReason\n  note        String?\n  status      CommentReportStatus @default(PENDING)\n  created_at  DateTime            @default(now())\n\n  @@unique([comment_id, reporter_id])\n  @@map(\"course_comment_reports\")\n}\n\n// ================= GRADING CONFIG =================\n\nmodel GRADE_SCALES {\n  id          Int      @id @default(autoincrement())\n  letter      String   @unique\n  min_score   Int\n  max_score   Int\n  grade_point Decimal  @db.Decimal(3, 2)\n  is_passing  Boolean\n  created_at  DateTime @default(now())\n  updated_at  DateTime @updatedAt\n\n  @@map(\"grade_scales\")\n}\n\n// Classification is decided on the 100-point GPA (IU handbook): min inclusive, max exclusive\n// (the highest band includes 100).\nmodel ACADEMIC_CLASSIFICATIONS {\n  id         Int      @id @default(autoincrement())\n  label_key  String   @unique\n  min_gpa100 Decimal  @db.Decimal(4, 1)\n  max_gpa100 Decimal  @db.Decimal(4, 1)\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  @@map(\"academic_classifications\")\n}\n",
  "inlineSchemaHash": "691805f045c6aa16da430a5059c6a745737a5e62ad4b1ea899e02afc15484319",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"DEPARTMENTS\":{\"dbName\":\"departments\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"slug\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"majors\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MAJOR_ROADMAPS\",\"relationName\":\"DEPARTMENTSToMAJOR_ROADMAPS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lecturers\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LECTURERS\",\"relationName\":\"DEPARTMENTSToLECTURERS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"MAJOR_ROADMAPS\":{\"dbName\":\"major_roadmaps\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"slug\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DEPARTMENTS\",\"relationName\":\"DEPARTMENTSToMAJOR_ROADMAPS\",\"relationFromFields\":[\"department_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"versions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ROADMAP_VERSIONS\",\"relationName\":\"MAJOR_ROADMAPSToROADMAP_VERSIONS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"studentRoadmaps\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"STUDENT_ROADMAPS\",\"relationName\":\"MAJOR_ROADMAPSToSTUDENT_ROADMAPS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"COURSE_CATEGORIES\":{\"dbName\":\"course_categories\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fill_color\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"border_color\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sort_order\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courses\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSES\",\"relationName\":\"COURSESToCOURSE_CATEGORIES\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"COURSES\":{\"dbName\":\"courses\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"theory_credits\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lab_credits\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSE_CATEGORIES\",\"relationName\":\"COURSESToCOURSE_CATEGORIES\",\"relationFromFields\":[\"category_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"grading_mode\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"GradingMode\",\"default\":\"SCORE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"counts_toward_gpa\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"counts_toward_credits\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"roadmapNodes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ROADMAP_NODES\",\"relationName\":\"COURSESToROADMAP_NODES\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"studentNodeDeltas\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"STUDENT_NODE_DELTAS\",\"relationName\":\"COURSESToSTUDENT_NODE_DELTAS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"offerings\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSE_OFFERINGS\",\"relationName\":\"COURSESToCOURSE_OFFERINGS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSE_COMMENTS\",\"relationName\":\"COURSESToCOURSE_COMMENTS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"COURSE_OFFERINGS\":{\"dbName\":\"course_offerings\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSES\",\"relationName\":\"COURSESToCOURSE_OFFERINGS\",\"relationFromFields\":[\"course_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"academic_year\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"OfferingStatus\",\"default\":\"DRAFT\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"student_guide\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"syllabus_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"weight_process\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"weight_midterm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"weight_final\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"has_project\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"project_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"copied_from_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lecturers\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSE_OFFERING_LECTURERS\",\"relationName\":\"COURSE_OFFERINGSToCOURSE_OFFERING_LECTURERS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"topics\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSE_TOPICS_NODE\",\"relationName\":\"COURSE_OFFERINGSToCOURSE_TOPICS_NODE\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[[\"course_id\",\"academic_year\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"course_id\",\"academic_year\"]}],\"isGenerated\":false},\"LECTURERS\":{\"dbName\":\"lecturers\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"full_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DEPARTMENTS\",\"relationName\":\"DEPARTMENTSToLECTURERS\",\"relationFromFields\":[\"department_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"LecturerStatus\",\"default\":\"ACTIVE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"offerings\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSE_OFFERING_LECTURERS\",\"relationName\":\"COURSE_OFFERING_LECTURERSToLECTURERS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"COURSE_OFFERING_LECTURERS\":{\"dbName\":\"course_offering_lecturers\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"offering_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"offering\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSE_OFFERINGS\",\"relationName\":\"COURSE_OFFERINGSToCOURSE_OFFERING_LECTURERS\",\"relationFromFields\":[\"offering_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lecturer_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lecturer\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LECTURERS\",\"relationName\":\"COURSE_OFFERING_LECTURERSToLECTURERS\",\"relationFromFields\":[\"lecturer_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"LecturerRole\",\"default\":\"LECTURER\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"term_in_year\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TermInYear\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"offering_id\",\"lecturer_id\",\"term_in_year\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"offering_id\",\"lecturer_id\",\"term_in_year\"]}],\"isGenerated\":false},\"ROADMAP_VERSIONS\":{\"dbName\":\"roadmap_versions\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"roadmap_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"roadmap\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MAJOR_ROADMAPS\",\"relationName\":\"MAJOR_ROADMAPSToROADMAP_VERSIONS\",\"relationFromFields\":[\"roadmap_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cohort_year\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"revision_no\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"total_credits\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"decision_ref\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"RoadmapVersionStatus\",\"default\":\"DRAFT\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"revision\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"published_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"published_by\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"terms\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ROADMAP_TERMS\",\"relationName\":\"ROADMAP_TERMSToROADMAP_VERSIONS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nodes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ROADMAP_NODES\",\"relationName\":\"ROADMAP_NODESToROADMAP_VERSIONS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"edges\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ROADMAP_EDGES\",\"relationName\":\"ROADMAP_EDGESToROADMAP_VERSIONS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"studentRoadmaps\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"STUDENT_ROADMAPS\",\"relationName\":\"ROADMAP_VERSIONSToSTUDENT_ROADMAPS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[[\"roadmap_id\",\"cohort_year\",\"revision_no\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"roadmap_id\",\"cohort_year\",\"revision_no\"]}],\"isGenerated\":false},\"ROADMAP_TERMS\":{\"dbName\":\"roadmap_terms\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"version_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"version\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ROADMAP_VERSIONS\",\"relationName\":\"ROADMAP_TERMSToROADMAP_VERSIONS\",\"relationFromFields\":[\"version_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"term_key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"order_index\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"kind\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TermKind\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"semester_no\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nodes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ROADMAP_NODES\",\"relationName\":\"ROADMAP_NODESToROADMAP_TERMS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"version_id\",\"term_key\"],[\"version_id\",\"order_index\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"version_id\",\"term_key\"]},{\"name\":null,\"fields\":[\"version_id\",\"order_index\"]}],\"isGenerated\":false},\"ROADMAP_NODES\":{\"dbName\":\"roadmap_nodes\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"version_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"version\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ROADMAP_VERSIONS\",\"relationName\":\"ROADMAP_NODESToROADMAP_VERSIONS\",\"relationFromFields\":[\"version_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"node_key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"term_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"term\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ROADMAP_TERMS\",\"relationName\":\"ROADMAP_NODESToROADMAP_TERMS\",\"relationFromFields\":[\"term_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"row_index\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"kind\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RoadmapNodeKind\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSES\",\"relationName\":\"COURSESToROADMAP_NODES\",\"relationFromFields\":[\"course_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"slot_label\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"slot_theory_credits\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"slot_lab_credits\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"elective_group\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"choice_group\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"condition\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"edgesOut\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ROADMAP_EDGES\",\"relationName\":\"source\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"edgesIn\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ROADMAP_EDGES\",\"relationName\":\"target\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"version_id\",\"node_key\"],[\"term_id\",\"row_index\"],[\"version_id\",\"course_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"version_id\",\"node_key\"]},{\"name\":null,\"fields\":[\"term_id\",\"row_index\"]},{\"name\":null,\"fields\":[\"version_id\",\"course_id\"]}],\"isGenerated\":false},\"ROADMAP_EDGES\":{\"dbName\":\"roadmap_edges\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"version_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"version\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ROADMAP_VERSIONS\",\"relationName\":\"ROADMAP_EDGESToROADMAP_VERSIONS\",\"relationFromFields\":[\"version_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"edge_key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"source_node_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sourceNode\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ROADMAP_NODES\",\"relationName\":\"source\",\"relationFromFields\":[\"source_node_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"target_node_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"targetNode\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ROADMAP_NODES\",\"relationName\":\"target\",\"relationFromFields\":[\"target_node_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RelationType\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"version_id\",\"edge_key\"],[\"source_node_id\",\"target_node_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"version_id\",\"edge_key\"]},{\"name\":null,\"fields\":[\"source_node_id\",\"target_node_id\"]}],\"isGenerated\":false},\"COURSE_TOPICS_NODE\":{\"dbName\":\"course_topics_node\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"offering_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"offering\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSE_OFFERINGS\",\"relationName\":\"COURSE_OFFERINGSToCOURSE_TOPICS_NODE\",\"relationFromFields\":[\"offering_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"slug\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"coords\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"learning_objectives\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resources_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"estimated_hours\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"topicEdgesAsSource\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSE_TOPICS_EDGE\",\"relationName\":\"source\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"topicEdgesAsTarget\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSE_TOPICS_EDGE\",\"relationName\":\"target\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[[\"offering_id\",\"slug\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"offering_id\",\"slug\"]}],\"isGenerated\":false},\"COURSE_TOPICS_EDGE\":{\"dbName\":\"course_topics_edge\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"source_topic_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sourceTopic\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSE_TOPICS_NODE\",\"relationName\":\"source\",\"relationFromFields\":[\"source_topic_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"target_topic_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"targetTopic\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSE_TOPICS_NODE\",\"relationName\":\"target\",\"relationFromFields\":[\"target_topic_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"source_topic_id\",\"target_topic_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"source_topic_id\",\"target_topic_id\"]}],\"isGenerated\":false},\"STUDENT_ROADMAPS\":{\"dbName\":\"student_roadmaps\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"roadmap_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"roadmap\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MAJOR_ROADMAPS\",\"relationName\":\"MAJOR_ROADMAPSToSTUDENT_ROADMAPS\",\"relationFromFields\":[\"roadmap_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"version_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"version\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ROADMAP_VERSIONS\",\"relationName\":\"ROADMAP_VERSIONSToSTUDENT_ROADMAPS\",\"relationFromFields\":[\"version_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"StudentRoadmapStatus\",\"default\":\"ENROLLED\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"revision\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"termDeltas\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"STUDENT_TERM_DELTAS\",\"relationName\":\"STUDENT_ROADMAPSToSTUDENT_TERM_DELTAS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nodeDeltas\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"STUDENT_NODE_DELTAS\",\"relationName\":\"STUDENT_NODE_DELTASToSTUDENT_ROADMAPS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"edgeDeltas\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"STUDENT_EDGE_DELTAS\",\"relationName\":\"STUDENT_EDGE_DELTASToSTUDENT_ROADMAPS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"results\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"STUDENT_COURSE_RESULTS\",\"relationName\":\"STUDENT_COURSE_RESULTSToSTUDENT_ROADMAPS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[[\"user_id\",\"roadmap_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"user_id\",\"roadmap_id\"]}],\"isGenerated\":false},\"STUDENT_TERM_DELTAS\":{\"dbName\":\"student_term_deltas\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"student_roadmap_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"studentRoadmap\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"STUDENT_ROADMAPS\",\"relationName\":\"STUDENT_ROADMAPSToSTUDENT_TERM_DELTAS\",\"relationFromFields\":[\"student_roadmap_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"term_key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"origin\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DeltaOrigin\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"kind\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TermKind\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"after_term_key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"custom_label\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"academic_year\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"term_in_year\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TermInYear\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"student_roadmap_id\",\"term_key\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"student_roadmap_id\",\"term_key\"]}],\"isGenerated\":false},\"STUDENT_NODE_DELTAS\":{\"dbName\":\"student_node_deltas\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"student_roadmap_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"studentRoadmap\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"STUDENT_ROADMAPS\",\"relationName\":\"STUDENT_NODE_DELTASToSTUDENT_ROADMAPS\",\"relationFromFields\":[\"student_roadmap_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"node_key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"origin\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DeltaOrigin\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"term_key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"row_order\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSES\",\"relationName\":\"COURSESToSTUDENT_NODE_DELTAS\",\"relationFromFields\":[\"course_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"custom_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"custom_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"custom_theory_credits\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"custom_lab_credits\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[[\"student_roadmap_id\",\"node_key\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"student_roadmap_id\",\"node_key\"]}],\"isGenerated\":false},\"STUDENT_EDGE_DELTAS\":{\"dbName\":\"student_edge_deltas\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"student_roadmap_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"studentRoadmap\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"STUDENT_ROADMAPS\",\"relationName\":\"STUDENT_EDGE_DELTASToSTUDENT_ROADMAPS\",\"relationFromFields\":[\"student_roadmap_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"edge_key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"source_node_key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"target_node_key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RelationType\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"student_roadmap_id\",\"edge_key\"],[\"student_roadmap_id\",\"source_node_key\",\"target_node_key\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"student_roadmap_id\",\"edge_key\"]},{\"name\":null,\"fields\":[\"student_roadmap_id\",\"source_node_key\",\"target_node_key\"]}],\"isGenerated\":false},\"STUDENT_COURSE_RESULTS\":{\"dbName\":\"student_course_results\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"student_roadmap_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"studentRoadmap\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"STUDENT_ROADMAPS\",\"relationName\":\"STUDENT_COURSE_RESULTSToSTUDENT_ROADMAPS\",\"relationFromFields\":[\"student_roadmap_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"node_key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CourseResultStatus\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"weight_process\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"weight_midterm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"weight_final\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"score_process\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"score_midterm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"score_final\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"total_score\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"is_passed\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"note\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[[\"student_roadmap_id\",\"node_key\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"student_roadmap_id\",\"node_key\"]}],\"isGenerated\":false},\"COURSE_COMMENTS\":{\"dbName\":\"course_comments\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSES\",\"relationName\":\"COURSESToCOURSE_COMMENTS\",\"relationFromFields\":[\"course_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parent_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parent\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSE_COMMENTS\",\"relationName\":\"replies\",\"relationFromFields\":[\"parent_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"replies\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSE_COMMENTS\",\"relationName\":\"replies\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"academic_year\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"author_display_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"CommentStatus\",\"default\":\"VISIBLE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pending_report_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"edited_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"moderated_by\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"moderated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"moderation_reason\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reports\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSE_COMMENT_REPORTS\",\"relationName\":\"COURSE_COMMENTSToCOURSE_COMMENT_REPORTS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"COURSE_COMMENT_REPORTS\":{\"dbName\":\"course_comment_reports\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comment_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comment\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSE_COMMENTS\",\"relationName\":\"COURSE_COMMENTSToCOURSE_COMMENT_REPORTS\",\"relationFromFields\":[\"comment_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reporter_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reason\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CommentReportReason\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"note\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"CommentReportStatus\",\"default\":\"PENDING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"comment_id\",\"reporter_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"comment_id\",\"reporter_id\"]}],\"isGenerated\":false},\"GRADE_SCALES\":{\"dbName\":\"grade_scales\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"letter\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"min_score\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"max_score\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"grade_point\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"is_passing\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ACADEMIC_CLASSIFICATIONS\":{\"dbName\":\"academic_classifications\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"label_key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"min_gpa100\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"max_gpa100\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"RoadmapVersionStatus\":{\"values\":[{\"name\":\"DRAFT\",\"dbName\":null},{\"name\":\"PUBLISHED\",\"dbName\":null},{\"name\":\"ARCHIVED\",\"dbName\":null}],\"dbName\":null},\"TermKind\":{\"values\":[{\"name\":\"REGULAR\",\"dbName\":null},{\"name\":\"SUMMER\",\"dbName\":null},{\"name\":\"ELECTIVE_POOL\",\"dbName\":null}],\"dbName\":null},\"RoadmapNodeKind\":{\"values\":[{\"name\":\"COURSE\",\"dbName\":null},{\"name\":\"ELECTIVE_SLOT\",\"dbName\":null}],\"dbName\":null},\"RelationType\":{\"values\":[{\"name\":\"PREREQUISITE\",\"dbName\":null},{\"name\":\"PREVIOUS\",\"dbName\":null},{\"name\":\"COREQUISITE\",\"dbName\":null}],\"dbName\":null},\"StudentRoadmapStatus\":{\"values\":[{\"name\":\"ENROLLED\",\"dbName\":null},{\"name\":\"COMPLETED\",\"dbName\":null},{\"name\":\"DROPPED\",\"dbName\":null}],\"dbName\":null},\"DeltaOrigin\":{\"values\":[{\"name\":\"BASE\",\"dbName\":null},{\"name\":\"CUSTOM\",\"dbName\":null}],\"dbName\":null},\"CourseResultStatus\":{\"values\":[{\"name\":\"IN_PROGRESS\",\"dbName\":null},{\"name\":\"GRADED\",\"dbName\":null}],\"dbName\":null},\"GradingMode\":{\"values\":[{\"name\":\"SCORE\",\"dbName\":null},{\"name\":\"PASS_FAIL\",\"dbName\":null}],\"dbName\":null},\"OfferingStatus\":{\"values\":[{\"name\":\"DRAFT\",\"dbName\":null},{\"name\":\"PUBLISHED\",\"dbName\":null}],\"dbName\":null},\"TermInYear\":{\"values\":[{\"name\":\"SEMESTER_1\",\"dbName\":null},{\"name\":\"SEMESTER_2\",\"dbName\":null},{\"name\":\"SUMMER\",\"dbName\":null}],\"dbName\":null},\"LecturerRole\":{\"values\":[{\"name\":\"LECTURER\",\"dbName\":null},{\"name\":\"TA\",\"dbName\":null}],\"dbName\":null},\"LecturerStatus\":{\"values\":[{\"name\":\"ACTIVE\",\"dbName\":null},{\"name\":\"INACTIVE\",\"dbName\":null},{\"name\":\"RETIRED\",\"dbName\":null}],\"dbName\":null},\"CommentStatus\":{\"values\":[{\"name\":\"VISIBLE\",\"dbName\":null},{\"name\":\"FLAGGED\",\"dbName\":null},{\"name\":\"HIDDEN\",\"dbName\":null},{\"name\":\"DELETED\",\"dbName\":null}],\"dbName\":null},\"CommentReportReason\":{\"values\":[{\"name\":\"SPAM\",\"dbName\":null},{\"name\":\"OFFENSIVE\",\"dbName\":null},{\"name\":\"OFF_TOPIC\",\"dbName\":null},{\"name\":\"MISINFORMATION\",\"dbName\":null},{\"name\":\"OTHER\",\"dbName\":null}],\"dbName\":null},\"CommentReportStatus\":{\"values\":[{\"name\":\"PENDING\",\"dbName\":null},{\"name\":\"REVIEWED\",\"dbName\":null},{\"name\":\"DISMISSED\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    ADMIN_DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['ADMIN_DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.ADMIN_DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

