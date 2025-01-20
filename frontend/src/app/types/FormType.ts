import { FormFieldType } from "./FormFieldTypes";

export type FormType = {
  id: string;
  name: string;
  fields: FormFieldType[];
};

export type Forms = FormType[];
