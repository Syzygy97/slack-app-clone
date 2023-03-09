import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./users.css";

const MEMBER_COUNT_KEY = "memberCount";

const Users = ({
  allUsers,
  activeChannelId,
  newMemberModal,
  setNewMemberModal,
  addNewMember,
}) => {
  const navigate = useNavigate();
  const signedInData = JSON.parse(localStorage.getItem("signedInData"));
  const { email } = signedInData;
  const [channelMembers, setChannelMembers] = useState([]);
  const [channelId, setChannelId] = useState("");
  let dynamicUrl =
    "https://slackapi.avionschool.com/api/v1/channels/" + activeChannelId;
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
          setChannelId(data.id);
          setChannelMembers(channel_members);
        }
      });
  };
  const handleSelectUser = (e, id, email) => {
    e.preventDefault();
    navigate(`directMessage/${id}/${email}`);
  };
  const handleAddMember = (e) => {
    e.preventDefault();
    setNewMemberModal(!newMemberModal);
  };
  const filteredData = allUsers.filter((user) => {
    const userIds = channelMembers.map((data) => data.user_id);
    return userIds.includes(user.id);
  });
  useEffect(() => {
    (async () => {
      await fetchChannelMemberIds();
    })();
  }, [dynamicUrl, addNewMember]);
  useEffect(() => {
    localStorage.setItem(
      MEMBER_COUNT_KEY,
      JSON.stringify(channelMembers.length)
    );
  }, [channelMembers.length]);
  useEffect(() => {
    localStorage.setItem("channelMembers", JSON.stringify(channelMembers));
  }, [channelMembers]);
  return (
    <>
      <div className="users-container">
        <div className="users-header">
          <div>
            <h3>MEMBERS</h3>
            <h5>#{channelId}</h5>
          </div>
          <i onClick={handleAddMember}>+</i>
        </div>
        <div className="channel-users-list">
          <ul>
            {filteredData.map((member) => {
              return (
                <li
                  key={member.id}
                  onClick={(e) => {
                    handleSelectUser(e, member.id, member.email);
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
        <h2>Hello, {email}!</h2>
      </div>
    </>
  );
};

export default Users;
