import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import {
  actions as detailTransaction
} from "reducers/detailTransaction";
import { selectors as transactionSelectors } from "reducers/transactions";
import { TransactionResponseTypeResult } from "sagas/types/transactions";
import { AppDispatch, RootState } from "store";
import TreePoints from "../../../../assets/transaction/TreePoints.svg";
import { transactionTableTitles } from "../../../../utils/constants";
import "./TableTransaction.scss";
import { TableTransactionPropsTypes } from "./types";



export const TableTransaction = ({
  transactions,
  getDetailTransaction,
}: TableTransactionPropsTypes) => {
  return (
    <div>
      <table className="titleTableTransactions">
        <thead>
          <tr>
            <td></td>
            {transactionTableTitles.map((titulo: string) => (
              <td key={titulo}>{titulo}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 &&
            transactions.map((data: TransactionResponseTypeResult) => (
              <tr
                key={data.transaction.id}
                onClick={() => getDetailTransaction(data.transaction.id)}
              >
                <td>
                  <img
                    data-name={data.transaction.id}
                    id={`${data.transaction}`}
                    className="img-transaction"
                    src={TreePoints}
                    alt="TreePoints"
                  />{" "}
                </td>
                <td> {data.transaction.transactionCode} </td>
                <td> {data.transaction.externalPickerId}</td>
                <td>
                  {" "}
                  {moment(
                    data.transaction.maxDeliveryDateTime.substring(0, 10),
                    "YYYY-MM-DD"
                  ).format("DD/MM/YYYY")}
                  {data.transaction.inAlert && (
                    <div className="admin-table-alerta">En alerta</div>
                  )}
                </td>
                <td> {data.transaction.state.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  transactions: transactionSelectors.getTransactions(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getDetailTransaction: (id: string) => {
    dispatch(detailTransaction.getDetailTransactionRequest(id));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(TableTransaction);
