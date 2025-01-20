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
    console.log(sourceData);
    const sourceDataTransformed = sourceData.map((source) => ({
      question: source.question,
      answer: Array.isArray(source.answer)
        ? source.answer.join(", ")
        : source.answer,
    }));
    const sourceRecordData = {
      formId: formId,
      sourceData: sourceDataTransformed,
    };
    console.log(sourceDataTransformed);
    const response = await baseAPIClient.post("/source", sourceRecordData);
    const data = await response.data.data;
    console.log(data);
    const mappedSourceRecord: SourceRecordType = {
      id: data.id,
      formId: data.formId,
    };
    alert("answers successfully saved !");
    return mappedSourceRecord;
  } catch (error) {
    throw new Error("Error: cannot generate new source record");
  }
};

export default { post };
