
export type LoginTypeProps= {
  postLogin: Function;
  isFetching: boolean;
  validationSchema: Object
}
export type LoginContainerType = {
  postLogin: Function;
  isFetching: boolean;
}

export type LoginType = {
  email: string,
  password:string
}

