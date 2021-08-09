import React, { useState } from 'react'
import volver from '../../../../assets/admin/PendingUser/volver.svg'
import Info  from '../../../../assets/transaction/Info.svg'
import './finishModal.css'

export const FinishModal = (props) => {

    const [RadioActive, setRadioActive] = useState(false);
    const sethistory = props.sethistory
    const setfinishModal = props.setfinishModal;
    const setdniFinish = props.setdniFinish;
    const setundelivered = props.setundelivered;

    const handleClick = (e) => {
        setRadioActive(true);
        
    }
 
    const handleClickgoBack = (e) => {
      
        
        e.target.parentNode.parentNode.classList.add('animation-right-transaction')
        
        
         setTimeout(() => {
            e.target.parentNode.parentNode.classList.remove('animation-right-transaction')
            sethistory(true);
             e.target.parentNode.parentNode.parentNode.parentNode.firstChild.classList.add('animation-right-transaction2')
            e.target.parentNode.parentNode.parentNode.parentNode.firstChild.classList.remove('animation-right-transaction2')
         
            
            setfinishModal(false);
         }, 600);
        
        }

    const handleSubmit = (e) => {
        e.preventDefault();
        let state;
        document.querySelectorAll('.state').forEach(estado => estado.checked ===true  ?  state = estado  : "" );
        
        if(state.value==="Entregado"){

    
            setdniFinish(true);
            setTimeout(() => {
                e.target.parentNode.classList.add('animation-left-transaction')
                const insert = document.querySelector('.insertAnimation');
                const div = document.createElement('div');
                div.classList.add('animationReasons');
                setTimeout(() => {
                    insert.appendChild(div)
                }, 200);
                
                setTimeout(() => {
                    setfinishModal(false);
                    if(e.target.parentNode!==null)
                    e.target.parentNode.classList.remove('animation-left-transaction')
                    insert.removeChild(insert.firstChild);
                }, 500);
            }, 0);
    
        }
        if(state.value==="Devuelto"){

    
            setundelivered(true);
            setTimeout(() => {
                e.target.parentNode.classList.add('animation-left-transaction')
                const insert = document.querySelector('.insertAnimation');
                const div = document.createElement('div');
                div.classList.add('animationReasons');
                setTimeout(() => {
                    insert.appendChild(div)
                }, 200);
                
                setTimeout(() => {
                    setfinishModal(false);
                    if(e.target.parentNode!==null)
                    e.target.parentNode.classList.remove('animation-left-transaction')
                    insert.removeChild(insert.firstChild);
                }, 500);
            }, 0);
    
        }

    }

    return (
        <div className="modal-transaction-finishModal">
            <div onClick={handleClickgoBack} className="modal-transaction-finish-volver">
                <img src={volver} alt ="volver" />
                <p className="modal-transaction-finish-volver">Volver</p>
            </div>
            <div className="modal-transaction-finish-container">
                    <img className="modal-transaction-finish-img" src={Info} alt ="informacionIcon" />
                    <h3 className="modal-transaction-finish-subtitle">Seleccioná el estado final que quieras asignarle</h3>
                    <hr className="modal-transaction-finish-separate"/>
                    <p>La transacción <b>AAA112</b> va a pasar a estado:</p>
            </div>
        
            <form className="form-filter-transaction" onSubmit={handleSubmit} >
                    <div className="modal-transaction-finish-inputs">
                        <div className="flexItems">
                            <input  onClick={handleClick} className="state" name="estado"   type="radio" value="Siniestrado" id="Siniestrado"/>
                            <label htmlFor="Siniestrado2" className="modal-transaction-finish-label"> Siniestrado</label>
                        </div>
                        <div className="flexItems">
                            <input onClick={handleClick} className="state" name="estado"  type="radio" value="Entregado" id="Entregado"/>
                            <label  htmlFor="Entregado2" className="modal-transaction-finish-label">Entregado</label>
                        </div>
                        <div className="flexItems">
                            <input  onClick={handleClick}  className="state" name="estado"  type="radio" value="Devuelto" id="Devuelto"/>
                            <label htmlFor="Devuelto2" className="modal-transaction-finish-label">Devuelto</label>
                        </div>
                        <div className="flexItems">
                            <input  onClick={handleClick}  className="state" name="estado"   type="radio" value="Cancelada" id="Cancelada"/>
                            <label htmlFor="Cancelada2" className="modal-transaction-finish-label"> Cancelada</label>
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
