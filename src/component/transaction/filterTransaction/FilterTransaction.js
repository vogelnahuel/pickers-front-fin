import React, { useEffect, useMemo, useState } from "react";
import "./multipleSelect.scss";
import desplegable from "../../../assets/admin/PendingUser/desplegable.svg";
import "./FilterTransaction.scss";
import { DatePicker } from "pickit-components";
import { Form, Field } from "react-final-form";
import or from "../../../assets/admin/PendingUser/or.svg";
import search from "../../../assets/admin/PendingUser/search.svg";
import api from "../../../config/api";
import moment from "moment";
import Flecha from '../../../assets/admin/flechaAbajo.svg'

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

const checkboxInputAll = document.querySelectorAll('.multiple-checkboxInput');
const inputValor = document.querySelector('#valorAmodificar');
const [stateSeleccionados, setstateSeleccionados] = useState(0)
let seleccionadosInput=stateSeleccionados;


const valorModificarFuncion = (e)=> {
  e.preventDefault()
  e.stopPropagation()
 const opciones =  document.querySelector('#opciones');
  opciones.style.display="block";
}
const pararPropagacion = (e)=>{
  e.stopPropagation();
  window.removeEventListener('click',cerrarSelectBox)
}

if(checkboxInputAll!==null)
checkboxInputAll.forEach(inp => inp.addEventListener('click',  (e)=>{
    
  let todos = false;

  if(e.target.checked===true){
    seleccionadosInput++;
  }
  else if(e.target.checked===false){
    seleccionadosInput--;
  }

  if(e.target.id==="Todos"){
      if(e.target.checked===true){
          checkboxInputAll.forEach(inputs=> inputs.checked=true)
          inputValor.placeholder="Todos";
          inputValor.classList.add('multiple-seleccionadoInputColor');
          todos=true;
          seleccionadosInput=(checkboxInputAll.length-1);
         
      }else  if(e.target.checked===false){
          checkboxInputAll.forEach(inputs=> inputs.checked=false)
          inputValor.placeholder="Seleccioná el estado";
          inputValor.classList.remove('multiple-seleccionadoInputColor');
          todos=false;
          seleccionadosInput=(0);
          
      }
  }

  checkboxInputAll.forEach(inp => inp.checked===false  ?  inp.nextElementSibling.classList.remove('selected'):"" )

  if(seleccionadosInput=== (checkboxInputAll.length-1 ) || todos ===true ) {
      inputValor.placeholder="Todos";
      inputValor.classList.add('multiple-seleccionadoInputColor');
      checkboxInputAll[0].checked=true;
     
      checkboxInputAll.forEach(inp => inp.checked===true  ?  inp.nextElementSibling.classList.add('selected'):"" )
  }
  else if(seleccionadosInput!== (checkboxInputAll.length-1 ) && seleccionadosInput!== 0 && seleccionadosInput <= 3 )  {
      inputValor.placeholder=""
      checkboxInputAll.forEach(inp => inp.checked===true  ?  inputValor.placeholder+=inp.value+"," : "" )
      inputValor.classList.add('multiple-seleccionadoInputColor');
      checkboxInputAll[0].checked=false;
      checkboxInputAll.forEach(inp => inp.checked===true  ?  inp.nextElementSibling.classList.add('selected'):"" )
  }
  else if(seleccionadosInput!== (checkboxInputAll.length-1 ) && seleccionadosInput!== 0 && seleccionadosInput > 3)  {
      inputValor.placeholder=""
      inputValor.placeholder=seleccionadosInput+" Seleccionados";
      inputValor.classList.add('multiple-seleccionadoInputColor');
      checkboxInputAll[0].checked=false;
      checkboxInputAll.forEach(inp => inp.checked===true  ?  inp.nextElementSibling.classList.add('selected'):"" )
  }
  else if(seleccionadosInput=== 0 )  {
      inputValor.placeholder="Seleccioná el estado";
      inputValor.classList.remove('multiple-seleccionadoInputColor');
      checkboxInputAll[0].checked=false;
  }
 
 
  if(seleccionadosInput!== 0 && seleccionadosInput!== (checkboxInputAll.length-1) && inputValor.placeholder[inputValor.placeholder.length-1]===","  ){
      inputValor.placeholder=inputValor.placeholder.substring(0,inputValor.placeholder.length-1);
  }

}))


const cerrarCheckbox = ()=>{
  
  if(window.location.pathname==="/transaction"){
    const opciones =  document.querySelector('#opciones');
    opciones.style.display="none";
   
    
     if(seleccionadosInput=== 0 )  {
       if(inputValor!==null){
        inputValor.placeholder="Seleccioná el estado";
        inputValor.classList.remove('multiple-seleccionadoInputColor');
       }
       
       
      if(checkboxInputAll!==undefined && checkboxInputAll.length!==0){
        checkboxInputAll[0].checked=false;
      }
      
  }
  }

  setstateSeleccionados(seleccionadosInput);
  
}


