import React from 'react';
import button from "assets/admin/ActiveUserAdminPicker/button.svg";
import disabledButton from "assets/admin/ActiveUserAdminPicker/disabledButton.svg";

export const Switch= ({input}) => {

    return (
        <div>
            <h3 className="subTitle-pending-data">Estado</h3>
            <div className="active-admin-picker-estado-container">
                <p className={input.value?"admin-active-picker":"admin-buttonDisabled-picker-disabled"}>Deshabilitado</p>
                <img
                    onClick={()=>input.onChange(!input.value)}
                    className="button-active-picker" src={input.value ? button : disabledButton}/>
                <p className={input.value?"admin-active-picker-p":"admin-buttonDisabled-picker-enabled"}>Habilitado</p>
            </div >
        </div>
    )
};
