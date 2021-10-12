import React, { useEffect,useState } from 'react'
import volver from 'assets/admin/PendingUser/volver.svg'
import api from 'middleware/api';
import './undelivered.css'

export const Undelivered = (props:any) => {

    const setundelivered = props.setundelivered;
    const setfinishModal = props.setfinishModal;
    const FilterSelectedTransaction=props.FilterSelectedTransaction

const [messages, setmessages] = useState<any>([])
const [idSelected, setidSelected] = useState(-1)




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
         setmessages(['123','123','123'])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  //  const opc = [{key:1,value:'No logro contactar al cliente'},{key:2,value:'El paquete es incorrecto'},{key:3,value:'El cliente rechaza el paquete'}]


    const handleClickgoBack = (e:any) => {
        
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
const handleClick  = async (e:any) => {
    e.preventDefault();
    
  
    await api.post(
        `/ms-admin-rest/api/v1.0/transactions/${FilterSelectedTransaction.transaction.id}/in-devolution`,{"impossibleDeliveryReasonId":idSelected}
      );

      window.location.reload();
}


    return (
        <div>
            <div onClick={handleClickgoBack} className="modal-transaction-finish-volver">
                <img className="modal-transaction-finish-volver-img" src={volver} alt ="volver" />
                <p className="modal-transaction-finish-volver">Volver</p>
            </div>
            <h3 className="modal-undelivered-h3">Seleccioná el motivo de imposible de entrega</h3>
            
            <div className="modal-container-height">
            <hr id="modal-undelivered-hr"/>
                <div className="modal-dni-center" >

                    
                   
                    {
                        messages ? messages.map( (opcion:any) => (
                            <div  onClick={  ()=>setidSelected(parseInt(opcion.id)) } key={opcion.id} className={opcion.id===idSelected ? "modal-undelivered-opc-div modal-undelivered-font-bold" : "modal-undelivered-opc-div"} >
                             
                                <p  key={opcion.id}  id={opcion.id} className="modal-undelivered-opc"> {opcion.message}</p>
                                
                             
                            </div>
                        ))
                        : null
                    }

                </div>
            </div>
            <div className="modal-dni-center">
                {
                    idSelected===-1 ? 
                    <button disabled={true} onClick={handleClick} className="modal-undelivered-button" > Finalizarla</button>
                    :
                    <button  onClick={handleClick} className="modal-undelivered-button-active" > Finalizarla</button>
                }
                
            </div>
        </div>
    )
}
