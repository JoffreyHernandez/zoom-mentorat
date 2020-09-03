export interface Value {
  date: string;
  fullName: string;
  pwd: string;
}

export interface Original {
  date: string;
  fullName: string;
  pwd: string;
}

export interface Context {
  label: string;
  key: string;
}

export interface Detail {
  message: string;
  path: string[];
  type: string;
  context: Context;
}

export interface Error {
  _original: Original;
  details: Detail[];
}

export interface JoiValidation {
  value: Value;
  error?: Error;
}
