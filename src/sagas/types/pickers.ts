import {
  DocumentationType,
  ParamsTypeMiddleware,
} from "../../pages/pickers/types";

export type PickerResponseType = {
  status: Number;
  data: {
    result: DocumentationType;
    limit: Number;
    offset: Number;
    hasMore: boolean;
  };
};
export type PickersResponseType = {
  status?: Number;
  data: {
    result: { items: DocumentationType[] };
    limit: Number;
    offset: Number;
    hasMore: boolean;
  };
};

export type getPickersType = {
  type: string;
  params: ParamsTypeMiddleware;
  element: HTMLElement;
};

export type getDetailPickersType = {
  type: string;
  params: Number;
};

export type PickerExportType = {
  type: string;
  params: ParamsTypeMiddleware;
  element: HTMLElement;
  goBack?: Function;
};

export type ParamGetPendingUser = {
  params: Number;
};

export type PostEditPickerType = {
  params: DocumentationType;
  goBack: Function;
  element: HTMLElement;
};

export type CsvResponseType = { data: string; status: number };
