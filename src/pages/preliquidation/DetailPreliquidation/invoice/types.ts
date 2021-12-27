import { UploadInvoiceFileMiddlewareType } from "sagas/types/preliquidation";
import { DetailInvoiceType, DetailPreliquidationsType, InvoiceFileStatus } from "reducers/types/preliquidation";
import {
  InvoiceTypes,
} from "sagas/types/preliquidation";
import { TypeOfShape } from "yup/lib/object";
import { NotificationStateType } from "reducers/types/notification";

export type detailPreliquidationInvoiceContainerPropsType = {
  isFetching: boolean;
  invoiceDetail: DetailInvoiceType;
  detailPreliquidations: DetailPreliquidationsType;
  invoiceFileStatus: InvoiceFileStatus;
  invoiceTypes: InvoiceTypes[];
  setActualPage: (page: string) => void;
  setDirty: (dirty: boolean) => void;
  getInvoiceDetail: (id: string | undefined) => void;
  getInvoiceDetailSave: (params:detailPreliquidationDatePicker) => void;
  getInvoiceDetailApprove: (params:detailPreliquidationDatePicker) => void;
  getInvoiceDetailDelete: (params:detailPreliquidationDatePicker) => void;
  uploadInvoiceFile: (params: UploadInvoiceFileMiddlewareType) => void;
  deleteInvoiceFile: (id: number) => void;
  setInvoiceFileStatus: (params: InvoiceFileStatus) => void;
  getInvoiceDetailTypes: () => void;
  showNotification: (notification: NotificationStateType) => void;
};

export type detailPreliquidationInvoicePropsType = {
  isFetching: boolean;
  invoiceDetail: DetailInvoiceType;
  detailPreliquidations: DetailPreliquidationsType;
  validationSchema: object;
  invoiceTypes: InvoiceTypes[];
  invoiceFileStatus: InvoiceFileStatus;
  presettementId:string | undefined;
  setDirty: (dirty: boolean) => void;
  getInvoiceDetailSave: (params:detailPreliquidationDatePicker) => void;
  getInvoiceDetailApprove: (params:detailPreliquidationDatePicker) => void;
  getInvoiceDetailDelete: (params:detailPreliquidationDatePicker) => void;
  deleteFile: () => void;
  downloadFile: () => void;
  castDatePicker: (
    detailInvoice: DetailInvoiceType
  ) => detailPreliquidationDatePicker;
  fileHandler: (file: File) => void;
  goToPreviousFile: () => void;
  handleClickBack:(dirty:boolean)=>void;
  changePage:(page: string, isDirty: boolean)=>void;
};

export type detailPreliquidationDatePicker = {
  id: number;
  emisionDate: { from: string };
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
  emisionDate: DatePickerType | TypeOfShape<{}>;
  salePoint: string | undefined;
  invoiceType: TypeOfShape<{}> | InvoiceTypes;
  invoiceNumber: string | undefined;
  caeNumber: string | undefined;
};
export type DatePickerType = {
  from: string;
};