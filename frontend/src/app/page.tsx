"use client";

import { useEffect, useState } from "react";
import FormPreview from "./components/FormPreview";
import styles from "./page.module.css";
import { Container, FloatingIndicator, Tabs, Title } from "@mantine/core";
import {
  DateField,
  Checkbox,
  TextField,
} from "./components/drag/DragComponent";
import { Forms, FormType } from "./types/FormType";
import formAPIClient from "./APIClients/FormAPIClient";
import SavedForms from "./components/SavedForms";
import Form from "./components/Form";

export default function Home() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>("1");
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const [forms, setForms] = useState<Forms | []>([]);
  const [selectedForm, setForm] = useState<FormType>();

  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  const handleFormSelect = (form: FormType) => {
    setForm(form);
    console.log(form);
  };

  useEffect(() => {
    const fetchForms = async () => {
      const collectedForms = await formAPIClient.getAllForms();
      setForms(collectedForms);
    };
    fetchForms();
  }, []);

  return (
    <div className={styles.page}>
      <Container
        fluid
        style={{
          display: "flex",
          height: "100vh",
          padding: 0,
          backgroundColor: "var(--black-primary)",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: "300px",
            backgroundColor: "#2C2C2C",
            borderRight: "1px solid var(--black-tertiary)",
            padding: "20px",
          }}
        >
          <Title order={1} style={{ marginBottom: "20px" }}>
            Form Builder
          </Title>
          <Tabs variant="none" value={value} onChange={setValue}>
            <Tabs.List ref={setRootRef} className={styles.list}>
              <Tabs.Tab
                value="1"
                ref={setControlRef("1")}
                className={styles.tab}
              >
                Assets
              </Tabs.Tab>
              <Tabs.Tab
                value="2"
                ref={setControlRef("2")}
                className={styles.tab}
              >
                Forms
              </Tabs.Tab>
              <Tabs.Tab
                value="3"
                ref={setControlRef("3")}
                className={styles.tab}
              >
                Records
              </Tabs.Tab>

              <FloatingIndicator
                target={value ? controlsRefs[value] : null}
                parent={rootRef}
                className={styles.indicator}
              />
            </Tabs.List>

            <Tabs.Panel value="1">
              <TextField />
              <Checkbox />
              <DateField />
            </Tabs.Panel>
            <Tabs.Panel value="2">
              {forms.length > 0 &&
                forms.map((form) => (
                  <SavedForms
                    key={form.id}
                    id={form.id}
                    name={form.name}
                    fields={form.fields}
                    onFormSelect={handleFormSelect}
                  />
                ))}
            </Tabs.Panel>
            <Tabs.Panel value="3">Third tab content</Tabs.Panel>
          </Tabs>
        </div>

        {/* Main Form Builder */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            marginTop: "50px",
          }}
        >
          {value == "1" && <FormPreview />}
          {value == "2" && selectedForm && (
            <Form
              formId={selectedForm.id}
              name={selectedForm.name}
              fields={selectedForm.fields}
            />
          )}
        </div>
      </Container>
    </div>
  );
}
