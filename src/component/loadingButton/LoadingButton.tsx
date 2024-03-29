import { useState, useEffect } from "react";
import { LoadingButtonProps, LoadingButtonState } from "./types";
import { ReactComponent as SuccessIcon} from "./../../assets/admin/success_icon.svg";
import { ReactComponent as ErrorIcon} from "./../../assets/admin/error_icon.svg";
import "./loadingButton.scss";
import { FIRST_ANIMATION_TIME } from "utils/constants";

const LoadingButton = ({
  children,
  onClick,
  type = "button",
  disabled,
  status,
  allowClickAfterAnimation,
  className = ""
}: LoadingButtonProps) => {
  const [state, setState] = useState<LoadingButtonState>(
    LoadingButtonState.Idle
  );
  const [time, setTime] = useState(false);
  const [resolved, setResolved] = useState(false);

  const onButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (state === LoadingButtonState.Idle) {
      setState(LoadingButtonState.Loading);
      setTimeout(() => (setTime(true)), FIRST_ANIMATION_TIME);
      if (onClick) onClick(e);
    }
    else if(state > LoadingButtonState.Loading && onClick && allowClickAfterAnimation) {
      setState(LoadingButtonState.Idle);
      setTime(false);
      setResolved(false);
      onClick(e);
    }
  };

  useEffect(() => {
    if (
      state === LoadingButtonState.Loading &&
      status &&
      status > LoadingButtonState.Loading
    ) {
      setResolved(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (resolved && time && status) {
      setState(status);
        
      // Se reinicia el ciclo
      setTime(false);
      setResolved(false);
    }
  }, [status, resolved, time]);

  const classes = [
    "default-loading-button",
    className,
    state > LoadingButtonState.Loading && "button-fade-out"
  ].join(" ");

  const loadingBarClasses = [
    "button-loading-bar",
    state === LoadingButtonState.Loading && "button-loading-50-animation",
    state > LoadingButtonState.Loading && "button-loading-100-animation"
  ].join(" ")

  const resultBarClasses = [
    "button-result-bar",
    state === LoadingButtonState.Error && "button-error-animation",
    state === LoadingButtonState.Success && "button-success-animation",
  ].join(" ")

  const iconClasses = [
    "button-icon-container",
    state > LoadingButtonState.Loading && "button-icon-animation",
  ].join(" ")

  return (
    <button type={type} disabled={disabled} onClick={onButtonClick} className={classes}>
      <div className={loadingBarClasses}/>
      <div className={resultBarClasses}/>
      <div className="button-text-container">
        <span >{children}</span>  
      </div>
      <div className={iconClasses}>
      { state === LoadingButtonState.Error && <ErrorIcon/>}
      { state === LoadingButtonState.Success && <SuccessIcon/>}
      </div>
      <span className="button-text-hidden">{children}</span>
     
    </button>
  );
};

export default LoadingButton;
