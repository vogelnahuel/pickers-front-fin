import { connect } from "react-redux";
import {
  actions as loginActions,
  selectors as loginSelectors,
} from "../../../reducers/login";
import * as yup from "yup";
import { VALIDATION_REGEX } from "utils/constants";
import RestorePassword from "./RestorePassword";
import {
  RestorePasswordType,
  RestorePasswordContainerType,
  URLRestore,
} from "./types";
import { useParams } from "react-router";
import { AppDispatch, RootState } from "store";
import { RestorePasswordActionsTypes } from "reducers/types/login";
import i18next from "i18next";

const RestorePasswordContainer = (
  props: RestorePasswordContainerType
): JSX.Element => {
  const { cod, mail }: URLRestore = useParams();

  const validationSchema: yup.SchemaOf<RestorePasswordType> = yup.object({
    password: yup
      .string()
      .required(i18next.t("global:error.input.required"))
      .matches(VALIDATION_REGEX.regPassword, " ")
      .matches(
        VALIDATION_REGEX.regPasswordSpecialCharacters,
        i18next.t("global:error.input.specialCharacters")
      ),
    confirmPassword: yup
      .string()
      .required(i18next.t("global:error.input.required"))
      .oneOf(
        [yup.ref("password"), null],
        i18next.t("restorePassword:error.input.passwordNotMatch")
      ),
  });

  return (
    <RestorePassword
      {...props}
      email={mail}
      verificationCode={cod}
      validationSchema={validationSchema}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  isFetching: loginSelectors.isFetching(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  postLoginRestore: (params: RestorePasswordActionsTypes) => {
    dispatch(loginActions.getLoginRestoreRequest(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestorePasswordContainer);
