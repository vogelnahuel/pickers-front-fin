import { useState, useRef, useEffect, useCallback } from "react";
import { StateHistoryProps } from "./types";
import "./StateHistory.scss";
import { Link } from "react-router-dom";
import Cancel from "../../assets/transaction/Cancel.svg";
import Okey from "../../assets/transaction/Okey.svg";
import classNames from "classnames";
import i18next from "i18next";

export function StateHistory({
  history,
  cancelStatus,
  linkableStatus,
  title,
  showMetadata,
  transaccion,
}: StateHistoryProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [firstUpdate, setFirstUpdate] = useState(false);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, history.length);
    if (itemsRef.current.length > 0) setFirstUpdate(true);
  }, [history]);

  const onExpandHandler = (stateId: number, i: number) => {
    const expandable = isExpandable(i);
    if (!expandable) return;

    if (stateId === expandedId) setExpandedId(null);
    else setExpandedId(stateId);
  };

  const isExpandable = useCallback(
    (i: number) => {
      const paragraph = getElement(i);
      const lineHeight = 19;
      if (paragraph) return paragraph.scrollHeight > 2 * lineHeight;

      return false;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [history, firstUpdate]
  );

  const getElement = (i: number) => {
    const elem = itemsRef.current[i];
    if (elem) {
      const child = elem.children[0];
      if (child) return child;
    }
    return null;
  };

  return (
    <div>
      {title && (
        <div>
          <h3 className="modal-history-h3">{title}</h3>
          <hr className="modal-history-separate-option" />
        </div>
      )}
      <div className="history-container">
        {history.map((state, i) => (
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
                {!showMetadata && state.metadata?.length > 0
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
            <div
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className={classNames("metadata", {
                expanded: expandedId === state.id,
                expandable: isExpandable(i),
              })}
            >
              {showMetadata && state.metadata?.length > 0 && (
                <>
                  <p className="metadata-text">{state?.metadata[0].value}</p>
                  {isExpandable(i) && (
                    <p
                      className="see-more-label"
                      onClick={() => onExpandHandler(state.id, i)}
                    >
                      {expandedId !== state.id
                        ? i18next.t("component:label.button.seeMore")
                        : i18next.t("component:label.button.seeLess")}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
