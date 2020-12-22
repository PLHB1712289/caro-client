import React from "react";
import useStyle from "./style";
import { useHistory } from "react-router-dom";
import { Tooltip, Grid, withStyles } from "@material-ui/core";

const ItemUserOnline = ({ data }) => {
  const classes = useStyle();
  const { id, username, status } = data;

  const history = useHistory();

  const _handleOnClick = () => {
    history.push(`/player/${id}`);
  };

  return (
    <div className={classes.container} onClick={_handleOnClick}>
      <div className={classes.item}>
        <div className={classes.username}>{username}</div>
        <div className={classes.id}>ID: {id}</div>
      </div>

      <div className={classes.status}>{status}</div>
    </div>
  );
};

export default ItemUserOnline;
