import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import pickersLogo from "./../../assets/login/PickersLogo.svg";
import canguro from "./../../assets/login/Canguro.svg";
import {Link} from 'react-router-dom'
import Button from '../../component/Button/Button'

//import api from '../../config/api'

function Login() {
  const [form, setForm] = useState({ mail: "", password: "" });
  const [errors, setErrors] = useState({ errors: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({ mail: e.target.mail.value, password: e.target.password.value });
    localStorage.setItem("token", 123123123);
    if(errors.errors==="")
      console.log(".")
     // window.location.href = "./dashboard";
  };

  const handleClick= (e) => {

   // e.target.classList.add('blue','shine');

  }
  const handleChage= (e) => {
    switch (e.target.name) {
        case "mail":
          setErrors({errors:""})
          e.target.classList.remove('inputError')
          console.log(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.target.value))
          if(!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.target.value)))
          {
            setErrors({errors:"mail invalido"})
            e.target.classList.add('inputError')
          }
          if(e.target.value=="")
          {
            setErrors({errors:"campo requerido"})
            e.target.classList.add('inputError')
          }
          break;
          case "password":
            console.log(e.target.value)
            break;
         default:
            console.log("pepe")
            break;
    }
  }

  return (
      <>
    <div className="containerPrincipal">
      <div className="containerSecundario">
        <div className="logo">
          <img src={pickersLogo}></img>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <br />
            <input type="mail" className="input" name="Email" placeholder="Usuario" onChange={handleChage} />
            {errors!=""?<div className="errorsContainer">
                <text className="errors">{errors.errors}</text>
            </div>:<div></div>}
            <br />
            <br />
            <input type="password" className="input" name="password" placeholder="Contraseña" onChage={handleChage}/>
            <br />
            <div className="buttonContainer">
            <Button className="btn btn-outline-primary button_ mt-5" type="submit" name="button" onClick={handleClick} >Iniciar</Button>
            </div>
            <br/>
            <br/>
            <Link className="forgotPass" to={"./dashboard"}>¿Olvidó su contraseña?</Link>
          </div>
        </form>
      </div>
    </div>
          <div className="canguro"> 
              <img src={canguro}></img>
          </div>

    </>
  );
}

export default Login;