import { NotificationStateType } from "reducers/types/notification";

export type WrapperPreliquidationContainerPropsType = {
  isFetching: boolean;
  actualPage: PagesPreliquidationTypes;
  showNotification: (notification: NotificationStateType) => void;
  setActualPage: (page: PagesPreliquidationTypes) => void;
  getDetailPreliquidation: (id:number)=>void
};
export type WrapperPreliquidationPropsType = {
  isFetching: boolean;
  actualPage: PagesPreliquidationTypes;
};
export type PagesPreliquidationTypes = "preliquidation" | "invoice";
