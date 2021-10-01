

export type RestoreEmailPasswordType= {
    postLoginRestore: any;
    isFetching: boolean;
    validationSchema: Object,
    email:string,
    verificationCode:string
  }
  export type RestorePasswordContainerType={
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
