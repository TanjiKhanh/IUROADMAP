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
} as const;

export type EntityConstantKey = keyof typeof EntityConstant;
