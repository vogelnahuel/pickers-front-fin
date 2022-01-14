import { StateHistoryProps } from "./types";
import React from "react";
import "./StateHistory.scss";
import { Link } from "react-router-dom";
import Cancel from "../../assets/transaction/Cancel.svg";
import Okey from "../../assets/transaction/Okey.svg";

const StateHistory: React.FC<StateHistoryProps> = ({
  history,
  cancelStatus,
  showCreatedDate,
  linkableStatus,
  tittle,
  subtittleMetadata,
  transaccion
}): JSX.Element => {
  return (
    <div >
      {tittle && <div> <h3 className="modal-transaction-h3">
        {tittle}
      </h3>
        <hr className="modal-transaction-separate-option " /></div>}
      <div className="history-container">
        {history.map((state) =>
          <div className={transaccion? "state-container-transaction":"state-container"}>
            <img className="image" src={cancelStatus?.includes(state.reasonTag.tag) ? Cancel : Okey} />
            <div className="state-name">
              <p>{state.reasonTag.label ? state.reasonTag.label : state.reasonTag.tag}{!subtittleMetadata && state.metadata?.length > 0 ? `. Motivo: ${state.metadata[0].value.toLocaleLowerCase()}` : ""}</p>
              <p className="created-date"> {state.createdAt}</p>
              {linkableStatus && linkableStatus.tags.includes(state.reasonTag.tag) && (
                <Link
                  target="_blank"
                  style={{ textDecoration: "none" }}
                  className="modal-transaction-a"
                  to={state.curentValue ? `/${linkableStatus.link}/${state.curentValue}` : "#"}
                >
                  {linkableStatus.label}
                </Link>
              )}
            </div><div className="metadata">
              {subtittleMetadata && state.metadata?.length > 0 && <p> {state.metadata[0].value.toLocaleLowerCase()}</p>}
            </div></div>
        )}

      </div>
    </div>
  );
};
export default StateHistory;
