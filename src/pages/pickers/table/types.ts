import { PickerType } from "pages/pickers/types";

export type TableAdminPropsType = {
  tableTitles: string[];
  actualPage: string;
  pendingUsers: PickerType[];
};
