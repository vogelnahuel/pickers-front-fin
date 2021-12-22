import {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import i18next from "i18next";
import Button from "component/button/Button";
import uploadCloud from "../../assets/upload_cloud.svg";
import uploadArrow from "../../assets/upload_arrow.svg";
import uploadError from "../../assets/upload_error.svg";
import "./pdfController.scss";
import { PdfControllerProps } from "./types";

const PdfController = forwardRef(
  (
    {
      children,
      fileUploaded,
      showError,
      errorMessage,
      title,
      buttonText,
      loading,
      goToPreviousFile,
      fileHandler,
    }: PdfControllerProps,
    ref
  ) => {
    const dropRef = useRef<HTMLDivElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);
    const dragCounter = useRef<number>(0);

    const openFileReader = (
      e?: React.MouseEvent<HTMLButtonElement> | undefined
    ): void => {
      e?.preventDefault();
      e?.stopPropagation();
      if (fileRef.current) fileRef.current.click();
    };

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      const file: File = (target.files as FileList)[0];

      if (!file) return;

      target.value = "";
      fileHandler(file);
    };

    // Evitar la funcionalidad por defecto. Abre el dropped file
    const handleDrag = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDragIn = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      // Si dentro del contenedor de "Drag and Drop" hay muchos childs,
      // se va a disparar este evento por cada uno de ellos.
      dragCounter.current = dragCounter.current + 1;

      // En caso que el evento contenga algun archivo
      if (e?.dataTransfer?.items && e.dataTransfer?.items?.length > 0) {
        setDragging(true);
      }
    };
    const handleDragOut = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      dragCounter.current = dragCounter.current - 1;

      // Solo se suelta el draggging cuando se sale del ultimo elemento
      // ya que dicho container puede tener muchos child y dicho evento
      // es lanzado cada vez que sale de cada uno de los child.
      if (dragCounter.current === 0) setDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      if (e?.dataTransfer?.files && e?.dataTransfer.files.length > 0) {
        dragCounter.current = 0;
        fileHandler(e.dataTransfer.files[0]);
        e.dataTransfer.clearData();
      }
    };

    const hasError = () => showError && !dragging && !loading;
    const showFile = () => fileUploaded && !dragging && !loading && !showError;

    useImperativeHandle(ref, () => ({
      triggerOnChange: () => openFileReader(),
    }));

    useEffect(() => {
      const div = dropRef.current;

      if (!div) return;

      div.addEventListener("dragenter", handleDragIn);
      div.addEventListener("dragleave", handleDragOut);
      div.addEventListener("dragover", handleDrag);
      div.addEventListener("drop", handleDrop);

      return () => {
        div.removeEventListener("dragenter", handleDragIn);
        div.removeEventListener("dragleave", handleDragOut);
        div.removeEventListener("dragover", handleDrag);
        div.removeEventListener("drop", handleDrop);
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const rootContainerClasses = [
      "pdf-root-container",
      showFile() && "pdf-root-container-border",
    ].join(" ");

    const containerClasses = [
      "pdf-container-idle",
      dragging && "pdf-container-dragging",
      loading && "pdf-container-loading",
      hasError() && "pdf-container-error",
      showFile() && "pdf-container-hidden",
    ].join(" ");

    return (
      <div className={rootContainerClasses}>
        {showFile() && <div className="pdf-children-container">{children}</div>}
        <div ref={dropRef} className={containerClasses}>
          <div className="pdf-icon-container">
            {hasError() ? (
              <img
                className="pdf-upload-error-icon"
                src={uploadError}
                alt="upload-error-icon"
              />
            ) : (
              <div className="pdf-upload-icon">
                <img
                  className="pdf-upload-cloud"
                  src={uploadCloud}
                  alt="upload-icon"
                />
                <img
                  className="pdf-upload-arrow"
                  src={uploadArrow}
                  alt="upload-icon"
                />
              </div>
            )}
            <p className="pdf-title">
              {dragging
                ? i18next.t("component:label.pdfController.dragging")
                : title}
            </p>
          </div>
          <div className="pdf-content">
            <Button className="pdf-button" onClick={openFileReader}>
              {buttonText}
            </Button>
            {fileUploaded && showError ? (
              <button
                className="pdf-go-back"
                onClick={() => goToPreviousFile && goToPreviousFile()}
              >
                {i18next.t("component:label.pdfController.goBack")}
              </button>
            ) : (
              <p className="pdf-message">
                {i18next.t("component:label.pdfController.instruction")}
              </p>
            )}
          </div>
          {loading && (
            <div className="pdf-loading-container">
              <div className="pdf-loading-bar"></div>
            </div>
          )}
        </div>
        {hasError() && <p className="pdf-error-message">{errorMessage}</p>}
        <input
          type="file"
          ref={fileRef}
          className="pdf-hidden"
          accept=".pdf"
          onChange={onFileChange}
        />
      </div>
    );
  }
);

export default PdfController;
