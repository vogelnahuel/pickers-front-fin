import React from 'react'

import volver from '../../../../assets/admin/PendingUser/volver.svg'
import Card from '../../../../assets/transaction/Card.svg'
import {Form,Field} from 'react-final-form'
import './dniFinish.css'


export const DniFinish = (props) => {

    const setdniFinish = props.setdniFinish;
    const setfinishModal = props.setfinishModal;

    const handleClickgoBack = (e) => {
        
        e.target.parentNode.parentNode.parentNode.classList.add('animation-right-transaction')

         setTimeout(() => {
             
            e.target.parentNode.parentNode.parentNode.classList.remove('animation-right-transaction')
            setfinishModal(true);
            if(e.target.parentNode.parentNode.parentNode!==null){
                e.target.parentNode.parentNode.parentNode.parentNode.firstChild.classList.add('animation-right-transaction2')
                e.target.parentNode.parentNode.parentNode.parentNode.firstChild.classList.remove('animation-right-transaction2')    
            }
           
            
            setdniFinish(false);
         }, 600);
        
}
    
    return (
        <div>
            <div onClick={handleClickgoBack} className="modal-transaction-finish-volver">
                <img src={volver} alt ="volver" />
                <p className="modal-transaction-finish-volver">Volver</p>
            </div>
            
            <div className="modal-dni-center">
                <img className="modal-dni-finish-card" src={Card} alt ="Card" />
                <h3 className="modal-dni-finish-h3">Ingresá el DNI de quien recibió el paquete</h3>
            
                 <Form
                        onSubmit={()=>{}}
                        >
                        {({ handleSumbit  }) => (
                        <form>
                            <div className="modal-input-dni-finish">
                                <div>
                                    <label htmlFor="dni">Dni *</label>
                                </div>
                                <Field
                                name="dni"
                                component="input"
                                placeholder="45896587"
                                id="dni"
                                >
                                </Field>
                            </div>

                            <div>
                                <button className="modal-dni-finish-button">Finalizarla</button>
                            </div>

                        </form>
                        )}
                            
                 </Form>
            </div>
        </div>
    )
}
