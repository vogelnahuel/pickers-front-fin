import { Modal } from "@pickit/pickit-components";
import Close from "assets/transaction/Close.svg";
import React from "react";
import { ISO8601toDDMMYYYHHMM } from "utils/iso8601toDDMMYYHHMM";
import stateName from "../transaction/tableTransaction/statesNames";
import { OptionList } from "./modalTransaction/OptionList/OptionList";
import { DetailTransactionPropsType } from "./types";

export const DetailTransaction = ({
  detailTransaction,
  resolutionHeightModal,
  closeModalDetailTransaction,
}: DetailTransactionPropsType) => {
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

          <div className="modal-transaction-scroll">
              <OptionList FilterSelectedTransaction={detailTransaction} />
          </div>
        </div>
      </Modal>
    </div>
  );
};
