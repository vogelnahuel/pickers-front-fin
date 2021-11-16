import { NotificationStateType } from "reducers/types/notification";
import { ParamsMiddlewareType } from "../types";

export type ExportActionPropsType = {
  isDirty?: boolean;
  getPendingUserPickerExport: () => void;
  showNotification?: (content: NotificationStateType) => void;
};
