import { NotificationStateType } from "reducers/types/notification";

export type DetailPreliquidationContainerPropsType = {
  isFetching: boolean;
  actualPage:string;
  showNotification: (notification: NotificationStateType) => void;
  setActualPage: (page: string) => void;
};
export type DetailPreliquidationPropsType = {
  changePage: (page: string) => void;
  handleClickBack:(params:boolean)=>void;
  actualPage:string;
  initialValues:any
};
