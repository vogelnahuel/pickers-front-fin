// {OpenModalTransaction === true ? 
//     <div className="modal-transaction">
//         <Modal 
//             width="1190px" 
//             height={`${resolutionHeightModal}px`} 
//             isOpen={OpenModalTransaction} 
//             onClose={onClose} 
//         > 
//             <div className="modal-transaction-container">
//                 <img 
//                     onClick={onClose} 
//                     className="modal-transaction-close" 
//                     src={Close} 
//                     alt="cerrar" 
//                 /> 
//                 <div> 
//                     <div className="modal-transaction-title"> 
//                         <h2>Código de transacción</h2> 
//                         <p>Estado
//                         </p> 
//                         <p className="modal-transaction-fecha"> 
//                             {  FilterSelectedTransaction && FilterSelectedTransaction?.transaction && 
//                             FilterSelectedTransaction.transaction.inAlert===true ? 
//                                 <> 
//                                     <span className="transaction-modal-alert modal-transaction-alerta">En alerta</span> 
//                                 </> 
//                                 : <span className="modal-transaction-space"></span> 
//                             } 
//                             Vencimiento SLA</p> 
//                     </div> 
//                     <div className="modal-transaction-subtitle"> 
//                         <h2> 
//                             {FilterSelectedTransaction && FilterSelectedTransaction?.transaction 
//                                 ? FilterSelectedTransaction.transaction.transactionCode 
//                                 : ""} 
//                         </h2> 
//                         <p>
//                             {FilterSelectedTransaction && FilterSelectedTransaction?.transaction 
//                                 ? stateName(FilterSelectedTransaction.transaction.state.id) 
//                                 : ""}
//                         </p>
//                         <p className="modal-transaction-fecha"> 
//                             {" "} 
//                             {FilterSelectedTransaction && FilterSelectedTransaction?.transaction 
//                                 ? ISO8601toDDMMYYYHHMM(FilterSelectedTransaction.transaction.maxDeliveryDateTime)
//                                 : ""}{" "} 
//                         </p> 
//                     </div> 
//                     <hr className="modal-transaction-separate" id="modal-transaction-hr-title"/> 
//                 </div> 
//                 <div className="modal-transaction-scroll"> 
//                     <OptionList 
//                         setisFetchingModal={setisFetchingModal}
//                         FilterSelectedTransaction={FilterSelectedTransaction}
//                         setFilterSelectedTransaction={setFilterSelectedTransaction} 
//                     /> 
//                 </div> 
//             </div> 
//         </Modal> 
//     </div> 
//  : null}
import React from "react";

export const DetailTransaction = () => {
    <div>
    </div>
}

