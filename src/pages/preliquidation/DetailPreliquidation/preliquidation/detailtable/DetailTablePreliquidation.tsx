import React from "react";
import './detailTablePreliquidation.scss'

export const DetailTablePreliquidation = () => {
  const titulos = ["ID", "Fecha", "Estado", "Monto"];
  const contenido = [
    {
      id: "AAB114",
      fecha: "07/12/2021",
      estado: "Entregada",
      monto: "$ 100,65",
    },
    {
      id: "AAB115",
      fecha: "07/12/2021",
      estado: "Entregada",
      monto: "$ 100,65",
    },
    {
        id: "AAB116",
        fecha: "07/12/2021",
        estado: "Entregada",
        monto: "$ 100,65",
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
    <div className="overflow-scroll">
    <table>
      <thead>
        <tr>
          {titulos.map((el) => (
            <th key={el}>{el}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {contenido.map((el) => (
          <tr key={el.id }>
            <td>{el.id}</td>
            <td>{el.fecha}</td>
            <td>{el.estado}</td>
            <td> {el.monto}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};
