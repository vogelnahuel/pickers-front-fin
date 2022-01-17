import { NotificationStateType } from "reducers/types/notification";
import {
  DetailPreliquidationType,
} from "reducers/types/preliquidation";
import { PagesPreliquidationTypes } from "../types";

export type DetailPreliquidationContainerPropsType = {
  isFetching: boolean;
  actualPage: PagesPreliquidationTypes;
  preliquidation: DetailPreliquidationType;
  showNotification: (notification: NotificationStateType) => void;
  setActualPage: (page: PagesPreliquidationTypes) => void;
  getDetailPreliquidation: (id:number) => void;
  detailPreliquidation: any;// DetailPreliquidationShortType | DetailPreliquidationType;
};
export type DetailPreliquidationPropsType = {
  presettementId?: string;
  actualPage: PagesPreliquidationTypes;
  preliquidation: DetailPreliquidationType;
  initialValues: DetailPreliquidationForm;
  changePage: (page: PagesPreliquidationTypes) => void;
  handleClickBack:()=>void;
  detailPreliquidation:DetailPreliquidationType;
};

export type DetailPreliquidationForm = {
  status: string;
  emisionDate: string;
  fiscalNumber: string;
  companyName: string;
  sapCode: string;
}