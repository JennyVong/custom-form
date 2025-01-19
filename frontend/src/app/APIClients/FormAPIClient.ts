import baseAPIClient from "./BaseAPIClient";
import { FormType } from "../types/FormType";
import { FormField } from "../types/FormFieldTypes";

interface Form {
  id: string;
  name: string;
  fields: object;
}

interface Field {
  id: any;
  type: string;
  question: string;
  required: boolean;
}

const getById = async (form_id: string): Promise<FormType> => {
  try {
    const response = await baseAPIClient.get(`/form/${form_id}`);
    const data: Form = await response.data.data;

    const mappedData: FormType = {
      name: data.name,
      fields: data.fields,
    };

    return mappedData;
  } catch (error) {
    throw new Error("Error: given id, can't get form");
  }
};

const post = async (name: string, fields: Field[]): Promise<Form> => {
  try {
    const fieldMap = fields.reduce((acc: FormField, field: Field) => {
      acc[field.id] = {
        type: field.type,
        question: field.question,
        required: field.required,
      };
      return acc;
    }, {});

    let formData = {
      name: name,
      fields: fieldMap,
    };

    console.log(formData);
    const response = await baseAPIClient.post("/form", formData);
    const data = await response.data.data;
    const mappedForm: Form = {
      id: data.id,
      name: data.name,
      fields: data.fields,
    };
    console.log(mappedForm);
    return mappedForm;
  } catch (error) {
    throw new Error("Error: cannot generate new form");
  }
};

export default { getById, post };
