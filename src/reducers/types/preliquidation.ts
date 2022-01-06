import { PreliquidationFilterExtraType, PreliquidationFiltersType } from "pages/preliquidation/filter/types";
import {
  InvoiceTypes,
  PreliquidationItem,
  PreliquidationStatus,
} from "sagas/types/preliquidation";


export type PreliquitadionStateType = {
  fetching: boolean;
  invoiceFileStatus: InvoiceFileStatus;
  seeMore: boolean;
  preliquidations: PreliquidationItem[];
  preliquidationsSelected: PreliquidationItem[];
  filters: PreliquidationFiltersType;
  filtersExtra: PreliquidationFilterExtraType;
  filtersExtraSeeMore: PreliquidationFilterExtraType;
  detailPreliquidations: any;
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
export type DetailPreliquidationsType = { //TODO: revisar tipos
    status: PreliquidationStatus;
    generatedAt: string;
    id: number;
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
  presettementId:string|undefined
  
}

export type PreliquidationsSuccessMoreResponseType ={
  hasMore: boolean;
    limit: number;
    offset: number;
    statusCode?: number | undefined;
    error?: string | undefined;
    message?: string | undefined;
    items: PreliquidationItem[];
}
