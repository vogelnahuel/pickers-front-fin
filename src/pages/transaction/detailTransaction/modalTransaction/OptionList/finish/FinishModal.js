import React, { useState } from "react";
import volver from "assets/admin/PendingUser/volver.svg";
import Info from "assets/transaction/Info.svg";
import api from "middleware/api";
import "./finishModal.css";

export const FinishModal = (props) => {
  const [RadioActive, setRadioActive] = useState(false);
  const sethistory = props.sethistory;
  const setfinishModal = props.setfinishModal;
  const FilterSelectedTransaction = props.FilterSelectedTransaction;
  const [estado, setestado] = useState("");
  const setdniFinish = props.setdniFinish;
  const setundelivered = props.setundelivered;



  const handleClick = async (e) => {
      e.preventDefault();


      if(FilterSelectedTransaction.transaction.state.name==="En devolución" && estado==="Devuelto"){
        await api.post(
          `/ms-admin-rest/api/v1.0/transactions/${FilterSelectedTransaction.transaction.id}/returned`);
          window.location.reload();
      }
      else if(estado==="Devuelto"){
        setundelivered(true);
        setTimeout(() => {
            e.target.parentNode.parentNode.classList.add('animation-left-transaction')
            const insert = document.querySelector('.insertAnimation');
            const div = document.createElement('div');
            div.classList.add('animationReasons');
            setTimeout(() => {
                insert.appendChild(div)
            }, 200);
            
            setTimeout(() => {
                setfinishModal(false);
                if(e.target.parentNode.parentNode!==null)
                e.target.parentNode.parentNode.classList.remove('animation-left-transaction')
                insert.removeChild(insert.firstChild);
            }, 500);
        }, 0);
      }
      else if(estado==="Entregado"){
        setdniFinish(true);
     
        setTimeout(() => {
            e.target.parentNode.parentNode.classList.add('animation-left-transaction')
            const insert = document.querySelector('.insertAnimation');
            const div = document.createElement('div');
            div.classList.add('animationReasons');
            setTimeout(() => {
                insert.appendChild(div)
            }, 200);
            
            setTimeout(() => {
                setfinishModal(false);
                if(e.target.parentNode.parentNode!==null)
                e.target.parentNode.parentNode.classList.remove('animation-left-transaction')
                insert.removeChild(insert.firstChild);
            }, 500);
        }, 0);

      }
  
      if(estado=== "Siniestrado")
        {   
          await api.post(
          `/ms-admin-rest/api/v1.0/transactions/${FilterSelectedTransaction.transaction.id}/lost`);
          window.location.reload();
  
        }

};

  const handleClickCheck = (e) => {
      setRadioActive(true);
      setestado(e.target.id);
}
        

//
  const handleClickgoBack = (e) => {
    e.target.parentNode.parentNode.classList.add("animation-right-transaction");

    setTimeout(() => {
      e.target.parentNode.parentNode.classList.remove(
        "animation-right-transaction"
      );
      sethistory(true);
      e.target.parentNode.parentNode.parentNode.parentNode.firstChild.classList.add(
        "animation-right-transaction2"
      );
      e.target.parentNode.parentNode.parentNode.parentNode.firstChild.classList.remove(
        "animation-right-transaction2"
      );

      setfinishModal(false);
    }, 600);
  }

  return (
    <div className="modal-transaction-finishModal">
      <div
        onClick={props.onBack}
        className="modal-transaction-finish-volver"
      >
        <img className="modal-transaction-finish-volver-img"  src={volver} alt="volver" />
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
          La transacción <b>{FilterSelectedTransaction?.transaction?.transactionCode}</b> va a
          pasar a estado:
        </p>
      </div>

      <form className="form-filter-transaction">
        <div className="modal-transaction-finish-inputs">
       
        
              <div className={FilterSelectedTransaction?.transaction?.state?.id!==8  ? "flexItems" : "flexItems flexItems-items-center"}>
                  <input
                    onClick={handleClickCheck}
                    name="estado"
                    type="radio"
                    value="Siniestrado"
                    id="Siniestrado"
                  />
                  <label
                    htmlFor="Siniestrado"
                    className="modal-transaction-finish-label" 
                  >
                    Siniestrado
                  </label>
              </div>
          {FilterSelectedTransaction?.transaction?.state?.id!==8 ?
                <div className="flexItems">
                    <input
                      onClick={handleClickCheck}
                      name="estado"
                      type="radio"
                      value="Entregado"
                      id="Entregado"/>
                    <label
                      htmlFor="Entregado"
                      className="modal-transaction-finish-label"
                    >
                      Entregado
                  </label>
                </div>
            :<></>
            }
          
          <div className="flexItems">
                <input
                  onClick={handleClickCheck}
                  name="estado"
                  type="radio"
                  value="Devuelto"
                  id="Devuelto"
                />
                <label
                  htmlFor="Devuelto"
                  className="modal-transaction-finish-label"
                >
                  Devuelto
                </label>
            </div>
        
         
        </div>

        {RadioActive === false ? 
          <button 
              disabled={true}
              className="modal-transaction-finish-button">
                Finalizarla
          </button>
         : 
          <button
                type="button"
                onClick={handleClick}
                className="modal-transaction-finish-button-click"
          >
            Finalizarla
          </button>
        }
      </form>
    </div>
  );
};
