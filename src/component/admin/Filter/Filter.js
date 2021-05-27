import React from 'react'
import './filter.css'
import desplegable from  '../../../assets/admin/PendingUser/desplegable.svg'
import or from '../../../assets/admin/PendingUser/or.svg'
import search from  '../../../assets/admin/PendingUser/search.svg'


export const Filter = () => {
    return (
        <div className="form-fiter">
                
                    <img className="tamImgFilter" src={desplegable} alt="" />
                    <p className="Filter-p">Filtros</p>

                <form className="filter-inputs">
                    <div className="filter-space">
                        <div>
                            <label className="label-filter" htmlFor="nombre">Nombre</label>
                        </div>
                        <div>
                            <input className="filter-input" type="text" name="nombre" id="nombre" placeholder="Ingresá el nombre"/>
                        </div>
                    </div>
                    <div className="filter-space">
                        <div>
                            <label className="label-filter" htmlFor="DNI">DNI</label>
                        </div>
                        <div>
                            <input className="filter-input" type="text" name="DNI" id="DNI" placeholder="Ingresá el DNI" />
                        </div>
                    </div>
                    <div className="filter-space">
                        <div>
                            <label className="label-filter" htmlFor="Vehículo">Vehículo</label>
                        </div>
                        <div>
                            <select  className="filter-select" type="text" name="Vehículo" id="Vehículo">            
                               
                                <option className="option" hidden  value="DEFAULT">Seleccioná un tipo de vehículo</option> 
                                <option className="option" value="bicicleta">Bicicleta</option> 
                                <option className="option" value="moto">Moto</option> 
                                <option className="option" value="auto">Auto</option> 
                                
                            </select>
                        </div>
                    </div>
                    <div className="filter-space">
                        <div>
                         <label className="label-filter" htmlFor="Email">Email</label>   
                        </div>
                        <div>
                            <input className="filter-input" type="text" name="Email" id="Email" placeholder="Ingresá el mail"/>
                        </div>
                    </div>
                    
                    
                   
                   {
                       window.location.pathname==="/activeUserAdmin" ?
                    <div className="filter-space">
                        <div>
                            <label className="label-filter" htmlFor="Vehículo">Más de X transacciones</label>
                        </div>
                        <div>
                            <select  className="filter-select" type="text" name="Vehículo" id="Vehículo">            
                               
                                <option className="option" hidden  value="DEFAULT">Seleccioná un valor</option> 
                                <option className="option" value="10">10</option> 
                                <option className="option" value="5">5</option> 
                                <option className="option" value="20">20</option> 
                                
                            </select>
                        </div>
                    </div>
                    : null
                    }
                    
                   <div className="container-button-width">
                        <button 
                                className="filter-button"
                                name="search"
                                >
                                <img  src={search} alt="export" />
                                <img className="or-filter" src={or} alt="or" />
                                <p className="display-inline-block p-export"> Buscar</p>
                        </button>
                    </div>
                    
                </form>  

        </div>
    )
}
