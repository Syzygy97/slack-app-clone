import React from "react";
import "./channel.css";

const Channel = ({ modal, setModal }) => {
  const handleAddChannel = (e) => {
    e.preventDefault();
    console.log("test");
    setModal(!modal);
  };
  return (
    <div className="channel-container">
      <div className="channel-header">
        <h3>CHANNELS</h3>
        <i onClick={handleAddChannel}>+</i>
      </div>
      <h3>CATEGORY 1</h3>
      <h4>Channel 1</h4>
      <h4>Channel 2</h4>
      <h3>CATEGORY 2</h3>
      <h4>Channel 3</h4>
      <h4>Channel 4</h4>
    </div>
  );
};

export default Channel;
