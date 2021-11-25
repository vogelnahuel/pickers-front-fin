import { TagConfimationType } from "../ExpandableFile/types";

export type ConfirmPropsType = {
  question: string;
  optionNo: () => void;
  optionYes: () => void;
};
