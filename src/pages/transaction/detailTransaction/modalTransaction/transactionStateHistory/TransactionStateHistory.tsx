import { TransactionHistoryType } from "pages/transaction/types";
import React from "react";
import { Link } from "react-router-dom";
import { ISO8601toDDMMYYYHHMM } from "utils/iso8601toDDMMYYHHMM";
import Cancel from "../../../../../assets/transaction/Cancel.svg";
import Connector from "../../../../../assets/transaction/Connector.svg";
import Okey from "../../../../../assets/transaction/Okey.svg";
import { TRANSACTION_ACTIONS_TAG_LABEL } from "../../../../../utils/constants";

const TransactionStateHistory: React.FC<TransactionHistoryType> = ({
  transactionHistory,
}): JSX.Element => {
  const cancelStatus = [
    "state_pickup_cancelled_temporally",
    "state_pickup_cancelled_permanently",
    "state_lost",
  ];
  return (
    <div>
      <h3 className="modal-transaction-h3">Historial</h3>
      <hr className="modal-transaction-separate-option " />
      {transactionHistory.map((state) => (
        <div key={state.id}>
           
                <div className="modal-transaction-part" key={state.id}>
          <img
            src={cancelStatus.includes(state.reasonTag.tag) ? Cancel : Okey}
            alt="Cancel"
            className="modal-transaction-img-okey"
          />
          <p className="modal-transaction-part-subtitle">
            {TRANSACTION_ACTIONS_TAG_LABEL[state.reasonTag.tag]}
          </p>
          {state.metadata.length > 0 && (
            <p className="modal-transaction-part-subtitle-metadata">
              {". Motivo: "}
              {state.metadata[0].value.toLocaleLowerCase()}
            </p>
          )}
          <p className="modal-transaction-part-info">
            {ISO8601toDDMMYYYHHMM(state.createdAt)}
          </p>

          {state.reasonTag.tag === "assigned_picker" && (
            <Link
              target="_blank"
              style={{ textDecoration: "none" }}
              className="modal-transaction-a"
              to={state.curentValue ? `/pickers/${state.curentValue}` : "#"}
            >
              Ver picker
            </Link>
          )}
          </div>
          <div className="modal-transaction-part">
            <img
              src={Connector}
              alt="okey"
              className="modal-transaction-img-connector"
            />
            
          </div>
          
        </div>
      ))}
    </div>
  );
};
export default TransactionStateHistory;
