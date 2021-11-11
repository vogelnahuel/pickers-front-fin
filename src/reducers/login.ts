import { LoginType } from "pages/login/types";
import { EmailType } from "sagas/types/login";
import { RootState } from "store";
import {
  ActionsTypes,
  LoginStateType,
  RestorePasswordActionsTypes,
  SelectorType,
  TypesTypes,
} from "./types/login";
import { ActionLoginType } from "./types/login";

export const types: TypesTypes = {
  LOGIN_GET_REQUEST: `LOGIN_GET_REQUEST`,
  LOGIN_GET_SUCCESS: `LOGIN_GET_SUCCESS`,
  LOGIN_GET_ERROR: `LOGIN_GET_ERROR`,
  LOGOUT: `LOGOUT`,
  /******EMAIL*******/
  LOGIN_EMAIL_GET_REQUEST: `LOGIN_EMAIL_GET_REQUEST`,
  LOGIN_EMAIL_GET_SUCCESS: `LOGIN_EMAIL_GET_SUCCESS`,
  LOGIN_EMAIL_GET_ERROR: `LOGIN_EMAIL_GET_ERROR`,
  /******RESTORE*******/
  LOGIN_RESTORE_GET_REQUEST: `LOGIN_RESTORE_GET_REQUEST`,
  LOGIN_RESTORE_GET_SUCCESS: `LOGIN_RESTORE_GET_SUCCESS`,
  LOGIN_RESTORE_GET_ERROR: `LOGIN_RESTORE_GET_ERROR`,
};

export const INITIAL_STATE: LoginStateType = {
  fetching: false,
};

export const actions: ActionsTypes = {
  getLoginRequest: (params: LoginType) => ({
    type: types.LOGIN_GET_REQUEST,
    params,
  }),
  getLoginSuccess: () => ({
    type: types.LOGIN_GET_SUCCESS,
  }),
  getLoginError: () => ({
    type: types.LOGIN_GET_ERROR,
  }),
  logout: () => ({
    type: types.LOGOUT,
  }),

  /********EMAIL******/
  getLoginEmailRequest: (params: EmailType) => ({
    type: types.LOGIN_EMAIL_GET_REQUEST,
    params,
  }),
  getLoginEmailSuccess: () => ({
    type: types.LOGIN_EMAIL_GET_SUCCESS,
  }),
  getLoginEmailError: () => ({
    type: types.LOGIN_EMAIL_GET_ERROR,
  }),
  /********RESTORE******/
  getLoginRestoreRequest: (params: RestorePasswordActionsTypes) => ({
    type: types.LOGIN_RESTORE_GET_REQUEST,
    params,
  }),
  getLoginRestoreSuccess: () => ({
    type: types.LOGIN_RESTORE_GET_SUCCESS,
  }),
  getLoginREstoreError: () => ({
    type: types.LOGIN_RESTORE_GET_ERROR,
  }),
};

export const selectors: SelectorType = {
  isFetching: ({ login }: RootState) => login.fetching,
};

const reducer = (
  state: LoginStateType = INITIAL_STATE,
  action: ActionLoginType
) => {
  switch (action.type) {
    case types.LOGIN_GET_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case types.LOGOUT:
      return {
        ...INITIAL_STATE,
      };
    case types.LOGIN_GET_SUCCESS:
      return {
        ...state,
        fetching: false,
      };
    case types.LOGIN_GET_ERROR:
      return {
        ...state,
        fetching: false,
      };
    /***EMAIL***/
    case types.LOGIN_EMAIL_GET_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case types.LOGIN_EMAIL_GET_SUCCESS:
      return {
        ...state,
        fetching: false,
      };
    case types.LOGIN_EMAIL_GET_ERROR:
      return {
        ...state,
        fetching: false,
      };
    /***RESTORE***/
    case types.LOGIN_RESTORE_GET_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case types.LOGIN_RESTORE_GET_SUCCESS:
      return {
        ...state,
        fetching: false,
      };
    case types.LOGIN_RESTORE_GET_ERROR:
      return {
        ...state,
        fetching: false,
      };
    default:
      return state;
  }
};
export default reducer;
