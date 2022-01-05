import React from "react";
import { Modal } from "@pickit/pickit-components";
import { ReactComponent as CloseIcon } from "assets/admin/close.svg";
import "./editPreliquidationAmount.scss";
import i18next from "i18next";
import { EditPreliquidationAmountProps } from "./types";
import { ISO8601toDDMMYYYHHMM } from "utils/iso8601toDDMMYYHHMM";

const namespace = "detailPreliquidation:label.modal";

export const EditPreliquidationAmount: React.FC<
  EditPreliquidationAmountProps
> = ({ preliquidation, onClose }): JSX.Element => {
  return (
    <div className="preliquidation-modal-background">
      <Modal width="1190px" height="496px" isOpen={true} onClose={onClose}>
        <div className="preliquidation-modal-container">
          <CloseIcon onClick={onClose} className="preliquidation-modal-close" />
          <div className="preliquidation-modal-header">
            <div className="preliquidation-modal-header-number">
              <label>{i18next.t(`${namespace}.preliquidationNumber`)}</label>
              <p>{preliquidation.id}</p>
            </div>
            <div className="preliquidation-modal-header-status">
              <label>{i18next.t(`${namespace}.status`)}</label>
              <p>
                {i18next.t(`preli:label.select.${preliquidation.status?.tag}`)}
              </p>
            </div>
            <div className="preliquidation-modal-header-date">
              <label>{i18next.t(`${namespace}.dateOfIssue`)}</label>
              {preliquidation.generatedAt && (
                <p>
                  {ISO8601toDDMMYYYHHMM(preliquidation.generatedAt).substring(
                    0,
                    11
                  )}
                </p>
              )}
            </div>
          </div>
          <div className="preliquidation-modal-content">
            <h6 className="preliquidation-modal-title">
              {i18next.t(`${namespace}.instruction`)}
            </h6>
         
          </div>
        </div>
      </Modal>
    </div>
  );
};
