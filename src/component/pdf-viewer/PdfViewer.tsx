import React, { useState, useEffect, ReactElement, Children } from "react";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library
// import pdfFile from "./pdftest.pdf";
import "./PdfViewer.scss";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { ToolbarProps, ToolbarSlot } from "@react-pdf-viewer/default-layout";
import zoomIn from "../../assets/preli/zoomIn.svg";
import zoomOut from "../../assets/preli/zoomOut.svg";
import prePage from "../../assets/preli/prePage.svg";
import nextPage from "../../assets/preli/nextPage.svg";

// Import styles

export const PdfViewer = (props: any) => {
  const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
    <Toolbar>
      {(slots: ToolbarSlot) => {
        const {
          CurrentPageLabel,
          CurrentScale,
          Download,
          GoToNextPage,
          GoToPreviousPage,
          NumberOfPages,
          ZoomIn,
          ZoomOut,
        } = slots;
        return (
          <div className="toolbar-container">
            <div>
              <ZoomOut>
                {(props) => (
                  <img
                    src={zoomOut}
                    className="zoom-button"
                    onClick={props.onClick}
                    alt=""
                  ></img>
                )}
              </ZoomOut>
            </div>
            <div>
              <ZoomIn>
                {(props) => (
                  <img
                    src={zoomIn}
                    className="zoom-button"
                    onClick={props.onClick}
                    alt=""
                  ></img>
                )}
              </ZoomIn>
            </div>
            <div className="page-navigator-container">
              <div className="page-navigator-button-container">
                <GoToPreviousPage>
                  {(props) => (
                    <img
                      className="page-navigator"
                      // disabled={props.isDisabled}
                      onClick={props.onClick}
                      src={prePage}
                      alt=""
                    ></img>
                  )}
                </GoToPreviousPage>
              </div>
              <div className="current-page-label">
                <CurrentPageLabel /> / <NumberOfPages/>
              </div>
              <div>
                <GoToNextPage>
                  {(props) => (
                    <img
                      className="page-navigator"
                      // disabled={props.isDisabled}
                      onClick={props.onClick}
                      src={nextPage}
                      alt=""
                    ></img>
                  )}
                </GoToNextPage>
              </div>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              {props.children.map((child: any) => {
                return (
                  <div
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    {child}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
    </Toolbar>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
  });
  const toolbarPluginInstance = toolbarPlugin();

  const [defaultPdfFile] = useState(props.src);

  return (
    <div className="pdf-container">
      {defaultPdfFile && (
        <>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
            <Viewer
              fileUrl={defaultPdfFile}
              plugins={[defaultLayoutPluginInstance, toolbarPluginInstance]}
            />
          </Worker>
        </>
      )}
    </div>
  );
};
