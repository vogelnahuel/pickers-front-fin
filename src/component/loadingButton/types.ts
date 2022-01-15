export enum LoadingButtonState {
  Idle = 0,
  Loading,
  Success,
  Error
}

export type LoadingButtonProps = {
  children: string | JSX.Element | JSX.Element[];
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  status?: LoadingButtonState;
}