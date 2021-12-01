import { EventHandler, useRef } from "react";
import Button from "component/button/Button";
import uploadCloud from "../../assets/upload_cloud.svg"
import uploadArrow from "../../assets/upload_arrow.svg"
import "./invoice.scss";

const Invoice = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  const openFileReader = () => {
    if(fileRef.current) fileRef.current.click();
    
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const file: File = (target.files as FileList)[0];
    
    if (!file) return;

    target.value = "";
    console.log("File: ", file);
  }
  return (
    <div className="invoice-container">
      <div className="upload-icon-container">
        <img className="upload-cloud" src={uploadCloud} alt="upload-icon"></img>
        <img className="upload-arrow" src={uploadArrow} alt="upload-icon"></img>
      </div>
      <p className="title">Factura</p>
      <Button onClick={openFileReader}>Cargar factura</Button>
      <input type="file" ref={fileRef} className="hidden" accept=".pdf" onChange={onFileChange}/>
      <p className="message">O arrastrá y soltá el archivo</p>
    </div>
  )
}

export default Invoice;