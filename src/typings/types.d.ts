export interface Field {
  id: number;
  type: string;
  label: string;
  value: string;

  size: number;
  maxlength: number;
  minlength: number;
  max: string | number;
  min: string | number;
  step: string | number;

  rows: number;
  cols: number;

  // checked: boolean;
  accept: string;

  pattern: string;
  placeholder: string;

  multiple: boolean;

  required: boolean;
}

export interface Attributes {
  value: boolean;
  placeholder: boolean;

  size: boolean;

  maxlength: boolean;
  minlength: boolean;

  max: boolean;
  min: boolean;
  step: boolean;

  rows?: boolean;
  cols?: boolean;
  // checked?: boolean;
  accept?: boolean;

  pattern: boolean;

  multiple: boolean;

  required: boolean;
}

export interface CodeSnippets {
  template: string;
  script: string;
  info: string;
}

export type MyIcon = 'content_copy' | 'code'