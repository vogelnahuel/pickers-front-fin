import volver from "assets/admin/PendingUser/volver.svg";
import Info from "assets/transaction/Advertencia.svg";
import React from "react";
import {
  actions as detailTransactionActions,
  selectors as detailTransactionSelector,
} from "reducers/detailTransaction";
import { connect } from "react-redux";

import "./reasonsCanceledConfirm.scss";
import { AppDispatch, RootState } from "store";
import { ReasonCanceledConfirmPropsType } from "./types";
import i18next from "i18next";

const ReasonsCanceledConfirm: React.FC<ReasonCanceledConfirmPropsType> = ({
  detailTransaction,
  messageSelected,
  back,
  postReasonsCanceled,
}): JSX.Element => {
  return (
    <div className="modal-transaction-reasonsCanceled">
      <div
        onClick={() => {
          back();
        }}
        className="modal-transaction-volver"
      >
        <img
          className="modal-transaction-reasonsCanceledConfirm-volver-img"
          src={volver}
          alt="volver"
        />
        <p className="modal-transaction-reasonsCanceledConfirm-volver">
          {i18next.t("global:label.button.back")}
        </p>
      </div>

      {(detailTransaction.transaction.state.id === 3 &&
        messageSelected.id === 6) ||
      (detailTransaction.transaction.state.id === 4 &&
        messageSelected.id === 6) ? (
        <div className="modal-transaction-reasonsCanceledConfirm-container">
          <img
            className="modal-transaction-reasonsCanceledConfirm-img"
            src={Info}
            alt="informacionIcon"
          />
          <h3 className="modal-transaction-reasonsCanceledConfirm-subtitle-collection">
            {i18next.t("detailTransaction:title.historyModal.cancelCollection")}
          </h3>
          <hr className="modal-transaction-reasonsCanceledConfirm-separate" />
          <p className="modal-transaction-reasonsCanceledConfirm-p-collection">
            Al desasignar la transacción, va a volver al estado sin asignar{" "}
          </p>
          <p className="modal-transaction-reasonsCanceledConfirm-p2-collection">
            ¿Querés cancelar la colecta?
          </p>
        </div>
      ) : (
        <div className="modal-transaction-reasonsCanceledConfirm-container">
          <img
            className="modal-transaction-reasonsCanceledConfirm-img"
            src={Info}
            alt="informacionIcon"
          />
          <h3 className="modal-transaction-reasonsCanceledConfirm-subtitle">
          {i18next.t("detailTransaction:title.historyModal.cancelTransaction")}

          </h3>
          <hr className="modal-transaction-reasonsCanceledConfirm-separate" />
          <p className="modal-transaction-reasonsCanceledConfirm-p">
          {i18next.t("detailTransaction:title.historyModal.confirmCancelTransaction")}
          </p>
          <p className="modal-transaction-reasonsCanceledConfirm-p2">
          {i18next.t("detailTransaction:title.historyModal.confirmCancelTransactionQuestion")}
          </p>
        </div>
      )}
      <button
        onClick={() => {
          postReasonsCanceled(
            messageSelected.id,
            detailTransaction.transaction.id
          );
        }}
        className="modal-transaction-reasonsCanceledConfirm-button"
      >
                 {i18next.t("detailTransaction:title.historyModal.confirmCancelTransactionQConfimr")}

      </button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  detailTransaction: detailTransactionSelector.getDetailTransaction(state),
  messageSelected: detailTransactionSelector.getSelectedMessage(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  postReasonsCanceled: (params: string, id: string) => {
    dispatch(
      detailTransactionActions.getDetailTransactionReasonsCanceledRequest(
        params,
        id
      )
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReasonsCanceledConfirm);
