import React, { useCallback, useState } from "react";
// import useHistory from "hooks/useHistory";
import "./flowTransition.scss";

export default function FlowTransition({ pages, currentPage }: any) {
  // const [currentStep, setCurrentStep, goBack,previousPage] = useHistory([currentPage]);
  // const PageBefore = pages[previousPage[0]];
  
  
  // if(cambio){
    //     setTimeout(() => {
      //      setcambio(false)
      //     }, 500);
      
      // return  <div className="Test-Animacion"> 
      //           {/* <div className="animation-left-transaction"><PageBefore/></div>  */}
      //           <div className="asd"><Page/></div> 
      //         </div>
      // }
      //TODO: useHistory
      const [history, setHistory] = useState(currentPage || []);
      
      const [value, ...previousValues] = history;
      
      const undo = useCallback(() => {
        // useCallback is used for performance reasons
        // https://reactjs.org/docs/hooks-reference.html#usecallback
        setHistory(previousValues);
      }, [setHistory, previousValues]);
      
      const setValue = useCallback(
        (newValue) => {
          //  initialHistory[1](true)
          setHistory([newValue, ...history]);
        },
        [history, setHistory],
        );
        
        const Page = pages[value];
        return <Page next={setValue} back={undo}/>;
        
        // return   <div className="animation-left-transaction">
        //   prev && <PrevPage/>
        //   <Page/>
        //   next && <NextPage/>
        // </div>;
        // return  <Page/>;
      }