export type FormFieldType = {
  type: string;
  question: string;
  required: boolean;
};

export type FormField = Record<string, FormFieldType>;

export type FormFields = FormField[];
