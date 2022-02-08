import React from "react";
import { CheckboxProps } from "./types";
import "./checkbox.scss";

const Checkbox = ({ label, checked, ...others }: CheckboxProps) => {
  return (
    <label className="checkbox-container">
      <input
        className="checkbox-input"
        type="checkbox"
        checked={checked}
        {...others}
      />
      {label && <span className="checkbox-text">{label}</span>}
    </label>
  );
};

export default Checkbox;
