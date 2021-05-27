import React from 'react'
import cloud from '../../../assets/admin/PendingUserAdminPicker/cloud.svg'
import './loadAdminPicker.css'

export const LoadAdminPicker = (props) => {

    const {titulo,marginButton}=props;

    return (
        <div className="card-tam">
            <div className="card-admin-picker">
                <img className="img-admin-picker" src={cloud} alt="nube" />
                <p className="title-admin-picker"> {titulo} </p>
                <button className="button-admin-picker" style={{"marginTop":marginButton}} >Subir archivo</button>
                <p className="p-admin-picker">o arrastrar y soltar la imagen acá</p>
                
            </div>
            <div>
                <p className="load-font">El peso máximo del archivo debe ser de 5Mb y los formatos aceptados son PNG, JPG y JPEG </p>
            </div>
        </div>
    )
}
