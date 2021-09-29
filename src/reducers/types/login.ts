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
};
export type ActionsTypes = {
  getLoginRequest: Function;
  getLoginSuccess: Function;
  getLoginError: Function;
  logout: Function;
};
export type SelectorLoginType = {
  isFetching: Function;
};
