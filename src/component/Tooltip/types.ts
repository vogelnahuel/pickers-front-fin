import { ToolTipPosition } from './Tooltip';

export interface ToolTipProps {
  position?: ToolTipPosition;
  children: JSX.Element | JSX.Element[];
  message: string;
  testID?: string;
}

