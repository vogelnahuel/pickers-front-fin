import React, { useState } from 'react'
import  Button  from '../../../component/Button/Button'
import api from '../../../config/api'

import "../Login.css";
import "./restorePassword.css";
import "bootstrap/dist/css/bootstrap.min.css";

import pickersLogo from "../../../assets/login/PickersLogo.svg";
import canguro from "../../../assets/login/Canguro.svg";
import Okey from "../../../assets/login/Okey.svg";
import Informacion from "../../../assets/login/Informacion.svg";
import { useParams } from 'react-router';
import {Modal}  from 'pickit-components'

import codificarEmailURIFunction from './../../../tools/encodeMail'

export const RestorePassword = () => {

  const [ModalIsOpen, setModalIsOpen] = useState(false)
  

  const {cod,mail} = useParams();

const handleSubmit = (e) =>{
  e.preventDefault();
  const mailCodificado = codificarEmailURIFunction(mail);
  if(password!=="" && password2!=="" && errorNumerosState!==true && errorMayusculasState!==true && errorCaracteresState!==true){

    api.put('ms-admin-rest/api/v1.0/change-password',{email:mailCodificado,verificationCode:cod,password:e.target.password.value})
    .then((response)=>{console.log(response)})
    .catch((err)=>
        {console.log(err);setModalIsOpen(true) }
    )

  }
  else{

    if(password===""){
      setError(true);
      setMsgError("Este campo es requerido");
      document.querySelector('#labelPassword').classList.add('labelError');
      document.querySelector('#password').classList.add('inputError');
    }

    if(password2===""){   
      setError2(true);
      setMsgError2("Este campo es requerido");
      document.querySelector('#labelpassword2').classList.add('labelError');
      document.querySelector('#password2').classList.add('inputError');
    }


  }





}

 
  const [errorPassWord, setError] = useState(false);
  const [errorPassWord2, setError2] = useState(false);
  const [errorMsgPassword, setMsgError] = useState("");
  const [errorMsgPassword2, setMsgError2] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorNumerosState, setErrorNumeros] = useState(false);
  const [errorMayusculasState, setErrorMayusculas] = useState(false);
  const [errorCaracteresState, setErrorCaracteres] = useState(false);
  const [errorDiferentesPassword, setErrorPassword] = useState(false);

const handleInputChange = (e) => {
    
    validarFormulario(e);

    if(e.target.name==="password")
    setPassword(
      e.target.value
    );
    if(e.target.name==="password2")
    setPassword2(
      e.target.value
    );

    if(e.target.value.length>0){

      e.target.nextSibling.classList.remove('animationOrigin');
      e.target.nextSibling.classList.add('animationTop');
     
   }else{
       
       e.target.nextSibling.classList.remove('animationTop');
       e.target.nextSibling.classList.add('animationOrigin');
   }
  
   if(e.target.value.length===0)    {
       e.target.nextSibling.classList.add('labelError');
   }


  }

  const validarFormulario = (e) =>{

    //donde poner los errores
    const errorCaracteres = document.querySelector('#caracteres');
   
    const errorLetras = document.querySelector('#mayusculas');
    
    const errorNumeros = document.querySelector('#numeros');
   
   
    ///setear errores
    errorCaracteres.classList.remove('restore-error-p');
    errorLetras.classList.remove('restore-error-p');
    errorNumeros.classList.remove('restore-error-p');
    setErrorCaracteres(false);
    setErrorMayusculas(false);
    setErrorNumeros(false);

    if(estaVacio(e)!==false){

      ///setear errores del inputChange
      e.target.style.marginBottom="2.6481481481481481vh";
      if(e.target.name==="password"){
        setError(false);
        setMsgError("");
        e.target.classList.remove('inputError');   
        e.target.nextSibling.classList.remove('labelError'); 
      }
      if(e.target.name==="password2"){
        setError2(false);
        setMsgError2("");
        e.target.classList.remove('inputError');   
        e.target.nextSibling.classList.remove('labelError');
      }
       /// FIN setear errores del inputChange

       
      if(tieneMasDeOchoCaracteres(e)===false && e.target.name!=="password2" ){
        errorCaracteres.classList.add('restore-error-p');
        e.target.classList.add('inputError');  
        e.target.nextSibling.classList.add('labelError');
       
        setErrorCaracteres(true);
      }
      if(TieneMayusculasYminusculas(e)===false && e.target.name!=="password2"){
        errorLetras.classList.add('restore-error-p');
        e.target.classList.add('inputError');  
        e.target.nextSibling.classList.add('labelError');
        setErrorMayusculas(true);
      }
       if(TieneNumerosYletras(e)===false && e.target.name!=="password2"){
        errorNumeros.classList.add('restore-error-p');
        e.target.classList.add('inputError'); 
        e.target.nextSibling.classList.add('labelError'); 
        setErrorNumeros(true);
      }
      if( e.target.name==="password2" && contraseñasIguales(e)===false  ){
        setErrorPassword(true);
        e.target.classList.add('errorInput');
        e.target.nextSibling.classList.add('labelError'); 
      }else{
        setErrorPassword(false);
        e.target.classList.remove('errorInput');
        if( e.target.name==="password2")
        e.target.nextSibling.classList.remove('labelError'); 
      }

    }else{
      ///// si esta vacio le pongo un error
      if(e.target.name==="password"){
        setError(true);
        setMsgError("Este campo es requerido");
        e.target.classList.add('inputError');
        e.target.style.marginBottom="0.6481481481481481vh";
      }
      if(e.target.name==="password2"){
        setError2(true);
        setMsgError2("Este campo es requerido");
        e.target.classList.add('inputError');
        e.target.style.marginBottom="0.6481481481481481vh";
      }
      
    }
}
  

