import classNames from "classnames";
import React from "react";
import { DetailTransactionCancelItemType } from "sagas/types/detailTransactions";
import { ReasonListPropsType } from "../types";

export const ReasonList: React.FC<ReasonListPropsType> = ({
  selectedClick,
  messages,
  handleClick,
}): JSX.Element => {
  return (
    <div className="modal-transaction-reasonsCanceled-scroll">
      <hr className="modal-transaction-reasonsCanceled-separate" />
      {messages &&
        messages.map((message: DetailTransactionCancelItemType) => (
          <div key={message.id} className="modal-transaction-reason-container">
            <p
              onClick={() => {
                handleClick(message);
              }}
              data-value={message.id}
              className={classNames({
                "p-font-weight":
                  selectedClick.id === message.id &&
                  selectedClick.state === true,
              })}
            >
              {message?.message}
            </p>
          </div>
        ))}
    </div>
  );
};
