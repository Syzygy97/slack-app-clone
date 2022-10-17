import React from "react";
import Messages from "../messages/Messages";
import Messaging from "../messaging";
import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="channel-name">
        <h3>Channel Name</h3>
        <h4># of users</h4>
      </div>
      <Messages />
      <Messaging />
    </div>
  );
};

export default Home;
