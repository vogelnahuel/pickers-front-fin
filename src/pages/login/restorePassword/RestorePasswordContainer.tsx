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

const RestorePasswordContainer = (
  props: RestorePasswordContainerType
): JSX.Element => {
  const { cod, mail }: URLRestore = useParams();

  const validationSchema: yup.SchemaOf<RestorePasswordType> = yup.object({
    password: yup
      .string()
      .required("Este campo es requerido")
      .matches(VALIDATION_REGEX.regPassword, " ")
      .matches(
        VALIDATION_REGEX.regPasswordSpecialCharacters,
        "No se admiten caracteres especiales"
      ),
    confirmPassword: yup
      .string()
      .required("Este campo es requerido")
      .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
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
