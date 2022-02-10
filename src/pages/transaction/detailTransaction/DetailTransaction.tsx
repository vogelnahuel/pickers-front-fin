import { Modal, Tooltip, ToolTipPosition } from "@pickit/pickit-components";
import Close from "assets/transaction/Close.svg";

import { FlowTrasitionParamsType } from "component/flowtransition/types";
import React from "react";
import i18next from "i18next";
import { TRANSACTION_STATE_ID_LABEL } from "utils/constants";
import { ISO8601toDDMMYYYHHMM } from "utils/iso8601toDDMMYYHHMM";
import FlowTransition from "../../../component/flowtransition/FlowTransition";
import DniFinish from "./modalTransaction/dniFinish/DniFinish";
import FinishModal from "./modalTransaction/finish/FinishModal";
import HistoryModalTransaction from "./modalTransaction/history/HistoryModalTransaction";
import ReasonsCanceled from "./modalTransaction/reasonsCanceled/ReasonsCanceled";
import ReasonsCanceledConfirm from "./modalTransaction/reasonsCanceledConfirm/ReasonsCanceledConfirm";
import Undelivered from "./modalTransaction/undelivered/Undelivered";
import { DetailTransactionPropsType } from "./types";
import classNames from "classnames";
import TimeError from "../../../assets/transaction/TimeError.svg";
import "./detailTransaction.scss";

export const DetailTransaction: React.FC<DetailTransactionPropsType> = ({
  detailTransaction,
  resolutionHeightModal,
  closeModalDetailTransaction,
}): JSX.Element => {
  const STEP = {
    History: "History",
    DniFinish: "DniFinish",
    FinishModal: "FinishModal",
    ReasonsCanceled: "ReasonsCanceled",
    ReasonsCanceledConfirm: "ReasonsCanceledConfirm",
    Undelivered: "Undelivered",
  };

  return (
    <div className="modal-transaction">
      <Modal
        width="1190px"
        height={`${resolutionHeightModal}px`}
        isOpen={true}
        onClose={() => {
          closeModalDetailTransaction();
        }}
      >
        <div className="modal-transaction-container">
          <img
            onClick={() => {
              closeModalDetailTransaction();
            }}
            className="modal-transaction-close"
            src={Close}
            alt="cerrar"
          />

          <div className="container-detail-transaction-header-row modal-transaction-title">

            <h2 className="container-detail-transaction-header-col-sm-4">
              {i18next.t("transactions:label.transactions.transactionCode")}
            </h2>

            <p className="container-detail-transaction-header-col-sm-3">
              {i18next.t("transactions:label.transactions.orderNumber")}
            </p>
            <p className="container-detail-transaction-header-col-sm-2">
              {i18next.t("detailTransaction:title.detailTransaction.state")}
            </p>
            <p className="container-detail-transaction-header-col-sm-3 modal-transaction-date">
              {i18next.t("transactions:label.filter.SLA")}
            </p>

          </div>

          <div className="container-detail-transaction-header-row modal-transaction-subtitle">
            <h2 className="container-detail-transaction-header-col-sm-4">
              {detailTransaction.transaction.transactionCode}
            </h2>
            <div className="container-detail-transaction-header-col-sm-3">
              <Tooltip
                position={ToolTipPosition.bottom}
                message={detailTransaction.transaction.orderNumber}
                disabled={
                  detailTransaction.transaction.orderNumber.length <= 18
                }
              >
                <p>
                  {detailTransaction.transaction.orderNumber.substring(0, 18)}
                  {detailTransaction.transaction.orderNumber.length > 18 &&
                    "..."}
                </p>
              </Tooltip>
            </div>

            <p className="container-detail-transaction-header-col-sm-2">
              {i18next.t(
                TRANSACTION_STATE_ID_LABEL[
                  detailTransaction.transaction.state.id
                ]
              )}
            </p>

            <p className="container-detail-transaction-header-col-sm-3 modal-transaction-date">
              <span className="table-transactions-sla-date">
                {ISO8601toDDMMYYYHHMM(
                  detailTransaction.transaction.maxDeliveryDateTime
                ).substring(0, 10)}
              </span>

              <span
                className={classNames({
                  "in-alert-red": detailTransaction.transaction.inAlert,
                })}
              >
                {"-" +
                  ISO8601toDDMMYYYHHMM(
                    detailTransaction.transaction.maxDeliveryDateTime
                  ).substring(10, 16)}
              </span>
              {detailTransaction.transaction.inAlert && (
                <img
                  className="admin-table-inAlert"
                  src={TimeError}
                  alt="icono"
                />
              )}
            </p>
          </div>
          <hr
            className="modal-transaction-separate"
            id="modal-transaction-hr-title"
          />
          <FlowTransition
            firstPage={STEP.History}
            pages={{
              [STEP.History]: (props: FlowTrasitionParamsType) => (
                <HistoryModalTransaction
                  cancel={STEP.ReasonsCanceled}
                  finish={STEP.FinishModal}
                  {...props}
                />
              ),
              [STEP.ReasonsCanceled]: (props: FlowTrasitionParamsType) => (
                <ReasonsCanceled
                  reasonsCanceledConfirm={STEP.ReasonsCanceledConfirm}
                  {...props}
                />
              ),
              [STEP.ReasonsCanceledConfirm]: (
                props: FlowTrasitionParamsType
              ) => <ReasonsCanceledConfirm {...props} />,
              [STEP.DniFinish]: (props: FlowTrasitionParamsType) => (
                <DniFinish {...props} />
              ),
              [STEP.Undelivered]: (props: FlowTrasitionParamsType) => (
                <Undelivered {...props} />
              ),
              [STEP.FinishModal]: (props: FlowTrasitionParamsType) => (
                <FinishModal
                  {...props}
                  dniFinish={STEP.DniFinish}
                  undelivered={STEP.Undelivered}
                />
              ),
            }}
          />
        </div>
      </Modal>
    </div>
  );
};
