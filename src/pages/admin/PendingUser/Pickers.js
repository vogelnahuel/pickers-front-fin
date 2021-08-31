import React, { useState } from "react";
import { Header } from "../../../component/admin/Header/Header";
import { Nav } from "../../../component/admin/Nav/Nav";
import "./Pickers.scss";
import { PendingBlue } from "../../../component/admin/Sub-Title-Image/PendingBlue";
import exportar from "../../../assets/admin/PendingUser/exportar.svg";
import or from "../../../assets/admin/PendingUser/or.svg";
import { Filter } from "../../../component/admin/Filter/Filter";
import { TableAdmin } from "../../../component/admin/table/TableAdmin";
import { dataPendingUser } from "./dataPendingUser";
import api from "../../../config/api";
import createCSV from "../../../tools/createCSV.js";
import { Modal } from "@pickit/pickit-components";

export const PendingUserAdmin = ({
  changePage,
  actualPage,
  tableTitles,
  pendingUsers,
  filters,
  filtersExtra,
  fetching,
  getPendingUser,
  seeMore,
  loadMore,
}) => {

  const [FieldsPart] = dataPendingUser();
  const [ExportModal, setExportModal] = useState(false);
  const [dataExport, setdataExport] = useState({
    dni: "",
    nombre: "",
    mail: "",
    vehiculo: "",
  });





  const cerrarGuardarExito = (e) => {
    e.preventDefault();
    setExportModal(false);
  };

  const Export = async () => {
    setExportModal(true);
    const datosExport = await api
      .get(
        `/ms-admin-rest/api/v1.0/pickers.csv?pickerStatusId=2,3${
          dataExport.nombre ? `&name=${dataExport.nombre}` : ""
        }${
          dataExport.vehiculo && dataExport.vehiculo !== "DEFAULT"
            ? `&vehicleTypeId=${dataExport.vehiculo === "moto" ? 1 : 2}`
            : ""
        }${
          dataExport.dni
            ? `&identificationNumber=${parseInt(dataExport.dni)}`
            : ""
        }${dataExport.mail ? `&email=${dataExport.mail}` : ""}`
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });

    createCSV(datosExport);
  };

  return (
  
    <div className="background-Grey">
      <Header />
      <div className="mainContainerFlex">
        <Nav />
        <div className="pending-container">
          <PendingBlue changePage={changePage} actualPage={actualPage}/>

          <div className="mainContainerFlex">
            <h2 className="subTitle-pending">
              <p className="subtitle-pendingUser-h2">Solicitudes pendientes</p>
            </h2>
            <button onClick={Export} className="export" name="export">
              <img src={exportar} alt="export" />
              <img className="or-pending" src={or} alt="or" />
              <p className="display-inline-block p-export"> Exportar</p>
            </button>
          </div>

          <Filter FieldsPart={FieldsPart} onSubmit={()=>{getPendingUser({...filters,...filtersExtra})}} />
          <br />
          <TableAdmin tableTitles={tableTitles} data={pendingUsers} actualPage={actualPage} />
          {

          pendingUsers &&  pendingUsers.length!==0 ?
                <>
                    {
                        seeMore?
                        <>
                          <button onClick={ ()=>loadMore()}
                         className="paginator-button">
                            Ver más
                          </button>
                        </>
                        :
                        <>
                          <button  className="paginator-button-disabled">
                            Ver más
                          </button>
                        </>
                    
                    }
                </>
                :
                (
                    <button
                      className="paginator-button-transaction-noResult"
                    >
                      No obtuvimos resultados de tu búsqueda :(
                    </button>
                )
          }
        </div>



        {ExportModal === true ? (
          <div className="contendor-modal-pending-pickers-aprobar">
            <Modal width="750px" height="351px" isOpen={ExportModal}>
              <div className="container-modal">
                <div className="modal-success-title">
                  <p className="p-modal-error-title">Exportaste exitosamente</p>
                </div>
                <div className="modal-error-subtitle">
                  <p className="p-modal-error-subtitle">
                    El archivo se descargo correctamente
                  </p>
                  <div className="button-pending-picker-modal">
                    <button
                      onClick={cerrarGuardarExito}
                      className="button-modal-aprobar-exito"
                    >
                      Entendido
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        ) : null}
      </div>
      {
              fetching ===true  ? 
              <div className="modalLoading">
                
              </div>
              : <></>
          }
    </div>
  );
};
