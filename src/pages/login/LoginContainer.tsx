import React from "react";
import { connect } from "react-redux";
import {
  actions as loginActions,
  selectors as loginSelectors,
} from "../../reducers/login";
import Login from "./Login";
import * as yup from "yup";
import { VALIDATION_REGEX } from "utils/constants";
import { LoginContainerType, LoginType } from "./types";
import { AppDispatch, RootState } from "../../store";
import i18next from "i18next";

const LoginContainer: React.FC<LoginContainerType> = (props): JSX.Element => {
  const validationSchema: yup.SchemaOf<LoginType> = yup.object({
    email: yup
      .string()
      .required(i18next.t("global:error.input.required"))
      .matches(
        VALIDATION_REGEX.regEmail,
        i18next.t("login:error.login.invalidMail")
      ),
    password: yup.string().required(i18next.t("global:error.input.required")),
  });

  return <Login {...props} validationSchema={validationSchema} />;
};

const mapStateToProps = (state: RootState) => ({
  isFetching: loginSelectors.isFetching(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  postLogin: (params: LoginType): void => {
    dispatch(loginActions.getLoginRequest(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
