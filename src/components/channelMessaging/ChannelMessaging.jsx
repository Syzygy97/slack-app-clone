import React, { useEffect, useState } from "react";
import "./channelMessaging.css";
import { BsTypeBold, BsTypeItalic, BsTypeStrikethrough } from "react-icons/bs";
import {
  RiListOrdered,
  RiListUnordered,
  RiSendPlaneFill,
} from "react-icons/ri";

const ChannelMessaging = ({ channel_id, setMessageToChannel }) => {
  const [channelMessageData, setChannelMessageData] = useState({
    receiver_id: "",
    receiver_class: "Channel",
    body: "",
  });
  const sendMessages = async () => {
    await fetch("http://206.189.91.54/api/v1/messages", {
      method: "POST",
      body: JSON.stringify(channelMessageData),
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        expiry: localStorage.getItem("expiry"),
        uid: localStorage.getItem("uid"),
      },
    })
      .then((res) => res.json())
      .then((result) => setMessageToChannel(result.data));
  };
  const handleChange = (e) => {
    e.preventDefault();
    setChannelMessageData({ ...channelMessageData, body: e.target.value });
    localStorage.setItem(
      "channelMessageData",
      JSON.stringify(channelMessageData)
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessages();
    setChannelMessageData({ ...channelMessageData, body: "" });
  };
  useEffect(() => {
    setChannelMessageData({ ...channelMessageData, receiver_id: channel_id });
  }, [channelMessageData.body]);
  return (
    <div className="messaging-container">
      <header>
        <BsTypeBold className="message-formatter" />
        <BsTypeItalic className="message-formatter" />
        <BsTypeStrikethrough className="message-formatter" />
        <RiListOrdered className="message-formatter" />
        <RiListUnordered className="message-formatter" />
      </header>
      <form onSubmit={handleSubmit}>
        <textarea
          className="messaging-input"
          onChange={handleChange}
          value={channelMessageData.body}
        />
      </form>
      <footer>
        <RiSendPlaneFill
          onClick={handleSubmit}
          className="send-message-button"
        />
      </footer>
    </div>
  );
};

export default ChannelMessaging;
