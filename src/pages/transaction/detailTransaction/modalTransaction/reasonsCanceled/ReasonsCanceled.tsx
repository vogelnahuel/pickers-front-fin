import volver from "assets/admin/PendingUser/volver.svg";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  actions as detailTransactionActions,
  detailTransactionSelector
} from "reducers/detailTransaction";
import { DetailTransactionCancelItemType } from "sagas/types/detailTransactions";
import { AppDispatch, RootState } from "store";
import { ReasonList } from "../ReasonList";
import "./reasonsCanceled.scss";
import { ReasonCanceledPropsType } from "./types";
import i18next from "i18next";

const ReasonsCanceled: React.FC<ReasonCanceledPropsType> = ({
  back,
  next,
  messages,
  reasonsCanceledConfirm,
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
    next(reasonsCanceledConfirm);
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
        <p className="modal-reasonsCancel-p">{i18next.t("global:label.button.back")}</p>
      </div>
      <div className="modal-transaction-scroll">
        <p className="modal-transaction-reasonsCanceled-subtitle">
         {i18next.t("detailTransaction:title.historyModal.selectCacelationReason")}
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
  detailTransaction: detailTransactionSelector(state).detailTransaction,
  messages: detailTransactionSelector(state).messages,
  selectedMessage: detailTransactionSelector(state).messageSelected,
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
