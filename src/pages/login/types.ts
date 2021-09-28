
export interface LoginInterface {
  postLogin: any;
  isFetching: boolean;
  validationSchema: Object
}
export interface LoginContainerInterface {
  postLogin: any;
  isFetching: boolean;
}
export interface credentialsInterface {
  mail: string;
  password: string;
}
export type LoginType = {
  email: string,
  password:string
}