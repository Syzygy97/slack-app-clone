import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ChannelMessages from "../channelMessages";
import Messages from "../messages/Messages";
import Messaging from "../messaging";
import NewMessage from "../newMessage";
import "./home.css";

const Home = ({
  activeChannelName,
  activeChannelMemberCount,
  selectedReceiverId,
  allUsers,
}) => {
  const channelName = JSON.parse(localStorage.getItem("currentChannelName"));
  const memberCount = JSON.parse(localStorage.getItem("memberCount"));
  // useEffect(() => {
  //   const channelName = JSON.parse(localStorage.getItem("currentChannelName"));
  //   if (channelName) setChannelName(channelName);
  // }, [channelName]);
  // console.log(channelName);
  const [userId, setUserId] = useState("");
  // console.log("id", userId);
  return (
    <div className="home-container">
      <Routes>
        <Route index element={<ChannelMessages />} />
        <Route
          path="/directMessage"
          element={<NewMessage allUsers={allUsers} setUserId={setUserId} />}
        />
        <Route
          path="directMessage/:receiver__id/:receiver__email"
          element={<Messages allUsers={allUsers} userId={userId} />}
        />
      </Routes>
      <Messaging selectedReceiverId={selectedReceiverId} userId={userId} />
    </div>
  );
};

export default Home;
