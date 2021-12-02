import i18next from "i18next";
import { ButtonProps } from "./types";
import classnames from "classnames";
import "./seeMoreButton.scss";

const SeeMoreButton = ({ onClick, disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={classnames("see-more-button", {
        disabled: disabled,
      })}
    >
      {i18next.t("global:label.button.seeMore")}
    </button>
  );
};

export default SeeMoreButton;
