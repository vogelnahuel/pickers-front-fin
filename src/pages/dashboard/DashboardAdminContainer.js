import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actions as dashboardActions, selectors as dashboardSelectors} from "reducers/dashboard";
import { DashboardAdmin } from "pages/dashboard/DashboardAdmin"

const DashboardContainer = (props) => {
    useEffect(() => {
        props.getDashboard();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <DashboardAdmin {...props}/>
    );
}

const mapStateToProps = (state) => ({
    dashboard: dashboardSelectors.getDashboard(state),
    isFetching: dashboardSelectors.isFetching(state),
});

const mapDispatchToProps = (dispatch) => ({
    getDashboard: () => {
        dispatch(dashboardActions.getDashboardRequest());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);