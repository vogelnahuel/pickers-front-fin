export type NotificationLevel = "warning" | "info" | "success" | "error";

export type NotificationType = {
  isOpen: boolean;
  level: NotificationLevel;
  title: string;
  body: string;
  onCloseLabel?: string;
  onClickLabel?: string;
  onClick: Function | undefined;
  onClose: Function | undefined;
  setClose: Function;
  doAction: Function;
};

export const KEYS = {
  ENTER: 13,
  ESC: 27,
};
