import { LoginType } from "../pages/login/types";
import { RootState } from "../store";
import {
  ActionsTypes,
  LoginState,
  SelectorLoginType,
  TypesTypes,
} from "./types/login";
import { ActionLoginType } from "./types/login";

export const types: TypesTypes = {
  LOGIN_GET_REQUEST: `LOGIN_GET_REQUEST`,
  LOGIN_GET_SUCCESS: `LOGIN_GET_SUCCESS`,
  LOGIN_GET_ERROR: `LOGIN_GET_ERROR`,
  LOGOUT: `LOGOUT`,
};

export const INITIAL_STATE: LoginState = {
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
};

export const selectors: SelectorLoginType = {
  isFetching: ({ login }: RootState) => login.fetching,
};

const reducer = (
  state: LoginState = INITIAL_STATE,
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

    default:
      return state;
  }
};
export default reducer;
