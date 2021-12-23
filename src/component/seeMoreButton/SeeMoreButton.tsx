import i18next from "i18next";
import { ButtonProps } from "./types";

import "./seeMoreButton.scss";

const SeeMoreButton = ({ onClick, disabled }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="see-more-button"
    >
      {i18next.t("global:label.button.seeMore")}
    </button>
  );
};

export default SeeMoreButton;
