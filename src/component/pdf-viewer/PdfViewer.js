import React, { useState,useEffect } from "react";
// Import the main component
// import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
// import { Worker } from '@react-pdf-viewer/core'; // install this library
import pdfFile from "./pdftest.pdf"
import "./PdfViewer.scss"
// import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
// import type { ToolbarSlot, TransformToolbarSlot } from '@react-pdf-viewer/toolbar';
// Import styles



export const PdfViewer = () => {

  // const defaultLayoutPluginInstance = defaultLayoutPlugin();
  // const toolbarPluginInstance = toolbarPlugin();
  const [pdfState, setPdfState] = useState({pdf:null,currentPage:1, zoom:1})
const [defaultPdfFile] = useState(pdfFile)

  return (
    <div  className="pdf-container">
       {/* show pdf conditionally (if we have one)  */}
       {/* {defaultPdfFile&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          <Viewer fileUrl={defaultPdfFile}
            plugins={[defaultLayoutPluginInstance,toolbarPluginInstance]} />
      </Worker></>} */}
{/* className="pdf-viewer"  */}
      <iframe id="test" src={pdfFile}></iframe>
 
      
    </div>
  );
};
