export interface selectorsTypesLogin{
    login:{
        fetching:boolean,
        login:object
    }
}
export interface ActionLoginType {
    type:string,
    login:object
}