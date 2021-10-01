import { RestorePasswordActionsTypes } from "reducers/types/login";
import { LoginType } from "../../pages/login/types";

export type getLoginType = {
  type: string;
  params: LoginType;
  element: HTMLElement;
};
export type getLoginEmailType = {
  type: string;
  params: EmailType;
  element: HTMLElement;
};
export type EmailType={
    email: string;
}
export type getRestoreType = {
  type: string;
  params: RestorePasswordActionsTypes;
  element: HTMLElement;
};

export type ILoginResponse = {
  data: ILoginContent;
  status: number;
};
export type RestoreEmailResponse={
  data: RestoreEmailContent;
  status: number;
}

export type RestoreEmailContent= {
  result: {
    successful:boolean
  }
}

export type ILoginContent = {
  statusCode: number;
  result: {
    accessToken: string;
    refreshToken: string;
  };
};

export type LoginRestoreTypeContent = {
  statusCode: number;
  result: {
    successful: boolean;
  };
};
export type LoginEmailTypeResponse={
  data: LoginRestoreTypeContent;
  status: number;
}
