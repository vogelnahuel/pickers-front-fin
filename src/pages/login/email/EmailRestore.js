import React, {useState} from 'react'
import Button from '../../../component/Button/Button'
import canguro from "../../../assets/login/Canguro.svg";
import pickersLogo from "../../../assets/login/PickersLogo.svg";
import {useForm} from '../../../hooks/useForm.js'
import './Email.css'
// import loginService from '../../../services/login/loginService'
import api from '../../../config/api'
import {Modal}  from 'pickit-components'

export const  EmailRestore = () => {
    //let token =localStorage.getItem("token")
   // console.log(token)


    const [formValues,handleInputBlur,handleInputChange] = useForm({
      mail:'',
      errorMail:true,
      errorMsgMail:'',
    });
  

    const {mail,errorMail,errorMsgMail} = formValues;
    const [ModalIsOpen, setModalIsOpen] = useState(false)
    const cerrarModal = () => {
      setModalIsOpen(false);
    }
    const [ModalErrorIsOpen, setModalErrorIsOpen] = useState(false)
    const cerrarModalError = () => {
      setModalErrorIsOpen(false);
    }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(mail!=='' && errorMail!==true){
      api.post('ms-admin-rest/api/v1.0/admin/request-change-password',{email:mail[0]})
      .then((res)=>{setModalIsOpen(true)})
      .catch((err)=>{console.log(err)})
     
    }
  }

  const handleFocusLabel = (e,mail="") => {
    e.target.nextSibling.classList.remove('animationOrigin');
    e.target.nextSibling.classList.add('animationTop');
  }


    return(
      <>
     
          <div className="logo">
            <img src={pickersLogo} alt="PickersLogo"></img>
          </div>


          <div className="container centrar">
          <form className="form size" onSubmit={handleSubmit}>
            <div className="form-group">
            
            
              <input 
               type="mail" 
               className="input" 
               name="mail" 
               id="mail"
               autoComplete="off"
               onBlur={(e) => {
                handleInputBlur(e)
               }}
               onChange={(e)=>{handleInputChange(e,mail)}}   
               value={mail}
               onFocus={(e) => handleFocusLabel(e,mail)}
               />
               <label htmlFor="mail" className="label login-label">Email</label>
                {
                errorMail ? <div className="errorsContainer">
                 <p className="errors"> {errorMsgMail}  </p>
                 </div>:<></>
               }
              
            
              <Button 
              className="btn btn-outline-primary button_ " 
              type="submit" 
              name="button" 
               >Enviar correo
               </Button>
              
               <Modal
                   width="750px"
                   height="351px"
                   isOpen={ModalIsOpen}
                  >
                    <div className="container-modal">
                        <div className="modal-info-title">
                          <p className="p-modal-error-title">Enviamos un correo a tu email</p>
                        </div>
                        <div className="modal-error-subtitle">
                           <p className="p-modal-error-subtitle">Ingresá al mismo para restaurar tu contraseña</p>
                              <button 
                                onClick={cerrarModal}
                                className="button-modal-info">
                                <p>Entendido</p>
                              </button>
                        </div>
                    </div>
                  </Modal>
                  <Modal
                   width="750px"
                   height="351px"
                   isOpen={ModalErrorIsOpen}
                  >
                    <div className="container-modal">
                        <div className="modal-error-title">
                          <p className="p-modal-error-title">Error en nuestro servidor</p>
                        </div>
                        <div className="modal-error-subtitle">
                           <p className="p-modal-error-subtitle">Restauraste tu contraseña exitosamente</p>
                              <button 
                                onClick={cerrarModalError}
                                className="button-modal-error">
                                <p>Entendido</p>
                              </button>
                        </div>
                    </div>
                  </Modal>
            
            
            </div>
          </form>
        </div>
      
         
           <img className="img-fluid myresolution" src={canguro} alt="pickersFooter"></img>
          
    
         
  
      </>
  
    )
}

export default EmailRestore;