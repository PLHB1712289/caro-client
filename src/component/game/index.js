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

const Game = ({ turnOnLoading, turnOffLoading }) => {
  // style
  const classes = useStyles();

  // react-router hook
  const match = useRouteMatch();

  // params
  const { id: idRoom } = match.params;

  // states
  const [player1, setPlayer1] = useState({ username: "...", id: "..." });
  const [player2, setPlayer2] = useState({ username: "...", id: "..." });
  const [open, setOpen] = useState(false);
  const [isPlayer, setIsPlayer] = useState(false);

  useEffect(() => {
    const room = localStorage.getItem("room");
    if (room) {
      realtime.leaveRoom(room);
      localStorage.removeItem("room");
    }

    realtime.setCallback(
      TAG.RESPONSE_UPDATE_USER_IN_ROOM,
      ({ idUser, idPlayer, username }) => {
        if (idPlayer === 1) setPlayer1({ username, id: idUser });
        else setPlayer2({ username, id: idUser });
      }
    );
  }, []);

  useEffect(() => {
    turnOnLoading();
    (async () => {
      try {
        const { success, message, data } = await apiService.getRoom(idRoom);

        // if (data.room.password) {
        //   setOpen(true);
        // }

        if (success) {
          const { room } = data;
          setIsPlayer(room.becomePlayer);
          realtime.joinRoom(room.id);
          localStorage.setItem("room", room.id);

          if (room.isPlayer > 0) {
            if (room.isPlayer === 1) {
              realtime.updateInfoUserInRoom(
                room.id,
                room.isPlayer,
                room.player1.id,
                room.player1.username
              );
            } else {
              realtime.updateInfoUserInRoom(
                room.id,
                room.isPlayer,
                room.player2.id,
                room.player2.username
              );
            }
          }

          setPlayer1(room.player1);
          setPlayer2(
            room.player2 ? room.player2 : { username: "...", id: "..." }
          );
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

  return (
    <>
      <PasswordRoom isOpen={open} onClose={setOpen} />
      <Grid container className={classes.root}>
        <Grid container item xs={12} md={10}>
          <Grid item md={8} className={classes.board}>
            <Board />
          </Grid>
          <Grid container item md={4} style={{ justifyContent: "center" }}>
            <InfoGame
              isPlayer={isPlayer}
              idRoom={idRoom}
              player1={player1}
              player2={player2}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  turnOnLoading: () => {
    dispatch(action.LOADING.turnOn());
  },
  turnOffLoading: () => {
    dispatch(action.LOADING.turnOff());
  },
});

export default connect(() => ({}), mapDispatchToProps)(Game);
