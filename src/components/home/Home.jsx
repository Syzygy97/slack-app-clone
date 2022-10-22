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
  return (
    <div className="home-container">
      <Routes>
        <Route index element={<Welcome />} />
        <Route
          path="/channelMessage/:channel__id/:channel__name"
          element={<ChannelMessages />}
        />
        <Route
          path="/directMessage"
          element={<NewMessage allUsers={allUsers} setUserId={setUserId} />}
        />
        <Route
          path="directMessage/:receiver__id/:receiver__email"
          element={<Messages allUsers={allUsers} userId={userId} />}
        />
      </Routes>
      <Routes>
        <Route
          path="/directMessage/*"
          element={<Messaging userId={userId} />}
        />
        <Route
          path="/channelMessage/*"
          element={<ChannelMessaging channel_id={channel_id} />}
        />
      </Routes>
    </div>
  );
};

export default Home;
