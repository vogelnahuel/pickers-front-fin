import React from "react";
import {connect} from "react-redux";
import {actions as pendingUserActions, selectors as pendingUserSelectors} from "reducers/pickers";
import {FilterPickers} from "pages/pickers/filter/FilterPickers";
import {VALIDATION_REGEX} from 'utils/constants'
import * as yup from "yup";

const FilterPickersContainer = (props) => {

    const search =(values)=>{
        
        props.getPendingUser({...values,...props.filtersExtra, vehicleType: values.vehicleType && (values.vehicleType.value===''? undefined : values.vehicleType.value)});
        props.setPendingUserFilters(values);

    };
    
    const validationSchema =
    yup.lazy(() => {
        return yup.object({
            name: yup.string().matches(VALIDATION_REGEX.expName,"No se admiten números o caracteres especiales"),
            identificationNumber:yup.string().matches(VALIDATION_REGEX.expIdentificationNumber,"No se admiten letras o caracteres especiales"),
            email:yup.string().email("El formato del correo es inválido")
        })

    });
    return (
        <FilterPickers
            {...props}
            onSubmit={search}
            validationSchema={validationSchema}
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
