import React from "react";
import "pages/pickers/filter/filter.scss";
import dropdown from "assets/admin/PendingUser/desplegable.svg";
import or from "assets/admin/PendingUser/or.svg";
import search from "assets/admin/PendingUser/search.svg";
import { Field, Form } from "react-final-form";
import { Input } from "component/inputs/Input";
import { Col, Container, Row } from "react-bootstrap";
import { FILTER_PICKERS_OPTIONS } from "utils/constants";
import Select from "component/inputs/Select";
import useValidationSchema from "hooks/useValidationSchema";
import { FilterTypes } from "./types";
import i18next from "i18next"

/****diseño del filtro y muestra inputs*/
//TODO: revisar tipo del onSubmit
export const FilterPickers: React.FC<FilterTypes> = ({
  onSubmit,
  filters,
  validationSchema,
}): JSX.Element => {
  return (
    <Container className="display-filter-transaction">
      <Row>
        <Col md={"auto"}>
          <div className="filter-Imagen-width">
            <img
              className="img-filter-transaction"
              src={dropdown}
              alt="desplegable"
            />
            <p className="p-filter-transaction">{i18next.t("pickers-filter:title.filter.filter")}</p>
          </div>
        </Col>
        <Col className="sub-container">
          <Row className="px-2">
            <Form
              onSubmit={(value)=>onSubmit(value)}
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
                  <Col xxl xl={4} className="px-3">
                    <Field
                      type="text"
                      name="name"
                      label={i18next.t("pickers-filter:label.filter.name")}
                      component={Input}
                      className="Admin-Pickers-input"
                      placeholder={i18next.t("pickers-filter:placeholder.filter.name")}
                      maxLength={50}
                    />
                  </Col>
                  <Col xxl xl={4} className="px-3">
                    <Field
                      type="text"
                      name="identificationNumber"
                      label={i18next.t("pickers-filter:label.filter.identifier")}
                      component={Input}
                      className="Admin-Pickers-input"
                      placeholder={i18next.t("pickers-filter:placeholder.filter.identifier")}
                      maxLength={9}
                    />
                  </Col>
                  <Col xxl xl={4} className="px-3">
                    <Field
                      name="vehicleType"
                      label={i18next.t("pickers-filter:label.filter.vehicle")}
                      onChange={form.mutators.setValue}
                      placeholder={i18next.t("pickers-filter:placeholder.filter.vehicle")}
                      options={FILTER_PICKERS_OPTIONS}
                    >
                      {(props: any) => <Select {...props} />}
                    </Field>
                  </Col>
                  <Col xxl xl={4} className="px-3">
                    <Field
                      type="text"
                      name="email"
                      label={i18next.t("pickers-filter:label.filter.email")}
                      component={Input}
                      className="Admin-Pickers-input"
                      placeholder={i18next.t("pickers-filter:placeholder.filter.email")}
                      maxLength={250}
                    />
                  </Col>
                  <Col
                    xxl={{ span: "auto", offset: 0 }}
                    lg={{ span: 4, offset: 4 }}
                    className="px-3"
                  >
                    <button
                      className="search-button-transaction float-end"
                      name="search"
                      type="submit"
                    >
                      <img src={search} alt="export" />
                      <img className="or-filter" src={or} alt="or" />
                      <p className="display-inline-block p-export">Buscar</p>
                    </button>
                  </Col>
                </form>
              )}
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
