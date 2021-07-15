import React, { useState } from 'react'
import volver from '../../../../assets/admin/PendingUser/volver.svg'
import Info  from '../../../../assets/transaction/Info.svg'
import './finishModal.css'

export const FinishModal = () => {

    const [RadioActive, setRadioActive] = useState(false);

    const handleClick = (e) => {
        setRadioActive(true);
    }

    return (
        <div className="modal-transaction-finishModal">
            <div className="modal-transaction-finish-volver">
                <img src={volver} alt ="volver" />
                <p className="modal-transaction-finish-volver">Volver</p>
            </div>
            <div className="modal-transaction-finish-container">
                    <img className="modal-transaction-finish-img" src={Info} alt ="informacionIcon" />
                    <h3 className="modal-transaction-finish-subtitle">Seleccioná el estado final que quieras asignarle</h3>
                    <hr className="modal-transaction-finish-separate"/>
                    <p>La transacción <b>AAA112</b> va a pasar a estado:</p>
            </div>
        
            <form className="form-filter-transaction" >
                    <div className="modal-transaction-finish-inputs">
                        <div className="flexItems">
                            <input  onClick={handleClick} name="estado2"   type="radio" value="Siniestrado" id="Siniestrado2"/>
                            <label htmlFor="Siniestrado2" className="modal-transaction-finish-label"> Siniestrado</label>
                        </div>
                        <div className="flexItems">
                            <input onClick={handleClick} name="estado2"  type="radio" value="Entregado" id="Entregado2"/>
                            <label  htmlFor="Entregado2" className="modal-transaction-finish-label">Entregado</label>
                        </div>
                        <div className="flexItems">
                            <input  onClick={handleClick} name="estado2"  type="radio" value="Devuelto" id="Devuelto2"/>
                            <label htmlFor="Devuelto2" className="modal-transaction-finish-label">Devuelto</label>
                        </div>
                        <div className="flexItems">
                            <input  onClick={handleClick} name="estado2"   type="radio" value="Cancelada" id="Cancelada2"/>
                                
                            <label htmlFor="Cancelada2" className="modal-transaction-finish-label"> 
                            Cancelada
                            </label>
                        </div>
                    

                    </div>

                    {
                        RadioActive ===false ? 
                        <button className="modal-transaction-finish-button">Finalizarla</button>
                        :
                        <button className="modal-transaction-finish-button-click">Finalizarla</button>
                    }
                    
            </form>
            

          
        </div>
    )
}
