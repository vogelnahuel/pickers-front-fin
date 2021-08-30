import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actions as pendingUserActions, selectors as pendingUserSelectors} from "reducers/PendingUser";
import { PendingUserAdmin } from "pages/admin/PendingUser/PendingUserAdmin";


const PendingUserAdminContainer = (props) => {
    useEffect(() => {
       
        // const filters = parseQueryParams(params.search)
        // console.log(filters)
        props.getPendingUser({});
        
    }, [])

    return (
        <PendingUserAdmin {...props}/>
    );
}

const mapStateToProps = (state) => ({
    
    PendingUsers: pendingUserSelectors.getPendingUser(state),
     isFetching: pendingUserSelectors.isFetching(state),
});

const mapDispatchToProps = (dispatch) => ({
    getPendingUser: (params) => {
        dispatch(pendingUserActions.getPendingUserRequest(params));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(PendingUserAdminContainer);
