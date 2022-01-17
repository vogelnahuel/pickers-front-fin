import { HistoryType } from "sagas/types/detailTransactions";

export type StateHistoryProps<T> = {
  history: HistoryType[];
  cancelStatus?: string[];
  showCreatedDate?: boolean;
  linkableStatus?:LinkableStatus;
  title?: string;
  subtitleMetadata?: boolean;
  transaccion?: boolean;
}
export type LinkableStatus = {
  tags: string[],
  link: string,
  label: string
}