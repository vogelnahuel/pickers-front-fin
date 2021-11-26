import { AxiosResponse } from "axios";
import * as API from "middleware/api";
import { PreliquidationsApiResponse } from "sagas/types/preliquidation";

export const getPreliquidations = (
  params: any
): Promise<AxiosResponse<PreliquidationsApiResponse>> =>
  API.get("/ms-admin-rest/api/v1.0/presettlments", params);
