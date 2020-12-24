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

          <div className={classes.content} style={{ borderTopLeftRadius: 15 }}>
            {contentMessage}
          </div>
        </div>
      </div>
    ) : (
      <div className={classes.receiver}>
        <div>
          <div style={{ fontSize: "0.8rem" }}>
            {time} - {username}
          </div>
          <div className={classes.content} style={{ borderTopRightRadius: 15 }}>
            {contentMessage}
          </div>
        </div>
      </div>
    );

  return messageView;
};

export default Message;
