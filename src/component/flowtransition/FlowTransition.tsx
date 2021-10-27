import React from "react";
import "./flowTransition.scss";

export default function FlowTransition({ pages, currentPage,cambio,previousPage,setcambio }: any) {
  const Page = pages[currentPage];
  const PageBefore = pages[previousPage[0]];
  

  if(cambio){
      setTimeout(() => {
       setcambio(false)
      }, 50000);
    
    return  <div className="Test-Animacion"> 
              <div className="animation-left-transaction"><PageBefore/></div> 
              <div className="asd"><Page/></div> 
            </div>
  }
 
  return  cambio  ? <div className="animation-left-transaction"><Page/></div> : <Page/>;
}