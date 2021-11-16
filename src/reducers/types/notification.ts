import { NotificationLevel } from "component/modal/types";

export type NotificationStateType = {
  open?: boolean;
  level: NotificationLevel;
  title: string;
  body: string;
  onCloseLabel?: string;
  onClickLabel?: string;
  onClick?: Function;
  onClose?: Function;
};
