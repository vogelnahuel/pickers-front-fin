

const loginService = {

    login: (email, password) =>{ return {access_token: "1234"}},
    chagePasswordRequest: (mail) =>{return{succeful:true}},
    chagePassword: (email, verificationCode,password) =>{ return {succeful:true}},

}

export default loginService