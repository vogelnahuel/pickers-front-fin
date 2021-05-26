import React from 'react'
import volver from '../../../assets/admin/PendingUser/volver.svg'
import relojAzul from '../../../assets/admin/PendingUser/relojAzul.svg'
import trabajadorOscuro from '../../../assets/admin/PendingUser/trabajadorOscuro.svg'
import './pending.css'
import { Link } from 'react-router-dom'

export const PendingBlue = () => {
    return (
        <div>
            <div className="FlexPending">
                    <div className="FlexPending backGround-pending">

                        <div className="container-pending">
                            <p className="Pending-paragraph">Pendientes</p>
                            <img className="img" src={relojAzul} alt="reloj" />
                        </div>
                        <div className="container-pending border-pending">
                            <p className="Pending-paragraph2">Pickers</p>
                            <img className="img2" src={trabajadorOscuro} alt="trabajador" />
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
