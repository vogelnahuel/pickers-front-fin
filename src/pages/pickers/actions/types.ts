import { NotificationStateType } from "reducers/types/notification";

export type ExportActionPropsType = {
  isDirty?: boolean;
  getPendingUserPickerExport: () => void;
  showNotification?: (content: NotificationStateType) => void;
};
