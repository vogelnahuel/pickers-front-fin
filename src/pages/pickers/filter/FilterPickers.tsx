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
    <div className="container-fluid display-filter-transaction">
      <div className="container-row">
        <div className="container-col-2">
          <div className="filter-Imagen-width">
            <img
              className="img-filter-transaction"
              src={dropdown}
              alt="desplegable"
            />
            <p className="p-filter-transaction">Filtros</p>
          </div>
        </div>
        <div className="container-col-10">
          <div className="container-five-fluid">
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
                  <div className="container-five-row container-three-row">
                    <div className="container-five-col-xl-1 container-three-col-md-1">
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
                    <div className="container-five-col-xl-1 container-three-col-md-1">
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
                    <div className="container-five-col-xl-1 container-three-col-md-1">
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
                    <div className="container-five-col-xl-1 container-three-col-md-1">
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
                    <div className="container-five-col-xl-1 container-three-col-md-2">
                      <button
                        className="search-button-transaction"
                        name="search"
                        type="submit"
                      >
                        <img src={search} alt="export" />
                        <img className="or-filter" src={or} alt="or" />
                        <p className="display-inline-block p-export">Buscar</p>
                      </button>
                    </div>
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
