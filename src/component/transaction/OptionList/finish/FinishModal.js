import React, { useState } from "react";
import volver from "../../../../assets/admin/PendingUser/volver.svg";
import Info from "../../../../assets/transaction/Info.svg";
import api from "../../../../config/api";
import "./finishModal.css";

export const FinishModal = (props) => {
  const [RadioActive, setRadioActive] = useState(false);
  const sethistory = props.sethistory;
  const setfinishModal = props.setfinishModal;
  const FilterSelectedTransaction = props.FilterSelectedTransaction;
  const [estado, setestado] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    switch (estado) {
      case "Entregado2":
        await api.post(
          `/ms-admin-rest/api/v1.0/transactions/${FilterSelectedTransaction.transaction.id}/delivered`,
          { key: "123", value: "123" }
        );
        break;
      case "Siniestrado2":
        await api.post(
          `/ms-admin-rest/api/v1.0/transactions/${FilterSelectedTransaction.transaction.id}/lost`,
        );
        break;
      case "Devuelto2":
        await api.post(
          `/ms-admin-rest/api/v1.0/transactions/${FilterSelectedTransaction.transaction.id}/returned`,
        );
        break;

      default:
        break;
    }
  };

  const handleClickCheck = (e) => {
    setRadioActive(true);
    setestado(e.target.id);
  };

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
  };

  return (
    <div className="modal-transaction-finishModal">
      <div
        onClick={handleClickgoBack}
        className="modal-transaction-finish-volver"
      >
        <img src={volver} alt="volver" />
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
          La transacción <b>{FilterSelectedTransaction.transaction.id}</b> va a
          pasar a estado:
        </p>
      </div>

      <form className="form-filter-transaction">
        <div className="modal-transaction-finish-inputs">
          <div className="flexItems">
            <input
              onClick={handleClickCheck}
              name="estado2"
              type="radio"
              value="Siniestrado"
              id="Siniestrado2"
            />
            <label
              htmlFor="Siniestrado2"
              className="modal-transaction-finish-label"
            >
              {" "}
              Siniestrado
            </label>
          </div>
          <div className="flexItems">
            <input
              onClick={handleClickCheck}
              name="estado2"
              type="radio"
              value="Entregado"
              id="Entregado2"
            />
            <label
              htmlFor="Entregado2"
              className="modal-transaction-finish-label"
            >
              Entregado
            </label>
          </div>
          <div className="flexItems">
            <input
              onClick={handleClickCheck}
              name="estado2"
              type="radio"
              value="Devuelto"
              id="Devuelto2"
            />
            <label
              htmlFor="Devuelto2"
              className="modal-transaction-finish-label"
            >
              Devuelto
            </label>
          </div>
        </div>

        {RadioActive === false ? (
          <button className="modal-transaction-finish-button">
            Finalizarla
          </button>
        ) : (
          <button
            handleClick={handleClick}
            className="modal-transaction-finish-button-click"
          >
            Finalizarla
          </button>
        )}
      </form>
    </div>
  );
};
