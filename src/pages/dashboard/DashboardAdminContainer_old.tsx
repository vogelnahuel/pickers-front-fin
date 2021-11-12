import { useEffect } from "react";
import { connect } from "react-redux";
import {
  actions as dashboardActions,
  selectors as dashboardSelectors,
} from "reducers/dashboard_old";
import { AppDispatch, RootState } from "store";
import { DashboardAdmin } from "./DashboardAdmin";
import { DashboardContainerTypes } from "./types";

const DashboardContainer = (props: DashboardContainerTypes): JSX.Element => {
  useEffect(() => {
    props.getDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <DashboardAdmin {...props} />;
};

const mapStateToProps = (state: RootState) => ({
  dashboard: dashboardSelectors.getDashboard(state),
  isFetching: dashboardSelectors.isFetching(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getDashboard: () => {
    dispatch(dashboardActions.getDashboardRequest());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
