import { FormFieldType } from "./FormFieldTypes";

export type FormType = {
  id: string;
  name: string;
  fields: Record<string, FormFieldType>[];
};

export type Forms = FormType[];
