import React from "react";
import { FormFieldType } from "../../types/FormFieldTypes";
import { useForm } from "@mantine/form";
import {
  Button,
  Card,
  Group,
  TextInput,
  Title,
  Checkbox,
  MultiSelect,
} from "@mantine/core";
import sourceRecordAPIClient from "../../APIClients/SourceRecordAPIClient";

export type FormProps = {
  formId: string;
  name: string;
  fields: Record<string, FormFieldType>[];
};

function Form({ formId, name, fields }: FormProps) {
  const transformedFields = Object.entries(fields).map(([id, field]) => ({
    id: id,
    type: field.type,
    question: field.question,
    required: field.required,
    options: field.options ? field.options : [],
  }));

  const initialValues = transformedFields.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, []);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: initialValues,
  });

  const mapQuestionToAnswer = (
    values: typeof form.values,
    field: {
      id: any;
      type: string;
      question: string;
      required: boolean;
      options: string[];
    }
  ) => {
    return {
      question: field.question.toString(),
      answer: values[field.id],
    };
  };

  const handleSubmit = (values: typeof form.values) => {
    const questions = transformedFields.map((field) =>
      mapQuestionToAnswer(values, field)
    );
    console.log(questions);
    sourceRecordAPIClient.post(formId, questions);
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "var(--black-secondary)",
      }}
    >
      <Title order={1} style={{ marginBottom: "20px" }}>
        {name}
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {transformedFields.map((field) => (
          <div key={field.id} style={{ marginBottom: "10px" }}>
            {field.type.toString() === "text" && (
              <TextInput
                required={field.required}
                label={field.question}
                placeholder="input here"
                key={form.key(field.id)}
                {...form.getInputProps(field.id)}
              />
            )}
            {field.type.toString() === "checkbox" && (
              <Checkbox
                required={field.required}
                label={field.question}
                key={form.key(field.id)}
                {...form.getInputProps(field.id, {
                  type: "checkbox",
                })}
              />
            )}
            {field.type.toString() === "date" && (
              <TextInput
                required={field.required}
                label={field.question}
                placeholder="date here"
                type="date"
                key={form.key(field.id)}
                {...form.getInputProps(field.id)}
              />
            )}
            {field.type.toString() === "multiselect" && (
              <MultiSelect
                clearable
                required={field.required}
                label={field.question}
                placeholder="pick options"
                data={field.options}
                onChange={(newValues) =>
                  form.setFieldValue(field.id, newValues)
                }
              />
            )}
          </div>
        ))}
        <Group justify="flex-end" mt="md">
          <Button color="violet" type="submit">
            Submit
          </Button>
        </Group>
      </form>
    </Card>
  );
}

export default Form;
