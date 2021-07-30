import React, {useEffect, useState} from 'react'
import volver from '../../../../assets/admin/PendingUser/volver.svg'
import api from '../../../../config/api'

import './reasonsCanceled.css'



export const ReasonsCanceled = (props) => {
    const [messages, setmessages] = useState()
  
    const array = [1,2,3,4,5]
    useEffect(() => {
       const cargarMensajes = async () => {
          setmessages( await api.get(`ms-admin-rest/api/v1.0/transactions/274/message`) 
           .then((res) => {
           
            return res.data.result.items;
          })
          .catch((err) => {
            console.log(err);
          }))
       }
       cargarMensajes();
    }, [])

    const setreasonCancelConfirm = props.setreasonCancelConfirm;
    const setreasonCancel = props.setreasonCancel;

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
            
                e.target.parentNode.parentNode.parentNode.parentNode.parentNode.classList.remove('animation-left-transaction')
                insert.removeChild(insert.firstChild);
            }, 500);
        }, 0);
    }


    return (
        <div className="modal-transaction-reasonsCanceled">
            <div className="modal-transaction-volver">
                <img src={volver} alt ="volver" />
                <p>Volver</p>
            </div>
            <div className="modal-transaction-scroll">
                    <p className="modal-transaction-reasonsCanceled-subtitle">Seleccioná el motivo de la cancelación</p>

                    <div onClick={handleClickFinish} className="modal-transaction-reasonsCanceled-scroll">
                            

                            {
                              messages? messages.map((message)=>(

                                <div className="modal-transaction-reason-container">
                                <p>{message.message}</p>
                            </div>
                               )
                               )
                            :null}
                            
                    </div>
            </div>
            
        </div>
    )
}
