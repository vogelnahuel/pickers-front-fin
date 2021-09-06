import React from 'react'
import volver from '../../../assets/admin/PendingUser/volver.svg'
import relojAzul from '../../../assets/admin/PendingUser/relojAzul.svg'
import relojOscuro from '../../../assets/admin/PendingUser/relojOscuro.svg'
import trabajadorOscuro from '../../../assets/admin/PendingUser/trabajadorOscuro.svg'
import trabajadorAzul from '../../../assets/admin/PendingUser/trabajadorAzul.svg'
import './pending.scss'
import {useHistory} from 'react-router-dom'

export const PendingBlue = ({changePage,actualPage}) => {
    
    const Historial = useHistory();


const handleHistory = () => {
    Historial.goBack();
}
    return (
        <div>
            <div className="FlexPending">
                    <div className="FlexPending backGround-pending">
                    {actualPage==="PENDING"?
                        <div className="container-pending pending-blue-border-izq" >
                            <p className="Pending-paragraph">Solicitudes pendientes</p>
                            <img className="img" src={relojAzul} alt="reloj" />
                        </div>:
                        <div 
                            onClick={()=>{changePage("PENDING")}}
                            className="container-pending pending-blue-border-izq">
                            <p className="Pending-paragraph  pending-black ">Solicitudes pendientes</p>
                         <img className="img" src={relojOscuro} alt="reloj" />
                            </div>}
                        {actualPage==="ACTIVE"?
                             <div className="container-pending border-pending pending-blue-border-der" >
                             <p className="Pending-paragraph2 pending-blue">Pickers</p>
                             <img className="img2" src={trabajadorAzul} alt="trabajador" />
                         </div>:
                       
                        <div
                        className="container-pending border-pending pending-blue-border-der"  onClick={()=>{changePage("ACTIVE")}}>
                       <p className="Pending-paragraph2">Pickers</p>
                       <img className="img2" src={trabajadorOscuro} alt="trabajador" />
                   </div>
                        }
                    </div>
                    <div className="FlexPending backGround-pending">

</div> 
                    {/* {
                        window.location.pathname==="/pendingUserAdmin" ?
                        <Redirect to={pendingAdmin}></Redirect>:<></>
                    }
                    {
                        window.location.pathname===`/pendingUserAdminpicker/${id}` ?
                        <Redirect to={pendingAdminPicker}></Redirect>:<></>
                    } */}

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
