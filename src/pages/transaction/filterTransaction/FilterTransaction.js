import React from "react";
import dropdown from "assets/admin/PendingUser/desplegable.svg";
import "pages/transaction/filterTransaction/FilterTransaction.scss";
import "pages/pickers/detailPicker/DetailPicker.scss"
import or from "assets/admin/PendingUser/or.svg";
import search from "assets/admin/PendingUser/search.svg";
import {Field, Form} from "react-final-form";
import {Col, Container, Row} from "react-bootstrap";
import {Input} from "component/inputs/Input";
import {WrapperDatePicker} from 'component/inputs/wrapperDatePicker' 
import MultipleSelect from "component/inputs/MultipleSelect";
import {FILTER_TRANSACTION_OPTIONS} from "utils/constants";


export const FilterTransaction = ({ onSubmit, filters }) => {

    return (
        <Container fluid className="display-filter-transaction">
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
                    <Form
                        onSubmit={onSubmit}
                        initialValues={filters ? filters : ""}
                        mutators={{
                            setValue: ([field, value], state, { changeValue }) => {
                                changeValue(state, field, () => value)
                            }
                         
                        }}
                    >
                        {({ handleSubmit, form,values }) => (
                            <form className="form-filter-transaction" onSubmit={handleSubmit}>
                                <Col xxl={2} lg={4}>
                                    <Field
                                        type="text"
                                        name="transactionCode"
                                        label="Código de transacción"
                                        component={Input}
                                        className="Admin-Pickers-input"
                                        placeholder="Ingresá el código"
                                    />
                                </Col>
                                <Col xxl={2} lg={4}>
                                    <Field
                                        type="text"
                                        name="pickerId"
                                        label="Id de picker"
                                        component={Input}
                                        className="Admin-Pickers-input"
                                        placeholder="Ingresá el número de picker"
                                    />
                                </Col>
                                <Col xxl={2} lg={4}>
                                    <div className="datePicker-filter-transaction" id="datePicker-filter-transaction">
                                        <label className="label-Admin-Pickers">
                                            Vencimiento SLA
                                        </label>
                                        <Field
                                            type="text"
                                            className="Admin-Pickers-input"
                                            name="date"
                                            component={WrapperDatePicker}
                                            placeholder="Seleccioná la fecha"
                                            language="es"
                                            onClose={form.mutators.setValue}
                                        >
                                            
                                        </Field>
                                     </div>
                                </Col>
                                <Col xxl={2} lg={4}>
                                    <Field
                                        name="state"
                                        label="Estados"
                                        placeholder="Seleccioná el estado"
                                        onChange={form.mutators.setValue}
                                        options={FILTER_TRANSACTION_OPTIONS}
                                        component={MultipleSelect}/>
                                </Col>
                                <Col xxl={2} lg={4}>
                                    <Field
                                        className="checkbox-filter-transaction"
                                        name="inAlert"
                                        component="input"
                                        type="checkbox"
                                    />
                                    <label className="label-filter-transaction-alert">
                                        En alerta
                                    </label>
                                </Col>
                                <Col xxl={2} lg={4}>
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
    );
};
