import React, { Fragment } from "react";

import { connect } from "react-redux";
import { actions as detailTransaction } from "reducers/detailTransaction";
import { transactionsSelector } from "reducers/transactions";
import { TransactionResponseTypeResult } from "sagas/types/transactions";
import { AppDispatch, RootState } from "store";
import TreePoints from "../../../assets/transaction/TreePoints.svg";
import TimeError from "../../../assets/transaction/TimeError.svg";
import { transactionTableTitles } from "../../../utils/constants";
import "./TableTransaction.scss";
import { TableTransactionPropsTypes } from "./types";
import i18next from "i18next";
import { ISO8601toDDMMYYYHHMM } from "utils/iso8601toDDMMYYHHMM";
import { classNames } from "@react-pdf-viewer/core";

export const TableTransaction = ({
  transactions,
  getDetailTransaction,
}: TableTransactionPropsTypes) => {
  return (
    <div className="container-transaction-table-fluid">
      <div className="container-transaction-table-row title-table-transactions">
        <div className="container-transaction-table-col-sm-2"></div>

        {transactionTableTitles.map((titulo: string) => (
          <Fragment key={titulo}>
            {titulo === "transactionTable:label.table.slaExpiration" ? (
              <div className="container-transaction-table-col-sm-6 flex-align-center">
                {i18next.t(titulo)}
              </div>
            ) : titulo === "transactionTable:label.table.status" ? (
              <div className="container-transaction-table-col-sm-5 flex-align-center">
                {i18next.t(titulo)}
              </div>
            ) : (
              <div className="container-transaction-table-col-sm-4 flex-align-center">
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
            key={data.transaction.id}
            onClick={() => getDetailTransaction(data.transaction.id)}
          >
            <div className="container-transaction-table-col-sm-2 flex-align-center">
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
              <span className="table-transactions-sla-date">
                {ISO8601toDDMMYYYHHMM(
                  data.transaction.maxDeliveryDateTime
                ).substring(0, 10)}
              </span>

              <span
                className={classNames({
                  "in-alert-red": data.transaction.inAlert,
                })}
              >
                {"-" +
                  ISO8601toDDMMYYYHHMM(
                    data.transaction.maxDeliveryDateTime
                  ).substring(10, 16)}
              </span>

              {data.transaction.inAlert && (
                <img
                  className="admin-table-inAlert"
                  src={TimeError}
                  alt="icono"
                />
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
