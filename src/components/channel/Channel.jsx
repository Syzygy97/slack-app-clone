import React, { useEffect, useState } from "react";
import "./channel.css";

const USER_CHANNELS_LIST_KEY = "currentUserChannelList";
const CURRENT_CHANNEL_ID_KEY = "currentChannelId";
const CURRENT_CHANNEL_NAME_KEY = "currentChannelName";

const Channel = ({
  modal,
  setModal,
  setActiveChannelId,
  setActiveChannelName,
  setActiveChannelMemberCount,
  activeChannelMemberCount,
}) => {
  const [channelList, setChannelList] = useState([]);
  const [channelId, setChannelId] = useState("");
  const handleAddChannel = (e) => {
    e.preventDefault();
    console.log("test");
    setModal(!modal);
  };
  const fetchChannels = async () => {
    await fetch("http://206.189.91.54/api/v1/channels", {
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
        if (dataArray === undefined) {
          setChannelList([]);
          localStorage.setItem(USER_CHANNELS_LIST_KEY, JSON.stringify([]));
        } else {
          setChannelList(dataArray);
          localStorage.setItem(
            USER_CHANNELS_LIST_KEY,
            JSON.stringify(dataArray)
          );
        }
      });
  };
  useEffect(() => {
    (async () => {
      await fetchChannels();
    })();
    // fetchChannels();
  }, []);
  const handleSelectChannel = (e, id, name) => {
    e.preventDefault();
    setActiveChannelId(id.toString());
    setActiveChannelName(name);
    // setActiveChannelMemberCount(activeChannelMemberCount);
    // localStorage.setItem(
    //   "memberCount",
    //   JSON.stringify(activeChannelMemberCount)
    // );
    localStorage.setItem(CURRENT_CHANNEL_ID_KEY, JSON.stringify(id));
    localStorage.setItem(CURRENT_CHANNEL_NAME_KEY, JSON.stringify(name));
  };
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
              <li
                key={channel.id}
                onClick={(e) => {
                  handleSelectChannel(e, channel.id, channel.name);
                }}
              >
                <h4>{channel.name}</h4>
                <h6>{channel.id}</h6>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Channel;
