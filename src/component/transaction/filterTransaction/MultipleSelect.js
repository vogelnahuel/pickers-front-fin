import { useEffect, useMemo, useState } from "react";
import './multipleSelect.scss'
import Flecha from '../../../assets/admin/flechaAbajo.svg'


const MultipleSelect = () => {
  const opcionesCheckbox = ['Sin asignar','En retiro','En punto de retiro','Retirado','En lugar de entrega','Entregado','En devolución','Devuelto a origen','Siniestrado','Cancelada']

 
  const checkboxInputAll = document.querySelectorAll('.multiple-checkboxInput');
  const inputValor = document.querySelector('#valorAmodificar');
  const [stateSeleccionados, setstateSeleccionados] = useState(0)
  let seleccionadosInput=stateSeleccionados;
  
  const valorModificarFuncion = (e)=> {
    e.preventDefault()
    e.stopPropagation()
   const opciones =  document.querySelector('#opciones');
    opciones.style.display="block";
  }
  const pararPropagacion = (e)=>{
    e.stopPropagation();
    window.removeEventListener('click',cerrarSelectBox)
  }
  
  if(checkboxInputAll!==null)
  checkboxInputAll.forEach(inp => inp.addEventListener('click',  (e)=>{
      
    let todos = false;
  
    if(e.target.checked===true){
      seleccionadosInput++;
    }
    else if(e.target.checked===false){
      seleccionadosInput--;
    }
  
    if(e.target.id==="Todos"){
        if(e.target.checked===true){
            checkboxInputAll.forEach(inputs=> inputs.checked=true)
            inputValor.placeholder="Todos";
            inputValor.classList.add('multiple-seleccionadoInputColor');
            todos=true;
            seleccionadosInput=(checkboxInputAll.length-1);
           
        }else  if(e.target.checked===false){
            checkboxInputAll.forEach(inputs=> inputs.checked=false)
            inputValor.placeholder="Seleccioná el estado";
            inputValor.classList.remove('multiple-seleccionadoInputColor');
            todos=false;
            seleccionadosInput=(0);
            
        }
    }
  
    checkboxInputAll.forEach(inp => inp.checked===false  ?  inp.nextElementSibling.classList.remove('selected'):"" )
  
    if(seleccionadosInput=== (checkboxInputAll.length-1 ) || todos ===true ) {
        inputValor.placeholder="Todos";
        inputValor.classList.add('multiple-seleccionadoInputColor');
        checkboxInputAll[0].checked=true;
       
        checkboxInputAll.forEach(inp => inp.checked===true  ?  inp.nextElementSibling.classList.add('selected'):"" )
    }
    else if(seleccionadosInput!== (checkboxInputAll.length-1 ) && seleccionadosInput!== 0 && seleccionadosInput <= 3 )  {
        inputValor.placeholder=""
        checkboxInputAll.forEach(inp => inp.checked===true  ?  inputValor.placeholder+=inp.value+", " : "" )
        if(inputValor.placeholder.length>32 && window.screen.width <1400){
          inputValor.placeholder = inputValor.placeholder.substring(0,31)+"..."
        }
        else if(inputValor.placeholder.length>35 && window.screen.width <1800){
          inputValor.placeholder = inputValor.placeholder.substring(0,34)+"..."
        }
        else if(inputValor.placeholder.length>44 ){
          inputValor.placeholder = inputValor.placeholder.substring(0,43)+"..."
        }
        inputValor.classList.add('multiple-seleccionadoInputColor');
        checkboxInputAll[0].checked=false;
        checkboxInputAll.forEach(inp => inp.checked===true  ?  inp.nextElementSibling.classList.add('selected'):"" )
    }
    else if(seleccionadosInput!== (checkboxInputAll.length-1 ) && seleccionadosInput!== 0 && seleccionadosInput > 3)  {
        inputValor.placeholder=""
        inputValor.placeholder=seleccionadosInput+" Seleccionados";
        inputValor.classList.add('multiple-seleccionadoInputColor');
        checkboxInputAll[0].checked=false;
        checkboxInputAll.forEach(inp => inp.checked===true  ?  inp.nextElementSibling.classList.add('selected'):"" )
    }
    else if(seleccionadosInput=== 0 )  {
        inputValor.placeholder="Seleccioná el estado";
        inputValor.classList.remove('multiple-seleccionadoInputColor');
        checkboxInputAll[0].checked=false;
    }
   
   
    if(seleccionadosInput!== 0 && seleccionadosInput!== (checkboxInputAll.length-1) && inputValor.placeholder[inputValor.placeholder.length-1]===","  ){
        inputValor.placeholder=inputValor.placeholder.substring(0,inputValor.placeholder.length-1);
    }
  
  }))
  
  
  const cerrarCheckbox = ()=>{
    
    if(window.location.pathname==="/transaction" ){
      const opciones =  document.querySelector('#opciones');
     if(opciones ){ opciones.style.display="none";
  
      
       if(seleccionadosInput=== 0 )  {
         if(inputValor!==null){
          inputValor.placeholder="Seleccioná el estado";
          inputValor.classList.remove('multiple-seleccionadoInputColor');
         }
         
         
        if(checkboxInputAll!==undefined && checkboxInputAll.length!==0){
          checkboxInputAll[0].checked=false;
        }
        
    }
    }
    
    }
    
    setstateSeleccionados(seleccionadosInput);
    
  }
  
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cerrarSelectBox = useMemo(() => cerrarCheckbox,[])
  
  
  
  
  useEffect(() => {
    
  
    window.addEventListener('click',cerrarCheckbox)
    if(document.querySelector('#opciones')!==null)
    document.querySelector('#opciones').addEventListener('click',pararPropagacion)
    return(()=>{
      window.removeEventListener('click',cerrarSelectBox)
      if(document.querySelector('#opciones')!==null)
      document.querySelector('#opciones').removeEventListener('click',pararPropagacion)
    })
   
  
  }, )
  

  return ( 


              <div className="multiple-selectbox">
                            <div className="multiple-select" id="select">
                                <div  onClick={valorModificarFuncion} className="multiple-contenido-select">
                                    <h1>Estados</h1>
                                  
                                    <div className="multiple-ContenedorInput">
                                        <input placeholder="Seleccioná el estado" disabled className="multiple-input" type="text" value="" id="valorAmodificar"/>
                                        <img className="multiple-flotarImg" src={Flecha} alt="flecha"/>
                                    </div>
                                </div>
                            </div>
                            <div   className="multiple-opciones" id="opciones">
                    
                                <div  className="multiple-contenido-opcion">
                                    <input className="multiple-checkboxInput" type="checkbox" id="Todos"  value="" />
                                    <label className="multiple-labelCheckBox" htmlFor="Todos">Todos</label>
                                </div>
                                {
                                opcionesCheckbox.map(opcion => (
                                  <div className="multiple-contenido-opcion" key={opcion}>
                                      <input   className="multiple-checkboxInput" type="checkbox" id={opcion} value={opcion} />
                                      <label className="multiple-labelCheckBox" htmlFor={opcion}>{opcion}</label>
                                  </div>
                                ))
                                
                                }
                                
                                
                            </div>
                 </div>

   );
}
 
export default MultipleSelect;
