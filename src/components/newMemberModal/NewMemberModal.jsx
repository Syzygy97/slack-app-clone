import React, { useState } from "react";
import "./newMemberModal.css";
import Buttons from "../buttons";
import Inputs from "../inputs";

const NewMemberModal = ({
  newMemberModal,
  setNewMemberModal,
  setAddNewMember,
}) => {
  const [newMember, setNewMember] = useState({
    id: "",
    member_id: "",
  });
  const dataInputs = [
    {
      id: 1,
      name: "id",
      type: "number",
      placeholder: "enter channel id",
      label: "Channel ID",
      errorMessage: "Invalid channel id",
      required: true,
    },
    {
      id: 2,
      name: "member_id",
      type: "number",
      placeholder: "enter member id",
      label: "Member ID",
      errorMessage: "Member does not exist",
      required: true,
    },
  ];
  const closeModal = (e) => {
    e.preventDefault();
    setNewMemberModal(!newMemberModal);
  };
  const handleAddNewMember = async (e) => {
    e.preventDefault();
    await AddMember();
    setNewMemberModal(!newMemberModal);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };
  const AddMember = async () => {
    await fetch("https://slackapi.avionschool.com/api/v1/channel/add_member", {
      method: "POST",
      body: JSON.stringify(newMember),
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        expiry: localStorage.getItem("expiry"),
        uid: localStorage.getItem("uid"),
      },
    })
      .then((res) => res.json())
      .then((result) => setAddNewMember(result.data));
  };
  return (
    <>
      {newMemberModal && (
        <div className="add-member-modal">
          <div className="modal-overlay" onClick={closeModal}></div>
          <form
            onSubmit={handleAddNewMember}
            className="new-member-modal-container"
          >
            <Buttons
              className="close-modal-button"
              type="button"
              name="X"
              onClick={closeModal}
            />
            <h1>Add new member</h1>
            {dataInputs.map((input) => (
              <div className="new-member-modal-inputs-container" key={input.id}>
                <label>{input.label}</label>
                <Inputs
                  {...input}
                  className="add-member-input"
                  value={newMember[input.name]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <Buttons className="add-new-member-button" name="Add member" />
          </form>
        </div>
      )}
    </>
  );
};

export default NewMemberModal;
