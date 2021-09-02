import React from 'react'
import flechaAbajo  from '../../../assets/admin/flechaAbajo.svg'

/**recorro la data y empiezo a mostrar los inputs o select con sus opciones y clases pasadas */
/****si desea agregar funcionalidad o diseño debe modificar la data y los inputs para que funcione ejemplo un onKeyPress onclick*/
export const Fields = (props) => {
    const variables=props.FieldsPart;


 const handleClickOption  =  (e) => {
    e.preventDefault();        
    const opciones = document.querySelector('#VehículoOpcion')
    const contenidoSelect = document.querySelector('#seleccionadoVehículo')
    const hiddenInput =  document.querySelector('#Vehículo') 

    if(e.target.classList.contains("Vehículo")  ){
      
        if(e.target.textContent==="Bicicleta"){
            contenidoSelect.textContent= "Bicicleta";
            hiddenInput.value="bicycle";
            contenidoSelect.style.color="#101010"
        }
        if(e.target.textContent==="Moto"){
            contenidoSelect.textContent= "Moto";
            hiddenInput.value="motorcycle";
            contenidoSelect.style.color="#101010"
        }
        if(e.target.textContent==="Todos"){
            contenidoSelect.textContent= "Todos";
            hiddenInput.value="";
            contenidoSelect.style.color="#101010"
        }
   
   
        
        opciones.style.display="none";
    }
   

   
         
 }

 const handleClickSelect  = (e) => {

     e.preventDefault();
    const opciones = document.querySelector('#VehículoOpcion')
    e.stopPropagation();
    
   

    if(e.target.id==="seleccionadoVehículo"){
        if(opciones.style.display==="none"){
            opciones.style.display="block"
            opciones.style.position="absolute";
            
        }else if(opciones.style.display==="block"){
            opciones.style.display="none"
        }
        opciones.classList.toggle('active') 


        window.addEventListener(('click'),()=>{
            
             if(opciones.style.display==="block" || opciones.style.display.length===0){
                 opciones.style.display="none"
             }
             
         })
    }
   
     
 }



    
    return (
        <>

                {
                    
                    variables.map(variable => (
                        <div key={variable.id} name={variable.id} className="filter-space">
                           {
                               variable.type!=="select" && variable.type!=="" ?
                                    <>
                                     <div className="flota-div-label">
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
                                                                            <p className="filter-admin-parrafoLabel">{variable.label.labelparrafo}</p>
                                                                            
                                                                            <div className="filter-admin-inputSelect"
                                                                            id="transacciones" 
                                                                            name="transacciones" 
                                                                            placeholder="Seleccioná un valor" 
                                                                            value="">
                                                                            <p  id={"seleccionado"+variable.id} name={variable.name} className="filter-admin-filter-value">{variable.placeholder}</p>
                                                                            
                                                                        </div>    
                                                                        <img  className="filter-admin-Imagen" src={flechaAbajo} alt=""/>    
                                                                    </div>

                                                                    
                                                            </div>
                                                            
                                                            <div className="filter-admin-opciones"  id={variable.id+`Opcion`} >
                                                                {
                                                                    variable.options.map(opcion => (
                                                                          
                                                                            <div 
                                                                            key={opcion.value}
                                                                                onClick={handleClickOption}
                                                                                className="filter-admin-opcion"
                                                                            >
                                                                                    <div className="filter-admin-contenido-opcion">
                                                                                            <p className={"filter-admin-opcion-parrafo "+variable.id} >{opcion.text}</p>
                                                                                    </div>
                                                                            </div>
                                                                          
                                                                        )
                                                                    )
                                                                }
                                                                    
                                                                  
                                                                
                                                            </div>
                                                    </div>

                                                    <input type="hidden" name={variable.name} id={variable.id} ></input>
                                    </>
                                : null

                            }
                                
                        </div>
                    ))
                }
               
                        
                       
         </>
    )
}
