import { TransactionHistoryType } from "pages/transaction/types";
import React from "react";
import { DetailTransactionHistoryType } from "sagas/types/detailTransactions";
import Okey from "../../../../../assets/transaction/Okey.svg"
import Cancel from "../../../../../assets/transaction/Cancel.svg"
import Connector from "../../../../../assets/transaction/Connector.svg"
import { Row } from "react-bootstrap";

const TransactionStateHistory: React.FC<TransactionHistoryType> = ({
  transactionHistory,
}): JSX.Element => {
  console.log(transactionHistory);
  return (
    <div>
        <Row>
                <h3
                  className="modal-transaction-h3"
                  id="modal-transaction-history-Final"
                >
                  Historial
                </h3>
                <hr
                  className="modal-transaction-separate"
                  id="modal-transaction-hr-title"
                />
              </Row>
      {transactionHistory.map((state: DetailTransactionHistoryType) => {
          return(
          <div key={state.id}>
              
              
                
                  <img src={Okey} alt="okey" className="modal-transaction-img-okey"/>

                  <div className="modal-transaction-part">
                   <img
                     src={Connector}
                     alt="okey"
                     className="modal-transaction-img-connector"
                   />
                   </div>
         
          </div>)
      })}
      <img src={Okey} alt="okey" className="modal-transaction-img-okey"/>
    </div>
  );
};

export default TransactionStateHistory;
