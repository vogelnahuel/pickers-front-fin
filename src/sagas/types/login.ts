import { LoginType } from "../../pages/login/types";

export type getLoginType = {
  type: string;
  params: LoginType;
  element: HTMLElement;
};

export type ILoginResponse = {
  data: ILoginContent;
  status: number;
};

export type ILoginContent = {
  statusCode: number;
  result: {
    accessToken: string;
    refreshToken: string;
  };
};

export type LoginRestoreType = {
  statusCode: number;
  result: {
    successful: boolean;
  };
};
