import {
  DetailTransactionCancelItemType,
  DetailTransactionType,
} from "sagas/types/detailTransactions";

export type HistoryModalTransactionType = {
  detailTransaction: DetailTransactionType;
  cancel: Function;
  finish: Function;
  getDetailTransaction: Function;
};

export type FinishModalPropsType = {
  detailTransaction: DetailTransactionType;
  getDetailTransactionFinishLostRequest: Function;
  onBack: Function;
  DniFinish: Function;
  undelivered: Function;
};

export type DniFinishPropsType = {
  onBack: Function;
  getDetailTransactionDniDeliveredRequest: Function;
  detailTransaction: DetailTransactionType;
};

export type ReasonListPropsType = {
  selectedClick: { id: number; state: boolean };
  messages: DetailTransactionCancelItemType[];
  handleClick: Function;
};

export type DniFinishFormValuesType = { dni: number };
