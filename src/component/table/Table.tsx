import React from "react";
import { TableProps } from "./types";
import "./table.scss";

const Table = ({ children, className, hoverEffect }: TableProps) => {
  const childrens = React.Children.map(children, (child) => child);

  if (React.Children.count(children) !== 2) {
    throw new Error("The table element must have only 2 child");
  }

  if (childrens[0].type !== "thead") {
    throw new Error("The first child of table element must be a thead");
  }

  if (childrens[1].type !== "tbody") {
    throw new Error("The second child of table element must be a tbody");
  }

  const classes = [
    "table-pickers",
    hoverEffect ? "table-hover" : "",
    className || "",
  ].join(" ");

  return <table className={classes}>{children}</table>;
};

export default Table;
