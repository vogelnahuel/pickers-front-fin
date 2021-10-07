export type PickersContainerTypes = {
  reset: Function;
  getPendingUser: Function;
  setPendingUserFilters: Function;
  setPendingUserExtraFilters: Function;
  setActualPage: Function;
  getPendingUsersExportRequest: Function;
  getMorePendingUser: Function;
  pendingUsers: Object;
  isFetching: Object;
  filters: Object;
  filtersExtra: Object;
  filtersExtraSeeMore: Object;
  seeMore: Object;
  pag: Object;
  actualPage: Object;
};

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
//TODO: pasar a
export type ParamsTypeMiddleware = {
  pickerStatusId?: Array<Number>;
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

export type DocumentationType = {
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
  pendingUsers: DocumentationType[];
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
  pendingUsers: any;
  isFetching: any;
  filters: any;
  filtersExtra: any;
  filtersExtraSeeMore: any;
  seeMore: any;
  pag: any;
  actualPage: any;
  reset: Function;
  getPendingUser: Function;
  setPendingUserFilters: Function;
  setPendingUserExtraFilters: Function;
  setActualPage: Function;
  getPendingUsersExportRequest: Function;
  getMorePendingUser: Function;
  changePage: Function;
  tableTitles: string[];
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
    items: DocumentationType[];
  };
};

export type PickersResponse = {
  hasMore: Boolean;
  limit: Number;
  offset: Number;
  items: DocumentationType[];
};

export type EditPickerResponseType = {
  result: Number;
};
