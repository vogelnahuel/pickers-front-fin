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
    login: loginSelectors.getLogin(state),
    isFetching: loginSelectors.isFetching(state),
});

const mapDispatchToProps = (dispatch) => ({
    postLogin: (params) => {
        dispatch(loginActions.getLoginRequest(params));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);