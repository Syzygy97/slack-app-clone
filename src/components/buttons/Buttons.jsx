import React from "react";
import "./buttons.css";

const Buttons = (props) => {
  const { type, name, className, onClick } = props;
  return (
    <button className={className} name={name} type={type} onClick={onClick}>
      {name}
    </button>
  );
};

export default Buttons;
