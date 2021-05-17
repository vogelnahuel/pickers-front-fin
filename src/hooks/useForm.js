import { useState } from 'react';



export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

   

    const handleInputChange = (e) => {
       console.log(e.target)
        setValues({
            ...values,
            [e.target.name]:[e.target.value]

        });
    }


    const handleInputBlur = (e) => {

        var expresionEmail = /\w+@\w+\.+[a-z]/;
           
        
        if(e.target.value==='' && e.target.name==='mail'){
            values.errorMail=true;
            values.errorMsg='Este campo es requerido';
        }else if(!expresionEmail.test(e.target.value)){
            values.errorMail=true;
            values.errorMsg='Debe ingresar un email válido';
        }
        else if(e.target.value!=='' && e.target.name==='mail'){
            values.errorMail=false;
        }

        if(e.target.value==='' && e.target.name==='password'){
            values.errorPassWord=true;
            values.errorMsg='Este campo es requerido';
        }
        else if(e.target.value.length<7 && e.target.name==='password'){
            values.errorMsg='la contraseña debe tener mas de 7 caracteres';
            values.errorPassWord=true;
        }
        else if(e.target.value!=='' && e.target.name==='password'){
            values.errorPassWord=false;           
        }
      

        setValues({
            ...values,
        });
       

    }

    const handleSubmit = (e) => {

        e.preventDefault();
       
        

       

    }

    return [ values, handleInputBlur,handleInputChange,handleSubmit];

}