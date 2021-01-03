import { Button } from "@material-ui/core";
import React from "react";
import realtime from "../../realtime";
import Chat from "../chat";
import useStyles from "./style";
import "../../index.css";

const size = 20;

const InfoGame = ({
  isPlayer,
  player1,
  player2,
  idRoom,
  status,
  role,
  playerCurr,
  idGame,
  time,
  history,
  playerX,
  userID,
  setBoard,
}) => {
  const classes = useStyles();

  console.log(status);

  let controllGame;
  switch (status) {
    case "waiting":
      controllGame =
        role === "admin" ? (
          <Button className={classes.button}>Invite</Button>
        ) : (
          <Button className={classes.button}>Exit</Button>
        );
      break;
    case "ready":
      controllGame =
        role === "admin" ? (
          <Button
            className={classes.button}
            onClick={() => {
              realtime.newGame(idRoom, player1.id, player2.id);
            }}
          >
            Start
          </Button>
        ) : (
          <Button className={classes.button}>Quit</Button>
        );
      break;
    case "playing":
      controllGame = <Button className={classes.button}>Exit</Button>;
      break;

    default:
      break;
  }

  const player1_X =
    playerX === null ? "" : playerX === player1.id ? " - X" : " - O";

  const player2_X =
    playerX === null ? "" : playerX === player2.id ? " - X" : " - O";

  return (
    <div className={classes.root}>
      <div className={classes.status}>STATUS</div>
      <div className={classes.playerContainer}>
        <div className={classes.playerContent}>
          <div className={classes.playerTitle}>Player1{player1_X}</div>
          <div className={classes.in4Player}>
            <div>
              {userID === player1.id
                ? `${player1.username} (you)`
                : player1.username}
            </div>
            <div style={{ fontSize: "0.7rem" }}>id: {player1.id}</div>
          </div>
          <div className={classes.timmer}>
            {playerCurr ? (playerCurr === player1.id ? time : "") : ""}
          </div>
        </div>
        <div className={classes.playerContent}>
          <div className={classes.playerTitle}>Player2{player2_X}</div>

          <div className={classes.in4Player}>
            <div>
              {userID === player2.id
                ? `${player2.username} (you)`
                : player2.username}
            </div>
            <div style={{ fontSize: "0.7rem" }}>id: {player2.id}</div>
          </div>
          <div className={classes.timmer}>
            {playerCurr ? (playerCurr === player2.id ? time : "") : ""}
          </div>
        </div>
      </div>

      <div className={classes.historyContainer}>
        <div className={classes.historyTitle}>HISTORY</div>
        <div className={classes.historyContent}>
          {history.map((item, index) => {
            return (
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  margin: "5px 0",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                key={index}
                onClick={() => {
                  setBoard(item.board);
                }}
              >
                {index + 1} - (row,col): ({~~(item.index / size)},
                {item.index % size})
              </div>
            );
          })}
        </div>
      </div>

      <div className={classes.containerButton}>{controllGame}</div>
      <Chat isPlayer={isPlayer} idRoom={idRoom} />
    </div>
  );
};

export default InfoGame;
