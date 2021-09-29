export type ActionLoginType = {
  type: string;
};
export type LoginState = {
  fetching: boolean;
};

export type TypesTypes = {
  LOGIN_GET_REQUEST: string;
  LOGIN_GET_SUCCESS: string;
  LOGIN_GET_ERROR: string;
  LOGOUT: string;
  LOGIN_EMAIL_GET_REQUEST: string;
  LOGIN_EMAIL_GET_SUCCESS: string;
  LOGIN_EMAIL_GET_ERROR: string;
};

export type ActionsTypes = {
  getLoginRequest: Function;
  getLoginSuccess: Function;
  getLoginError: Function;
  getLoginEmailRequest: Function;
  getLoginEmailSuccess: Function;
  getLoginEmailError: Function;
  logout: Function;
};
export type SelectorLoginType = {
  isFetching: Function;
};
export type EmailRestoreActionsTypes = {
  mail: string;
};
