import React from 'react'
import Button from '../../../component/Button/Button'
import canguro from "../../../assets/login/Canguro.svg";
import pickersLogo from "../../../assets/login/PickersLogo.svg";
import {useForm} from '../../../hooks/useForm.js'
import Swal  from 'sweetalert2'

export const  DashBoard = () => {
    //let token =localStorage.getItem("token")
   // console.log(token)

    const [formValues,handleInputBlur,handleInputChange] = useForm({
      mail:'',
      errorMail:true,
      errorMsg:'',
    });
  

    const {mail,errorMail,errorMsg} = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    if(mail!=='' && errorMail!==true){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Revise las intrucciones de su mail',
        showConfirmButton: false,
        timer: 3000
      })
    }
  }

    return(
      <>
      <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="arriba2">
          <div className="logo">
            <img src={pickersLogo} alt="PickersLogo"></img>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <br />
              
              <input 
               type="mail" 
               className="input" 
               name="mail" 
               placeholder="Email"
               
               onBlur={handleInputBlur}
               onChange={handleInputChange}
               value={mail}
               />
                {
                errorMail ? <div className="errorsContainer">
                 <p className="errors"> {errorMsg}  </p>
                 </div>:<></>
               }
              <br />
              <div className="buttonContainer">
              
              <Button 
              className="btn btn-outline-primary button_ mt-5" 
              type="submit" 
              name="button" 
               >Enviar correo
               </Button>
              </div>
             
            
            </div>
          </form>
          </div>
         
           <img className="img-fluid correcion" src={canguro} alt="pickersFooter"></img>
          
         
        </div>
          
         
      </div>
         
  
      </>
  
    )
}

export default DashBoard;