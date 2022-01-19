import { PagesPreliquidationTypes } from "pages/preliquidation/DetailPreliquidation/types";
import { PreliquidationFilterExtraType, PreliquidationFiltersType } from "pages/preliquidation/filter/types";
import { HistoryType } from "sagas/types/detailTransactions";
import {
  InvoiceTypes,
  PreliquidationItem,
  PreliquidationStatus,
} from "sagas/types/preliquidation";
import { TransactionStatusType } from "sagas/types/transactions";


export type PreliquitadionStateType = {
  fetching: boolean;
  invoiceFileStatus: InvoiceFileStatus;
  seeMore: boolean;
  preliquidations: PreliquidationItem[];
  preliquidationsSelected: PreliquidationItem[];
  filters: PreliquidationFiltersType;
  filtersExtra: PreliquidationFilterExtraType;
  filtersExtraSeeMore: PreliquidationFilterExtraType;
  detailPreliquidations: DetailPreliquidationType;
  invoiceDetail: DetailInvoiceType;
  dirty: boolean;
  actualPage: PagesPreliquidationTypes;
  invoiceTypes: InvoiceTypes[];
  showEditPreliquidationModal: boolean;
};

export type InvoiceFileStatus = {
  error?: boolean;
  loading?: boolean;
  message?: string;
}
export type DetailPreliquidationsType = {
  status: PreliquidationStatus;
  generatedAt: string;
  id: number;

// export type PreliHistory =  {
//   id: number,
//   createdAt: string,
//   fieldEdited: string,
//   beforeValue: number,
//   currentValue: number,
//   reasonTag: {
//     id: number,
//     tag: string
//   }
  
 }

export type PreliTransactionItem =  {
  transactionCode?: string | null
  finishedAt: string,
  status: {
    name: string,
    tag: TransactionStatusType
  },
  amount: number
}

export type DetailPreliquidationType = {
  id: number,
  status: PreliquidationStatus,
  generatedAt: string,
  fiscalNumber: string,
  companyName: string,
  sapCode: string,
  total: number,
  manualCorrection: {
    maxAllowedPlus: number,
    maxAllowedSubtract: number,
  },


  histories: HistoryType[]
  transactions: {
    quantity: number,
    items: PreliTransactionItem[]
  }
}

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
