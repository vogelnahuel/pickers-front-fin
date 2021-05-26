import { useState } from 'react';
import Swal  from 'sweetalert2'
import loginService from '../services/login/loginService'

export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

   

    const handleInputChange = (e) => {
       
        setValues({
            ...values,
            [e.target.name]:[e.target.value]

        });
    }


    const handleInputBlur = (e) => {

        var expresionEmail = /\w+@\w+\.+[a-z]/;
  
        
        if(e.target.value==='' && e.target.name==='mail'){
            values.errorMail=true;
            values.errorMsgMail='Este campo es requerido';
        }else if(!expresionEmail.test(e.target.value) && e.target.name==='mail'){
            values.errorMail=true;
            values.errorMsgMail='Debe ingresar un email válido';
        }
        else if(e.target.value!=='' && e.target.name==='mail'){
            values.errorMail=false;
        }
        /*
        if(e.target.value==='' && e.target.name==='password'){
            values.errorPassWord=true;
            values.errorMsgPassword='Este campo es requerido';
        }
        else if(e.target.value.length<7 && e.target.name==='password'){
            values.errorMsgPassword='la contraseña debe tener mas de 7 caracteres';
            values.errorPassWord=true;
        }
        else if(e.target.value!=='' && e.target.name==='password'){
            values.errorPassWord=false;           
        }*/
      

        setValues({
            ...values,
        });
       

    }

    const handleSubmit = (e) => {

        e.preventDefault();
        
    
        if(values.mail==='' || values.errorMail===true || values.password==='' || values.errorPassWord===true){
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Hay errores en los campos',
              showConfirmButton: false,
              timer: 3000
            })
          }
          else{
            if( window.location.pathname==="/")
            {
              e.target.button.parentNode.classList.add('shineBorder') ; 
            }
          const response = loginService.login(values.mail,values.password);
          window.localStorage.setItem("token",response.access_token);
          if (JSON.stringify(response)!=='{}' && window.location.pathname==="/") {
            window.location.href= "./dashboard"
            }
        
        
          } 
    
      }

    return [ values, handleInputBlur,handleInputChange,handleSubmit];

}