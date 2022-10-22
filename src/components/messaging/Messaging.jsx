import React, { useEffect, useState } from "react";
import "./messaging.css";
import { BsTypeBold, BsTypeItalic, BsTypeStrikethrough } from "react-icons/bs";
import {
  RiListOrdered,
  RiListUnordered,
  RiSendPlaneFill,
} from "react-icons/ri";

const Messaging = ({ userId }) => {
  const [messageData, setMessageData] = useState({
    receiver_id: "",
    receiver_class: "User",
    body: "",
  });
  const sendMessages = async () => {
    await fetch("http://206.189.91.54/api/v1/messages", {
      method: "POST",
      body: JSON.stringify(messageData),
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        expiry: localStorage.getItem("expiry"),
        uid: localStorage.getItem("uid"),
      },
    })
      .then((res) => res.json())
      .then((result) => result);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setMessageData({ ...messageData, body: e.target.value });
    localStorage.setItem("messageData", JSON.stringify(messageData));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessages();
    setMessageData({ ...messageData, body: "" });
  };
  useEffect(() => {
    setMessageData({ ...messageData, receiver_id: userId });
  }, [messageData.body]);
  // console.log("msg data", messageData);
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
          value={messageData.body}
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

export default Messaging;
