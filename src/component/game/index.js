import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import "../../index.css";
import realtime from "../../realtime";
import TAG from "../../realtime/data";
import action from "../../storage/action";
import Board from "../board";
import InfoGame from "../infoGame";
import PasswordRoom from "../passwordRoom";
import apiService from "./apiService";
import useStyles from "./style";
import jwtDecode from "jwt-decode";

import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlertDialog from "../alertDialog";

import { ReactComponent as Star } from "../../assert/svg-icon/star.svg";
import { ReactComponent as Medal } from "../../assert/svg-icon/medal.svg";

const size = 20;

console.log(React.version);

const Game = ({ userID, turnOnLoading, turnOffLoading }) => {
  const { width, height } = useWindowSize();

  // style
  const classes = useStyles();

  // react-router hook
  const match = useRouteMatch();

  // params
  const { id: idRoom } = match.params;

  const notifyNewPlayerJoinRoom = (username) =>
    toast.info(`${username} join room. Ready to go!!`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });

  const notifyStartGame = () =>
    toast(`Start game!!`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });

  // states
  const [openDialogPassword, setOpenDialogPassword] = useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);

  const [player1, setPlayer1] = useState({ username: "...", id: "..." });
  const [player2, setPlayer2] = useState({ username: "...", id: "..." });
  const [isPlayer, setIsPlayer] = useState(false);
  const [statusRoom, setStatusRoom] = useState("");
  const [role, setRole] = useState("player");
  const [playerX, setPlayerX] = useState(null);
  const [idPlayerCurr, setIdPlayerCurr] = useState(null);
  const [time, setTime] = useState(0);
  const [idGame, setIdGame] = useState(null);
  const [winner, setWinner] = useState(null);

  const [board, setBoard] = useState(Array(size * size).fill(null));
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const room = localStorage.getItem("room");
    if (room) {
      realtime.leaveRoom(room);
      localStorage.removeItem("room");
    }

    realtime.setCallback(
      TAG.RESPONSE_UPDATE_USER_IN_ROOM,
      ({ player1, player2 }) => {
        console.log({ player1, player2 });
        setPlayer1(player1);
        setPlayer2(player2);
        notifyNewPlayerJoinRoom(player2.username);
      }
    );

    realtime.setCallback(
      TAG.RESPONSE_UPDATE_STATUS_ROOM_FOR_PLAYER,
      ({ room }) => {
        setStatusRoom(room.status);
      }
    );

    realtime.setCallback(
      TAG.RESPONSE_INFO_PLAYER_XO,
      ({ playerX, playerO, gameID }) => {
        setIdPlayerCurr(playerX);
        setIdGame(gameID);
        setStatusRoom("playing");
        setOpenDialogConfirm(false);

        setBoard(Array(size * size).fill(null));
        setPlayerX(playerX);
        notifyStartGame();
      }
    );

    realtime.setCallback(TAG.RESPONSE_PLAYER_NEXT_TURN, ({ player }) => {
      setIdPlayerCurr(player);
    });

    realtime.setCallback(TAG.RESPONSE_TIMMER, ({ time }) => {
      console.log("TIMMER: ", time);
      setTime(time);
    });

    realtime.setCallback(TAG.RESPONSE_TIME_UP, ({ winner }) => {
      console.log("TIMMER UP");
      setWinner(winner);
      setTime(0);
      setOpenDialogConfirm(true);
      setStatusRoom("ready");
    });

    realtime.setCallback(
      TAG.RESPONSE_RECONNECT,
      ({ board, playerX, playerO, currentPlayer }) => {
        setBoard(board);
        setPlayerX(playerX);
        setIdPlayerCurr(currentPlayer);
      }
    );

    realtime.setCallback(TAG.RESPONSE_MOVE, ({ board, index, order }) => {
      setBoard(board);
      setHistory((prev) => prev.concat({ board, index, order }));
    });

    realtime.setCallback(TAG.RESPONSE_WINNER, ({ winner }) => {
      setWinner(winner);
      setOpenDialogConfirm(true);
      setStatusRoom("ready");
    });

    return () => {
      realtime.removeCallback(TAG.RESPONSE_UPDATE_USER_IN_ROOM);
      realtime.removeCallback(TAG.RESPONSE_UPDATE_STATUS_ROOM_FOR_PLAYER);
      realtime.removeCallback(TAG.RESPONSE_INFO_PLAYER_XO);
      realtime.removeCallback(TAG.RESPONSE_PLAYER_NEXT_TURN);
      realtime.removeCallback(TAG.RESPONSE_TIMMER);
      realtime.removeCallback(TAG.RESPONSE_TIME_UP);
      realtime.removeCallback(TAG.RESPONSE_RECONNECT);
      realtime.removeCallback(TAG.RESPONSE_MOVE);
      realtime.removeCallback(TAG.RESPONSE_WINNER);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _handleClickCell = (index) => {
    if (isPlayer && idPlayerCurr === userID && board[index] === null) {
      console.log("Move");

      realtime.makeMove(index);
      return true;
    }

    return false;
  };

  useEffect(() => {
    turnOnLoading();
    (async () => {
      try {
        const { success, message, data } = await apiService.getRoom(idRoom);

        console.log("DATA GET ROOM:", data);
        // if (data.room.password) {
        //   setOpen(true);
        // }

        if (success) {
          const { room } = data;
          setIsPlayer(room.becomePlayer);
          realtime.joinRoom(room.id);
          localStorage.setItem("room", room.id);

          realtime.updateInfoUserInRoom(
            room.id,
            room.player1,
            room.player2 || { username: "...", id: "..." }
          );

          setHistory(room.history);
          setPlayer1(room.player1);
          setPlayer2(room.player2 || { username: "...", id: "..." });
          setStatusRoom(room.status);
          setRole(room.role);
          console.log(room);
        } else {
          console.log(message);
        }
      } catch (e) {
        console.log("[ERROR]:", e.message);
      }
      turnOffLoading();
    })();

    return () => {
      // const confirm = window.confirm("Do you want to quit this room?");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const usernameWinner =
    winner === player1.id
      ? winner === userID
        ? "You"
        : player1.username
      : winner === userID
      ? "You"
      : player2.username;

  return (
    <>
      <AlertDialog
        open={openDialogConfirm}
        setOpen={setOpenDialogConfirm}
        title={
          <>
            <Star style={{ width: 30, height: 30 }} />
            <Star style={{ width: 40, height: 40 }} />
            <Star style={{ width: 30, height: 30 }} />
          </>
        }
        description={
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <span>{usernameWinner} is the winner</span>
            <Medal style={{ width: 30, height: 30 }} />
          </div>
        }
      />
      {openDialogConfirm && <Confetti width={width} height={height} />}
      <PasswordRoom
        isOpen={openDialogPassword}
        onClose={setOpenDialogPassword}
      />
      <Grid container className={classes.root}>
        <Grid container item xs={12} md={10}>
          <Grid item md={8} className={classes.board}>
            <div>
              <div style={{ background: "white", height: 30, marginBottom: 2 }}>
                Room id: {idRoom}
              </div>
              <Board board={board} onClickCell={_handleClickCell} />
            </div>
          </Grid>
          <Grid container item md={4} style={{ justifyContent: "center" }}>
            <ToastContainer />

            <InfoGame
              isPlayer={isPlayer}
              idRoom={idRoom}
              player1={player1}
              player2={player2}
              status={statusRoom}
              playerCurr={idPlayerCurr}
              role={role}
              idGame={idGame}
              time={time}
              history={history}
              playerX={playerX}
              userID={userID}
              setBoard={setBoard}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const parseToken = (token) => {
  try {
    return jwtDecode(token).id;
  } catch (e) {
    return null;
  }
};

const mapStateToProps = (state) => ({
  userID: parseToken(state.token),
});

const mapDispatchToProps = (dispatch) => ({
  turnOnLoading: () => {
    dispatch(action.LOADING.turnOn());
  },
  turnOffLoading: () => {
    dispatch(action.LOADING.turnOff());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
