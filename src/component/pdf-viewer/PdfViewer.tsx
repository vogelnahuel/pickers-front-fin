// Import the main component
import { Viewer, Worker } from "@react-pdf-viewer/core"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
// Plugins
import {
  defaultLayoutPlugin,
  ToolbarProps,
  ToolbarSlot,
} from "@react-pdf-viewer/default-layout"; // install this library
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { RenderCurrentPageLabelProps } from "@react-pdf-viewer/page-navigation";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import React, { ReactElement, useState } from "react";
import nextPage from "../../assets/preli/nextPage.svg";
import prePage from "../../assets/preli/prePage.svg";
import zoomIn from "../../assets/preli/zoomIn.svg";
import zoomOut from "../../assets/preli/zoomOut.svg";
// import pdfFile from "./pdftest.pdf";
import "./PdfViewer.scss";

// Import styles

export const PdfViewer = (props: { src: string; children: any }) => {
  const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
    <Toolbar>
      {(slots: ToolbarSlot) => {
        const {
          CurrentPageLabel,
          GoToNextPage,
          GoToPreviousPage,
          ZoomIn,
          ZoomOut,
        } = slots;
        return (
          <div className="toolbar-container">
            <div>
              {/* <div className="zoom-container"> */}
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
              {/* </div> */}
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
                <CurrentPageLabel>
                  {(props: RenderCurrentPageLabelProps) => (
                    <span>{`${props.currentPage + 1} / ${
                      props.numberOfPages
                    }`}</span>
                  )}
                </CurrentPageLabel>
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
              {props.children.map((child: ReactElement, index: number) => {
                return (
                  <div key={index} className="child-button">
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

  const [defaultPdfFile] = useState(props.src);
  const toolbarPluginInstance = toolbarPlugin();

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
