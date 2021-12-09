import React from "react";
import "component/admin/TabControler/TabControler";
// import { useHistory } from "react-router-dom";
import {
  detailPickerSelector as pendingUserAdminPickerSelectors,
  hasPickerWrongFilesSelector,
} from "reducers/detailPicker";
import { connect } from "react-redux";
import { actions as notificationActions } from "reducers/notification";
import { AppDispatch, RootState } from "store";
import { TabControlerType } from "./types";
import {
  actions as pendingUserActions,
  pickersSelector as pendingUserSelectors,
} from "reducers/pickers";
import i18next from "i18next";
import "./TabControler.scss"
import { NotificationStateType } from "reducers/types/notification";

export const TabControler: React.FC<TabControlerType> = ({
  actualPage,
  isDirty,
  changePage,
  tabs,
}) => {


  return (
      <div className="flex-tab background-tab">
        <div
          onClick={() => {
            changePage(tabs && tabs[0].id, isDirty);
          }}
          className="container-tag"
        >
          <p
            className={
              actualPage === tabs[0].id ? "table-title-active" : "table-title"
            }
          >
            {i18next.t(tabs ? tabs[0].title : "")}
          </p>
          {tabs && (
            <img
              className="img-buttons"
              src={
                tabs[0].icons && actualPage === tabs[0].id
                  ? tabs[0].icons.active
                  : tabs[0].icons.disable
              }
              alt=""
            />
          )}
        </div>

        <div
          onClick={() => {
            changePage(tabs && tabs[1].id, isDirty);
          }}
          className="container-tag border-tag"
        >
          <p
            className={
              actualPage === tabs[1].id ? "table-title-active" : "table-title"
            }
          >
            {i18next.t(tabs ? tabs[1].title : "")}
          </p>
          {tabs && (
            <img
              className="img-buttons"
              src={
                tabs[1].icons && actualPage === tabs[1].id
                  ? tabs[1].icons.active
                  : tabs[1].icons.disable
              }
              alt=""
            />
          )}
        </div>

     
      </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isDirty: pendingUserAdminPickerSelectors(state).dirty,
  actualPage: pendingUserSelectors(state).actualPage,
  wrongFiles: hasPickerWrongFilesSelector(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  showNotification: (content: NotificationStateType) => {
    dispatch(notificationActions.showNotification(content));
  },
  setActualPage: (page: string) => {
    dispatch(pendingUserActions.setActualPage(page));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TabControler);
