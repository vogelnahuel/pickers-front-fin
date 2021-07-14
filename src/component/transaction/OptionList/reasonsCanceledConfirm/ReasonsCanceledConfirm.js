import React from 'react'
import volver from '../../../../assets/admin/PendingUser/volver.svg'
import Info  from '../../../../assets/transaction/Info.svg'
import './reasonsCanceledConfirm.css'

export const ReasonsCanceledConfirm = () => {
    return (
        <div className="modal-transaction-reasonsCanceled">
            <div className="modal-transaction-volver">
                <img src={volver} alt ="volver" />
                <p className="modal-transaction-reasonsCanceledConfirm-volver">Volver</p>
            </div>
            <div className="modal-transaction-reasonsCanceledConfirm-container">
                    <img className="modal-transaction-reasonsCanceledConfirm-img" src={Info} alt ="informacionIcon" />
                    <h3 className="modal-transaction-reasonsCanceledConfirm-subtitle">La transacción está por ser cancelada</h3>
                    <hr className="modal-transaction-reasonsCanceledConfirm-separate"/>
                    <p className="modal-transaction-reasonsCanceledConfirm-p">Al cancelar la transacción, esta va a pasar a blablabla
                    <br/>¿Querés cancelarla?</p>
            </div>
            <button className="modal-transaction-reasonsCanceledConfirm-button">Sí, cancelarla</button>
        </div>
    )
}
