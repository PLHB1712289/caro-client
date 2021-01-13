import React from "react";
import useStyles from "./style";

const Message = ({ message }) => {
  const classes = useStyles();
  const { type, username, contentMessage, time } = message;

  const messageView =
    type === "sender" ? (
      <div className={classes.sender}>
        <div>
          <div style={{ fontSize: "0.8rem" }}>
            {time} - {username}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div
              className={classes.content}
              style={{ borderTopLeftRadius: 10, borderTopRightRadius: 4 }}
            >
              {contentMessage}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className={classes.receiver}>
        <div>
          <div style={{ fontSize: "0.8rem" }}>
            {time} - {username}
          </div>
          <div
            className={classes.content}
            style={{ borderTopRightRadius: 10, borderTopLeftRadius: 4 }}
          >
            {contentMessage}
          </div>
        </div>
      </div>
    );

  return messageView;
};

export default Message;
