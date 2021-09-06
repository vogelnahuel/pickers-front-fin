import React, {  } from "react";
import { connect } from "react-redux";
import { actions as loginActions, selectors as loginSelectors} from "reducers/login"
import Login from "./Login";

const LoginContainer = (props) => {
   
    
    return (
        <Login {...props}/>
    );
}

const mapStateToProps = (state) => ({
    modalOpen: loginSelectors.isModalOpen(state),
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
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);