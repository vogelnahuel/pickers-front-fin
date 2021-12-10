import { DetailPreliquidationsContentResponseType } from "sagas/types/preliquidation";
import { ObjectShape, TypeOfShape } from "yup/lib/object";

export type detailPreliquidationInvoiceContainerPropsType = {
  setActualPage: Function;
  isFetching: boolean;
  setDirty: Function;
  detailPreliquidations: DetailPreliquidationsContentResponseType;
  getDetailpreliquidations: Function;
};
export type detailPreliquidationInvoicePropsType = {
  isFetching: boolean;
  detailPreliquidations: DetailPreliquidationsContentResponseType;
  validationSchema: object;
  setDirty: Function;
  castDatePicker: Function;
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
  invoiceNumber: string | undefined;
  caeNumber: string | undefined;
};
export type DatePickerType = {
    from:string
}
