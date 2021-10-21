import volver from "assets/admin/PendingUser/volver.svg";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    actions as detailTransactionActions,
    selectors as detailTransactionSelector
} from "reducers/detailTransaction";
import { DetailTransactionCancelItemType } from "sagas/types/detailTransactions";
import { AppDispatch, RootState } from "store";
import { UndeliveredPropsType } from "../../types";
import { ReasonList } from "../ReasonList/ReasonList";
import "./undelivered.css";

const Undelivered: React.FC<UndeliveredPropsType> = ({
  onBack,
  detailTransaction,
  messages,
  getMessages,
  setMessageSelected,
  getDetailTransactionFinishReturned,
}): JSX.Element => {
     useEffect(() => {
    getMessages(detailTransaction.transaction.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [selectedClick, setSelectedClick] = useState({ id: -1, state: false });
  const handleClick = (message: DetailTransactionCancelItemType) => {
    setMessageSelected(message);
    setSelectedClick({ id: message.id, state: true });
  };
  return (
    <div className="modal-transaction-reasonsCanceled">
      <div
        onClick={() => {
          onBack();
        }}
        className="modal-transaction-volver"
      >
        <img
          className="modal-transaction-reasonsCanceled-img-volver"
          src={volver}
          alt="volver"
        />
        <p className="modal-reasonsCancel-p">Volver</p>
      </div>
      <div className="modal-transaction-scroll">
        <p className="modal-transaction-reasonsCanceled-subtitle">
          Seleccioná el motivo de imposible de entrega
        </p>
        <ReasonList
          messages={messages}
          selectedClick={selectedClick}
          handleClick={handleClick}
        ></ReasonList>
        <button
          onClick={() => {
            getDetailTransactionFinishReturned(
              detailTransaction.transaction.id
            );
          }}
          className="finish-button"
        >
          Finalizarla
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  detailTransaction: detailTransactionSelector.getDetailTransaction(state),
  messages: detailTransactionSelector.getDetailTransactionMessages(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getMessages: (id: string) => {
    dispatch(detailTransactionActions.getDetailTransactionMenssagesRequest(id));
  },
  setMessageSelected: (message: DetailTransactionCancelItemType) => {
    dispatch(detailTransactionActions.setMessageSelected(message));
  },
  getDetailTransactionFinishReturned: (id: string) => {
    dispatch(
      detailTransactionActions.getDetailTransactionFinishReturnedRequest(id)
    );
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Undelivered);

//     const setundelivered = props.setundelivered;
//     const setfinishModal = props.setfinishModal;
//     const FilterSelectedTransaction=props.FilterSelectedTransaction

// const [messages, setmessages] = useState<any>([])
// const [idSelected, setidSelected] = useState(-1)

//     useEffect(() => {
//         const cargarMensajes = async () => {
//             setmessages( await api.get(`ms-admin-rest/api/v1.0/transactions/${props.FilterSelectedTransaction.transaction.id}/message`)
//              .then((res) => {

//               return res.data.result.items;
//             })
//             .catch((err) => {
//               console.log(err);
//             }))
//          }
//          cargarMensajes();
//          setmessages(['123','123','123'])
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     },[])
//   //  const opc = [{key:1,value:'No logro contactar al cliente'},{key:2,value:'El paquete es incorrecto'},{key:3,value:'El cliente rechaza el paquete'}]

//     const handleClickgoBack = (e:any) => {

//         e.target.parentNode.parentNode.parentNode.classList.add('animation-right-transaction')

//          setTimeout(() => {

//             e.target.parentNode.parentNode.parentNode.classList.remove('animation-right-transaction')
//             setfinishModal(true);
//             if(e.target.parentNode.parentNode.parentNode!==null){
//                 e.target.parentNode.parentNode.parentNode.parentNode.firstChild.classList.add('animation-right-transaction2')
//                 e.target.parentNode.parentNode.parentNode.parentNode.firstChild.classList.remove('animation-right-transaction2')
//             }

//             setundelivered(false);
//          }, 600);

// }
// const handleClick  = async (e:any) => {
//     e.preventDefault();

//     await api.post(
//         `/ms-admin-rest/api/v1.0/transactions/${FilterSelectedTransaction.transaction.id}/in-devolution`,{"impossibleDeliveryReasonId":idSelected}
//       );

//       window.location.reload();
// }

//     return (
//         <div>
//             <div onClick={handleClickgoBack} className="modal-transaction-finish-volver">
//                 <img className="modal-transaction-finish-volver-img" src={volver} alt ="volver" />
//                 <p className="modal-transaction-finish-volver">Volver</p>
//             </div>
//             <h3 className="modal-undelivered-h3">Seleccioná el motivo de imposible de entrega</h3>

//             <div className="modal-container-height">
//             <hr id="modal-undelivered-hr"/>
//                 <div className="modal-dni-center" >

//                     {
//                         messages ? messages.map( (opcion:any) => (
//                             <div  onClick={  ()=>setidSelected(parseInt(opcion.id)) } key={opcion.id} className={opcion.id===idSelected ? "modal-undelivered-opc-div modal-undelivered-font-bold" : "modal-undelivered-opc-div"} >

//                                 <p  key={opcion.id}  id={opcion.id} className="modal-undelivered-opc"> {opcion.message}</p>

//                             </div>
//                         ))
//                         : null
//                     }

//                 </div>
//             </div>
//             <div className="modal-dni-center">
//                 {
//                     idSelected===-1 ?
//                     <button disabled={true} onClick={handleClick} className="modal-undelivered-button" > Finalizarla</button>
//                     :
//                     <button  onClick={handleClick} className="modal-undelivered-button-active" > Finalizarla</button>
//                 }

//             </div>
//         </div>
//     )
