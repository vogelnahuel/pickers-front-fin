import { NotificationStateType } from "reducers/types/notification";

export type NavType = {
  isDirty?: boolean | null;
  showNotification?: ((notification: NotificationStateType) => void) | null;
  wrongFiles?: boolean;
};
