import { ReactElement, useMemo } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import {
  defaultLayoutPlugin,
  ToolbarProps,
  ToolbarSlot,
} from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { RenderCurrentPageLabelProps } from "@react-pdf-viewer/page-navigation";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import nextPage from "../../assets/preli/nextPage.svg";
import prePage from "../../assets/preli/prePage.svg";
import zoomIn from "../../assets/preli/zoomIn.svg";
import zoomOut from "../../assets/preli/zoomOut.svg";
import "./PdfViewer.scss";
import { PdfViewerPropsTypes } from "./types";

export const PdfViewer = (props: PdfViewerPropsTypes) => {
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
            <div className="zoom-container">
              <div>
                <ZoomOut>
                  {(props) => (
                    <img
                      src={zoomOut}
                      className="zoom-button"
                      onClick={props.onClick}
                      alt="zoom out button"
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
                      alt="zoom in button"
                    ></img>
                  )}
                </ZoomIn>
              </div>
            </div>
            <div className="page-navigator-container">
              <div className="page-navigator">
                <GoToPreviousPage>
                  {(props) => (
                    <img
                      // disabled={props.isDisabled}
                      onClick={props.onClick}
                      src={prePage}
                      alt="previus page button"
                    ></img>
                  )}
                </GoToPreviousPage>
              </div>
              <div className="page-number">
                <CurrentPageLabel>
                  {(props: RenderCurrentPageLabelProps) => (
                    <span>{`${props.currentPage + 1} / ${
                      props.numberOfPages
                    }`}</span>
                  )}
                </CurrentPageLabel>
              </div>
              <div className="page-navigator">
                <GoToNextPage>
                  {(props) => (
                    <img
                      // disabled={props.isDisabled}
                      onClick={props.onClick}
                      src={nextPage}
                      alt="next page button"
                    ></img>
                  )}
                </GoToNextPage>
              </div>
            </div>
            <div className="buttons-container">
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

  const toolbarPluginInstance = toolbarPlugin();

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
  });

  const plugins = useMemo(
    () => [defaultLayoutPluginInstance, toolbarPluginInstance],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.src]
  );

  return (
    <div className="pdf-container">
      {props.src && (
        <>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
            <Viewer fileUrl={props.src} plugins={plugins} />
          </Worker>
        </>
      )}
    </div>
  );
};
