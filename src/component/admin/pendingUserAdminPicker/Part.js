import React from 'react'
import { LoadAdminPicker } from '../LoadAdminPicker/LoadAdminPicker'


export const Part = () => {
    return (
        <div className="form-part-1-admin-pickers">
                <div className="Admin-Pickers-space">
                    <div>
                        <label className="label-Admin-Pickers" htmlFor="nombre">Nombre/s</label>
                    </div>
                    <div>
                        <input className="Admin-Pickers-input" type="text" name="nombre" id="nombre" placeholder="Ingresá el nombre"/>
                    </div>
                </div>
                <div className="Admin-Pickers-space">
                    <div>
                        <label className="label-Admin-Pickers" htmlFor="DNI">Apellido/s</label>
                    </div>
                    <div>
                        <input className="Admin-Pickers-input" type="text" name="DNI" id="DNI" placeholder="Ingresá el apellido" />
                    </div>
                </div>
                
                <div className="Admin-Pickers-space">
                    <div>
                    <label className="label-Admin-Pickers" htmlFor="Email">DNI</label>   
                    </div>
                    <div>
                        <input className="Admin-Pickers-input" type="text" name="Email" id="Email" placeholder="Ingresá el DNI"/>
                    </div>
                </div>
                <div className="Admin-Pickers-space">
                    <div>
                    <label className="label-Admin-Pickers" htmlFor="Email">E-mail</label>   
                    </div>
                    <div>
                        <input className="Admin-Pickers-input" type="text" name="Email" id="Email" placeholder="Ingresá el mail"/>
                    </div>
                </div>
                <div className="Admin-Pickers-space">
                    <div>
                    <label className="label-Admin-Pickers" htmlFor="Email">Fecha de nacimiento</label>   
                    </div>
                    <div>
                        <input className="Admin-Pickers-input" type="text" name="Email" id="Email" placeholder="Ingresá la fecha nac"/>
                    </div>
                </div>
                <div className="Admin-Pickers-space">
                    <div>
                    <label className="label-Admin-Pickers" htmlFor="Email">Teléfono</label>   
                    </div>
                    <div>
                        <input className="Admin-Pickers-input" type="text" name="Email" id="Email" placeholder="Ingresá el telefono"/>
                    </div>
                </div>
            
                
                
                    <div className="Admin-Pickers-space">
                        <LoadAdminPicker
                        titulo="Frente del DNI"
                        />
                        
                    </div>
                    <div className="Admin-Pickers-space">
                        <LoadAdminPicker
                        titulo="Dorso del DNI"
                        />
                    </div>
                    <div className="Admin-Pickers-space">
                        <LoadAdminPicker
                        titulo="Rostro de frente"
                        />
                    </div>
                

        </div>
    )
}
