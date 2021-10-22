import volver from "assets/admin/PendingUser/volver.svg";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  actions as detailTransactionActions,
  selectors as detailTransactionSelector,
} from "reducers/detailTransaction";
import { DetailTransactionCancelItemType } from "sagas/types/detailTransactions";
import { AppDispatch, RootState } from "store";
import { UndeliveredPropsType } from "../../types";
import { ReasonList } from "../ReasonList";
import "./undelivered.css";

const Undelivered: React.FC<UndeliveredPropsType> = ({
  onBack,
  detailTransaction,
  messages,
  getMessages,
  selectedMessage,
  resetMessage,
  setMessageSelected,
  getDetailTransactionFinishReturned,
}): JSX.Element => {
  useEffect(() => {
    resetMessage();
    getMessages(detailTransaction.transaction.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClick = (message: DetailTransactionCancelItemType) => {
    setMessageSelected(message);
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
          Seleccioná el motivo de imposible de entrega
        </p>
        <ReasonList
          messages={messages}
          selectedMessage={selectedMessage}
          handleClick={handleClick}
        ></ReasonList>
        <button
          onClick={() => {
            getDetailTransactionFinishReturned(
              detailTransaction.transaction.id
            );
          }}
          className="finish-button"
        >
          Finalizarla
        </button>
      </div>
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
  getDetailTransactionFinishReturned: (id: string) => {
    dispatch(
      detailTransactionActions.getDetailTransactionFinishReturnedRequest(id)
    );
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Undelivered);
