import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./newMessage.css";

const NewMessage = ({ allUsers, setUserId }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState("");
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
    setQuery(email);
    setUserId(id);
    setIsActive(true);
    navigate(`/main/directMessage/${id}/${email}`);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="new-message-container">
      <div className="new-message-label">
        <h2>New Message</h2>
      </div>
      <form className="new-message-receiver" onSubmit={handleSubmit}>
        <h4>To:</h4>
        <input
          className="new-message-receiver-email"
          placeholder="search user"
          value={query}
          onFocus={handleFocus}
          onChange={(e) => {
            e.preventDefault();
            setQuery(e.target.value);
          }}
        />
        <div
          className={
            isActive ? "receiver-list inactive" : "receiver-list active"
          }
        >
          <ul>
            {allUsers
              .filter((user) => user.email.toLowerCase().startsWith(query))
              .map((user) => {
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
