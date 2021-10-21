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
  onBack: Function;
  detailTransaction: DetailTransactionType;
  messages: DetailTransactionCancelItemType;
  getMessages: Function;
  setMessageSelected: Function;
  getDetailTransactionFinishReturned: Function;
};
