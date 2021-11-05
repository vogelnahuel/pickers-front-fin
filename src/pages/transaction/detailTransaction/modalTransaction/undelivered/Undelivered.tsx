import volver from "assets/admin/PendingUser/volver.svg";
import i18next from "i18next";
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
  back,
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
          back();
        }}
        className="modal-transaction-volver"
      >
        <img
          className="modal-transaction-reasonsCanceled-img-volver"
          src={volver}
          alt="volver"
        />
        <p className="modal-reasonsCancel-p">
          {i18next.t("global:label.button.back")}
        </p>
      </div>
      <div className="modal-transaction-scroll">
        <p className="modal-transaction-reasonsCanceled-subtitle">
          {i18next.t("detailTransaction:label.undeliveredModal.reason")}
        </p>
        <ReasonList
          messages={messages}
          selectedMessage={selectedMessage}
          handleClick={handleClick}
        ></ReasonList>
        <div className="button-container-finish">
          <button
            onClick={() => {
              getDetailTransactionFinishReturned(
                detailTransaction.transaction.id
              );
            }}
            disabled={selectedMessage === undefined}
            className="finish-button"
          >
            {i18next.t("detailTransaction:label.undeliveredModal.finish")}
          </button>
        </div>
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
