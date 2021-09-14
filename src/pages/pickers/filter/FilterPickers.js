import React from 'react'
import 'pages/pickers/filter/filter.scss';
import dropdown from "assets/admin/PendingUser/desplegable.svg";
import or from 'assets/admin/PendingUser/or.svg';
import search from 'assets/admin/PendingUser/search.svg';
import {Field, Form} from 'react-final-form';
import {Input} from 'component/inputs/Input';
import {Col, Container, Row} from "react-bootstrap";
import {FILTER_PICKERS_OPTIONS} from "utils/constants";
import Select from "component/inputs/Select";
import useValidationSchema from "hooks/useValidationSchema"

/****diseño del filtro y muestra inputs*/
export const FilterPickers = ({ onSubmit, filters,validationSchema}) => {

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
                    <Row className="px-2">
                        <Form
                            onSubmit={onSubmit}
                            initialValues={filters}
                            mutators={{
                                setValue: ([field, value], state, { changeValue }) => {
                                    changeValue(state, field, () => value)
                                }
                            }}
                            validate={useValidationSchema(validationSchema)}
                        >
                            {({ handleSubmit, form}) => (
                                <form className="form-filter-transaction" onSubmit={handleSubmit}>
                                    <Col xxl xl={4} className="px-3">
                                        <Field
                                            type="text"
                                            name="name"
                                            label="Nombre y apellido"
                                            component={Input}
                                            className="Admin-Pickers-input"
                                            placeholder="Ingresá el nombre y apellido"
                                            maxLength={50}
                                        />
                                    </Col>
                                    <Col xxl xl={4} className="px-3">
                                        <Field
                                            type="text"
                                            name="identificationNumber"
                                            label="DNI"
                                            component={Input}
                                            className="Admin-Pickers-input"
                                            placeholder="Ingresá el DNI"
                                            maxLength={9}
                                        />
                                    </Col>
                                    <Col xxl xl={4} className="px-3">
                                        <Field
                                            name="vehicleType"
                                            label="Vehículo"
                                            onChange={form.mutators.setValue}
                                            placeholder="Seleccioná tipo de vehículo"
                                            options={FILTER_PICKERS_OPTIONS}
                                            component={Select}
                                        />
                                    </Col>
                                    <Col xxl xl={4} className="px-3">
                                        <Field
                                            type="text"
                                            name="email"
                                            label="Email"
                                            component={Input}
                                            className="Admin-Pickers-input"
                                            placeholder="Ingresá el email"
                                            maxLength={250}
                                        />
                                    </Col>
                                    <Col xxl={{span: "auto", offset:0}} lg={{span:4,offset:4}} className="px-3">
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
    )
}
