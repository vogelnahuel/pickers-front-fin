import React from 'react'
import pickersLogo from "../../../assets/login/PickersLogo.svg";
import canguro from "../../../assets/login/Canguro.svg";
import "../Login.css";
import "./restorePassword.css";
import "bootstrap/dist/css/bootstrap.min.css";
import  Button  from '../../../component/Button/Button'
import  {useForm} from '../../../hooks/useForm'


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
          <form className="form " onSubmit={handleSubmit} >
            <div className="form-group">
              <br />
              <input 
              type="password"
               className="input inputRestore" 
               name="password" 
               placeholder="Nueva contraseña" 
               onBlur={handleInputBlur} 
               onChange={handleInputChange}         
               value={password}
            />
          
              <input 
              type="password" 
              className="input inputRestore" 
              name="password2" 
              placeholder="Repitir nueva contraseña" 
              onBlur={handleInputBlur}
              onChange={handleInputChange}
              value={password2}
              
              />
              <div>
                <ul>
                    <p>La contraseña debe contar con:</p>
                    <li>
                        8 o más caracteres
                    </li>
                    <li>
                        Mayúsculas y minúsculas
                    </li>
                    <li>
                        Números y letras
                    </li>
                </ul>
              </div>
            
              <div className="buttonContainer flotar">
              <div className="buttonContainer">
                <Button 
                className="btn btn-outline-primary button_ mt-5 " 
                type="submit" 
                name="button" 
               >Guardar</Button>
               </div>
              </div>
              
             
            </div>
          </form>
         
          </div>
              
      
          <img className="img-fluid  miResolucion" src={canguro} alt="PickersFooter"></img>
     
          
         
     
         
  
      </section>
    );
}
