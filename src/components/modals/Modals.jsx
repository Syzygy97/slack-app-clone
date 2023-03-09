import React, { useState } from "react";
import Buttons from "../buttons";
import Inputs from "../inputs";
import "./modals.css";

const Modals = ({ modal, setModal, setNewChannel }) => {
  const [channelData, setChannelData] = useState({
    name: "",
    user_ids: [],
  });
  const dataInputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "new channel",
      label: "Channel name",
      errorMessage: "Invalid channel name",
      required: true,
    },
    {
      id: 2,
      name: "user_ids",
      type: "number",
      placeholder: "enter member id#",
      label: "Member(s)",
      errorMessage: "Member does not exist",
    },
  ];
  const closeModal = (e) => {
    e.preventDefault();
    setModal(!modal);
  };
  const handleAddNewChannel = async (e) => {
    e.preventDefault();
    await CreateChannel();
    setModal(!modal);
  };
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "user_ids") {
      setChannelData({ ...channelData, [e.target.name]: [e.target.value] });
    } else {
      setChannelData({ ...channelData, [e.target.name]: e.target.value });
    }
  };
  const CreateChannel = async () => {
    await fetch("https://slackapi.avionschool.com/api/v1/channels", {
      method: "POST",
      body: JSON.stringify(channelData),
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        expiry: localStorage.getItem("expiry"),
        uid: localStorage.getItem("uid"),
      },
    })
      .then((res) => res.json())
      .then((result) => setNewChannel(result.data));
  };
  return (
    <>
      {modal && (
        <div className="add-channel-modal">
          <div className="modal-overlay" onClick={closeModal}></div>
          <form onSubmit={handleAddNewChannel} className="modal-container">
            <Buttons
              className="close-modal-button"
              type="button"
              name="X"
              onClick={closeModal}
            />
            <h1>Create a new channel</h1>
            {dataInputs.map((input) => (
              <div className="modal-inputs-container" key={input.id}>
                <label>{input.label}</label>
                <Inputs
                  {...input}
                  className="add-channel-input"
                  value={channelData[input.name]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <Buttons
              className="create-new-channel-button"
              name="Create channel"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default Modals;
