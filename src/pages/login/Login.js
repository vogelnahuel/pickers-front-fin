import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import pickersLogo from "./../../assets/login/PickersLogo.svg";
import canguro from "./../../assets/login/Canguro.svg";
import {Link} from 'react-router-dom'
import Button from '../../component/Button/Button'
import {useForm} from '../../hooks/useForm.js'


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

  useEffect(()=>{
    window.localStorage.setItem('token','')
  },[])

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
             placeholder="Usuario" 
             onBlur={handleInputBlur} 
             onChange={handleInputChange}         
             value={mail}
             
            
            />
           
              {
              errorMail ? <div className="errorsContainer">
                  <p className="errors"> {errorMsgMail}  </p>
              </div>:null
              }
           
         
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
            <Link className="forgotPass" to={"./restore"}>¿Olvidó su contraseña?</Link>
          </div>
        </form>
       
      
        </div> 
        <div className="login-image" >
          <img className="img-fluid  myresolution" src={canguro} alt="PickersFooter"></img>
        </div>
       
         

          
    </>
  );
}

export default Login;