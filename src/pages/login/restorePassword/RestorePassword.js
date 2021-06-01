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

export const RestorePassword = () => {

  

  const {cod,mail} = useParams();

const handleSubmit = (e) =>{
  e.preventDefault();
  api.put('ms-admin-rest/api/v1.0/admin/change-password',{email:mail,verificationCode:cod,password:e.target.password.value})
  .then((response)=>{console.log(response)})
  .catch((err)=>{console.log(err)})
}

 
  const [errorPassWord, setError] = useState(false);
  const [errorPassWord2, setError2] = useState(false);
  const [errorMsgPassword, setMsgError] = useState("");
  const [errorMsgPassword2, setMsgError2] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

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

    if(estaVacio(e)!==false){

      ///setear errores del inputChange
      if(e.target.name==="password"){
        setError(false);
        setMsgError("");
        e.target.classList.remove('inputError');   
      }
      if(e.target.name==="password2"){
        setError2(false);
        setMsgError2("");
        e.target.classList.remove('inputError');   
      }
       /// FIN setear errores del inputChange


      if(tieneMasDeOchoCaracteres(e)===false){
        errorCaracteres.classList.add('restore-error-p');
      }
      else if(TieneMayusculasYminusculas(e)===false){
        errorLetras.classList.add('restore-error-p');
      }
      else if(TieneNumerosYletras(e)===false){
        errorNumeros.classList.add('restore-error-p');
      }

    }else{
      ///// si esta vacio le pongo un error
      if(e.target.name==="password"){
        setError(true);
        setMsgError("Este campo es requerido");
        e.target.classList.add('inputError');
      }
      if(e.target.name==="password2"){
        setError2(true);
        setMsgError2("Este campo es requerido");
        e.target.classList.add('inputError');
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

    return (
        <section>
          <div className="logo">
            <img src={pickersLogo} alt="PickersLogo"></img>
          </div>
         
        
        <div className="container centrar ">
          <form className="form size" onSubmit={handleSubmit} >
            <div className="form-group">
              <br />
              <input 
              value={password}
              type="password"
               className="input" 
               name="password" 
               placeholder="nueva contraseña" 
               onChange={handleInputChange}         
               
            />
            {
                errorPassWord ? <div className="errorsContainer">
                 <p className="errors"> {errorMsgPassword}  </p>
                 </div>:<></>   
            }
          
              <input 
              type="password" 
              className="input inputRestore" 
              name="password2" 
              placeholder="Repitir nueva contraseña" 
             
              onChange={handleInputChange}
              value={password2} 
              />

              {
                errorPassWord2 ? <div className="errorsContainer">
                 <p className="errors"> {errorMsgPassword2}  </p>
                 </div>:<></>   
              }
            
                <ul name="elementosError" className="ul">
                    La contraseña debe contar con
                    <li className="display-flex">
                       <img  src={Okey} alt="ok"/>  <p id="caracteres" className="restore-p">8 o más caracteres</p>
                    </li>
                    <li className="display-flex">
                         <img  src={Okey} alt="ok"/> <p id="mayusculas" className="restore-p"> Mayúsculas y minúsculas</p>
                    </li>
                    <li className="display-flex">
                        <img   src={Informacion} alt="ok"/> <p id="numeros" className="restore-p"> Números y letras</p>
                    </li>
                </ul>
              
           
                
                    <Button 
                    className="btn btn-outline-primary button_ mt-5 flotar centerMybuttonPass" 
                    type="submit" 
                    name="button" 
                  >Guardar</Button> 
          
            
              
             
            </div>
          </form>
         
          </div>
              
      
          <img className="img-fluid myresolution" src={canguro} alt="PickersFooter"></img>
     
          
         
     
         
  
      </section>
    );
}
