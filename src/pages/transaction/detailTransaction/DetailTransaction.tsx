import { Modal } from "@pickit/pickit-components";
import Close from "assets/transaction/Close.svg";
import useHistory from "hooks/useHistory";
import React from "react";
import { ISO8601toDDMMYYYHHMM } from "utils/iso8601toDDMMYYHHMM";
import FlowTransition from "../../../component/flowtransition/FlowTransition";
import { TRANSACTION_STATE_ID_LABEL } from "../../../utils/constants";
import { DniFinish } from "./modalTransaction/dniFinish/DniFinish";
import { FinishModal } from "./modalTransaction/finish/FinishModal";
import HistoryModalTransaction from "./modalTransaction/history/HistoryModalTransaction";
import { ReasonsCanceled } from "./modalTransaction/reasonsCanceled/ReasonsCanceled";
import { ReasonsCanceledConfirm } from "./modalTransaction/reasonsCanceledConfirm/ReasonsCanceledConfirm";
import { Undelivered } from "./modalTransaction/undelivered/Undelivered";
import { DetailTransactionPropsType } from "./types";

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
  const [currentStep, setCurrentStep] = useHistory([STEP.History]);
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

          <div className="modal-transaction-title">
            <h2>Código de transacción</h2>
            <p>Estado</p>
            <p className="modal-transaction-date">
              {detailTransaction &&
              detailTransaction.transaction &&
              detailTransaction.transaction.inAlert ? (
                <span className="transaction-modal-alert modal-transaction-alerta">
                  En alerta
                </span>
              ) : (
                <span className="modal-transaction-space"></span>
              )}
              Vencimiento SLA
            </p>
          </div>
          <div className="modal-transaction-subtitle">
            <h2>
              {detailTransaction.transaction.transactionCode}
            </h2>
            <p>
              {TRANSACTION_STATE_ID_LABEL[detailTransaction.transaction.state.id]}
            </p>

            <p className="modal-transaction-date">
              {detailTransaction &&
                detailTransaction.transaction &&
                ISO8601toDDMMYYYHHMM(
                  detailTransaction.transaction.maxDeliveryDateTime
                )}
            </p>
          </div>
          <hr
            className="modal-transaction-separate"
            id="modal-transaction-hr-title"
          />

          {/* <OptionList FilterSelectedTransaction={detailTransaction} /> */}
          <FlowTransition
            currentPage={currentStep}
            pages={{
              [STEP.History]: () => (
                <HistoryModalTransaction
                  cancel={() => setCurrentStep(STEP.ReasonsCanceled)}
                  finish={() => setCurrentStep(STEP.FinishModal)}
                />
              ),
              [STEP.ReasonsCanceled]: () => (
                <ReasonsCanceled onBack={() => setCurrentStep(STEP.History)} />
              ),
              [STEP.ReasonsCanceledConfirm]: () => (
                <ReasonsCanceledConfirm
                  onBack={() => setCurrentStep(STEP.History)}
                />
              ),
              [STEP.DniFinish]: () => <DniFinish onBack={() => {}} />,
              [STEP.Undelivered]: () => (
                <Undelivered onBack={() => setCurrentStep(STEP.History)} />
              ),
              [STEP.FinishModal]: () => (
                <FinishModal
                  onBack={() => setCurrentStep(STEP.History)}
                  DniFinish={() => setCurrentStep(STEP.DniFinish)}
                  undelivered={() => setCurrentStep(STEP.Undelivered)}
                />
              ),
            }}
          />
        </div>
      </Modal>
    </div>
  );
};
