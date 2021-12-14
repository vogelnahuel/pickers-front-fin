import { connect } from "react-redux";
import { AppDispatch, RootState } from "store";
import { DetailPreliquidation } from "./DetailPreliquidation";
import { useHistory } from "react-router-dom";
import { DetailPreliquidationContainerPropsType } from "./types";
import { preliquidationSelector } from "reducers/preliquidation";

export const DetailPreliquidationContainer = (
  props: DetailPreliquidationContainerPropsType
): JSX.Element => {
  const history = useHistory();
  const handleClickBack = () => history.goBack();

  return (
    <DetailPreliquidation
      {...props}
      handleClickBack={handleClickBack}
      actualPage={props.actualPage}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  isFetching: preliquidationSelector(state).fetching,
  actualPage: preliquidationSelector(state).actualPage,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPreliquidation);
