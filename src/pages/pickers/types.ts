import { TypeOfShape } from "yup/lib/object";

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

export type StatusType = {
  description: string;
  id: number;
};

export type PhoneValidationSchemaType = {
  areaNumber: string;
  number: string;
};

export type PersonalDataValidationType = {
  name: string;
  surname: string;
  phone: PhoneValidationSchemaType;
};
export type vehicleValidationType = {
  patent: string;
  expirationDatePolicyVehicle: string;
  expirationDateIdentificationVehicle: string;
  expirationDateDriverLicense: string;
};

export type DetailPickerValidationSchema = {
  personalData: PersonalDataValidationType;
  vehicle: vehicleValidationType | TypeOfShape<{}>;
};

export type PhoneType = {
  areaNumber: string;
  countryNumber: string;
  number: string;
  registerDate?: string;
};

export type PersonalDataType = {
  name: string;
  surname: string;
  dateOfBirth: string | null;
  identificationNumber: number | null;
  email: string;
  phone: PhoneType;
};

export type VehicleType = {
  type: string;
  active: boolean;
  approve: boolean;
  patent: string;
  expirationDateDriverLicense: string | null;
  expirationDateIdentificationVehicle: string | null;
  expirationDatePolicyVehicle: string | null;
};
export type AcountDataType = {
  bankIdentifier: string;
  bankName: string;
  fiscalNumber: string;
};
export type DataContentType = {
  tag: keyof DetailPickerTagFileType;
  isUpload: boolean;
};

export type DataFilesType = {
  status: string;
  content: DataContentType[];
};

export type FilesType = {
  personalData: DataFilesType;
  accountingData: DataFilesType;
  vehicle: DataFilesType;
};

export type PickerType = {
  id: number;
  enable: boolean;
  registerDatetime: string;
  status: StatusType;
  personalData: PersonalDataType;
  accountingData: AcountDataType;
  vehicle: VehicleType;
  files: FilesType;
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
  getPendingUser: (params: ParamsMiddlewareType) => void;
  setPendingUserFilters: Function;
  setPendingUserExtraFilters: Function;
  setActualPage: Function;
  getPendingUsersExportRequest: Function;
  getMorePendingUser: Function;
  isDetail:boolean;
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
  changePage: (page: string) => void;
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

export type PickerFileResponseType = {
  result: {
    url: string;
  };
};

export type DetailPickerTagFileType = {
  "dni-front": string;
  "dni-back": string;
  "user-face": string;
  "cbu-certificate": string;
  "cuit-certificate": string;
  "driver-license": string;
  "vehicle-identification-back": string;
  "vehicle-identification-front": string;
  "driver-insurance-card": string;
};
