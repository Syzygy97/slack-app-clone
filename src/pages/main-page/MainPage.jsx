import React, { useEffect, useState } from "react";
import "./mainPage.css";
import SideBar from "../../components/sideBar";
import UsersList from "../../components/usersList";
import Home from "../../components/home";
import Modals from "../../components/modals";

const MainPage = () => {
  const currentChannelId = JSON.parse(localStorage.getItem("currentChannelId"));
  const currentChannelName = JSON.parse(
    localStorage.getItem("currentChannelName")
  );
  const memberCount = JSON.parse(localStorage.getItem("memberCount"));
  const [modal, setModal] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [activeChannelName, setActiveChannelName] = useState(
    // currentChannel[0].name.toString()
    currentChannelName
  );
  const [activeChannelId, setActiveChannelId] = useState(
    // currentChannel[0].id.toString()
    currentChannelId
  );
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
      />
      <UsersList
        allUsers={allUsers}
        activeChannelId={activeChannelId}
        setActiveChannelMemberCount={setActiveChannelMemberCount}
      />
      <Modals modal={modal} setModal={setModal} />
    </div>
  );
};

export default MainPage;
