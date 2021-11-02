import volver from "assets/admin/PendingUser/volver.svg";
import Card from "assets/transaction/Card.svg";
import { Input } from "component/inputs/Input";
import useValidationSchema from "hooks/useValidationSchema";
import React from "react";
import { Col } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { connect } from "react-redux";
import {
  actions as detailTransactionActions,
  selectors as detailTransactionSelector,
} from "reducers/detailTransaction";
import { postDnideliveredResponseType } from "sagas/types/detailTransactions";
import { AppDispatch, RootState } from "store";
import { VALIDATION_REGEX } from "utils/constants";
import * as yup from "yup";
import { DniFinishFormValuesType, DniFinishPropsType } from "../types";
import "./dniFinish.scss";

const DniFinish: React.FC<DniFinishPropsType> = ({
  back,
  getDetailTransactionDniDeliveredRequest,
  detailTransaction,
}): JSX.Element => {
  const validationSchema: yup.SchemaOf<any> = yup.object({
    dni: yup
      .string()
      .required("Este campo es requerido")
      .matches(VALIDATION_REGEX.regDNI, "El correo ingresado es inválido"),
  });
  return (
    <div>
      <div
        onClick={() => {
          back();
        }}
        className="modal-transaction-finish-volver"
      >
        <img
          className="modal-transaction-finish-volver-img"
          src={volver}
          alt="volver"
        />
        <p className="modal-transaction-finish-volver">Volver</p>
      </div>

      <div className="modal-dni-center">
        <img className="modal-dni-finish-card" src={Card} alt="Card" />
        <h3 className="modal-dni-finish-h3">
          Ingresá el DNI de quien recibió el paquete
        </h3>
        <Form
          onSubmit={(values: DniFinishFormValuesType) => {
            console.log(values.dni.toString());
            getDetailTransactionDniDeliveredRequest(
              { key: "identificationNumber", value: values.dni.toString() },
              detailTransaction.transaction.id
            );
          }}
          validate={useValidationSchema(validationSchema)}
        >
          {({ handleSubmit, invalid }) => (
            <form onSubmit={handleSubmit}>
              <Col xxl={6}>
                <div className="modal-input-dni-finish">
                  <Field
                    name="dni"
                    component={Input}
                    placeholder="Ingresá el DNI"
                    className="Admin-Pickers-input"
                    id="dni"
                    maxLength={8}
                    label="DNI*"
                  ></Field>
                </div>
              </Col>
              <div className="finish-modal-button-container">
                <button disabled={invalid} className="finish-button">
                  Finalizarla
                </button>
              </div>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getDetailTransactionDniDeliveredRequest: (
    params: postDnideliveredResponseType,
    id: string
  ) => {
    dispatch(
      detailTransactionActions.getDetailTransactionDniDeliveredRequest(
        params,
        id
      )
    );
  },
});

const mapStateToProps = (state: RootState) => ({
  detailTransaction: detailTransactionSelector.getDetailTransaction(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(DniFinish);
