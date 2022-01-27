import { HistoryType } from "sagas/types/detailTransactions";

export type StateHistoryProps = {
  history: HistoryType[];
  cancelStatus?: string[];
  linkableStatus?:LinkableStatus;
  title?: string;
  showMetadata?: boolean;
  transaccion?: boolean;
}
export type LinkableStatus = {
  tags: string[],
  link: string,
  label: string
}