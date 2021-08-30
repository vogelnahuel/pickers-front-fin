import React from "react";
import dropdown from "assets/admin/PendingUser/desplegable.svg";
import "./FilterTransaction.scss";
import {DatePicker} from "@pickit/pickit-components"
import {Field, Form} from "react-final-form";
import or from "assets/admin/PendingUser/or.svg";
import search from "assets/admin/PendingUser/search.svg";
import MultipleSelect from "pages/transaction/filterTransaction/MultipleSelect";


export const FilterTransaction = ({ onSubmit, filters, setFilters}) => {
    const handleronChange = (value ) => {
        setFilters({...filters, state: value===''? undefined : value});
    };

  return (
      <div className="display-filter-transaction">
        <div className="filter-Imagen-width">
          <img
            className="img-filter-transaction"
            src={dropdown}
            alt="desplegable"
          />
          <p className="p-filter-transaction">Filtros</p>

        </div>
        <Form onSubmit={onSubmit} initialValues={filters}>
          {({ handleSubmit }) => (
            <form className="form-filter-transaction" onSubmit={handleSubmit}>
              <div>
                <div className="transaction-filter-div-label">
                  <label className="label-filter-transaction">
                  Código de transacción {" "}
                  </label>
                </div>
                <div>
                  <Field
                    type="text"
                    name="transactionCode"
                    component="input"
                    placeholder="Ingresá el código"
                  />
                </div>
              </div>
              <div>
                <div className="transaction-filter-div-label">
                  <label className="label-filter-transaction">Id de picker</label>
                </div>
                <div>
                  <Field
                    type="text"
                    name="pickerId"
                    component="input"
                    placeholder="Ingresá el número de picker"
                  />
                </div>
              </div>
              <div className="datePicker-filter-transaction">
                <div className="transaction-filter-div-label">
                  <label className="label-filter-transaction">
                    Fecha de entrega
                  </label>
                </div>
                <div>
                  <Field
                    type="text"
                    className=""
                    name="date"
                    component={DatePicker}
                    placeholder="Seleccioná la fecha"
                    language="es"
                  />
                </div>
              </div>
              
              <div>
                  <Field name="state" onChange={ handleronChange} placeholder="Seleccioná el estado" component={MultipleSelect}>
                 
                  </Field>
                
              </div>
              <div className="filter-container">
                <Field
                  id="checkbox-filter-transaction"
                  name="inAlert"
                  component="input"
                  type="checkbox"
                />
                <label id="padding" className="label-filter-transaction display-inline">
                  En alerta
                </label>
              </div>
              <div className="transaction-container-button-width">
                <button
                  className="search-button-transaction"
                  name="search"
                  type="submit"
                >
                  <img src={search} alt="export" />
                  <img className="or-filter" src={or} alt="or" />
                  <p className="display-inline-block p-export"> Buscar</p>
                </button>
              </div>
            </form>
          )}
        </Form>
      </div>
  );
};
