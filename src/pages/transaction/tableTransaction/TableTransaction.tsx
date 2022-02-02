import React, { Fragment } from "react";
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
    <div className="container-transaction-table-fluid">
      <div className="container-transaction-table-row titleTableTransactions">
        <div className="container-transaction-table-col-sm-1"></div>

        {transactionTableTitles.map((titulo: string) => (
          <Fragment key={titulo}>
            {titulo === "transactionTable:label.table.slaExpiration" ? (
              <div
                className="container-transaction-table-col-sm-6 flex-align-center"
                key={titulo}
              >
                {i18next.t(titulo)}
              </div>
            ) : titulo === "transactionTable:label.table.status" ? (
              <div
                className="container-transaction-table-col-sm-5 flex-align-center"
                key={titulo}
              >
                {i18next.t(titulo)}
              </div>
            ) : (
              <div
                className="container-transaction-table-col-sm-4 flex-align-center"
                key={titulo}
              >
                {i18next.t(titulo)}
              </div>
            )}
          </Fragment>
        ))}
      </div>

      {transactions.length > 0 &&
        transactions.map((data: TransactionResponseTypeResult) => (
          <div
            id={`${data.transaction.id}`}
            className="container-transaction-table-row table-content"
            key={`${data.transaction.id}`}
            onClick={() => getDetailTransaction(data.transaction.id)}
          >
            <div className="container-transaction-table-col-sm-1 flex-align-center">
              <img
                className="img-transaction"
                src={TreePoints}
                alt="TreePoints"
              />
            </div>
            <div className="container-transaction-table-col-sm-4 flex-align-center">
              {data.transaction.transactionCode}
            </div>
            <div className="container-transaction-table-col-sm-4 flex-align-center">
              {data.transaction.orderNumber}
            </div>
            <div className="container-transaction-table-col-sm-4 flex-align-center">
              {data.transaction.externalPickerId}
            </div>
            <div className="container-transaction-table-col-sm-6 flex-align-center">
              {moment(
                data.transaction.maxDeliveryDateTime.substring(0, 10),
                DATE_FORMATS.shortISODate
              ).format(DATE_FORMATS.shortDate)}
              {data.transaction.inAlert && (
                <div className="admin-table-alerta">
                  {i18next.t("transactionTable:label.table.inAlert")}
                </div>
              )}
            </div>
            <div className="container-transaction-table-col-sm-5 flex-align-center">
              {data.transaction.state.name}
            </div>
          </div>
        ))}
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
