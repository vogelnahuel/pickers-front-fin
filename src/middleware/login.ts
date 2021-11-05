import { AxiosResponse } from "axios";
import * as API from "./api";
import { LoginType } from "../pages/login/types";
import {
  EmailType,
  ILoginResponse,
  LoginEmailTypeResponse,
  RestoreEmailResponse,
} from "../sagas/types/login";

import { RestorePasswordActionsTypes } from "reducers/types/login";

export const getLogin = (
  params: LoginType
): Promise<AxiosResponse<ILoginResponse>> =>
  API.post("/ms-admin-rest/api/v1.0/login", params);
export const setAuthToken = (token: string) => {
  API.setAuthToken(token);
};
export const getLoginRestore = (
  params: RestorePasswordActionsTypes
): Promise<AxiosResponse<RestoreEmailResponse>> =>
  API.put("/ms-admin-rest/api/v1.0/admin/change-password", params);
export const getLoginEmail = (
  params: EmailType
): Promise<AxiosResponse<LoginEmailTypeResponse>> =>
  API.post("ms-admin-rest/api/v1.0/admin/request-change-password", params);
