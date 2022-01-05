import { NotificationStateType } from "reducers/types/notification";

export type WrapperPreliquidationContainerPropsType = {
  isFetching: boolean;
  actualPage:string;
  showNotification: (notification: NotificationStateType) => void;
  setActualPage: (page: string) => void;
};
export type WrapperPreliquidationPropsType = {
  isFetching: boolean;
  actualPage:string;
};
