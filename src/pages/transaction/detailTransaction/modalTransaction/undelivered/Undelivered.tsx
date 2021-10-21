import volver from "assets/admin/PendingUser/volver.svg";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    actions as detailTransactionActions,
    selectors as detailTransactionSelector
} from "reducers/detailTransaction";
import { DetailTransactionCancelItemType } from "sagas/types/detailTransactions";
import { AppDispatch, RootState } from "store";
import { UndeliveredPropsType } from "../../types";
import { ReasonList } from "../ReasonList/ReasonList";
import "./undelivered.css";

const Undelivered: React.FC<UndeliveredPropsType> = ({
  onBack,
  detailTransaction,
  messages,
  getMessages,
  setMessageSelected,
  getDetailTransactionFinishReturned,
}): JSX.Element => {
     useEffect(() => {
    getMessages(detailTransaction.transaction.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [selectedClick, setSelectedClick] = useState({ id: -1, state: false });
  const handleClick = (message: DetailTransactionCancelItemType) => {
    setMessageSelected(message);
    setSelectedClick({ id: message.id, state: true });
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
          selectedClick={selectedClick}
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
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getMessages: (id: string) => {
    dispatch(detailTransactionActions.getDetailTransactionMenssagesRequest(id));
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