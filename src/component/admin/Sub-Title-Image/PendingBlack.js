import React, { useState } from 'react'
import volver from '../../../assets/admin/PendingUser/volver.svg'
import relojOscuro from '../../../assets/admin/PendingUser/relojOscuro.svg'
import trabajadorAzul from '../../../assets/admin/PendingUser/trabajadorAzul.svg'
import './pending.css'
import { Link, Redirect, useParams } from 'react-router-dom'

export const PendingBlack = () => {

    const {mail} = useParams();
    

    const [activedmin, setActive] = useState("/activeUserAdmin");
    const [activeAdminPicker, setActivePicker] = useState(`/activeUserAdminpicker/${mail}`);

    const  handleOnClickredirect =(e) => {

        
        if(window.location.pathname==="/activeUserAdmin"){         
            
            setActive("/pendingUserAdmin")
        }
        if(window.location.pathname===`/activeUserAdminpicker/${mail}`){         
            setActivePicker(`/pendingUserAdmin`);
        }    
    }

    return (
        <div>
            <div className="FlexPending">
                    <div className="FlexPending backGround-pending">

                        <div 
                            onClick={handleOnClickredirect}
                            className="container-pending">
                            <p className="Pending-paragraph  pending-black">Solicitudes pendientes</p>
                            <img className="img" src={relojOscuro} alt="reloj" />
                        </div>
                        <div className="container-pending border-pending">
                            <p className="Pending-paragraph2 pending-blue">Pickers</p>
                            <img className="img2" src={trabajadorAzul} alt="trabajador" />
                        </div>
                    </div>

                    {
                        window.location.pathname==="/activeUserAdmin" ?
                        <Redirect to={activedmin}></Redirect>:<></>
                    }
                    {
                        window.location.pathname===`/activeUserAdminpicker/${mail}` ?
                        <Redirect to={activeAdminPicker}></Redirect>:<></>
                    }

                    <div>
                        <Link to="./dashboard" >
                            <img className="img3" src={volver} alt="volver"/>
                            <p className="Pending-paragraph3">Volver</p>
                        </Link>
                        
                    </div>
            </div>

         </div>
    )
}
