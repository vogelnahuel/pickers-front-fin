import React from 'react'
import './saveAdminPicker.css'
import correct from '../../../assets/admin/ActiveUserAdminPicker/correct.svg'
import fileAdminPicker from '../../../assets/admin/ActiveUserAdminPicker/fileAdminPicker.svg'
import cancel from '../../../assets/admin/ActiveUserAdminPicker/cancel.svg'

export const SaveAdminPicker = (props) => {

    const {titulo,marginButton} = props;

    return (
        <div className="card-tam">
        <div className="card-admin-picker2">
            <img className="img-admin-picker" src={correct} alt="correct" />
            <p className="title-admin-picker"> {titulo} </p>
            <button className="button-admin-picker2" style={{"marginTop":marginButton}} > 
            
            <img className="img-admin-picker2" src={fileAdminPicker} alt="file"/>
                foto_local.jpg
            <img className="img-admin-picker3" src={cancel} alt="file"/>
            
            </button>
            
        </div>
        <div>
            <p className="load-font">El peso máximo del archivo debe ser de 5Mb y los formatos aceptados son PNG, JPG y JPEG </p>
        </div>
    </div>
    )
}
