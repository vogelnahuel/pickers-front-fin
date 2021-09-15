import React, {  } from "react";
import { connect } from "react-redux";
import { actions as loginActions, selectors as loginSelectors} from "reducers/login"
import Login from "./Login";
import * as yup from "yup";

const LoginContainer = (props) => {
    const validationSchema =
    yup.lazy((values) => {
        return yup.object({
            mail: yup.string().required("Este campo es requerido."),
            password: yup.string().required("Este campo es requerido."),})
    });

    
    return (
        <Login {...props} validationSchema={validationSchema}/>
    );
}



const mapStateToProps = (state) => ({
    modalOpen: loginSelectors.isModalOpen(state),
    modalOpenServerError: loginSelectors.isModalOpenServerError(state),
    login: loginSelectors.getLogin(state),
    isFetching: loginSelectors.isFetching(state),
});

const mapDispatchToProps = (dispatch) => ({
    postLogin: (params) => {
        dispatch(loginActions.getLoginRequest(params));
    },
    setModalOpen: (params) => {
        dispatch(loginActions.setModalOpen(params));
    },
    setmodalOpenServerError: (params) => {
        dispatch(loginActions.setmodalOpenServerError(params));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);