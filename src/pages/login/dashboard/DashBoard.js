import React from 'react'
import Button from '../../../component/Button/Button'
import canguro from "../../../assets/login/Canguro.svg";
import pickersLogo from "../../../assets/login/PickersLogo.svg";
import {useForm} from '../../../hooks/useForm.js'
import './Dashboard.css'
import Swal  from 'sweetalert2'

export const  DashBoard = () => {
    //let token =localStorage.getItem("token")
   // console.log(token)

    const [formValues,handleInputBlur,handleInputChange] = useForm({
      mail:'',
      errorMail:true,
      errorMsgMail:'',
    });
  

    const {mail,errorMail,errorMsgMail} = formValues;

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
     
          <div className="logo">
            <img src={pickersLogo} alt="PickersLogo"></img>
          </div>


          <div className="container centrar">
          <form className="form tamanio" onSubmit={handleSubmit}>
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
                 <p className="errors"> {errorMsgMail}  </p>
                 </div>:<></>
               }
              
            
              <Button 
              className="btn btn-outline-primary button_ mt-5" 
              type="submit" 
              name="button" 
               >Enviar correo
               </Button>
              
             
            
            </div>
          </form>
        </div>
      
         
           <img className="img-fluid myresolution" src={canguro} alt="pickersFooter"></img>
          
    
         
  
      </>
  
    )
}

export default DashBoard;