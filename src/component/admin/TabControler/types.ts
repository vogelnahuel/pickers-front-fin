import { NotificationStateType } from "reducers/types/notification";

export type TabControlerType = {
  isDirty?: boolean;
  actualPage?: string;
  showNotification: (notification: NotificationStateType) => void;
  wrongFiles?: boolean;
  changePage: Function;
  tabs?:any,
};
