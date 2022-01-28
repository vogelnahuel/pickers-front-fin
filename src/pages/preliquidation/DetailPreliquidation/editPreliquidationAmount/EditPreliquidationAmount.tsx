import React from "react";
import classNames from "classnames";
import { Field, Form } from "react-final-form";
import useValidationSchema from "hooks/useValidationSchema";
import { Modal, Tooltip, ToolTipPosition } from "@pickit/pickit-components";
import { ReactComponent as CloseIcon } from "assets/admin/close.svg";
import "./editPreliquidationAmount.scss";
import i18next from "i18next";
import { EditPreliquidationAmountProps } from "./types";
import { ISO8601toDDMMYYYHHMM } from "utils/iso8601toDDMMYYHHMM";
import { Input } from "component/inputs/Input";
import { NumericInput } from "component/inputs/NumericInput";
import { ReactComponent as PlusIcon } from "../../../../assets/admin/icon_plus.svg";
import { ReactComponent as MinusIcon } from "../../../../assets/admin/icon_minus.svg";
import LoadingButton from "component/loadingButton/LoadingButton";
import { LoadingButtonState } from "component/loadingButton/types";

const namespace = "detailPreliquidation:label.modal";

export const EditPreliquidationAmount: React.FC<
  EditPreliquidationAmountProps
> = ({
  increase,
  preliquidation,
  initialValues,
  validationSchema,
  adjustingAmount,
  setIncrease,
  onSubmit,
  onClose,
}): JSX.Element => {
  const onClick = () => {
    if (adjustingAmount > LoadingButtonState.Loading) onClose(true);
  };

  return (
    <div className="preliquidation-modal-background">
      <Modal
        width="1190px"
        height="496px"
        isOpen={true}
        onClose={() => {}}
        closeOnBlur={false}
      >
        <div className="preliquidation-modal-container">
          <CloseIcon
            onClick={() =>
              onClose(adjustingAmount > LoadingButtonState.Loading)
            }
            className="preliquidation-modal-close"
          />
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
            <Form
              onSubmit={onSubmit}
              initialValues={initialValues}
              validate={useValidationSchema(validationSchema)}
            >
              {({ invalid, handleSubmit }) => (
                <form
                  className="preliquidation-modal-form"
                  onSubmit={handleSubmit}
                >
                  <div className="preliquidation-modal-form-row">
                    <Field
                      readOnly
                      type="text"
                      name="actualAmount"
                      label={i18next.t(`${namespace}.actualAmount`)}
                      component={Input}
                      className="Admin-Pickers-input"
                      placeholder={i18next.t(`${namespace}.actualAmount`)}
                    />
                    <div className="preliquidation-modal-buttons">
                      <Tooltip
                        message={i18next.t(
                          "detailPreliquidation:label.tooltip.add"
                        )}
                        position={ToolTipPosition.top}
                      >
                        <PlusIcon
                          onClick={() => setIncrease(true)}
                          className={classNames({ disabled: !increase })}
                        />
                      </Tooltip>
                      <Tooltip
                        message={i18next.t(
                          "detailPreliquidation:label.tooltip.subtract"
                        )}
                        position={ToolTipPosition.top}
                      >
                        <div>
                          <MinusIcon
                            onClick={() => setIncrease(false)}
                            className={classNames({ disabled: increase })}
                          />
                        </div>
                      </Tooltip>
                    </div>
                    <Field
                      name="newAmount"
                      label={i18next.t(
                        `${namespace}.${
                          increase ? "amountToAdd" : "amountToSubstract"
                        }`
                      )}
                      component={NumericInput}
                      className="Admin-Pickers-input"
                      placeholder={i18next.t(
                        "detailPreliquidation:placeholder.modal.amount"
                      )}
                    />
                  </div>
                  <Field
                    type="text"
                    name="reason"
                    label={i18next.t(`${namespace}.reason`)}
                    component={Input}
                    className="Admin-Pickers-input"
                    placeholder={i18next.t(
                      "detailPreliquidation:placeholder.modal.reason"
                    )}
                    maxLength={150}
                  />
                  <div className="button-confirm-container">
                    <LoadingButton
                      type={
                        adjustingAmount > LoadingButtonState.Loading
                          ? "button"
                          : "submit"
                      }
                      disabled={invalid}
                      onClick={onClick}
                      status={adjustingAmount}
                    >
                      { i18next.t("global:label.button.confirm") }
                    </LoadingButton>
                  </div>
                </form>
              )}
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};
