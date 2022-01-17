import { RejectInvoiceMiddlewareType, UploadInvoiceFileMiddlewareType } from "sagas/types/preliquidation";
import { DetailInvoiceType, DetailPreliquidationType, InvoiceFileStatus } from "reducers/types/preliquidation";
import {
  InvoiceTypes,
} from "sagas/types/preliquidation";
import { TypeOfShape } from "yup/lib/object";
import { NotificationStateType } from "reducers/types/notification";
import { PagesPreliquidationTypes } from "../types";

export type detailPreliquidationInvoiceContainerPropsType = {
  isFetching: boolean;
  invoiceDetail: DetailInvoiceType;
  detailPreliquidations: DetailPreliquidationType;
  invoiceFileStatus: InvoiceFileStatus;
  invoiceTypes: InvoiceTypes[];
  setActualPage: (page: PagesPreliquidationTypes) => void;
  setDirty: (dirty: boolean) => void;
  getInvoiceDetail: (id: string | undefined) => void;
  getInvoiceDetailSave: (params:detailPreliquidationDatePicker) => void;
  getInvoiceDetailApprove: (params:detailPreliquidationDatePicker) => void;
  getInvoiceDetailDelete: (params: RejectInvoiceMiddlewareType) => void;
  uploadInvoiceFile: (params: UploadInvoiceFileMiddlewareType) => void;
  replaceInvoiceFile: (params: UploadInvoiceFileMiddlewareType) => void;
  resetInvoiceDetail: () => void;
  deleteInvoiceFile: (id: number) => void;
  setInvoiceFileStatus: (params: InvoiceFileStatus) => void;
  getInvoiceDetailTypes: () => void;
  showNotification: (notification: NotificationStateType) => void;
};

export type detailPreliquidationInvoicePropsType = {
  isFetching: boolean;
  invoiceDetail: DetailInvoiceType;
  detailPreliquidations: DetailPreliquidationType;
  validationSchema: object;
  invoiceTypes: InvoiceTypes[];
  invoiceFileStatus: InvoiceFileStatus;
  presettementId:string | undefined;
  isFormEnabled: boolean;
  initialValues: detailPreliquidationDatePicker;
  setDirty: (dirty: boolean) => void;
  getInvoiceDetailSave: (params:detailPreliquidationDatePicker) => void;
  getInvoiceDetailApprove: (params:detailPreliquidationDatePicker) => void;
  getInvoiceDetailDelete: (params: RejectInvoiceMiddlewareType) => void;
  deleteFile: () => void;
  downloadFile: () => void;
  fileHandler: (file: File) => void;
  goToPreviousFile: () => void;
  handleClickBack:(dirty:boolean)=>void;
  changePage:(page: PagesPreliquidationTypes, isDirty: boolean)=>void;
};

export type detailPreliquidationDatePicker = {
  id: number;
  emisionDate: string;
  invoiceNumber: string;
  salePoint: string;
  invoiceType: InvoiceTypes;
  caeNumber: string;
  fiscalData: {
    fiscalNumber: string;
    companyName: string;
    taxPayerType: string;
    total: number;
  };
  invoiceFile: {
    upload: true | false;
    url: string | null;
  };
  presettementId:string | undefined
};

export type invoiceValidationSchema = {
  emisionDate: string | undefined;
  salePoint: string | undefined;
  invoiceType: TypeOfShape<{}> | InvoiceTypes;
  invoiceNumber: string | undefined;
  caeNumber: string | undefined;
};
