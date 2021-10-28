import {
  DetailTransactionCancelItemType,
  DetailTransactionType,
} from "sagas/types/detailTransactions";

export type HistoryModalTransactionType = {
  detailTransaction: DetailTransactionType;
  cancel: string;
  next: Function;
  finish: string;
  getDetailTransaction: Function;
};

export type FinishModalPropsType = {
  detailTransaction: DetailTransactionType;
  // onBack: Function;
  dniFinish: string;
  undelivered: string;
  getDetailTransactionFinishLostRequest: Function;
  getDetailTransactionFinishReturnedRequest: Function;
};

export type DniFinishPropsType = {
  // onBack: Function;
  getDetailTransactionDniDeliveredRequest: Function;
  detailTransaction: DetailTransactionType;
};

export type ReasonListPropsType = {
  messages: DetailTransactionCancelItemType[];
  selectedMessage?: DetailTransactionCancelItemType;
  handleClick: Function;
};

export type DniFinishFormValuesType = { dni: number };
