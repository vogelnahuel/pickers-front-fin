import { AxiosResponse } from "axios";
import * as API from "./api";
import { LoginType } from "../pages/login/types";
import { ILoginResponse } from "../sagas/types/login";

export const getLogin = (params:LoginType): Promise<AxiosResponse<ILoginResponse>> => API.post('/ms-admin-rest/api/v1.0/login',params);
export const setAuthToken = (token:string) => {
    API.setAuthToken(token);
};