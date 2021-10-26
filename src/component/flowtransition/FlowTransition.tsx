import React from "react";
import "./flowTransition.css";

export default function FlowTransition({ pages, currentPage }: any) {
  const Page = pages[currentPage];
  return <div className="animation-left-transaction"><Page/></div>;
}