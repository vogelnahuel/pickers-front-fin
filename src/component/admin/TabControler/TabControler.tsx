import React from "react";
import "component/admin/TabControler/TabControler";
import { connect } from "react-redux";
import { actions as notificationActions } from "reducers/notification";
import { AppDispatch } from "store";
import { TabControlerType } from "./types";
import i18next from "i18next";
import "./TabControler.scss";
import { NotificationStateType } from "reducers/types/notification";
import classNames from "classnames";

export const TabControler: React.FC<TabControlerType> = ({
  actualPage,
  changePage,
  tabs,
  clickable
}) => (
  <div 
  className="flex-tab background-tab">
    <div
      onClick={() => changePage(tabs && tabs[0].id,clickable)}
      className = { classNames({' container-tag-active ':actualPage === tabs[0].id , 'container-tag':actualPage !== tabs[0].id})}
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
      onClick={() => changePage(tabs && tabs[1].id,clickable)}
      className = { classNames("border-tag",{' container-tag-active':actualPage === tabs[1].id , 'container-tag':actualPage !== tabs[1].id})}
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

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  showNotification: (content: NotificationStateType) => {
    dispatch(notificationActions.showNotification(content));
  },
});

export default connect(null, mapDispatchToProps)(TabControler);
