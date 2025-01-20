import baseAPIClient from "./BaseAPIClient";
import { Forms, FormType } from "../types/FormType";
import { FormField } from "../types/FormFieldTypes";

interface Form {
  name: string;
  fields: object;
}

interface Field {
  id: any;
  type: string;
  question: string;
  required: boolean;
  options?: string[];
}

const getById = async (form_id: string): Promise<FormType> => {
  try {
    const response = await baseAPIClient.get(`/form/${form_id}`);
    const data: FormType = await response.data.data;

    const mappedData: FormType = {
      id: data.id,
      name: data.name,
      fields: data.fields,
    };

    return mappedData;
  } catch (error) {
    throw new Error("Error: given id, can't get form");
  }
};

const getAllForms = async (): Promise<Forms> => {
  try {
    const response = await baseAPIClient.get(`/form`);
    const data: Forms = await response.data.data;

    const mappedForms: Forms = data.map((form) => ({
      id: form.id,
      name: form.name,
      fields: form.fields,
    }));
    return mappedForms;
  } catch (error) {
    throw new Error("Error: can't get forms");
  }
};

const post = async (name: string, fields: Field[]): Promise<FormType> => {
  try {
    const fieldMap = fields.reduce((acc: FormField, field: Field) => {
      acc[field.id] = {
        type: field.type,
        question: field.question,
        required: field.required,
        options: field.options ? field.options : [],
      };
      return acc;
    }, {});

    let formData = {
      name: name,
      fields: fieldMap,
    };

    const response = await baseAPIClient.post("/form", formData);
    const data = await response.data.data;
    const mappedForm: FormType = {
      id: data.id,
      name: data.name,
      fields: data.fields,
    };
    alert("form successfully created !");
    return mappedForm;
  } catch (error) {
    throw new Error("Error: cannot generate new form");
  }
};

export default { getById, getAllForms, post };
