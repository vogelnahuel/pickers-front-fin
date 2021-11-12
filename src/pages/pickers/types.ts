export type ChangePageTypes = {
  props: {
    setActualPage: Function;
  };
};

export type PickersParamsType = {
  pickerStatusId?: Array<number>;
  name?: string;
  email?: string;
  identificationNumber?: number;
  vehicleType?: { label: string; value: string };
  limit?: number;
  offset?: number;
};
export type ParamsMiddlewareType = {
  pickerStatusId?: string;
  name?: string;
  email?: string;
  identificationNumber?: number;
  vehicleType?: string;
  limit?: number;
  offset?: number;
};

export type AcountDataType = {
  bankIdentifier: string;
  bankName: string;
  fiscalNumber: string;
};

export type PhoneType = {
  areaNumber: string;
  countryNumber: string;
  number: string;
  registerDate: string;
};

export type StatusType = {
  description: string;
  id: number;
};

export type VehicleType = {
  approve: boolean | null;
  expirationDateDriverLicense: string | null;
  expirationDateIdentificationVehicle: string | null;
  expirationDatePolicyVehicle: string | null;
  patent: string | null;
};

export type VehicleGroupType = {
  bicycle?: VehicleType;
  motorcycle?: VehicleType;
};

export type PhoneValidationSchemaType = {
  areaNumber: string;
  number: string;
};

export type DetailPickerValidationSchema = {
  name: string;
  surname: string;
  phone: PhoneValidationSchemaType;
  vehicle: any;
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
  vehicle: VehicleGroupType;
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
  //getPendingUser: (params: ParamsMiddlewareType) => void;
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
  actualPage: string;
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
  data: string;
  status: number;
};

export type PickersAxiosContent = {
  statusCode: number;
  result: {
    items: PickerType[];
  };
};

export type PickersResponse = {
  hasMore: boolean;
  limit: number;
  offset: number;
  items: PickerType[];
};

export type EditPickerResponseType = {
  result: number;
};
