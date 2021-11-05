import React from "react";
import dropdown from "assets/admin/PendingUser/desplegable.svg";
import "pages/transaction/filterTransaction/FilterTransaction.scss";
import "pages/pickers/detailPicker/DetailPicker.scss";
import { DatePicker } from "@pickit/pickit-components";
import or from "assets/admin/PendingUser/or.svg";
import search from "assets/admin/PendingUser/search.svg";
import { Field, Form } from "react-final-form";
import { Col, Container, Row } from "react-bootstrap";
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
    <Container fluid className="display-filter-transaction">
      <Row>
        <Col md={"auto"}>
          <div className="filter-Imagen-width">
            <img
              className="img-filter-transaction filter-cursor"
              src={dropdown}
              alt="desplegable"
            />
            <p className="p-filter-transaction">
              {i18next.t("filterTransaction:title.filter.filters")}
            </p>
          </div>
        </Col>
        <Col className="sub-container">
          {/* <Row className="px-2"> */}
          <Form
            onSubmit={(values: FilterValuesType) =>
              onSubmit({
                transactionCode: values.transactionCode,
                pickerId: values.pickerId ? Number(values.pickerId) : undefined,
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
              <form className="form-filter-transaction" onSubmit={handleSubmit}>
                <Col xxl xl={4} className="px-3">
                  <Field
                    type="text"
                    name="transactionCode"
                    label={i18next.t("transactions:label.transactions.transactionCode")}
                    component={Input}
                    className="Admin-Pickers-input"
                    placeholder="Ingresá el código"
                    maxLength={19}
                  />
                </Col>
                <Col xxl xl={4} className="px-3">
                  <Field
                    type="text"
                    name="pickerId"
                    label={i18next.t("filterTransaction:label.filter.idPicker")}
                    component={Input}
                    className="Admin-Pickers-input"
                    placeholder="Ingresá el número de picker"
                  />
                </Col>
                <Col xxl xl={4} className="px-3">
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
                      placeholder={i18next.t("filterTransaction:label.filter.selectDate")}
                      language="es"
                    >
                      {(props: any) => <DatePicker {...props} />}
                    </Field>
                  </div>
                </Col>
                <Col xxl xl={4} className="px-3">
                  <label className="label-Admin-Pickers">
                    {i18next.t("filterTransaction:label.filter.state")}
                  </label>
                  <Field
                    name="state"
                    placeholder={i18next.t(
                      "filterTransaction:placeholder.filter.selectState"
                    )}
                    onChange={form.mutators.setValue}
                    options={FILTER_TRANSACTION_OPTIONS}
                  >
                    {(props: any) => <MultipleSelect {...props} />}
                  </Field>
                </Col>
                <Col xxl="auto" xl={4} className="px-3">
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
                </Col>
                <Col xxl="auto" xl={4} className="px-3">
                  <button
                    className="search-button-transaction float-end"
                    name="search"
                    type="submit"
                  >
                    <img src={search} alt="export" />
                    <img className="or-filter" src={or} alt="or" />
                    <p className="display-inline-block p-export">
                      {i18next.t("transactions:filter.button.search")}
                    </p>
                  </button>
                </Col>
              </form>
            )}
          </Form>
          {/* </Row> */}
        </Col>
      </Row>
    </Container>
  );
};
