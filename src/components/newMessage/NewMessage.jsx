import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./newMessage.css";

const NewMessage = ({ allUsers, setUserId }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [recipient, setRecipient] = useState("");
  const handleFocus = (e) => {
    e.preventDefault();
    setIsActive(false);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsActive(true);
  };
  const handleSelectRecipient = (e, email, id) => {
    e.preventDefault();
    setRecipient(email);
    setUserId(id);
    setIsActive(true);
    navigate(`${id}/${email}`);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setRecipient(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // const handleSearchChange = (e) => {
  //   if (!e.target.value) return setSearchResults(userLists);
  //   const resultsArray = userLists.filter((users) =>
  //     users.email.startsWith(e.target.value)
  //   );
  //   setSearchResults(resultsArray);
  // };
  // useEffect(()=> {
  //   setUserLists(allUsers)
  // },[])
  return (
    <div className="new-message-container">
      <div className="new-message-label">
        <h2>New Message</h2>
      </div>
      <form className="new-message-receiver" onSubmit={handleSubmit}>
        <h4>To:</h4>
        <input
          className="new-message-receiver-email"
          placeholder="enter receiver"
          value={recipient}
          onFocus={handleFocus}
          onChange={handleChange}
        />
        <div
          className={
            isActive ? "receiver-list inactive" : "receiver-list active"
          }
        >
          <ul>
            {allUsers.map((user) => {
              return (
                <Link
                  to={`/directMessage/${user.id}/${user.email}`}
                  style={{ textDecoration: "none" }}
                  key={user.id}
                >
                  <li
                    key={user.id}
                    onClick={(e) => {
                      handleSelectRecipient(e, user.email, user.id);
                    }}
                  >
                    {user.email}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </form>
      <div className="new-message-body" onClick={handleClick}>
        <div></div>
      </div>
    </div>
  );
};

export default NewMessage;
