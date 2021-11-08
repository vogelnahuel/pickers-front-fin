import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { Modal } from "@pickit/pickit-components";
import "component/modal/notificationModal.scss";
import {
  selectors as notificationSelectors,
  actions as notificationActions,
} from "reducers/notification";
import i18next from "i18next";

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
  element,
}) => {
  const cerrarModal = useCallback(
    (e) => {
      if (e.keyCode === 27 && (level === "warning" || level === "info")) {
        e.preventDefault();
        setClose();
      } else if (
        (e.keyCode === 27 || e.keyCode === 13) &&
        (level === "success" || level === "error")
      ) {
        e.preventDefault();
        setClose();
      }
    },
    [setClose, level]
  );

  useEffect(() => {
    if (isOpen) {
      if (element) {
        element.blur();
      }
      document.addEventListener("keydown", (e) => cerrarModal(e, level));
    }
    return () => {
      document.removeEventListener("keydown", cerrarModal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return isOpen ? (
    <div className="modal-notification-background">
      <Modal width="750px" height="304px" isOpen={isOpen}>
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
              {i18next.t(onClickLabel)}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  ) : null;
};

const mapStateToProps = (state) => ({
  isOpen: notificationSelectors.isOpen(state),
  onCloseLabel: notificationSelectors.getOnCloseLabel(state),
  onClickLabel: notificationSelectors.getOnClickLabel(state),
  level: notificationSelectors.getLevel(state),
  title: notificationSelectors.getTitle(state),
  body: notificationSelectors.getBody(state),
  onClick: notificationSelectors.onClick(state),
  onClose: notificationSelectors.onClose(state),
  element: notificationSelectors.element(state),
});

const mapDispatchToProps = (dispatch) => ({
  setOpen: () => {
    dispatch(notificationActions.showNotification());
  },
  setClose: () => {
    dispatch(notificationActions.hideNotification());
  },
  doAction: (action) => {
    action && action();
    dispatch(notificationActions.hideNotification());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationModal);
