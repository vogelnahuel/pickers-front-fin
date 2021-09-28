export interface Effect<T = any, P = any> {
  name?: any;
  "@@redux-saga/IO": true;
  combinator: boolean;
  type: T;
  payload: P;
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
