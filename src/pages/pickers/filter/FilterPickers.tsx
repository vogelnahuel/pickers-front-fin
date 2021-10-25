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

/****diseño del filtro y muestra inputs*/
//TODO: revisar tipo del onSubmit
export const FilterPickers: React.FC<FilterTypes> = ({
  onSubmit,
  filters,
  validationSchema,
}): JSX.Element => {
  return (
    <div className="containerFluid display-filter-transaction">
      <div className="containerRow">
        <div className="containerCol3">
          <div className="filter-Imagen-width">
            <img
              className="img-filter-transaction"
              src={dropdown}
              alt="desplegable"
            />
            <p className="p-filter-transaction">Filtros</p>
          </div>
        </div>
        <div className="containerCol9 sub-container">
          <div className="containerRow px-2">
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
                  <div className="containerCol4 px-3">
                    <Field
                      type="text"
                      name="name"
                      label="Nombre y apellido"
                      component={Input}
                      className="Admin-Pickers-input"
                      placeholder="Ingresá el nombre y apellido"
                      maxLength={50}
                    />
                  </div>
                  <div  className="containerCol4 px-3">
                    <Field
                      type="text"
                      name="identificationNumber"
                      label="DNI"
                      component={Input}
                      className="Admin-Pickers-input"
                      placeholder="Ingresá el DNI"
                      maxLength={9}
                    />
                  </div>
                  <div  className="containerCol4 px-3">
                    <Field
                      name="vehicleType"
                      label="Vehículo"
                      onChange={form.mutators.setValue}
                      placeholder="Seleccioná tipo de vehículo"
                      options={FILTER_PICKERS_OPTIONS}
                    >
                      {(props: any) => <Select {...props} />}
                    </Field>
                  </div>
                  <div  className="containerCol4 px-3">
                    <Field
                      type="text"
                      name="email"
                      label="Email"
                      component={Input}
                      className="Admin-Pickers-input"
                      placeholder="Ingresá el email"
                      maxLength={250}
                    />
                  </div>
                  <div
                    className="containerCol4 px-3"
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
