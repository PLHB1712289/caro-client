import { Button } from "@material-ui/core";
import React from "react";
import realtime from "../../realtime";
import Chat from "../chat";
import useStyles from "./style";

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
  isPlayerX,
  userID,
}) => {
  const classes = useStyles();

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
          "Ready"
        );
      break;
    case "playing":
      controllGame = <Button className={classes.button}>Exit</Button>;
      break;

    default:
      break;
  }

  const highlightPlayer1 =
    player1.id === playerCurr ? `rgba(255,255,255,0.3)` : "";

  const highlightPlayer2 =
    player2.id === playerCurr ? `rgba(255,255,255,0.3)` : "";

  const player1_X =
    isPlayerX === null
      ? ""
      : isPlayerX === true && player1.id === userID
      ? " - X"
      : " - O";

  const player2_X =
    player1_X === "" ? "" : player1_X === " - X" ? " - O" : " - X";

  return (
    <div className={classes.root}>
      <div className={classes.status}>STATUS</div>
      <div className={classes.playerContainer}>
        <div className={classes.playerContent}>
          <div className={classes.playerTitle}>Player1{player1_X}</div>
          <div
            className={classes.in4Player}
            style={{ backgroundColor: `${highlightPlayer1}` }}
          >
            <div>{player1.username}</div>
            <div style={{ fontSize: "0.7rem" }}>id: {player1.id}</div>
          </div>
          <div className={classes.timmer}>{time}</div>
        </div>
        <div className={classes.playerContent}>
          <div className={classes.playerTitle}>Player2{player2_X}</div>
          <div
            className={classes.in4Player}
            style={{ backgroundColor: `${highlightPlayer2}` }}
          >
            <div>{player2.username}</div>
            <div style={{ fontSize: "0.7rem" }}>id: {player2.id}</div>
          </div>
          <div className={classes.timmer}>{time}</div>
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
                }}
                key={index}
              >
                1
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
