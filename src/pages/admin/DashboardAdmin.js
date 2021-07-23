import React, { useEffect, useState } from 'react'
import { Card } from '../../component/admin/DashBoard/Card'
import {Header} from '../../component/admin/Header/Header'
import {Nav} from '../../component/admin/Nav/Nav'
import './Dashboard.scss'
import api from '../../config/api'


export const DashboardAdmin = () => {
    const [loader, setloader] = useState(true)
    const [transactionApi, settransactionApi] = useState({
        "result": {
            "activeTransactions": 0,
            "pendingTransactions": 0,
            "inAlertTransactions": 0
        }
      })

    useEffect( ()=>{

        if(!window.localStorage.getItem('token')){
            window.location.href = '/'
        }
        const cargarDatos = async() => {
            settransactionApi(
               await   api.get('ms-admin-rest/api/v1.0/transactions/dashboard')
               .then( (res)=> { 
                   
                   return res.data.result
                    }
                )
               .catch((err)=>  err)
               )
             }
             cargarDatos();
        },[])
     
       

      useEffect(  () => {
          setTimeout(() => {
            setloader(false)
          }, 500);
     
        
      }, [])


      
//
    return (
        <div className="background-Grey">
            <Header/>
          <div className="mainContainerFlex">  
                <Nav/>
                
              
                            <div className="Admin-container">
                                <h2 className="title_Dashboard_Admin">Dashboard</h2>
                                <h3 className="subtitle_Dashboard_Admin">Visualizá la información más importante</h3>
                                    <div className="card-admin">

                                            <Card
                                             subtitle="Pickers"
                                             title="En linea"
                                             number="-"
                                             backgroundColor="#63E8A8"
                                            />
                                            <Card
                                             subtitle="Transacciones"
                                             title="Activas"
                                             number={transactionApi ? transactionApi.activeTransactions : "-" }
                                             backgroundColor="#63E8A8"
                                            />

                                             <Card
                                             subtitle="Transacciones"
                                             title="Pendientes de asignación"
                                             number={transactionApi ? transactionApi.pendingTransactions : "-" }
                                             backgroundColor="#BCB6FF"
                                            />
                                             <Card
                                             subtitle="Transacciones"
                                             title="En alerta"
                                             number={transactionApi ? transactionApi.inAlertTransactions : "-" }
                                             backgroundColor="#FF8F76"
                                            />

                                </div>
                            </div>
              
            </div>
        {   loader ===true ?
            <div className="modalLoading">
            </div>
                :<></>
        }
            
           
            
        </div>
    )
}
