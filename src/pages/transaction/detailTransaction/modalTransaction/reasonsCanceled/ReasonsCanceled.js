import volver from 'assets/admin/PendingUser/volver.svg'
import React from 'react'
import './reasonsCanceled.scss'






export const ReasonsCanceled = (props) => {
    // const [messages, setmessages] = useState()
   
   
    // useEffect(() => {
    //    const cargarMensajes = async () => {
    //       setmessages( await api.get(`ms-admin-rest/api/v1.0/transactions/${props?.FilterSelectedTransaction?.transaction.id}/message`) 
    //        .then((res) => {
           
    //         return res.data.result.items;
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       }))
    //    }
    //    cargarMensajes();
    // }, [props?.FilterSelectedTransaction?.transaction?.id])







    return (
        <div className="modal-transaction-reasonsCanceled">
            <div onClick={props.onBack} className="modal-transaction-volver">
                <img className="modal-transaction-reasonsCanceled-img-volver" src={volver} alt ="volver" />
                <p className="modal-reasonsCancel-p">Volver</p>
            </div>
            <div className="modal-transaction-scroll">
                    <p className="modal-transaction-reasonsCanceled-subtitle">Seleccioná el motivo de cancelación de la colecta</p>
            {

             
            
                    <div  className="modal-transaction-reasonsCanceled-scroll">
                        
                                 <hr className="modal-transaction-reasonsCanceled-separate"/>

                            {/* {
                              messages? messages.map((message)=>(

                                <div  key={message.id} className="modal-transaction-reason-container">
                                    
                                <p  onClick={()=>{}}  value={message.id}>{message?.message}</p>
                            </div>
                               )
                               )
                            :null} */}
                             
                            
                    </div>
                     }
            </div>
            <div className="modal-reasonsCanceled-difuminar">

            </div>
                             
        </div>
    )
}
