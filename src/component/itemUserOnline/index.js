import React from "react";
import { useHistory } from "react-router-dom";
import useStyle from "./style";
import PersonIcon from "@material-ui/icons/Person";

const ItemUserOnline = ({ data }) => {
  const classes = useStyle();
  const { id, username } = data;

  const history = useHistory();

  const _handleOnClick = () => {
    history.push(`/player/${id}`);
  };

  return (
    <div className={classes.container} onClick={_handleOnClick}>
      <div style={{ width: "15%", display: "flex", alignItems: "center" }}>
        <PersonIcon />
      </div>
      <div className={classes.item}>
        <div className={classes.username}>{username}</div>
        <div className={classes.id}>ID: {id}</div>
      </div>

      <div className={classes.status}>
        <div>Online</div>
        <div className={classes.online}></div>
      </div>
    </div>
  );
};

export default ItemUserOnline;
