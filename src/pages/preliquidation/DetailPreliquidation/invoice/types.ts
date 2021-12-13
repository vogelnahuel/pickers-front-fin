import { DetailPreliquidationsContentResponseType } from "sagas/types/preliquidation";
import { TypeOfShape } from "yup/lib/object";

export type detailPreliquidationInvoiceContainerPropsType = {
  setActualPage: (page: string) => void;
  isFetching: boolean;
  setDirty: (dirty: boolean) => void;
  detailPreliquidations: DetailPreliquidationsContentResponseType;
  getInvoiceDetail: (id: string | undefined) => void;
  getInvoiceDetailSave: (params:detailPreliquidationDatePicker) => void;
  getInvoiceDetailApprove: (params:detailPreliquidationDatePicker) => void;
  getInvoiceDetailDelete: (params:detailPreliquidationDatePicker) => void;
};
export type detailPreliquidationInvoicePropsType = {
  isFetching: boolean;
  detailPreliquidations: DetailPreliquidationsContentResponseType;
  validationSchema: object;
  setDirty: (dirty: boolean) => void;
  getInvoiceDetailSave: (params:detailPreliquidationDatePicker) => void;
  getInvoiceDetailApprove: (params:detailPreliquidationDatePicker) => void;
  getInvoiceDetailDelete: (params:detailPreliquidationDatePicker) => void;
  castDatePicker: (
    detailPreliquidations: DetailPreliquidationsContentResponseType
  ) => detailPreliquidationDatePicker;
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
