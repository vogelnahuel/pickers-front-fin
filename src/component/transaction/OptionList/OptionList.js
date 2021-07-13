import React from 'react'
import './optionList.css'
import Okey from '../../../assets/transaction/Okey.svg'
import Connector from '../../../assets/transaction/Connector.svg'
import Cancel from '../../../assets/transaction/Cancel.svg'

import { Form,Field } from 'react-final-form'

export const OptionList = () => {
    return (
        <div className="modal-transaction-optionContainer-scroll">

              <Form 
              onSubmit={()=> {}}
              initialValues={{ nroTransaccion: "651456321" ,Picker:"Juan Perez", Telefono:"1564854321",dirRetiro:"JB. Justo 1024 - CABA",dirEntrega:"Cabildo 750, Belgrano - CABA",Retailer:"pickit" }}
            
              >   
                    {   ({handleSumbit}) => 
                        <form className="form-filter-transaction" onSubmit={handleSumbit}>
                            <div className="modal-transaction-inputs">
                                    <div>
                                        <div>
                                            <label className="label-filter-transaction">Picker </label>
                                        </div>
                                        <div>
                                            <Field name="nroTransaccion" component="input" placeholder="Ingresá el número" value="12345"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label className="label-filter-transaction" >Nombre y apellido</label>
                                        </div>
                                        <div>
                                            <Field name="Picker" component="input" placeholder="Ingresá el número de picker"/>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <div>
                                            <label className="label-filter-transaction" >Teléfono </label>
                                        </div>
                                        <div >
                                            <Field name="Telefono" component="input" placeholder="Seleccioná el estado"/>
                                        </div>
                                    </div>

                                    <div>
                                        <div>
                                            <label className="label-filter-transaction" >Dirección de retiro </label>
                                        </div>
                                        <div >
                                            <Field name="dirRetiro" component="input" placeholder="Seleccioná el estado"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label className="label-filter-transaction" >Dirección de entrega </label>
                                        </div>
                                        <div >
                                            <Field name="dirEntrega" component="input" placeholder="Seleccioná el estado"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label className="label-filter-transaction" >Retailer </label>
                                        </div>
                                        <div >
                                            <Field name="Retailer" component="input" placeholder="Seleccioná el estado"/>
                                        </div>
                                    </div>
                                </div>
                                <button className="modal-transaction-button-irApicker">Ir a picker</button>
                                   

                        </form>
                    }
            </Form>

            <h3 className="modal-transaction-h3">
                Historial
            </h3>
            <hr className="modal-transaction-separate-option"/>
            <section className="modal-transaction-section-history">
                <div className="modal-transaction-part">
                    <img src={Okey} alt="okey" className="modal-transaction-img-okey"/>
                    <p className="modal-transaction-part-subtitle" >Entregado</p>
                    <p className="modal-transaction-part-info" >01/07/2021 15:04</p>
                </div>
                <div className="modal-transaction-part">
                    <img src={Connector} alt="okey" className="modal-transaction-img-connector"/>
                </div>
                <div className="modal-transaction-part">
                    <img src={Okey} alt="okey" className="modal-transaction-img-okey"/>
                    <p className="modal-transaction-part-subtitle" >En lugar de entrega</p>
                    <p className="modal-transaction-part-info" >01/07/2021 15:50</p>
                </div>
                <div className="modal-transaction-part">
                    <img src={Connector} alt="okey" className="modal-transaction-img-connector"/>
                </div>
                <div className="modal-transaction-part">
                    <img src={Okey} alt="okey" className="modal-transaction-img-okey"/>
                    <p className="modal-transaction-part-subtitle" >En entrega</p>
                    <p className="modal-transaction-part-info" >01/07/2021 15:31</p>
                </div>
                <div className="modal-transaction-part">
                    <img src={Connector} alt="okey" className="modal-transaction-img-connector"/>
                </div>
                <div className="modal-transaction-part">
                    <img src={Okey} alt="okey" className="modal-transaction-img-okey"/>
                    <p className="modal-transaction-part-subtitle" >En lugar de entrega</p>
                    <p className="modal-transaction-part-info" >01/07/2021 15:50</p>
                </div>
                <div className="modal-transaction-part">
                    <img src={Connector} alt="okey" className="modal-transaction-img-connector"/>
                </div>

                <div className="modal-transaction-part">
                    <img src={Cancel} alt="okey" className="modal-transaction-img-okey"/>
                    <p className="modal-transaction-part-subtitle" >Retirado</p>
                    <p className="modal-transaction-part-info" >01/07/2021 15:31</p>
                </div>
                <div className="modal-transaction-part">
                    <img src={Connector} alt="okey" className="modal-transaction-img-connector"/>
                </div>
                <div className="modal-transaction-part">
                    <img src={Okey} alt="okey" className="modal-transaction-img-okey"/>
                    <p className="modal-transaction-part-subtitle" >En lugar de retiro</p>
                    <p className="modal-transaction-part-info" >01/07/2021 15:50</p>
                </div>
                <div className="modal-transaction-part">
                    <img src={Connector} alt="okey" className="modal-transaction-img-connector"/>
                </div>
                <div className="modal-transaction-part">
                    <img src={Okey} alt="okey" className="modal-transaction-img-okey"/>
                    <p className="modal-transaction-part-subtitle" >En retiro</p>
                    <p className="modal-transaction-part-info" >01/07/2021 15:50</p>
                </div>
                <div className="modal-transaction-part">
                    <img src={Connector} alt="okey" className="modal-transaction-img-connector"/>
                </div>
                <div className="modal-transaction-part">
                    <img src={Okey} alt="okey" className="modal-transaction-img-okey"/>
                    <p className="modal-transaction-part-subtitle" >Asignado</p>
                    <p className="modal-transaction-part-info" >01/07/2021 15:50</p>
                </div>
                <div className="modal-transaction-part">
                    <img src={Connector} alt="okey" className="modal-transaction-img-connector"/>
                </div>
                <div className="modal-transaction-part">
                    <img src={Okey} alt="okey" className="modal-transaction-img-okey"/>
                    <p className="modal-transaction-part-subtitle" >Pendiente</p>
                    <p className="modal-transaction-part-info" >01/07/2021 15:50</p>
                </div>
                <div className="modal-transaction-part">
                    <img src={Connector} alt="okey" className="modal-transaction-img-connector"/>
                </div>
                <div className="modal-transaction-part">
                    <img src={Okey} alt="okey" className="modal-transaction-img-okey"/>
                    <p className="modal-transaction-part-subtitle" >Creación</p>
                    <p className="modal-transaction-part-info" >01/07/2021 15:50</p>
                </div>
 
            </section>


        </div>
    )
}
