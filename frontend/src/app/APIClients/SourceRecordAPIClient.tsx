import {
  SourceDatas,
  SourceRecords,
  SourceRecordType,
} from "../types/SourceRecordTypes";
import baseAPIClient from "./BaseAPIClient";

interface SourceData {
  question: string;
  answer: string;
}

const changeToString = (variable: any) => {
  if (Array.isArray(variable)) {
    return variable.join(", ");
  } else if (typeof variable === "boolean") {
    return String(variable);
  }
};

const post = async (
  formId: string,
  sourceData: SourceData[]
): Promise<SourceRecordType> => {
  try {
    console.log(sourceData);
    const sourceDataTransformed = sourceData.map((source) => ({
      question: source.question,
      answer:
        typeof source.answer === "string"
          ? source.answer
          : changeToString(source.answer),
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

const getAllRecords = async (): Promise<SourceRecords> => {
  try {
    const response = await baseAPIClient.get(`/source`);
    const data: SourceRecords = await response.data.data;

    const mappedRecords: SourceRecords = data.map((record) => ({
      id: record.id,
      formId: record.formId,
    }));
    return mappedRecords;
  } catch (error) {
    throw new Error("Error: can't get records");
  }
};

const getSourceData = async (sourceRecordId: string): Promise<SourceDatas> => {
  try {
    const response = await baseAPIClient.get(`/source/${sourceRecordId}`);
    const data: SourceDatas = await response.data.data;

    const mappedData: SourceDatas = data.map((data) => ({
      id: data.id,
      question: data.question,
      answer: data.answer,
      sourceRecordId: data.sourceRecordId,
    }));

    return mappedData;
  } catch (error) {
    throw new Error("Error: given id, can't get source data");
  }
};

export default { post, getAllRecords, getSourceData };
