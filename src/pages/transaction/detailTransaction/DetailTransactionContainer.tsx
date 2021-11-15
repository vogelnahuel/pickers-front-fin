import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  detailTransactionSelector
} from "reducers/detailTransaction";
import {
  actions as transactionActions
} from "reducers/transactions";
import { AppDispatch, RootState } from "store";
import { DetailTransaction } from "./DetailTransaction";
import { DetailTransactionContainerType } from "./types";

const DetailTransactionContainer: React.FC<DetailTransactionContainerType> = (
  props
): JSX.Element => {
  const [resolutionHeightModal, setresolutionHeightModal] = useState(550);

  useEffect(() => {
    if (window.screen.width < 1300) {
      setresolutionHeightModal(496);
    }
    if (window.screen.width > 1900) {
      setresolutionHeightModal(675);
    }
  }, []);

  return (
    <DetailTransaction
      resolutionHeightModal={resolutionHeightModal}
      {...props}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  detailTransaction: detailTransactionSelector(state).detailTransaction,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  closeModalDetailTransaction: () => {
    dispatch(transactionActions.getCloseModalDetailTransaction());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailTransactionContainer);
