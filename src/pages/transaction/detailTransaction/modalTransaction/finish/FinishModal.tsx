import volver from "assets/admin/PendingUser/volver.svg";
import Info from "assets/transaction/Info.svg";
import { useState } from "react";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "store";
import "./finishModal.scss";
import {
  actions as detailTransactionActions,
  selectors as detailTransactionSelector,
} from "reducers/detailTransaction";
import { postDnideliveredResponseType } from "sagas/types/detailTransactions";
import { FinishModalPropsType } from "../types";

const FinishModal: React.FC<FinishModalPropsType> = ({
  detailTransaction,
  getDetailTransactionFinishLostRequest,
  onBack,
  DniFinish,
  undelivered,
}): JSX.Element => {
  const [RadioActive, setRadioActive] = useState(false);
  const [checkBoxSelected, setcheckBoxSelected] = useState("");
  const finishStates = {
    LOST: "LOST",
    RETURNED: "RETURNED",
    DELIVERED: "DELIVERED",
  };
  const deliverableStates=[8];

  const handleCheckboxClick = (e: any) => {
    setcheckBoxSelected(e.target.value);
    setRadioActive(true);
  };
  const finishTransaction = () => {
    switch (checkBoxSelected) {
      case finishStates.DELIVERED:
        DniFinish();
        break;
      case finishStates.RETURNED:
        undelivered();
        break;
      case finishStates.LOST:
        getDetailTransactionFinishLostRequest(
          detailTransaction.transaction.id.toString()
        );
        break;
    }
  };

  return (
    <div className="modal-transaction-finishModal">
      <div onClick={()=>{onBack()}} className="modal-transaction-finish-volver">
        <img
          className="modal-transaction-finish-volver-img"
          src={volver}
          alt="volver"
        />
        <p className="modal-transaction-finish-volver">Volver</p>
      </div>
      <div className="modal-transaction-finish-container">
        <img
          className="modal-transaction-finish-img"
          src={Info}
          alt="informacionIcon"
        />
        <h3 className="modal-transaction-finish-subtitle">
          Seleccioná el estado final que quieras asignarle
        </h3>
        <hr className="modal-transaction-finish-separate" />
        <p>
        {"La transacción "}
          <b>{detailTransaction?.transaction?.transactionCode}</b> va a pasar a
          estado:
        </p>
      </div>

      <form className="form-filter-transaction" onSubmit={finishTransaction}>
        <div className="modal-transaction-finish-inputs">
          <div
            className={
             deliverableStates.includes( detailTransaction?.transaction?.state?.id)
                ? "flexItems"
                : "flexItems flexItems-items-center"
            }
          >
            <input
              onClick={handleCheckboxClick}
              name="state"
              type="radio"
              value={finishStates.LOST}
              id="Siniestrado"
            />
            <label
              htmlFor="Siniestrado"
              className="modal-transaction-finish-label"
            >
              Siniestrado
            </label>
          </div>
          {deliverableStates.includes( detailTransaction.transaction.state.id) &&
            <div className="flexItems">
              <input
                onClick={handleCheckboxClick}
                name="state"
                type="radio"
                value={finishStates.DELIVERED}
                id={finishStates.DELIVERED}
              />
              <label
                htmlFor="Entregado"
                className="modal-transaction-finish-label"
              >
                Entregado
              </label>
            </div>
          }

          <div className="flexItems">
            <input
              onClick={handleCheckboxClick}
              name="state"
              type="radio"
              value={finishStates.RETURNED}
              id={finishStates.RETURNED}
            />
            <label
              htmlFor="Devuelto"
              className="modal-transaction-finish-label"
            >
              Devuelto
            </label>
          </div>
        </div>

        
          <button
            type="submit"
            className="finish-button"
            disabled={!RadioActive}
          >
            Finalizarla
          </button>
        
      </form>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  detailTransaction: detailTransactionSelector.getDetailTransaction(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getDetailTransactionFinishReturnedRequest: (id: string) => {
    dispatch(
      detailTransactionActions.getDetailTransactionFinishReturnedRequest(id)
    );
  },
  getDetailTransactionFinishLostRequest: (id: string) => {
    dispatch(
      detailTransactionActions.getDetailTransactionFinishLostRequest(id)
    );
  },
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
export default connect(mapStateToProps, mapDispatchToProps)(FinishModal)