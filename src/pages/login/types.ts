export default interface LoginInterface {
    isFetching:boolean
    modalOpen:boolean
    isModalOpenServerError:boolean
    login:Object
    setModalOpen:Function
    postLogin:Function
    modalOpenServerError:boolean
    setmodalOpenServerError:Function
}