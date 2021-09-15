import React from 'react';
import volver from 'assets/admin/PendingUser/volver.svg';
import relojAzul from 'assets/admin/PendingUser/relojAzul.svg';
import relojOscuro from 'assets/admin/PendingUser/relojOscuro.svg';
import trabajadorOscuro from 'assets/admin/PendingUser/trabajadorOscuro.svg';
import trabajadorAzul from 'assets/admin/PendingUser/trabajadorAzul.svg';
import 'component/admin/Sub-Title-Image/pending.scss';
import {useHistory} from 'react-router-dom';
import {selectors as pendingUserAdminPickerSelectors} from "reducers/detailPicker";
import {connect} from "react-redux";
import {actions as notificationActions} from "reducers/notification";

export const PendingBlue = ({ showNotification, changePage, actualPage, isDirty,isDetail }) => {
    const Historial = useHistory();
    const handleHistory = () => {
        let onClose = ()=>{
            Historial.goBack();
        };

        if(isDirty) {
            showNotification(
                {
                    level:"warning",
                    title: "Guardá tus cambios",
                    body:"Si te vas sin guardar, tus cambios no van a quedar registrados",
                    onClickLabel: "Ir a guardar",
                    onCloseLabel: "No quiero guardarlos",
                    onClose: onClose
                }
            );
        } else {
            onClose();
        }
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
                            onClick={()=>{changePage("PENDING",isDirty)}}
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
                            className="container-pending border-pending pending-blue-border-der"  onClick={()=>{changePage("ACTIVE",isDirty)}}>
                            <p className="Pending-paragraph2">Pickers</p>
                            <img className="img2" src={trabajadorOscuro} alt="trabajador" />
                        </div>
                    }
                </div>
                <div className="FlexPending backGround-pending">
                </div>
                {isDetail?<div>
                    <button  className="buttonVolver" onClick={handleHistory}  >
                        <img className="img3" src={volver} alt="volver"/>
                        <p className="Pending-paragraph3">Volver</p>
                    </button>

                </div>:null}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isDirty: pendingUserAdminPickerSelectors.isDirty(state),
});

const mapDispatchToProps = (dispatch) => ({
    showNotification: (content) => {
        dispatch(notificationActions.showNotification(content));
    },
});

export default connect(mapStateToProps,mapDispatchToProps)(PendingBlue);
