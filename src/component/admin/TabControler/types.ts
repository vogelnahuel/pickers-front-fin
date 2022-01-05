import { NotificationStateType } from "reducers/types/notification";


export type TabControlerType = {
  actualPage: string;
  tabs: Array<TabType>;
  showNotification?: (notification: NotificationStateType) => void;
  changePage: <T extends string>(page: T) => void;
  clickable?: boolean;
};

export type TabType = {
  title: string;
  id: string;
  icons: { active: string; disable: string };
};
