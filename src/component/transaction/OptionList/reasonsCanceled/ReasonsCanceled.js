import React, {useEffect, useState} from 'react'
import api from '../../../../config/api'
import './reasonsCanceled.css'
import volver from '../../../../assets/admin/PendingUser/volver.svg'






export const ReasonsCanceled = (props) => {
    const [messages, setmessages] = useState()
  
   
    useEffect(() => {
       const cargarMensajes = async () => {
          setmessages( await api.get(`ms-admin-rest/api/v1.0/transactions/${props.FilterSelectedTransaction.transaction.id}/message`) 
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
    const sethistory= props.sethistory;
    const setreasonId=props.setreasonId;

const handleClickFinish = (e) => {
     
        e.preventDefault();
        
        setreasonCancelConfirm(true);
       setreasonId( e.target.attributes[0].value)
        
        
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

const handleClickgoBack = (e) => {
      
        
        e.target.parentNode.parentNode.parentNode.classList.add('animation-right-transaction')
        
        
         setTimeout(() => {
             
            e.target.parentNode.parentNode.parentNode.classList.remove('animation-right-transaction')
            sethistory(true);
            if(e.target.parentNode.parentNode.parentNode!==null){
                e.target.parentNode.parentNode.parentNode.parentNode.firstChild.classList.add('animation-right-transaction2')
                e.target.parentNode.parentNode.parentNode.parentNode.firstChild.classList.remove('animation-right-transaction2')    
            }
           
            
            setreasonCancel(false);
         }, 600);
        
}


    return (
        <div className="modal-transaction-reasonsCanceled">
            <div onClick={handleClickgoBack} className="modal-transaction-volver">
                <img src={volver} alt ="volver" />
                <p>Volver</p>
            </div>
            <div className="modal-transaction-scroll">
                    <p className="modal-transaction-reasonsCanceled-subtitle">Seleccioná el motivo de la cancelación</p>
            {

            
                    <div  className="modal-transaction-reasonsCanceled-scroll">
                            {console.log(messages)}

                            {
                              messages? messages.map((message)=>(

                                <div  className="modal-transaction-reason-container">
                                <p  onClick={handleClickFinish} value={message.id}>{message.message}</p>
                            </div>
                               )
                               )
                            :null}
                             
                            
                    </div>
                     }
            </div>
                             
        </div>
    )
}
