import React from 'react'
import flechaAbajo  from '../../../assets/admin/flechaAbajo.svg'

/**recorro la data y empiezo a mostrar los inputs o select con sus opciones y clases pasadas */
/****si desea agregar funcionalidad o diseño debe modificar la data y los inputs para que funcione ejemplo un onKeyPress onclick*/
export const Fields = (props) => {
    const variables=props.FieldsPart;



    


 const handleClickOption  =  (e) => {

    const opciones = document.querySelector('#opciones')
    const contenidoSelect = document.querySelector('#seleccionado')
    const hiddenInput =  document.querySelector('#Vehículo')
            e.preventDefault();        
            if(e.target.textContent==="Bicicleta"){
                contenidoSelect.textContent= "Bicicleta";
                hiddenInput.value="bici";
            }
            if(e.target.textContent==="Moto"){
                contenidoSelect.textContent= "Moto";
                hiddenInput.value="moto";
            }
       
            contenidoSelect.style.color="#101010"
            opciones.style.display="none";
 }

 const handleClickSelect  = () => {

    const opciones = document.querySelector('#opciones')
      if(opciones.style.display==="none"){
            opciones.style.display="block"
            opciones.style.position="absolute";
        }else if(opciones.style.display==="block"){
            opciones.style.display="none"
        }
        opciones.classList.toggle('active') 
 }


    
    return (
        <>

                {
                    
                    variables.map(variable => (
                        <div key={variable.id} name={variable.id} className="filter-space">
                           {
                               variable.type!=="select" && variable.type!=="" ?
                                    <>
                                     <div>
                                        <label className={variable.label.labelclassName} htmlFor={variable.label.labelhtmlFor}>{variable.label.labelparrafo}</label>
                                    </div>
                                    <div>
                                        <input className={variable.className} type={variable.type} name={variable.name} id={variable.id} value={variable.value} placeholder={variable.placeholder}/>
                                    </div>  
                                    
                                    </>
                                 : null                       
                                 
                            }
                            {
                                variable.type==="select" && variable.type!==""?
                                    <>
                                           
                                                <div className="filter-admin-selectBox">
                                                            <div className="select" id="select" onClick={handleClickSelect}>
                                                                    <div className="filter-admin-contenido-select">
                                                                            <p className="filter-admin-parrafoLabel">Vehículo</p>
                                                                            
                                                                            <div className="filter-admin-inputSelect"
                                                                            id="transacciones" 
                                                                            name="transacciones" 
                                                                            placeholder="Seleccioná un valor" 
                                                                            value="">
                                                                            <p  id="seleccionado" className="filter-admin-filter-value">Seleccioná un tipo de vehículo</p>
                                                                            
                                                                        </div>    
                                                                        <img  className="filter-admin-Imagen" src={flechaAbajo} alt=""/>    
                                                                    </div>

                                                                    
                                                            </div>
                                                            
                                                            <div className="filter-admin-opciones" id="opciones">
                                                                    <div 
                                                                    onClick={handleClickOption}
                                                                     className="filter-admin-opcion"
                                                                    >
                                                                        <div className="filter-admin-contenido-opcion">
                                                                                <p className="filter-admin-opcion-parrafo">Bicicleta</p>
                                                                        </div>
                                                                    </div>
                                                                    <div 
                                                                    onClick={handleClickOption}
                                                                     className="filter-admin-opcion">
                                                                        <div className="filter-admin-contenido-opcion">
                                                                                <p className="filter-admin-opcion-parrafo">Moto</p>
                                                                        </div>
                                                                    </div>
                                                                
                                                            </div>
                                                    </div>

                                                    <input type="hidden" name="Vehículo" id="Vehículo" value=""></input>
                                    </>
                                : null

                            }
                                
                        </div>
                    ))
                }
               
                        
                       
         </>
    )
}
