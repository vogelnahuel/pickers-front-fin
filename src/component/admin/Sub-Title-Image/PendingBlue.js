import React, { useState } from 'react'
import volver from '../../../assets/admin/PendingUser/volver.svg'
import relojAzul from '../../../assets/admin/PendingUser/relojAzul.svg'
import trabajadorOscuro from '../../../assets/admin/PendingUser/trabajadorOscuro.svg'
import './pending.css'
import { Link, Redirect, useParams } from 'react-router-dom'

export const PendingBlue = () => {

    const {id} = useParams();
    

    const [pendingAdmin, setPending] = useState("/pendingUserAdmin");
    const [pendingAdminPicker, setPendingPicker] = useState(`/pendingUserAdminpicker/${id}`);
    const  handleOnClickredirect =(e) => {
        
    
    if(window.location.pathname==="/pendingUserAdmin"){         
        
        setPending("/activeUserAdmin")
    }
    if(window.location.pathname===`/pendingUserAdminpicker/${id}`){         
        setPendingPicker(`/activeUserAdmin`);
    }    
}
    return (
        <div>
            <div className="FlexPending">
                    <div className="FlexPending backGround-pending">

                        <div className="container-pending">
                            <p className="Pending-paragraph">Solicitudes pendientes</p>
                            <img className="img" src={relojAzul} alt="reloj" />
                        </div>
                        <div
                            onClick={handleOnClickredirect}
                             className="container-pending border-pending">
                            <p className="Pending-paragraph2">Pickers</p>
                            <img className="img2" src={trabajadorOscuro} alt="trabajador" />
                        </div>
                    </div>
                    {
                        window.location.pathname==="/pendingUserAdmin" ?
                        <Redirect to={pendingAdmin}></Redirect>:<></>
                    }
                    {
                        window.location.pathname===`/pendingUserAdminpicker/${id}` ?
                        <Redirect to={pendingAdminPicker}></Redirect>:<></>
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
