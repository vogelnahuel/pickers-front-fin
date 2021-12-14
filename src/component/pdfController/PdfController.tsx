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
      fileLoaded,
      showError,
      errorMessage,
      title,
      buttonText,
      fileHandler,
    }: PdfControllerProps,
    ref
  ) => {
    const dropRef = useRef<HTMLDivElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    //const [error, setError] = useState<string | null>(null);
    const [, setDragCounter] = useState(0);

    const openFileReader = () => {
      if (fileRef.current) fileRef.current.click();
    };

    const handleFile = async (file: File) => {
      console.log("File: ", file);
      setLoading(true);
      await fileHandler(file);
      setLoading(false);
      // TODO: Convertirlo a base 64 y actualizar la url desde afuera
    };

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      const file: File = (target.files as FileList)[0];

      if (!file) return;

      target.value = "";
      handleFile(file);
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
      setDragCounter((prev) => prev + 1);
      // En caso que el evento contenga algun archivo
      if (e?.dataTransfer?.items && e.dataTransfer?.items?.length > 0) {
        setDragging(true);
      }
    };
    const handleDragOut = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragCounter((prev) => {
        // Solo se suelta el draggging cuando se sale del ultimo elemento
        // ya que dicho container puede tener muchos child y dicho evento
        // es lanzado cada vez que sale de cada uno de los child.
        if (prev === 1) setDragging(false);
        return prev - 1;
      });
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      if (e?.dataTransfer?.files && e?.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
        e.dataTransfer.clearData();
        setDragCounter(0);
      }
    };

    const hasError = () => showError && !dragging && !loading;
    const showFile = () => fileLoaded && !dragging && !loading;

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
      "root-container",
      showFile() && "root-container-border"
    ].join(" ");

    const containerClasses = [
      "container",
      dragging && "container-dragging",
      loading && "container-loading",
      hasError() && "container-error",
    ].join(" ");

    return (
      <div className={rootContainerClasses}>
        {showFile() ? (
          children
        ) : (
          <>
            <div ref={dropRef} className={containerClasses}>
              <div className="icon-container">
                {hasError() ? (
                  <img
                    className="upload-error-icon"
                    src={uploadError}
                    alt="upload-error-icon"
                  />
                ) : (
                  <div className="upload-icon">
                    <img
                      className="upload-cloud"
                      src={uploadCloud}
                      alt="upload-icon"
                    />
                    <img
                      className="upload-arrow"
                      src={uploadArrow}
                      alt="upload-icon"
                    />
                  </div>
                )}
                <p className="title">
                  {dragging
                    ? i18next.t("component:label.pdfController.dragging")
                    : title}
                </p>
              </div>
              <div className="content">
                <Button onClick={openFileReader}>{buttonText}</Button>
                <p className="message">
                  {i18next.t("component:label.pdfController.instruction")}
                </p>
              </div>
              {loading && (
                <div className="loading-container">
                  <div className="loading-bar"></div>
                </div>
              )}
            </div>
            {hasError() && <p className="error-message">{errorMessage}</p>}
          </>
        )}
        <input
          type="file"
          ref={fileRef}
          className="hidden"
          accept=".pdf"
          onChange={onFileChange}
        />
      </div>
    );
  }
);

export default PdfController;
