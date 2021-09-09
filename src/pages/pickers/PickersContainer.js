import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actions as pendingUserActions, selectors as pendingUserSelectors} from "reducers/pickers";
import { PendingUserAdmin } from "pages/pickers/Pickers";
import {titulosAdminPending,titulosAdminActive} from "utils/constants"

const PendingUserAdminContainer = (props) => {
   
    const changePage = (page) => {
        props.setActualPage(page);
    };


    useEffect(() => {
        const filters = props.actualPage==="PENDING"?{pickerStatusId:"2,3"}:{pickerStatusId:"4,5"};
        const filtersExtra={limit:3};
        //window.screen.height<770 ? 3 : 3
        props.setPendingUserExtraFilters(filtersExtra)
        props.setPendingUserFilters(filters);
        props.getPendingUser(({...filtersExtra, ...filters}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.actualPage])

    return (
        <PendingUserAdmin
            {...props}
            changePage={changePage}
            tableTitles={props.actualPage==="PENDING"?titulosAdminPending:titulosAdminActive}
        />
    );
};

const mapStateToProps = (state) => ({
    pendingUsers: pendingUserSelectors.getPendingUser(state),
    isFetching: pendingUserSelectors.isFetching(state),
    filters: pendingUserSelectors.getFilters(state),
    filtersExtra: pendingUserSelectors.getFiltersExtra(state),
    filtersExtraSeeMore: pendingUserSelectors.getFiltersExtraSeeMore(state),
    seeMore: pendingUserSelectors.getSeeMore(state),
    pag: pendingUserSelectors.getPag(state),
    actualPage:pendingUserSelectors.getActualPage(state),
    modalExportPicker:pendingUserSelectors.getActualPage(state)
});

const mapDispatchToProps = (dispatch) => ({
    reset: () => {
        dispatch(pendingUserActions.reset());
    },
    getPendingUser: (params) => {
        dispatch(pendingUserActions.getPendingUserRequest(params));
    },
    setPendingUserFilters:(filters)=>{
        dispatch(pendingUserActions.setPendingUserFilters(filters));
    },
    setPendingUserExtraFilters:(extraFilters)=>{
        dispatch(pendingUserActions.setPendingUserExtraFilters(extraFilters));
    },
    setActualPage:(page)=>{
        dispatch(pendingUserActions.setActualPage(page));
    },
    getPendingUsersExportRequest:(params)=>{
        dispatch(pendingUserActions.getPendingUserExportRequest(params))
    },
    getMorePendingUser: (params) => {
        dispatch(pendingUserActions.getMorePendingUserRequest(params));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(PendingUserAdminContainer);
