import React from 'react'
import volver from '../../../../assets/admin/PendingUser/volver.svg'
import './undelivered.css'

export const Undelivered = (props) => {

    const setundelivered = props.setundelivered;
    const setfinishModal = props.setfinishModal;

    const opc = ['No logro contactar al cliente','No logro contactar al cliente','El paquete es incorrecto','El cliente rechaza el paquete']


    const handleClickgoBack = (e) => {
        
        e.target.parentNode.parentNode.parentNode.classList.add('animation-right-transaction')

         setTimeout(() => {
             
            e.target.parentNode.parentNode.parentNode.classList.remove('animation-right-transaction')
            setfinishModal(true);
            if(e.target.parentNode.parentNode.parentNode!==null){
                e.target.parentNode.parentNode.parentNode.parentNode.firstChild.classList.add('animation-right-transaction2')
                e.target.parentNode.parentNode.parentNode.parentNode.firstChild.classList.remove('animation-right-transaction2')    
            }
           
            
            setundelivered(false);
         }, 600);
        
}
const handleClick  = (e) => {
    e.preventDefault();
    window.location.reload();
}
const handleCLickOpc = (e)=> {
    e.preventDefault();
}

    return (
        <div>
            <div onClick={handleClickgoBack} className="modal-transaction-finish-volver">
                <img src={volver} alt ="volver" />
                <p className="modal-transaction-finish-volver">Volver</p>
            </div>
            <div className="modal-container-height">
                <div className="modal-dni-center">

                    <h3 className="modal-undelivered-h3">Seleccioná el motivo de imposible de entrega</h3>
                    <hr className="modal-undelivered-hr"/>
                    {
                        opc ? opc.map(opcion => (
                            <div key={opcion}>
                             
                                <p onClick={handleCLickOpc} className="modal-undelivered-opc"> {opcion}</p>
                                
                                <hr className="modal-undelivered-hr"/>
                            </div>
                        ))
                        : null
                    }

                </div>
            </div>
            <div className="modal-dni-center">
                <button disabled onClick={handleClick} className="modal-undelivered-button" > Finalizarla</button>
            </div>
        </div>
    )
}
