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


    useEffect(()=>{
        if(!window.localStorage.getItem('token')){
            window.location.href = '/'
        }
            getData();
      },[])
      
      const getData = async () =>{
       setData(  await api.get('ms-admin-rest/api/v1.0/pickers?pickerStatusId=4,5')
        .then((res)=>{return res.data.result.items})
        .catch((err)=>{console.log(err)}) )
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
