import React from "react";
import "./messaging.css";
import { BsTypeBold, BsTypeItalic, BsTypeStrikethrough } from "react-icons/bs";
import { RiListOrdered, RiListUnordered } from "react-icons/ri";

const Messaging = () => {
  const sendMessages = () => {
    fetch("http://206.189.91.54/api/v1/messages", {
      method: "POST",
      // body: JSON.stringify()
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        expiry: localStorage.getItem("expiry"),
        uid: localStorage.getItem("uid"),
      },
    });
  };
  return (
    <div className="messaging-container">
      <header>
        <BsTypeBold />
        <BsTypeItalic />
        <BsTypeStrikethrough />
        <RiListOrdered />
        <RiListUnordered />
      </header>
      <main></main>
      <footer></footer>
    </div>
  );
};

export default Messaging;
