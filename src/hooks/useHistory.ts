import { useState, useCallback } from "react";

export default function useHistory(initialHistory:any) {
    const [history, setHistory] = useState(initialHistory || []);

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
        [history, setHistory],
    );

    return [value, setValue, undo, previousValues];
}