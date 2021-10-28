import React, { useCallback, useState } from "react";
import "./flowTransition.scss";

export default function FlowTransition({ pages, currentPage }: any) {
  const [history, setHistory] = useState(currentPage || []);
  const [value, ...previousValues] = history;

  const undo = useCallback(() => {
    // useCallback is used for performance reasons
    // https://reactjs.org/docs/hooks-reference.html#usecallback
    setHistory(previousValues);
  }, [setHistory, previousValues]);

  const setValue = useCallback(
    (newValue) => {
      setHistory([newValue, ...history]);
    },
    [history, setHistory]
  );

  const Page = pages[value];
  return <Page next={setValue} back={undo} />;
}
