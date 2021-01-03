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

const size = 20;

const Game = ({ userID, turnOnLoading, turnOffLoading }) => {
  // style
  const classes = useStyles();

  // react-router hook
  const match = useRouteMatch();

  // params
  const { id: idRoom } = match.params;

  // states
  const [open, setOpen] = useState(false);

  const [player1, setPlayer1] = useState({ username: "...", id: "..." });
  const [player2, setPlayer2] = useState({ username: "...", id: "..." });
  const [isPlayer, setIsPlayer] = useState(false);
  const [statusRoom, setStatusRoom] = useState("");
  const [role, setRole] = useState("player");
  const [isPlayerX, setIsPlayerX] = useState(null);
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

        setBoard(Array(size * size).fill(null));

        if (userID === playerX) {
          setIsPlayerX(true);
        } else if (userID === playerO) {
          setIsPlayerX(false);
        }
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
    });

    realtime.setCallback(
      TAG.RESPONSE_RECONNECT,
      ({ board, playerX, playerO, currentPlayer }) => {
        setBoard(board);
        setIsPlayerX(playerX === userID ? true : false);
        setIdPlayerCurr(currentPlayer);
      }
    );

    realtime.setCallback(TAG.RESPONSE_MOVE, ({ index, board, isPlayerX }) => {
      setBoard(board);
    });

    realtime.setCallback(TAG.RESPONSE_WINNER, ({ winner }) => {
      setWinner(winner);
    });

    return () => {
      realtime.removeCallback(TAG.RESPONSE_UPDATE_USER_IN_ROOM);
      realtime.removeCallback(TAG.RESPONSE_UPDATE_STATUS_ROOM_FOR_PLAYER);
      realtime.removeCallback(TAG.RESPONSE_INFO_PLAYER_XO);
      realtime.removeCallback(TAG.RESPONSE_TIMMER);
      realtime.removeCallback(TAG.RESPONSE_TIME_UP);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _handleClickCell = (index) => {
    if (isPlayer && idPlayerCurr === userID) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const winnerStatus = isPlayer
    ? winner === userID
      ? "You is winner"
      : "You is loser"
    : winner === player1.id
    ? "Player1 is winner"
    : "Player2 is winner";

  return (
    <>
      {/* {statusRoom} */}
      {winnerStatus}
      <PasswordRoom isOpen={open} onClose={setOpen} />
      <Grid container className={classes.root}>
        <Grid container item xs={12} md={10}>
          <Grid item md={8} className={classes.board}>
            <Board board={board} onClickCell={_handleClickCell} />
          </Grid>
          <Grid container item md={4} style={{ justifyContent: "center" }}>
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
              isPlayerX={isPlayerX}
              userID={userID}
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
