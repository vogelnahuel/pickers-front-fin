import React from 'react'
import  Button  from '../../../component/Button/Button'
import  {useForm} from '../../../hooks/useForm'

import "../Login.css";
import "./restorePassword.css";
import "bootstrap/dist/css/bootstrap.min.css";

import pickersLogo from "../../../assets/login/PickersLogo.svg";
import canguro from "../../../assets/login/Canguro.svg";
import Okey from "../../../assets/login/Okey.svg";
import Informacion from "../../../assets/login/Informacion.svg";

export const RestorePassword = () => {

    const [formValues,handleInputBlur,handleInputChange,handleSubmit] = useForm({
        password:'',
        password2:'',
        errorPassWord:false,
        errorMsgPassword:'',
        errorPassWord2:false,
        errorMsgPassword2:'',
      });
  
    const {password,password2,errorPassWord,errorMsgPassword,errorPassWord2,errorMsgPassword2} = formValues;

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
              type="password"
               className="input" 
               name="password" 
               placeholder="Nueva contraseña" 
               onBlur={handleInputBlur} 
               onChange={handleInputChange}         
               value={password}
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
              onBlur={handleInputBlur}
              onChange={handleInputChange}
              value={password2} 
              />

              {
                errorPassWord2 ? <div className="errorsContainer">
                 <p className="errors"> {errorMsgPassword2}  </p>
                 </div>:<></>   
                }
            
                <ul className="ul">
                    La contraseña debe contar con
                    <li>
                       <img  src={Okey} alt="ok"/>  8 o más caracteres
                    </li>
                    <li>
                         <img  src={Okey} alt="ok"/>  Mayúsculas y minúsculas
                    </li>
                    <li>
                        <img   src={Informacion} alt="ok"/>  Números y letras
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
