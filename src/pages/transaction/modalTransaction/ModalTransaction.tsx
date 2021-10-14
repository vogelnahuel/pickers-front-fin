import React, { useEffect, useState } from "react";
import "./transaction.scss";
import { Modal } from "@pickit/pickit-components";
import { OptionList } from "pages/transaction/modalTransaction/OptionList/OptionList";
import Close from "assets/transaction/Close.svg";

import { TransactionResponseTypeResult } from "sagas/types/transactions";

export const ModalTransaction = ({ currentTransaction }:any):JSX.Element => {


    const [FilterSelectedTransaction, setFilterSelectedTransaction] = useState<TransactionResponseTypeResult>();
    const [OpenModalTransaction, setOpenModalTransaction] = useState(false);
    //altura del modal
    const [resolutionHeightModal, setresolutionHeightModal] = useState(550)


    //todo: extraer a container
    useEffect(() => {

        if(window.screen.width<1300){
            setresolutionHeightModal(496)
        }
        if(window.screen.width>1900){
            setresolutionHeightModal(675)
        }

    }, [])

    const onClose = () => {
        setOpenModalTransaction(false);
    };

    return (

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
                                {FilterSelectedTransaction &&  FilterSelectedTransaction.transaction &&
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
                                { FilterSelectedTransaction && FilterSelectedTransaction.transaction
                                    ? FilterSelectedTransaction.transaction.transactionCode
                                    : ""}
                            </h2>
                            <p>

                                {/* { FilterSelectedTransaction && FilterSelectedTransaction.transaction
                                    ? stateName(FilterSelectedTransaction.transaction.state.id)
                                    : ""} */}

                            </p>

                            <p className="modal-transaction-fecha">
                                {" "}
                                { FilterSelectedTransaction && FilterSelectedTransaction.transaction
                                    ? FilterSelectedTransaction.transaction.maxDeliveryDateTime.substring(0,10)+" "+(parseInt(FilterSelectedTransaction.transaction.maxDeliveryDateTime.substring( 11,13))-3)+FilterSelectedTransaction.transaction.maxDeliveryDateTime.substring( 13,16)
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
    );
};
