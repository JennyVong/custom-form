import { Card, Text } from "@mantine/core";
import { RecordView, SourceDatas } from "../../types/SourceRecordTypes";

export type SavedFormRecordsProps = {
  id: string;
  formName: string;
  sourceData: SourceDatas;
  onFormSelect: (form: RecordView) => void;
};

function SavedFormRecords({
  id,
  formName,
  sourceData,
  onFormSelect,
}: SavedFormRecordsProps) {
  const form = {
    id: id,
    formName: formName,
    sourceData: sourceData,
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
      <Text weight={500}>{formName}</Text>
    </Card>
  );
}

export default SavedFormRecords;
