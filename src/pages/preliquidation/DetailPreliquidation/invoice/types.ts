import {
  DetailPreliquidationsContentResponseType,
  InvoiceTypes,
  PreliquidationStatus,
} from "sagas/types/preliquidation";
import { TypeOfShape } from "yup/lib/object";

export type detailPreliquidationInvoiceContainerPropsType = {
  setActualPage: (page: string) => void;
  isFetching: boolean;
  setDirty: (dirty: boolean) => void;
  detailPreliquidations: DetailPreliquidationsContentResponseType;
  getInvoiceDetail: (id: string | undefined) => void;
  getInvoiceDetailSave: (params: detailPreliquidationDatePicker) => void;
  getInvoiceDetailApprove: (params: detailPreliquidationDatePicker) => void;
  getInvoiceDetailDelete: (params: detailPreliquidationDatePicker) => void;
  getInvoiceDetailTypes: () => void;
  invoiceTypes: InvoiceTypes[];
};
export type detailPreliquidationInvoicePropsType = {
  isFetching: boolean;
  detailPreliquidations: DetailPreliquidationsContentResponseType;
  validationSchema: object;
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
  fileError: string;
  fileUrl: string;
  invoiceTypes: InvoiceTypes[];
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
  presettlement: {
   status :PreliquidationStatus,
   genereted_at :  string
  }
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
