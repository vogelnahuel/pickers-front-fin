
import React, { useEffect, useState } from "react";
import { Header } from "../../component/admin/Header/Header";
import { Nav } from "../../component/admin/Nav/Nav";
import { TableTransaction } from "../../component/transaction/tableTransaction/TableTransaction";
import "./transaction.scss";
import { FilterTransaction } from "../../component/transaction/filterTransaction/FilterTransaction";
import { Modal } from "pickit-components";
import { OptionList } from "../../component/transaction/OptionList/OptionList";
import exportar from "../../assets/admin/PendingUser/exportar.svg";
import or from "../../assets/admin/PendingUser/or.svg";
import  exportDisabledIcon from "../../assets/transaction/ExportDisabled.svg";
import orDisabled from "../../assets/transaction/OrDisabled.svg";

import Close from "../../assets/transaction/Close.svg";

import api from "../../config/api.js";
import createCSV from "../../tools/createCSV";
import stateName from "../../component/transaction/tableTransaction/statesNames";
import moment from "moment";

export const Transaction = () => {

  const [apiFilterTransaction, setapiFilter] = useState({});
  const [FilterSelectedTransaction, setFilterSelectedTransaction] = useState(
    {}
  );
  const [loader, setloader] = useState(true);
  const [exportDisabled, setexportDisabled] = useState(true)

  const tamPag = 5;
  const [offset, setoffset] = useState(tamPag);
  const [filter, setfilter] = useState({});
  const [VerMas, setVerMas] = useState(true)
  const [OpenModalTransaction, setOpenModalTransaction] = useState(false);
  const [IdModalApi, setIdModalApi] = useState(""); // devuelve la consulta api
  const titulos = ["Transacción", "Id de picker", "Vencimiento SLA", "Estado"];
  

  const cargarDatos = async(e)=> {
    
    setloader(true);
    setFilterSelectedTransaction( await  api.get(`/ms-admin-rest/api/v1.0/transactions/${Number(e.target.getAttribute('name'))}`) 

    .then((res) => {
        return res.data.result;
      })
      .catch((err) => {
        console.log(err);
      }))   
      setloader(false);
      if(window.innerHeight < 800)
      document.querySelector('.modal-transaction').style.height=`${document.body.scrollHeight+100}px`
      if(window.innerHeight > 800)
      document.querySelector('.modal-transaction').style.height=`${document.body.scrollHeight+400}px`
      
}



  const cargarMas = async () => {
    const res = await api
      .get(
        `ms-admin-rest/api/v1.0/transactions?${
            filter.nroTransaccion
              ? `filter.transactionCode=${filter.nroTransaccion}`
              : ""
          }${filter.Picker ? `&filter.pickerId=${filter.Picker}` : ""}${
            filter.enAlerta ? `&filter.inAlert=${filter.enAlerta}` : ""
          }${
            filter.FechaEntrega
              ? `&filter.minMinDeliveryDate=${filter.FechaEntrega.from}`
              : ""
          }${
            filter.FechaEntrega
              ? `&filter.maxMinDeliveryDate=${filter.FechaEntrega.until}`
              : ""
          }${
            filter.stringSelected && filter.stringSelected !== "" ? `&filter.state=${filter.stringSelected}` : ""
          }&limit=${tamPag}&offset=${offset}`
        
      )
      .then((res) => {
        setoffset(offset + tamPag);
        if(res.data.result.items.length<tamPag)
            setVerMas(false)
        return res.data.result.items;
      })
      .catch((err) => {
        console.log(err);
      });

   
    setapiFilter(apiFilterTransaction.concat(res));
  };

  const construirUrlExport = (url) => {

    let arrayOpciones = [];

    if(filter.values){
      if(filter.values.nroTransaccion){
  
        arrayOpciones.push(`&filter.transactionCode=${filter.values.nroTransaccion}`);
      }
      if (filter.values.Picker){
        arrayOpciones.push(`&filter.pickerId=${filter.values.Picker}`);
      }
       if(filter.values.enAlerta){
        arrayOpciones.push(`&filter.inAlert=${filter.values.enAlerta}`);
      }
       if(filter.values.FechaEntrega){
        arrayOpciones.push(`&filter.minMinDeliveryDate=${filter.values.FechaEntrega.from}`);
        arrayOpciones.push(`&filter.maxMinDeliveryDate=${filter.values.FechaEntrega.until}`);
      }
       if(filter.stringSelected){
        arrayOpciones.push(`&filter.state=${filter.stringSelected}`);
      }
    }
    arrayOpciones[0] = arrayOpciones[0].replace('&','');

    for(let i =0 ; i < arrayOpciones.length;i++){
      url+=arrayOpciones[i];
    }

    return url
  }

  const Export = async (e) => {

    e.preventDefault();

    let url="/ms-admin-rest/api/v1.0/transactions.csv?";
    url = construirUrlExport(url)
    const datosExportTransaction = await api.get(`${url}`)
    .then(res => res)
    .catch((err) => {
      console.log(err);
    });
   
    if(datosExportTransaction!==undefined)
     createCSV(datosExportTransaction)
  
  }

  const onClose = (e) => {
    setOpenModalTransaction(false);
  };

//   useEffect(() => {
//     setTimeout(() => {
//         setloader(false);
//     }, 400);
   
// }, [setloader])



  useEffect(() => {
    const cargarDatos = async () => {
      setapiFilter(
        await api
          .get(`ms-admin-rest/api/v1.0/transactions?&limit=${tamPag}`)

          .then((res) => {
            setloader(false)
            return res.data.result.items;
          })
          .catch((err) => {
            console.log(err);
          })
      );
    };
    cargarDatos();
    
  }, []);

  // tamaño  pagina document.body.scrollHeight
  //
  return (
    <div className="background-Grey">
      <Header />
      <div className="mainContainerFlex">
        <Nav />
        <div className="transaction-container">
          <div className="mainContainerFlex-transaction">
              <h2 className="subTitle-transaction">
                <p className="subtitle-pendingUser-h2">Transacciones </p>
              </h2>
            {
              exportDisabled === true  ?  
                <button
                disabled={true}
                onClick={Export}
                className="export-transaction-disabled"
                name="export"
                >
                  <img src={exportDisabledIcon} alt="export" />
                  <img className="or-pending" src={orDisabled} alt="or" />
                  <p className="display-inline-block p-export-transaction-disabled"> Exportar</p>
                </button>
             
            :  <button
                onClick={Export}
                className="export-transaction"
                name="export"
                >
                    <img src={exportar} alt="export" />
                    <img className="or-pending" src={or} alt="or" />
                    <p className="display-inline-block p-export"> Exportar</p>
                </button>
            }
            
          </div>
          <FilterTransaction
            setapiFilter={setapiFilter}
            tamPag={tamPag}
            offset={offset}
            setoffset={setoffset}
            setfilter={setfilter}
            setVerMas={setVerMas}
            setexportDisabled={setexportDisabled}
          />
          <TableTransaction
            setOpenModalTransaction={setOpenModalTransaction}
            IdModal={IdModalApi}
            setIdModal={setIdModalApi}
            api={apiFilterTransaction}
            titulos={titulos}
            cargarDatos={cargarDatos}
            setFilterSelectedTransaction={setFilterSelectedTransaction}
          />
             {apiFilterTransaction && apiFilterTransaction.length !== 0 ? <>
             { VerMas?
            <button
              onClick={cargarMas}
              className="paginator-button-transaction"
            >
              Ver más
            </button>:
            <button
              disabled={true}
              className="paginator-button-transaction-disabled"
            >
              Ver más
            </button>
            }
            </>
           : (
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
              height="81.72916666666667vh"
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
                    <h2>Código de transacción</h2>
                      <p>Estado 
                          
                      </p>
                    <p className="modal-transaction-fecha">
                    {  FilterSelectedTransaction.transaction && 
                              FilterSelectedTransaction.transaction.inAlert===true ? 
                              <>
                              <span className="admin-table-alerta modal-transaction-alerta">En alerta</span>
                              </>
                              : <span className="modal-transaction-space"></span>
                            }
                      Vencimiento SLA</p>
                  </div>
                  <div className="modal-transaction-subtitle">
                    <h2>
                      {FilterSelectedTransaction.transaction
                        ? FilterSelectedTransaction.transaction.transactionCode
                        : ""}
                    </h2>
                    <p>
                     
                      {FilterSelectedTransaction.transaction
                        ? stateName(FilterSelectedTransaction.transaction.state.id)
                        : ""}
                        
                    </p>

                    <p className="modal-transaction-fecha">
                      {" "}
                      {FilterSelectedTransaction.transaction
                        ? FilterSelectedTransaction.transaction.maxDeliveryDateTime.substring(0,10)+" "+(parseInt(FilterSelectedTransaction.transaction.maxDeliveryDateTime.substring( 11,13))-3)+FilterSelectedTransaction.transaction.maxDeliveryDateTime.substring( 13,16)
                          // .substring(
                          //   0,
                          //   10
                          // )
                          // +" "+FilterSelectedTransaction.transaction.maxDeliveryDateTime.substring(
                          //   11,
                          //   16)
                          
                        : ""}{" "}
                    </p>
                  </div>
                  <hr className="modal-transaction-separate" id="modal-transaction-hr-title"/>
                </div>
                <div className="modal-transaction-scroll">
                  <OptionList
                    FilterSelectedTransaction={FilterSelectedTransaction}
                
                    setFilterSelectedTransaction={setFilterSelectedTransaction}
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
