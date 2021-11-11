import { type } from "os";

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
  id: Number;
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



export type PhoneType = {
  areaNumber: string;
  countryNumber: string;
  number: string;
  registerDate?: string;
};


export type PersonalDataType= {
  name: string,
  surname: string,
  dateOfBirth: string | null,
  identificationNumber: number | null,
  email: string,
  phone: PhoneType;
};

export type VehicleType = {
type: string,
active: boolean,
approve: boolean,
patent: string,
expirationDateDriverLicense: string,
expirationDateIdentificationVehicle: string,
expirationDatePolicyVehicle: string
};
// "result": {
//   "id": 192,
//   "enable": false,
//   "registerDatetime": null,
//   "status": {
//       "id": 1,
//       "description": "string"
//   },
//   "personalData": {
//       "name": null,
//       "surname": null,
//       "dateOfBirth": null,
//       "identificationNumber": null,
//       "email": "user@pickit.net",
//       "phone": {
//           "countryNumber": null,
//           "areaNumber": null,
//           "number": null
//       }
//   },
//   "accountingData": {
//       "bankIdentifier": null,
//       "bankName": null,
//       "fiscalNumber": null,
//   },
//   "vehicle": {
//       "type": "motorcycle",
//       "active": true,
//       "approve": true,
//       "patent": "string",
//       "expirationDateDriverLicense": "string",
//       "expirationDateIdentificationVehicle": "string",
//       "expirationDatePolicyVehicle": "string"
//   },
//   "files": {
//       "personalData": {
//           "status": "COMPLETED" | "EMPTY" | "PENDING",
//           "contents": [
//               {
//                   "tag": "{TAG_DNI_DORSO}", //contiene el tag definido para el dorso del dni
//                   "isUpload": true | false //valor por defecto en false
//               },
//               {
//                   "tag": "{TAG_DNI_FRENTE}",
//                   "isUpload": true | false
//               },
//               {
//                   "tag": "{TAG_ROSTRO_USUARIO}",
//                   "isUpload": true | false
//               }
//           ]
//       },
//       "accountingData": {
//           "status": "COMPLETED" | "EMPTY" | "PENDING",
//           "contents": [
//               {
//                   "tag": "{TAG_CBU}",
//                   "isUpload": true | false
//               },
//               {
//                   "tag": "{TAG_CUIT}",
//                   "isUpload": true | false
//               }
//           ]
//       },
//       "vehicle": { //vehiculo habilitado
//           "status": "COMPLETED" | "EMPTY" | "PENDING",
//           "contents": [
//               {
//                   "tag": "{TAG_LICENCIA_CONDUCTOR}",
//                   "isUpload": true
//               },
//               {
//                   "tag": "{TAG_CEDULA_FRENTE}",
//                   "isUpload": false
//               },
//               {
//                   "tag": "{TAG_CEDULA_DORSO}",
//                   "isUpload": false
//               },
//               {
//                   "tag": "{TAG_SEGURO_AUTOMORO}",
//                   "isUpload": false
//               }
//           ]
//       }
//   }
// }
export type AcountDataType = {
  bankIdentifier: string;
  bankName: string;
  fiscalNumber: string;
};
export type DataContentType={
  tag:string,
  isUpload:boolean
}

export type DataFilesType ={
  status   : string
  contents : DataContentType[]
}


export type filesType= {
  personalData:DataFilesType
  accountingData:DataFilesType
  vehicle:DataFilesType
}

export type PickerType = {
  id: number;
  enable: boolean,
  registerDatetime: string,
  status: StatusType;
  personalData:  PersonalDataType;
  accountingData:AcountDataType
  vehicle: VehicleType;
  files:filesType
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
  hasMore: Boolean;
  limit: number;
  offset: number;
  items: PickerType[];
};

export type EditPickerResponseType = {
  result: Number;
};
