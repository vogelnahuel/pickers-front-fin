import exportar from "assets/admin/PendingUser/exportar.svg";
import or from "assets/admin/PendingUser/or.svg";
import exportDisabledIcon from "assets/transaction/ExportDisabled.svg";
import orDisabled from "assets/transaction/OrDisabled.svg";
import { Header } from "component/admin/Header/Header";
import { Nav } from "component/admin/Nav/Nav";
import NotificationModal from "component/modal/NotificationModal";
import "pages/transaction/transaction.scss";
import React from "react";
import DetailTransactionContainer from "./detailTransaction/DetailTransactionContainer";
import FilterTransaction from "./filterTransaction/FilterTransactionContainer";
import TableTransaction from "./tableTransaction/TableTransaction";
import { TransactionType } from "./types";

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
                                detailTransactionModalOpen
                            }):JSX.Element => {



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
                    <TableTransaction/>
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
                {detailTransactionModalOpen && <DetailTransactionContainer/>}
            </div>
            

            { (isFetching/*  || isFetchingModal*/) && <div className="modalLoading"/>}
        </div>
    );
};
export default Transaction;