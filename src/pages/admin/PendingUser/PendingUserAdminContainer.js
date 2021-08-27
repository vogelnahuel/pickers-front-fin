import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actions as pendingUserActions, selectors as pendingUserSelectors} from "reducers/PendingUser";
import { PendingUserAdmin } from "pages/admin/PendingUser/PendingUserAdmin";
import parseQueryParams from "utils/queryParams/parseQueryParams";
import { useLocation } from "react-router-dom";


const PendingUserAdminContainer = (props) => {
  debugger
    const params = useLocation();
    useEffect(() => {
       if(params.search) {
        let filters = parseQueryParams(params.search);
        filters={...filters,limit:window.screen.height<700 || window.screen.height<760 ? 3 : 5}
        props.setPendingUserFilters(filters);
        props.getPendingUser(filters);
    }
      else{
        props.getPendingUser(props.filters);
      }  
      
    }, [])
    return (
        <PendingUserAdmin {...props}/>
    );
}

const mapStateToProps = (state) => ({
    
    PendingUsers: pendingUserSelectors.getPendingUser(state),
    isFetching: pendingUserSelectors.isFetching(state),
    filters: pendingUserSelectors.getFilters(state),
});

const mapDispatchToProps = (dispatch) => ({
    getPendingUser: (params) => {
        dispatch(pendingUserActions.getPendingUserRequest(params));
    },
    setPendingUserFilters:(filters)=>{
        dispatch(pendingUserActions.setPendingUserFilters(filters));
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(PendingUserAdminContainer);
