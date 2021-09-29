export interface Effect<T = any, P = any> {
  name?: any;
  "@@redux-saga/IO": true;
  combinator: boolean;
  type: T;
  payload: P;
}
export interface ITypeError{
   [x: string]: { status: any; }; 
}
