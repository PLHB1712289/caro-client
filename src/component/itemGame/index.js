import React from "react";
import useStyle from "./style";
import { useHistory } from "react-router-dom";

const ItemGame = ({ data }) => {
  const classes = useStyle();

  const history = useHistory();

  const { no, id, player1, player2, status } = data;

  const _handleOnlick = () => {
    history.push(`/game/${id}`);
  };

  return (
    <div className={classes.container} onClick={_handleOnlick}>
      <div className={classes.column} style={{ width: "5%" }}>
        {no}
      </div>
      <div className={classes.column} style={{ width: "30%" }}>
        {id}
      </div>
      <div className={classes.column} style={{ width: "20%" }}>
        {player1}
      </div>
      <div className={classes.column} style={{ width: "20%" }}>
        {player2}
      </div>
      <div className={classes.column} style={{ width: "20%" }}>
        {status}
      </div>
    </div>
  );
};

export default ItemGame;
