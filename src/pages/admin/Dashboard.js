import React from 'react'
import {Header} from '../../component/admin/Header/Header'
import {Nav} from '../../component/admin/Nav/Nav'
import './Dashboard.css'
export const Dashboard = () => {
    return (
        <div className="fondo">
            <Header/>
            <div className="headerContainerFlex ">
                <Nav/>
                
            </div>
            
        </div>
    )
}
