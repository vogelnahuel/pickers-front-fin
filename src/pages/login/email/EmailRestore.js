import React, {useState} from 'react'
import Button from '../../../component/Button/Button'
import canguro from "../../../assets/login/Canguro.svg";
import pickersLogo from "../../../assets/login/PickersLogo.svg";
import './Email.scss'
import api from '../../../middleware/api'
import {Modal} from '@pickit/pickit-components'

export const  EmailRestore = () => {

    const [formValues, setformValues] = useState({
        mail:'',
        errorMail:false,
        errorMsgMail:'',
    })


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
            formValues.errorMail=true;
            formValues.errorMsgMail= 'Este campo es requerido';
            e.target.classList.add('inputError');
            e.target.nextSibling.classList.add('labelError');
        }else if(!expresionEmail.test(e.target.value) && e.target.name==='mail'){
            formValues.errorMail=true;
            formValues.errorMsgMail= 'Debe ingresar un email válido';
            e.target.classList.add('inputError');
            e.target.nextSibling.classList.add('labelError');
        }
        else if(e.target.value!=='' && e.target.name==='mail'){
            formValues.errorMail=false;
            e.target.classList.remove('inputError');
            e.target.nextSibling.classList.remove('labelError');
        }
        setformValues({
            ...formValues,
            [e.target.name]:[e.target.value]

        });
    }


    const [ModalIsOpen, setModalIsOpen] = useState(false)
    const cerrarModal = () => {
        setModalIsOpen(false);
        window.location.href="/";
    }
    const [ModalErrorIsOpen, setModalErrorIsOpen] = useState(false)
    const cerrarModalError = () => {
        setModalErrorIsOpen(false);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(formValues.mail.length<=0){

            setformValues({
                ...formValues,
                errorMail:true,
                errorMsgMail:"Este campo es requerido"
            })

        }
        if(formValues.mail[0] && formValues.errorMail!==true){

            api.post('ms-admin-rest/api/v1.0/admin/request-change-password',{email:formValues.mail[0]})
                .then((res)=>{setModalIsOpen(true)})
                .catch((err)=>{console.log(err); setModalErrorIsOpen(true);})

        }else{
            document.querySelector('#mailRestore').classList.add('labelError');
            document.querySelector('#mail').classList.add('inputError');
            setformValues({
                ...formValues,
                errorMail:true,
                errorMsgMail:formValues.mail !== "" && formValues.mail[0].length>0 ? "Debe ingresar un email válido" : "Este campo es requerido"
            })
        }

    }

    const handleFocusLabel = (e,mail="") => {
        e.target.nextSibling.classList.remove('animationOrigin');
        e.target.nextSibling.classList.add('animationTop');
    }

    const handleInputBlur = (e) => {

        if(e.target.value.length===0 ){
            e.target.nextSibling.classList.remove('animationTop');
            e.target.nextSibling.classList.add('animationOrigin');
        }

    }

    return(
        <div className="white-background">
            <div className="space-responsive-login"></div>
            <div className="logo-restore">
                <img src={pickersLogo} className="pickersLogo_login" alt="PickersLogo"></img>
            </div>


            <div className="centrar-email">
                <form className="form size-restore " onSubmit={handleSubmit}>


                    <div>
                        <input
                            type="mail"
                            className="Admin-Pickers-input"
                            name="mail"
                            id="mail"
                            autoComplete="off"
                            onBlur={handleInputBlur}
                            onChange={handleInputChange}
                            value={formValues.mail}
                            onFocus={(e) => handleFocusLabel(e,formValues.mail)}
                        />
                        <label id="mailRestore" htmlFor="mail" className="label login-label">Email</label>
                        <div className="password-login">
                            {
                                formValues.errorMail===true ? <div className="input-errors-container">
                                    <p id="Test" className="errors"> {formValues.errorMsgMail}  </p>
                                </div>:<></>
                            }
                        </div>
                    </div>

                    <Button
                        className="button_ "
                        type="submit"
                        name="button"
                        id="email-send"
                    >Enviar correo
                    </Button>




                </form>
                {
                    ModalIsOpen === true ?
                        <div className="contendor-modal-login">
                            <Modal
                                width="750px"
                                height="351px"
                                isOpen={ModalIsOpen}
                            >
                                <div className="container-modal">
                                    <div className="modal-info-title">
                                        <p className="p-modal-error-title">Enviamos un correo a tu email</p>
                                    </div>
                                    <div className="modal-error-subtitle">
                                        <p className="p-modal-error-subtitle">Ingresá al mismo para restaurar tu contraseña</p>
                                        <button
                                            onClick={cerrarModal}
                                            className="button-modal-info2">
                                            <p>Entendido</p>
                                        </button>
                                    </div>
                                </div>
                            </Modal>
                        </div>

                        : null
                }


                {
                    ModalErrorIsOpen ===true ?
                        <div className="contendor-modal-login">
                            <Modal
                                width="750px"
                                height="351px"
                                isOpen={ModalErrorIsOpen}
                            >
                                <div className="container-modal">
                                    <div className="modal-error-title">
                                        <p className="p-modal-error-title">Email incorrecto</p>
                                    </div>
                                    <div className="modal-error-subtitle">
                                        <p className="p-modal-error-subtitle">El email ingresado no corresponde con una cuenta ya creada en pickers. Por favor, ingresá otro.</p>
                                        <button
                                            onClick={cerrarModalError}
                                            className="button-modal-error mail-incorrecto">
                                            <p>Entendido</p>
                                        </button>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                        : null
                }
            </div>

            <div>
                <img className="myresolution-email" src={canguro} alt="pickersFooter"></img>
            </div>



        </div>

    )
}

export default EmailRestore;