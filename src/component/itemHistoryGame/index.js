import React from "react";
import { useHistory } from "react-router-dom";
import useStyle from "./style";

const ItemHistoryGame = ({ data, onClick }) => {
  const classes = useStyle();

  // const history = useHistory();

  const { no, id, name, player1, player2 } = data;

  return (
    <div className={classes.container} onClick={onClick}>
      <div className={classes.column} style={{ width: "5%" }}>
        {no}
      </div>
      <div className={classes.column} style={{ width: "25%" }}>
        {id}
      </div>
      <div className={classes.column} style={{ width: "20%" }}>
        {name}
      </div>
      <div className={classes.column} style={{ width: "25%" }}>
        {player1}
      </div>
      <div className={classes.column} style={{ width: "25%" }}>
        {player2}
      </div>
    </div>
  );
};

export default ItemHistoryGame;
