import React, { useEffect } from "react";
import "pages/pickers/filter/filter.scss";
import dropdown from "assets/admin/PendingUser/desplegable.svg";
import or from "assets/admin/PendingUser/or.svg";
import search from "assets/admin/PendingUser/search.svg";
import { Field, Form } from "react-final-form";
import { Input } from "component/inputs/Input";
import { FILTER_PRELIQUIDATION_OPTIONS } from "utils/constants";
import { DatePicker } from "@pickit/pickit-components";
import MultipleSelect from "component/inputs/MultipleSelect";
import useValidationSchema from "hooks/useValidationSchema";
import i18next from "i18next";
import { PreliquidationFilterPropsType } from "./type";
import axios from "axios";
import * as preliquidationsMiddleware from "./../../../middleware/preliquidations";

export const PreliquidationFilter: React.FC<PreliquidationFilterPropsType> = ({
  onSubmit,
  filters,
  validationSchema,
}): JSX.Element => {
    
        const response = preliquidationsMiddleware.getPreliquidations()
        console.log(response)
        
 
    
    
  return (
    <div className="container-fluid display-filter-transaction">
      <div className="container-row">
        <div className="container-col-auto">
          <div className="filter-Imagen-width">
            <img
              className="img-filter-transaction"
              src={dropdown}
              alt="desplegable"
            />
            <p className="p-filter-transaction">
              {i18next.t("filterPickers:label.subtitle.filter")}
            </p>
          </div>
        </div>
        <div className="container-col">
          <div className="container-row">
            <Form
              onSubmit={(value) => onSubmit(value)}
              initialValues={filters}
              mutators={{
                setValue: ([field, value], state, { changeValue }) => {
                  changeValue(state, field, () => value);
                },
              }}
              validate={useValidationSchema(validationSchema)}
            >
              {({ handleSubmit, form }) => (
                <form
                  className="form-filter-transaction"
                  onSubmit={handleSubmit}
                >
                  <div className="container-col-sm-1 container-col-xl">
                    <Field
                      type="text"
                      name="preliquidationNumber"
                      label={i18next.t(
                        "preli:label.filter.preliquidationNumber"
                      )}
                      component={Input}
                      className="Admin-Pickers-input test"
                      placeholder={i18next.t("preli:placeholder.filter.number")}
                      maxLength={50}
                    />
                  </div>
                  <div className="container-col-sm-1 container-col-xl">
                    <Field
                      type="text"
                      name="taxIdentifier"
                      label={i18next.t("preli:label.filter.taxIdentifier")}
                      component={Input}
                      className="Admin-Pickers-input"
                      placeholder={i18next.t("preli:placeholder.filter.number")}
                      maxLength={8}
                    />
                  </div>
                  <div className="container-transaction-col-sm-1 container-transaction-col-xl">
                    <div
                      className="datePicker-filter-transaction"
                      id="datePicker-filter-transaction"
                    >
                      <label className="label-Admin-Pickers">
                        {i18next.t("preli:label.filter.generationDate")}
                      </label>
                      <Field
                        type="text"
                        className="Admin-Pickers-input-select"
                        name="date"
                        placeholder={i18next.t("preli:placeholder.filter.date")}
                        maxLength={8}
                        language="es"
                      >
                        {(props: any) => (
                          <DatePicker singleSelection={true} {...props} />
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className="container-transaction-col-sm-1 container-transaction-col-xl">
                    <label className="label-Admin-Pickers">
                      {i18next.t("filterTransaction:label.filter.state")}
                    </label>
                    <Field
                      name="state"
                      placeholder={i18next.t(
                        "filterTransaction:placeholder.filter.selectState"
                      )}
                      onChange={form.mutators.setValue}
                      options={FILTER_PRELIQUIDATION_OPTIONS.map((o) => ({
                        ...o,
                        label: i18next.t(o.label),
                      }))}
                    >
                      {(props: any) => <MultipleSelect {...props} />}
                    </Field>
                  </div>
                  <div className="container-col-sm-offset-1 container-col-sm-1 container-col-xl-auto end">
                    <button
                      className="search-button-transaction"
                      name="search"
                      type="submit"
                    >
                      <img src={search} alt="export" />
                      <img className="or-filter" src={or} alt="or" />
                      <p className="display-inline-block p-export">
                        {i18next.t("global:label.button.search")}
                      </p>
                    </button>
                  </div>
                </form>
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
