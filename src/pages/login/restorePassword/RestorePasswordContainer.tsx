import React from "react";
import { connect } from "react-redux";
import {
  actions as loginActions,
  selectors as loginSelectors,
} from "../../../reducers/login";
import * as yup from "yup";
import { VALIDATION_REGEX } from "utils/constants";
import RestorePassword from "./RestorePassword";
import {RestorePasswordType,RestorePasswordContainer, URLRestore} from './types'
import {selectorsTypesLogin} from '../../../reducers/types/login'
import { useParams } from "react-router";

const RestorePasswordContainerJSX = (props: RestorePasswordContainer): JSX.Element => {
  
  const {cod,mail}:URLRestore = useParams();

  const validationSchema:yup.SchemaOf<RestorePasswordType> =
  // yup.lazy(() => {
  //  return 
    yup.object({
      password: yup
        .string()
        .required("Este campo es requerido")
        .matches(
          VALIDATION_REGEX.regPassword,
          " "
        ),
    confirmPassword: yup
        .string()
        .required("Este campo es requerido")
        .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden') });
 // });

  return <RestorePassword  {...props} email={mail} verificationCode={cod} validationSchema={validationSchema} />;
};

const mapStateToProps = (state: selectorsTypesLogin) => ({
  isFetching: loginSelectors.isFetching(state),
});

const mapDispatchToProps = (dispatch:Function) => ({
    postLoginRestore: (params: object) => {
    dispatch(loginActions.getLoginRestoreRequest(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RestorePasswordContainerJSX);
