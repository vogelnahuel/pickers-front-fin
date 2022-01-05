import { NotificationStateType } from "reducers/types/notification";
import { PagesPreliquidationTypes } from "../types";

export type DetailPreliquidationContainerPropsType = {
  isFetching: boolean;
  actualPage:PagesPreliquidationTypes;
  showNotification: (notification: NotificationStateType) => void;
  setActualPage: (page: PagesPreliquidationTypes) => void;
};
export type DetailPreliquidationPropsType = {
  presettementId?:string
  changePage: (page: PagesPreliquidationTypes) => void;
  handleClickBack:()=>void;
  actualPage:PagesPreliquidationTypes;
};
