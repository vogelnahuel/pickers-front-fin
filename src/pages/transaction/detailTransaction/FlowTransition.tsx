import React from 'react'

// import { string, number, node,object, arrayOf, oneOfType } from "prop-types";
// import { FinishModal } from './modalTransaction/OptionList/finish/FinishModal';
// import { ReasonsCanceled } from './modalTransaction/OptionList/reasonsCanceled/ReasonsCanceled';
import { History } from './modalTransaction/OptionList/history/History';

export default function FlowTransition({ pages, currentPage }:any) {
    const Page = pages[currentPage];
    return <Page />;
}

FlowTransition.defaultProps = {
    pages: [],
    currentPage: 0,
};


{/* <FlowTransition
            currentPage={currentStep}
            pages={{
                [STEP.REQUEST]: () => (
                    <RescueRequest
                        commitentAccountNumber={commitentAccountNumber}
                        fundSelected={fundSelected}
                        isDesktop={isDesktop}
                        onSuccess={() => setCurrentStep(STEP.CONFIRM)}
                        goBack={goBackWithAccountReset}
                    />
                ),
                [STEP.CONFIRM]: () => (
                    <RescueConfirm onBack={() => setCurrentStep(STEP.REQUEST)} handlerTicket={handlerTicket} />
                ),
                [STEP.TICKET]: () => <Ticket flowIdTransaction={flowIdTransaction} flowGoBack={handlerGoBack} />,
            }}
        />
const STEP = {
    REQUEST: "REQUEST",
    CONFIRM: "CONFIRM",
    TICKET: "TICKET",
}; */}



