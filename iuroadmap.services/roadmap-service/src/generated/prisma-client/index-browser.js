
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


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

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

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
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
