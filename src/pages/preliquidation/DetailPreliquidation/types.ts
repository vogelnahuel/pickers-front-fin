import { NotificationStateType } from "reducers/types/notification";

export type WrapperPreliquidationContainerPropsType = {
  isFetching: boolean;
  actualPage:string;
  showNotification: (notification: NotificationStateType) => void;
  setActualPage: (page: PagesPreliquidationTypes) => void;
};
export type WrapperPreliquidationPropsType = {
  isFetching: boolean;
  actualPage:string;
};
export enum PagesPreliquidationTypes {
  PRELI = "preliquidation",
  INVOICE = "invoice"  
};