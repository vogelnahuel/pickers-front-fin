

export type IRestorePassword= {
    postLoginRestore: any;
    isFetching: boolean;
    validationSchema: Object,
    email:string,
    verificationCode:string
  }
  export type RestorePasswordContainer={
    postLoginRestore: any;
    isFetching: boolean;
  }

  export type RestorePasswordType = {
    password: string,
    confirmPassword: string,
  }
  export type URLRestore = {
    cod: string,
    mail: string,
  }
