import React,{useState} from 'react'

import volver from '../../../../assets/admin/PendingUser/volver.svg'
import Card from '../../../../assets/transaction/Card.svg'
import {Form,Field} from 'react-final-form'
import './dniFinish.css'
import api from '../../../../middleware/api'


export const DniFinish = (props) => {
    
    const [dniValid, setdniValid] = useState(false);
    const setdniFinish = props.setdniFinish;
    const setfinishModal = props.setfinishModal;
    const FilterSelectedTransaction=props.FilterSelectedTransaction
    
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
const handleChange = (value)=>{
 
  const expRegDni = /^[\d]{1,2}\.?[\d]{3,3}\.?[\d]{3,3}$/
    if(expRegDni.test(Number(value.dni))  && Number(value.dni)!==0 ){
        setdniValid(true)
    }else{
        setdniValid(false)
    }
    
}

    
    return (
        <div>
            <div onClick={handleClickgoBack} className="modal-transaction-finish-volver">
                <img  className="modal-transaction-finish-volver-img" src={volver} alt ="volver" />
                <p className="modal-transaction-finish-volver">Volver</p>
            </div>
            
            <div className="modal-dni-center">
                <img className="modal-dni-finish-card" src={Card} alt ="Card" />
                <h3 className="modal-dni-finish-h3">Ingresá el DNI de quien recibió el paquete</h3>
            
                 <Form
                        onSubmit={()=>{}}
                        validate={
                            handleChange
                        }
                        >
                        {({ handleSumbit = async(e) =>{
                            e.preventDefault()
                           
                             await api.post(
                                `/ms-admin-rest/api/v1.0/transactions/${FilterSelectedTransaction.transaction.id}/delivered`,
                                { key: "identificationNumber", value: e.target.dni.value }
                              ).then(res => {
                                  window.location.reload()
                              });
                        }  }) => (
                        <form  onSubmit={handleSumbit}>
                            <div className="modal-input-dni-finish">
                                <div className="filter-transaction-div-label">
                                    <label htmlFor="dni" className="label-Admin-Pickers">DNI *</label>
                                </div>
                                <Field
                                name="dni"
                                component="input"
                                placeholder="Ingresá el DNI"
                                className={dniValid!==false  ? "Admin-Pickers-input Inputerror" : "Admin-Pickers-input" }
                                id="dni"
                                maxLength={8}
                                >
                                </Field>
                            </div>
                            {dniValid ? 
                            <div>
                                <button  className="modal-dni-finish-button-active">Finalizarla</button>
                            </div>
                            :<div>
                                <button disabled={true} className="modal-dni-finish-button">Finalizarla</button>
                            </div>
                            }

                        </form>
                        )}
                            
                 </Form>
            </div>
        </div>
    )
}
