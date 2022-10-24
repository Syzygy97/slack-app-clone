import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./channelMessages.css";
import Avatar from "../../assets/avatar4.png";
import { RiH6 } from "react-icons/ri";

const ChannelMessages = ({ messageToChannel }) => {
  const { channel__id, channel__name } = useParams();
  const memberCount = JSON.parse(localStorage.getItem("memberCount"));
  const [channelMessage, setChannelMessage] = useState([]);
  const retrieveChannelMessages = async (receiverId, receiverClass) => {
    return fetch(
      `http://206.189.91.54/api/v1/messages?receiver_id=${channel__id}&receiver_class=Channel`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "access-token": localStorage.getItem("access-token"),
          client: localStorage.getItem("client"),
          expiry: localStorage.getItem("expiry"),
          uid: localStorage.getItem("uid"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        return result.data;
      });
  };

  useEffect(() => {
    (async () => {
      const datas = await retrieveChannelMessages();
      setChannelMessage(datas);
    })();
  }, [channel__id, messageToChannel]);

  return (
    <div className="channel-messages-container">
      <div className="channel-name">
        <div>
          <h3>{channel__name}</h3>
          <h6>CH ID #{channel__id}</h6>
        </div>
        <h4>{memberCount} users</h4>
      </div>
      <div className="channel-messages">
        <ul>
          {channelMessage.map((data) => {
            const message = data.body;
            const sender = data.sender;
            const senderEmail = sender.email;
            const isoString = data.created_at;
            const day = new Date(isoString);
            const receiverDate = day.toLocaleDateString();
            const receiverTime = day.toLocaleTimeString();
            return (
              <li key={data.id}>
                <div className="channel-message-details">
                  <img src={Avatar} alt="avatar" />
                  <h3>{senderEmail}</h3>
                  <h6>{receiverDate}</h6>
                </div>
                <div className="channel-message-body-container">
                  <div className="channel-message-body">
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

export default ChannelMessages;
