import { AxiosResponse } from "axios";
import * as API from "./api";
import { LoginType } from "../pages/login/types";
import { ILoginResponse, LoginRestoreType } from "../sagas/types/login";
import { EmailRestoreType } from "pages/login/email/types";

export const getLogin = (params:LoginType): Promise<AxiosResponse<ILoginResponse>> => API.post('/ms-admin-rest/api/v1.0/login',params);
export const setAuthToken = (token:string) => {
    API.setAuthToken(token);
};
export const getLoginEmail = (params:EmailRestoreType) : Promise<AxiosResponse<LoginRestoreType>> => API.post('ms-admin-rest/api/v1.0/admin/request-change-password',params);