import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginType } from "pages/login/types";
import { EmailType } from "sagas/types/login";
import { RootState } from "store";
import { endsWithAny } from "utils/endsWithAny";
import { LoginStateType, RestorePasswordActionsTypes } from "./types/login";

export const initialState: LoginStateType = {
  fetching: false,
};

const SLICE_NAME = "login";

const isRequestAction = (action: Action<string>) => {
  const { type } = action;
  return type.startsWith(SLICE_NAME) && type.endsWith("Request");
};

const isResponseAction = (action: Action<string>) => {
  const { type } = action;
  return type.startsWith(SLICE_NAME) && endsWithAny(type, ["Error", "Success"]);
};

export const loginSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    getLoginRequest: (
      state: LoginStateType,
      action: PayloadAction<LoginType>
    ) => {},
    getLoginSuccess: (state: LoginStateType) => {},
    getLoginError: () => {},
    getLoginEmailRequest: (
      state: LoginStateType,
      action: PayloadAction<EmailType>
    ) => {},
    getLoginEmailSuccess: (state: LoginStateType) => {},
    getLoginEmailError: () => {},
    getLoginRestoreRequest: (
      state: LoginStateType,
      action: PayloadAction<RestorePasswordActionsTypes>
    ) => {},
    getLoginRestoreSuccess: (state: LoginStateType) => {},
    getLoginREstoreError: () => {},
    logout: (state: LoginStateType) => {
      state = initialState;
    },
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
