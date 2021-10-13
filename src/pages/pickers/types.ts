export type ChangePageTypes = {
  props: {
    setActualPage: Function;
  };
};

export type PickersParamsType = {
  pickerStatusId?: Array<Number>;
  name?: string;
  email?: string;
  identificationNumber?: number;
  vehicleType?: { label: String; value: String };
  limit?: number;
  offset?: number;
};
export type ParamsMiddlewareType = {
  pickerStatusId?: string;
  name?: string;
  email?: string;
  identificationNumber?: number;
  vehicleType?: String;
  limit?: number;
  offset?: number;
};

export type AcountDataType = {
  bankIdentifier: String;
  bankName: String;
  fiscalNumber: String;
};

export type PhoneType = {
  areaNumber: String;
  countryNumber: String;
  number: String;
  registerDate: String;
};

export type StatusType = {
  description: String;
  id: Number;
};

export type BicycleType = {
  approve: boolean | null;
  expirationDateDriverLicense: String | null;
  expirationDateIdentificationVehicle: String | null;
  expirationDatePolicyVehicle: String | null;
  patent: String | null;
};

export type MotorcycleType = {
  approve: boolean | null;
  expirationDateDriverLicense: String | null;
  expirationDateIdentificationVehicle: String | null;
  expirationDatePolicyVehicle: String | null;
  patent: String | null;
};

export type PickerType = {
  accountingData: AcountDataType;
  dateOfBirth: string;
  email: string;
  enable: boolean;
  expirationDatePolicyPersonal: string;
  id: number;
  identificationNumber: string;
  name: string;
  phone: PhoneType;
  registerDate: string;
  status: StatusType;
  surname: string;
  vehicle: {
    bicycle: BicycleType;
    motorcycle: MotorcycleType;
  };
  vehicleType: string;
};

export type PickerContainerTypes = {
  pendingUsers: PickerType[];
  isFetching: boolean;
  filters: PickersParamsType;
  filtersExtra: PickersParamsType;
  filtersExtraSeeMore: PickersParamsType;
  seeMore: boolean;
  pag: string;
  actualPage: string;
  reset: Function;
  getPendingUser: Function;
  setPendingUserFilters: Function;
  setPendingUserExtraFilters: Function;
  setActualPage: Function;
  getPendingUsersExportRequest: Function;
  getMorePendingUser: Function;
};

export type PickerTypes = {
  pendingUsers: PickerType[];
  isFetching: boolean;
  filters: PickersParamsType;
  filtersExtra: PickersParamsType;
  filtersExtraSeeMore: PickersParamsType;
  seeMore: boolean;
  tableTitles: string[];
  actualPage: String;
  reset: Function;
  getPendingUser: Function;
  setPendingUserFilters: Function;
  setPendingUserExtraFilters: Function;
  setActualPage: Function;
  getPendingUsersExportRequest: Function;
  getMorePendingUser: Function;
};

export type PickersAxiosResponseType = {
  data: PickersAxiosContent;
  status: number;
};

export type PickersExportResponseType = {
  data: String;
  status: number;
};

export type PickersAxiosContent = {
  statusCode: number;
  result: {
    items: PickerType[];
  };
};

export type PickersResponse = {
  hasMore: Boolean;
  limit: number;
  offset: number;
  items: PickerType[];
};

export type EditPickerResponseType = {
  result: Number;
};
