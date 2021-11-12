import {
  PickerType,
  ParamsMiddlewareType,
} from "../../pages/pickers/types";

export type PickerResponseType = {
  status: Number;
  data: {
    result: PickerType;
    limit: Number;
    offset: Number;
    hasMore: boolean;
  };
};
export type PickersResponseType = {
  status?: Number;
  data: {
    result: { items: PickerType[] };
    limit: Number;
    offset: Number;
    hasMore: boolean;
  };
};

export type getPickersType = {
  type: string;
  params: ParamsMiddlewareType;
  element: HTMLElement;
};

export type getDetailPickersType = {
  type: string;
  params: Number;
};

export type PickerExportType = {
  type: string;
  params: ParamsMiddlewareType;
  element: HTMLElement;
  goBack?: Function;
};

export type ParamGetPendingUser = {
  type: string;
  params: Number;
};

export type PostEditPickerType = {
  type:string
  params: PickerType;
  goBack: Function;
  element: HTMLElement;
};

export type PickerExportParamType={
  email:string | undefined;
}

export type CsvResponseType = { data: string; status: number };
