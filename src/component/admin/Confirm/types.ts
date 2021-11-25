import { TagConfimationType } from "../ExpandableFile/types";

export type ConfirmPropsType = {
    tag: string;
    viewConfirm: any;
    optionNo:(tag:string,viewConfirm:TagConfimationType)=>void;
    optionYes:(tag:string,viewConfirm:TagConfimationType)=>void;
    labels:string[]
  }