import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import realtime from "../../realtime";
import Chat from "../chat";
import useStyles from "./style";
import "../../index.css";
import ConfirmDialog from "../quitDialog";
import DrawDialog from "../drawDialog";
import SurrenderDialog from "../surrenderDialog";

import DrawConfirmDialog from "../drawConfirmDialog";
import SurrenderConfirmDialog from "../surrenderConfirmDialog";
import InvitePlayer from "../invitePlayer";
import TAG from "../../realtime/data";

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

  const _handleQuit = () => {
    setOpenDialogConfirm(true);
  };

  const [confirm] = useState(() => {});
  const [titleConfirm] = useState("");
  const [descriptionConfirm] = useState("");

  const [openDialogDraw, setOpenDialogDraw] = useState(false);
  const [openDialogSurrender, setOpenDialogSurrender] = useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [openDialogInvite, setOpenDialogInvite] = useState(false);

  const [openDialogDrawConfirm, setOpenDialogDrawConfirm] = useState(false);
  const [openDialogSurrenderConfirm, setOpenDialogSurrenderConfirm] = useState(
    false
  );
  const [
    usernamePlayerDrawSurrender,
    setUsernamePlayerDrawSurrender,
  ] = useState("");

  useEffect(() => {
    if (status !== "playing") {
      setOpenDialogDraw(false);
      setOpenDialogSurrender(false);
      setOpenDialogConfirm(false);
      setOpenDialogDrawConfirm(false);
      setOpenDialogSurrenderConfirm(false);
    }
  }, [status]);

  useEffect(() => {
    realtime.setCallback(TAG.RESPONSE_DRAW, ({ username }) => {
      setUsernamePlayerDrawSurrender(username);
      setOpenDialogDrawConfirm(true);
    });

    realtime.setCallback(TAG.RESPONSE_SURRENDER, ({ username }) => {
      setUsernamePlayerDrawSurrender(username);
      setOpenDialogSurrenderConfirm(true);
    });

    return () => {
      realtime.removeCallback(TAG.RESPONSE_DRAW);
      realtime.removeCallback(TAG.RESPONSE_SURRENDER);
    };
  }, []);

  let controllGame;
  switch (status) {
    case "waiting":
      controllGame =
        role === "admin" ? (
          player2.id === "..." ? (
            <Button
              className={classes.button}
              onClick={() => {
                setOpenDialogInvite(true);
              }}
            >
              Invite
            </Button>
          ) : (
            <Button
              className={classes.button}
              style={{ background: "orange" }}
              onClick={_handleQuit}
            >
              Quit
            </Button>
          )
        ) : (
          <Button
            className={classes.button}
            style={{ background: "orange" }}
            onClick={_handleQuit}
          >
            Quit
          </Button>
        );
      break;
    case "ready":
      controllGame =
        role === "admin" ? (
          player1.online && player2.online ? (
            <Button
              className={classes.button}
              onClick={() => {
                realtime.newGame(idRoom, player1.id, player2.id);
              }}
              style={{ background: "green" }}
            >
              Start
            </Button>
          ) : (
            <Button
              className={classes.button}
              style={{ background: "orange" }}
              onClick={_handleQuit}
            >
              Quit
            </Button>
          )
        ) : (
          <Button
            className={classes.button}
            style={{ background: "orange" }}
            onClick={_handleQuit}
          >
            Quit
          </Button>
        );
      break;
    case "playing":
      controllGame =
        role !== "viewer" ? (
          <>
            <Button
              className={classes.button}
              style={{ background: "red" }}
              onClick={() => {
                setOpenDialogSurrender(true);
              }}
            >
              Surrender
            </Button>
            <Button
              className={classes.button}
              style={{ background: "blue" }}
              onClick={() => {
                setOpenDialogDraw(true);
              }}
            >
              Draw
            </Button>
          </>
        ) : (
          <Button className={classes.button} onClick={_handleQuit}>
            Quit
          </Button>
        );

      break;

    default:
      break;
  }

  const highlightPlayer1 =
    playerCurr === player1.id ? `rgba(255,255,255,0.2)` : "";
  const highlightPlayer2 =
    playerCurr === player2.id ? `rgba(255,255,255,0.2)` : "";

  const player1_X = playerX === null ? "" : playerX === player1.id ? "X" : "O";

  const player2_X = playerX === null ? "" : playerX === player2.id ? "X" : "O";

  return (
    <div className={classes.root}>
      <ConfirmDialog
        open={openDialogConfirm}
        setOpen={setOpenDialogConfirm}
        onConfirm={() => confirm()}
        title={titleConfirm}
        description={descriptionConfirm}
      />
      <DrawDialog
        open={openDialogDraw}
        setOpen={setOpenDialogDraw}
        idRoom={idRoom}
        idGame={idGame}
      />
      <SurrenderDialog
        open={openDialogSurrender}
        setOpen={setOpenDialogSurrender}
        idRoom={idRoom}
        idGame={idGame}
      />
      <DrawConfirmDialog
        username={usernamePlayerDrawSurrender}
        open={openDialogDrawConfirm}
        setOpen={setOpenDialogDrawConfirm}
      />
      <SurrenderConfirmDialog
        username={usernamePlayerDrawSurrender}
        open={openDialogSurrenderConfirm}
        setOpen={setOpenDialogSurrenderConfirm}
      />

      <InvitePlayer
        open={openDialogInvite}
        onClose={() => setOpenDialogInvite(false)}
        idRoom={idRoom}
      />

      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: 5,
          height: "30vh",
        }}
      >
        <div style={{ height: "85%", display: "flex" }}>
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                marginBottom: 5,
                fontSize: "1.2rem",
                fontWeight: 700,
                color: `${player1_X === "X" ? "red" : "green"}`,
              }}
            >
              Player {player1_X} {player1.online ? "" : " (disconnect)"}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px 20px",
                background: `${highlightPlayer1}`,
                borderRadius: 10,
                width: "80%",
              }}
            >
              <img
                alt="img"
                style={{
                  width: 100,
                  height: 100,
                  background: "pink",
                  borderRadius: 10,
                }}
                src={`${player1.avatarUrl}`}
              />
              <div style={{ marginLeft: 5 }}>
                <div style={{ textAlign: "center", fontSize: "1.1rem" }}>
                  {player1.username}
                </div>
                <div style={{ fontSize: "0.7rem", textAlign: "center" }}>
                  ID: {player1.id}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                marginBottom: 5,
                fontSize: "1.2rem",
                fontWeight: 700,
                color: `${player2_X === "X" ? "red" : "green"}`,
              }}
            >
              Player {player2_X} {player2.online ? "" : " (disconnect)"}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px 20px",
                background: `${highlightPlayer2}`,
                borderRadius: 10,
                width: "80%",
              }}
            >
              <img
                alt="img"
                style={{
                  width: 100,
                  height: 100,
                  background: "pink",
                  borderRadius: 10,
                }}
                src={`${player2.avatarUrl}`}
              />
              <div style={{ marginLeft: 5 }}>
                <div style={{ textAlign: "center", fontSize: "1.1rem" }}>
                  {player2.username}
                </div>
                <div style={{ fontSize: "0.7rem", textAlign: "center" }}>
                  ID: {player2.id}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "15%", display: "flex", marginTop: 10 }}>
          <div
            style={{
              width: "50%",
              textAlign: "center",
            }}
          >
            {highlightPlayer1.length !== 0 ? time : ""}
          </div>
          <div
            style={{
              width: "50%",
              textAlign: "center",
            }}
          >
            {highlightPlayer2.length !== 0 ? time : ""}
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
                  display: "flex",
                  padding: 5,
                  color: `${item.board[item.index] === "X" ? "red" : "green"}`,
                  fontWeight: 600,
                }}
                key={index}
                onClick={() => {
                  setBoard(item.board);
                }}
              >
                <div style={{ width: "20%" }}>{index + 1}.</div>
                <div
                  style={{
                    width: "15%",
                  }}
                >
                  {item.board[item.index]}
                </div>
                <div style={{ width: "20%" }}>
                  ({~~(item.index / size)}, {item.index % size})
                </div>
                <div style={{ width: "40%" }}>
                  {player1_X === item.board[item.index]
                    ? player1.username
                    : player2.username}
                </div>
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
