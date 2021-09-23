/*import React, {  useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.scss";
import pickersLogo from "./../../assets/login/PickersLogo.svg";
import canguro from "./../../assets/login/Canguro.svg";
import {Link} from 'react-router-dom'
import {Modal} from '@pickit/pickit-components'
//import api from '../../config/api'
import LoginInterface from './types'



export const Login = ({postLogin,modalOpen,isFetching, setModalOpen,modalOpenServerError,setmodalOpenServerError}:LoginInterface) :JSX.Element => {




    const [mail, setmail] = useState("")
    const [password, setpassword] = useState("");
    const [errorMail, seterrorMail] = useState(false)
    const [errorMsgMail, seterrorMsgMail] = useState("")
    const [errorPassWord, seterrorPassWord] = useState(false)
    const [errorMsgPassword, seterrorMsgPassword] = useState("")
    const handleFocusLabel = (e,mail="") => {
        e.target.nextSibling.classList.remove('animationOrigin');
        e.target.nextSibling.classList.add('animationTop');
    }


    // const cerrarModalError = (e) => {
    //     e.preventDefault();
    //     setModalOpen(false)
    // }
    // const cerrarModalServerError = (e) => {
    //     e.preventDefault();
        
    // }


    const handleInputChange = (e) => {
        if(e.target.name==="password" && e.target.value.length>0){
            seterrorPassWord(false);
            seterrorMsgPassword('');
            document.querySelector('#labelpassword').classList.remove('labelError');
            document.querySelector('#password-login').classList.remove('inputError');
        }else if (e.target.name==="password" ){
            seterrorPassWord(true);
            seterrorMsgPassword('Este campo es requerido');
            document.querySelector('#labelpassword').classList.add('labelError');
            document.querySelector('#password-login').classList.add('inputError');
        }


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
            seterrorMail(true);
            seterrorMsgMail('Este campo es requerido');
            e.target.classList.add('inputError');
            e.target.nextSibling.classList.add('labelError');
        }else if(!expresionEmail.test(e.target.value) && e.target.name==='mail'){
            seterrorMail(true);
            seterrorMsgMail('Debe ingresar un email válido');
            e.target.classList.add('inputError');
            e.target.nextSibling.classList.add('labelError');
        }
        else if(e.target.value!=='' && e.target.name==='mail'){
            seterrorMail(false);
            e.target.classList.remove('inputError');
            e.target.nextSibling.classList.remove('labelError');
        }
        if(e.target.name==="mail"){
            setmail(

                e.target.value
            )
        }
        if(e.target.name==="password"){
            setpassword(
                e.target.value
            )
        }
    }


    const handleInputBlur = (e) => {
        if(e.target.value.length===0 ){
            e.target.nextSibling.classList.remove('animationTop');
            e.target.nextSibling.classList.add('animationOrigin');
        }
        if(e.target.value.length===0 && e.target.name==='mail'){
            seterrorMail(true);
            seterrorMsgMail('Este campo es requerido');
            e.target.nextSibling.classList.add('labelError');
            e.target.classList.add('inputError');
        }else if (e.target.value.length!==0 && e.target.name==='mail'){
            seterrorMsgPassword('');
        }
        if(e.target.name==='mail' && errorMail===true){
            e.target.classList.add('inputReboteAnimation');
        }

        if(e.target.value==='' && e.target.name==='password'){
            seterrorPassWord(true);
            seterrorMsgPassword('Este campo es requerido');
            e.target.classList.add('inputError');
            e.target.nextSibling.classList.add('labelError');
        }

        else if(e.target.value!=='' && e.target.name==='password'){
            seterrorPassWord(false);
            e.target.classList.remove('inputError');
            e.target.nextSibling.classList.remove('labelError');
        }

    }



    const handleSubmit = (e) => {

        e.preventDefault();
        if(mail==='' || errorMail===true || password==='' || errorPassWord===true){
            if(mail===''){
                seterrorMail(true);
                seterrorMsgMail('Este campo es requerido');
                document.querySelector('#labelmail').classList.add('labelError');
                document.querySelector('#mail').classList.add('inputError');
            }
            if(password===''){
                seterrorPassWord(true);
                seterrorMsgPassword('Este campo es requerido');
                document.querySelector('#labelpassword').classList.add('labelError');
                document.querySelector('#password-login').classList.add('inputError');
            }


        }
        else{
            
            postLogin({email:mail?mail:'',password:password?password:''})
        }
        //const isValid= validationSchema.isValid({mail,password})
        

        
          else{

            if( window.location.pathname==="/")
            {
               e.target.button.parentNode.classList.add('shineBorder') ;
             }

          await api.post('/ms-admin-rest/api/v1.0/login',{email:mail?mail:'',password:password?password:''})
                 .then((response)=>{

                    window.localStorage.setItem("token",response.data.result.accessToken)

                   window.location.href= "./dashboard"
                  return response;
            })
            .catch((err)=>{

                 e.target.button.parentNode.classList.remove('shineBorder')
                //values.tipoError="credenciales"

                if(err.response) {

                  if(err.response.status===400){
                    setmodalOpen(true);
                  }
                 else  if(err.response.status===403){
                    setmodalOpen(true);
                  }
                  else  {
                    setmodalOpen2(true)
                  }
                  return err;
                }

              })

            if( window.location.pathname==="/")
            {
                setTimeout(() => {
                    e.target.button.parentNode.classList.remove('shineBorder') ;
                }, 16000);

            }

        }

    }



    return (
        <div className="white-background">
            <div className="space-responsive-login"></div>
            <div className="logo">
                <img src={pickersLogo} className="pickersLogo_login" alt=""/>
                
            </div>
            <div className="centrar">
                <form className="form size" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="mail"
                            className="Admin-Pickers-input"
                            name="mail"
                            id="mail"
                            onBlur={handleInputBlur}
                            onChange={(e)=>{handleInputChange(e)}}
                            value={mail}
                            onFocus={(e) => handleFocusLabel(e,mail)}
                        />
                        <label id="labelmail" htmlFor="mail" className="login-label label">Usuario</label>
                    </div>
                    <div className="password-login">
                    {
                        errorMail ? <div className="input-errors-container">
                            <p className="errors"> {errorMsgMail}  </p>
                        </div>:null
                    }
                    </div>

                    <div >
                        <input
                            type="password"
                            className="Admin-Pickers-input"
                            name="password"
                            id="password-login"
                            onBlur={handleInputBlur}
                            onChange={(e)=>{handleInputChange(e)}}
                            value={password}
                            onFocus={(e) => handleFocusLabel(e,password)}


                        />
                        <label id="labelpassword" htmlFor="password-login" className="login-label label">Contraseña</label>
                    
                            <div className="password-login">
                                {errorPassWord ? <div className="input-errors-container">
                                    <p className="errors"> {errorMsgPassword}  </p>
                                </div>:<></>
                                }
                            </div>
                       
                    </div>


                    <div className="contenedor">
                        {
                            isFetching ?
                                <div className="shineBorder contenedor animation">
                                    <button

                                        className="button_"
                                        type="submit"
                                        name="button" ><p className="login-init "> Iniciar sesión </p>
                                    </button>
                                </div>
                                :
                                <div className="contenedor animation">
                                    <button

                                        className="button_"
                                        type="submit"
                                        name="button" ><p className="login-init "> Iniciar sesión </p>
                                    </button>
                                </div>
                        }
                    </div>

                </form>

                {   (modalOpen || modalOpenServerError )&&
                <div className="contendor-modal-login">
                    <Modal

                        width="750px"
                        height="351px"
                        isOpen={modalOpen||modalOpenServerError}
                        onClose={()=>{modalOpen?setModalOpen(false):setmodalOpenServerError(false)}}
                    >
                        <div className="container-modal">
                            <div className="modal-error-title">
                                <p className="p-modal-error-title">{modalOpen?"Usuario y/o contraseña inválidos":"Error en nuestro servidor"}</p>
                            </div>
                            <div className="modal-error-subtitle">
                                <p className="p-modal-error-subtitle">{modalOpen?
                                "Tu usuario y/o contraseña ingresados son incorrectos. Por favor, ingresalos nuevamente.":
                                "Por favor, reintentalo nuevamente."
                            }</p>
                                <button
                                    onClick={()=>{modalOpen?setModalOpen(false):setmodalOpenServerError(false)}}
                                    className="button-modal-error">
                                    Entendido
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
                }
        
                { {
                   modalOpenServerError===true ?
                       <div className="contendor-modal-login">
                           <Modal
                               width="750px"
                               height="351px"
                               isOpen={modalOpenServerError}
                               onClose={cerrarModalServerError}
                           >
                               <div className="container-modal">
                                   <div className="modal-error-title">
                                       <p className="p-modal-error-title">Error en nuestro servidor</p>
                                   </div>
                                   <div className="modal-error-subtitle">
                                       <p className="p-modal-error-subtitle">Por favor, reintentalo nuevamente.</p>
                                       <button
                                           onClick={cerrarModalServerError}
                                           className="button-modal-error2">
                                           Entendido
                                       </button>
                                   </div>
                               </div>
                           </Modal>
                       </div>
                       :null
                } }
            </div>
            <div className="login-image" >


                <div className="login-pass">
                    <Link className="forgotPass" to={"./restore"}>¿Olvidaste tu contraseña?</Link>
                </div>
                <img className="myresolution" src={canguro} alt=""></img>
            </div>




        </div>
    );
}

export default Login;*/