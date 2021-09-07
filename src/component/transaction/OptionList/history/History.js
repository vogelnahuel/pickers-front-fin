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


  const convertirNombre = (tag) => {

    switch (tag) {
      case "assigned_picker":
          tag  = "Asignado"
        break;
      case "un_assigning":
        tag  = "Sin asignar"
      break;
      case "state_pending_assigment":
        tag  = "Pendiente"
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
        tag  = "Cancelado"
      break;
      case "state_pickup_cancelled_permanently":
        tag  = "Cancelado"
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

  
  const convertDate = (value) =>{

    
    const date = moment(new Date(value).toISOString().slice(0, 10)).format("DD/MM/YYYY")
    const dateHHMM = new Date(value).toISOString().slice(11, 16)
    
    
    return date+" "+dateHHMM;
  }
  
  

  
  return (
    <div className="modal-transaction-optionContainer-scroll">
      <Form
        onSubmit={() => {}}
        initialValues={{
          //nroTransaccion: FilterTransaction.transaction ? FilterTransaction.transaction.id : 0,
          codArea:FilterTransaction.picker && FilterTransaction.picker.phone?FilterTransaction.picker.phone.areaNumber:"",
          PickerId: FilterTransaction.picker ? FilterTransaction.picker.id : "",
          Picker: FilterTransaction.picker && FilterTransaction.picker.name!==null ? FilterTransaction.picker.name+ ' ' +FilterTransaction.picker.surname : "Sin asignar",
          Telefono: FilterTransaction.picker && FilterTransaction.picker.phone ? FilterTransaction.picker.phone.number:"",
          dirEntrega : FilterTransaction.destination ? FilterTransaction.destination.formattedAddress : "" ,
          dirRetiro : FilterTransaction.origin ? FilterTransaction.origin.formattedAddress : "",
          Retailer: FilterTransaction.seller ? FilterTransaction.seller.name  : "",
        }}
      >
        {({ handleSumbit }) => (
          <form className="form-filter-transaction-modal" onSubmit={handleSumbit}>
            <div className="modal-transaction-inputs">
              <div>
                <div className="filter-transaction-div-label">
                  <label className="label-filter-transaction-modal">Id de Picker </label>
                </div>
                <div className="modal-transaction-input">
                  <Field
                    name="PickerId"
                    component="input"
                    placeholder={FilterTransaction && FilterTransactionHistory &&  FilterTransactionHistory.length===0 ? "Sin asignar" : ""}
                    disabled={true}
                  />
                </div>
              </div>
              <div>
                <div className="filter-transaction-div-label">
                  <label className="label-filter-transaction-modal">
                    Nombre y apellido
                  </label>
                </div>
                <div className="modal-transaction-input">
                  <Field
                    name="Picker"
                    component="input"
                    placeholder={FilterTransaction && FilterTransactionHistory &&  FilterTransactionHistory.length===0 ? "Sin asignar" : ""}
                    disabled={true}
                  />
                </div>
              </div>

              <div>
                <div className="filter-transaction-div-label">
                  <label className="label-filter-transaction-modal">Código de área </label>
                </div>
                <div className="modal-transaction-input-tel" id="modal-transaction-input-tel">
                  <Field
                    name="codArea"
                    component="input"
                    placeholder="-"
                    disabled={true}
                  />
                </div>
              </div>

              <div>
                <div className="filter-transaction-div-label">
                  <label className="label-filter-transaction-modal">Teléfono </label>
                </div>
                <div className="modal-transaction-input-tel" id="modal-transaction-input-tel2">
                  <Field
                    name="Telefono"
                    component="input"
                    placeholder="-"
                    disabled={true}
                  />
                </div>
              </div>
            {
             FilterTransaction && FilterTransactionHistory &&  FilterTransactionHistory.length!==0  ? 
              <Link target="_blank" rel="noopener noreferrer" to={ FilterTransaction.picker && FilterTransaction.picker.id!==null   ? `activeUserAdminpicker/${FilterTransaction.picker.id}` : "#"}>
                <button type="button" className="modal-transaction-button-irApicker">
                    Ir a picker
                </button>
              </Link>
              : <Link  to="#" >
                  <button type="button" className="modal-transaction-button-irApicker-disabled">
                      Ir a picker
                  </button>
                </Link>
            }
              
              <div>
                <div className="filter-transaction-div-label">
                  <label className="label-filter-transaction-modal">
                    Dirección de retiro
                  </label>
                </div>
                <div className="modal-transaction-input">
                  <Field
                    name="dirRetiro"
                    component="input"
                    placeholder="Seleccioná el estado"
                    disabled={true}
                  />
                </div>
              </div>
              <div>
                <div className="filter-transaction-div-label">
                  <label className="label-filter-transaction-modal">
                    Dirección de entrega
                  </label>
                </div>
                <div className="modal-transaction-input">
                  <Field
                    name="dirEntrega"
                    component="input"
                    placeholder="Seleccioná el estado"
                    disabled={true}
                  />
                </div>
              </div>
              <div>
                <div className="filter-transaction-div-label">
                  <label className="label-filter-transaction-modal">Retailer </label>
                </div>
                <div className="modal-transaction-input">
                  <Field
                    name="Retailer"
                    component="input"
                    placeholder="Seleccioná el estado"
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          
          </form>
        )}
      </Form>
      <div>
          <h3 className="modal-transaction-h3" id="modal-transaction-history-Final">Consumidor final</h3>
          <hr className="modal-transaction-separate-option" />
          <Form onSubmit={()=>{}}
          initialValues={{
            NomyApe: FilterTransaction.client ? FilterTransaction.client.name+" "+ FilterTransaction.client.lastName: "",
            TelefonoConFinal: FilterTransaction.client ? FilterTransaction.client.phone: "",
            
          }}
          >
          {({ handleSumbit  }) => (
          <form className="form-filter-modal" >
              <div className="modal-transaction-inputs">
                    <div>
                        <div className="filter-transaction-div-label">
                          <label className="label-filter-transaction-modal">
                          Nombre y apellido
                          </label>
                        </div>
                        <div>
                          <Field
                            type="text"
                            name="NomyApe"
                            component="input"
                            placeholder="Ingresá el nombre"
                            disabled={true}
                          />
                        </div>
                    </div>
                    <div>
                        <div className="filter-transaction-div-label">
                          <label className="label-filter-transaction-modal">
                              Teléfono
                          </label>
                        </div>
                        <div>
                          <Field
                            type="text"
                            name="TelefonoConFinal"
                            component="input"
                            placeholder="Ingresá el telefono"
                            disabled={true}
                          />
                        </div>
                    </div>
              </div>
            </form>
              )}
          </Form>
      </div>


      <div  key={FilterTransactionHistoryReverse.id}>
            <h3 className="modal-transaction-h3">Historial</h3>
            <hr className="modal-transaction-separate-option " />
            <section className="modal-transaction-section-history">
            {
     
            FilterTransactionHistoryReverse.map(historial => (
              
              <div key={historial.id} >{historial.reasonTag.tag!=="state_assigned"?<>
               <div className="modal-transaction-part" key={historial.id}>
                 {
                    historial.reasonTag.tag==="state_pickup_cancelled_temporally" || historial.reasonTag.tag==="state_pickup_cancelled_permanently" || historial.reasonTag.tag==="state_lost"  ?
                    <img src={Cancel} alt="Cancel" className="modal-transaction-img-okey" />
                     : 
                     <img src={Okey} alt="okey" className="modal-transaction-img-okey" />
                   
                 }
                 
                  {
                    historial.metadata[0] && historial.metadata[0].value.includes("Cancelado")? 
                      <p className="modal-transaction-part-subtitle"> { historial.metadata[0].value } </p>
                    :  historial.metadata[0] && historial.metadata[0].value.includes("Motivo") ?
                      <p className="modal-transaction-part-subtitle"> {"Cancelado por " +historial.metadata[0].value.toLowerCase() } </p>
                    :  historial.metadata[0] ? 
                    <p className="modal-transaction-part-subtitle"> {"Cancelado porque " +historial.metadata[0].value.toLowerCase() } </p>
                    : historial.reasonTag.tag=== "state_in_devolution" ? 
                    <p className="modal-transaction-part-subtitle"> { "En devolución porque "+historial.metadata[0].value.toLowerCase()} </p>
                    : 
                    <p className="modal-transaction-part-subtitle"> { convertirNombre(historial.reasonTag.tag) } </p>
                  }
       
                   
                   
                   {FilterTransaction &&  FilterTransaction.transactionHistory.length!==0?<p className="modal-transaction-part-info"> {historial  && convertDate(historial.createdAt) } </p>:null}
                
                  <Link  style={{textDecoration: 'none'}}className="modal-transaction-a" to={historial.curentValue ? `activeUserAdminpicker/${historial.curentValue}` : "#"}> { historial.reasonTag.tag==="assigned_picker"  ? "Ver Picker" : ""}   </Link>  
               </div>
                  <div className="modal-transaction-part">
                      <img
                        src={Connector}
                        alt="okey"
                        className="modal-transaction-img-connector"
                      />
                  </div></>:null}
              </div>
            ))
          }
          <div className="modal-transaction-part">
              <img src={Okey} alt="okey" className="modal-transaction-img-okey" />

              <p className="modal-transaction-part-subtitle">Pendiente</p>
              {
              FilterTransaction &&  FilterTransaction.transactionHistory &&FilterTransaction.transactionHistory.length!==0 ?<p className="modal-transaction-part-info">{ Object.keys(FilterTransaction).length !== 0 && FilterTransaction.transactionHistory[0]  ? convertDate(FilterTransaction.transactionHistory[0].createdAt)  : ""}    </p>
              :<p className="modal-transaction-part-info">{ Object.keys(FilterTransaction).length !== 0 && FilterTransaction.transaction ?   convertDate(FilterTransaction.transaction.createdAt)  : ""}     </p>
              }
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
              {
              FilterTransaction  &&FilterTransaction.transactionHistory&&FilterTransaction.transactionHistory.length!==0 ?<p className="modal-transaction-part-info">{ Object.keys(FilterTransaction).length !== 0 &&  FilterTransaction.transactionHistory[0]  ? convertDate(FilterTransaction.transactionHistory[0].createdAt)  : ""}  </p>
              :<p className="modal-transaction-part-info">{ Object.keys(FilterTransaction).length !== 0 && FilterTransaction.transaction ? convertDate(FilterTransaction.transaction.createdAt)  : ""}   </p>
              }
            </div>
            
          </section>
    </div>
      
     
      </div>
    
  );
};
