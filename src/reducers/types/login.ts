export interface selectorsTypesLogin{
    login:{
        fetching:boolean,
        login:object
    }
}
export interface ActionLoginType {
    type:string,
    login:object
}
export interface LoginState {
    fetching: boolean
  }

export interface TypesTypes{
    LOGIN_GET_REQUEST:string,
    LOGIN_GET_SUCCESS:string,
    LOGIN_GET_ERROR:string,
    LOGOUT:string
}
export interface ActionsTypes{
    getLoginRequest:Function,
    getLoginSuccess:Function,
    getLoginError:Function,
    logout:Function,
}
export interface SelectorType{
    isFetching:Function
}
