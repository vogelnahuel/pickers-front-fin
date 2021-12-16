import { InvoiceFileStatus } from "reducers/types/preliquidation";
import { DetailPreliquidationsContentResponseType, UploadInvoiceFileMiddlewareType } from "sagas/types/preliquidation";
import { TypeOfShape } from "yup/lib/object";

export type detailPreliquidationInvoiceContainerPropsType = {
  isFetching: boolean;
  invoiceDetail: any;
  detailPreliquidations: DetailPreliquidationsContentResponseType;
  invoiceFileStatus: InvoiceFileStatus;
  setActualPage: (page: string) => void;
  setDirty: (dirty: boolean) => void;
  getInvoiceDetail: (id: string | undefined) => void;
  getInvoiceDetailSave: (params:detailPreliquidationDatePicker) => void;
  getInvoiceDetailApprove: (params:detailPreliquidationDatePicker) => void;
  getInvoiceDetailDelete: (params:detailPreliquidationDatePicker) => void;
  uploadInvoiceFile: (params: UploadInvoiceFileMiddlewareType) => void;
  deleteInvoiceFile: (id: number) => void;
  setInvoiceFileStatus: (params: InvoiceFileStatus) => void;
};
export type detailPreliquidationInvoicePropsType = {
  isFetching: boolean;
  invoiceDetail: any;
  detailPreliquidations: DetailPreliquidationsContentResponseType;
  validationSchema: object;
  invoiceFileStatus: InvoiceFileStatus;
  setDirty: (dirty: boolean) => void;
  getInvoiceDetailSave: (params:detailPreliquidationDatePicker) => void;
  getInvoiceDetailApprove: (params:detailPreliquidationDatePicker) => void;
  getInvoiceDetailDelete: (params:detailPreliquidationDatePicker) => void;
  deleteFile: () => void;
  downloadFile: () => void;
  castDatePicker: (
    detailPreliquidations: DetailPreliquidationsContentResponseType
  ) => detailPreliquidationDatePicker;
  fileHandler: (file: File) => void;
};

export type detailPreliquidationDatePicker = {
  id: number;
  emisionDate: { from: string };
  invoiceNumber: string;
  salePoint: string;
  invoiceType: string;
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
};

export type invoiceValidationSchema = {
  emisionDate: DatePickerType | TypeOfShape<{}>;
  salePoint: string | undefined;
  invoiceType :TypeOfShape<{}>| string;
  invoiceNumber: string | undefined;
  caeNumber: string | undefined;
};
export type DatePickerType = {
  from: string;
};
