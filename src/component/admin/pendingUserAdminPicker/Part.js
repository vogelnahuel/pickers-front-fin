import React, { useCallback, useEffect } from "react";
import { LoadAdminPicker } from "../LoadAdminPicker/LoadAdminPicker";
import { Labels } from "../../Labels/Labels";
import "./part.css";
import { SaveAdminPicker } from "../SaveAdminPicker/SaveAdminPicker";
import moment from "moment";
import { useParams } from "react-router-dom";

/**** muestro los campos con sus labels y tambien los componentes pasados */
export const Part = (props) => {
  const variables = props.inputsPart;
  const componentes = props.ComponentesPart;
  const dataPicker = props.data;
  
  const id =useParams().id;

 

  let ErrorMenorEdad = false;
  let Informacion = props.Informacion;
  //let erroresExistentes=props.erroresExistentes;
 
  const setInformacion = props.setInformacion;
  const setdisabledButtonAprobarPicker = props.setdisabledButtonAprobarPicker;
  const setdisableButtons=props.setdisableButtons;
  const activeUser = props.active;



  /*
    const handleSubmit = () =>{
        console.log("submit")
    }*/

  const handleChange = (e) => {

    if(window.location.pathname===`/pendingUserAdminpicker/${id}`){
      setdisabledButtonAprobarPicker(false);
    }
    


    if(window.location.pathname===`/activeUserAdminpicker/${id}`){
      setdisableButtons(true)
    }
    
  
    /*
        setInformacion( {
                        ...Informacion,
                        [e.target.name]:e.target.value
                        }
                 ); */
                
    
    if (e.target.name === "nombre") {
      setInformacion({
        ...Informacion,
        name: e.target.value,
      });
    }
    if (e.target.name === "apellido") {
      setInformacion({
        ...Informacion,
        surname: e.target.value,
      });
    }

    if (e.target.name === "fechaNac") {
      setInformacion({
        ...Informacion,
        dateOfBirth: e.target.value,
      });
    }
    if (e.target.name === "telefono") {
      setInformacion({
        ...Informacion,
        phoneNumber: e.target.value,
      });
    }

    if (e.target.name === "dni") {
      setInformacion({
        ...Informacion,
        identificationNumber: e.target.value,
      });
    }
    if (e.target.name === "nombreBanco") {
      setInformacion({
        ...Informacion,
        bankName: e.target.value,
      });
    }

    if (e.target.name === "vencimientoLicencia") {
      setInformacion({
        ...Informacion,
        expirationDateDriverLicense: e.target.value,
      });
    }
    if (e.target.name === "fechaVecCel") {
      setInformacion({
        ...Informacion,
        expirationDateIdentificationCar: e.target.value,
      });
    }
    if (e.target.name === "fechaVecSeguroAuto") {
      setInformacion({
        ...Informacion,
        expirationDatePolicyVehicle: e.target.value,
      });
    }
    if (e.target.name === "fechaVecSeguroAccidente") {
      setInformacion({
        ...Informacion,
        expirationDatePolicyPersonal: e.target.value,
      });
    }

    validaciones(e);

  };

  const validaciones =( e) => {
    const ex_regular_dni = /^\d{6,8}(?:[-\s]\d{4})?$/;
    const ex_regular_nomyape =/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;;
    const ex_regular_fecha = /^(0[1-9]|[1-2]\d|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/
    const ex_regular_telefono = /^[0-9,-]{14,17}$/;
    
  
    if(ErrorMenorEdad!==true){
      e.target.classList.remove('inputError-part'); 
      e.target.parentNode.previousSibling.firstChild.classList.remove('labelError-part');
     
    }
    
    if(e.target.nextSibling!==null && ErrorMenorEdad!==true){
      while(e.target.nextSibling){
      e.target.parentNode.removeChild(e.target.nextSibling);}
      
    }

    


    if ((e.target.name==="fechaNac"|| e.target.name==="vencimientoLicencia"|| e.target.name==="fechaVecCel" || e.target.name==="fechaVecSeguroAuto" || e.target.name==="fechaVecSeguroAccidente")   && ex_regular_fecha.test (e.target.value) === true && e.target.value.length===10){
      
      
      if(e.target.name==="fechaNac"){
    
        const regDate = moment();
        const actualDate = moment(e.target.value, "DD/MM/YYYY");
        
        
        if(regDate.diff(actualDate, "years")<18){
          if(window.location.pathname===`/pendingUserAdminpicker/${id}`)
          setdisabledButtonAprobarPicker(true);

          if(window.location.pathname===`/activeUserAdminpicker/${id}`)
          setdisableButtons(false)

          e.target.classList.add('inputError-part');
          e.target.parentNode.previousSibling.firstChild.classList.add('labelError-part');

          ErrorMenorEdad=true;
          const div = document.createElement('div');
          div.innerHTML = `
            <p class="labelError-part"> ${"Tenés que ser mayor de 18 años para ser picker."} </p>
          `
          e.target.parentNode.appendChild(div);
        }
        else{
          ErrorMenorEdad=false;
        }
  
      }
    }
 
    
    if(e.target.value.length===0){

      if(window.location.pathname===`/pendingUserAdminpicker/${id}`)
      setdisabledButtonAprobarPicker(true);

      if(window.location.pathname===`/activeUserAdminpicker/${id}`)
      setdisableButtons(false)

      e.target.classList.add('inputError-part');
      e.target.parentNode.previousSibling.firstChild.classList.add('labelError-part');
      const div = document.createElement('div');
      div.innerHTML = `
        <p class="labelError-part"> ${"Este campo es requerido"} </p>
      `
      e.target.parentNode.appendChild(div);

     

    }else if (e.target.name==="dni" &&  ex_regular_dni.test (e.target.value) !== true )
    {
      if(window.location.pathname===`/pendingUserAdminpicker/${id}`)
      setdisabledButtonAprobarPicker(true);

      if(window.location.pathname===`/activeUserAdminpicker/${id}`)
      setdisableButtons(false)
    
      e.target.classList.add('inputError-part');
      e.target.parentNode.previousSibling.firstChild.classList.add('labelError-part');
      const div = document.createElement('div');
      div.innerHTML = `
        <p class="labelError-part"> ${"El dni tiene que tener entre 6 y 8  números sin letras"} </p>
      `
      e.target.parentNode.appendChild(div);

    
    }
    else if ( (e.target.name==="nombre" || e.target.name==="apellido")  && ex_regular_nomyape.test (e.target.value) !== true  )
    {
      if(window.location.pathname===`/pendingUserAdminpicker/${id}`)
      setdisabledButtonAprobarPicker(true);

      if(window.location.pathname===`/activeUserAdminpicker/${id}`)
      setdisableButtons(false)

      e.target.classList.add('inputError-part');
      e.target.parentNode.previousSibling.firstChild.classList.add('labelError-part');

     
      
       const div = document.createElement('div');
      div.innerHTML = `
        <p class="labelError-part"> ${`No se admiten números o caracteres especiales en ${e.target.name}`} </p>
      `
      e.target.parentNode.appendChild(div);
     
    }
    else if( (e.target.name==="fechaNac"|| e.target.name==="vencimientoLicencia"|| e.target.name==="fechaVecCel" || e.target.name==="fechaVecSeguroAuto" || e.target.name==="fechaVecSeguroAccidente")    && ErrorMenorEdad!==true  )
    {
     
      if(e.target.value.length>10 || ex_regular_fecha.test (e.target.value) !== true ){

        if(window.location.pathname===`/pendingUserAdminpicker/${id}`)
        setdisabledButtonAprobarPicker(true); 

        if(window.location.pathname===`/activeUserAdminpicker/${id}`)
        setdisableButtons(false)

        e.target.classList.add('inputError-part');
        e.target.parentNode.previousSibling.firstChild.classList.add('labelError-part');
  
        
    
        const div = document.createElement('div');
        
        div.innerHTML = `
          <p class="labelError-part"> ${"El formato es fecha es invalido"} </p>
        `
        e.target.parentNode.appendChild(div);
      }

    
     
     

      
      
    }
  
    else if(e.target.name==="telefono"   && ex_regular_telefono.test (e.target.value) !== true  )
    {
      if(window.location.pathname===`/pendingUserAdminpicker/${id}`)
      setdisabledButtonAprobarPicker(true);

      if(window.location.pathname===`/activeUserAdminpicker/${id}`)
      setdisableButtons(false)

      e.target.classList.add('inputError-part');
      e.target.parentNode.previousSibling.firstChild.classList.add('labelError-part');

      const div = document.createElement('div');
      div.innerHTML = `
        <p class="labelError-part"> ${"Ingresá el teléfono. Ej: 011-1234-1234"} </p>
      `
      e.target.parentNode.appendChild(div);

      
    }

   
    
    


  }




  const verificarInformacion = useCallback(
    (Informacion) => {
      if (activeUser===false) {
  
        if(Informacion.vehicleTypeId === 1){
            setdisabledButtonAprobarPicker(true);
        }
        if (
          Informacion.vehicleTypeId === 1 &&
          Informacion.expirationDateDriverLicense !== null
        ) {
          if (
            Informacion.expirationDateDriverLicense.length < 10 ||
            Informacion.expirationDateIdentificationCar.length < 10 ||
            Informacion.expirationDatePolicyVehicle.length < 10 ||
            Informacion.expirationDatePolicyPersonal.length < 10
          ) {
            console.log("1");
            setdisabledButtonAprobarPicker(true);
          }
        }
        if (
          Informacion.vehicleTypeId === 1 &&
          Informacion.expirationDateDriverLicense !== null
        ) {
          if (
            Informacion.expirationDateDriverLicense.length >= 10 &&
            Informacion.expirationDateIdentificationCar.length >= 10 &&
            Informacion.expirationDatePolicyVehicle.length >= 10 &&
            Informacion.expirationDatePolicyPersonal.length >= 10
          ) {
            console.log("2");
            setdisabledButtonAprobarPicker(true);
          }
        



        if (
          Informacion.vehicleTypeId === 2 &&
          Informacion.expirationDatePolicyPersonal !== null
        ) {
          if (Informacion.expirationDatePolicyPersonal.length < 10)
            console.log("3");
          setdisabledButtonAprobarPicker(true);
        }
        if (
          Informacion.vehicleTypeId === 2 &&
          Informacion.expirationDatePolicyPersonal !== null
        ) {
          if (Informacion.expirationDatePolicyPersonal.length >= 10)
            console.log("4");
          setdisabledButtonAprobarPicker(true);
        }
      }

      if (!activeUser) {
        if (
          Informacion.vehicleTypeId === 1 &&
          Informacion.expirationDateDriverLicense !== null
        ) {
          if (
            Informacion.expirationDateDriverLicense.length < 10 ||
            Informacion.expirationDateIdentificationCar.length < 10 ||
            Informacion.expirationDatePolicyVehicle.length < 10 ||
            Informacion.expirationDatePolicyPersonal.length < 10
          ) {
            console.log("1");
            setdisabledButtonAprobarPicker(true);
          }
        }
        if (
          Informacion.vehicleTypeId === 1 &&
          Informacion.expirationDateDriverLicense !== null
        ) {
          if (
            Informacion.expirationDateDriverLicense.length >= 10 &&
            Informacion.expirationDateIdentificationCar.length >= 10 &&
            Informacion.expirationDatePolicyVehicle.length >= 10 &&
            Informacion.expirationDatePolicyPersonal.length >= 10
          ) {
            console.log("2");
            setdisabledButtonAprobarPicker(true);
          }
        }

        if (
          Informacion.vehicleTypeId === 2 &&
          Informacion.expirationDatePolicyPersonal !== null
        ) {
          if (Informacion.expirationDatePolicyPersonal.length < 10)
            console.log("3");
          setdisabledButtonAprobarPicker(true);
        }
        if (
          Informacion.vehicleTypeId === 2 &&
          Informacion.expirationDatePolicyPersonal !== null
        ) {
          if (Informacion.expirationDatePolicyPersonal.length >= 10)
            console.log("4");
          setdisabledButtonAprobarPicker(true);
        }
      }
    }
    },
    [setdisabledButtonAprobarPicker,activeUser]
  )

  useEffect(() => {
    verificarInformacion(Informacion);

  }, [verificarInformacion, Informacion]);

  return (
    <>
      {variables.map((variable) => (
        <div key={variable.id}>
          {dataPicker.vehicleTypeId === 2 &&
          variable.name === "fechaVecSeguroAccidente" ? (
            <div
              key={props.clave + "alone"}
              className="Admin-Pickers-space-alone"
            >
              {variable.name === "fechaVecSeguroAccidente" ? (
                <div key={variable.label.labelhtmlFor}>
                  <div>
                    <Labels
                      width={variable.label.labelwidth}
                      className={variable.label.labelclassName}
                      htmlFor={variable.label.labelhtmlFor}
                      parrafo={variable.label.labelparrafo}
                    />
                  </div>
                  <div>
                    <input
                      value={
                        Informacion.expirationDatePolicyPersonal
                          ? Informacion.expirationDatePolicyPersonal
                          : ""
                      }
                      onChange={(e) => {
                        handleChange(e, variable.id);
                      }}
                      className={variable.className}
                      type={variable.type}
                      name={variable.name}
                      id={variable.id}
                      placeholder={variable.placeholder}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          <div key={variable.id} className="Admin-Pickers-space">
            {variable.type !== "" ? (
              <>
                <div>
                  {dataPicker.vehicleTypeId === 2 &&
                  variable.name === "fechaVecSeguroAccidente" ? (
                    <></>
                  ) : dataPicker.vehicleTypeId === 2 &&
                    (variable.name === "vencimientoLicencia" ||
                      variable.name === "fechaVecCel" ||
                      variable.name === "fechaVecSeguroAuto") ? (
                    <></>
                  ) : (
                    <Labels
                      width={variable.label.labelwidth}
                      className={variable.label.labelclassName}
                      htmlFor={variable.label.labelhtmlFor}
                      parrafo={variable.label.labelparrafo}
                    />
                  )}
                </div>
                <div>
                  {variable.name === "nombre" && (
                    <input
                      value={Informacion.name ? Informacion.name : ""}
                      onChange={(e) => {
                        handleChange(e, variable.id);
                      }}
                      className={variable.className}
                      type={variable.type}
                      name={variable.name}
                      id={variable.id}
                      placeholder={variable.placeholder}
                    />
                  )}
                  {variable.name === "apellido" && (
                    <input
                      value={Informacion.surname ? Informacion.surname : ""}
                      onChange={(e) => {
                        handleChange(e, variable.id);
                      }}
                      className={variable.className}
                      type={variable.type}
                      name={variable.name}
                      id={variable.id}
                      placeholder={variable.placeholder}
                    />
                  )}
                  {variable.name === "dni" && (
                    <input
                    readOnly
                      value={
                        Informacion.identificationNumber
                          ? Informacion.identificationNumber
                          : ""
                      }
                      onChange={(e) => {
                        handleChange(e, variable.id);
                      }}
                      className={variable.className}
                      type={variable.type}
                      name={variable.name}
                      id={variable.id}
                      placeholder={variable.placeholder}
                    />
                  )}
                  {variable.name === "email" && (
                    <input
                      readOnly
                      value={Informacion.email ? Informacion.email : ""}
                      onChange={(e) => {
                        handleChange(e, variable.id);
                      }}
                      className={variable.className}
                      type={variable.type}
                      name={variable.name}
                      id={variable.id}
                      placeholder={variable.placeholder}
                    />
                  )}
                  {variable.name === "fechaNac" && (
                    <input
                      value={
                        Informacion.dateOfBirth ? Informacion.dateOfBirth : ""
                      }
                      onChange={(e) => {
                        handleChange(e, variable.id);
                      }}
                      className={variable.className}
                      type={variable.type}
                      name={variable.name}
                      readOnly
                      id={variable.id}
                      placeholder={variable.placeholder}
                    />
                  )}
                  {variable.name === "telefono" && (
                    <input
                      value={
                        Informacion.phoneNumber ? Informacion.phoneNumber : ""
                      }
                      onChange={(e) => {
                        handleChange(e, variable.id);
                      }}
                      className={variable.className}
                      type={variable.type}
                      name={variable.name}
                      id={variable.id}
                      placeholder={variable.placeholder}
                    />
                  )}

                  {variable.name === "nombreBanco" && (
                    <input
                      value={Informacion.bankName ? Informacion.bankName : ""}
                      onChange={(e) => {
                        handleChange(e, variable.id);
                      }}
                      className={variable.className}
                      type={variable.type}
                      name={variable.name}
                      readOnly
                      id={variable.id}
                      placeholder={variable.placeholder}
                    />
                  )}
                  {variable.name === "cbu" && (
                    <input
                      readOnly
                      value={
                        Informacion.bankIdentifier
                          ? Informacion.bankIdentifier
                          : ""
                      }
                      onChange={(e) => {
                        handleChange(e, variable.id);
                      }}
                      className={variable.className}
                      type={variable.type}
                      name={variable.name}
                      id={variable.id}
                      placeholder={variable.placeholder}
                    />
                  )}
                  {variable.name === "cuit" && (
                    <input
                      readOnly
                      value={
                        Informacion.fiscalNumber ? Informacion.fiscalNumber : ""
                      }
                      onChange={(e) => {
                        handleChange(e, variable.id);
                      }}
                      className={variable.className}
                      type={variable.type}
                      name={variable.name}
                      id={variable.id}
                      placeholder={variable.placeholder}
                    />
                  )}
                  {dataPicker.vehicleTypeId === 1 ? (
                    <>
                      {variable.name === "vencimientoLicencia" && (
                        <input
                          value={
                            Informacion.expirationDateDriverLicense
                              ? Informacion.expirationDateDriverLicense
                              : ""
                          }
                          onChange={(e) => {
                            handleChange(e, variable.id);
                          }}
                          className={variable.className}
                          type={variable.type}
                          name={variable.name}
                          id={variable.id}
                          placeholder={variable.placeholder}
                        />
                      )}
                      {variable.name === "fechaVecCel" && (
                        <input
                          value={
                            Informacion.expirationDateIdentificationCar
                              ? Informacion.expirationDateIdentificationCar
                              : ""
                          }
                          onChange={(e) => {
                            handleChange(e, variable.id);
                          }}
                          className={variable.className}
                          type={variable.type}
                          name={variable.name}
                          id={variable.id}
                          placeholder={variable.placeholder}
                        />
                      )}
                      {variable.name === "fechaVecSeguroAuto" && (
                        <input
                          key={variable.id}
                          value={
                            Informacion.expirationDatePolicyVehicle
                              ? Informacion.expirationDatePolicyVehicle
                              : ""
                          }
                          onChange={(e) => {
                            handleChange(e, variable.id);
                          }}
                          className={variable.className}
                          type={variable.type}
                          name={variable.name}
                          id={variable.id}
                          placeholder={variable.placeholder}
                        />
                      )}
                      {variable.name === "fechaVecSeguroAccidente" && (
                        <input
                          value={
                            Informacion.expirationDatePolicyPersonal
                              ? Informacion.expirationDatePolicyPersonal
                              : ""
                          }
                          onChange={(e) => {
                            handleChange(e, variable.id);
                          }}
                          className={variable.className}
                          type={variable.type}
                          name={variable.name}
                          id={variable.id}
                          placeholder={variable.placeholder}
                        />
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>
      ))}
      {componentes
        ? componentes.map((componente) => (
            <div key={componente.title} className="Admin-Pickers-space">
              {componente.componentType === "LoadAdminPicker" ? (
                <LoadAdminPicker
                  titulo={componente.title}
                  marginButton={componente.marginButton}
                />
              ) : null}
              {componente.componentType === "SaveAdminPicker" ? (
                <SaveAdminPicker
                  titulo={componente.title}
                  marginButton={componente.marginButton}
                />
              ) : null}
            </div>
          ))
        : null}
    </>
  );
};
