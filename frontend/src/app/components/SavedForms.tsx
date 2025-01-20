import { Card, Text } from "@mantine/core";
import { FormFields } from "../types/FormFieldTypes";
import { FormType } from "../types/FormType";

interface SavedFormsProps {
  id: string;
  name: string;
  fields: FormFields;
  onFormSelect: (form: FormType) => void;
}

function SavedForms({ id, name, fields, onFormSelect }: SavedFormsProps) {
  const form = {
    id: id,
    name: name,
    fields: fields,
  };
  return (
    <Card
      onClick={() => onFormSelect(form)}
      padding="md"
      style={{
        cursor: "click",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Text weight={500}>{name}</Text>
    </Card>
  );
}

export default SavedForms;
