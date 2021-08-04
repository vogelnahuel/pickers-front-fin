import React, {} from "react";
import desplegable from "../../../assets/admin/PendingUser/desplegable.svg";
import "./FilterTransaction.scss";
import { DatePicker } from "pickit-components";
import { Form, Field } from "react-final-form";
import or from "../../../assets/admin/PendingUser/or.svg";
import search from "../../../assets/admin/PendingUser/search.svg";
import api from "../../../config/api";
import moment from "moment";
import MultipleSelect from "./MultipleSelect";


export const FilterTransaction = (props) => {
  const setapiFilter = props.setapiFilter;
  const setexportDisabled = props.setexportDisabled;



 

  /****formatear fecha */
  const formatDate = (values) => {
    if (values.FechaEntrega) {
      if (moment(values.FechaEntrega.from, "DD/MM/YYYY").isValid() === true) {
        values.FechaEntrega.from = moment(
          values.FechaEntrega.from,
          "DD/MM/YYYY"
        ).format("YYYY-MM-DD");
        values.FechaEntrega.until = moment(
          values.FechaEntrega.until,
          "DD/MM/YYYY"
        ).format("YYYY-MM-DD");
      }
    }

    return values;
  };
  /****verificar el custom select checkbox cuales estan seleccionados y generar salida */
  const multipleSelectCheckbox = () => {
    let stringSelected = "";
    const listaUlSelected = document.querySelectorAll(".multiple-labelCheckBox");
    let ArraySeleccionados = [];
    let j = 0;

    for (let i = 0; i < listaUlSelected.length; i++) {
      if (listaUlSelected[i].classList.contains("selected")) {
        ArraySeleccionados[j] = i;
        j++;
      }
    }

    for (let i = 0; i < ArraySeleccionados.length; i++) {
      switch (ArraySeleccionados[i]) {
        case 1:
          if (i !== 0) stringSelected += "PENDING_ASSIGNMENT";
          else stringSelected += "PENDING_ASSIGNMENT";
          break;
        case 2:
          if (i !== 0) stringSelected += ",IN_PICK_UP";
          else stringSelected += "IN_PICK_UP";
          break;
        case 3:
          if (i !== 0) stringSelected += ",IN_PICK_UP_POINT";
          else stringSelected += "IN_PICK_UP_POINT";
          break;
        case 4:
          if (i !== 0) stringSelected += ",PICKED_UP";
          else stringSelected += "PICKED_UP";
          break;
        case 5:
          if (i !== 0) stringSelected += ",IN_DELIVERY_POINT";
          else stringSelected += "IN_DELIVERY_POINT";
          break;
        case 6:
          if (i !== 0) stringSelected += ",DELIVERED";
          else stringSelected += "DELIVERED";
          break;
        case 7:
          if (i !== 0) stringSelected += ",IN_RETURN_TO_SENDER";
          else stringSelected += "IN_RETURN_TO_SENDER";
          break;
        case 8:
          if (i !== 0) stringSelected += ",RETURNED_TO_SENDER";
          else stringSelected += "RETURNED_TO_SENDER";
          break;
        case 9:
          if (i !== 0) stringSelected += ",LOST";
          else stringSelected += "LOST";
          break;
        case 10:
          if (i !== 0) stringSelected += ",CANCEL";
          else stringSelected += "CANCEL";
          break;

        default:
          break;
      }
    }

    return stringSelected;
  };
  
const EstaVacioFiltro = (values) => {
  

 

    if ( (Object.keys(values).length  >= 1) &&  (values.Picker!==undefined || values.FechaEntrega!==undefined || values.nroTransaccion!==undefined ) )  {
      return false;
    }

  return true;

}


  const onSubmit = async (values) => {


  

    values = formatDate(values);
    let stringSelected = "";
    stringSelected = multipleSelectCheckbox();
    setexportDisabled(EstaVacioFiltro(values));
    
   

    setapiFilter(
        
      await api
        .get(
          `ms-admin-rest/api/v1.0/transactions?${
            values.nroTransaccion
              ? `filter.transactionCode=${values.nroTransaccion}`
              : ""
          }${values.Picker ? `&filter.pickerId=${values.Picker}` : ""}${
            values.enAlerta ? `&filter.inAlert=${values.enAlerta}` : ""
          }${
            values.FechaEntrega
              ? `&filter.minMinDeliveryDate=${values.FechaEntrega.from}`
              : ""
          }${
            values.FechaEntrega
              ? `&filter.maxMinDeliveryDate=${values.FechaEntrega.until}`
              : ""
          }${
            stringSelected !== "" ? `&filter.state=${stringSelected}` : ""
          }&limit=${props.tamPag}&offset=${0}`
        )
        .then((res) => {
            props.setfilter({values,stringSelected:stringSelected});
            props.setoffset(props.tamPag)
            props.setVerMas(true)
          if(res.data.result.items.length<props.tamPag)
          {
            props.setVerMas(false)
          }
          if (
            typeof res.data.result === "object" &&
            res.data.result.items === undefined
          ) {
            return [res.data.result];
          }
          return res.data.result.items;
        })
        .catch((err) => {
          console.log(err);
        })
    );
  };


/**********************multiple select logica******************************* */



  return (
      <div className="display-filter-transaction">
        <div className="filter-Imagen-width">
          <img
            className="img-filter-transaction"
            src={desplegable}
            alt="desplegable"
          />
          <p className="p-filter-transaction">Filtros</p>

        </div>
        <Form onSubmit={onSubmit}>
          {({ handleSubmit }) => (
            <form className="form-filter-transaction" onSubmit={handleSubmit}>
              <div>
                <div>
                  <label className="label-filter-transaction">
                  Código de transacción {" "}
                  </label>
                </div>
                <div>
                  <Field
                    type="text"
                    name="nroTransaccion"
                    component="input"
                    placeholder="Ingresá el código"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label className="label-filter-transaction">Id de picker</label>
                </div>
                <div>
                  <Field
                    type="text"
                    name="Picker"
                    component="input"
                    placeholder="Ingresá el número de picker"
                  />
                </div>
              </div>
              <div className="datePicker-filter-transaction">
                <div>
                  <label className="label-filter-transaction">
                    Fecha de entrega
                  </label>
                </div>
                <div>
                  <Field
                    type="text"
                    className=""
                    name="FechaEntrega"
                    component={DatePicker}
                    placeholder="Seleccioná la fecha"
                  />
                </div>
              </div>
              <div>
                
                
                  <Field name="Estados" placeholder="Seleccioná el estado" component={MultipleSelect}>
                 
                  </Field>
                
              </div>
              <div className="filter-container">
                <Field
                  id="checkbox-filter-transaction"
                  name="enAlerta"
                  component="input"
                  type="checkbox"
                />
                <label id="padding" className="label-filter-transaction display-inline">
                  En alerta
                </label>
              </div>
              <div className="container-button-width">
                <button
                  className="search-button-transaction"
                  name="search"
                  type="submit"
                >
                  <img src={search} alt="export" />
                  <img className="or-filter" src={or} alt="or" />
                  <p className="display-inline-block p-export"> Buscar</p>
                </button>
              </div>
            </form>
          )}
        </Form>
      </div>
  );
};
