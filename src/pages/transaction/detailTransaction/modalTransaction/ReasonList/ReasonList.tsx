import React from "react";
import { DetailTransactionCancelItemType } from "sagas/types/detailTransactions";

export const ReasonList: React.FC<any> = ({
  selectedClick,
  messages,
  handleClick
}): JSX.Element => {

  return (
    <div className="modal-transaction-reasonsCanceled-scroll">
      <hr className="modal-transaction-reasonsCanceled-separate" />
      {messages &&
        messages.map((message: DetailTransactionCancelItemType) => (
          <div key={message.id} className="modal-transaction-reason-container">
            <p
              onClick={() => {handleClick(message)}}
              data-value={message.id}
              className={
                selectedClick.id === message.id && selectedClick.state === true
                  ? "p-font-weight"
                  : ""
              }
            >
              {message?.message}
            </p>
          </div>
        ))}
      
    </div>
  );
};
