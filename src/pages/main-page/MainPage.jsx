import React, { useEffect, useState } from "react";
import "./mainPage.css";
import SideBar from "../../components/sideBar";
import UsersList from "../../components/usersList";
import Home from "../../components/home";
import Modals from "../../components/modals";
import NewMemberModal from "../../components/newMemberModal";
import Loading from "../../components/loading";

const MainPage = () => {
  const currentChannelId = JSON.parse(localStorage.getItem("currentChannelId"));
  const [modal, setModal] = useState(false);
  const [newMemberModal, setNewMemberModal] = useState(false);
  const [channel_id, setChannel_id] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [activeChannelId, setActiveChannelId] = useState(currentChannelId);
  const [newChannel, setNewChannel] = useState([]);
  const [addNewMember, setAddNewMember] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
      });
  };
  useEffect(() => {
    (async () => {
      await fetchAllUsers();
    })();
  }, []);
  return (
    <div className="main-page-container">
      {isLoading ? (
        <>
          <SideBar
            modal={modal}
            setModal={setModal}
            setActiveChannelId={setActiveChannelId}
            setChannel_id={setChannel_id}
            newChannel={newChannel}
          />
          <Home allUsers={allUsers} channel_id={channel_id} />
          <UsersList
            allUsers={allUsers}
            activeChannelId={activeChannelId}
            newMemberModal={newMemberModal}
            setNewMemberModal={setNewMemberModal}
            addNewMember={addNewMember}
          />
          <Modals
            modal={modal}
            setModal={setModal}
            setNewChannel={setNewChannel}
          />
          <NewMemberModal
            newMemberModal={newMemberModal}
            setNewMemberModal={setNewMemberModal}
            setAddNewMember={setAddNewMember}
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default MainPage;
