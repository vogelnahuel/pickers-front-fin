import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import pickersLogo from "./../../assets/login/PickersLogo.svg";
import canguro from "./../../assets/login/Canguro.svg";
import {Link} from 'react-router-dom'
import Button from '../../component/Button/Button'
import {useForm} from '../../hooks/useForm.js'
import loginService from '../../services/login/loginService'

export const Login = () => {

  const [formValues,handleInputBlur,handleInputChange,handleSubmit] = useForm({
      mail:'',
      password:'',
      errorMail:false,
      errorMsgMail:'',
      errorPassWord:false,
      errorMsgPassword:'',
    });

  const {mail,password,errorMail,errorMsgMail,errorPassWord,errorMsgPassword} = formValues;
/*
const onSubmit = () =>{
  const response = loginService.login(mail,password)
  window.localStorage.setItem("token",response.access_token)
  //window.location.href= "./dashboard"

}*/

  

  return (
      <>
    <div className="containerPrincipal">
      <div className="containerSecundario">
        

        <div className="logo">
          <img src={pickersLogo} alt="PickersLogo"></img>
        </div>

        <form className="form" onSubmit={handleSubmit} >
          <div className="form-group">
            <br />
            <input 
            type="mail"
             className="input" 
             name="mail" 
             placeholder="Usuario" 
             onBlur={handleInputBlur} 
             onChange={handleInputChange}         
             value={mail}
             
            
            />
            {
            errorMail ? <div className="errorsContainer">
                <p className="errors"> {errorMsgMail}  </p>
            </div>:<></>
            }
            <br />
            <br />
            <input 
            type="password" 
            className="input" 
            name="password" 
            placeholder="Contraseña" 
            onBlur={handleInputBlur}
            onChange={handleInputChange}
            value={password}
            
            />
            {
            errorPassWord ? <div className="errorsContainer">
                <p className="errors"> {errorMsgPassword}  </p>
            </div>:<></>
            }
            <br />
            <div className="buttonContainer">
            <div className="buttonContainer">
              <Button 
              className="btn btn-outline-primary button_ mt-5" 
             type="submit" 
              name="button" 
            
            
              >Iniciar sesión</Button>
             </div>
            </div>
            
            <Link className="forgotPass" to={"./restore"}>¿Olvidó su contraseña?</Link>
          </div>
        </form>
       
        
                <img className="img-fluid  miResolucion" src={canguro} alt="PickersFooter"></img>
    
       
      </div>
        
       
    </div>
       

    </>
  );
}

export default Login;