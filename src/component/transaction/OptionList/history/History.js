import React, {  } from "react";
import Okey from "../../../../assets/transaction/Okey.svg";
import Connector from "../../../../assets/transaction/Connector.svg";
import Cancel from "../../../../assets/transaction/Cancel.svg";
import "./history.css";
import { Form, Field } from "react-final-form";
import moment from "moment";
import { Link } from "react-router-dom";


export const History = (props) => {

  
  const FilterTransaction = props.FilterTransaction;
  const FilterTransactionHistory = props.FilterTransaction.transactionHistory;
  

  let FilterTransactionHistoryReverse =  FilterTransactionHistory ? JSON.parse(JSON.stringify(FilterTransactionHistory)) : [];
  FilterTransactionHistoryReverse = FilterTransactionHistoryReverse.reverse();

  // console.log(FilterTransaction)

  const convertirNombre = (tag) => {

    switch (tag) {
      case "assigned_picker":
          tag  = "Asignado"
        break;
      case "un_assigning":
        tag  = "Sin asignar"
      break;
      case "state_pending_assigment":
        tag  = "Pendiente de asignacion"
      break;
      case "state_assigned":
        tag  = "Asignado"
      break;
      case "state_in_pickup":
        tag  = "En retiro"
      break;
      case "state_in_pickup_point":
        tag  = "En punto de retiro"
      break;
      case "state_in_picked_up":
        tag  = "Retirado"
      break;
      case "state_in_delivery":
        tag  = "En entrega"
      break;
      case "state_in_delivery_point":
        tag  = "En lugar de entrega "
      break;
      case "state_in_devolution":
        tag  = "En devolucion"
      break;
      case "state_pickup_cancelled_temporally":
        tag  = "Cancelado temporalmente"
      break;
      case "state_pickup_cancelled_permanently":
        tag  = "Cancelado permanentemente"
      break;
      case "state_delivered":
        tag  = "Entregado"
      break;
      case "state_returned":
        tag  = "Devuelto"
      break;
      case "state_lost":
        tag  = "Siniestrado"
      break;

      default:
        break;
    }
    return tag
  }


  
  // console.log(FilterTransaction,"transaction")
  return (
    <div className="modal-transaction-optionContainer-scroll">
      <Form
        onSubmit={() => {}}
        initialValues={{
          nroTransaccion: FilterTransaction.transaction ? FilterTransaction.transaction.id : 0,
          Picker: FilterTransaction.transaction ? FilterTransaction.client.name+ ' ' +FilterTransaction.client.lastName : "",
          Telefono: FilterTransaction.transaction ? FilterTransaction.client.phone : "",
          dirRetiro: FilterTransaction.destination ? FilterTransaction.destination.formattedAddress : "" ,
          dirEntrega: FilterTransaction.origin ? FilterTransaction.origin.formattedAddress : "",
          Retailer: "pickit",
        }}
      >
        {({ handleSumbit }) => (
          <form className="form-filter-transaction" onSubmit={handleSumbit}>
            <div className="modal-transaction-inputs">
              <div>
                <div>
                  <label className="label-filter-transaction">Picker </label>
                </div>
                <div className="modal-transaction-input">
                  <Field
                    name="nroTransaccion"
                    component="input"
                    placeholder="Ingresá el número"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label className="label-filter-transaction">
                    Nombre y apellido
                  </label>
                </div>
                <div className="modal-transaction-input">
                  <Field
                    name="Picker"
                    component="input"
                    placeholder="Ingresá el número de picker"
                  />
                </div>
              </div>

              <div>
                <div>
                  <label className="label-filter-transaction">Teléfono </label>
                </div>
                <div className="modal-transaction-input">
                  <Field
                    name="Telefono"
                    component="input"
                    placeholder="Seleccioná el estado"
                  />
                </div>
              </div>

              <div>
                <div>
                  <label className="label-filter-transaction">
                    Dirección de retiro{" "}
                  </label>
                </div>
                <div className="modal-transaction-input">
                  <Field
                    name="dirRetiro"
                    component="input"
                    placeholder="Seleccioná el estado"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label className="label-filter-transaction">
                    Dirección de entrega{" "}
                  </label>
                </div>
                <div className="modal-transaction-input">
                  <Field
                    name="dirEntrega"
                    component="input"
                    placeholder="Seleccioná el estado"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label className="label-filter-transaction">Retailer </label>
                </div>
                <div className="modal-transaction-input">
                  <Field
                    name="Retailer"
                    component="input"
                    placeholder="Seleccioná el estado"
                  />
                </div>
              </div>
            </div>
           <Link target="_blank" rel="noopener noreferrer" to={ FilterTransaction.picker && FilterTransaction.picker.id!==null ? `activeUserAdminpicker/${FilterTransaction.picker.id}` : "#"}><button type="button" className="modal-transaction-button-irApicker">
              Ir a picker
            </button></Link>
          </form>
        )}
      </Form>
      <div  key={FilterTransactionHistoryReverse.id}>
            <h3 className="modal-transaction-h3">Historial</h3>
            <hr className="modal-transaction-separate-option" />
            <section className="modal-transaction-section-history">
            {
     
            FilterTransactionHistoryReverse.map(historial => (
              
              <>{historial.reasonTag.tag!=="state_assigned"?<>
               <div className="modal-transaction-part" key={historial.id}>
                 {
                    historial.reasonTag.tag==="state_pickup_cancelled_temporally" || historial.reasonTag.tag==="state_pickup_cancelled_permanently"  ?
                    <img src={Cancel} alt="Cancel" className="modal-transaction-img-okey" />
                     : 
                     <img src={Okey} alt="okey" className="modal-transaction-img-okey" />
                   
                 }
                   
                   <p className="modal-transaction-part-subtitle"> { convertirNombre(historial.reasonTag.tag) } {historial.metadata[0]? historial.metadata[0].value:null} </p>
                   
                   {FilterTransaction.transactionHistory.length!==0?<p className="modal-transaction-part-info"> {moment(historial.createdAt.substring(0,10),"YYYY-MM-DD").format("DD/MM/YYYY")}  {historial.createdAt.substring(11,19)} </p>:null}
                
                  <Link  style={{textDecoration: 'none'}}className="modal-transaction-a" to={historial.curentValue ? `activeUserAdminpicker/${historial.curentValue}` : "#"}> { historial.reasonTag.tag==="assigned_picker"  ? "Ver Picker" : ""}   </Link>  
               </div>
                  <div className="modal-transaction-part">
                      <img
                        src={Connector}
                        alt="okey"
                        className="modal-transaction-img-connector"
                      />
                  </div></>:null}
              </>
            ))
          }
          <div className="modal-transaction-part">
              <img src={Okey} alt="okey" className="modal-transaction-img-okey" />
              <p className="modal-transaction-part-subtitle">Pendiente</p>
              {FilterTransaction.transactionHistory &&FilterTransaction.transactionHistory.length!==0 ?<p className="modal-transaction-part-info">{ FilterTransaction.transactionHistory ? moment(FilterTransaction.transactionHistory[0].createdAt.substring(0,10),"YYYY-MM-DD").format("DD/MM/YYYY") : ""}  {FilterTransaction.transactionHistory ? FilterTransaction.transactionHistory[0].createdAt.substring(11,19) : ""}  </p>:null}
            </div>
            <div className="modal-transaction-part">
                      <img
                        src={Connector}
                        alt="okey"
                        className="modal-transaction-img-connector"
                      />
                  </div>
            
            <div className="modal-transaction-part">
              <img src={Okey} alt="okey" className="modal-transaction-img-okey" />
              <p className="modal-transaction-part-subtitle">Creación</p>
              {FilterTransaction.transactionHistory &&FilterTransaction.transactionHistory.length!==0 ?<p className="modal-transaction-part-info">{ FilterTransaction.transactionHistory ? moment(FilterTransaction.transactionHistory[0].createdAt.substring(0,10),"YYYY-MM-DD").format("DD/MM/YYYY") : ""}  {FilterTransaction.transactionHistory ? FilterTransaction.transactionHistory[0].createdAt.substring(11,19) : ""}  </p>:null}
            </div>
            
          </section>
    </div>
      
     
      </div>
    
  );
};
