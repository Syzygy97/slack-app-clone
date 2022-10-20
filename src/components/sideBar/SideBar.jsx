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
  setActiveChannelName,
  setActiveChannelMemberCount,
  activeChannelMemberCount,
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
    localStorage.setItem("signedInData", []);
  };
  const navigateToDirectMessage = (e) => {
    e.preventDefault();
    navigate("/main/directMessage");
  };
  return (
    <div className="side-bar-container">
      <div className="server-header">
        <h2>AVION SCHOOL</h2>
        <BsPencilSquare
          className="new-message-button"
          onClick={navigateToDirectMessage}
        />
      </div>
      <Channel
        modal={modal}
        setModal={setModal}
        setActiveChannelId={setActiveChannelId}
        setActiveChannelName={setActiveChannelName}
        setActiveChannelMemberCount={setActiveChannelMemberCount}
        activeChannelMemberCount={activeChannelMemberCount}
      />
      <Buttons onClick={handleLogout} className="logout-button" name="Logout" />
    </div>
  );
};

export default SideBar;
