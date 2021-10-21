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
    console.log(e.target.value);
    setcheckBoxSelected(e.target.value);
    setRadioActive(true);
  };
  const finishTransaction = () => {
    switch (checkBoxSelected) {
      case finishStates.DELIVERED:
        console.log(finishStates.DELIVERED);
        DniFinish();
        break;
      case finishStates.RETURNED:
        console.log(finishStates.RETURNED);
        undelivered();
        break;
      case finishStates.LOST:
        console.log(finishStates.LOST);
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
          La transacción{" "}
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
          {deliverableStates.includes( detailTransaction?.transaction?.state?.id) &&
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
export default connect(mapStateToProps, mapDispatchToProps)(FinishModal);

// const sethistory = props.sethistory;
//   const setfinishModal = props.setfinishModal;
//   const FilterSelectedTransaction = props.FilterSelectedTransaction;
//   const [estado, setestado] = useState("");
//   const setdniFinish = props.setdniFinish;
//   const setundelivered = props.setundelivered;

// //   getDetailTransactionFinishReturnedRequest
// // getDetailTransactionFinishLostRequest
// // getDetailTransactionDniDeliveredRequest

//   const handleClick = async (e:any) => {
//       e.preventDefault();

//       if(FilterSelectedTransaction.transaction.state.name==="En devolución" && estado==="Devuelto"){
//         await api.post(
//           `/ms-admin-rest/api/v1.0/transactions/${FilterSelectedTransaction.transaction.id}/returned`);
//           window.location.reload();
//       }
//       else if(estado==="Devuelto"){
//         setundelivered(true);
//         setTimeout(() => {
//             e.target.parentNode.parentNode.classList.add('animation-left-transaction')
//             const insert:any = document.querySelector('.insertAnimation');
//             const div = document.createElement('div');
//             div.classList.add('animationReasons');
//             setTimeout(() => {
//                 insert.appendChild(div)
//             }, 200);

//             setTimeout(() => {
//                 setfinishModal(false);
//                 if(e.target.parentNode.parentNode!==null)
//                 e.target.parentNode.parentNode.classList.remove('animation-left-transaction')
//                 insert.removeChild(insert.firstChild);
//             }, 500);
//         }, 0);
//       }
//       else if(estado==="Entregado"){
//         setdniFinish(true);

//         setTimeout(() => {
//             e.target.parentNode.parentNode.classList.add('animation-left-transaction')
//             const insert:any = document.querySelector('.insertAnimation');
//             const div = document.createElement('div');
//             div.classList.add('animationReasons');
//             setTimeout(() => {
//                 insert.appendChild(div)
//             }, 200);

//             setTimeout(() => {
//                 setfinishModal(false);
//                 if(e.target.parentNode.parentNode!==null)
//                 e.target.parentNode.parentNode.classList.remove('animation-left-transaction')
//                 insert.removeChild(insert.firstChild);
//             }, 500);
//         }, 0);

//       }

//       if(estado=== "Siniestrado")
//         {
//           await api.post(
//           `/ms-admin-rest/api/v1.0/transactions/${FilterSelectedTransaction.transaction.id}/lost`);
//           window.location.reload();

//         }

// };

//   const handleClickCheck = (e:any) => {
//       setRadioActive(true);
//       setestado(e.target.id);
// }

//
// const handleClickgoBack = (e) => {
//   e.target.parentNode.parentNode.classList.add("animation-right-transaction");

//   setTimeout(() => {
//     e.target.parentNode.parentNode.classList.remove(
//       "animation-right-transaction"
//     );
//     sethistory(true);
//     e.target.parentNode.parentNode.parentNode.parentNode.firstChild.classList.add(
//       "animation-right-transaction2"
//     );
//     e.target.parentNode.parentNode.parentNode.parentNode.firstChild.classList.remove(
//       "animation-right-transaction2"
//     );

//     setfinishModal(false);
//   }, 600);
// }
