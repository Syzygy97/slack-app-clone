import React, { useState, useEffect } from "react";
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
      <div className="channel-name">
        <h3>{channelName}</h3>
        <h4>{memberCount} users</h4>
      </div>
      <Messages />
      <Messaging />
    </div>
  );
};

export default Home;
