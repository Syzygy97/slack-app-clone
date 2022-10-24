import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ChannelMessages from "../channelMessages";
import ChannelMessaging from "../channelMessaging";
import Messages from "../messages/Messages";
import Messaging from "../messaging";
import NewMessage from "../newMessage";
import Welcome from "../welcome/Welcome";
import "./home.css";

const Home = ({ allUsers, channel_id }) => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState([]);
  const [messageToChannel, setMessageToChannel] = useState([]);
  return (
    <div className="home-container">
      <Routes>
        <Route index element={<Welcome />} />
        <Route
          path="/channelMessage/:channel__id/:channel__name"
          element={<ChannelMessages messageToChannel={messageToChannel} />}
        />
        <Route
          path="/newMessage"
          element={<NewMessage allUsers={allUsers} setUserId={setUserId} />}
        />
        <Route
          path="directMessage/:receiver__id/:receiver__email"
          element={<Messages userId={userId} message={message} />}
        />
      </Routes>
      <Routes>
        <Route
          path="/directMessage/*"
          element={<Messaging userId={userId} setMessage={setMessage} />}
        />
        <Route
          path="/channelMessage/*"
          element={
            <ChannelMessaging
              channel_id={channel_id}
              setMessageToChannel={setMessageToChannel}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Home;
