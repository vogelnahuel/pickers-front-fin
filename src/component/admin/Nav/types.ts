import { NotificationStateType } from "reducers/types/notification";

export type NavType = {
  isDirty?: boolean | null;
  isInvoiceDirty?: boolean | null;
  pickerWrongFiles?: boolean;
  invoiceFileError?: boolean;
  showNotification?: ((notification: NotificationStateType) => void) | null;
};
