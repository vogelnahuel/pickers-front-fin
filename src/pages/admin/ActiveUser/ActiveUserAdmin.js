import React, { useEffect, useState } from 'react'
import {Header} from '../../../component/admin/Header/Header'
import {Nav} from '../../../component/admin/Nav/Nav'
import '../PendingUser/PendingUserAdmin.css'

import exportar from '../../../assets/admin/PendingUser/exportar.svg'
import or from '../../../assets/admin/PendingUser/or.svg'
import {Filter} from '../../../component/admin/Filter/Filter'
import { TableAdmin } from '../../../component/admin/table/TableAdmin'
import { PendingBlack } from '../../../component/admin/Sub-Title-Image/PendingBlack'
import {dataActiveUser} from './dataActiveUser'
import api from '../../../config/api'

export const ActiveUserAdmin = () => {
    /****titulos de la tabla */
    const titulosAdminActive = ['Nombre','DNI','Email','vehiculo','Transacciones','Estado','Editar'];
     /****llama a los campos y los envia */
    const [FieldsPart] = dataActiveUser();

    const [data, setData] = useState([])



    let filter={
        dni:"",
        nombre:"",
        mail:"",
        vehiculo:"",}

    const onFilter = (e) => {
        e.preventDefault();
        filter={
            dni:e.target.dni.value,
            nombre:e.target.NyA.value,
            mail:e.target.Email.value,
            vehiculo:e.target.Vehículo.value,
        }
       getData(filter)
    }

    useEffect(()=>{
        if(!window.localStorage.getItem('token')){
            window.location.href = '/'
        }
            //getData(filter);
            const cargarDatos = async () =>  {
           
                setData ( await api.get(`ms-admin-rest/api/v1.0/pickers?pickerStatusId=4,5`)
                .then((res)=>{return res.data.result.items})
                .catch((err)=>{console.log(err)})  )
            }
            cargarDatos();
      },[])
      
      const getData = async (filter) =>{

        filter.mail= codificarEmailURI(filter.mail);

       setData(  await api.get(`ms-admin-rest/api/v1.0/pickers?pickerStatusId=4,5${filter.nombre?`&name=${filter.nombre}`:""}${filter.vehiculo!=="DEFAULT"?`&vehicleTypeId=${filter.vehiculo==="moto"?1:2}`:""}${filter.dni?`&identificationNumber=${parseInt(filter.dni)}`:""}${filter.mail?`&email=${filter.mail}`:""}`)
        .then((res)=>{return res.data.result.items})
        .catch((err)=>{console.log(err)}) )
      }

      const codificarEmailURI = (mail) => {
        //busco la primera parte del email a codificar ejemplo  máth.+picker641
      const  emailCodificar =  (mail).substring(0,mail.indexOf("@"));
      //guardo despues del arroba sin codificar
      const  AliasDelMail =  (mail).substring(mail.indexOf("@"),(mail).length);
      //codifico  para hacer la consulta a la api
      const mailCodificado= encodeURIComponent(emailCodificar);
      //uno ambas cadenas
      mail = mailCodificado.concat(AliasDelMail);
      return mail;
    }
       
    return (
        <div className="background-Grey">
        <Header/>
        <div className="mainContainerFlex">
            <Nav/>
            <div className="pending-container">
                 <PendingBlack/>
                   
                 <div 
                 className="mainContainerFlex">
                     <h2 className="subTitle-pending">Pickers</h2>
                     <button 
                        
                        className="export"
                        name="export"
                        >
                        <img  src={exportar} alt="export" />
                        <img className="or-pending" src={or} alt="or" />
                        <p className="display-inline-block p-export"> Exportar</p>
                     </button>
                 </div>
                 
                 <Filter
                 FieldsPart={FieldsPart}
                 onSubmit={onFilter}
                 />
                 <br/>
                 <TableAdmin
                 titulosAdminActive={titulosAdminActive}
                 data={data}
                 />
            </div>
            
            
        </div>
        
    </div>
    )
}
