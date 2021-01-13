import { Grid, Tooltip, Zoom } from "@material-ui/core";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { connect } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWindowSize } from "react-use";
import { ReactComponent as Medal } from "../../assert/svg-icon/medal.svg";
import { ReactComponent as Star } from "../../assert/svg-icon/star.svg";
import "../../index.css";
import realtime from "../../realtime";
import TAG from "../../realtime/data";
import action from "../../storage/action";
import AlertDialog from "../alertDialog";
import Board from "../board";
import InfoGame from "../infoGame";
import PasswordRoom from "../passwordRoom";
import apiService from "./apiService";
import useStyles from "./style";

const size = 20;

const Game = ({ userID, turnOnLoading, turnOffLoading }) => {
  const { width, height } = useWindowSize();

  // style
  const classes = useStyles();

  // react-router hook
  const match = useRouteMatch();
  const historyRouter = useHistory();

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
  const [password, setPassword] = useState(null);

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

  const [errorCheckPassword, setErrorCheckPassword] = useState(null);
  const [avatarRoomOwner, setAvatarRoomOwner] = useState(
    "https://res.cloudinary.com/dofdj0lqd/image/upload/v1610186880/aqutfu6ccnjdqo9vd3zb.png"
  );

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
      (status) => {
        const room = status.room;
        const userRemove = status.userRemove;

        setStatusRoom(room.status);

        if (typeof userRemove !== "undefined") {
          console.log("USER DISCONNECT", userRemove);
          setPlayer1((prev) => {
            if (prev.id === userRemove.id)
              return {
                ...prev,
                id: `${prev.id} (disconnect)`,
              };
            else return prev;
          });

          setPlayer2((prev) => {
            if (prev.id === userRemove.id)
              return {
                ...prev,
                id: `${prev.id} (disconnect)`,
              };
            else return prev;
          });
        }
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
        setHistory([]);
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
      ({ board, playerX, currentPlayer }) => {
        setBoard(board);
        setPlayerX(playerX);
        setIdPlayerCurr(currentPlayer);

        console.log("RESPONSE RECONNECT DATA:", {
          board,
          playerX,
          currentPlayer,
        });
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
    const boardCurr = history[history.length - 1]
      ? history[history.length - 1].board
      : board;

    if (isPlayer && idPlayerCurr === userID && boardCurr[index] === null) {
      console.log("Move");

      realtime.makeMove(index);
      return true;
    }

    return false;
  };

  const _checkPassword = (passwordInput) => {
    if (passwordInput !== password) {
      setErrorCheckPassword("Invalid Password");
    }
    setOpenDialogPassword(passwordInput !== password);
  };

  useEffect(() => {
    turnOnLoading();
    (async () => {
      try {
        const { success, message, data } = await apiService.getRoom(idRoom);

        console.log("DATA GET ROOM HEHE:", data);

        if (success) {
          const { room } = data;
          setIsPlayer(room.becomePlayer);
          realtime.joinRoom(room.id);
          localStorage.setItem("room", room.id);

          realtime.updateInfoUserInRoom(
            room.id,
            room.player1,
            room.player2 || {
              username: "...",
              id: "...",
              avatarUrl:
                "https://res.cloudinary.com/dofdj0lqd/image/upload/v1610186880/aqutfu6ccnjdqo9vd3zb.png",
            }
          );

          setHistory(room.history);
          setPlayer1(room.player1);
          setPlayer2(
            room.player2 || {
              username: "...",
              id: "...",
              avatarUrl:
                "https://res.cloudinary.com/dofdj0lqd/image/upload/v1610186880/aqutfu6ccnjdqo9vd3zb.png",
            }
          );
          setStatusRoom(room.status);
          setRole(room.role);
          setOpenDialogPassword(
            room.role !== "admin" && room.password !== null
          );
          setPassword(room.password);
          setAvatarRoomOwner(room.player1.avatarUrl);

          if (room.idGame !== null) {
            console.log("RECONNECT");
            realtime.reconnectGame(idRoom, room.idGame);
          }
        } else {
          // console.log(message);
          historyRouter.push("/");
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
        open={openDialogPassword}
        onClose={setOpenDialogPassword}
        checkPassword={_checkPassword}
        error={errorCheckPassword}
      />

      {!openDialogPassword && (
        <Grid container className={classes.root}>
          <Grid container item xs={12} md={10}>
            <Grid item md={8} className={classes.board}>
              <div>
                <div
                  style={{
                    height: 30,
                    marginBottom: 2,
                    // background: "rgba(0,0,0,0)",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Room ID: {idRoom}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div>Room Owner </div>
                    <Tooltip
                      title={`${player1.username} - ${player1.id}`}
                      TransitionComponent={Zoom}
                      arrow
                    >
                      <img
                        style={{
                          width: 30,
                          height: 30,
                          background: "pink",
                          borderRadius: "50%",
                          marginLeft: 10,
                        }}
                        src={`${avatarRoomOwner}`}
                      />
                    </Tooltip>
                  </div>
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
      )}
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
