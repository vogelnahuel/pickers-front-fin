import React, { useCallback, useEffect, useState } from "react";
import { LoadAdminPicker } from "../LoadAdminPicker/LoadAdminPicker";
import { Labels } from "../../Labels/Labels";
import "./part.scss";
import { SaveAdminPicker } from "../SaveAdminPicker/SaveAdminPicker";
import moment from "moment";
import { useParams } from "react-router-dom";
import { Fragment } from "react";

/**** muestro los campos con sus labels y tambien los componentes pasados */
export const Part = (props) => {
  const variables = props.inputsPart;
  const componentes = props.ComponentesPart;
  const dataPicker = props.data;

  
  
  const id =useParams().id;

  const [ObjFechas, setObjFechas] = useState({
    fechaVecCel:"",
    vencimientoLicencia:"",
    fechaVecSeguroAccidente:"",
    fechaVecSeguroAuto:""
    
  })

  let ErrorMenorEdad = false;
  let Informacion = props.Informacion;
  //let erroresExistentes=props.erroresExistentes;
 
  const setInformacion = props.setInformacion;
  const setdisabledButtonAprobarPicker = props.setdisabledButtonAprobarPicker;
  const setdisableButtons=props.setdisableButtons;
  const activeUser = props.active;


  useEffect(() => {

    if(document.querySelector('#fechaVecCel')!==null &&
       document.querySelector('#fechaVecLic')!==null &&
       document.querySelector('#fechaVecSeguroAccidente')!==null &&
       document.querySelector('#fechaVecSeguroAuto')!==null
      ){
      setObjFechas({
          ...ObjFechas,
           fechaVecCel: document.querySelector('#fechaVecCel').value,
           vencimientoLicencia:document.querySelector('#fechaVecLic').value,
           fechaVecSeguroAccidente:document.querySelector('#fechaVecSeguroAccidente').value,
           fechaVecSeguroAuto:document.querySelector('#fechaVecSeguroAuto').value

      });
      
      


    }
    
    if(document.querySelector('#fechaVecSeguroAccidente')!==null){
       
      if(Informacion.vehicleTypeId===2){
       
        setObjFechas({
          ...ObjFechas,
          fechaVecSeguroAccidente:document.querySelector('#fechaVecSeguroAccidente').value,
        })
      }
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Informacion] )



  const handleChange = (e) => {

  

    if(window.location.pathname===`/pendingUserAdminpicker/${id}`){
      setdisabledButtonAprobarPicker(false);
    }
    


    if(window.location.pathname===`/activeUserAdminpicker/${id}`){
      setdisableButtons(true)
    }
    
  

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
    if (e.target.name === "PatenteDelVehiculo") {
      setInformacion({
        ...Informacion,
        vehicle: e.target.value,
      });
    }

    if (e.target.name === "vencimientoLicencia") {

      

      if(ObjFechas.vencimientoLicencia!==undefined){

      

        if(e.target.value.length===2 && cuantasVecesAparece(e.target.value,'/')===0 ){
           
            if(ObjFechas.vencimientoLicencia.charAt(ObjFechas.vencimientoLicencia.length-1)==="/" && e.target.value.charAt(( e.target.value.length)-1) !== ObjFechas.vencimientoLicencia.charAt(ObjFechas.vencimientoLicencia.length-1))
                
            {
              e.target.value=e.target.value.substring(0,1);
            }
            else
            e.target.value = e.target.value + "/";
            
        }else if( e.target.value.length===5 && cuantasVecesAparece(e.target.value,'/') ===1){
          
          if(ObjFechas.vencimientoLicencia.charAt(ObjFechas.vencimientoLicencia.length-1)==="/" && e.target.value.charAt(( e.target.value.length)-1) !== ObjFechas.vencimientoLicencia.charAt(ObjFechas.vencimientoLicencia.length-1))
                
          {
            e.target.value=e.target.value.substring(0,4);
          }
          else
          e.target.value = e.target.value + "/";
        }
      }
      
      setInformacion({
        ...Informacion,
        expirationDateDriverLicense: e.target.value,
      });
    }
    if (e.target.name === "fechaVecCel") {

      

      if(ObjFechas.fechaVecCel!==undefined){

      

        if(e.target.value.length===2 && cuantasVecesAparece(e.target.value,'/')===0 ){
           
            if(ObjFechas.fechaVecCel.charAt(ObjFechas.fechaVecCel.length-1)==="/" && e.target.value.charAt(( e.target.value.length)-1) !== ObjFechas.fechaVecCel.charAt(ObjFechas.fechaVecCel.length-1))
                
            {
              e.target.value=e.target.value.substring(0,1);
            }
            else
            e.target.value = e.target.value + "/";
            
        }else if( e.target.value.length===5 && cuantasVecesAparece(e.target.value,'/') ===1){
          
          if(ObjFechas.fechaVecCel.charAt(ObjFechas.fechaVecCel.length-1)==="/" && e.target.value.charAt(( e.target.value.length)-1) !== ObjFechas.fechaVecCel.charAt(ObjFechas.fechaVecCel.length-1))
                
          {
            e.target.value=e.target.value.substring(0,4);
          }
          else
          e.target.value = e.target.value + "/";
        }
      }

      

      setInformacion({
        ...Informacion,
        expirationDateIdentificationCar: e.target.value,
      });
    }
    if (e.target.name === "fechaVecSeguroAuto") {

      if(ObjFechas.fechaVecSeguroAuto!==undefined){

      

        if(e.target.value.length===2 && cuantasVecesAparece(e.target.value,'/')===0 ){
           
            if(ObjFechas.fechaVecSeguroAuto.charAt(ObjFechas.fechaVecSeguroAuto.length-1)==="/" && e.target.value.charAt(( e.target.value.length)-1) !== ObjFechas.fechaVecSeguroAuto.charAt(ObjFechas.fechaVecSeguroAuto.length-1))
                
            {
              e.target.value=e.target.value.substring(0,1);
            }
            else
            e.target.value = e.target.value + "/";
            
        }else if( e.target.value.length===5 && cuantasVecesAparece(e.target.value,'/') ===1){
          
          if(ObjFechas.fechaVecSeguroAuto.charAt(ObjFechas.fechaVecSeguroAuto.length-1)==="/" && e.target.value.charAt(( e.target.value.length)-1) !== ObjFechas.fechaVecSeguroAuto.charAt(ObjFechas.fechaVecSeguroAuto.length-1))
                
          {
            e.target.value=e.target.value.substring(0,4);
          }
          else
          e.target.value = e.target.value + "/";
        }
      }
      setInformacion({
        ...Informacion,
        expirationDatePolicyVehicle: e.target.value,
      });
    }
    if (e.target.name === "fechaVecSeguroAccidente") {
     
      if(ObjFechas.fechaVecSeguroAccidente!==undefined){

     
        
      

        if(e.target.value.length===2 && cuantasVecesAparece(e.target.value,'/')===0 ){
           
            if(ObjFechas.fechaVecSeguroAccidente.charAt(ObjFechas.fechaVecSeguroAccidente.length-1)==="/" && e.target.value.charAt(( e.target.value.length)-1) !== ObjFechas.fechaVecSeguroAccidente.charAt(ObjFechas.fechaVecSeguroAccidente.length-1))
                
            {
              e.target.value=e.target.value.substring(0,1);
            }
            else
            e.target.value = e.target.value + "/";
            
        }else if( e.target.value.length===5 && cuantasVecesAparece(e.target.value,'/') ===1){
          
          if(ObjFechas.fechaVecSeguroAccidente.charAt(ObjFechas.fechaVecSeguroAccidente.length-1)==="/" && e.target.value.charAt(( e.target.value.length)-1) !== ObjFechas.fechaVecSeguroAccidente.charAt(ObjFechas.fechaVecSeguroAccidente.length-1))
                
          {
            e.target.value=e.target.value.substring(0,4);
          }
          else
          e.target.value = e.target.value + "/";
        }
      }
      
     
      setInformacion({
        ...Informacion,
        expirationDatePolicyPersonal: e.target.value,
      });
      console.log(Informacion)

    }

    validaciones(e);


  };


  function cuantasVecesAparece(cadena, caracter){
    var indices = [];
    for(var i = 0; i < cadena.length; i++) {
      if (cadena[i].toLowerCase() === caracter) indices.push(i);
    }
    return indices.length;
  }

  const validaciones =( e) => {
    const ex_regular_dni = /^\d{6,8}(?:[-\s]\d{4})?$/;
    const ex_regular_nomyape =/^[a-zA-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;;
    const ex_regular_fecha = /^(0[1-9]|[1-2]\d|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/
    const ex_regular_telefono =/^\(?\d{2,3}\)?[\s.-]?\d{3,4}[\s.-]?\d{4}$/;
    const ex_regular_patente= /[a-zA-Z][\s.-][0-9]/;
    
  
    if(ErrorMenorEdad!==true){
      e.target.classList.remove('inputError-part'); 
      e.target.parentNode.previousSibling.firstChild.classList.remove('labelError-part-top');
     
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
          e.target.parentNode.previousSibling.firstChild.classList.add('labelError-part-top');

          ErrorMenorEdad=true;
          const div = document.createElement('div');
          div.innerHTML = `
            <p class="labelError-part-bottom"> ${"Tenés que ser mayor de 18 años para ser picker."} </p>
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
      e.target.parentNode.previousSibling.firstChild.classList.add('labelError-part-top');
      const div = document.createElement('div');
      div.innerHTML = `
        <p class="labelError-part-bottom"> ${"Este campo es requerido"} </p>
      `
      e.target.parentNode.appendChild(div);

     

    }else if (e.target.name==="dni" &&  ex_regular_dni.test (e.target.value) !== true )
    {
      if(window.location.pathname===`/pendingUserAdminpicker/${id}`)
      setdisabledButtonAprobarPicker(true);

      if(window.location.pathname===`/activeUserAdminpicker/${id}`)
      setdisableButtons(false)
    
      e.target.classList.add('inputError-part');
      e.target.parentNode.previousSibling.firstChild.classList.add('labelError-part-top');
      const div = document.createElement('div');
      div.innerHTML = `
        <p class="labelError-part-bottom"> ${"El dni tiene que tener entre 6 y 8  números sin letras"} </p>
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
      e.target.parentNode.previousSibling.firstChild.classList.add('labelError-part-top');

     
      
       const div = document.createElement('div');
      div.innerHTML = `
        <p class="labelError-part-bottom"> ${`No se admiten números o caracteres especiales en ${e.target.name}`} </p>
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
        e.target.parentNode.previousSibling.firstChild.classList.add('labelError-part-top');
  
        
    
        const div = document.createElement('div');
        
        div.innerHTML = `
          <p class="labelError-part-bottom"> ${"El formato es fecha es inválido"} </p>
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
      e.target.parentNode.previousSibling.firstChild.classList.add('labelError-part-top');

      const div = document.createElement('div');
      div.innerHTML = `
        <p class="labelError-part-bottom"> ${"Ingresá el teléfono. Ej: 011-1234-1234"} </p>
      `
      e.target.parentNode.appendChild(div);

      
    }
    if(e.target.name==="PatenteDelVehiculo" && e.target.value !== "" && ex_regular_patente.test(e.target.value) !== true )
    {
      if(window.location.pathname===`/pendingUserAdminpicker/${id}`)
      setdisabledButtonAprobarPicker(true);

      if(window.location.pathname===`/activeUserAdminpicker/${id}`)
      setdisableButtons(false)

      e.target.classList.add('inputError-part');
      e.target.parentNode.previousSibling.firstChild.classList.add('labelError-part-top');

      const div = document.createElement('div');
      div.innerHTML = `
        <p class="labelError-part-bottom"> ${"Ingrese una patente valida"} </p>
      `
      e.target.parentNode.appendChild(div);

      
    }

   if( window.location.pathname===`/pendingUserAdminpicker/${id}` && document.querySelector('.inputError-part')===null){
    setdisabledButtonAprobarPicker(false);
   }
   else if(window.location.pathname===`/pendingUserAdminpicker/${id}`){
    setdisabledButtonAprobarPicker(true);
   }

   if( window.location.pathname===`/activeUserAdminpicker/${id}` && document.querySelector('.inputError-part')===null){
    setdisableButtons(true);
   }
   else if(window.location.pathname===`/activeUserAdminpicker/${id}`){
    setdisableButtons(false);
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
         
            setdisabledButtonAprobarPicker(true);
          }
        



        if (
          Informacion.vehicleTypeId === 2 &&
          Informacion.expirationDatePolicyPersonal !== null
        ) {
          if (Informacion.expirationDatePolicyPersonal.length < 10)
       
          setdisabledButtonAprobarPicker(true);
        }
        if (
          Informacion.vehicleTypeId === 2 &&
          Informacion.expirationDatePolicyPersonal !== null
        ) {
          if (Informacion.expirationDatePolicyPersonal.length >= 10)
         
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
       
            setdisabledButtonAprobarPicker(true);
          }
        }

        if (
          Informacion.vehicleTypeId === 2 &&
          Informacion.expirationDatePolicyPersonal !== null
        ) {
          if (Informacion.expirationDatePolicyPersonal.length < 10)
      
          setdisabledButtonAprobarPicker(true);
        }
        if (
          Informacion.vehicleTypeId === 2 &&
          Informacion.expirationDatePolicyPersonal !== null
        ) {
          if (Informacion.expirationDatePolicyPersonal.length >= 10)
         
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


const eliminarDivs = ()  => {
  const deleteDivs = document.querySelector('#fechaVecSeguroAccidente');
  
  if(deleteDivs){
  
    
    if(deleteDivs.parentNode.parentNode.parentNode.nextSibling)
    deleteDivs.parentNode.parentNode.parentNode.nextSibling.remove()
    for(let i = 0 ; i < 3 ; i ++){
      if(deleteDivs.parentNode.parentNode.parentNode.parentNode  && (deleteDivs.parentNode.parentNode.parentNode.parentNode.firstChild!==deleteDivs.parentNode.parentNode.parentNode.parentNode.lastChild) ){
        deleteDivs.parentNode.parentNode.parentNode.parentNode.firstChild.remove()
      
      }
    }
   
  }
}
 




  return (
    <>
      { variables.map((variable) => (
        <Fragment key={variable.id}>

                {  dataPicker.vehicleTypeId === 2 &&
                   variable.name === "fechaVecSeguroAccidente" ? (
                    <div
                      key={props.clave + "alone"}
                      className="Admin-Pickers-space-alone"
                    >
                      {variable.name === "fechaVecSeguroAccidente" ? (
                        <div key={variable.label.labelhtmlFor}>
                          <div className="flota-part-div-label">
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
                          <>
                          {
                          eliminarDivs()
                           }
                          </>
                        </div>
                      ) : null
                      }
                    </div>
                  ) : null
              }
               {variable.name === "CodArea" ?
                      <div className="admin-picker-part-telefono">
                          <div className="label-Admin-Pickers-middle">
                            <Labels
                              width={variable.label.labelwidth}
                              className={variable.label.labelclassName}
                              htmlFor={variable.label.labelhtmlFor}
                              parrafo={variable.label.labelparrafo}
                            />
                          </div>
                          <div className="admin-picker-part-tel">
                            <input
                              value=""
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
                        
                        : null
                      
              }
               
               {variable.name === "telefono" ?
                      <div className="admin-picker-part-telefono">
                          <div className="label-Admin-Pickers-middle">
                            <Labels
                              width={variable.label.labelwidth}
                              className={variable.label.labelclassName}
                              htmlFor={variable.label.labelhtmlFor}
                              parrafo={variable.label.labelparrafo}
                            />
                          </div>
                          <div className="admin-picker-part-tel">
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
                          </div>
                    </div>   
                    :
                              <>
                              {
                                variable.name!=="CodArea" ? 
                              
                          <div key={variable.id} className="Admin-Pickers-space">
                                  {
                                  variable.type !== "" ? (
                                    <>
                                      <div className="flota-part-div-label">
                                        {dataPicker.vehicleTypeId === 2 &&
                                        variable.name === "fechaVecSeguroAccidente" ? (
                                          <>
                                        
                                          </>
                                        ) : dataPicker.vehicleTypeId === 2 &&
                                          (variable.name === "vencimientoLicencia" ||
                                            variable.name === "fechaVecCel" ||
                                            variable.name === "fechaVecSeguroAuto") ? (
                                          <></>
                                        ) : 
                                        variable.name !== "telefono" && variable.name !=="CodArea" ?
                                          <Labels
                                            width={variable.label.labelwidth}
                                            className={variable.label.labelclassName}
                                            htmlFor={variable.label.labelhtmlFor}
                                            parrafo={variable.label.labelparrafo}
                                          />
                                          : null
                                        }
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
                                                    { variable.name === "PatenteDelVehiculo" ? 
                                                       <input
                                                       value={
                                                        Informacion.vehicle ? Informacion.vehicle : ""
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
                                                     : null

                                                    }
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
                                              ) :
                                                <></>
                                              }
                                      </div>
                                    </>
                         ) : null}
                     </div>
                   : null } </>
                  }
        </Fragment>
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
