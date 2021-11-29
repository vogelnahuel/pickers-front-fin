import React, { useRef } from "react";
import { ToolTipProps } from "./types";
import styles from "./styles.module.scss";
import "./tooltip.scss";

export enum ToolTipPosition {
  right = "right",
  bottom = "bottom",
  left = "left",
  top = "top",
}

const Tooltip = ({ children, message, position = ToolTipPosition.bottom }: ToolTipProps) => {
  const tipRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    if(tipRef.current) tipRef.current.style.opacity = "1";
  };
  const handleMouseLeave = () => {
    if(tipRef.current) tipRef.current.style.opacity = "0";
  };

  const contentClasses = ["tooltip-content", position].join(" ");
  const arrowClasses = ["tooltip-arrow", position].join(" ");

  return (
    <div
      className="tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={contentClasses} ref={tipRef}>
        <div className={arrowClasses} />
        {message}
      </div>
      {children}
    </div>
  );
};

export default Tooltip;
