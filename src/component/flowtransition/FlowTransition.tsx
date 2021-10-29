import React, { useCallback, useState } from "react";
import "./flowTransition.scss";
import { FlowTrasitionType } from "./types";

export default function FlowTransition({ pages, firstPage }: FlowTrasitionType) {

  const [history, setHistory] = useState([firstPage] || []);
  const [value, ...previousValues] = history;

  const undo = useCallback(() => {
    // useCallback is used for performance reasons
    // https://reactjs.org/docs/hooks-reference.html#usecallback
    setHistory(previousValues);
  }, [setHistory, previousValues]);

  const setValue = useCallback(
    // animation true 
    // value (pagina actual ) animacion
    // setTimeout (

      (newValue) => {
        setHistory([newValue, ...history]);
      },
    //   ,500
    // )
    [history, setHistory]
  );

  const Page = pages[value];
  return <Page className="lizan" next={setValue} back={undo} />;
}
