import React from 'react'
import Button from '../../../component/Button/Button'
import canguro from "../../../assets/login/Canguro.svg";
import pickersLogo from "../../../assets/login/PickersLogo.svg";
import {useForm} from '../../../hooks/useForm.js'
import './Email.css'
import Swal  from 'sweetalert2'
// import loginService from '../../../services/login/loginService'
import api from '../../../config/api'


export const  EmailRestore = () => {
    //let token =localStorage.getItem("token")
   // console.log(token)

    const [formValues,handleInputBlur,handleInputChange] = useForm({
      mail:'',
      errorMail:true,
      errorMsgMail:'',
    });
  

    const {mail,errorMail,errorMsgMail} = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(mail!=='' && errorMail!==true){
      api.post('ms-admin-rest/api/v1.0/admin/request-change-password',{email:mail[0]})
      .then((res)=>{console.log(res.data)})
      .catch((err)=>{console.log(err)})
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
          <form className="form size" onSubmit={handleSubmit}>
            <div className="form-group">
            
           
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
              className="btn btn-outline-primary button_ " 
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

export default EmailRestore;