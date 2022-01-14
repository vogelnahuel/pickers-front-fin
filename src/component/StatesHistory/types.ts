import { DetailTransactionHistoryType } from "sagas/types/detailTransactions";

export type StateHistoryProps= {
    history:DetailTransactionHistoryType[];
    cancelStatus?:string[],
    showCreatedDate?:boolean,
    linkableStatus?:{tags:string[],link:string,label:string}
    tittle?:string;
    subtittleMetadata?: boolean;
    transaccion?:boolean;
  }
  