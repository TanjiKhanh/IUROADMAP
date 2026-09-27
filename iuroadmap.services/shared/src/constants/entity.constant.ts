export const EntityConstant = {
  Short: 10,
  EnumLength: 20,
  UserNameMax: 30,
  UserNameMin: 6,
  PasswordMax: 30,
  PasswordMin: 6,

  /**
   * Length is 200
   */
  FilePath: 200,

  /**
   * Length is 100
   */
  ShortString: 100,

  /**
   * Length is 200
   */
  LongString: 200,

  /**
   * Length is 500
   */
  DescriptionShort: 500,

  /**
   * Length is 1000
   */
  DescriptionLong: 1000,

  /**
   * Length is 5000
   */
  DescriptionVeryLong: 5000,

  /**
   * Phone number maximum length (12)
   */
  PhoneNumber: 12,

  /**
   * Minimum length for phone number fields (10)
   */
  PhoneNumberMin: 10,

  /**
   * Length is 100
   */
  Fullname: 100,

  /**
   * Minimum length for person full-name fields
   */
  FullnameMin: 5,

  /**
   * Minimum length for short name fields (role, code, etc.)
   */
  NameMin: 2,

  /**
   * Length is 100
   */
  Email: 100,

  // ================= Roadmap v2 =================

  /**
   * Course code, e.g. "IT013IU" (max 20)
   */
  CourseCode: 20,

  /**
   * Hex color "#RRGGBB" (exactly 7)
   */
  HexColor: 7,

  /**
   * Custom term label, e.g. "IE1 – Intensive English" (max 50)
   */
  TermLabel: 50,

  /**
   * Curriculum decision reference, e.g. "89/QĐ-ĐHQT.07.03.2022" (max 100)
   */
  DecisionRef: 100,

  /**
   * Lecturer academic title, e.g. "PGS.TS" (max 30)
   */
  LecturerTitle: 30,

  /**
   * Elective group code, e.g. "CS1" (max 30)
   */
  ElectiveGroup: 30,

  /**
   * Course comment content (max 2000)
   */
  CourseCommentContent: 2000,

  /**
   * Free-text note on a comment report or a course result (max 500)
   */
  ShortNote: 500,
} as const;
