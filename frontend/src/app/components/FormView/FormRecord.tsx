import { Card, Title, Text } from "@mantine/core";
import { SourceDatas } from "../../types/SourceRecordTypes";

export type FormRecordProps = {
  id: string;
  formName: string;
  sourceData: SourceDatas;
};

function FormRecord({ id, formName, sourceData }: FormRecordProps) {
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
        {formName}
      </Title>
      {/* Render question-answer tuples */}
      {sourceData.map((sd, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <Text>{sd.question}</Text>
          <Text>{sd.answer}</Text>
        </div>
      ))}
    </Card>
  );
}
export default FormRecord;
