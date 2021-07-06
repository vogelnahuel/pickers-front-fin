import React, { useState } from 'react'
import volver from '../../../assets/admin/PendingUser/volver.svg'
import relojOscuro from '../../../assets/admin/PendingUser/relojOscuro.svg'
import trabajadorAzul from '../../../assets/admin/PendingUser/trabajadorAzul.svg'
import './pending.css'
import {Redirect, useHistory, useParams } from 'react-router-dom'

export const PendingBlack = (props) => {
    const Historial = useHistory();

    const setmodalGuardarCambios=props.setmodalGuardarCambios;
    const setRedirect = props.setRedirect;

    const {id} = useParams();
    

    const [activedmin, setActive] = useState("/activeUserAdmin");
    //const [activeAdminPicker, setActivePicker] = useState(`/activeUserAdminpicker/${id}`);

const  handleOnClickredirect =(e) => {
  
        if(window.location.pathname==="/activeUserAdmin"){         
            
            Historial.push('pendingUserAdmin');
            setActive("/pendingUserAdmin")
           // window.location.href="/pendingUserAdmin"
        }
        if(window.location.pathname===`/activeUserAdminpicker/${id}`){         
            //setActivePicker(`/pendingUserAdmin`);
            e.preventDefault();
            setmodalGuardarCambios(true);
            setRedirect("/pendingUserAdmin")
        }    
    }

const handleHistory = (e) => {
    e.preventDefault();   
  
    if(window.location.pathname===`/activeUserAdminpicker/${id}`){  
         
        setmodalGuardarCambios(true);
        setRedirect('/activeUserAdmin');
    } else{
        Historial.goBack();
    }
    
}

    return (
        <div>
            <div className="FlexPending">
                    <div className="FlexPending backGround-pending">

                        <div 
                            onClick={handleOnClickredirect}
                            className="container-pending pending-blue-border-izq">
                            <p className="Pending-paragraph  pending-black ">Solicitudes pendientes</p>
                            <img className="img" src={relojOscuro} alt="reloj" />
                        </div>
                        <div className="container-pending border-pending pending-blue-border-der">
                            <p className="Pending-paragraph2 pending-blue">Pickers</p>
                            <img className="img2" src={trabajadorAzul} alt="trabajador" />
                        </div>
                    </div>

                    {
                        window.location.pathname==="/activeUserAdmin" ?
                        <Redirect to={activedmin}></Redirect>:<></>
                    }
                    

                    <div>
                        <button  className="buttonVolver" onClick={handleHistory}  >
                            <img className="img3" src={volver} alt="volver"/>
                            <p className="Pending-paragraph3">Volver</p>

                        </button>
                        
                    </div>
                 
            </div>

         </div>
    )
}
