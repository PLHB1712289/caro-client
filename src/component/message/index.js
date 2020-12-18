import React from "react";

const Message = ({ message }) => {
  const { type, username, contentMessage } = message;

  const messageView =
    type === "1" ? (
      <div
        style={{
          textAlign: "end",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div>
          <div style={{ fontSize: "0.7rem" }}>{username}</div>
          <div>{contentMessage}</div>
        </div>
      </div>
    ) : (
      <div
        style={{
          display: "flex",
        }}
      >
        <div>
          <div style={{ fontSize: "0.7rem" }}>{username}</div>
          <div>{contentMessage}</div>
        </div>
      </div>
    );

  return messageView;
};

export default Message;
