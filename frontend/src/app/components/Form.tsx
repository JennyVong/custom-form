import React from "react";
import { FormFields, FormFieldType } from "../types/FormFieldTypes";
import { useForm } from "@mantine/form";
import { Button, Card, Group, TextInput, Title } from "@mantine/core";
import sourceRecordAPIClient from "../APIClients/SourceRecordAPIClient";

export type FormProps = {
  formId: string;
  name: string;
  fields: FormFields;
};

interface FormField {
  id: string;
  type: string;
  question: string;
  required: boolean;
}

function Form({ formId, name, fields }: FormProps) {
  const transformedFields = Object.entries(fields).map(([id, field]) => ({
    id: id,
    type: field.type,
    question: field.question,
    required: field.required,
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
      type: FormFieldType;
      question: FormFieldType;
      required: FormFieldType;
    }
  ) => {
    console.log(values[field.id]);
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
        {transformedFields.map((field) =>
          field.required ? (
            <div key={field.id} style={{ marginBottom: "10px" }}>
              {field.type.toString() === "text" && (
                <TextInput
                  required
                  label={field.question.toString()}
                  placeholder="input here"
                  key={form.key(field.id.toString())}
                  {...form.getInputProps(field.id.toString())}
                />
              )}
              {field.type.toString() === "date" && (
                <TextInput
                  required
                  label={field.question.toString()}
                  placeholder="date here"
                  type="date"
                  key={form.key(field.id.toString())}
                  {...form.getInputProps(field.id.toString())}
                />
              )}
            </div>
          ) : (
            <div key={field.id} style={{ marginBottom: "10px" }}>
              {field.type.toString() === "text" && (
                <TextInput
                  label={field.question.toString()}
                  placeholder="input here"
                  key={form.key(field.id.toString())}
                  {...form.getInputProps(field.id.toString())}
                />
              )}
              {field.type.toString() === "date" && (
                <TextInput
                  label={field.question.toString()}
                  placeholder="date here"
                  type="date"
                  key={form.key(field.id.toString())}
                  {...form.getInputProps(field.id.toString())}
                />
              )}
            </div>
          )
        )}
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
