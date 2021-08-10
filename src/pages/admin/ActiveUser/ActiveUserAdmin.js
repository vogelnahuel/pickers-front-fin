import React, { useEffect, useState } from "react";
import { Header } from "../../../component/admin/Header/Header";
import { Nav } from "../../../component/admin/Nav/Nav";
import "../PendingUser/PendingUserAdmin.scss";
import exportar from "../../../assets/admin/PendingUser/exportar.svg";
import or from "../../../assets/admin/PendingUser/or.svg";
import { Filter } from "../../../component/admin/Filter/Filter";
import { TableAdmin } from "../../../component/admin/table/TableAdmin";
import { PendingBlack } from "../../../component/admin/Sub-Title-Image/PendingBlack";
import { dataActiveUser } from "./dataActiveUser";
import api from "../../../config/api";
import codificarEmailURIFunction from "../../../tools/encodeMail.js";
import createCSV from "../../../tools/createCSV.js";
import { Modal } from "pickit-components";

export const ActiveUserAdmin = () => {
  /****titulos de la tabla */
  const [loader, setloader] = useState(true);
  const [ExportModalActive, setExportModalActive] = useState(false);
  const titulosAdminActive = [
    "Nombre",
    "DNI",
    "Email",
    "Vehículo",
    "Estado",
    "Editar",
  ];
  /****llama a los campos y los envia */
  const [FieldsPart] = dataActiveUser();
  const [VerMas, setVerMas] = useState(true)
  const [dataExport, setdataExport] = useState({
    dni: "",
    nombre: "",
    mail: "",
    vehiculo: "",
  });
  const [data, setData] = useState([]);
  let filter = {
    dni: "",
    nombre: "",
    mail: "",
    vehiculo: "",
  };
  const [DatosFiltros, setDatosFiltros] = useState({
    dni: "",
    nombre: "",
    mail: "",
    vehiculo: "",
  });

  const onFilter = (e) => {
    //  debugger
    e.preventDefault();
    setoffset2(0)
    filter = {
      dni: e.target.dni.value,
      nombre: e.target.NyA.value,
      mail: e.target.Email.value,
      vehiculo: e.target.Vehículo.value,
    };

    getData(filter);
    setDatosFiltros(filter);
  };
  const tamPag = 5;
  const [offset2, setoffset2] = useState(0);

  const cargarMas = async () => {
    setloader(true)
   // setoffset(offset + tamPag);
    const res = await api
      .get(
        `ms-admin-rest/api/v1.0/pickers?pickerStatusId=4,5${
            DatosFiltros.nombre ? `&name=${DatosFiltros.nombre}` : ""
          }${
            DatosFiltros.vehiculo && DatosFiltros.vehiculo !== "DEFAULT"
              ? `&vehicleTypeId=${DatosFiltros.vehiculo === "moto" ? 1 : 2}`
              : ""
          }${
            DatosFiltros.dni
              ? `&identificationNumber=${parseInt(DatosFiltros.dni)}`
              : ""
          }${
            DatosFiltros.mail ? `&email=${DatosFiltros.mail}` : ""
          }&limit=${tamPag}&offset=${offset2+tamPag}`
      )
      .then((res) => {
       
        setoffset2(offset2 + tamPag);
        if(res.data.result.items.length<tamPag)
        {
          setVerMas(false)
        }
        return res.data.result.items;
      })
      .catch((err) => {
       
        console.log(err);
      })
      .finally( 
          setloader(false)
      )

    setData(data.concat(res));
  };

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      window.location.href = "/";
    }
   
const cargarDatos = async () => {
      setData(
        await api
          .get(
            `ms-admin-rest/api/v1.0/pickers?pickerStatusId=4,5&limit=${tamPag}&offset=${offset2}${
              filter.nombre ? `&name=${filter.nombre}` : ""
            }${
              filter.vehiculo && filter.vehiculo !== "DEFAULT"
                ? `&vehicleTypeId=${filter.vehiculo === "moto" ? 1 : 2}`
                : ""
            }${
              filter.dni ? `&identificationNumber=${parseInt(filter.dni)}` : ""
            }${filter.mail ? `&email=${filter.mail}` : ""}`
          )
          .then((res) => {
          
               if(res.data.result.items.length===0)
              {
                setVerMas(false)
              }
            return res.data.result.items;
          })
          .catch((err) => {
            
            console.log(err);
          })
          .finally(
            //
            setTimeout(() => {
              setloader(false)
            }, 500)
       
           
                
          )
      );
    };
    cargarDatos();
    return () => {
      setData({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cerrarGuardarExito = (e) => {
    e.preventDefault();
    setExportModalActive(false);
  };

const getData = async (filter) => {
    setloader(true)
    filter.mail = codificarEmailURIFunction(filter.mail);
    setoffset2(0)
    setVerMas(true)
    
    setData(
      await api
        .get(
            `ms-admin-rest/api/v1.0/pickers?pickerStatusId=4,5&limit=${tamPag}${
                filter.nombre ? `&name=${filter.nombre}` : ""
              }${
                filter.vehiculo && filter.vehiculo !== "DEFAULT"
                  ? `&vehicleTypeId=${filter.vehiculo === "moto" ? 1 : 2}`
                  : ""
              }${
                filter.dni ? `&identificationNumber=${parseInt(filter.dni)}` : ""
              }${filter.mail ? `&email=${filter.mail}` : ""}`
        )
        .then((res) => {
           
          if(res.data.result.items.length===0)
          {
            setVerMas(false)
          }
          return res.data.result.items;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally( 
            setloader(false)
      )
    );

    setdataExport(filter);
};


const Export = async () => {
    //setDataExport
    setExportModalActive(true);
    const datosExport = await api
      .get(
        `ms-admin-rest/api/v1.0/pickers.csv?pickerStatusId=4,5${
          dataExport.nombre ? `&name=${dataExport.nombre}` : ""
        }${
          dataExport.vehiculo !== "DEFAULT"
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
          <PendingBlack />

          <div className="mainContainerFlex">
            <h2 className="subTitle-pending">Pickers</h2>
            <button onClick={Export} className="export" name="export">
              <img src={exportar} alt="export" />
              <img className="or-pending" src={or} alt="or" />
              <p className="display-inline-block p-export"> Exportar</p>
            </button>
          </div>

          <Filter FieldsPart={FieldsPart} onSubmit={onFilter} />
          <br />
          <TableAdmin titulosAdminActive={titulosAdminActive} data={data} />
           {
             data && data.length!==0 ?
            <>
              {
                VerMas?
                  <>
                    <button onClick={cargarMas} className="paginator-button">
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
                      onClick={cargarMas}
                      className="paginator-button-transaction-noResult"
                    >
                      No obtuvimos resultados de tu búsqueda :(
                    </button>
                )
            }
        </div>
        {ExportModalActive === true ? (
          <div className="contendor-modal-pending-pickers-aprobar">
            <Modal width="750px" height="351px" isOpen={ExportModalActive}>
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
              loader ===true  ? 
              <div className="modalLoading">
                
              </div>
              : <></>
          }
     

    </div>
  );
};
