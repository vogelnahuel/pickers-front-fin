import React from "react";

export default function FlowTransition({ pages, currentPage }: any) {
  const Page = pages[currentPage];
  return <Page />;
}

FlowTransition.defaultProps = {
  pages: [],
  currentPage: 0,
};
