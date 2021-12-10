import { useState } from "react";
import { Header } from "component/admin/Header/Header";
import Nav from "component/admin/Nav/Nav";
import TabControler from "component/admin/TabControler/TabControler";
import React from "react";
import calckBlack from "./../../../assets/preli/calcBlack.svg";
import invoiceBlue from "./../../../assets/preli/invoiceBlue.svg";
import calckBlue from "./../../../assets/preli/calcBlue.svg";
import invoiceBlack from "./../../../assets/preli/invoiceBlack.svg";
import PdfController from "component/pdfController/PdfController";
import { MAX_FILE_SIZE } from "utils/constants";

export const DetailPreliquidation: React.FC<any> = ({
  isFetching,
}): JSX.Element => {
  const [fileUrl, setFileUrl] = useState("");
  const [fileError, setFileError] = useState("");
  //TODO: pasar a i18next
  const tabs = [
    {
      title: "Preliquidacion",
      id: "PRELI",
      icons: { active: calckBlue, disable: calckBlack },
    },
    {
      title: "Factura",
      id: "INVOICE",
      icons: { active: invoiceBlue, disable: invoiceBlack },
    },
  ];

  const fileHandler = async (file: File) => {
    console.log("FILE: ", file);
    await new Promise((resolve) => setTimeout(resolve, 5000));

    if (file.size > MAX_FILE_SIZE || file.type !== "application/pdf") {
      setFileError(
        "El formato del archivo debe ser PDF y no puede superar los 5MB"
      );
      return;
    } else {
      setFileError("");
      setFileUrl("....");
    }
  };

  return (
    <div className="background-Grey">
      <Header />
      <div className="mainContainerFlex">
        <Nav />
        <div className="pending-container">
          <div className="mainContainerFlex">
            <h2 className="subTitle-pending">
              <TabControler
                tabs={tabs}
                changePage={() => {
                  console.log("pepe");
                }}
              />
            </h2>
          </div>
          <PdfController
          title="Factura"
          buttonText="Cargar factura"
            fileHandler={fileHandler}
            fileLoaded={!!fileUrl}
            showError={!!fileError}
            errorMessage={fileError}
          >
            <div>File loaded</div>
          </PdfController>
        </div>
      </div>
      {isFetching === true ? <div className="modalLoading"></div> : <></>}
    </div>
  );
};
