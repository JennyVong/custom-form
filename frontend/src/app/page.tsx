"use client";

import { useEffect, useState } from "react";
import FormPreview from "./components/FormView/FormPreview";
import styles from "./page.module.css";
import { Container, FloatingIndicator, Tabs, Title } from "@mantine/core";
import { Forms, FormType } from "./types/FormType";
import formAPIClient from "./APIClients/FormAPIClient";
import SavedForms from "./components/FormView/SavedForms";
import Form from "./components/FormView/Form";
import AccordianComponent from "./components/Accordian";
import sourceRecordAPIClient from "./APIClients/SourceRecordAPIClient";
import {
  SourceDatas,
  SourceRecords,
  RecordView,
} from "./types/SourceRecordTypes";
import SavedFormRecords from "./components/FormView/SavedFormRecords";
import FormRecord from "./components/FormView/FormRecord";

export default function Home() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>("1");
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const [forms, setForms] = useState<Forms | []>([]);
  const [records, setRecords] = useState<SourceRecords>([]);
  const [selectedForm, setForm] = useState<FormType>();
  const [views, setViews] = useState<RecordView[]>([]);
  const [selectedView, setView] = useState<RecordView>();

  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  const handleFormSelect = (form: FormType) => {
    setForm(form);
  };

  const handleViewSelect = (form: RecordView) => {
    setView(form);
  };

  const fetchForms = async () => {
    const collectedForms = await formAPIClient.getAllForms();
    setForms(collectedForms);
  };

  const savedData = async () => {
    const collectedView = await Promise.all(
      records.map(async (record) => {
        const form = await formAPIClient.getById(record.formId);
        const collectedSourceData = await sourceRecordAPIClient.getSourceData(
          record.id
        );
        return {
          id: record.id,
          formName: form.name,
          sourceData: collectedSourceData,
        };
      })
    );
    setViews(collectedView);
  };

  const fetchRecords = async () => {
    const collectedRecords = await sourceRecordAPIClient.getAllRecords();
    setRecords(collectedRecords);
    savedData();
  };

  useEffect(() => {
    const fetchForms = async () => {
      const collectedForms = await formAPIClient.getAllForms();
      setForms(collectedForms);
    };
    const fetchRecords = async () => {
      const collectedRecords = await sourceRecordAPIClient.getAllRecords();
      setRecords(collectedRecords);
      savedData();
    };
    fetchForms();
    fetchRecords();
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
            overflowY: "auto",
          }}
        >
          <Title order={1} style={{ marginBottom: "20px" }}>
            Form Builder
          </Title>
          <Tabs
            style={{
              borderTop: "1px solid var(--black-tertiary)",
              paddingTop: "10px",
            }}
            variant="none"
            value={value}
            onChange={setValue}
          >
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
                onClick={fetchForms}
              >
                Forms
              </Tabs.Tab>
              <Tabs.Tab
                value="3"
                ref={setControlRef("3")}
                className={styles.tab}
                onClick={fetchRecords}
              >
                Records
              </Tabs.Tab>

              <FloatingIndicator
                target={value ? controlsRefs[value] : null}
                parent={rootRef}
                className={styles.indicator}
              />
            </Tabs.List>

            {/* Main Form Builder Tab with usable components */}
            <Tabs.Panel value="1">
              <AccordianComponent />
            </Tabs.Panel>

            {/* Created Forms available to view and fill in */}
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
            <Tabs.Panel value="3">
              {views.length > 0 &&
                views.map((view) => (
                  <SavedFormRecords
                    key={view.id}
                    id={view.id}
                    formName={view.formName}
                    sourceData={view.sourceData}
                    onFormSelect={handleViewSelect}
                  />
                ))}
            </Tabs.Panel>
          </Tabs>
        </div>

        {/* Right side */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            marginTop: "50px",
          }}
        >
          {/* Main Form Builder Preview */}
          {value === "1" && <FormPreview />}

          {/* Main Form Viewer */}
          {value === "2" && selectedForm && (
            <Form
              formId={selectedForm.id}
              name={selectedForm.name}
              fields={selectedForm.fields}
            />
          )}
          {/* Main Form Viewer with filled out values */}
          {value === "3" && selectedView && (
            <FormRecord
              id={selectedView.id}
              formName={selectedView.formName}
              sourceData={selectedView.sourceData}
            />
          )}
        </div>
      </Container>
    </div>
  );
}
