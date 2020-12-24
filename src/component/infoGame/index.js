import { Button } from "@material-ui/core";
import React from "react";
import Chat from "../chat";
import useStyles from "./style";

const InfoGame = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.status}>STATUS</div>
      <div className={classes.playerContainer}>
        <div className={classes.playerContent}>
          <div className={classes.playerTitle}>Player1 - X</div>
          <div className={classes.in4Player}>
            <div>baobao</div>
            <div style={{ fontSize: "0.7rem" }}>id: 12345</div>
          </div>
          <div className={classes.timmer}>05:00</div>
        </div>
        <div className={classes.playerContent}>
          <div className={classes.playerTitle}>Player2 - O</div>
          <div
            className={classes.in4Player}
            style={{
              backgroundColor: "rgba(255,255,255,0.3)",
            }}
          >
            <div>phanbao_091jaa</div>
            <div style={{ fontSize: "0.7rem" }}>id: 38384ns</div>
          </div>
          <div className={classes.timmer}>05:00</div>
        </div>
      </div>

      <div className={classes.historyContainer}>
        <div className={classes.historyTitle}>HISTORY</div>
        <div className={classes.historyContent}>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              margin: "5px 0",
            }}
          >
            1
          </div>
        </div>
      </div>

      <div className={classes.containerButton}>
        <Button className={classes.button}>Exit</Button>
        <Button className={classes.button}>Exit</Button>
        <Button className={classes.button}>Start</Button>
        <Button className={classes.button}>Start</Button>
      </div>
      <Chat />
    </div>
  );
};

export default InfoGame;
