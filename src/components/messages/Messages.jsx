import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./messages.css";
import Avatar from "../../assets/avatar4.png";

const Messages = ({ allUsers, userId }) => {
  const { receiver__id, receiver__email } = useParams();
  const receiver = allUsers.find((user) => user.id === receiver__id);
  const [directMessage, setDirectMessage] = useState([]);
  const [data, setData] = useState({
    receiver_id: parseInt(receiver__id),
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
        return result.data;
      });
  };
  useEffect(() => {
    setData({ ...data, receiver_id: userId });
  }, [data.receiver_id]);
  useEffect(() => {
    (async () => {
      const data = await retrieveDirectMessages();
      setDirectMessage(data);
    })();
  }, []);
  return (
    <div className="messages-container">
      <div className="receiver-name">
        <h3>{receiver__email}</h3>
        <h4>{receiver__id}</h4>
      </div>
      <div className="direct-messages">
        <ul>
          {directMessage.map((data) => {
            const message = data.body;
            const sender = data.sender;
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
