export type FormFieldType = {
  type: string;
  question: string;
  required: boolean;
  options?: string[];
};

export type FormField = Record<
  string,
  {
    type: string;
    question: string;
    required: boolean;
    options?: string[];
  }
>;

export type FormFields = FormField[];
