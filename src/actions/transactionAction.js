import { types } from "../types"

export const changeTest = (NuevoTest) => {

    return {
        type:types.TEST,
        payload:NuevoTest
    }

}