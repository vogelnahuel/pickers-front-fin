import React, { Fragment } from "react";
import moment from "moment";
import { TransactionsProps } from "./types";
import "./transactions.scss";
import {
  TRANSACTION_STATE_TAG_LABEL,
  PRELIQUIDATION_TRANSACTIONS_LABELS,
} from "utils/constants";
import classNames from "classnames";
import i18next from "i18next";

export const Transactions = ({ total, quantity, items }: TransactionsProps) => {
  return (
    <>
      <div className="container-detail-preliquidation-table-col">
        <div className="container-detail-preliquidation-table-row">
          {PRELIQUIDATION_TRANSACTIONS_LABELS.map((label) => (
            <div
              key={label}
              className="container-detail-preliquidation-table-col-sm-1 detail-preliquidation-table-head"
            >
              <p>{i18next.t(label)}</p>
            </div>
          ))}
        </div>
        <div className="detail-preliquidation-table-content overflow-scroll">
          {items.map((item, index) => (
            <div className="container-detail-preliquidation-table-row" key={item.transactionCode || index}>
              <div className="container-detail-preliquidation-table-col-sm-1 detail-preliquidation-table-body">
                <p>{item.transactionCode || "-"}</p>
              </div>
              <div className="container-detail-preliquidation-table-col-sm-1 detail-preliquidation-table-body">
                <p>
                  {item.finishedAt
                    ? moment(item.finishedAt).format("DD/MM/YYYY")
                    : ""}
                </p>
              </div>
              <div className="container-detail-preliquidation-table-col-sm-1 detail-preliquidation-table-body">
                <p>{i18next.t(TRANSACTION_STATE_TAG_LABEL[item.status.tag])}</p>
              </div>
              <div className="container-detail-preliquidation-table-col-sm-1 detail-preliquidation-table-body">
                <p
                  className={classNames("transaction-amount-item", {
                    "amount-plus": item.status.tag === "plus",
                    "amount-subtract": item.status.tag === "subtract",
                  })}
                >{`$ ${item.amount}`}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="container-detail-preliquidation-table-row">
          <div className="row-transparent"></div>
          <div className="container-detail-preliquidation-table-col-sm-3 ">
            <p className="transaction-total-text">
              {i18next.t("detailPreliquidation:label.table.total")}
            </p>
            <p className="transaction-quantity">
              {`${quantity} ${i18next.t(
                quantity > 1
                  ? "detailPreliquidation:label.title.transactions"
                  : "detailPreliquidation:label.title.transaction"
              )}`}
            </p>
          </div>
          <div className="container-detail-preliquidation-table-col-sm-1 amount-container">
            <p>{`$ ${total}`}</p>
          </div>
        </div>
      </div>
    </>
  );
};
