import React, {useState} from "react";
import {Header} from "component/admin/Header/Header";
import {Nav} from "component/admin/Nav/Nav";
import { TableTransaction } from "component/transaction/tableTransaction/TableTransaction";
import "pages/transaction/transaction.scss";
import FilterTransaction from "./filterTransaction/FilterTransactionContainer";
import {Modal} from "@pickit/pickit-components";
import {OptionList} from "pages/transaction/modalTransaction/OptionList/OptionList";
import exportar from "assets/admin/PendingUser/exportar.svg";
import or from "assets/admin/PendingUser/or.svg";
import exportDisabledIcon from "assets/transaction/ExportDisabled.svg";
import orDisabled from "assets/transaction/OrDisabled.svg";
import Close from "assets/transaction/Close.svg";
import api from "middleware/api";
import stateName from "component/transaction/tableTransaction/statesNames";
import {ISO8601toDDMMYYYHHMM} from 'utils/iso8601toDDMMYYHHMM'
import NotificationModal from "component/modal/NotificationModal";
import {  TransactionContainerPropsType } from "./types";
import { TransactionResponseTypeResult } from "sagas/types/transactions";

export const Transaction = ({
                                isExportDisabled,
                                isFetching,
                                transactions,
                                getMoreTransactions,
                                getTransactionsExportRequest,
                                filters,
                                seeMore,
                                filtersExtraSeeMore,
                                resolutionHeightModal,
                            }:TransactionContainerPropsType):JSX.Element => {

    const [FilterSelectedTransaction, setFilterSelectedTransaction] = useState<TransactionResponseTypeResult>();
    const [OpenModalTransaction, setOpenModalTransaction] = useState(false);
    const titulos = ["Transacción", "Id de picker", "Vencimiento SLA", "Estado"];
    const [isFetchingModal, setisFetchingModal] = useState(false)
    
    const cargarDatos = async(id:number)=> {
            await  api.get(`/ms-admin-rest/api/v1.0/transactions/${id}`)
            .then((res) => {
                setFilterSelectedTransaction(res.data.result);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onClose = () => {
        setOpenModalTransaction(false);
    };


    return (
        <div className="background-Grey">
            <Header />
            <div className="mainContainerFlex">
                <Nav isDirty={""} />

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
                        api={transactions}
                        titulos={titulos}
                        cargarDatos={cargarDatos}
                    />
                    {transactions && transactions?.length !== 0 ? <>
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

                
                {OpenModalTransaction === true ? 
                    <div className="modal-transaction">
                        <Modal 
                            width="1190px" 
                            height={`${resolutionHeightModal}px`} 
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
                                            {  FilterSelectedTransaction && FilterSelectedTransaction?.transaction && 
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
                                            {FilterSelectedTransaction && FilterSelectedTransaction?.transaction 
                                                ? FilterSelectedTransaction.transaction.transactionCode 
                                                : ""} 
                                        </h2> 
                                        <p>
                                            {FilterSelectedTransaction && FilterSelectedTransaction?.transaction 
                                                ? stateName(FilterSelectedTransaction.transaction.state.id) 
                                                : ""}
                                        </p>
                                        <p className="modal-transaction-fecha"> 
                                            {" "} 
                                            {FilterSelectedTransaction && FilterSelectedTransaction?.transaction 
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
export default Transaction;