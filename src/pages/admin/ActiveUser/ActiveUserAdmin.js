import React, { useEffect, useState } from "react";
import { Header } from "../../../component/admin/Header/Header";
import { Nav } from "../../../component/admin/Nav/Nav";
import "../PendingUser/PendingUserAdmin.css";
import exportar from "../../../assets/admin/PendingUser/exportar.svg";
import or from "../../../assets/admin/PendingUser/or.svg";
import { Filter } from "../../../component/admin/Filter/Filter";
import { TableAdmin } from "../../../component/admin/table/TableAdmin";
import { PendingBlack } from "../../../component/admin/Sub-Title-Image/PendingBlack";
import { dataActiveUser } from "./dataActiveUser";
import api from "../../../config/api";
import codificarEmailURIFunction from "../../../tools/encodeMail.js";
import createCSV from "../../../tools/createCSV.js";

export const ActiveUserAdmin = () => {
  /****titulos de la tabla */
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
  const tamPag = 15;
  const [offset, setoffset] = useState(0);
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


  const cargarMas = async () => {
    setoffset(offset + tamPag);
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

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      window.location.href = "/";
    }

    const cargarDatos = async () => {
      setData(
        await api
          .get(
            `ms-admin-rest/api/v1.0/pickers?pickerStatusId=4,5&limit=${tamPag}&offset=${offset}${
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
  }, [offset,filter.nombre,filter.vehiculo,filter.dni,filter.mail]);

  const getData = async (filter) => {
    filter.mail = codificarEmailURIFunction(filter.mail);
    setoffset(0)
    setData([])
    setData(
      await api
        .get(
            `ms-admin-rest/api/v1.0/pickers?pickerStatusId=4,5&limit=${tamPag}&offset=${offset}${
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
            setoffset(offset+ tamPag)
          return res.data.result.items;
        })
        .catch((err) => {
          console.log(err);
        })
    );

    setdataExport(filter);
  };

  const Export = async () => {
    //setDataExport
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
          <button onClick={cargarMas} className="paginator-button">
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
};
