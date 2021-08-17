import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.scss";
import pickersLogo from "./../../assets/login/PickersLogo.svg";
import canguro from "./../../assets/login/Canguro.svg";
import {Link} from 'react-router-dom'

import {Modal} from 'pickit-components'
import api from '../../config/api'


export const Login = () => {



    const [mail, setmail] = useState("")
    const [password, setpassword] = useState("");
    const [errorMail, seterrorMail] = useState(false)
    const [errorMsgMail, seterrorMsgMail] = useState("")
    const [errorPassWord, seterrorPassWord] = useState(false)
    const [errorMsgPassword, seterrorMsgPassword] = useState("")
    const [modalOpen, setmodalOpen] = useState(false)
    const [modalOpen2, setmodalOpen2] = useState(false)
  //Test
  //const {mail,password,errorMail,errorMsgMail,errorPassWord,errorMsgPassword,} = formValues;


  useEffect(()=>{
    window.localStorage.removeItem('token')
 
  },[])
  
  const handleFocusLabel = (e,mail="") => {
    e.target.nextSibling.classList.remove('animationOrigin');
    e.target.nextSibling.classList.add('animationTop');
  }

 
  const cerrarModalError = (e) => {
    e.preventDefault();
    setmodalOpen(false)
  }
  const cerrarModalError2 = (e) => {
    e.preventDefault();
    setmodalOpen2(false)
  }


  const handleInputChange = (e) => {     
    if(e.target.name==="password" && e.target.value.length>0){
      seterrorPassWord(false);
      seterrorMsgPassword('');
      document.querySelector('#labelpassword').classList.remove('labelError');
      document.querySelector('#password').classList.remove('inputError'); 
    }else if (e.target.name==="password" ){
      seterrorPassWord(true);
      seterrorMsgPassword('Este campo es requerido');
      document.querySelector('#labelpassword').classList.add('labelError');
      document.querySelector('#password').classList.add('inputError');
    }
    

    var expresionEmail = /\w+@\w+\.+[a-z]/;
   
    if(e.target.name==="mail"){
        e.target.classList.remove('inputReboteAnimation')
    }
    if(e.target.value.length>0){
       e.target.nextSibling.classList.remove('animationOrigin');
       e.target.nextSibling.classList.add('animationTop');          
    }else{          
        e.target.nextSibling.classList.remove('animationTop');
        e.target.nextSibling.classList.add('animationOrigin');
    }    
    if(e.target.value.length===0 && e.target.name==="mail")    {
        e.target.nextSibling.classList.add('labelError');
    }      
    if(e.target.value==='' && e.target.name==='mail'){
      seterrorMail(true);
      seterrorMsgMail('Este campo es requerido');
        e.target.classList.add('inputError');
        e.target.nextSibling.classList.add('labelError');
    }else if(!expresionEmail.test(e.target.value) && e.target.name==='mail'){
        seterrorMail(true);
        seterrorMsgMail('Debe ingresar un email válido');
        e.target.classList.add('inputError');   
        e.target.nextSibling.classList.add('labelError');        
    }
    else if(e.target.value!=='' && e.target.name==='mail'){
      seterrorMail(false);
        e.target.classList.remove('inputError');
        e.target.nextSibling.classList.remove('labelError');
    }
    if(e.target.name==="mail"){
      setmail(

        e.target.value
      )
    }
    if(e.target.name==="password"){
      setpassword(
        e.target.value
      )
    }
}


const handleInputBlur = (e) => {
  if(e.target.value.length===0 ){
       e.target.nextSibling.classList.remove('animationTop');
       e.target.nextSibling.classList.add('animationOrigin');
   }
 if(e.target.value.length===0 && e.target.name==='mail'){
      seterrorMail(true);
      seterrorMsgMail('Este campo es requerido');
       e.target.nextSibling.classList.add('labelError');
       e.target.classList.add('inputError');
   }else if (e.target.value.length!==0 && e.target.name==='mail'){
    seterrorMsgPassword('');        
   }
   if(e.target.name==='mail' && errorMail===true){
       e.target.classList.add('inputReboteAnimation');
   }
   
   if(e.target.value==='' && e.target.name==='password'){
      seterrorPassWord(true);
       seterrorMsgPassword('Este campo es requerido');
       e.target.classList.add('inputError');
       e.target.nextSibling.classList.add('labelError');
   }

   else if(e.target.value!=='' && e.target.name==='password'){
      seterrorPassWord(false); 
       e.target.classList.remove('inputError');
       e.target.nextSibling.classList.remove('labelError');        
   }
         
}



const handleSubmit = async (e) => {

  e.preventDefault();
  

 if(mail==='' || errorMail===true || password==='' || errorPassWord===true){
      if(mail===''){
          seterrorMail(true);
          seterrorMsgMail('Este campo es requerido');
          document.querySelector('#labelmail').classList.add('labelError');
          document.querySelector('#mail').classList.add('inputError');
        }
      if(password===''){
        seterrorPassWord(true);
        seterrorMsgPassword('Este campo es requerido');
        document.querySelector('#labelpassword').classList.add('labelError');
        document.querySelector('#password').classList.add('inputError');
      }

      
  }
    else{
     
      if( window.location.pathname==="/")
      {
         e.target.button.parentNode.classList.add('shineBorder') ;            
       }  
        
    await api.post('/ms-admin-rest/api/v1.0/login',{email:mail?mail:'',password:password?password:''})
<<<<<<< HEAD
           .then((response)=>{
            
=======
           .then((response)=>{   

>>>>>>> develop
              window.localStorage.setItem("token",response.data.result.accessToken)
           
             window.location.href= "./dashboard"
            return response;
      })
      .catch((err)=>{
        
           e.target.button.parentNode.classList.remove('shineBorder') 
          //values.tipoError="credenciales"

          if(err.response) {
           
            if(err.response.status===400){
              setmodalOpen(true);
            }
           else  if(err.response.status===403){
              setmodalOpen(true);
            }
            else  {
              setmodalOpen2(true) 
            } 
            return err;
          }
       
        })
    
      if( window.location.pathname==="/")
      {
          setTimeout(() => {
              e.target.button.parentNode.classList.remove('shineBorder') ; 
          }, 16000);
     
      } 

  }
  
}


  return (
      < >

        <div className="space-responsive-login"></div>
    
    
        <div className="logo">
          <img src={pickersLogo} className="pickersLogo_login" alt="PickersLogo"></img>
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
       
       <label id="labelmail" htmlFor="mail" className="login-label label">Usuario</label>

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
          <label id="labelpassword" htmlFor="password" className="login-label label">Contraseña</label>
            {
            errorPassWord ? <div className="errorsContainer">
                <p className="errors"> {errorMsgPassword}  </p>
            </div>:<></>
            }
          
          <div className="contenedor z-index">
            <div className="contenedor z-index animation">
              <button 
              
              className="  button_  z-index" 
              type="submit" 
              name="button" ><p className="login-init "> Iniciar sesión </p> </button>
            </div>
          </div>
          <div className="separador_"></div>
            <br/>
           
            <Link className="forgotPass" to={"./restore"}>¿Olvidaste tu contraseña?</Link>
          </div>
        </form>
       
    {   modalOpen === true ? 
          <div className="contendor-modal-login">
            <Modal

                    width="750px"
                    height="351px"
                    isOpen={modalOpen}
                    onClose={cerrarModalError}
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
                                    Entendido
                                </button>
                          </div>
                      </div>
                    </Modal>
              </div>
              : null
            }
                {  
                modalOpen2===true ?
               <div className="contendor-modal-login">
                <Modal
                   width="750px"
                   height="351px"
                   isOpen={modalOpen2}
                   onClose={cerrarModalError2}
                  >
                    <div className="container-modal">
                        <div className="modal-error-title">
                          <p className="p-modal-error-title">Error en nuestro servidor</p>
                        </div>
                        <div className="modal-error-subtitle">
                           <p className="p-modal-error-subtitle">Por favor, reintentalo nuevamente.</p>
                              <button 
                                onClick={cerrarModalError2}
                                className="button-modal-error2">
                                Entendido
                              </button>
                        </div>
                    </div>
                  </Modal>
              </div>
              :null
            }
        </div> 
        <div className="login-image" >
          <img className="img-fluid  myresolution" src={canguro} alt="PickersFooter"></img>
        </div>
       
         

          
    </>
  );
}

export default Login;