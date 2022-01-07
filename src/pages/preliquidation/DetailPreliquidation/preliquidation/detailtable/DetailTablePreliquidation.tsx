import React, { Fragment } from "react";
import "./detailTablePreliquidation.scss";

export const DetailTablePreliquidation = () => {
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
        <div className="container-detail-preliquidation-table-row overflow-scroll table-detail-preliquidation">
          {titulos.map((el) => (
            <div
              key={el}
              className="container-detail-preliquidation-table-col-sm-1 detail-preliquidation-table-head"
            >
              <p key={el}>{el}</p>
            </div>
          ))}
          {contenido.map((el) => (
            <Fragment key={el.id}>
              <div className="container-detail-preliquidation-table-col-sm-1 detail-preliquidation-table-body ">
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
          <div className="transparent"></div>
          <div className="container-detail-preliquidation-table-col-sm-4 ">
            <h3 className="table-amount-preliquidation-subtitle ">Total</h3>
          </div>
          <div className="container-detail-preliquidation-table-col-sm-3 ">
            <p className="">15 Transacciones</p>
          </div>
          <div className="container-detail-preliquidation-table-col-sm-1  ">
            <p>
              <b className="">{`$ 3000,12`}</b>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
