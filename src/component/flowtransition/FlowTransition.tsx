import classNames from "classnames";
import { useCallback, useState } from "react";
import "./flowTransition.scss";
import { FlowTrasitionType } from "./types";

export default function FlowTransition({
  pages,
  firstPage,
}: FlowTrasitionType) {
  const [history, setHistory] = useState([firstPage] || []);
  const [animationLeft, setAnimationLeft] = useState(false);
  const [animationRight, setAnimationRight] = useState(false);
  const [value, ...previousValues] = history;

  const undo = useCallback(() => {
    // useCallback is used for performance reasons
    // https://reactjs.org/docs/hooks-reference.html#usecallback
    setAnimationRight(true);
    setTimeout(() => {
      setHistory(previousValues);
      setAnimationRight(false);
    }, 300);
  }, [setHistory, previousValues]);

  const setValue = useCallback(
    (newValue) => {
      setAnimationLeft(true);
      setTimeout(() => {
        setHistory([newValue, ...history]);
        setAnimationLeft(false);
      }, 300);
    },
    [history, setHistory]
  );

  const Page = pages[value];
  return (
    <div className={"content"}>
      <div
        className={classNames({
          "active-left": animationLeft,
          "active-right": animationRight,
        })}
      >
        <Page next={setValue} back={undo} />
      </div>
    </div>
  );
}
