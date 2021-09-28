import React from "react";
import { connect } from "react-redux";
import {
  actions as loginActions,
  selectors as loginSelectors,
} from "../../reducers/login";
import Login from "./Login";
import * as yup from "yup";
import { VALIDATION_REGEX } from "utils/constants";
import {LoginContainerInterface, LoginType} from './types'
import {selectorsTypesLogin} from '../../reducers/types/login'



const LoginContainer = (props: LoginContainerInterface): JSX.Element => {
  const validationSchema:yup.SchemaOf<LoginType> =
  // yup.lazy(() => {
  //  return 
    yup.object({
      email: yup
        .string()
        .required("Este campo es requerido.")
        .matches(
          VALIDATION_REGEX.regEmail,
          "El formato del correo es inválido"
        ),
      password: yup.string().required("Este campo es requerido."),
    });
 // });

  return <Login  {...props} validationSchema={validationSchema} />;
};

const mapStateToProps = (state: selectorsTypesLogin) => ({
  isFetching: loginSelectors.isFetching(state),
});

const mapDispatchToProps = (dispatch:Function) => ({
  postLogin: (params: object) => {
    dispatch(loginActions.getLoginRequest(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
