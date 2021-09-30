import React from "react";
import { connect } from "react-redux";
import {
  actions as loginActions,
  selectors as loginSelectors,
} from "../../../reducers/login";
import * as yup from "yup";
import { VALIDATION_REGEX } from "utils/constants";
import EmailRestore from "./EmailRestore";
import { EmailRestoreType, EmailContainer } from "./types";
import { AppDispatch, RootState } from "store";
import { EmailRestoreActionsTypes } from "reducers/types/login";

const EmailRestoreContainer = (props: EmailContainer): JSX.Element => {
  const validationSchema: yup.SchemaOf<EmailRestoreType> = yup.object({
    email: yup
      .string()
      .required("Este campo es requerido.")
      .matches(VALIDATION_REGEX.regEmail, "El formato del correo es inválido"),
  });

  return <EmailRestore {...props} validationSchema={validationSchema} />;
};

const mapStateToProps = (state: RootState) => ({
  isFetching: loginSelectors.isFetching(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  postLoginEmail: (params: EmailRestoreActionsTypes) => {
    dispatch(loginActions.getLoginEmailRequest(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailRestoreContainer);
