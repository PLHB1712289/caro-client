import React from "react";
import useStyle from "./style";
import WinnerIcon from "../../assert/img/winner.png";

const ItemHistoryGame = ({ data, onClick }) => {
  const classes = useStyle();

  const { no, _id, win, player1, player2, created_at } = data;
  const date = new Date(created_at);

  return (
    <div className={classes.container} onClick={onClick}>
      <div className={classes.column} style={{ width: "5%" }}>
        {no}
      </div>
      <div className={classes.column} style={{ width: "25%" }}>
        {_id}
      </div>
      <div className={classes.column} style={{ width: "15%" }}>
        {win && (
          <img
            alt="win"
            src={WinnerIcon}
            style={{ maxWidth: 15, maxHeight: 15 }}
          />
        )}
      </div>
      <div className={classes.column} style={{ width: "17.5%" }}>
        {player1}
      </div>
      <div className={classes.column} style={{ width: "17.5%" }}>
        {player2}
      </div>
      <div className={classes.column} style={{ width: "20%" }}>
        {`${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`}
      </div>
    </div>
  );
};

export default ItemHistoryGame;
