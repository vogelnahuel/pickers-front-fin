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
import { TransactionType } from "./types";
import { TransactionResponseTypeResult } from "sagas/types/transactions";

export const Transaction: React.FC<TransactionType>  = ({
                                isExportDisabled,
                                isFetching,
                                transactions,
                                getMoreTransactions,
                                getTransactionsExportRequest,
                                filters,
                                seeMore,
                                filtersExtraSeeMore,
                                resolutionHeightModal,
                            }):JSX.Element => {

    //const [FilterSelectedTransaction, setFilterSelectedTransaction] = useState<TransactionResponseTypeResult>();
    //const [OpenModalTransaction, setOpenModalTransaction] = useState(false);
    //const [isFetchingModal, setisFetchingModal] = useState(false)
    
    // const cargarDatos = async(id:number)=> {
    //         await  api.get(`/ms-admin-rest/api/v1.0/transactions/${id}`)
    //         .then((res) => {
    //             setFilterSelectedTransaction(res.data.result);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

    // const onClose = () => {
    //     setOpenModalTransaction(false);
    // };


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
                        transactions={transactions}
                       
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
            </div>
            

            { (isFetching/*  || isFetchingModal*/) && <div className="modalLoading"/>}
        </div>
    );
};
export default Transaction;