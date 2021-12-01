export type ButtonProps = {
  children: string | JSX.Element | JSX.Element[];
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  icon?: any;
}