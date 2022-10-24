import React from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "../buttons";
import Channel from "../channel";
import "./sideBar.css";
import { BsPencilSquare } from "react-icons/bs";

const SideBar = ({
  modal,
  setModal,
  setActiveChannelId,
  setChannel_id,
  newChannel,
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
    localStorage.setItem("signedInData", []);
  };
  const navigateToNewMessage = (e) => {
    e.preventDefault();
    navigate("/main/newMessage");
  };
  const navigateToWelcome = (e) => {
    e.preventDefault();
    navigate("/main");
  };
  return (
    <div className="side-bar-container">
      <div className="server-header">
        <h2 onClick={navigateToWelcome}>AVION SCHOOL</h2>
        <BsPencilSquare
          className="new-message-button"
          onClick={navigateToNewMessage}
        />
      </div>
      <Channel
        modal={modal}
        setModal={setModal}
        setActiveChannelId={setActiveChannelId}
        setChannel_id={setChannel_id}
        newChannel={newChannel}
      />
      <Buttons onClick={handleLogout} className="logout-button" name="Logout" />
    </div>
  );
};

export default SideBar;
