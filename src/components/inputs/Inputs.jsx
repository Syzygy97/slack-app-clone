import React, { useState } from "react";
import "./inputs.css";

const Inputs = (props) => {
  const [focused, setFocused] = useState(false);
  const {
    errorMessage,
    className,
    placeholder,
    onChange,
    id,
    label,
    ...inputProps
  } = props;
  const handleFocusTrue = (e) => {
    e.preventDefault();
    setFocused(true);
  };
  const handleFocusFalse = (e) => {
    e.preventDefault();
    setFocused(false);
  };
  return (
    <>
      <input
        {...inputProps}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={handleFocusFalse}
        onFocus={handleFocusTrue}
        focused={focused.toString()}
      />
      <span>{errorMessage}</span>
    </>
  );
};

export default Inputs;
