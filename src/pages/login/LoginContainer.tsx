import React from "react";
import { connect } from "react-redux";
import {
  actions as loginActions,
  selectors as loginSelectors,
} from "../../reducers/login";
import LoginNew from "./Login";
import * as yup from "yup";
import { VALIDATION_REGEX } from "utils/constants";

const LoginContainer = (props: any): any => {
  const validationSchema = yup.lazy((values) => {
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

  return <LoginNew {...props} validationSchema={validationSchema} />;
};

const mapStateToProps = (state: any) => ({
  modalOpen: loginSelectors.isModalOpen(state),
  modalOpenServerError: loginSelectors.isModalOpenServerError(state),
  login: loginSelectors.getLogin(state),
  isFetching: loginSelectors.isFetching(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  postLogin: (params: any) => {
    dispatch(loginActions.getLoginRequest(params));
  },
  setModalOpen: (params: any) => {
    dispatch(loginActions.setModalOpen(params));
  },
  setmodalOpenServerError: (params: any) => {
    dispatch(loginActions.setmodalOpenServerError(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
