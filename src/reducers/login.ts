import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginType } from "pages/login/types";
import { EmailType } from "sagas/types/login";
import { RootState } from "store";
import {
  LoginStateType, RestorePasswordActionsTypes
} from "./types/login";

export const initialState: LoginStateType = {
  fetching: false,
};

const isRequestAction = (action: AnyAction) => {
  return action.type.endsWith("Request");
};

const isResponseAction = (action: AnyAction) => {
  return action.type.endsWith("Success") || action.type.endsWith("Error");
};

export const loginSlice = createSlice({
  name: "pickers",
  initialState,
  reducers: {
    getLoginRequest: (state: LoginStateType, action: PayloadAction<LoginType>) => {},
    getLoginSuccess: (state: LoginStateType) => {},
    getLoginError: () => {},
    getLoginEmailRequest: (state: LoginStateType, action: PayloadAction<EmailType>) => {},
    getLoginEmailSuccess: (state: LoginStateType) => {},
    getLoginEmailError: () => {},
    getLoginRestoreRequest: (state: LoginStateType, action: PayloadAction<RestorePasswordActionsTypes>) => {},
    getLoginRestoreSuccess: (state: LoginStateType) => {},
    getLoginREstoreError: () => {},
    logout: (state:LoginStateType) => {
      state=initialState
    }
  },
  extraReducers: (builder) =>
    builder 
      .addMatcher(isRequestAction, (state: LoginStateType) => {
        state.fetching = true;
      })
      .addMatcher(isResponseAction, (state: LoginStateType) => {
        state.fetching = false;
      }),
});

export default loginSlice.reducer;

export const loginSelector = (state: RootState) => state.login;

export const actions = loginSlice.actions;
