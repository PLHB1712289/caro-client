import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import React from "react";
import { useHistory } from "react-router-dom";
import useStyle from "./style";

const ItemGame = ({ data }) => {
  const classes = useStyle();

  const history = useHistory();

  const { no, id, name, player1, player2, status, isLock } = data;

  const _handleOnlick = () => {
    history.push(`/game/${id}`);
  };

  const classNameStatus =
    status === "waiting" ? classes.waiting : classes.playing;

  return (
    <div className={classes.container} onClick={_handleOnlick}>
      <div className={classes.column} style={{ width: "5%" }}>
        {no}
      </div>
      <div className={classes.column} style={{ width: "25%" }}>
        {id}
      </div>
      <div className={classes.column} style={{ width: "20%" }}>
        {name}
      </div>
      <div className={classes.column} style={{ width: "20%" }}>
        {player1}
      </div>
      <div className={classes.column} style={{ width: "20%" }}>
        {player2}
      </div>
      <div className={classes.column} style={{ width: "20%" }}>
        <div className={classes.status}>
          <div>{status}</div>
          <div className={classNameStatus}></div>
        </div>
      </div>

      <div className={classes.column} style={{ width: "5%" }}>
        {isLock ? (
          <LockIcon style={{ width: 18, height: 18, color: "red" }} />
        ) : (
          <LockOpenIcon style={{ width: 18, height: 18, color: "green" }} />
        )}
      </div>
    </div>
  );
};

export default ItemGame;
