import React from 'react'
import volver from '../../../assets/admin/PendingUser/volver.svg'
import relojOscuro from '../../../assets/admin/PendingUser/relojOscuro.svg'
import trabajadorAzul from '../../../assets/admin/PendingUser/trabajadorAzul.svg'
import './pending.css'
import { Link } from 'react-router-dom'

export const PendingBlack = () => {
    return (
        <div>
            <div className="FlexPending">
                    <div className="FlexPending backGround-pending">

                        <div className="container-pending">
                            <p className="Pending-paragraph  pending-black">Pendientes</p>
                            <img className="img" src={relojOscuro} alt="reloj" />
                        </div>
                        <div className="container-pending border-pending">
                            <p className="Pending-paragraph2 pending-blue">Pickers</p>
                            <img className="img2" src={trabajadorAzul} alt="trabajador" />
                        </div>
                    </div>

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
