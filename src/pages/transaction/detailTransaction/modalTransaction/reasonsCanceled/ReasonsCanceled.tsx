import volver from "assets/admin/PendingUser/volver.svg";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  actions as detailTransactionActions,
  selectors as detailTransactionSelector
} from "reducers/detailTransaction";
import { DetailTransactionCancelItemType } from "sagas/types/detailTransactions";
import { AppDispatch, RootState } from "store";
import { ReasonList } from "../ReasonList";
import "./reasonsCanceled.scss";
import { ReasonCanceledPropsType } from "./types";

const ReasonsCanceled: React.FC<ReasonCanceledPropsType> = ({
  onBack,
  messages,
  ReasonsCanceledConfirm,
  setMessageSelected,
  getMessages,
  detailTransaction,
  resetMessage,
  selectedMessage
}): JSX.Element => {
  useEffect(() => {
    resetMessage();
    getMessages(detailTransaction.transaction.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClick = (message:DetailTransactionCancelItemType) => {
    setMessageSelected(message);
    ReasonsCanceledConfirm();
  };
  return (
    <div className="modal-transaction-reasonsCanceled">
      <div
        onClick={() => {
          onBack();
        }}
        className="modal-transaction-volver"
      >
        <img
          className="modal-transaction-reasonsCanceled-img-volver"
          src={volver}
          alt="volver"
        />
        <p className="modal-reasonsCancel-p">Volver</p>
      </div>
      <div className="modal-transaction-scroll">
        <p className="modal-transaction-reasonsCanceled-subtitle">
          Seleccioná el motivo de cancelación de la colecta
        </p>
        <ReasonList
          messages={messages}
          selectedMessage={selectedMessage}
          handleClick={handleClick}
        ></ReasonList>
      </div>
      <div className="modal-reasonsCanceled-difuminar"></div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  detailTransaction: detailTransactionSelector.getDetailTransaction(state),
  messages: detailTransactionSelector.getDetailTransactionMessages(state),
  selectedMessage: detailTransactionSelector.getSelectedMessage(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getMessages: (id: string) => {
    dispatch(detailTransactionActions.getDetailTransactionMenssagesRequest(id));
  },
  resetMessage: () => {
    dispatch(detailTransactionActions.getResetMessageDetailTransaccions());
  },
  setMessageSelected: (message: DetailTransactionCancelItemType) => {
    dispatch(detailTransactionActions.setMessageSelected(message));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReasonsCanceled);
