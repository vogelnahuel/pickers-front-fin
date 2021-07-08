import React, { useEffect, useState } from "react";
import { Header } from "../../../component/admin/Header/Header";
import { Nav } from "../../../component/admin/Nav/Nav";
import "./PendingUserAdmin.css";
import { PendingBlue } from "../../../component/admin/Sub-Title-Image/PendingBlue";
import exportar from "../../../assets/admin/PendingUser/exportar.svg";
import or from "../../../assets/admin/PendingUser/or.svg";
import { Filter } from "../../../component/admin/Filter/Filter";
import { TableAdmin } from "../../../component/admin/table/TableAdmin";
import { dataPendingUser } from "./dataPendingUser";
import api from "../../../config/api";
import codificarEmailURIFunction from "../../../tools/encodeMail.js";
import createCSV from "../../../tools/createCSV.js";
import { Modal } from "pickit-components";

export const PendingUserAdmin = () => {
  /****titulos de la tabla */
  const titulosAdminPending = [
    "Nombre",
    "DNI",
    "Email",
    "vehiculo",
    "Pendiente hace",
    "Editar",
  ];
  /****llama a los campos y los envia */
  const [FieldsPart] = dataPendingUser();
  const [ExportModal, setExportModal] = useState(false);
  const [DatosFiltros, setDatosFiltros] = useState({
    dni: "",
    nombre: "",
    mail: "",
    vehiculo: "",
  });
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

  const cerrarGuardarExito = (e) => {
    e.preventDefault();
    setExportModal(false);
  };

  const onFilter = (e) => {
    e.preventDefault();
    setoffset(0)
    filter = {
      dni: e.target.dni.value,
      nombre: e.target.NyA.value,
      mail: e.target.Email.value,
      vehiculo: e.target.Vehículo.value,
    };

    getData(filter);
    setDatosFiltros(filter);
  };

  const tamPag = 15;
  const [offset, setoffset] = useState(tamPag);

  const getData = async (filter) => {
    filter.mail = codificarEmailURIFunction(filter.mail);
    setoffset(0)
    setData([])
    setData(
      await api
        .get(
          `ms-admin-rest/api/v1.0/pickers?pickerStatusId=2,3&limit=${tamPag}${
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
          return res.data.result.items;
        })
        .catch((err) => {
          console.log(err);
        })
    );

    setdataExport(filter);
  };

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      window.location.href = "/";
    }

    const cargarDatos = async () => {
      setData(
        await api
          .get(
            `ms-admin-rest/api/v1.0/pickers?pickerStatusId=2,3&limit=${tamPag}${
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
            return res.data.result.items;
          })
          .catch((err) => {
            console.log(err);
          })
      );
    };
    cargarDatos();
    return () => {
      setData({});
    };
  }, []);

  const cargarMas = async () => {
    setoffset(offset + tamPag);
    const res = await api
      .get(
        `ms-admin-rest/api/v1.0/pickers?pickerStatusId=2,3${
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
        }&limit=${tamPag}&offset=${offset}`
      )
      .then((res) => {
        return res.data.result.items;
      })
      .catch((err) => {
        console.log(err);
      });

    setData(data.concat(res));
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
          <PendingBlue />

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

          <Filter FieldsPart={FieldsPart} onSubmit={onFilter} />
          <br />

          <TableAdmin titulosAdminPending={titulosAdminPending} data={data} />
          <button onClick={cargarMas} className="paginator-button">
            Ver más
          </button>
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
                      className="button-modal-aprobar"
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
    </div>
  );
};
