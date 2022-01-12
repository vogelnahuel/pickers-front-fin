import React, { Fragment } from "react";
import "./transactions.scss";

export const Transactions = () => {
  const titulos = ["ID", "Fecha", "Estado", "Monto"];
  const contenido = [
    {
      id: "AAB114",
      fecha: "07/12/2021",
      estado: "Entregada",
      monto: "$ 1000,65",
    },
    {
      id: "AAB115",
      fecha: "07/12/2021",
      estado: "Entregada",
      monto: "$ 10,65",
    },
    {
      id: "AAB116",
      fecha: "07/12/2021",
      estado: "Entregada",
      monto: "$ 10000,65",
    },
    {
      id: "AAB117",
      fecha: "07/12/2021",
      estado: "Entregada",
      monto: "$ 100,65",
    },
    {
      id: "AAB18",
      fecha: "07/12/2021",
      estado: "Entregada",
      monto: "$ 100,65",
    },
    {
      id: "AAB119",
      fecha: "07/12/2021",
      estado: "Entregada",
      monto: "$ 100,65",
    },
    {
      id: "AAB20",
      fecha: "07/12/2021",
      estado: "Entregada",
      monto: "$ 100,65",
    },
    {
      id: "AAB23",
      fecha: "07/12/2021",
      estado: "Entregada",
      monto: "$ 100,65",
    },
    {
      id: "AAB125",
      fecha: "07/12/2021",
      estado: "Entregada",
      monto: "$ 100,65",
    },
    {
      id: "AAB129",
      fecha: "07/12/2021",
      estado: "Entregada",
      monto: "$ 100,65",
    },
    {
      id: "AAB130",
      fecha: "07/12/2021",
      estado: "Entregada",
      monto: "$ 100,65",
    },
    {
      id: "AAB134",
      fecha: "07/12/2021",
      estado: "Entregada",
      monto: "$ 100,65",
    },
    {
      id: "AAB144",
      fecha: "07/12/2021",
      estado: "Entregada",
      monto: "$ 100,65",
    },
    {
      id: "AAB154",
      fecha: "07/12/2021",
      estado: "Entregada",
      monto: "$ 100,65",
    },

    {
      id: "AAB175",
      fecha: "07/12/2021",
      estado: "Entregada",
      monto: "$ 100,65",
    },
    {
      id: "AAB112",
      fecha: "07/12/2021",
      estado: "Entregada",
      monto: "$ 100,65",
    },
    {
      id: "AAB120",
      fecha: "07/12/2021",
      estado: "Entregada",
      monto: "$ 100,65",
    },
    {
      id: "AAB155",
      fecha: "07/12/2021",
      estado: "Entregada",
      monto: "$ 100,65",
    },
    {
      id: "AAB166",
      fecha: "07/12/2021",
      estado: "Entregada",
      monto: "$ 100,65",
    },
  ];
  return (
    <>
      <div className="container-detail-preliquidation-table-col">
        <div className="container-detail-preliquidation-table-row">
          {titulos.map((el) => (
            <div
              key={el}
              className="container-detail-preliquidation-table-col-sm-1 detail-preliquidation-table-head"
            >
              <p key={el}>{el}</p>
            </div>
          ))}
        </div>
        <div className="container-detail-preliquidation-table-row overflow-scroll table-detail-preliquidation">
          {contenido.map((el) => (
            <Fragment key={el.id}>
              <div className="container-detail-preliquidation-table-col-sm-1 detail-preliquidation-table-body">
                <p>{el.id}</p>
              </div>
              <div className="container-detail-preliquidation-table-col-sm-1 detail-preliquidation-table-body">
                <p>{el.fecha}</p>
              </div>
              <div className="container-detail-preliquidation-table-col-sm-1 detail-preliquidation-table-body">
                <p>{el.estado}</p>
              </div>
              <div className="container-detail-preliquidation-table-col-sm-1 detail-preliquidation-table-body">
                <p>{el.monto}</p>
              </div>
            </Fragment>
          ))}
        </div>
        <div className="container-detail-preliquidation-table-row">
          <div className="row-transparent"></div>
          <div className="container-detail-preliquidation-table-col-sm-3 ">
            <p className="transaction-total-text">Total</p>
            <p className="transaction-quantity">15 Transacciones</p>
          </div>
          <div className="container-detail-preliquidation-table-col-sm-1 amount-container">
            <p>{`$ 3000,12`}</p>
          </div>
        </div>
      </div>
    </>
  );
};
