import React, { useEffect, useState } from "react";
import Buttons from "../buttons";
import "./users.css";

const MEMBER_COUNT_KEY = "memberCount";

const Users = ({ allUsers, activeChannelId, setActiveChannelMemberCount }) => {
  const signedInData = JSON.parse(localStorage.getItem("signedInData"));
  const { email } = signedInData;
  // const [channelDetails, setChannelDetails] = useState([]);
  const [channelMembers, setChannelMembers] = useState([]);
  let dynamicUrl = "http://206.189.91.54/api/v1/channels/" + activeChannelId;
  // const fetchChannels = async () => {
  //   await fetch("http://206.189.91.54/api/v1/channels", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "access-token": localStorage.getItem("access-token"),
  //       client: localStorage.getItem("client"),
  //       expiry: localStorage.getItem("expiry"),
  //       uid: localStorage.getItem("uid"),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       const dataArray = result.data;
  //       if (dataArray === undefined) {
  //         setChannelDetails([]);
  //       } else {
  //         setChannelDetails(dataArray);
  //       }
  //     });
  // };
  // useEffect(() => {
  //   (async () => {
  //     await fetchChannels();
  //   })();
  // }, []);
  useEffect(() => {
    (async () => {
      await fetchChannelMemberIds();
    })();
  }, [dynamicUrl]);
  const fetchChannelMemberIds = async () => {
    await fetch(dynamicUrl, {
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
        const data = result.data;
        const channel_members = data.channel_members;
        if (data === undefined) {
          setChannelMembers([]);
        } else {
          setChannelMembers(channel_members);
        }
        // setActiveChannelMemberCount(channelMembers.length);
      });
  };
  // console.log("members", channelMembers);
  // console.log("channel members", channelMembers);
  useEffect(() => {
    setActiveChannelMemberCount(channelMembers.length);
    localStorage.setItem(
      MEMBER_COUNT_KEY,
      JSON.stringify(channelMembers.length)
    );
  }, [channelMembers.length]);

  // const userIds = channelMembers.map((data) => data.user_id);
  // const filteredData = allUsers.filter((user) => {
  //   // option 1
  //   return userIds.includes(user.id);
  //   // option 2
  //   return userIds.filter((id) => id === user.id).length;
  //   // option 3
  //   return userIds.findIndex((id) => id === user.id) > -1;
  //   // hard-coded way
  //   // return user.id === 2816 || user.id === 2 || user.id === 2818;
  // });
  // console.log("filtered", filteredData);
  return (
    <>
      <div className="users-container">
        <div className="users-header">
          <h3>MEMBERS</h3>
        </div>
        <div className="channel-users-list">
          <ul>
            {channelMembers.map((member) => {
              return <li key={member.id}>{member.user_id}</li>;
            })}
          </ul>
        </div>
        {/* <Buttons name="GET USERS" />
      <h3>ROLE 1</h3>
      <h4>User 1</h4>
      <h4>User 2</h4>
      <h3>ROLE 2</h3>
      <h4>User 3</h4>
      <h4>User 4</h4> */}
      </div>
      <div className="signed-in-user-email">
        <h2>{email}</h2>
      </div>
    </>
  );
};

export default Users;
