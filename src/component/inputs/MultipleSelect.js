import { useEffect, useState } from "react";
import 'component/inputs/multipleSelect.scss';
import 'pages/pickers/detailPicker/DetailPicker.scss';
import Arrow from 'assets/admin/flechaAbajo.svg'

const MultipleSelect = (
    { input: { value, name }, label, options = [], onChange, placeholder }
) => {
  const [open, setOpen] = useState(false);
  const [all, setAll] = useState(false);
  const [optionsState, setOptions] = useState([]);

  useEffect( ()=>{
    setOptions(options.map(ob => {
      return {...ob, selected: value.includes(ob.id)};
    }));
    // eslint-disable-next-line
  },[value]);

  const globalClose = (e) => {
    e.stopPropagation();
    setOpen(false);
    window.removeEventListener('click',globalClose);
  };

  const reduceValue = () => {
    if (all) {
      return 'Todos';
    } else {
      let length = optionsState.filter((ob)=>ob.selected).length;
      if (length > 3) {
        return `${length} Selecionados`;
      } else {
        return reduceState(optionsState, 'label');
      }
    }
  };

  const checkAll = () => {
    return setAll(optionsState.every((ob)=>ob.selected));
  };

  const reduceState = (map, name = 'id') => {
    return map.filter((ob)=>ob.selected).map(ob => ob[name]).join();
  };

  const onChangeHandler = (option, e) => {
    e.stopPropagation();
    option.selected = !option.selected;
    checkAll();
    onChange(name, reduceState(optionsState));
  };

  const onChangeHandlerAll = (e) => {
    e.stopPropagation();
    let map = optionsState.map(ob=>{return {...ob,selected:!all}});
    setOptions(map)
    setAll(!all);
    onChange(name, reduceState(map));
  };

  const handleClick = (e) => {
    e.stopPropagation();
    window.addEventListener('click',globalClose);
    setOpen(!open);
  };

  return (
      <div className="multiple-selectbox">
          <div  onClick={handleClick} className="multiple-contenido-select">
            <label className="label-Admin-Pickers">{label}</label>
              <input placeholder={placeholder} value={reduceValue()} disabled className="Admin-Pickers-input" type="text"/>
              <img className="multiple-flotarImg" src={Arrow} alt="arrow"/>
          </div>
        { open &&
        <div className="multiple-options">
          <div  className="multiple-contenido-opcion" onClick={(e)=>onChangeHandlerAll(e)}>
            <input  className="multiple-checkboxInput" type="checkbox" readOnly checked={all}/>
            <label className="multiple-labelCheckBox">Todos</label>
          </div>
          {
            optionsState.map((option,key) => (
                <div className="multiple-contenido-opcion" key={key} id={key} onClick={(e)=>onChangeHandler(option, e)}>
                  <input className="multiple-checkboxInput" type="checkbox" readOnly checked={option.selected}/>
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
