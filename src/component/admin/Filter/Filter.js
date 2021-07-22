import React from 'react'
import './filter.scss'
import desplegable from  '../../../assets/admin/PendingUser/desplegable.svg'
import or from '../../../assets/admin/PendingUser/or.svg'
import search from  '../../../assets/admin/PendingUser/search.svg'
import { Fields } from './Fields'

    /****diseño del filtro y muestra inputs*/
export const Filter = (props) => {
    const {onSubmit} = props;
 

    return (
        <div className="form-fiter">
                
                    <img className="tamImgFilter" src={desplegable} alt="" />
                    <p className="Filter-p">Filtros</p>

                <form className="filter-inputs" onSubmit={onSubmit}>
                    <Fields
                     FieldsPart={props.FieldsPart}
                    />
                                
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
