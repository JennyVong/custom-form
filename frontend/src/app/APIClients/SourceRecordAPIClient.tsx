import { SourceRecordType } from "../types/SourceRecordTypes";
import baseAPIClient from "./BaseAPIClient";

interface SourceData {
  question: string;
  answer: string;
}

const post = async (
  formId: string,
  sourceData: SourceData[]
): Promise<SourceRecordType> => {
  try {
    const sourceRecordData = {
      formId: formId,
      sourceData: sourceData,
    };
    console.log(sourceRecordData);
    const response = await baseAPIClient.post("/source", sourceRecordData);
    const data = await response.data.data;
    console.log(data);
    const mappedSourceRecord: SourceRecordType = {
      id: data.id,
      formId: data.formId,
    };
    return mappedSourceRecord;
  } catch (error) {
    throw new Error("Error: cannot generate new source record");
  }
};

export default { post };
