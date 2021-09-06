
import React, { useEffect, useState } from "react";
import {  useParams} from "react-router-dom";
import { Header } from "component/admin/Header/Header";
import { Nav } from "component/admin/Nav/Nav";
import { TableTransaction } from "component/transaction/tableTransaction/TableTransaction";
import "./transaction.scss";
import FilterTransaction from "pages/transaction/filterTransaction/FilterTransactionContainer";
import { Modal } from "@pickit/pickit-components";
import { OptionList } from "component/transaction/OptionList/OptionList";
import exportar from "assets/admin/PendingUser/exportar.svg";
import or from "assets/admin/PendingUser/or.svg";
import  exportDisabledIcon from "assets/transaction/ExportDisabled.svg";
import orDisabled from "assets/transaction/OrDisabled.svg";

import Close from "assets/transaction/Close.svg";

import api from "../../middleware/api";
import createCSV from "tools/createCSV";
import stateName from "component/transaction/tableTransaction/statesNames";
import moment from "moment";
import button from "../../assets/admin/ActiveUserAdminPicker/button.svg";



export const Transaction = ({
                                isExportDisabled,
                                isFetching,
                                transactions,
                                openExportModal,
                                getMoreTransactions,
                                getTransactionsExportRequest,
                                closeExportModal,
                                filters,
                                filtersExtraSeeMore
                            }) => {


    const [apiFilterTransaction, setapiFilter] = useState({});
    const [FilterSelectedTransaction, setFilterSelectedTransaction] = useState(
        {}
    );
    // const [loader, setloader] = useState(true);
    // const [exportDisabled, setexportDisabled] = useState(true)
    const defaultTamPag=window.screen.height<700 || window.screen.height<760 ? 3 : 5;
    const tamPag = 15;
    const [offset, setoffset] = useState(tamPag);
    const [filter, setfilter] = useState({});
    const [VerMas, setVerMas] = useState(true)
    const [OpenModalTransaction, setOpenModalTransaction] = useState(false);
    const [IdModalApi, setIdModalApi] = useState(""); // devuelve la consulta api
    const titulos = ["Transacción", "Id de picker", "Vencimiento SLA", "Estado"];
    let filterParamsFromCars={};
    //altura del modal
     const [resolutionHeightModal, setresolutionHeightModal] = useState(550)
    //
    //
    // //todo: extraer a container
     useEffect(() => {
    
         if(window.screen.width<1300){
             setresolutionHeightModal(496)
         }
         if(window.screen.width>1900){
             setresolutionHeightModal(675)
         }
    
     }, [])


    // const {filterParams} = useParams();
    // if(filterParams){
    //     console.log(filterParams)
    //     switch (filterParams) {
    //         case "inAlert":
    //             filterParamsFromCars= {
    //                 values:{
    //                     enAlerta:true,
    //                     FechaEntrega:{
    //                         from:moment().subtract(4,"d").format("YYYY-MM-DD"),
    //                         until:moment().format("YYYY-MM-DD")
    //                     }
    //                 }
    //             }

    //             break;
    //         case "pending":
    //             filterParamsFromCars= {
    //                 stringSelected: "PENDING_ASSIGNMENT",
    //                 values:{
    //                     FechaEntrega:{
    //                         from:moment().subtract(4,"d").format("YYYY-MM-DD"),
    //                         until:moment().format("YYYY-MM-DD")
    //                     }
    //                 }
    //             }
    //             break;
    //         case "active":
    //             filterParamsFromCars= {
    //                 stringSelected: "PENDING_ASSIGNMENT,IN_RETURN_TO_SENDER,IN_DELIVERY_POINT,PICKED_UP,IN_PICK_UP_POINT,IN_PICK_UP",
    //                 values:{
    //                     FechaEntrega:{
    //                         from:moment().subtract(4,"d").format("YYYY-MM-DD"),
    //                         until:moment().format("YYYY-MM-DD")
    //                     }
    //                 }
    //             }
    //             break;

    //         default:
    //             break;
    //     }
    // }

    //todo: extraer al reducer
    const cargarDatos = async(e)=> {

        // setloader(true);
        setFilterSelectedTransaction( await  api.get(`/ms-admin-rest/api/v1.0/transactions/${Number(e.target.getAttribute('name'))}`)

            .then((res) => {
                return res.data.result;
            })
            .catch((err) => {
                console.log(err);
            }))
        // setloader(false);

        //preguntar a nahu

        // if(window.innerHeight < 800)
        //     document.querySelector('.modal-transaction').style.height=`${document.body.scrollHeight+100}px`
        // if(window.innerHeight > 800)
        //     document.querySelector('.modal-transaction').style.height=`${document.body.scrollHeight+400}px`

    }


    //todo: extraer al reducer
    const cargarMas = async () => {
        console.log("cargar mas",filter)
        const res = await api
            .get( `ms-admin-rest/api/v1.0/transactions?${filter.values && filter.values.nroTransaccion?`filter.transactionCode=${filter.values.nroTransaccion}`:""}${filter.values &&filter.values.Picker ? `&filter.pickerId=${filter.values.Picker}` : ""}${filter.value && filter.values.enAlerta? `&filter.inAlert=${true}` : ""}${filter.values && filter.values.FechaEntrega? `&filter.minMinDeliveryDate=${filter.values.FechaEntrega.from}`: ""}${filter.values && filter.values.FechaEntrega? `&filter.maxMinDeliveryDate=${filter.values.FechaEntrega.until}` : ""}${ filter.stringSelected && filter.stringSelected!==""? `&filter.state=${filter.stringSelected}`:""}&limit=${tamPag}&offset=${offset}`)
            .then((res) => {
                setoffset(offset + tamPag);
                if(res.data.result.items.length<tamPag)
                    setVerMas(false)
                return res.data.result.items;
            })
            .catch((err) => {
                console.log(err);
            });


        setapiFilter(apiFilterTransaction.concat(res));
    };

    // const construirUrlExport = (url) => {
    //
    //     let arrayOpciones = [];
    //
    //     if(filter.values){
    //         if(filter.values.nroTransaccion){
    //
    //             arrayOpciones.push(`&filter.transactionCode=${filter.values.nroTransaccion}`);
    //         }
    //         if (filter.values.Picker){
    //             arrayOpciones.push(`&filter.pickerId=${filter.values.Picker}`);
    //         }
    //         if(filter.values.enAlerta){
    //             arrayOpciones.push(`&filter.inAlert=${filter.values.enAlerta}`);
    //         }
    //         if(filter.values.FechaEntrega){
    //             arrayOpciones.push(`&filter.minMinDeliveryDate=${filter.values.FechaEntrega.from}`);
    //             arrayOpciones.push(`&filter.maxMinDeliveryDate=${filter.values.FechaEntrega.until}`);
    //         }
    //         if(filter.stringSelected){
    //             arrayOpciones.push(`&filter.state=${filter.stringSelected}`);
    //         }
    //     }
    //     arrayOpciones[0] = arrayOpciones[0].replace('&','');
    //
    //     for(let i =0 ; i < arrayOpciones.length;i++){
    //         url+=arrayOpciones[i];
    //     }
    //
    //     return url
    // }

    // const Export = async (e) => {
    //
    //     e.preventDefault();
    //
    //     let url="/ms-admin-rest/api/v1.0/transactions.csv?";
    //     url = construirUrlExport(url)
    //     const datosExportTransaction = await api.get(`${url}`)
    //         .then(res => res)
    //         .catch((err) => {
    //             console.log(err);
    //         });
    //
    //     if(datosExportTransaction!==undefined)
    //         createCSV(datosExportTransaction)
    //
    // }

    const onClose = (e) => {
        setOpenModalTransaction(false);
    };


    // useEffect( () => {
    //
    //
    //     const cargarDatos = async () => {
    // //
    // //
    // //
    //         setapiFilter(
    //             await api
    //    .get( `ms-admin-rest/api/v1.0/asd?
    //     ${filterParamsFromCars.values && filterParamsFromCars.values.nroTransaccion?`filter.transactionCode=${filterParamsFromCars.values.nroTransaccion}`:""}
    //     ${filterParamsFromCars.values &&filterParamsFromCars.values.Picker ? `&filter.pickerId=${filterParamsFromCars.values.Picker}` : ""}
    //     ${filterParamsFromCars.values && filterParamsFromCars.values.enAlerta? `&filter.inAlert=${true}` : ""}
    //     ${filterParamsFromCars.values && filterParamsFromCars.values.FechaEntrega? `&filter.minMinDeliveryDate=${filterParamsFromCars.values.FechaEntrega.from}`: ""}
    //     ${filterParamsFromCars.values && filterParamsFromCars.values.FechaEntrega? `&filter.maxMinDeliveryDate=${filterParamsFromCars.values.FechaEntrega.until}` : ""}
    //     ${ filterParamsFromCars.stringSelected && filterParamsFromCars.stringSelected!==""? `&filter.state=${filterParamsFromCars.stringSelected}`:""}
    //     &limit=${defaultTamPag}`)

    //                 .then((res) => {
    //                     setloader(false)
    //                     setoffset(defaultTamPag)
    //                     return res.data.result.items;
    //                 })
    //                 .catch((err) => {
    //                     setloader(false)
    //                     console.log(err);
    //                 })
    //         )

    //     }
    //

    // getTransactions(filters);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);


    return (
        <div className="background-Grey">
            <Header />
            <div className="mainContainerFlex">
                <Nav />
                <div className="transaction-container">
                    <div className="mainContainerFlex-transaction">
                        <h2 className="subTitle-transaction">
                            <p className="subtitle-pendingUser-h2">Transacciones </p>
                        </h2>
                        <button
                            disabled={isExportDisabled}
                            onClick={()=>getTransactionsExportRequest(filters)}
                            className={isExportDisabled ? "export-transaction-disabled" : "export-transaction" }
                            name="export"
                        >
                            <img src={ isExportDisabled ? exportDisabledIcon : exportar} alt="export" />
                            <img className="or-pending" src={ isExportDisabled ? orDisabled : or} alt="or" />
                            <p className={"display-inline-block " + (isExportDisabled ? "p-export-transaction-disabled" : "p-export")}> Exportar</p>
                        </button>

                    </div>
                    <FilterTransaction
                        // setapiFilter={setapiFilter}
                        // tamPag={tamPag}
                        // offset={offset}
                        // setoffset={setoffset}
                        // setfilter={setfilter}
                        // filter={filter}
                        // setVerMas={setVerMas}
                        // setexportDisabled={setexportDisabled}
                        // filterParams={filterParams}
                    />
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
                            { VerMas?
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
                        : (
                            <button
                                onClick={cargarMas}
                                className="paginator-button-transaction-noResult"
                            >
                                No obtuvimos resultados de tu búsqueda :(
                            </button>
                        )}
                </div>
                {openExportModal && (
                    <div className="contendor-modal-pending-pickers-aprobar">
                        <Modal width="750px" height="351px" isOpen={openExportModal} onClose={closeExportModal}>
                            <div className="container-modal">
                                <div className="modal-success-title">
                                    <p className="p-modal-error-title">Exportaste exitosamente</p>
                                </div>
                                <div className="modal-error-subtitle">
                                    <p className="p-modal-error-subtitle">
                                        El archivo se descargo correctamente
                                    </p>
                                    <div className="button-pending-picker-modal">
                                        <button
                                            onClick={closeExportModal}
                                            className="button-modal-aprobar-exito"
                                        >
                                            Entendido
                                        </button>
                                    </div>
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
                                            {  FilterSelectedTransaction.transaction && 
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
                                            {FilterSelectedTransaction.transaction 
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
                                                ? moment(FilterSelectedTransaction.transaction.maxDeliveryDateTime.substring(0,10)+" "+(parseInt(FilterSelectedTransaction.transaction.maxDeliveryDateTime.substring( 11,13))-3),"YYYY-MM-DD").format("DD/MM/YYYY")+" "+FilterSelectedTransaction.transaction.maxDeliveryDateTime.substring( 11,16)
                                                : ""}{" "} 
                                        </p> 
                                    </div> 
                                    <hr className="modal-transaction-separate" id="modal-transaction-hr-title"/> 
                                </div> 
                                <div className="modal-transaction-scroll"> 
                                    <OptionList 
                                        FilterSelectedTransaction={FilterSelectedTransaction}
                                        setFilterSelectedTransaction={setFilterSelectedTransaction} 
                                    /> 
                                </div> 
                            </div> 
                        </Modal> 
                    </div> 
                 : null}
            </div>
            

            { isFetching && <div className="modalLoading"/>}
        </div>
    );
};