// eslint-disable-next-line react-hooks/exhaustive-deps
const cerrarSelectBox = useMemo(() => cerrarCheckbox,[])




useEffect(() => {
  console.log("entre")

  window.addEventListener('click',cerrarCheckbox)
  if(document.querySelector('#opciones')!==null)
  document.querySelector('#opciones').addEventListener('click',pararPropagacion)
  return(()=>{
    window.removeEventListener('click',cerrarSelectBox)
    if(document.querySelector('#opciones')!==null)
    document.querySelector('#opciones').removeEventListener('click',pararPropagacion)
  })
 

}, )


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
                    Número de transacción{" "}
                  </label>
                </div>
                <div>
                  <Field
                    type="text"
                    name="nroTransaccion"
                    component="input"
                    placeholder="Ingresá el número"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label className="label-filter-transaction">Picker</label>
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
                
                
                  <Field name="Estados" placeholder="Seleccioná el estado">
                    {() => (
                      <div className="multiple-selectbox">
                            <div className="multiple-select" id="select">
                                <div  onClick={valorModificarFuncion} className="multiple-contenido-select">
                                    <h1>Estados</h1>
                                  
                                    <div className="multiple-ContenedorInput">
                                        <input placeholder="Seleccioná el estado" disabled className="multiple-input" type="text" value="" id="valorAmodificar"/>
                                        <img className="multiple-flotarImg" src={Flecha} alt="flecha"/>
                                    </div>
                                </div>
                            </div>
                            <div   className="multiple-opciones" id="opciones">
                    
                                <div  className="multiple-contenido-opcion">
                                    <input className="multiple-checkboxInput" type="checkbox" id="Todos"  value="" />
                                    <label className="multiple-labelCheckBox" htmlFor="Todos">Todos</label>
                                </div>
                                <div className="multiple-contenido-opcion">
                                    <input   className="multiple-checkboxInput" type="checkbox" id="sinAsignar" value="Sin asignar" />
                                    <label className="multiple-labelCheckBox" htmlFor="sinAsignar">Sin asignar</label>
                                </div>
                                <div className="multiple-contenido-opcion"> 
                                    <input  className="multiple-checkboxInput" type="checkbox" id="enRetiro" value="En retiro" />
                                    <label className="multiple-labelCheckBox" htmlFor="enRetiro">En retiro</label>
                                </div>
                                <div  className="multiple-contenido-opcion">
                                    <input  className="multiple-checkboxInput" type="checkbox" id="enPuntoDeRetiro" value="En punto de retiro" />
                                    <label className="multiple-labelCheckBox" htmlFor="enPuntoDeRetiro">En punto de retiro</label>
                                </div>
                                <div  className="multiple-contenido-opcion">
                                    <input  className="multiple-checkboxInput" type="checkbox" id="Retirado" value="Retirado" />
                                    <label className="multiple-labelCheckBox" htmlFor="Retirado">Retirado</label>
                                </div>
                                <div  className="multiple-contenido-opcion">
                                    <input  className="multiple-checkboxInput" type="checkbox" id="enLugarDeEntrega" value="En lugar de entrega"/>
                                    <label className="multiple-labelCheckBox" htmlFor="enLugarDeEntrega">En lugar de entrega</label>
                                </div>
                                <div   className="multiple-contenido-opcion">
                                    <input   className="multiple-checkboxInput" type="checkbox" id="Entregado" value="Entregado" />
                                    <label className="multiple-labelCheckBox" htmlFor="Entregado">Entregado</label>
                                </div>
                                <div   className="multiple-contenido-opcion">
                                    <input   className="multiple-checkboxInput" type="checkbox" id="enDevolucion" value="En devolución"/>
                                    <label className="multiple-labelCheckBox" htmlFor="enDevolucion">En devolución</label>
                                </div>
                                <div   className="multiple-contenido-opcion">
                                    <input  className="multiple-checkboxInput" type="checkbox" id="DevueltoAOrigen" value="Devuelto a origen"/>
                                    <label className="multiple-labelCheckBox" htmlFor="DevueltoAOrigen">Devuelto a origen</label>
                                </div>
                                <div  className="multiple-contenido-opcion">
                                    <input  className="multiple-checkboxInput" type="checkbox" id="Siniestrado" value="Siniestrado" />
                                    <label className="multiple-labelCheckBox" htmlFor="Siniestrado">Siniestrado</label>
                                </div>
                                <div  className="multiple-contenido-opcion">
                                    <input  className="multiple-checkboxInput" type="checkbox" id="Cancelada" value="Cancelada"/>
                                    <label className="multiple-labelCheckBox" htmlFor="Cancelada">Cancelada</label>
                                </div>
                    
                            </div>
                      </div>
                    )}
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
