
import { connect } from "react-redux";
import { AppDispatch, RootState } from "store";
import { DetailPreliquidation } from "./DetailPreliquidation";
import { useHistory } from "react-router-dom";
import { DetailPreliquidationContainerPropsType } from "./detailPreliquidation";
import { preliquidationSelector } from "reducers/preliquidation";

export const DetailPreliquidationContainer = (props: DetailPreliquidationContainerPropsType): JSX.Element => {

  const history = useHistory();
  const handleClickBack = () => history.goBack();
    return <DetailPreliquidation {...props} handleClickBack={handleClickBack} />;
  };

const mapStateToProps = (state: RootState) => ({
  isFetching: preliquidationSelector(state).fetching,
});
  
  const mapDispatchToProps = (dispatch: AppDispatch) => ({
  });
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DetailPreliquidation);
  
  