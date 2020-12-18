import React from "react";
import useStyle from "./style";

const ListUserOnline = ({ children }) => {
  const classes = useStyle();

  return (
    <div className={classes.container}>
      <div className={classes.title}>ONLINE</div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default ListUserOnline;
