import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import "../../index.css";
import Board from "../board";
import InfoGame from "../infoGame";

const Game = ({ socket }) => {
  const match = useRouteMatch();
  const { id: idGame } = match.params;

  const [statusGame, setStatusGame] = useState({
    start: "",
    player1: "",
    player2: "",
  });

  useEffect(() => {}, []);

  return (
    <Grid
      container
      style={{
        justifyContent: "center",
        fontSize: "1rem",
      }}
    >
      <Grid container item xs={12} md={10}>
        <Grid item md={8} style={{ justifyContent: "center" }}>
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
