import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import pickersLogo from "./../../assets/login/PickersLogo.svg";
import canguro from "./../../assets/login/Canguro.svg";
import {Link} from 'react-router-dom'
import Button from '../../component/Button/Button'
import {useForm} from '../../hooks/useForm.js'
import {Modal} from 'pickit-components'


export const Login = () => {

  const [formValues,handleInputBlur,handleInputChange,handleSubmit] = useForm({
      mail:'',
      password:'',
      errorMail:false,
      errorMsgMail:'',
      errorPassWord:false,
      errorMsgPassword:'',
      modalOpen:false,
      modalOpen2:false,
    });

  const {mail,password,errorMail,errorMsgMail,errorPassWord,errorMsgPassword,} = formValues;
    let {modalOpen,modalOpen2} =formValues;
  useEffect(()=>{
    window.localStorage.removeItem('token')
 
  },[])
  
  const handleFocusLabel = (e,mail="") => {
    e.target.nextSibling.classList.remove('animationOrigin');
    e.target.nextSibling.classList.add('animationTop');
  }

  const [modalIsOpen, setmodalIsOpen] = useState(null)
  const [modalIsOpen2, setmodalIsOpen2] = useState(null)
  const cerrarModalError = () => {
    setmodalIsOpen(false)
    modalOpen=false

  }
  const cerrarModalError2 = () => {
    setmodalIsOpen2(false)
    modalOpen2=false

  }
  return (
      < >
    
    
    
        <div className="logo">
          <img src={pickersLogo} alt="PickersLogo"></img>
        </div>

        <div className="container centrar">
        <form className="form size" onSubmit={handleSubmit} >
          <div className="form-group">
        
          
            <input 
            type="mail"
             className="input" 
             name="mail" 
             id="mail"
             onBlur={handleInputBlur} 
             onChange={(e)=>{handleInputChange(e,mail)}}         
             value={mail}
             onFocus={(e) => handleFocusLabel(e,mail)}
            
            
            />
       
       <label htmlFor="mail" className="login-label label">Usuario</label>

              {
              errorMail ? <div className="errorsContainer">
                  <p className="errors"> {errorMsgMail}  </p>
              </div>:null
              }
          
           
            <input 
            type="password" 
            className="input" 
            name="password" 
            id="password"
            onBlur={handleInputBlur}
            onChange={(e)=>{handleInputChange(e,password)}}  
            value={password}
            onFocus={(e) => handleFocusLabel(e,password)}
            
            
            />
          <label htmlFor="password" className="login-label label">Contraseña</label>
            {
            errorPassWord ? <div className="errorsContainer">
                <p className="errors"> {errorMsgPassword}  </p>
            </div>:<></>
            }
          
          <div className="contenedor z-index">
            <div className="contenedor z-index animation">
              <Button 
              className="  button_ mt-4 mb-4 z-index" 
              type="submit" 
              name="button" ><p className="login-init "> Iniciar sesión </p> </Button>
            </div>
          </div>
          <div className="separador_"></div>
            <br/>
            <br/>
            <Link className="forgotPass" to={"./restore"}>¿Olvidaste tu contraseña?</Link>
          </div>
        </form>
       
    {    <Modal
                   width="750px"
                   height="351px"
                   isOpen={modalIsOpen===null?modalOpen:modalIsOpen}
                  >
                    <div className="container-modal">
                        <div className="modal-error-title">
                          <p className="p-modal-error-title">Usuario y/o contraseña inválidos</p>
                        </div>
                        <div className="modal-error-subtitle">
                           <p className="p-modal-error-subtitle">Tu usuario y/o contraseña ingresados son incorrectos. Por favor, ingresalos nuevamente.</p>
                              <button 
                                onClick={cerrarModalError}
                                className="button-modal-error">
                                <p>Entendido</p>
                              </button>
                        </div>
                    </div>
                  </Modal>
            }
                {    <Modal
                   width="750px"
                   height="351px"
                   isOpen={modalIsOpen2===null?modalOpen2:modalIsOpen2}
                  >
                    <div className="container-modal">
                        <div className="modal-error-title">
                          <p className="p-modal-error-title">Error en nuestro servidor</p>
                        </div>
                        <div className="modal-error-subtitle">
                           <p className="p-modal-error-subtitle">Por favor, reintentalo nuevamente.</p>
                              <button 
                                onClick={cerrarModalError2}
                                className="button-modal-error">
                                <p>Entendido</p>
                              </button>
                        </div>
                    </div>
                  </Modal>
            }
        </div> 
        <div className="login-image" >
          <img className="img-fluid  myresolution" src={canguro} alt="PickersFooter"></img>
        </div>
       
         

          
    </>
  );
}

export default Login;