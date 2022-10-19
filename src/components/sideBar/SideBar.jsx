import React from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "../buttons";
import Channel from "../channel";
import "./sideBar.css";

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
  return (
    <div className="side-bar-container">
      <div className="server-name">
        <h2>AVION SCHOOL</h2>
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
