import { StateHistoryProps } from "./types";
import React from "react";
import "./StateHistory.scss";
import { Link } from "react-router-dom";
import Cancel from "../../assets/transaction/Cancel.svg";
import Okey from "../../assets/transaction/Okey.svg";

export function StateHistory<T>({
  history,
  cancelStatus,
  showCreatedDate,
  linkableStatus,
  title,
  subtitleMetadata,
  transaccion
}: StateHistoryProps<T>) {


  return (
    <div >
      {title && <div> <h3 className="modal-history-h3">
        {title}
      </h3>
        <hr className="modal-history-separate-option" /></div>}
      <div className="history-container">
        {history.map((state) =>
          <div className={transaccion ? "state-container transaction" : "state-container"}>
            <img className="image" src={cancelStatus?.includes(state.reasonTag.tag) ? Cancel : Okey} />
            <div className="state-name">
              <p>{state.reasonTag.label ? state.reasonTag.label : state.reasonTag.tag}{!subtitleMetadata && state.metadata?.length > 0 ? state.metadata[0].value : ""}</p>
              <p className="created-date"> {state.createdAt}</p>
              {linkableStatus && linkableStatus.tags.includes(state.reasonTag.tag) && (
                <Link
                  target="_blank"
                  style={{ textDecoration: "none" }}
                  className="modal-history-a"
                  to={state.currentValue ? `/${linkableStatus.link}/${state.currentValue}` : "#"}
                >
                  {linkableStatus.label}
                </Link>
              )}
            </div><div className="metadata">
              {subtitleMetadata && state.metadata?.length > 0 && <p> {state?.metadata[0].value}</p>}
            </div></div>
        )}

      </div>
    </div>
  );
};