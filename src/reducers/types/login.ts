export type ActionLoginType = {
  type: string;
};
export type LoginState = {
  fetching: boolean;
};

export interface TypesTypes{
    LOGIN_GET_REQUEST:string,
    LOGIN_GET_SUCCESS:string,
    LOGIN_GET_ERROR:string,
    LOGOUT:string,
    LOGIN_EMAIL_GET_REQUEST:string,
    LOGIN_EMAIL_GET_SUCCESS:string,
    LOGIN_EMAIL_GET_ERROR:string,
    LOGIN_RESTORE_GET_REQUEST:string,
    LOGIN_RESTORE_GET_SUCCESS:string,
    LOGIN_RESTORE_GET_ERROR:string,
}
export interface ActionsTypes{
    getLoginRequest:Function,
    getLoginSuccess:Function,
    getLoginError:Function,
    logout:Function,
    getLoginEmailRequest:Function,
    getLoginEmailSuccess:Function,
    getLoginEmailError:Function,
    getLoginRestoreRequest:Function,
    getLoginRestoreSuccess:Function,
    getLoginREstoreError:Function,
}
export interface SelectorType{
    isFetching:Function
}

export interface EmailRestoreActionsTypes{
    mail: string;
  }
export interface RestorePasswordActionsTypes{
    email:string,
    password: string;
    verificationCode:string,
  }
