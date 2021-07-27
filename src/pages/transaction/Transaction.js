import React, { useEffect, useState } from "react";
import { Header } from "../../component/admin/Header/Header";
import { Nav } from "../../component/admin/Nav/Nav";
import exportar from "../../assets/admin/PendingUser/exportar.svg";
import or from "../../assets/admin/PendingUser/or.svg";
import { TableTransaction } from "../../component/transaction/tableTransaction/TableTransaction";
import "./transaction.scss";
import { FilterTransaction } from "../../component/transaction/filterTransaction/FilterTransaction";
import { Modal } from "pickit-components";
import { OptionList } from "../../component/transaction/OptionList/OptionList";

import Close from "../../assets/transaction/Close.svg";

import api from "../../config/api.js";

export const Transaction = () => {
  //
  const [apiFilterTransaction, setapiFilter] = useState({});
  const [FilterSelectedTransaction, setFilterSelectedTransaction] = useState(
    {}
  );
  const [loader, setloader] = useState(true);

  const tamPag = 5;
  const [offset, setoffset] = useState(tamPag);
  const [filter, setfilter] = useState({});

  const [OpenModalTransaction, setOpenModalTransaction] = useState(false);
  const [IdModalApi, setIdModalApi] = useState(""); // devuelve la consulta api
  const titulos = ["Transacción", "Picker", "Fecha de entrega", "Estado"];

  const cargarMas = async () => {
    console.log(filter);
    const res = await api
      .get(
        `ms-admin-rest/api/v1.0/transactions?&limit=${tamPag}&offset=${offset}${
            filter.values.nroTransaccion
            ? `filter.transactionCode=${filter.values.nroTransaccion}`
            : ""
        }${filter.values.Picker ? `&filter.pickerId=${filter.values.Picker}` : ""}
        ${
            filter.values.enAlerta ? `&filter.inAlert=${filter.values.enAlerta}` : ""
        }${
            filter.values.FechaEntrega
            ? `&filter.minMinDeliveryDate=${filter.values.FechaEntrega.from}`
            : ""
        }${
            filter.values.FechaEntrega
            ? `&filter.maxMinDeliveryDate=${filter.values.FechaEntrega.until}`
            : ""
        }
        ${
            filter.stringSelected ? `&filter.state=${filter.stringSelected}` : ""
        }`
        
      )
      .then((res) => {
        setoffset(offset + tamPag);
        return res.data.result.items;
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(res);
    setapiFilter(apiFilterTransaction.concat(res));
  };
  const Export = () => {};
  const onClose = (e) => {
    setOpenModalTransaction(false);
  };

  useEffect(() => {
    setTimeout(() => {
        setloader(false);
    }, 1400);
   
}, [setloader])



  useEffect(() => {
    const cargarDatos = async () => {
      setapiFilter(
        await api
          .get(`ms-admin-rest/api/v1.0/transactions?&limit=${tamPag}`)

          .then((res) => {
            return res.data.result.items;
          })
          .catch((err) => {
            console.log(err);
          })
      );
    };
    cargarDatos();
  }, []);
  //
  return (
    <div className="background-Grey">
      <Header />
      <div className="mainContainerFlex">
        <Nav />
        <div className="transaction-container">
          <div className="mainContainerFlex">
            <h2 className="subTitle-transaction">
              <p className="subtitle-pendingUser-h2">Transacciones </p>
            </h2>
            <button
              onClick={Export}
              className="export-transaction"
              name="export"
            >
              <img src={exportar} alt="export" />
              <img className="or-pending" src={or} alt="or" />
              <p className="display-inline-block p-export"> Exportar</p>
            </button>
          </div>
          <FilterTransaction
            setapiFilter={setapiFilter}
            tamPag={tamPag}
            offset={offset}
            setoffset={setoffset}
            setfilter={setfilter}
          />
          <TableTransaction
            setOpenModalTransaction={setOpenModalTransaction}
            IdModal={IdModalApi}
            setIdModal={setIdModalApi}
            api={apiFilterTransaction}
            titulos={titulos}
            setFilterSelectedTransaction={setFilterSelectedTransaction}
          />
          {apiFilterTransaction && apiFilterTransaction.length !== 0 ? (
            <button
              onClick={cargarMas}
              className="paginator-button-transaction"
            >
              Ver más
            </button>
          ) : (
            <button
              onClick={cargarMas}
              className="paginator-button-transaction-noResult"
            >
              No obtuvimos resultados de tu búsqueda :(
            </button>
          )}
        </div>

        {OpenModalTransaction === true ? (
          <div className="modal-transaction">
            <Modal
              width="87.116vw"
              height="80.72916666666667vh"
              isOpen={OpenModalTransaction}
              onClose={onClose}
            >
              <div className="modal-transaction-container">
                <img
                  onClick={onClose}
                  className="modal-transaction-close"
                  src={Close}
                  alt="cerrar"
                />
                <div>
                  <div className="modal-transaction-title">
                    <h2>Número de transacción</h2>
                    <p>Estado</p>
                    <p className="modal-transaction-fecha">Fecha entrega</p>
                  </div>
                  <div className="modal-transaction-subtitle">
                    <h2>
                      {FilterSelectedTransaction.transaction
                        ? FilterSelectedTransaction.transaction.id
                        : ""}
                    </h2>
                    <p>
                      {" "}
                      {FilterSelectedTransaction.transaction
                        ? FilterSelectedTransaction.transaction.state.name
                        : ""}{" "}
                    </p>

                    <p className="modal-transaction-fecha">
                      {" "}
                      {FilterSelectedTransaction.transaction
                        ? FilterSelectedTransaction.transaction.maxDeliveryDateTime.substring(
                            0,
                            10
                          )
                        : ""}{" "}
                    </p>
                  </div>
                  <hr className="modal-transaction-separate" />
                </div>
                <div className="modal-transaction-scroll">
                  <OptionList
                    FilterSelectedTransaction={FilterSelectedTransaction}
                  />
                </div>
              </div>
            </Modal>
          </div>
        ) : null}
      </div>

      {loader === true ? <div className="modalLoading"></div> : <></>}
    </div>
  );
};
