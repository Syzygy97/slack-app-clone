import React, { useState } from "react";
import Buttons from "../buttons";
import Inputs from "../inputs";
import "./modals.css";

const Modals = ({ modal, setModal }) => {
  const closeModal = (e) => {
    e.preventDefault();
    setModal(!modal);
  };
  return (
    <>
      {modal && (
        <div className="add-channel-modal">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-container">
            <Buttons name="X" onClick={closeModal} />
            <h1>Create a new channel</h1>
            <h2>Channel name</h2>
            <Inputs className="add-channel-input" />
          </div>
        </div>
      )}
    </>
  );
};

export default Modals;
