import React from "react";
import "component/admin/TabControler/TabControler";

import { TabControlerType } from "./types";
import i18next from "i18next";
import "./TabControler.scss";

import classNames from "classnames";

export function TabControler<T>({
  actualPage,
  changePage,
  tabs,
  clickable = true,
}: TabControlerType<T>) {
  return (
    <div className="flex-tab background-tab">
      <div
        id={tabs ? `tab-${tabs[0].id}` : ""}
        onClick={() => changePage(tabs && tabs[0].id)}
        className={classNames({
          "cursor-pointer": clickable,
          "container-tag-active ": actualPage === tabs[0].id,
          "container-tag": actualPage !== tabs[0].id,
        })}
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
        id={tabs ? `tab-${tabs[1].id}` : ""}
        onClick={() => changePage(tabs && tabs[1].id)}
        className={classNames("border-tag", {
          "cursor-pointer": clickable,
          "container-tag-active": actualPage === tabs[1].id,
          "container-tag": actualPage !== tabs[1].id,
        })}
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
}
