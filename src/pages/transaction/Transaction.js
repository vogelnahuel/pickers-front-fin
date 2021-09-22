import React, {useEffect, useState} from "react";
import {Header} from "component/admin/Header/Header";
import {Nav} from "component/admin/Nav/Nav";
import {TableTransaction} from "component/transaction/tableTransaction/TableTransaction";
import "pages/transaction/transaction.scss";
import FilterTransaction from "pages/transaction/filterTransaction/FilterTransactionContainer";
import {Modal} from "@pickit/pickit-components";
import {OptionList} from "component/transaction/OptionList/OptionList";
import exportar from "assets/admin/PendingUser/exportar.svg";
import or from "assets/admin/PendingUser/or.svg";
import exportDisabledIcon from "assets/transaction/ExportDisabled.svg";
import orDisabled from "assets/transaction/OrDisabled.svg";
import Close from "assets/transaction/Close.svg";
import api from "middleware/api";
import stateName from "component/transaction/tableTransaction/statesNames";
import {ISO8601toDDMMYYYHHMM} from 'utils/iso8601toDDMMYYHHMM'
import NotificationModal from "component/modal/NotificationModal";

export const Transaction = ({
                                isExportDisabled,
                                isFetching,
                                transactions,
                                getMoreTransactions,
                                getTransactionsExportRequest,
                                filters,
                                seeMore,
                                filtersExtraSeeMore,
                                openErrorDatePicker,
                                setOpenErrorDatePicker
                            }) => {

    const [FilterSelectedTransaction, setFilterSelectedTransaction] = useState({});
    const [OpenModalTransaction, setOpenModalTransaction] = useState(false);
    const [IdModalApi, setIdModalApi] = useState(""); // devuelve la consulta api
    const titulos = ["Transacción", "Id de picker", "Vencimiento SLA", "Estado"];
    const [isFetchingModal, setisFetchingModal] = useState(false)
     const [resolutionHeightModal, setresolutionHeightModal] = useState(550)
    // //todo: extraer a container
     useEffect(() => {
    
         if(window.screen.width<1300){
             setresolutionHeightModal(496)
             
         }
         if(window.screen.width>1900){
             setresolutionHeightModal(675)
         }
    
     }, [])

    //todo: extraer al reducer
    const cargarDatos = async(id)=> {
         await  api.get(`/ms-admin-rest/api/v1.0/transactions/${id}`)
            .then((res) => {
                setFilterSelectedTransaction(res.data.result);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onClose = (e) => {
        setOpenModalTransaction(false);
    };

    return (
        <div className="background-Grey">
            <Header />
            <div className="mainContainerFlex">
                <Nav />
                <div className="transaction-container">
                    <div className="mainContainerFlex-transaction">
                        <h2 className="subTitle-transaction">
                            <p className="subtitle-pendingUser-h2">Transacciones</p>
                        </h2>
                        <button
                            disabled={isExportDisabled}
                            onClick={(e)=>getTransactionsExportRequest(filters,e.target)}
                            className={isExportDisabled ? "export-transaction-disabled" : "export-transaction" }
                            name="export"
                        >
                            <img src={ isExportDisabled ? exportDisabledIcon : exportar} alt="export" />
                            <img className="or-pending" src={ isExportDisabled ? orDisabled : or} alt="or" />
                            <p className={"display-inline-block " + (isExportDisabled ? "p-export-transaction-disabled" : "p-export")}> Exportar</p>
                        </button>

                    </div>
                    <FilterTransaction/>
                    <TableTransaction
                        setOpenModalTransaction={setOpenModalTransaction}
                        IdModal={IdModalApi}
                        setIdModal={setIdModalApi}
                        api={transactions}
                        titulos={titulos}
                        cargarDatos={cargarDatos}
                        setFilterSelectedTransaction={setFilterSelectedTransaction}
                    />
                    {transactions && transactions.length !== 0 ? <>
                            { seeMore ?
                                <button
                                    onClick={()=>getMoreTransactions({...filtersExtraSeeMore, ...filters})}
                                    className="paginator-button-transaction"
                                >
                                    Ver más
                                </button>:
                                <button
                                    disabled={true}
                                    className="paginator-button-transaction-disabled"
                                >
                                    Ver más
                                </button>
                            }
                        </>
                        :
                        (<div
                                className="paginator-button-transaction-noResult"
                            >
                                No obtuvimos resultados para tu búsqueda :(
                            </div>)
                        }
                </div>
                <NotificationModal/>
                {openErrorDatePicker && (
                    <div className="contendor-modal-pending-pickers-aprobar">
                        <Modal width="750px" height="351px" isOpen={openErrorDatePicker} onClose={()=>{setOpenErrorDatePicker(false)}}>
                        <div className="container-modal">
                            <div className="modal-error-title">
                                <p className="p-modal-error-title">El rango seleccionado es inválido</p>
                            </div>
                            <div className="modal-error-subtitle">
                                <p className="p-modal-error-subtitle"> Por favor, ingresá un rango menor a 31 días</p>
                                <button
                                    onClick={()=>{setOpenErrorDatePicker(false)}}
                                    className="button-modal-error">
                                    Entendido
                                </button>
                            </div>
                        </div>
                        </Modal>
                        
                    </div>
                )}
                {OpenModalTransaction === true ? 
                    <div className="modal-transaction">
                        <Modal 
                            width="1190px" 
                            height={resolutionHeightModal} 
                            isOpen={OpenModalTransaction} 
                            onClose={onClose} 
                        > 
                            <div className="modal-transaction-container">
                                <img 
                                    onClick={onClose} 
                                    className="modal-transaction-close" 
                                    src={Close} 
                                    alt="cerrar" 
                                /> 
                                <div> 
                                    <div className="modal-transaction-title"> 
                                        <h2>Código de transacción</h2> 
                                        <p>Estado
                                        </p> 
                                        <p className="modal-transaction-fecha"> 
                                            {  FilterSelectedTransaction && FilterSelectedTransaction.transaction && 
                                            FilterSelectedTransaction.transaction.inAlert===true ? 
                                                <> 
                                                    <span className="transaction-modal-alert modal-transaction-alerta">En alerta</span> 
                                                </> 
                                                : <span className="modal-transaction-space"></span> 
                                            } 
                                            Vencimiento SLA</p> 
                                    </div> 
                                    <div className="modal-transaction-subtitle"> 
                                        <h2> 
                                            {FilterSelectedTransaction && FilterSelectedTransaction.transaction 
                                                ? FilterSelectedTransaction.transaction.transactionCode 
                                                : ""} 
                                        </h2> 
                                        <p>
                                            {FilterSelectedTransaction.transaction 
                                                ? stateName(FilterSelectedTransaction.transaction.state.id) 
                                                : ""}
                                        </p>
                                        <p className="modal-transaction-fecha"> 
                                            {" "} 
                                            {FilterSelectedTransaction.transaction 
                                                ? ISO8601toDDMMYYYHHMM(FilterSelectedTransaction.transaction.maxDeliveryDateTime)
                                                : ""}{" "} 
                                        </p> 
                                    </div> 
                                    <hr className="modal-transaction-separate" id="modal-transaction-hr-title"/> 
                                </div> 
                                <div className="modal-transaction-scroll"> 
                                    <OptionList 
                                        setisFetchingModal={setisFetchingModal}
                                        FilterSelectedTransaction={FilterSelectedTransaction}
                                        setFilterSelectedTransaction={setFilterSelectedTransaction} 
                                    /> 
                                </div> 
                            </div> 
                        </Modal> 
                    </div> 
                 : null}
            </div>
            

            { (isFetching  || isFetchingModal) && <div className="modalLoading"/>}
        </div>
    );
};
