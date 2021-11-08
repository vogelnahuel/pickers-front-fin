import React from "react";
import "pages/pickers/filter/filter.scss";
import dropdown from "assets/admin/PendingUser/desplegable.svg";
import or from "assets/admin/PendingUser/or.svg";
import search from "assets/admin/PendingUser/search.svg";
import { Field, Form } from "react-final-form";
import { Input } from "component/inputs/Input";
import { FILTER_PICKERS_OPTIONS } from "utils/constants";
import Select from "component/inputs/Select";
import useValidationSchema from "hooks/useValidationSchema";
import { FilterTypes } from "./types";
import i18next from "i18next";

export const FilterPickers: React.FC<FilterTypes> = ({
  onSubmit,
  filters,
  validationSchema,
}): JSX.Element => {
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
                        name="name"
                        label={i18next.t("filterPickers:label.filter.name")}
                        component={Input}
                        className="Admin-Pickers-input test"
                        placeholder={i18next.t(
                            "filterPickers:placeholder.filter.name"
                        )}
                        maxLength={50}
                      />
                    </div>
                    <div className="container-col-sm-1 container-col-xl">
                      <Field
                        type="text"
                        name="identificationNumber"
                        label={i18next.t("filterPickers:label.filter.identifier")}
                        component={Input}
                        className="Admin-Pickers-input"
                        placeholder={i18next.t(
                            "filterPickers:placeholder.filter.identifier"
                        )}
                        maxLength={9}
                      />
                    </div>
                    <div className="container-col-sm-1 container-col-xl">
                      <Field
                        name="vehicleType"
                        label={i18next.t("filterPickers:label.filter.vehicle")}
                        onChange={form.mutators.setValue}
                        placeholder={i18next.t(
                            "filterPickers:placeholder.filter.vehicle"
                        )}
                        options={FILTER_PICKERS_OPTIONS.map((o) => ({
                          ...o,
                          label: i18next.t(o.label),
                        }))}
                      >
                        {(props: any) => <Select {...props} />}
                      </Field>
                    </div>
                    <div className="container-col-sm-1 container-col-xl">
                      <Field
                        type="text"
                        name="email"
                        label={i18next.t("filterPickers:label.filter.email")}
                        component={Input}
                        className="Admin-Pickers-input"
                        placeholder={i18next.t(
                            "filterPickers:placeholder.filter.email"
                        )}
                        maxLength={250}
                      />
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
