import { DetailPreliquidationsContentResponseType } from "sagas/types/preliquidation";

export type detailPreliquidationInvoiceContainerPropsType = {
  setActualPage: Function;
  getDetailpreliquidations: Function;
  isFetching: boolean;
  detailPreliquidations: DetailPreliquidationsContentResponseType;
 
};
export type detailPreliquidationInvoicePropsType = {
  isFetching: boolean;
  detailPreliquidations: DetailPreliquidationsContentResponseType;
  validationSchema: Object;
};
