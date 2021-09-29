import React from "react";
import { connect } from "react-redux";
import {
  actions as loginActions,
  selectors as loginSelectors,
} from "../../../reducers/login";
import * as yup from "yup";
import { VALIDATION_REGEX } from "utils/constants";
import EmailRestore from "./EmailRestore";
// import {LoginContainerInterface, LoginType} from './types.ts'
// import {selectorsTypesLogin} from '../../../reducers/types/login'



const EmailRestoreContainer = (props: any): JSX.Element => {
  const validationSchema:yup.SchemaOf<any> =
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
     
    });
 // });

  return <EmailRestore  {...props} validationSchema={validationSchema} />;
};

const mapStateToProps = (state: any) => ({
  isFetching: loginSelectors.isFetching(state),
});

const mapDispatchToProps = (dispatch:any) => ({
    postLoginEmail: (params: any) => {
    dispatch(loginActions.getLoginEmailRequest(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailRestoreContainer);
