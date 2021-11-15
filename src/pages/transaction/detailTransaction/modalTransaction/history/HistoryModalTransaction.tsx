import { Input } from "component/inputs/Input";
import React from "react";
import { Field, Form } from "react-final-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  actions as detailTransactionActions,
  selectors as detailTransactionSelector,
} from "reducers/detailTransaction";
import { AppDispatch, RootState } from "store";
import Reload from "../../../../../assets/transaction/Reload.svg";
import "../optionList.css";
import TransactionStateHistory from "../history/transactionStateHistory/TransactionStateHistory";
import { HistoryModalTransactionType } from "../types";
import "./HistoryModalTransaction.scss";
import i18next from "i18next";

const HistoryModalTransaction: React.FC<HistoryModalTransactionType> = ({
  detailTransaction,
  cancel,
  finish,
  next,
  getDetailTransaction,
}): JSX.Element => {
  const cancelEnabledStatus = [1, 2, 3, 4];
  const finishEnabledStatus = [5, 6, 7, 8];

  return (
    <div className="modal-transaction-scroll">
      <div>
        <div className="modal-transaction-difuminar4"></div>
        <div className="modal-transaction-difuminar5"></div>
        <div className="modal-transaction-difuminar6"> </div>
      </div>
      <div className="modal-transaction-optionContainer-scroll">
        <Form
          onSubmit={() => {}}
          initialValues={{
            areaCode: detailTransaction.picker.phone
              ? detailTransaction.picker.phone.areaNumber
              : "-",
            pickerId: detailTransaction.picker.id
              ? detailTransaction.picker.id
              : "-",
            name: detailTransaction.picker.name
              ? `${detailTransaction.picker.name} ${detailTransaction.picker.surname}`
              : "-",
            phone: detailTransaction.picker.phone
              ? detailTransaction.picker.phone.number
              : "-",
            deliveryAddress: detailTransaction.destination.formattedAddress,
            pickupAddress: detailTransaction.origin.formattedAddress,
            retailer:
              detailTransaction.seller && detailTransaction.seller.name !== null
                ? detailTransaction.seller.name
                : "-",
            reveiverName: `${detailTransaction.client.name} ${detailTransaction.client.lastName}`,
            reveiverPhone: detailTransaction.client.phone,
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="container-history-fluid">
                <div className="container-history-row">
                  <div className="container-history-col">
                    <div className="container-history-row">
                      <div className="container-history-col-4">
                        <Field
                          type="text"
                          name="pickerId"
                          label={i18next.t(
                            "filterTransaction:label.filter.idPicker"
                          )}
                          component={Input}
                          className="Admin-Pickers-input"
                          disabled
                        />
                      </div>
                      <div className="container-history-col-4">
                        <Field
                          type="text"
                          name="name"
                          label={i18next.t(
                            "filterPickers:label.filter.name"
                          )}
                          component={Input}
                          className="Admin-Pickers-input"
                          disabled
                        />
                      </div>

                      <div className="container-history-col-2">
                        <Field
                          type="text"
                          name="areaCode"
                          label={i18next.t("detailPicker:label.user.areaCode")}
                          component={Input}
                          className="Admin-Pickers-input"
                          disabled
                        />
                      </div>
                      <div className="container-history-col-2">
                        <Field
                          type="text"
                          name="phone"
                          label={i18next.t("detailPicker:label.user.phone")}
                          component={Input}
                          className="Admin-Pickers-input"
                          disabled
                        />
                      </div>
                      <div className="container-history-col-4">
                        <Field
                          type="text"
                          name="deliveryAddress"
                          label={i18next.t(
                            "detailTransaction:label.detailTransaction.deliveryAddress"
                          )}
                          component={Input}
                          className="Admin-Pickers-input"
                          disabled
                        />
                      </div>
                      <div className="container-history-col-4">
                        <Field
                          type="text"
                          name="pickupAddress"
                          label={i18next.t(
                            "detailTransaction:label.detailTransaction.pickupAddress"
                          )}
                          component={Input}
                          className="Admin-Pickers-input"
                          disabled
                        />
                      </div>
                      <div className="container-history-col-4">
                        <Field
                          type="text"
                          name="retailer"
                          label={i18next.t(
                            "detailTransaction:label.detailTransaction.retailer"
                          )}
                          component={Input}
                          className="Admin-Pickers-input"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="container-history-col-auto">
                    <Link
                      className="modal-transaction-button-irApicker-a"
                      target={detailTransaction.picker.id ? "_blank" : ""}
                      rel="noopener noreferrer"
                      to={
                        detailTransaction.picker.id
                          ? `pickers/${detailTransaction.picker.id}`
                          : "#"
                      }
                    >
                      <button
                        type="button"
                        className={
                          detailTransaction.picker.id
                            ? "modal-transaction-button-irApicker"
                            : "modal-transaction-button-irApicker-disabled"
                        }
                      >
                        {i18next.t(
                          "detailTransaction:button.historyModal.picker"
                        )}
                      </button>
                    </Link>
                  </div>
                </div>

                <h3
                  className="modal-transaction-h3"
                  id="modal-transaction-history-Final"
                >
                  {i18next.t(
                    "detailTransaction:title.historyModal.finalConsumer"
                  )}
                </h3>
                <hr
                  className="modal-transaction-separate"
                  id="modal-transaction-hr-title"
                />
                <div className="container-history-row">
                  <div className="container-history-col">
                    <div className="container-history-row">
                      <div className="container-history-col-4">
                        <Field
                          type="text"
                          name="reveiverName"
                          label={i18next.t(
                            "filterPickers:label.filter.name"
                          )}
                          component={Input}
                          className="Admin-Pickers-input"
                          disabled
                        />
                      </div>
                      <div className="container-history-col-4">
                        <Field
                          type="text"
                          name="reveiverPhone"
                          label={i18next.t("detailPicker:label.user.phone")}
                          component={Input}
                          className="Admin-Pickers-input"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="container-history-col-auto visibility-hidden">
                    <Link
                      className="modal-transaction-button-irApicker-a"
                      target={detailTransaction.picker.id ? "_blank" : ""}
                      rel="noopener noreferrer"
                      to={
                        detailTransaction.picker.id
                          ? `pickers/${detailTransaction.picker.id}`
                          : "#"
                      }
                    >
                      <button
                        type="button"
                        disabled
                        className={
                          detailTransaction.picker.id
                            ? "modal-transaction-button-irApicker"
                            : "modal-transaction-button-irApicker-disabled"
                        }
                      >
                        Ir a picker
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Form>
        <TransactionStateHistory
          transactionHistory={detailTransaction.transactionHistory}
        />
      </div>
      <div>
        <div className="modal-transaction-difuminar1"> </div>
        <div className="modal-transaction-difuminar2"></div>
        <div className="modal-transaction-difuminar3"></div>
      </div>
      <div className="button-container">
        <button
          disabled={
            !cancelEnabledStatus.includes(
              detailTransaction.transaction.state.id
            )
          }
          onClick={() => {
            next(cancel);
          }}
          className="button-modal-transaction"
        >
          {i18next.t("global:label.button.cancel")}
        </button>
        <button
          disabled={
            !finishEnabledStatus.includes(
              detailTransaction.transaction.state.id
            )
          }
          onClick={() => {
            next(finish);
          }}
          className="button-modal-transaction"
        >
          {i18next.t("global:label.button.finish")}
        </button>
        <div
          onClick={() => getDetailTransaction(detailTransaction.transaction.id)}
          className="modal-transaction-reload"
        >
          <img
            className="modal-transaction-reload-img"
            src={Reload}
            alt="reload"
          />
          <p>{i18next.t("detailTransaction:button.historyModal.refresh")}</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  detailTransaction: detailTransactionSelector.getDetailTransaction(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getDetailTransaction: (id: string) => {
    dispatch(detailTransactionActions.getDetailTransactionRequest(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryModalTransaction);
