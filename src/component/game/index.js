import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import "../../index.css";
import Board from "../board";
import InfoGame from "../infoGame";
import useStyles from "./style";

const Game = ({ socket }) => {
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

  useEffect(() => {}, []);

  return (
    <Grid container className={classes.root}>
      <Grid container item xs={12} md={10}>
        <Grid item md={8} className={classes.board}>
          <Board />
        </Grid>
        <Grid container item md={4} style={{ justifyContent: "center" }}>
          <InfoGame />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Game;
