import { PickerType, ParamsMiddlewareType } from "../../pages/pickers/types";

export type PickerResponseType = {
  status: number;
  data: {
    result: PickerType;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
};
export type PickersResponseType = {
  status?: number;
  data: {
    result: { items: PickerType[] };
    limit: number;
    offset: number;
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
  params: number;
};

export type PickerExportType = {
  type: string;
  params: ParamsMiddlewareType;
  element: HTMLElement;
  goBack?: Function;
};

export type PostEditPickerType = {
  type: string;
  params: PickerType;
  goBack: Function;
  element: HTMLElement;
};

export type PickerExportParamType = {
  email: string | undefined;
};

export type CsvResponseType = { data: string; status: number };

export type ExpandableFileLoadParamType ={
    tag: string,      
    content: string   
}

export type BankType = {
  id: number;
  name: string;
}

export type BankResponseType = {
  result: BankType;
}

export type DetailPickersProvincesApiResponseType = {
  data: DetailPickersProvincesApiResponseContentType;
  status: number;
};

export type DetailPickersProvincesApiResponseContentType = {
  result:{
    items:  ProvincesTypes[];
  }

};
export type ProvincesTypes = {
  name: string;
  tag: string;
};
