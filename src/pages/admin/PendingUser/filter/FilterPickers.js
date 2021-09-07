import React from 'react'
import 'pages/admin/PendingUser/filter/filter.scss';
import dropdown from "assets/admin/PendingUser/desplegable.svg";
import or from 'assets/admin/PendingUser/or.svg';
import search from 'assets/admin/PendingUser/search.svg';
import {Field, Form} from 'react-final-form';
import {Input} from 'component/inputs/Input';
import {Col, Container, Row} from "react-bootstrap";
import {FILTER_PICKERS_OPTIONS} from "utils/constants";
import Select from "component/inputs/Select";

/****diseño del filtro y muestra inputs*/
export const FilterPickers = ({ onSubmit, handlerOnChange, filters}) => {


  return(
      <Container className="display-filter-transaction">
        <Row>
          <Col md={"auto"}>
            <div className="filter-Imagen-width">
              <img
                  className="img-filter-transaction"
                  src={dropdown}
                  alt="desplegable"
              />
              <p className="p-filter-transaction">Filtros</p>
            </div>
          </Col>
          <Col className="sub-container" >
            <Form onSubmit={onSubmit} initialValues={filters}>
              {({ handleSubmit, form}) => (
                  <form className="form-filter-transaction" onSubmit={handleSubmit}>
                    <Col xxl={2} lg={4}>
                      <Field
                          type="text"
                          name="name"
                          label="Nombre y apellido"
                          component={Input}
                          className="Admin-Pickers-input"
                          placeholder="Ingresá el nombre y apellido"
                      />
                    </Col>
                    <Col xxl={2} lg={4}>
                      <Field
                          type="text"
                          name="identificationNumber"
                          label="DNI"
                          component={Input}
                          className="Admin-Pickers-input"
                          placeholder="Ingresá el DNI"
                      />
                    </Col>
                    <Col xxl={2} lg={4}>
                      <Field
                          name="vehicleType"
                          label="Vehículo"
                          onChange={handlerOnChange}
                          placeholder="Seleccioná tipo de vehículo"
                          options={FILTER_PICKERS_OPTIONS}
                          component={Select}
                      />


                      {/*<label className="label-Admin-Pickers">*/}
                      {/*  Fecha de entrega*/}
                      {/*</label>*/}
                      {/*<Field*/}
                      {/*    type="text"*/}
                      {/*    name="vehicleType"*/}
                      {/*    label="Vehículo"*/}
                      {/*    component="select"*/}
                      {/*    className="Admin-Pickers-input"*/}
                      {/*    placeholder="Seleccioná tipo de vehículo"*/}
                      {/*>*/}
                      {/*  <option value="">Todo</option>*/}
                      {/*  <option value="bicycle">Bicicleta</option>*/}
                      {/*  <option value="motorcycle">Moto</option>*/}
                      {/*</Field>*/}

                    </Col>
                    <Col xxl={2} lg={4}>
                      <Field
                          type="text"
                          name="mail"
                          label="Email"
                          component={Input}
                          className="Admin-Pickers-input"
                          placeholder="Ingresá el email"
                      />
                    </Col>
                    <Col xxl={2} lg={{ span: 4, offset: 4 }}>
                        <button
                            className="search-button-transaction float-right"
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
          </Col>
        </Row>
      </Container>
  )
}
