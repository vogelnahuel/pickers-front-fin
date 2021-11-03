import { AxiosResponse } from "axios";
import { dashboardResponseDataType } from "sagas/types/dashboard";
import * as API from "./api";

export const getDashboard = (): Promise<AxiosResponse<dashboardResponseDataType>> => API.get("/ms-admin-rest/api/v1.0/transactions/dashboard"); 