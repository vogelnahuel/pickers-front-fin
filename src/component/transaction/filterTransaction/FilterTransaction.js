import React from 'react'
import desplegable from '../../../assets/admin/PendingUser/desplegable.svg'
import './FilterTransaction.css'
import {DatePicker} from 'pickit-components'
import {Form,Field} from 'react-final-form'
import or from '../../../assets/admin/PendingUser/or.svg'
import search from  '../../../assets/admin/PendingUser/search.svg'

export const FilterTransaction = () => {
    return (
        <div className="display-filter-transaction">
            <div className="filter-Imagen-width">
                    <img className="img-filter-transaction" src={desplegable} alt="desplegable"/>
                    <p className="p-filter-transaction">Filtros</p>
            </div>
            <Form onSubmit={()=> {}}>   
                    {   ({handleSumbit}) => 
                        <form className="form-filter-transaction" onSubmit={handleSumbit}>
                                    <div>
                                        <div>
                                            <label className="label-filter-transaction">Número de transacción </label>
                                        </div>
                                        <div>
                                            <Field name="nroTransaccion" component="input" placeholder="Ingresá el número"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label className="label-filter-transaction" >Picker</label>
                                        </div>
                                        <div>
                                            <Field name="Picker" component="input" placeholder="Ingresá el número de picker"/>
                                        </div>
                                    </div>
                                    <div className="datePicker-filter-transaction">
                                        <div>
                                            <label className="label-filter-transaction" >Fecha de entrega</label>
                                        </div>
                                        <div>
                                            <Field  className="" name="FechaEntrega" component={DatePicker} placeholder="Seleccioná la fecha" />
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label className="label-filter-transaction" >Estados </label>
                                        </div>
                                        <div >
                                            <Field name="Estados" component="input" placeholder="Seleccioná el estado"/>
                                        </div>
                                    </div>
                                    <div>   
                                            <Field id="checkbox-filter-transaction" name="en alerta" component="input" type="checkbox"/>
                                            <label className="label-filter-transaction display-inline">En alerta</label>                               
                                    </div>
                                    <div className="container-button-width">
                                        <button 
                                                className="search-button-transaction"
                                                name="search"
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
