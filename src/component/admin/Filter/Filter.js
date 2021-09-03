import React from 'react'
import './filter.scss'
import desplegable from  '../../../assets/admin/PendingUser/desplegable.svg'
import dropdown from "assets/admin/PendingUser/desplegable.svg";
import or from '../../../assets/admin/PendingUser/or.svg'
import search from  '../../../assets/admin/PendingUser/search.svg'
import { Fields } from './Fields'
import { Form,Field } from 'react-final-form'
import { Input } from 'component/inputs/Input'

    /****diseño del filtro y muestra inputs*/
export const Filter = ({onSubmit}) => {

  
  return(
    <div className="display-filter-transaction">
    <div className="filter-Imagen-width">
      <img
        className="img-filter-transaction"
        src={dropdown}
        alt="desplegable"
      />
      <p className="p-filter-transaction">Filtros</p>

    </div>
    <Form onSubmit={onSubmit} initialValues={{}}>
      {({ handleSubmit }) => (
        <form className="form-filter-transaction" onSubmit={handleSubmit}>
          <div>
            <div className="transaction-filter-div-label">
              <label className="label-filter-transaction">
              Nombre y apellido {" "}
              </label>
            </div>
            <div>
              <Field
                type="text"
                name="name"
                component="input"
                placeholder="Ingresá el nombre y apellido"
              />
            </div>
          </div>
          <div>
            <div className="transaction-filter-div-label">
              <label className="label-filter-transaction">DNI</label>
            </div>
            <div>
              <Field
                type="text"
                name="identificationNumber"
                component="input"
                placeholder="Ingresá el DNI"
              />
            </div>
          </div>

          <div>
            <div className="transaction-filter-div-label">
              <label className="label-filter-transaction">Id de picker</label>
            </div>
            <div>
              <Field
                type="input"
                name="vehicleType"
                component="select"
                placeholder="Vehículo"
              >
                  <option value="">Todo</option>
                  <option value="bicycle">Bicicleta</option>
                  <option value="motocycle">Moto</option>
              </Field>
            </div>
          </div>


          <div>
            <div className="transaction-filter-div-label">
              <label className="label-filter-transaction">Email</label>
            </div>
            <div>
              <Field
                type="text"
                name="mail"
                component="input"
                placeholder="Ingresá el email"
              />
            </div>
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
    )

    // return (
    //     <div className="form-fiter">
    //             <div className="form-filter-img-p">
    //                 <img className="tamImgFilter" src={desplegable} alt="" />
    //                 <p className="Filter-p">Filtros</p>
    //             </div>
    //             <form className="filter-inputs" onSubmit={onSubmit}>
    //                 <div className="filter-padding">
    //                         <Fields
    //                         FieldsPart={FieldsPart}
    //                         />
                                        
    //                         <div className="container-button-width">
    //                             <button 
    //                                     className="filter-button"
    //                                     name="search"
    //                                     >
    //                                     <img  src={search} alt="export" />
    //                                     <img className="or-filter" src={or} alt="or" />
    //                                     <p className="display-inline-block p-export"> Buscar</p>
    //                             </button>
    //                     </div>
    //                 </div>
                    
    //             </form>  

    //     </div>
    // )
}
