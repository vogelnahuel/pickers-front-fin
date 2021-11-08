import volver from "assets/admin/PendingUser/volver.svg";
import Info from "assets/transaction/Info.svg";
import { useState } from "react";
import { connect } from "react-redux";
import {
  actions as detailTransactionActions,
  selectors as detailTransactionSelector,
} from "reducers/detailTransaction";
import { AppDispatch, RootState } from "store";
import { FinishModalPropsType } from "../types";
import "./finishModal.scss";
import i18next from "i18next";

const FinishModal: React.FC<FinishModalPropsType> = ({
  detailTransaction,
  getDetailTransactionFinishLostRequest,
  getDetailTransactionFinishReturnedRequest,
  back,
  next,
  dniFinish,
  undelivered,
}): JSX.Element => {
  const [RadioActive, setRadioActive] = useState(false);
  const [checkBoxSelected, setcheckBoxSelected] = useState("");
  const finishStates = {
    LOST: "LOST",
    RETURNED: "RETURNED",
    DELIVERED: "DELIVERED",
  };
  const deliverableStates = [6, 7];

  const handleCheckboxClick = (e: any) => {
    setcheckBoxSelected(e.target.value);
    setRadioActive(true);
  };

  const finishTransaction = () => {
    switch (checkBoxSelected) {
      case finishStates.DELIVERED:
        next(dniFinish);
        break;
      case finishStates.RETURNED:
        if (detailTransaction.transaction.state.id === 8) {
          getDetailTransactionFinishReturnedRequest(
            detailTransaction.transaction.id.toString()
          );
        } else {
          next(undelivered);
        }
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
        <p className="modal-transaction-finish-volver">
          {i18next.t("global:label.button.back")}
        </p>
      </div>
      <div className="modal-transaction-finish-container">
        <img
          className="modal-transaction-finish-img"
          src={Info}
          alt="informacionIcon"
        />
        <h3 className="modal-transaction-finish-subtitle">
          {i18next.t("detailTransaction:title.finishModal.selectFinalState")}
        </h3>
        <hr className="modal-transaction-finish-separate" />
        <p>
          {i18next.t("detailTransaction:title.finishModal.infoFInalState", {
            transactionCode: detailTransaction?.transaction?.transactionCode,
          })}
        </p>
      </div>

      <form onSubmit={finishTransaction}>
        <div className="modal-transaction-finish-inputs">
          <div
            className={
              deliverableStates.includes(
                detailTransaction?.transaction?.state?.id
              )
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
              {i18next.t("transactions:label.input.lost")}
            </label>
          </div>
          {deliverableStates.includes(
            detailTransaction.transaction.state.id
          ) && (
            <div className="flexItems">
              <input
                onClick={handleCheckboxClick}
                name="state"
                type="radio"
                value={finishStates.DELIVERED}
                id={finishStates.DELIVERED}
              />
              <label
                htmlFor={finishStates.DELIVERED}
                className="modal-transaction-finish-label"
              >
                {i18next.t("transactions:label.input.delivered")}
              </label>
            </div>
          )}

          <div className="flexItems">
            <input
              onClick={handleCheckboxClick}
              name="state"
              type="radio"
              value={finishStates.RETURNED}
              id={finishStates.RETURNED}
            />
            <label
              htmlFor={finishStates.RETURNED}
              className="modal-transaction-finish-label"
            >
              {i18next.t("transactions:label.input.returned")}
            </label>
          </div>
        </div>
        <div className="finish-modal-button-container">
          <button
            type="button"
            onClick={finishTransaction}
            className="finish-button"
            disabled={!RadioActive}
          >
            {i18next.t("detailTransaction:button.finishModal.finish")}
          </button>
        </div>
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
});
export default connect(mapStateToProps, mapDispatchToProps)(FinishModal);
