import React, { useEffect, useState } from 'react'
import {Header} from '../../../component/admin/Header/Header'
import {Nav} from '../../../component/admin/Nav/Nav'
import './PendingUserAdmin.css'
import {PendingBlue} from '../../../component/admin/Sub-Title-Image/PendingBlue'
import exportar from '../../../assets/admin/PendingUser/exportar.svg'
import or from '../../../assets/admin/PendingUser/or.svg'
import {Filter} from '../../../component/admin/Filter/Filter'
import { TableAdmin } from '../../../component/admin/table/TableAdmin'
import {dataPendingUser}  from './dataPendingUser'
import api from '../../../config/api'
import codificarEmailURIFunction from '../../../tools/encodeMail.js'
import createCSV from '../../../tools/createCSV.js'


export const PendingUserAdmin = () => {
    /****titulos de la tabla */
    const titulosAdminPending = ['Nombre','DNI','Email','vehiculo','Pendiente hace','Editar'];
       /****llama a los campos y los envia */
    const [FieldsPart] = dataPendingUser();

    const [data, setData] = useState([])  

    let filter={
        dni:"",
        nombre:"",
        mail:"",
        vehiculo:"",}

    const onFilter =   (e) => {
      
            e.preventDefault();
            filter={
                dni:e.target.dni.value,
                nombre:e.target.NyA.value,
                mail:e.target.Email.value,
                vehiculo:e.target.Vehículo.value,
            }             
             getData(filter) 
        }
    
    const getData = async (filter) =>{
        filter.mail= codificarEmailURIFunction(filter.mail);      
        setData(  await api.get(`ms-admin-rest/api/v1.0/pickers?pickerStatusId=2,3${filter.nombre?`&name=${filter.nombre}`:""}${filter.vehiculo&&filter.vehiculo!=="DEFAULT"?`&vehicleTypeId=${filter.vehiculo==="moto"?1:2}`:""}${filter.dni?`&identificationNumber=${parseInt(filter.dni)}`:""}${filter.mail?`&email=${filter.mail}`:""}`)
       .then((res)=>{return res.data.result.items})
        .catch((err)=>{console.log(err)}) )      
      }
     
    useEffect(  ()=>{
        if(!window.localStorage.getItem('token')){
            window.location.href = '/'
        }
        const cargarDatos = async () =>  {
           
            setData ( await api.get(`ms-admin-rest/api/v1.0/pickers?pickerStatusId=2,3`)
            .then((res)=>{return res.data.result.items})
            .catch((err)=>{console.log(err)})  )
       }
        cargarDatos();
        
    },[])

    const Export = async () => {
        //setDataExport
        const datosExport =await api.get(`/ms-admin-rest/api/v1.0/pickers.csv?pickerStatusId=2,3`)
        .then( (res) => {return res})
        .catch((err) => {console.log(err)})

        createCSV(datosExport);     
    }

    return (
        <div className="background-Grey">
            <Header/>
            <div className="mainContainerFlex">
                <Nav/>
                <div className="pending-container">
                     <PendingBlue/>
                       
                     <div 
                     className="mainContainerFlex">
                         <h2 className="subTitle-pending"><p className="subtitle-pendingUser-h2">Solicitudes pendientes</p></h2>
                         <button 
                            onClick={Export}
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
                    titulosAdminPending={titulosAdminPending}
                    data={data}
                     />
                </div>
                
                
            </div>
            
        </div>
    )
}