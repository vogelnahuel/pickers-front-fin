import React, { useEffect } from "react";
import { connect } from "react-redux";

import { AppDispatch, RootState } from "store";
import  Invoice  from "./Invoice";
import { actions } from "reducers/pickers";
import { preliquidationSelector } from "reducers/preliquidation";
import { detailPreliquidationInvoiceContainerPropsType } from "./types";


const InvoiceContainer = (props: detailPreliquidationInvoiceContainerPropsType): JSX.Element => {

  useEffect(() => {
    props.setActualPage('INVOICE')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

    return <Invoice {...props} />;
  };

const mapStateToProps = (state: RootState) => ({
  isFetching: preliquidationSelector(state).fetching,
});
  
  const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setActualPage: (page: string) => {
      dispatch(actions.setActualPage(page));
    },

  });
  export default connect(
    mapStateToProps,
    mapDispatchToProps
    
  )(InvoiceContainer);