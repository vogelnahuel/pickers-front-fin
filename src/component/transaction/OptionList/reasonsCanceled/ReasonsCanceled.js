import React from 'react'
import volver from '../../../../assets/admin/PendingUser/volver.svg'

import './reasonsCanceled.css'

export const ReasonsCanceled = (props) => {

    const setreasonCancelConfirm = props.setreasonCancelConfirm;
    const setreasonCancel = props.setreasonCancel;
    const sethistory = props.sethistory;

    const handleClickFinish = (e) => {
        e.preventDefault();
        
        setreasonCancelConfirm(true);
        
        setTimeout(() => {
            
            e.target.parentNode.parentNode.parentNode.parentNode.parentNode.classList.add('animation-left-transaction')
            const insert = document.querySelector('.insertAnimation');
            const div = document.createElement('div');
            div.classList.add('animationReasons');
            setTimeout(() => {
                insert.appendChild(div)
            }, 200);
            
            setTimeout(() => {
                setreasonCancel(false);
                if(e.target.parentNode.parentNode.parentNode.parentNode.parentNode!==null)
                e.target.parentNode.parentNode.parentNode.parentNode.parentNode.classList.remove('animation-left-transaction')
                insert.removeChild(insert.firstChild);
            }, 500);
        }, 0);
    }
    const handleClickgoBack = () => {
        sethistory(true);
        setreasonCancel(false)
    }

 

    return (
        <div className="modal-transaction-reasonsCanceled">
            <div onClick={handleClickgoBack} className="modal-transaction-volver">
                <img src={volver} alt ="volver" />
                <p>Volver</p>
            </div>
            <div className="modal-transaction-scroll">
                    <p className="modal-transaction-reasonsCanceled-subtitle">Seleccioná el motivo de la cancelación</p>

                    <div className="modal-transaction-reasonsCanceled-scroll">
                            

                            <div  onClick={handleClickFinish}  className="modal-transaction-reason-container">
                                <p>El punto está cerrado</p>
                            </div>
                            <div  onClick={handleClickFinish} className="modal-transaction-reason-container">
                                <p>La dirección es incorrecta</p>
                            </div>
                            <div  onClick={handleClickFinish} className="modal-transaction-reason-container">
                                <p>No encuentro el punto</p>
                            </div>
                            <div  onClick={handleClickFinish} className="modal-transaction-reason-container">
                                <p>Motivos personales o de transporte</p>
                            </div>
                            <div  onClick={handleClickFinish} className="modal-transaction-reason-container">
                                <p>Motivos personales o de transporte</p>
                            </div>
                            <div onClick={handleClickFinish}  className="modal-transaction-reason-container">
                                <p>Motivos personales o de transporte</p>
                            </div>

                            <div  onClick={handleClickFinish} className="modal-transaction-reason-container">
                                <p>Motivos personales o de transporte</p>
                            </div>
                            <div  onClick={handleClickFinish}  className="modal-transaction-reason-container">
                                <p>Motivos personales o de transporte</p>
                            </div>
                            <div  onClick={handleClickFinish}  className="modal-transaction-reason-container">
                                <p>Motivos personales o de transporte</p>
                            </div>
                            <div  onClick={handleClickFinish} className="modal-transaction-reason-container">
                                <p>Motivos personales o de transporte</p>
                            </div>

                            <div  onClick={handleClickFinish} className="modal-transaction-reason-container">
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
