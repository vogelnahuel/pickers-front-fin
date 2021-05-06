import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import pickersLogo from "./../../assets/login/PickersLogo.svg";
import canguro from "./../../assets/login/Canguro.svg";
import {Link} from 'react-router-dom'

//import api from '../../config/api'

function Login() {
  const [form, setForm] = useState({ mail: "", password: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({ mail: e.target.mail.value, password: e.target.password.value });
    localStorage.setItem("token", 123123123);
   // window.location.href = "./dashboard";
  };

  const handleClick= (e) => {
    e.target.classList.add('blue','shine');
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
            <input type="text" className="input" name="mail" placeholder="Usuario" />
            <br />
            <br />
            <input type="password" className="input" name="password" placeholder="Contraseña"/>
            <br />
            <button className="btn btn-outline-primary button_ mt-5" onClick={handleClick}>Iniciar Sesión</button>
            {/* <Button name="Login" text="Iniciar Sesion"/> */}
            <br/>
            <br/>
            <Link className="forgotPass" to={"./pepe"}>¿Olvidó su contraseña?</Link>
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
