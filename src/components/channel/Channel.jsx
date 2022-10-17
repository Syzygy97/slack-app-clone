import React, { useEffect, useState } from "react";
import "./channel.css";

const Channel = ({ modal, setModal }) => {
  const [channelList, setChannelList] = useState([]);
  const handleAddChannel = (e) => {
    e.preventDefault();
    console.log("test");
    setModal(!modal);
  };
  const fetchChannels = () => {
    fetch("http://206.189.91.54/api/v1/channels", {
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
        const dataArray = result.data;
        setChannelList(dataArray);
      });
  };
  useEffect(() => {
    fetchChannels();
  }, []);
  console.log("channel list", channelList);
  return (
    <div className="channel-container">
      <div className="channel-header">
        <h3>CHANNELS</h3>
        <i onClick={handleAddChannel}>+</i>
      </div>
      <div className="channel-list-container">
        <ul>
          {channelList.map((channel) => {
            return (
              <li key={channel.id}>
                <h4>{channel.name}</h4>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Channel;
