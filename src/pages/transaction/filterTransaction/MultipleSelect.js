import { useEffect, useState } from "react";
import './multipleSelect.scss'
import Arrow from 'assets/admin/flechaAbajo.svg'

const MultipleSelect = (
    { input: { value }, options = [], onChange }
) => {
  const optionsCheckbox = [
    {
      label: 'Sin asignar',
      id: 'PENDING_ASSIGNMENT',
      selected: false
    },
    {
      label: 'En retiro',
      id: 'IN_PICK_UP',
      selected: false
    },
    {
      label: 'En punto de retiro',
      id: 'IN_PICK_UP_POINT',
      selected: false
    },
    {
      label: 'Retirado',
      id: 'PICKED_UP',
      selected: false
    },
    {
      label: 'En lugar de entrega',
      id: 'IN_DELIVERY_POINT',
      selected: false
    },
    {
      label: 'Entregado',
      id: 'DELIVERED',
      selected: false
    },
    {
      label: 'En devolución',
      id: 'IN_RETURN_TO_SENDER',
      selected: false
    },
    {
      label: 'Devuelto a origen',
      id: 'RETURNED_TO_SENDER',
      selected: false
    },
    {
      label: 'Siniestrador',
      id: 'LOST',
      selected: false
    },
    {
      label: 'Cancelada',
      id: 'CANCEL',
      selected: false
    }
  ];

  const [open, setOpen] = useState(false);
  const [all, setAll] = useState(false);
  const [optionsState, setoptions] = useState();

  useEffect( ()=>{
    setoptions(optionsCheckbox.map(ob => {
      return {...ob, selected: value.includes(ob.id)};
    }));
  },[value]);

  // const checkboxInputAll = document.querySelectorAll('.multiple-contenido-opcion');
  // const inputValor = document.querySelector('#valorAmodificar');
  // const {filterParams} = useParams()
  // let arraySelected= {'Sin asignar':false,'En retiro':false,'En punto de retiro':false,'Retirado':false,'En lugar de entrega':false,'Entregado':false,'En devolución':false,'Devuelto a origen':false,'Siniestrado':false,'Cancelada':false}
  // const [stateSeleccionados, setstateSeleccionados] = useState(filterParams==="pending"?1:filterParams==="active"?5:0)
  // let seleccionadosInput=stateSeleccionados;
  //
  // if(filterParams && window.location.pathname!=="/transaction"){
  //   switch (filterParams) {
  //     case "pending":
  //       arraySelected={'Sin asignar':true}
  //       if(checkboxInputAll && inputValor){
  //         inputValor.placeholder=""
  //         inputValor.classList.add('multiple-seleccionadoInputColor')
  //         checkboxInputAll.forEach(inp => inp.firstChild.checked===true ? inputValor.placeholder+=inp.firstChild.value:"" )
  //         checkboxInputAll.forEach(inp => inp.firstChild.checked===true ? inp.firstChild.classList.add('selected')   :"" )
  //       }
  //       break;
  //     case "active":
  //       arraySelected={'En retiro':true,'En punto de retiro':true,'Retirado':true,'En lugar de entrega':true,'En devolución':true}
  //       if(checkboxInputAll && inputValor){
  //         inputValor.placeholder=""
  //         inputValor.placeholder=seleccionadosInput+" Seleccionados"
  //         inputValor.classList.add('multiple-seleccionadoInputColor')
  //         checkboxInputAll.forEach(inp => inp.firstChild.checked===true ? inp.firstChild.classList.add('selected')   :"" )
  //
  //       }
  //       break;
  //
  //     default:
  //       break;
  //   }}
  //
  // useEffect(() => {
  //   window.addEventListener('click',pararPropagacion)
  //   return () => {
  //     window.removeEventListener('click',pararPropagacion)
  //   }
  // }, []);
  //
  // useEffect(() => {
  //
  //   if(checkboxInputAll){
  //
  //     checkboxInputAll.forEach(inp => inp.addEventListener('click',MultipleSelectCheckbox))
  //   }
  //
  //   return () => {
  //     checkboxInputAll.forEach(inp => inp.removeEventListener('click',MultipleSelectCheckbox))
  //   }
  //
  // }, )
  // const modificarMultipleSelect  =useCallback(
  //     () => {
  //       let  opciones =document.querySelectorAll('.multiple-checkboxInput');
  //       for (let i = 1; i < opciones.length; i++) {
  //         const element = opciones[i];
  //         element.checked=arraySelected[element.value]
  //       }
  //
  //     },
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     [],
  // )
  // useEffect(() => {
  //   modificarMultipleSelect();
  //
  //
  //
  // }, [modificarMultipleSelect])
  // const MultipleSelectCheckbox = (e) => {
  //
  //   e.stopPropagation();
  //   window.history.replaceState(null,"","/transaction")
  //
  //   if(e.target.checked===true){
  //     seleccionadosInput++;
  //   }
  //   if(e.target.checked===false){
  //     seleccionadosInput--;
  //   }
  //
  //   if(e.target.id==="Todos" && checkboxInputAll[0].firstChild.checked===true  && (seleccionadosInput !== checkboxInputAll.length-1 || seleccionadosInput !== checkboxInputAll.length  ) ){
  //     checkboxInputAll.forEach(inp => inp.firstChild.checked=true)
  //     seleccionadosInput=checkboxInputAll.length-1;
  //   }
  //   else if(e.target.id==="Todos") {
  //     checkboxInputAll.forEach(inp => inp.firstChild.checked=false)
  //     seleccionadosInput=0;
  //   }
  //
  //   inputValor.classList.remove('multiple-seleccionadoInputColor')
  //   checkboxInputAll[0].firstChild.checked=false;
  //
  //   checkboxInputAll.forEach(inp => inp.firstChild.checked===false ? inp.firstChild.classList.remove('selected')   :"" )
  //
  //   if(seleccionadosInput===checkboxInputAll.length-1 || seleccionadosInput===checkboxInputAll.length ){
  //     checkboxInputAll[0].firstChild.checked=true;
  //     inputValor.placeholder=""
  //     inputValor.placeholder="Todos"
  //     inputValor.classList.add('multiple-seleccionadoInputColor')
  //     checkboxInputAll.forEach(inp => inp.firstChild.checked===true ? inp.firstChild.classList.add('selected')   :"" )
  //   }
  //   else if(seleccionadosInput>3){
  //     checkboxInputAll[0].firstChild.checked=false;
  //     inputValor.placeholder=""
  //     inputValor.placeholder=seleccionadosInput+" Seleccionados"
  //     inputValor.classList.add('multiple-seleccionadoInputColor')
  //     checkboxInputAll.forEach(inp => inp.firstChild.checked===true ? inp.firstChild.classList.add('selected')   :"" )
  //
  //   }
  //   if(seleccionadosInput<=3){
  //     inputValor.placeholder=""
  //     inputValor.classList.add('multiple-seleccionadoInputColor')
  //     checkboxInputAll.forEach(inp => inp.firstChild.checked===true ? inputValor.placeholder+=inp.firstChild.value+", ":"" )
  //     checkboxInputAll.forEach(inp => inp.firstChild.checked===true ? inp.firstChild.classList.add('selected')   :"" )
  //
  //     inputValor.placeholder= inputValor.placeholder.substring(0,inputValor.placeholder.length-2);
  //
  //
  //     if(window.screen.width<1400 && inputValor.placeholder.length>32){
  //
  //       inputValor.placeholder =  inputValor.placeholder.substring(0,31)+"..."
  //     }
  //     else if(window.screen.width<1800 && inputValor.placeholder.length>=39){
  //
  //       inputValor.placeholder =  inputValor.placeholder.substring(0,38)+"..."
  //     }
  //     if(window.screen.width>1800 && inputValor.placeholder.length>=45){
  //
  //       inputValor.placeholder =  inputValor.placeholder.substring(0,44)+"..."
  //     }
  //
  //   }
  //   if(seleccionadosInput===0){
  //     inputValor.classList.remove('multiple-seleccionadoInputColor')
  //     inputValor.placeholder="Seleccioná el estado"
  //   }
  //
  //   setstateSeleccionados(seleccionadosInput);
  //
  // }
  //
  // const valorModificarFuncion = (e) => {
  //   e.preventDefault()
  //   e.stopPropagation();
  //
  //   if(window.location.pathname==="/transaction" || window.location.pathname==="/transaction/pending" || window.location.pathname==="/transaction/active"){
  //     document.querySelector('#opciones').style.display="block"
  //   }
  //
  // }
  //
  // const pararPropagacion = () => {
  //   setOpen(!open);
  // };

  const checkAll = () => {
    return setAll(optionsState.every((ob)=>ob.selected));
  };

  const reduceState = (map) => {
    return map.filter((ob)=>ob.selected).map(ob => ob.id).join();
  };

  const onChangeHandler = (option) => {
    option.selected = !option.selected;
    checkAll();
    onChange(reduceState(optionsState));
  };

  const onChangeHandlerAll = () => {
    let map = optionsState.map(ob=>{return {...ob,selected:!all}});
    setoptions(map)
    setAll(!all);
    onChange(reduceState(map));
  };

  return (
      <div className="multiple-selectbox">
        <div className="multiple-select">
          <div  onClick={()=>setOpen(!open)} className="multiple-contenido-select">
            <h1 className="transaction-filter-multipleSelect-label">Estados</h1>
            <div className="multiple-ContenedorInput">
              <input placeholder="Seleccioná el estado" disabled className="multiple-input" type="text"/>
              <img className="multiple-flotarImg" src={Arrow} alt="arrow"/>
            </div>
          </div>
        </div>
        { open &&
        <div className="multiple-options">
          <div  className="multiple-contenido-opcion">
            <input  className="multiple-checkboxInput" type="checkbox" checked={all} onChange={()=>onChangeHandlerAll()} />
            <label className="multiple-labelCheckBox">Todos</label>
          </div>
          {
            optionsState.map((option,key) => (
                <div className="multiple-contenido-opcion" key={key} id={key}>
                  <input className="multiple-checkboxInput" type="checkbox" onChange={()=>onChangeHandler(option)} checked={option.selected}/>
                  <label className="multiple-labelCheckBox">{option.label}</label>
                </div>
            ))
          }
        </div>
        }
      </div>
  );
}

export default MultipleSelect;
