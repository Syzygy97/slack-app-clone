import React, { useEffect, useState } from "react";
import "./messages.css";
import Avatar from "../../assets/avatar4.png";

const Messages = () => {
  const [directMessage, setDirectMessage] = useState([]);
  const [receiverEmail, setReceiverEmail] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [data, setData] = useState({
    receiver_id: "2816",
    receiver_class: "User",
  });
  const retrieveDirectMessages = async () => {
    let dynamicUrl = new URL("http://206.189.91.54/api/v1/messages");
    for (let key in data) {
      dynamicUrl.searchParams.append(key, data[key]);
    }
    return await fetch(dynamicUrl, {
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
        console.log("result", result.data);
        // if (result.data === undefined) {
        //   setDirectMessage([]);
        // } else {
        return result.data; // }
      });
  };
  useEffect(() => {
    (async () => {
      const data = await retrieveDirectMessages();
      setDirectMessage(data);
      console.log("dirMessage", directMessage);
      getReceiverInfo(data);
    })();
  }, []);
  const getReceiverInfo = (messages) => {
    const receiverDetails = messages.find((data) => {
      return data.receiver.uid !== localStorage.getItem("uid");
    });
    console.log("details", receiverDetails);
    setReceiverEmail(receiverDetails.receiver.email);
    setReceiverId(receiverDetails.receiver.id);
  };
  return (
    <div className="messages-container">
      <div className="receiver-name">
        <h3>{receiverEmail}</h3>
        <h4>{receiverId}</h4>
      </div>
      <div className="direct-messages">
        <ul>
          {directMessage.map((data) => {
            const message = data.body;
            const receiver = data.receiver;
            const sender = data.sender;
            const receiverEmail = receiver.email;
            const senderEmail = sender.email;
            const isoString = data.created_at;
            const day = new Date(isoString);
            const receiverDate = day.toLocaleDateString();
            const receiverTime = day.toLocaleTimeString();
            return (
              <li key={data.id}>
                <div className="direct-message-details">
                  <img src={Avatar} alt="avatar" />
                  <h3>{senderEmail}</h3>
                  <h6>{receiverDate}</h6>
                </div>
                <div className="direct-message-body-container">
                  <div className="direct-message-body">
                    <h4>{message}</h4>
                    <h6>{receiverTime}</h6>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Messages;
