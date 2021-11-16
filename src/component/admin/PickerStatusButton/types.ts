import { NotificationStateType } from "reducers/types/notification";

export type PickerStatusButtonType = {
  isDirty: boolean;
  actualPage: string;
  showNotification: (notification: NotificationStateType) => void;
  setActualPage: Function;
  isDetail?: boolean;
};
