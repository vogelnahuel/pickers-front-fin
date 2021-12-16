import {
  DetailPreliquidationsContentResponseType,
  PreliquidationItem,
} from "sagas/types/preliquidation";

export type PreliquidationFilterExtraType = {
  limit: number;
  offset: number;
};

export type PreliquitadionStateType = {
  fetching: boolean;
  invoiceFileStatus: InvoiceFileStatus;
  seeMore: boolean;
  invoiceDetail: any;
  preliquidations: PreliquidationItem[];
  preliquidationsSelected: PreliquidationItem[];
  filters: any;
  filtersExtra: PreliquidationFilterExtraType;
  filtersExtraSeeMore: PreliquidationFilterExtraType;
  detailPreliquidations: DetailPreliquidationsContentResponseType;
  dirty: boolean;
  actualPage: string;
};

export type InvoiceFileStatus = {
  error?: boolean;
  loading?: boolean;
  message?: string;
}