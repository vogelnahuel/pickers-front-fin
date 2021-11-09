import {
  DetailTransactionCancelItemType,
  DetailTransactionType,
} from "sagas/types/detailTransactions";

export type DetailTransactionPropsType = {
  detailTransaction: DetailTransactionType;
  resolutionHeightModal: number;
  closeModalDetailTransaction: Function;
};

export type DetailTransactionContainerType = {
  detailTransaction: DetailTransactionType;
  closeModalDetailTransaction: Function;
};

export type UndeliveredPropsType = {
  detailTransaction: DetailTransactionType;
  messages: DetailTransactionCancelItemType[];
  selectedMessage: DetailTransactionCancelItemType,
  
  back: Function;
  getMessages: Function;
  setMessageSelected: Function;
  getDetailTransactionDevolutionUndelivered: Function;
  resetMessage: Function;
};
