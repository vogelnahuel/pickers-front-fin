import React from 'react'
import volver from '../../../../assets/admin/PendingUser/volver.svg'

import './reasonsCanceled.css'

export const ReasonsCanceled = () => {
    return (
        <div className="modal-transaction-reasonsCanceled">
            <div className="modal-transaction-volver">
                <img src={volver} alt ="volver" />
                <p>Volver</p>
            </div>
            <div className="modal-transaction-scroll">
                    <p className="modal-transaction-reasonsCanceled-subtitle">Seleccioná el motivo de la cancelación</p>

                    <div className="modal-transaction-reasonsCanceled-scroll">
                            

                            <div className="modal-transaction-reason-container">
                                <p>El punto está cerrado</p>
                            </div>
                            <div className="modal-transaction-reason-container">
                                <p>La dirección es incorrecta</p>
                            </div>
                            <div className="modal-transaction-reason-container">
                                <p>No encuentro el punto</p>
                            </div>
                            <div className="modal-transaction-reason-container">
                                <p>Motivos personales o de transporte</p>
                            </div>
                            <div className="modal-transaction-reason-container">
                                <p>Motivos personales o de transporte</p>
                            </div>
                            <div className="modal-transaction-reason-container">
                                <p>Motivos personales o de transporte</p>
                            </div>

                            <div className="modal-transaction-reason-container">
                                <p>Motivos personales o de transporte</p>
                            </div>
                            <div className="modal-transaction-reason-container">
                                <p>Motivos personales o de transporte</p>
                            </div>
                            <div className="modal-transaction-reason-container">
                                <p>Motivos personales o de transporte</p>
                            </div>
                            <div className="modal-transaction-reason-container">
                                <p>Motivos personales o de transporte</p>
                            </div>

                            <div className="modal-transaction-reason-container">
                                <p>Motivos personales o de transporte</p>
                            </div>
                            <div className="modal-transaction-reason-container">
                                <p>Motivos personales o de transporte</p>
                            </div>

                            <div className="modal-transaction-reason-container">
                                <p>Motivos personales o de transporte</p>
                            </div>
                    
                    </div>
            </div>
            
        </div>
    )
}
