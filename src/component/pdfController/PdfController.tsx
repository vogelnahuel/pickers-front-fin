import { useRef, useState, useEffect } from "react";
import Button from "component/button/Button";
import uploadCloud from "../../assets/upload_cloud.svg";
import uploadArrow from "../../assets/upload_arrow.svg";
//import uploadError from "../../assets/upload_error.svg";
import "./pdfController.scss";

const PdfController = () => {
  const dropRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [,setDragCounter] = useState(0);

  const openFileReader = () => {
    if (fileRef.current) fileRef.current.click();
  };

  const handleFile = (file: File) => {
    console.log("File: ", file);
    setLoading(true);
    setTimeout(() => setLoading(false), 6000);
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

  const containerClasses = [
    "root-container",
    dragging && "root-container-dragging",
    loading && "root-container-loading",
  ].join(" ");

  return (
    <div ref={dropRef} className={containerClasses}>
      <div className="upload-icon-container">
        <img className="upload-cloud" src={uploadCloud} alt="upload-icon"></img>
        <img className="upload-arrow" src={uploadArrow} alt="upload-icon"></img>
      </div>
      <div className="content">
        <p className="title">Factura</p>
        <Button onClick={openFileReader}>Cargar factura</Button>
        <input
          type="file"
          ref={fileRef}
          className="hidden"
          accept=".pdf"
          onChange={onFileChange}
        />
        <p className="message">O arrastrá y soltá el archivo</p>
      </div>
      {loading && (
        <div className="loading-container">
          <div className="loading-bar"></div>
        </div>
      )}
    </div>
  );
};

export default PdfController;
