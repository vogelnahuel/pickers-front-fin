import {
  InvoiceTypes,
  PreliquidationItem,
  PreliquidationStatus,
} from "sagas/types/preliquidation";

export type PreliquidationFilterExtraType = {
  limit: number;
  offset: number;
};

export type PreliquitadionStateType = {
  fetching: boolean;
  invoiceFileStatus: InvoiceFileStatus;
  seeMore: boolean;
  preliquidations: PreliquidationItem[];
  preliquidationsSelected: PreliquidationItem[];
  filters: any;
  filtersExtra: PreliquidationFilterExtraType;
  filtersExtraSeeMore: PreliquidationFilterExtraType;
  detailPreliquidations: DetailPreliquidationsType;
  invoiceDetail: DetailInvoiceType;
  dirty: boolean;
  actualPage: string;
  invoiceTypes: InvoiceTypes[];
};

export type InvoiceFileStatus = {
  error?: boolean;
  loading?: boolean;
  message?: string;
}
export type DetailPreliquidationsType = {
  id: number;
  status: PreliquidationStatus;
  genereted_at: string;
};
export type DetailInvoiceType= {
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
}
