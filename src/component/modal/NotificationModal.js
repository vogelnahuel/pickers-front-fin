import React from 'react';
import { connect } from "react-redux";
import {Modal} from "@pickit/pickit-components";
import button from "assets/admin/ActiveUserAdminPicker/button.svg";
import "component/modal/notificationModal.scss";
import { selectors as notificationSelectors, actions as notificationActions } from "reducers/notification";

export const NotificationModal= ({
                                     isOpen,
                                     onClose,
                                     onClick,
                                     level,
                                     title,
                                     setClose,
                                     doAction,
                                     body,
                                     onCloseLabel,
                                     onClickLabel
                                 }) => {

    return isOpen ? (
        <div className="modal-notification-background">
            <Modal
                width="750px"
                height="304px"
                isOpen={isOpen}
            >
                <div className={`modal-title ${level}`}>
                    <p>{title}</p>
                </div>
                <div className="modal-body-buttons">
                    <p>{body}</p>
                    <div>
                        { onCloseLabel &&
                        <button
                            onClick={onClose ? ()=>doAction(onClose) : ()=>setClose()}
                            className={`modal-button-cancel ${level} mh-10`}>
                            {onCloseLabel}
                        </button>
                        }
                        <button
                            onClick={onClick ? ()=>doAction(onClick) : ()=>setClose()}
                            className={`modal-button-submit ${level} mh-10`}>
                            {onClickLabel}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    ) : null;
}


const mapStateToProps = (state) => ({
    isOpen: notificationSelectors.isOpen(state),
    onCloseLabel: notificationSelectors.getOnCloseLabel(state),
    onClickLabel: notificationSelectors.getOnClickLabel(state),
    level: notificationSelectors.getLevel(state),
    title: notificationSelectors.getTitle(state),
    body: notificationSelectors.getBody(state),
    onClick: notificationSelectors.onClick(state),
    onClose: notificationSelectors.onClose(state),
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationModal);