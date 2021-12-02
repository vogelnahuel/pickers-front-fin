import { NotificationStateType } from "reducers/types/notification";


export type TabControlerType = {
  isDirty?: boolean;
  actualPage?: string;
  showNotification: (notification: NotificationStateType) => void;
  wrongFiles?: boolean;
  changePage: (page:string, isDirty?:boolean) => void;
  tabs: Array<TabType>;
};

export type TabType = {
  title: string;
  id: string;
  icons: { active: string; disable: string };
};
