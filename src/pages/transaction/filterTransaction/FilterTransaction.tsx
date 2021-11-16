import React from "react";
import dropdown from "assets/admin/PendingUser/desplegable.svg";
import "pages/transaction/filterTransaction/FilterTransaction.scss";
import "pages/pickers/detailPicker/DetailPicker.scss";
import { DatePicker } from "@pickit/pickit-components";
import or from "assets/admin/PendingUser/or.svg";
import search from "assets/admin/PendingUser/search.svg";
import { Field, Form } from "react-final-form";
import { Input } from "component/inputs/Input";
import MultipleSelect from "component/inputs/MultipleSelect";
import { FILTER_TRANSACTION_OPTIONS } from "utils/constants";
import useValidationSchema from "hooks/useValidationSchema";
import { FilterTransactionPropsType, FilterValuesType } from "./types";
import i18next from "i18next";

export const FilterTransaction: React.FC<FilterTransactionPropsType> = ({
  onSubmit,
  filters,
  validationSchema,
}): JSX.Element => {
  return (
    <div className="container-transaction-fluid display-filter-transaction">
      <div className="container-transaction-row">
        <div className="container-transaction-col-auto">
          <div className="filter-Imagen-width">
            <img
              className="img-filter-transaction filter-cursor"
              src={dropdown}
              alt="desplegable"
            />
            <p className="p-filter-transaction">
              {i18next.t("filterTransaction:label.title.filters")}
            </p>
          </div>
        </div>
        <div className="container-transaction-col">
          <div className="container-transaction-row">
            <Form
              onSubmit={(values: FilterValuesType) =>
                onSubmit({
                  transactionCode: values.transactionCode,
                  pickerId: values.pickerId
                    ? Number(values.pickerId)
                    : undefined,
                  date: values.date,
                  state: values.state,
                  inAlert: values.inAlert,
                })
              }
              initialValues={filters}
              validate={useValidationSchema(validationSchema)}
              mutators={{
                setValue: ([field, value], state, { changeValue }) => {
                  changeValue(state, field, () => value);
                },
              }}
            >
              {({ handleSubmit, form }) => (
                <form
                  className="form-filter-transaction"
                  onSubmit={handleSubmit}
                >
                  <div className="container-transaction-col-sm-1 container-transaction-col-xl">
                    <Field
                      type="text"
                      name="transactionCode"
                      label={i18next.t(
                        "transactions:label.transactions.transactionCode"
                      )}
                      component={Input}
                      className="Admin-Pickers-input"
                      placeholder={i18next.t(
                        "filterTransaction:placeholder.filter.transactionCode"
                      )}
                      maxLength={19}
                    />
                  </div>
                  <div className="container-transaction-col-sm-1 container-transaction-col-xl">
                    <Field
                      type="text"
                      name="pickerId"
                      label={i18next.t(
                        "filterTransaction:label.filter.idPicker"
                      )}
                      component={Input}
                      className="Admin-Pickers-input"
                      placeholder={i18next.t(
                        "filterTransaction:placeholder.filter.idPicker"
                      )}
                    />
                  </div>
                  <div className="container-transaction-col-sm-1 container-transaction-col-xl">
                    <div
                      className="datePicker-filter-transaction"
                      id="datePicker-filter-transaction"
                    >
                      <label className="label-Admin-Pickers">
                        {i18next.t("transactions:label.filter.SLA")}
                      </label>
                      <Field
                        type="text"
                        className="Admin-Pickers-input-select"
                        name="date"
                        placeholder={i18next.t(
                          "filterTransaction:label.filter.selectDate"
                        )}
                        language="es"
                      >
                        {(props: any) => <DatePicker {...props} />}
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
                      options={FILTER_TRANSACTION_OPTIONS.map((o) => ({
                        ...o,
                        label: i18next.t(o.label),
                      }))}
                    >
                      {(props: any) => <MultipleSelect {...props} />}
                    </Field>
                  </div>
                  <div className="container-transaction-col-sm-1 container-transaction-col-xl-auto">
                    <Field
                      className="checkbox-filter-transaction"
                      name="inAlert"
                      component="input"
                      type="checkbox"
                      id="inAlert"
                    />
                    <label
                      htmlFor="inAlert"
                      className="label-filter-transaction-alert"
                    >
                      {i18next.t("transactions:label.filter.inAlert")}
                    </label>
                  </div>
                  <div className="container-transaction-col-sm-1 container-transaction-col-xl-auto end">
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
