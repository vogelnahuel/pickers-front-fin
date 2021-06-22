import { useState } from 'react';
import api from '../config/api'




export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

   

const handleInputChange = (e) => {      
        var expresionEmail = /\w+@\w+\.+[a-z]/;
       
        if(e.target.name==="mail"){
            e.target.classList.remove('inputReboteAnimation')
        }
        if(e.target.value.length>0){
           e.target.nextSibling.classList.remove('animationOrigin');
           e.target.nextSibling.classList.add('animationTop');          
        }else{          
            e.target.nextSibling.classList.remove('animationTop');
            e.target.nextSibling.classList.add('animationOrigin');
        }    
        if(e.target.value.length===0 && e.target.name==="mail")    {
            e.target.nextSibling.classList.add('labelError');
        }      
        if(e.target.value==='' && e.target.name==='mail'){
            values.errorMail=true;
            values.errorMsgMail='Este campo es requerido';
            e.target.classList.add('inputError');
            e.target.nextSibling.classList.add('labelError');
        }else if(!expresionEmail.test(e.target.value) && e.target.name==='mail'){
            values.errorMail=true;
            values.errorMsgMail='Debe ingresar un email válido';
            e.target.classList.add('inputError');   
            e.target.nextSibling.classList.add('labelError');        
        }
        else if(e.target.value!=='' && e.target.name==='mail'){
            values.errorMail=false;
            e.target.classList.remove('inputError');
            e.target.nextSibling.classList.remove('labelError');
        }
        setValues({
            ...values,
            [e.target.name]:[e.target.value]

        });
    }

const handleInputBlur = (e) => {
       if(e.target.value.length===0 ){
            e.target.nextSibling.classList.remove('animationTop');
            e.target.nextSibling.classList.add('animationOrigin');
        }
      if(e.target.value.length===0 && e.target.name==='mail'){
            values.errorMail=true;
            values.errorMsgMail='Este campo es requerido';
            e.target.nextSibling.classList.add('labelError');
            e.target.classList.add('inputError');
        }else if (e.target.value.length!==0 && e.target.name==='mail'){
            values.errorMsgPassword='';        
        }
        if(e.target.name==='mail' && values.errorMail===true){
            e.target.classList.add('inputReboteAnimation');
        }
        
        if(e.target.value==='' && e.target.name==='password'){
            values.errorPassWord=true;
            values.errorMsgPassword='Este campo es requerido';
            e.target.classList.add('inputError');
            e.target.nextSibling.classList.add('labelError');
        }

        else if(e.target.value!=='' && e.target.name==='password'){
            values.errorPassWord=false;   
            e.target.classList.remove('inputError');
            e.target.nextSibling.classList.remove('labelError');        
        }
        setValues({
            ...values,
        });           
    }
    
const handleSubmit = async (e) => {
        e.preventDefault();

       if(values.mail==='' || values.errorMail===true || values.password==='' || values.errorPassWord===true){
         
          }
          else{
            if( window.location.pathname==="/")
            {
               e.target.button.parentNode.classList.add('shineBorder') ;            
             }     
             api.post('/ms-admin-rest/api/v1.0/login',{email:values.mail?values.mail[0]:'',password:values.password?values.password[0]:''})
                 .then((response)=>{
                    window.localStorage.setItem("token",response.data.result.accessToken)
                   window.location.href= "./dashboard"
            })
            .catch((err)=>{
                e.target.button.parentNode.classList.remove('shineBorder') 
                values.tipoError="credenciales"
                err.response.status===400?setValues({modalOpen:true}):setValues({modalOpen2:true})              
                })
          
            if( window.location.pathname==="/")
            {
                setTimeout(() => {
                    e.target.button.parentNode.classList.remove('shineBorder') ; 
                }, 16000);
           
            } 
        }
    
      }

    return [ values, handleInputBlur,handleInputChange,handleSubmit];

}