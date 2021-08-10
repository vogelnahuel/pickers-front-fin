import { useEffect, useState } from "react";
import './multipleSelect.scss'
import Flecha from '../../../assets/admin/flechaAbajo.svg'


const MultipleSelect = () => {

  const opcionesCheckbox = ['Sin asignar','En retiro','En punto de retiro','Retirado','En lugar de entrega','Entregado','En devolución','Devuelto a origen','Siniestrado','Cancelada']

  const checkboxInputAll = document.querySelectorAll('.multiple-contenido-opcion');
  const inputValor = document.querySelector('#valorAmodificar');
  const [stateSeleccionados, setstateSeleccionados] = useState(0)
  let seleccionadosInput=stateSeleccionados;

  useEffect(() => {
    window.addEventListener('click',pararPropagacion)
    return () => {
      window.removeEventListener('click',pararPropagacion)
    }
  }, [])

  useEffect(() => {

    if(checkboxInputAll){
      
      checkboxInputAll.forEach(inp => inp.addEventListener('click',MultipleSelectCheckbox))
    }
  
    return () => {
      checkboxInputAll.forEach(inp => inp.removeEventListener('click',MultipleSelectCheckbox))
    }

  }, )

const MultipleSelectCheckbox = (e) => {

    e.stopPropagation();

    if(e.target.checked===true){
      seleccionadosInput++;
    }
    if(e.target.checked===false){
      seleccionadosInput--;
    }

    if(e.target.id==="Todos" && checkboxInputAll[0].firstChild.checked===true  && (seleccionadosInput !== checkboxInputAll.length-1 || seleccionadosInput !== checkboxInputAll.length  ) ){
      checkboxInputAll.forEach(inp => inp.firstChild.checked=true)
      seleccionadosInput=checkboxInputAll.length-1;
    }
    else if(e.target.id==="Todos") {
      checkboxInputAll.forEach(inp => inp.firstChild.checked=false)
      seleccionadosInput=0;
    }
    inputValor.classList.remove('multiple-seleccionadoInputColor')
    checkboxInputAll[0].firstChild.checked=false;

    checkboxInputAll.forEach(inp => inp.firstChild.checked===false ? inp.firstChild.classList.remove('selected')   :"" )
   
    if(seleccionadosInput===checkboxInputAll.length-1 || seleccionadosInput===checkboxInputAll.length ){
      checkboxInputAll[0].firstChild.checked=true;
      inputValor.placeholder=""
      inputValor.placeholder="Todos"
      inputValor.classList.add('multiple-seleccionadoInputColor')
      checkboxInputAll.forEach(inp => inp.firstChild.checked===true ? inp.firstChild.classList.add('selected')   :"" )
    }
    else if(seleccionadosInput>3){
      checkboxInputAll[0].firstChild.checked=false;
      inputValor.placeholder=""
      inputValor.placeholder=seleccionadosInput+" Seleccionados"
      inputValor.classList.add('multiple-seleccionadoInputColor')
      checkboxInputAll.forEach(inp => inp.firstChild.checked===true ? inp.firstChild.classList.add('selected')   :"" )
      
    }
    if(seleccionadosInput<=3){
      inputValor.placeholder=""
      inputValor.classList.add('multiple-seleccionadoInputColor')
      checkboxInputAll.forEach(inp => inp.firstChild.checked===true ? inputValor.placeholder+=inp.firstChild.value+", ":"" )
      checkboxInputAll.forEach(inp => inp.firstChild.checked===true ? inp.firstChild.classList.add('selected')   :"" )
      
      inputValor.placeholder= inputValor.placeholder.substring(0,inputValor.placeholder.length-2);


      if(window.screen.width<1400 && inputValor.placeholder.length>32){

        inputValor.placeholder =  inputValor.placeholder.substring(0,31)+"..."
      }
      else if(window.screen.width<1800 && inputValor.placeholder.length>=39){

        inputValor.placeholder =  inputValor.placeholder.substring(0,38)+"..."
      }
      if(window.screen.width>1800 && inputValor.placeholder.length>=45){

        inputValor.placeholder =  inputValor.placeholder.substring(0,44)+"..."
      }

    }
    if(seleccionadosInput===0){
      inputValor.classList.remove('multiple-seleccionadoInputColor')
      inputValor.placeholder="Selecciona el estado"
    }
    
    setstateSeleccionados(seleccionadosInput);

  }

  const valorModificarFuncion = (e) => {
    e.preventDefault()
    e.stopPropagation();
    
    if(window.location.pathname==="/transaction"){
      document.querySelector('#opciones').style.display="block"
    }
 
  }
  

  const pararPropagacion = (e) => {

    if(window.location.pathname==="/transaction"){
      document.querySelector('#opciones').style.display="none"
    }


  }

  return ( 


              <div className="multiple-selectbox">
                            <div className="multiple-select" id="select">
                                <div  onClick={valorModificarFuncion} className="multiple-contenido-select">
                                    <h1 className="transaction-filter-multipleSelect-label">Estados</h1>
                                  
                                    <div className="multiple-ContenedorInput">
                                        <input placeholder="Seleccioná el estado" disabled className="multiple-input" type="text" value="" id="valorAmodificar"/>
                                        <img className="multiple-flotarImg" src={Flecha} alt="flecha"/>
                                    </div>
                                </div>
                            </div>
                            <div   className="multiple-opciones" id="opciones">
                    
                                <div  className="multiple-contenido-opcion">
                                    <input  className="multiple-checkboxInput" type="checkbox" id="Todos"  value="" />
                                    <label className="multiple-labelCheckBox" htmlFor="Todos">Todos</label>
                                </div>
                                {
                                opcionesCheckbox.map(opcion => (
                                  <div className="multiple-contenido-opcion" key={opcion} id={opcion}>
                                      <input   className="multiple-checkboxInput" type="checkbox"  value={opcion} />
                                      <label className="multiple-labelCheckBox" htmlFor={opcion}>{opcion}</label>
                                  </div>
                                ))
                                
                                }
                                
                                
                            </div>
                 </div>

   );
}
 
export default MultipleSelect;
