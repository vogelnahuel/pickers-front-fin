import { NotificationStateType } from "reducers/types/notification";

export type DetailPreliquidationContainerPropsType = {
  isFetching: boolean;
  actualPage:string;
  showNotification: (notification: NotificationStateType) => void;
};
export type DetailPreliquidationPropsType = {
  isFetching: boolean;
  actualPage:string;
};
