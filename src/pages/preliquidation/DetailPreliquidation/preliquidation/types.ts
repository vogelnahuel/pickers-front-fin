import { NotificationStateType } from "reducers/types/notification";
import { DetailPreliquidationShortType, DetailPreliquidationType } from "reducers/types/preliquidation";
import { PagesPreliquidationTypes } from "../types";

export type DetailPreliquidationContainerPropsType = {
  isFetching: boolean;
  actualPage:PagesPreliquidationTypes;
  showNotification: (notification: NotificationStateType) => void;
  setActualPage: (page: PagesPreliquidationTypes) => void;
  getDetailPreliquidation: (id:number) => void;
  detailPreliquidation: any;// DetailPreliquidationShortType | DetailPreliquidationType;
};
export type DetailPreliquidationPropsType = {
  presettementId?:string
  changePage: (page: PagesPreliquidationTypes) => void;
  handleClickBack:()=>void;
  actualPage:PagesPreliquidationTypes;
  detailPreliquidation:any;//DetailPreliquidationShortType | DetailPreliquidationType;
  initialValues:any;
};
