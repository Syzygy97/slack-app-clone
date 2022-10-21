import React, { useEffect, useState } from "react";
import "./mainPage.css";
import SideBar from "../../components/sideBar";
import UsersList from "../../components/usersList";
import Home from "../../components/home";
import Modals from "../../components/modals";
import NewMemberModal from "../../components/newMemberModal";

const MainPage = () => {
  const currentChannelId = JSON.parse(localStorage.getItem("currentChannelId"));
  const currentChannelName = JSON.parse(
    localStorage.getItem("currentChannelName")
  );
  const memberCount = JSON.parse(localStorage.getItem("memberCount"));
  const [modal, setModal] = useState(false);
  const [newMemberModal, setNewMemberModal] = useState(false);
  const [selectedReceiverId, setSelectedReceiverId] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [activeChannelName, setActiveChannelName] =
    useState(currentChannelName);
  const [activeChannelId, setActiveChannelId] = useState(currentChannelId);
  const [activeChannelMemberCount, setActiveChannelMemberCount] =
    useState(memberCount);
  const fetchAllUsers = async () => {
    await fetch("http://206.189.91.54/api/v1/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        expiry: localStorage.getItem("expiry"),
        uid: localStorage.getItem("uid"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const dataArray = result.data;
        setAllUsers(dataArray);
      });
  };
  useEffect(() => {
    (async () => {
      await fetchAllUsers();
    })();
  }, []);
  return (
    <div className="main-page-container">
      <SideBar
        modal={modal}
        setModal={setModal}
        setActiveChannelId={setActiveChannelId}
        setActiveChannelName={setActiveChannelName}
        setActiveChannelMemberCount={setActiveChannelMemberCount}
        activeChannelMemberCount={activeChannelMemberCount}
      />
      <Home
        activeChannelName={activeChannelName}
        activeChannelMemberCount={activeChannelMemberCount}
        selectedReceiverId={selectedReceiverId}
        allUsers={allUsers}
      />
      <UsersList
        allUsers={allUsers}
        activeChannelId={activeChannelId}
        setActiveChannelMemberCount={setActiveChannelMemberCount}
        setSelectedReceiverId={setSelectedReceiverId}
        newMemberModal={newMemberModal}
        setNewMemberModal={setNewMemberModal}
      />
      <Modals modal={modal} setModal={setModal} />
      <NewMemberModal
        newMemberModal={newMemberModal}
        setNewMemberModal={setNewMemberModal}
      />
    </div>
  );
};

export default MainPage;
