import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./channel.css";

const USER_CHANNELS_LIST_KEY = "currentUserChannelList";
const CURRENT_CHANNEL_ID_KEY = "currentChannelId";
const CURRENT_CHANNEL_NAME_KEY = "currentChannelName";

const Channel = ({
  modal,
  setModal,
  setActiveChannelId,
  setChannel_id,
  newChannel,
}) => {
  const navigate = useNavigate();
  const [channelList, setChannelList] = useState([]);
  const handleAddChannel = (e) => {
    e.preventDefault();
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
  }, [newChannel]);
  const handleSelectChannel = (e, id, name) => {
    e.preventDefault();
    setActiveChannelId(id.toString());
    navigate(`channelMessage/${id}/${name}`);
    setChannel_id(id);
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
              <Link
                to={`/channelMessage/${channel.id}/${channel.name}`}
                style={{ textDecoration: "none" }}
                key={channel.id}
              >
                <li
                  key={channel.id}
                  onClick={(e) => {
                    handleSelectChannel(e, channel.id, channel.name);
                  }}
                >
                  <h4>{channel.name}</h4>
                  <h6>#{channel.id}</h6>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Channel;
