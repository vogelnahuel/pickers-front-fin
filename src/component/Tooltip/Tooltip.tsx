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

const Tooltip = ({
  children,
  message,
  position = ToolTipPosition.bottom,
}: ToolTipProps) => {
  const tipRef = useRef<HTMLDivElement | null>(null);
  const childRef = useRef<HTMLDivElement | null>(null);

  const getPosition = () => {
    if (!childRef.current || !tipRef.current) return null;

    const { x, y, width, height } = childRef.current.getBoundingClientRect();
    const { width: tipWidth, height: tipHeight } =
      tipRef.current.getBoundingClientRect();

    switch (position) {
      case ToolTipPosition.bottom:
        return {
          top: `${y + height + 14}px`,
          left: `${x + width / 2}px`,
        };
      case ToolTipPosition.top:
        return {
          top: `${y - height - tipHeight + 2}px`,
          left: `${x + width / 2}px`,
        };
      case ToolTipPosition.left:
        return {
          top: `${y + height / 2 - tipHeight / 2}px`,
          left: `${x - tipWidth - 8}px`,
        };
      case ToolTipPosition.right:
        return {
          top: `${y + height / 2 - tipHeight / 2}px`,
          left: `${x + width + 8}px`,
        };
    }
  };

  const handleMouseEnter = () => {
    if(!tipRef.current) return;
    tipRef.current.style.display = "flex";
    const pos = getPosition();
    if (pos) {
      tipRef.current.style.top = pos.top;
      tipRef.current.style.left = pos.left;
      tipRef.current.style.opacity = "1";
    }
  };
  const handleMouseLeave = () => {
    if (tipRef.current && childRef.current) {
      tipRef.current.style.opacity = "0";
      tipRef.current.style.display = "none";
    }
  };

  const contentClasses = ["tooltip-content", position].join(" ");
  const arrowClasses = ["tooltip-arrow", position].join(" ");

  return (
    <>
      <div className="tooltip-container">
        <div
          ref={childRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </div>
      </div>
      <div className={contentClasses} ref={tipRef}>
        <div className={arrowClasses} />
        {message}
      </div>
    </>
  );
};

export default Tooltip;
