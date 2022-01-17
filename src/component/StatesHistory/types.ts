import {  HistoryType } from "sagas/types/detailTransactions";

export type StateHistoryProps<T>= {
    history:HistoryType[];
    cancelStatus?:string[],
    showCreatedDate?:boolean,
    linkableStatus?:{tags:string[],link:string,label:string}
    tittle?:string;
    subtittleMetadata?: boolean;
    transaccion?:boolean;
  }
  