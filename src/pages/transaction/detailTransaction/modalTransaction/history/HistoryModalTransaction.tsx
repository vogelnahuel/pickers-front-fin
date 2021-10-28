import { Input } from "component/inputs/Input";
import React from "react";
import { Col, Row } from "react-bootstrap";
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
              : "Sin asignar",
            name: detailTransaction.picker.name
              ? `${detailTransaction.picker.name} ${detailTransaction.picker.surname}`
              : "Sin asignar",
            phone: detailTransaction.picker.phone
              ? detailTransaction.picker.phone.number
              : "-",
            deliveryAddress: detailTransaction.destination.formattedAddress,
            pickupAddress: detailTransaction.origin.formattedAddress,
            retailer: detailTransaction.seller
              ? detailTransaction.seller.name
              : "-",
            reveiverName: `${detailTransaction.client.name} ${detailTransaction.client.lastName}`,
            reveiverPhone: detailTransaction.client.phone,
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Field
                    type="text"
                    name="pickerId"
                    label="Id de picker"
                    component={Input}
                    className="Admin-Pickers-input"
                    disabled
                  />
                </Col>
                <Col>
                  <Field
                    type="text"
                    name="name"
                    label="Nombre y apellido"
                    component={Input}
                    className="Admin-Pickers-input"
                    disabled
                  />
                </Col>
                <Col>
                  <Row>
                    <Col md={6}>
                      <Field
                        type="text"
                        name="areaCode"
                        label="Código de área"
                        component={Input}
                        className="Admin-Pickers-input"
                        disabled
                      />
                    </Col>
                    <Col md={6}>
                      <Field
                        type="text"
                        name="phone"
                        label="Teléfono"
                        component={Input}
                        className="Admin-Pickers-input"
                        disabled
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md={2}>
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
                      Ir a picker
                    </button>
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Field
                    type="text"
                    name="deliveryAddress"
                    label="Dirección de entrega"
                    component={Input}
                    className="Admin-Pickers-input"
                    disabled
                  />
                </Col>
                <Col>
                  <Field
                    type="text"
                    name="pickupAddress"
                    label="Dirección de retiro"
                    component={Input}
                    className="Admin-Pickers-input"
                    disabled
                  />
                </Col>
                <Col>
                  <Field
                    type="text"
                    name="retailer"
                    label="Retailer"
                    component={Input}
                    className="Admin-Pickers-input"
                    disabled
                  />
                </Col>
                <Col md={2}></Col>
              </Row>
              <Row>
                <h3
                  className="modal-transaction-h3"
                  id="modal-transaction-history-Final"
                >
                  Consumidor final
                </h3>
                <hr
                  className="modal-transaction-separate"
                  id="modal-transaction-hr-title"
                />

                <Col md={3}>
                  <Field
                    type="text"
                    name="reveiverName"
                    label="Nombre y apellido"
                    component={Input}
                    className="Admin-Pickers-input"
                    disabled
                  />
                </Col>
                <Col md={3}>
                  <Field
                    type="text"
                    name="reveiverPhone"
                    label="Teléfono"
                    component={Input}
                    className="Admin-Pickers-input"
                    disabled
                  />
                </Col>
              </Row>
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
          Cancelar
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
          Finalizar
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
          <p>Actualizar</p>
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
