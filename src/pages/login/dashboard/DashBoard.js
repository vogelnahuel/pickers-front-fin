import React from 'react'
import Button from '../../../component/Button/Button'
import canguro from "../../../assets/login/Canguro.svg";
import pickersLogo from "../../../assets/login/PickersLogo.svg";

function DashBoard() {
    let token =localStorage.getItem("token")
    console.log(token)
    return(
        <>
        <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="logo">
            <img src={pickersLogo}></img>
          </div>
          <form className="form" onSubmit={""}>
            <div className="form-group">
              
              <input type="password" className="input" name="password" placeholder="Email" onChage={""}/>
              
              <div className="buttonContainer">
              <Button className="btn btn-outline-primary button_ mt-5" type="submit" name="button" onClick={""} >Iniciar</Button>
              </div>
              
            </div>
          </form>
        </div>
      </div>
            <div className="canguro"> 
                <img src={canguro}></img>
            </div>

        </>
  
    )
}

export default DashBoard;