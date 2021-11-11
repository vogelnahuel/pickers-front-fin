import { AcountDataType, PickerType, PhoneType, StatusType } from "../types";

export type DetailPickerContainerTypeProps = {
  pendingUserAdminPicker: PickerType;
  isFetching: boolean;
  actualPage: string;
  nameDisplay: string;
  getPendingUserPicker: Function;
  getPendingUserPickerExport: Function;
  setDirty: Function;
  postAprovePickerRequest: Function;
  postPendingUserDocumentsEdit: Function;
  showNotification: Function;
  postEditPickerRequest: Function;
  setActualPage: Function;
};

export type DetailPickerTypeProps = {
  isFetching: boolean;
  pendingUserAdminPicker: {
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
    vehicle: any;
    vehicleType: string;
  };
  getPendingUserPickerExport: Function;
  actualPage: string;
  setDirty: Function;
  active: boolean;
  cancel: Function;
  aproveSubmit: Function;
  nameDisplay: string;
  goBack: Function;
  postPendingUserDocumentsEdit: Function;
  postEditPickerRequest: Function;
  validationSchema: Object;
  formatDate: Function;
};

// export type DetailPickerValidationSchema = {
//   name:string,
// surname:string,
// phone:{
//   areaNumber:string,
// number:string,
// }
// expirationDatePolicyPersonal?:string
// vehicle?:{

// }
// }
