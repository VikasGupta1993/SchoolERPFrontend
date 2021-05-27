export const PASSWORD_FIELD = {
  minLength: 6,
  maxLength: 16,
};

export const PHONE_FIELD = {
  minLength: 7,
  maxLength: 15,
  maskPattern: '999999999999999',
};

export const FAX_FIELD = {
  minLength: 7,
  maxLength: 15,
  maskPattern: '000-000-0000',
};

export const DESCRIPTION_FIELD = {
  minLength: 1,
  maxLength: 100,
};

export const USER_FIELDS = {
  USERNAME_FIELD: {
    minLength: 3,
    maxLength: 32,
    maskPattern: 'A*',
  },
  NAME_FIELD: {
    minLength: 3,
    maxLength: 32,
    maskPattern: 'A*{32}',
  },
  TITLE_FIELD: {
    minLength: 2,
    maxLength: 200,
  },
  ABOUT_FIELD: {
    minLength: 0,
    maxLength: 2000,
  },
  COMPANY_FIELD: {
    minLength: 0,
    maxLength: 100,
  },
  LICENSE_FIELD: {
    minLength: 0,
    maxLength: 50,
  },
  LANGUAGES_FIELD: {
    minLength: 0,
    maxLength: 200,
  },
};

export const EMAIL_FIELD = {
  minLength: 3,
  maxLength: 254,
};

export const ZIP_CODE_FIELD = {
  minLength: 3,
  maxLength: 4,
  maskPattern: '9000',
};

export const SEARCH_FIELD = {
  minLength: 0,
  maxLength: 100,
};

export const FORM_LIMITS = {
  MAX_NAME_LENGTH: 50,
  MAX_POINT_LENGTH: 15,
  MAX_TIME_LENGTH: 5,
  NOTE_MAX: 500,
};

