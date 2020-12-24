import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import "../../index.css";
import Board from "../board";
import InfoGame from "../infoGame";
import useStyles from "./style";
import apiService from "./apiService";
import { connect } from "react-redux";
import action from "../../storage/action";
import PasswordRoom from "../passwordRoom";
import realtime from "../../realtime";

const Game = ({ turnOnLoading, turnOffLoading }) => {
  // style
  const classes = useStyles();

  // react-router hook
  const match = useRouteMatch();

  // params
  const { id: idGame } = match.params;

  // states
  const [statusGame, setStatusGame] = useState({
    start: "",
    player1: "",
    player2: "",
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const room = localStorage.getItem("room");
    if (room) {
      realtime.leaveRoom(room);
      localStorage.removeItem("room");
    }
  }, []);

  useEffect(() => {
    turnOnLoading();
    (async () => {
      try {
        const { success, message, data } = await apiService.getRoom(idGame);

        // if (data.room.password) {
        //   setOpen(true);
        // }

        if (success) {
          const { room } = data;
          if (room.becomePlayer === true) {
            realtime.joinRoom(room.id);
            localStorage.setItem("room", room.id);
          }
        }
      } catch (e) {
        console.log("[ERROR]:", e.message);
      }
      turnOffLoading();
    })();
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
            <InfoGame data={statusGame} />
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
