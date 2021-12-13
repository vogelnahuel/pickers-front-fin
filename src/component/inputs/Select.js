import { useState } from "react";
import "component/inputs/multipleSelect.scss";
import "pages/pickers/detailPicker/DetailPicker.scss";
import Arrow from "assets/admin/flechaAbajo.svg";

const Select = ({ input, label, options = [], placeholder, onChange }) => {
  const [open, setOpen] = useState(false);
  const globalClose = (e) => {
    e.stopPropagation();
    setOpen(false);
    window.removeEventListener("click", globalClose);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    window.addEventListener("click", globalClose);
    setOpen(!open);
  };



  return (
    <div className="multiple-selectbox">
      <div onClick={handleClick} className="multiple-contenido-select">
        <label className="label-Admin-Pickers">{label}</label>
        <input
          name={input.name}
          placeholder={placeholder}
          value={
            input.value.label && input.value.label !== ""
              ? input.value.label
              : input.value !== ""
              ? input.value
              : ""
          }
          disabled
          className="Admin-Pickers-input-select"
          type="text"
        />
        <img className="multiple-flotarImg" src={Arrow} alt="arrow" />
      </div>
      {open && (
        <div className="filter-admin-options">
          {options.map((option, key) => (
            <div
              className="filter-admin-content-option"
              key={key}
              id={key}
              onClick={(e) => {
                onChange(input.name, option);
              }}
            >
              <label className="filter-admin-option-paragraph">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
