import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ChannelMessages from "../channelMessages";
import Messages from "../messages/Messages";
import Messaging from "../messaging";
import "./home.css";

const Home = ({ activeChannelName, activeChannelMemberCount }) => {
  const channelName = JSON.parse(localStorage.getItem("currentChannelName"));
  const memberCount = JSON.parse(localStorage.getItem("memberCount"));
  // useEffect(() => {
  //   const channelName = JSON.parse(localStorage.getItem("currentChannelName"));
  //   if (channelName) setChannelName(channelName);
  // }, [channelName]);
  // console.log(channelName);
  return (
    <div className="home-container">
      <Routes>
        <Route index element={<ChannelMessages />} />
        <Route path="/directMessage" element={<Messages />} />
      </Routes>
      <Messaging />
    </div>
  );
};

export default Home;
