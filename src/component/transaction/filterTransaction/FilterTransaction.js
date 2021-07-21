import React, { useEffect } from 'react'
import $ from 'jquery'
import './multipleSelect.css'
import desplegable from '../../../assets/admin/PendingUser/desplegable.svg'
import './FilterTransaction.css'
import {DatePicker} from 'pickit-components'
import {Form,Field} from 'react-final-form'
import or from '../../../assets/admin/PendingUser/or.svg'
import search from  '../../../assets/admin/PendingUser/search.svg'
import api from '../../../config/api'




export const FilterTransaction = (props) => {

    const setapiFilter = props.setapiFilter;

    $()
    setTimeout(() => {
        const es = document.querySelector('.ms-select-all label span');
        if(es!==null)
        {
           es.firstChild.textContent="Todos"
        }
    }, 200);
 
    
    useEffect(() => {
        const jqueryMin = document.createElement('script');
        jqueryMin.src = "https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js";
        document.body.appendChild(jqueryMin);

        const multipleSelect = document.createElement('script');
        multipleSelect.src = "https://unpkg.com/multiple-select@1.5.2/dist/multiple-select.min.js";
        document.body.appendChild(multipleSelect);

        const multipleSelectScript = document.createElement('script');
        multipleSelectScript.innerHTML=`
        $(function () {
            {
                $('select').multipleSelect()
            }
            
        })  `
        setTimeout(() => {
            document.body.appendChild(multipleSelectScript);
        }, 320);
       
        return () => {
            document.body.removeChild(jqueryMin);
            document.body.removeChild(multipleSelect);
            document.body.removeChild(multipleSelectScript);
        }

    }, [])


    const onSubmit =   (values) => {

        //setapiFilter(values)
        /*.get(
            `ms-admin-rest/api/v1.0/pickers?pickerStatusId=2,3&limit=${tamPag}${
              filter.nombre ? `&name=${filter.nombre}` : ""
            }${
              filter.vehiculo && filter.vehiculo !== "DEFAULT"
                ? `&vehicleTypeId=${filter.vehiculo === "moto" ? 1 : 2}`
                : ""
            }${
              filter.dni ? `&identificationNumber=${parseInt(filter.dni)}` : ""
            }${filter.mail ? `&email=${filter.mail}` : ""}`
          )*/
          console.log(values)

            if(values.Picker){
                console.log("entre")
             }
            if(values.nroTransaccion){
                console.log("entre")
            }
            if(values.FechaEntrega){
                console.log("entre")
            }
            if(values.enAlerta){
                console.log("entre")
            }
            /*
         const listaUlSelected  = document.querySelector('.ms-drop ul');
            */



        const cargarDatos = async()=> {

            setapiFilter( await  api.get(`ms-admin-rest/api/v1.0/transactions/${values.Picker ? values.Picker : '' }  `) 
       
               .then((res) => {
                    
                   if(typeof res.data.result === 'object' && res.data.result.items===undefined ){
          
                        return [res.data.result]
                   }
                   return res.data.result.items;
                 })
                 .catch((err) => {
                   console.log(err);
                 }))
           }
           cargarDatos();


        console.log(values)
    }

 
 

    return (
        <div className="display-filter-transaction">
            <div className="filter-Imagen-width">
                    <img className="img-filter-transaction" src={desplegable} alt="desplegable"/>
                    <p className="p-filter-transaction">Filtros</p>
            </div>
            <Form onSubmit={onSubmit}>  

                    {  ({handleSubmit}) => 

                        <form className="form-filter-transaction" onSubmit={handleSubmit}>
                                    <div>
                                        <div>
                                            <label className="label-filter-transaction">Número de transacción </label>
                                        </div>
                                        <div>
                                            <Field type="text" name="nroTransaccion" component="input" placeholder="Ingresá el número"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label className="label-filter-transaction" >Picker</label>
                                        </div>
                                        <div>
                                            <Field  type="text" name="Picker" component="input" placeholder="Ingresá el número de picker"/>
                                        </div>
                                    </div>
                                    <div className="datePicker-filter-transaction">
                                        <div>
                                            <label className="label-filter-transaction" >Fecha de entrega</label>
                                        </div>
                                        <div>
                                            <Field  type="text" className="" name="FechaEntrega" component={DatePicker} placeholder="Seleccioná la fecha" />
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label className="label-filter-transaction" >Estados </label>
                                        </div>
                                        <div >
                                            <Field  name="Estados"  placeholder="Seleccioná el estado">
                                            {() => (
                                                        <select placeholder="Seleccioná el estado" multiple="multiple">
                                                            <option value="Sin asignar">Sin asignar</option>
                                                            <option value="En retiro">En retiro</option>
                                                            <option value="En punto de retiro">En punto de retiro</option>
                                                            <option value="Retirado">Retirado</option>
                                                            <option value="En lugar de entrega">En lugar de entrega</option>
                                                            <option value="Entregado">Entregado</option>
                                                            <option value="En devolución">En devolución</option>
                                                            <option value="Devuelto a origen">Devuelto a origen</option>
                                                            <option value="Siniestrado">Siniestrado</option>
                                                            <option value="Cancelada">Cancelada</option>
                                                      </select>
                                                    )
                                            }
                                            </Field>
                                        </div>
                                    </div>
                                    <div>   
                                            <Field id="checkbox-filter-transaction" name="enAlerta" component="input" type="checkbox"/>
                                            <label className="label-filter-transaction display-inline">En alerta</label>                               
                                    </div>
                                    <div className="container-button-width">
                                        <button 
                                                className="search-button-transaction"
                                                name="search"
                                                type="submit"
                                                >
                                                <img  src={search} alt="export" />
                                                <img className="or-filter" src={or} alt="or" />
                                                <p className="display-inline-block p-export"> Buscar</p>
                                        </button>
                                    </div>
                                       
                        </form>
                    }
            </Form>
          



        </div>
    )
}