const estaVacio=(e) =>{
  if(e.target.value!==""){
    return true;
  }
  return false;
}
const tieneMasDeOchoCaracteres=(e)=>{

  if(e.target.value.length<8){
    return false;
  }
  return true;
}
const TieneMayusculasYminusculas =(e) =>{

  const letras="abcdefghyjklmnñopqrstuvwxyz";
  const letras_mayusculas="ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
  let existeAlMenosUnaLetraMin=false;
  let existeAlMenosUnaLetraMay=false;
  let i;


  for(i=0; i<letras.length; i++){
      if(  e.target.value.indexOf (letras.charAt(i)  ) ){
        existeAlMenosUnaLetraMin=true;
      }
  }
  for(i=0; i<letras_mayusculas.length; i++){
    if(  e.target.value.includes (letras_mayusculas.charAt(i)  )  ){
      existeAlMenosUnaLetraMay=true;
    }
  }
  if(existeAlMenosUnaLetraMin===false  || existeAlMenosUnaLetraMay ===false){
      return false;
  }

  return true;
}

const TieneNumerosYletras = (e) =>{
  const numeros="0123456789";
  const letras="abcdefghyjklmnñopqrstuvwxyzABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
  let existeAlMenosUnNumero=false;
  let existeAlMenosUnaLetra=false;
  let i;

  for(i=0; i<numeros.length; i++){
      if(  e.target.value.includes (numeros.charAt(i)  ) ){
        existeAlMenosUnNumero=true;
      }
  }
    for(i=0; i<letras.length; i++){
      if(  e.target.value.includes (letras.charAt(i)  ) ){
        existeAlMenosUnaLetra=true;
      }
    }

  if(existeAlMenosUnNumero===false  || existeAlMenosUnaLetra ===false){
      return false;
    }

    return true;

}
const contraseñasIguales =(e) => {

  if(password!==e.target.value){
    return false;
  }
  return true;

}

const handleFocusLabel = (e,mail="") => {
  e.target.nextSibling.classList.remove('animationOrigin');
  e.target.nextSibling.classList.add('animationTop');
}
const handleInputBlur = (e) => {
    if(e.target.value.length===0){
      e.target.nextSibling.classList.remove('animationTop');
      e.target.nextSibling.classList.add('animationOrigin');
  }
}
const cerrarModalError = () => {
  setModalIsOpen(false);
}

    return (
        <section>
          <div className="logo">
            <img src={pickersLogo} alt="PickersLogo"></img>
          </div>
         
        
        <div className="container centrar ">
          <form className="form size" onSubmit={handleSubmit} >
            <div className="form-group">
              
              <input 
              value={password}
              type="password"
               className="input" 
               name="password" 
               id="password"
               onBlur={handleInputBlur} 
               onChange={(e)=>{handleInputChange(e,password)}}
               onFocus={(e) => handleFocusLabel(e,password)}          
               
            />
             <label id="labelPassword" htmlFor="password" className="label login-label-width login-restore-padding2">Nueva contraseña</label>
            {
                    errorPassWord ? <div className="errorsContainer">
                    <p className="errors"> {errorMsgPassword}  </p>
                    </div>:<></>   
                }
        
          
              <input 
              type="password" 
              className="input inputRestore" 
              name="password2" 
              id="password2"
              onBlur={handleInputBlur} 
              onChange={(e)=>{handleInputChange(e,password2)}}  
              onFocus={(e) => handleFocusLabel(e,password2)}
              value={password2} 
              />
              
            <label id="labelpassword2" htmlFor="password2" className="label login-label-width login-restore-padding">Repetir nueva contraseña</label> 
              {
                errorPassWord2 ? <div className="errorsContainer">
                 <p className="errors"> {errorMsgPassword2}  </p>
                 </div>:<></>   
              }
               {
                errorDiferentesPassword ? <div className="errorsContainer">
                 <p className="noEqualsPassword"> Las contraseñas no coinciden </p>
                 </div>:<></>   
              }
            
                <ul name="elementosError" className="ul">
                    La contraseña debe contar con
                    <li className="display-flex">
                      {
                        errorCaracteresState 
                        ?  <img   src={Informacion} alt="ok"/>
                       
                        :  <img  src={Okey} alt="ok"/>
                      }
                        <p id="caracteres" className="restore-p">8 o más caracteres</p>
                    </li>
                    <li className="display-flex">

                      {
                          errorMayusculasState 
                        ?  <img   src={Informacion} alt="ok"/>
                       
                        :  <img  src={Okey} alt="ok"/>
                      }
                         
                         
                         <p id="mayusculas" className="restore-p"> Mayúsculas y minúsculas</p>
                    </li>
                    <li className="display-flex">
                    {
                          errorNumerosState 
                        ?  <img   src={Informacion} alt="ok"/>
                       
                        :  <img  src={Okey} alt="ok"/>
                      }
                       
                         <p id="numeros" className="restore-p"> Números y letras</p>
                    </li>
                </ul>
              
           
                   <div className="Test">
                    <Button 
                    className="btn btn-outline-primary button_  float centerMybuttonPass" 
                    type="submit" 
                    name="button" 
                  >Guardar</Button> 
                  </div>
                
                  <Modal
                   width="750px"
                   height="351px"
                   isOpen={ModalIsOpen}
                  >
                    <div className="container-modal">
                        <div className="modal-error-title">
                          <p className="p-modal-error-title">Error en nuestro servidor</p>
                        </div>
                        <div className="modal-error-subtitle">
                           <p className="p-modal-error-subtitle">Por favor, reintentalo nuevamente.</p>
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
              
      
          <img className="img-fluid myresolution" src={canguro} alt="PickersFooter"></img>
     
          
         
     
         
  
      </section>
    );
}

