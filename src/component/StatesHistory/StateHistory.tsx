import { useState } from "react";
import { StateHistoryProps } from "./types";
import "./StateHistory.scss";
import { Link } from "react-router-dom";
import Cancel from "../../assets/transaction/Cancel.svg";
import Okey from "../../assets/transaction/Okey.svg";
import classNames from "classnames";

export function StateHistory<T>({
  history,
  cancelStatus,
  showCreatedDate,
  linkableStatus,
  title,
  subtitleMetadata,
  transaccion,
}: StateHistoryProps<T>) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const onExpandHandler = (stateId: number) => {
    if(stateId === expandedId) setExpandedId(null);
    else setExpandedId(stateId);
  }

  return (
    <div>
      {title && (
        <div>
          <h3 className="modal-history-h3">{title}</h3>
          <hr className="modal-history-separate-option" />
        </div>
      )}
      <div className="history-container">
        {history.map((state) => (
          <div
            key={state.id}
            className={
              transaccion ? "state-container transaction" : "state-container"
            }
          >
            <img
              className="image"
              alt="state"
              src={cancelStatus?.includes(state.reasonTag.tag) ? Cancel : Okey}
            />
            <div className="state-name">
              <p>
                {state.reasonTag.label
                  ? state.reasonTag.label
                  : state.reasonTag.tag}
                {!subtitleMetadata && state.metadata?.length > 0
                  ? state.metadata[0].value
                  : ""}
              </p>
              <p className="created-date"> {state.createdAt}</p>
              {linkableStatus &&
                linkableStatus.tags.includes(state.reasonTag.tag) && (
                  <Link
                    target="_blank"
                    style={{ textDecoration: "none" }}
                    className="modal-history-a"
                    to={
                      state.currentValue
                        ? `/${linkableStatus.link}/${state.currentValue}`
                        : "#"
                    }
                  >
                    {linkableStatus.label}
                  </Link>
                )}
            </div>
            <div className={classNames("metadata", { "expanded": expandedId === state.id})} >
              {subtitleMetadata && state.metadata?.length > 0 && (
                <p onClick={() => onExpandHandler(state.id)}> {state?.metadata[0].value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
