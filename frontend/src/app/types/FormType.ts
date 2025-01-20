import { FormFields } from "./FormFieldTypes";

export type FormType = {
  id: string;
  name: string;
  fields: FormFields;
};

export type Forms = FormType[];
