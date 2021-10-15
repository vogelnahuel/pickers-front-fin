import { Modal } from "@pickit/pickit-components";
import Close from "assets/transaction/Close.svg";
import useHistory from "hooks/useHistory";
import React from "react";
import { ISO8601toDDMMYYYHHMM } from "utils/iso8601toDDMMYYHHMM";
import stateName from "../transaction/tableTransaction/statesNames";
import FlowTransition from "./FlowTransition";
import { DniFinish } from "./modalTransaction/OptionList/dniFinish/DniFinish";
import { FinishModal } from "./modalTransaction/OptionList/finish/FinishModal";
import { History } from "./modalTransaction/OptionList/history/History";
import { OptionList } from "./modalTransaction/OptionList/OptionList";
import { ReasonsCanceled } from "./modalTransaction/OptionList/reasonsCanceled/ReasonsCanceled";
import { ReasonsCanceledConfirm } from "./modalTransaction/OptionList/reasonsCanceledConfirm/ReasonsCanceledConfirm";
import { Undelivered } from "./modalTransaction/OptionList/undelivered/Undelivered";
import { DetailTransactionPropsType } from "./types";

export const DetailTransaction = ({
  detailTransaction,
  resolutionHeightModal,
  closeModalDetailTransaction,
}: DetailTransactionPropsType) => {

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
            <p className="modal-transaction-fecha">
              {detailTransaction &&
              detailTransaction.transaction &&
              detailTransaction.transaction.inAlert? (
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
              {detailTransaction && detailTransaction.transaction
                &&  detailTransaction.transaction.transactionCode}
            </h2>
            <p>
              {detailTransaction && detailTransaction.transaction
                && stateName(detailTransaction.transaction.state.id)}
            </p>

            <p className="modal-transaction-fecha">
              {detailTransaction && detailTransaction.transaction
                && ISO8601toDDMMYYYHHMM(detailTransaction.transaction.maxDeliveryDateTime)
                }
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
                
                    <History
                    cancel={()=>setCurrentStep(STEP.ReasonsCanceled)}
                    finish={()=>setCurrentStep(STEP.FinishModal)}
                    FilterTransaction={detailTransaction}
                    />
                 
                ),
                [STEP.ReasonsCanceled]: () => (
                  <ReasonsCanceled onBack={() => setCurrentStep(STEP.History) } />
                ),
                [STEP.ReasonsCanceledConfirm]: () => (
                  <ReasonsCanceledConfirm onBack={() => setCurrentStep(STEP.History) } />
                ),
                [STEP.DniFinish]: () => (
                    <DniFinish onBack={() => {} } />
                ),
                [STEP.Undelivered]: () => (
                  <Undelivered onBack={() => setCurrentStep(STEP.History) } />
                ),
                [STEP.FinishModal]: () =>  ( <FinishModal  onBack={() => setCurrentStep(STEP.History)  }  DniFinish={()=>setCurrentStep(STEP.DniFinish)} undelivered={()=>setCurrentStep(STEP.Undelivered)} />  ),
            }} 
            />
         
        </div>
      </Modal>
    </div>
  );
};
