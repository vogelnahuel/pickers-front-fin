import { Modal } from "@pickit/pickit-components";
import "component/modal/notificationModal.scss";
import i18next from "i18next";
import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import {
  actions as notificationActions,
  notificationSelector
} from "reducers/notification";
import { AppDispatch, RootState } from "store";
import { KEYS, NotificationType } from "./types";

export const NotificationModal = ({
  isOpen,
  onClose,
  onClick,
  level,
  title,
  setClose,
  doAction,
  body,
  onCloseLabel,
  onClickLabel,
}: NotificationType) => {
  const closeModal = useCallback(
    (e) => {
      e.stopPropagation();
      if (e.keyCode === KEYS.ESC && (level === "warning" || level === "info")) {
        e.preventDefault();
        setClose();
      } else if (
        (e.keyCode === KEYS.ESC || e.keyCode === KEYS.ENTER) &&
        (level === "success" || level === "error")
      ) {
        e.preventDefault();
        onClose ? doAction(onClose) : onClick ? doAction(onClick) : setClose();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setClose, level]
  );

  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", closeModal);

    return () => {
      document.removeEventListener("keydown", closeModal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-notification-background">
      <Modal
        width="750px"
        height="304px"
        isOpen={isOpen}
        onClose={() => onClose && onClose()}
      >
        <div className={`modal-title ${level}`}>
          <p>{title}</p>
        </div>
        <div className="modal-body-buttons">
          <p>{body}</p>
          <div>
            {onCloseLabel && (
              <button
                onClick={onClose ? () => doAction(onClose) : () => setClose()}
                className={`modal-button-cancel ${level} mh-10`}
              >
                {i18next.t(onCloseLabel)}
              </button>
            )}
            <button
              onClick={onClick ? () => doAction(onClick) : () => setClose()}
              className={`modal-button-submit ${level} mh-10`}
            >
              {i18next.t(onClickLabel || "")}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isOpen: notificationSelector(state).open || false,
  onCloseLabel: notificationSelector(state).onCloseLabel,
  onClickLabel: notificationSelector(state).onClickLabel,
  level: notificationSelector(state).level,
  title: notificationSelector(state).title,
  body: notificationSelector(state).body,
  onClick: notificationSelector(state).onClick,
  onClose: notificationSelector(state).onClose,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setClose: () => {
    dispatch(notificationActions.hideNotification());
  },
  doAction: (action: Function | undefined) => {
    action && action();
    dispatch(notificationActions.hideNotification());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationModal);
