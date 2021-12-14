import i18next from "i18next";
import backIcon from "./../../assets/admin/PendingUser/volver.svg";
import { GoBackProps } from "./types";
import "./back.scss";

const Back = ({ onClick }: GoBackProps) => (
  <div className="back-container" onClick={onClick}>
    <img className="back-icon" src={backIcon} alt="back-icon" />
    <p className="back-text">
      {i18next.t("component:label.button.goBack")}
    </p>
  </div>
);

export default Back;