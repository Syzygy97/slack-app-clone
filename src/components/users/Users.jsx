import React, { useEffect, useState } from "react";
import "./users.css";

const MEMBER_COUNT_KEY = "memberCount";

const Users = ({
  allUsers,
  activeChannelId,
  newMemberModal,
  setNewMemberModal,
  addNewMember,
}) => {
  const signedInData = JSON.parse(localStorage.getItem("signedInData"));
  const { email } = signedInData;
  const [channelMembers, setChannelMembers] = useState([]);
  const [channelMemberEmail, setChannelMemberEmail] = useState([]);
  let dynamicUrl = "http://206.189.91.54/api/v1/channels/" + activeChannelId;

  useEffect(() => {
    (async () => {
      await fetchChannelMemberIds();
    })();
  }, [dynamicUrl, addNewMember]);
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
      });
  };
  useEffect(() => {
    localStorage.setItem(
      MEMBER_COUNT_KEY,
      JSON.stringify(channelMembers.length)
    );
  }, [channelMembers.length]);
  useEffect(() => {
    localStorage.setItem("channelMembers", JSON.stringify(channelMembers));
  }, [channelMembers]);
  const handleSelectUser = (e) => {
    e.preventDefault();
  };
  const handleAddMember = (e) => {
    e.preventDefault();
    setNewMemberModal(!newMemberModal);
  };
  const filteredData = allUsers.filter((user) => {
    const userIds = channelMembers.map((data) => data.user_id);
    // option 1
    return userIds.includes(user.id);
    //   // option 2
    //   return userIds.filter((id) => id === user.id).length;
    //   // option 3
    //   return userIds.findIndex((id) => id === user.id) > -1;
    //   // hard-coded way
    //   // return user.id === 2816 || user.id === 2 || user.id === 2818;
  });
  console.log("filtered", filteredData);
  return (
    <>
      <div className="users-container">
        <div className="users-header">
          <h3>MEMBERS</h3>
          <i onClick={handleAddMember}>+</i>
        </div>
        <div className="channel-users-list">
          <ul>
            {filteredData.map((member) => {
              return (
                <li
                  key={member.id}
                  onClick={(e) => {
                    handleSelectUser(e);
                  }}
                >
                  <div className="user-info">
                    <h4>{member.email}</h4>
                    <h6>ID #{member.id}</h6>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="signed-in-user-email">
        <h2>{email}</h2>
      </div>
    </>
  );
};

export default Users;
