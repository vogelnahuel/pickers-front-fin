import React from "react";
import {connect} from "react-redux";
import {actions as pendingUserActions, selectors as pendingUserSelectors} from "reducers/pickers";
import {FilterPickers} from "pages/pickers/filter/FilterPickers";

const FilterPickersContainer = (props) => {

    const search =(values)=>{
        props.getPendingUser({...values,...props.filtersExtra, vehicleType: values.vehicleType && (values.vehicleType.value===''? undefined : values.vehicleType.value)});
        props.setPendingUserFilters(values);
    };

    return (
        <FilterPickers
            {...props}
            onSubmit={search}
        />
    );
}

const mapStateToProps = (state) => ({
    filters: pendingUserSelectors.getFilters(state),
    filtersExtra: pendingUserSelectors.getFiltersExtra(state),
});


const mapDispatchToProps = (dispatch) => ({
    setPendingUserFilters:(filters)=>{
        dispatch(pendingUserActions.setPendingUserFilters(filters));
    },
    getPendingUser: (params) => {
        dispatch(pendingUserActions.getPendingUserRequest(params));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterPickersContainer);
