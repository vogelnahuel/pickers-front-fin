import React from "react";
import { connect } from "react-redux";
import {
  actions as loginActions,
  selectors as loginSelectors,
} from "../../reducers/login";
import LoginNew from "./Login";
import * as yup from "yup";
import { VALIDATION_REGEX } from "utils/constants";
import LoginInterface from './types'
import {selectorsTypesLogin} from '../../reducers/typesLogin'




const LoginContainer = (props: LoginInterface): JSX.Element => {
  const validationSchema = yup.lazy(() => {
    return yup.object({
      email: yup
        .string()
        .required("Este campo es requerido.")
        .matches(
          VALIDATION_REGEX.regEmail,
          "El formato del correo es inválido"
        ),
      password: yup.string().required("Este campo es requerido."),
    });
  });

  return <LoginNew  {...props} validationSchema={validationSchema} />;
};

const mapStateToProps = (state: selectorsTypesLogin) => ({
  login: loginSelectors.getLogin(state),
  isFetching: loginSelectors.isFetching(state),
});

const mapDispatchToProps = (dispatch:any) => ({
  postLogin: (params: object) => {
    dispatch(loginActions.getLoginRequest(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
