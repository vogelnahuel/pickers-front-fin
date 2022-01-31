import { NotificationStateType } from "reducers/types/notification";
import {
  DetailPreliquidationType,
} from "reducers/types/preliquidation";
import { PagesPreliquidationTypes } from "../types";

export type DetailPreliquidationContainerPropsType = {
  isFetching: boolean;
  actualPage: PagesPreliquidationTypes;
  preliquidation: DetailPreliquidationType;
  toggleModalVisibility: (isOpen: boolean) => void;
  showNotification: (notification: NotificationStateType) => void;
  setActualPage: (page: PagesPreliquidationTypes) => void;
  getDetailPreliquidation: (id:number) => void;
  setDirty: (dirty: boolean) => void;
};
export type DetailPreliquidationPropsType = {
  presettementId?: string;
  actualPage: PagesPreliquidationTypes;
  preliquidation: DetailPreliquidationType;
  initialValues: DetailPreliquidationForm;
  changePage: (page: PagesPreliquidationTypes) => void;
  handleClickBack: () => void;
  toggleModalVisibility: (isOpen: boolean) => void;
};

export type DetailPreliquidationForm = {
  status: string;
  emisionDate: string;
  fiscalNumber: string;
  companyName: string;
  sapCode: string;
}