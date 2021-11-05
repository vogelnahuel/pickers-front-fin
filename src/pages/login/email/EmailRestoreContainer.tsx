import { connect } from "react-redux";
import {
  actions as loginActions,
  selectors as loginSelectors,
} from "../../../reducers/login";
import * as yup from "yup";
import { VALIDATION_REGEX } from "utils/constants";
import EmailRestore from "./EmailRestore";
import { EmailContainer } from "./types";
import { AppDispatch, RootState } from "store";
import { EmailType } from "sagas/types/login";
import i18next from "i18next";


const EmailRestoreContainer = (props: EmailContainer): JSX.Element => {
  const validationSchema: yup.SchemaOf<EmailType> = yup.object({
    email: yup
      .string()
      .required(i18next.t("global:error.input.requier"))
      .matches(VALIDATION_REGEX.regEmail, i18next.t("login:error.login.invalidMail")),
  });

  return <EmailRestore {...props} validationSchema={validationSchema} />;
};

const mapStateToProps = (state: RootState) => ({
  isFetching: loginSelectors.isFetching(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  postLoginEmail: (params: EmailType) => {
    dispatch(loginActions.getLoginEmailRequest(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailRestoreContainer);
