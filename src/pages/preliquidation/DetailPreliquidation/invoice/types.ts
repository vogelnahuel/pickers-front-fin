import { DetailPreliquidationsContentResponseType } from "sagas/types/preliquidation";
import { ObjectShape, TypeOfShape } from "yup/lib/object";

export type detailPreliquidationInvoiceContainerPropsType = {
  setActualPage: Function;
  getDetailpreliquidations: Function;
  isFetching: boolean;
  detailPreliquidations: DetailPreliquidationsContentResponseType;
  setDirty: Function;
};
export type detailPreliquidationInvoicePropsType = {
  isFetching: boolean;
  detailPreliquidations: DetailPreliquidationsContentResponseType;
  validationSchema: Object;
  setDirty: Function;
  castDatePicker: Function;
};
export type detailPreliquidationDatePicker = {
  id: number;
  emisionDate: {
    from: string;
  };
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
  emisionDate: any;
  salePoint: string | undefined;
  invoiceNumber: string | undefined;
  caeNumber: string | undefined;
};

