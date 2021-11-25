import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { actions as detailTransaction } from "reducers/detailTransaction";
import { transactionsSelector } from "reducers/transactions";
import { TransactionResponseTypeResult } from "sagas/types/transactions";
import { AppDispatch, RootState } from "store";
import TreePoints from "../../../assets/transaction/TreePoints.svg";
import { DATE_FORMATS, transactionTableTitles } from "../../../utils/constants";
import "./TableTransaction.scss";
import { TableTransactionPropsTypes } from "./types";
import i18next from "i18next";

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
              <td key={titulo}>{i18next.t(titulo)}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 &&
            transactions.map((data: TransactionResponseTypeResult) => (
              <tr
                id={`${data.transaction.id}`}
                key={`${data.transaction.id}`}
                onClick={() => getDetailTransaction(data.transaction.id)}
              >
                <td>
                  <img
                    className="img-transaction"
                    src={TreePoints}
                    alt="TreePoints"
                  />
                </td>
                <td> {data.transaction.transactionCode} </td>
                <td> {data.transaction.externalPickerId}</td>
                <td>
                  {moment(
                    data.transaction.maxDeliveryDateTime.substring(0, 10),
                    DATE_FORMATS.shortISODate
                  ).format(DATE_FORMATS.shortDate)}
                  {data.transaction.inAlert && (
                    <div className="admin-table-alerta">
                      {i18next.t("transactionTable:label.table.inAlert")}
                    </div>
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
  transactions: transactionsSelector(state).transactions,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getDetailTransaction: (id: string) => {
    dispatch(detailTransaction.getDetailTransactionRequest(id));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(TableTransaction);
