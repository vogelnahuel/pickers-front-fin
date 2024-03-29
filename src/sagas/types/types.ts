export interface Effect<T = any, P = any> {
  name?: any;
  "@@redux-saga/IO": true;
  combinator: boolean;
  type: T;
  payload: P;
}
export interface getLoginType {
  params: object;
  element: HTMLElement;
  type: string;
}

export interface ILoginResponse {
  data: ILoginContent;
  status: number;
}

export interface ILoginContent {
  statusCode: number;
  result: {
    accessToken: string;
    refreshToken: string;
  };
}
export interface ITypeError {
  [x: string]: { status: any };
}