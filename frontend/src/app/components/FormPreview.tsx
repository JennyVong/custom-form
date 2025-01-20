"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TextInput, Checkbox, Button, Switch, Card } from "@mantine/core";
import DropZone from "./DropZone";
import FormAPIClient from "../APIClients/FormAPIClient";

interface Field {
  id: string;
  type: string;
  question: string;
  required: boolean;
}

function FormPreview() {
  const [name, setName] = useState<string>("");
  const [fields, setFields] = useState<Field[]>([]);

  // Handle drop logic
  const handleDrop = (item: any, index: number) => {
    const newField: Field = {
      id: uuidv4(),
      type: item.type,
      question: "",
      required: false,
    };
    setFields((prev) => {
      if (index >= prev.length) {
        return [...prev, newField];
      }
      return [...prev.slice(0, index), newField, ...prev.slice(index)];
    });
  };

  const toggleRequired = (id: string) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, required: !field.required } : field
      )
    );
  };

  const updateLabel = (id: string, newLabel: string) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, question: newLabel } : field
      )
    );
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
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
      {/* Name of Form Input */}
      <TextInput
        label="Form name"
        required
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        variant="unstyled"
        size="lg"
        placeholder="Untitled Form"
        style={{
          marginBottom: "20px",
          input: {
            fontSize: "24px",
            fontWeight: "bold",
          },
        }}
      />
      <div
        style={{
          minHeight: "400px",
          border: "2px dashed var(--black-tertiary)",
          borderRadius: "8px",
          backgroundColor: "var(--black-secondary)",
          padding: "20px",
        }}
      >
        {/* Iterate through fields and create drop zones */}
        {fields.map((field, index) => (
          <DropZone key={`zone-${index}`} index={index} onDrop={handleDrop}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {/* Editable Label */}
              <TextInput
                variant="unstyled"
                placeholder="label input"
                value={field.question}
                onChange={(e) => updateLabel(field.id, e.currentTarget.value)}
                style={{ marginBottom: "5px", flex: 1 }}
              />
              {/* Required Toggle */}
              <div style={{ marginTop: "5px" }}>
                <Switch
                  label="Required"
                  color="violet"
                  checked={field.required}
                  onChange={() => toggleRequired(field.id)}
                />
              </div>
            </div>
            {/* Render the actual field */}
            <div style={{ marginBottom: "10px" }}>
              {field.type === "text" && <TextInput placeholder="Text Field" />}
              {field.type === "checkbox" && <Checkbox label="Checkbox" />}
              {field.type === "date" && (
                <TextInput placeholder="Date Field" type="date" />
              )}
            </div>
            {/* Remove Field Button */}
            <Button
              size="xs"
              color="violet"
              variant="transparent"
              onClick={() => removeField(field.id)}
              style={{ padding: "0px" }}
            >
              X remove field
            </Button>
          </DropZone>
        ))}
        <DropZone
          key={`zone-${fields.length}`}
          index={fields.length}
          onDrop={handleDrop}
        ></DropZone>
        {fields.length > 0 && (
          <Button
            onClick={() => FormAPIClient.post(name, fields)}
            style={{ marginTop: "20px" }}
            disabled={name.length <= 0}
            fullWidth
            color="violet"
          >
            Save Form
          </Button>
        )}
      </div>
    </Card>
  );
}

export default FormPreview;
