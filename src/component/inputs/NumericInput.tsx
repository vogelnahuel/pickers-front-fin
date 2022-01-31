import React, { useCallback, useState } from "react";
import classNames from "classnames";

const MAX_CHARACTER = 15;

// TODO: Tipar las props
export const NumericInput = (props: any) => {
  const {
    className,
    label,
    id,
    placeholder,
    middle,
    disabled,
    input,
		value,
    lastLabel,
    meta,
    maxLength
  } = props;
	const [internalValue, setInternalValue] = useState({
    internalValue: input ? input.value : '',
    isActive: false,
  });
  const handleNumberValidation = useCallback(
    (valueInput: string) => {
      let emitValue;
      if (
        /^\d+\.?\d*$/.test(valueInput) &&
        valueInput.length <= MAX_CHARACTER
      ) {
        emitValue = parseFloat(valueInput);
      } else if (
        /^\d+,?\d*$/.test(valueInput) &&
        valueInput.length <= MAX_CHARACTER
      ) {
        const noComaValue = valueInput.replace(",", ".");
        emitValue = parseFloat(noComaValue);
      }
      return emitValue ?? "";
    },
    []
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const checkedValue = handleNumberValidation(event.target.value);
      if (event.target.value === "" || typeof checkedValue === "number") {
        setInternalValue({
          internalValue: event.target.value,
          isActive: true,
        });
        if (input) {
          input.onChange(checkedValue);
        }
        
      }
    },
    [input, handleNumberValidation]
  );

  const handleBlur = useCallback(() => {
    setInternalValue({
      internalValue: input ? input.value : value,
      isActive: false,
    });
    if (input) {
      input.onBlur();
    }
  }, [input, value]);

  const handleFocus = useCallback(() => {
    setInternalValue({
      internalValue: input ? input.value : value,
      isActive: true,
    });
  }, [input, value]);

	const variableToShow = internalValue.isActive
    ? internalValue.internalValue.toString()
    : input.value;

  return (
    <div
      className={classNames({
        "has-error": meta.error && meta.touched,
      })}
    >
      <label
        htmlFor={id}
        className={classNames(
          middle ? "label-Admin-Pickers-middle" : "label-Admin-Pickers",
          {
            labelError: meta.error && meta.touched,
            disabled: disabled,
            "last-label": lastLabel,
          }
        )}
      >
        {label}
      </label>
      <input
        className={classNames(className, {
          disabled: disabled,
          inputError: meta.error && meta.touched
        })}
        type={input.type}
        name={input.name}
        disabled={disabled}
        id={id}
        value={variableToShow}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        maxLength={maxLength}
        autoComplete="off"
      />
      {meta.error && meta.touched && (
        <div className="input-errors-container">
          <p className="errors"> {meta.error} </p>
        </div>
      )}
    </div>
  );
};
