export type SourceRecordType = {
  id: string;
  formId: string;
};

export type SourceDataType = {
  id: string;
  question: string;
  answer: string;
  sourceRecordId: string;
};

export type RecordView = {
  id: string;
  formName: string;
  sourceData: SourceDatas;
};

export type SourceRecords = SourceRecordType[];

export type SourceDatas = SourceDataType[];
