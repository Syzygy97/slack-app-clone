import React from "react";
import "./channelMessages.css";

const ChannelMessages = () => {
  const channelName = JSON.parse(localStorage.getItem("currentChannelName"));
  const memberCount = JSON.parse(localStorage.getItem("memberCount"));
  return (
    <div className="channel-messages-container">
      <div className="channel-name">
        <h3>{channelName}</h3>
        <h4>{memberCount} users</h4>
      </div>
      <div className="channel-messages">
        <div>user 1 message</div>
        <div>user 2 message</div>
        <div>user 1 message</div>
      </div>
    </div>
  );
};

export default ChannelMessages;
