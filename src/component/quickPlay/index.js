import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { ReactComponent as Close } from "../../assert/svg-icon/close.svg";
import { ReactComponent as Find } from "../../assert/svg-icon/find.svg";
import { ReactComponent as Star } from "../../assert/svg-icon/star.svg";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import realtime from "../../realtime";
import TAG from "../../realtime/data";

import { BoxLoading } from "react-loadingg";

import { Radar } from "react-chartjs-2";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({ open, setOpen }) {
  const history = useHistory();

  const [find, setFind] = useState(false);
  const [player, setPlayer] = useState(null);
  const [timmer, setTimmer] = useState(5);
  const [idRoom, setIdRoom] = useState(null);
  const [, setPlayerAdmin] = useState(null);

  const [radarData, setRadarData] = useState({
    player: [0, 0, 0],
    you: [0, 0, 0],
  });

  const handleClose = () => {
    setOpen(false);
  };

  if (timmer === 0) {
    history.push(`/game/${idRoom}`);
  }

  useEffect(() => {
    // setup call back
    realtime.setCallback(
      TAG.RESPONSE_QUICK_PLAY,
      ({ player, radar, idRoom, playerAdmin }) => {
        console.log("JOIN ROOM");
        setPlayer(player);
        setIdRoom(idRoom);
        setPlayerAdmin(playerAdmin);

        setRadarData({
          player: [radar.player.win, radar.player.lose, radar.player.draw],
          you: [radar.you.win, radar.you.lose, radar.you.draw],
        });
      }
    );

    realtime.setCallback(TAG.RESPONSE_READY_TO_QUICK_PLAY, ({ timmer }) => {
      setTimmer(timmer);
    });

    return () => {
      realtime.removeCallback(TAG.RESPONSE_QUICK_PLAY);
      realtime.removeCallback(TAG.RESPONSE_READY_TO_QUICK_PLAY);
    };
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {/* <div style={{ background: "rgba(2,13,24,0.85)", color: "white" }}> */}
        <div style={{ background: "rgba(2,13,24,0.85)", color: "white" }}>
          <DialogTitle
            // id="alert-dialog-slide-title"
            style={{
              height: 50,
              minWidth: 350,
              textAlign: "center",
              background: "rgba(2,13,24,0.2)",
              alignItems: "center",
              padding: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ fontWeight: 1000 }}>Quick Play</div>
            {!find && (
              <IconButton
                style={{
                  position: "absolute",
                  top: 4,
                  right: 0,
                  borderRadius: 4,
                }}
                onClick={handleClose}
              >
                <Close
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            )}
          </DialogTitle>
          <DialogContent
            style={{
              textAlign: "center",
            }}
          >
            <DialogContentText
              id="alert-dialog-slide-description"
              style={{
                minHeight: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {find && player === null && (
                <div>
                  <BoxLoading />
                  <div
                    style={{ color: "white", fontWeight: 600, marginTop: 100 }}
                  >
                    Please wait...
                  </div>
                </div>
              )}

              {!find && player === null && (
                <div>
                  <Find style={{ width: 50, height: 50 }} />
                  <div style={{ color: "white" }}>Find another player </div>
                </div>
              )}

              {player !== null && (
                <div>
                  <div
                    style={{
                      background: "white",
                      marginBottom: 10,
                      minHeight: 50,
                      borderRadius: 10,
                      padding: 10,
                    }}
                  >
                    <div>
                      <Star style={{ width: 30, height: 30 }} />
                      <Star style={{ width: 30, height: 30 }} />
                      <Star style={{ width: 30, height: 30 }} />
                    </div>
                    <div style={{ fontSize: "1.2rem", fontWeight: 800 }}>
                      {player}
                    </div>
                    <div style={{ fontSize: "0.8rem" }}>
                      Join room after...{timmer}
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(255,255,255,1)",
                      borderRadius: 10,
                      width: "400px",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        margin: "10px 0",
                      }}
                    >
                      PROFILE PLAYER
                    </div>

                    <Radar
                      width={"30%"}
                      height={"30%"}
                      options={{
                        scale: {
                          angleLines: {
                            display: false,
                          },
                          ticks: {
                            suggestedMin: 30,
                            suggestedMax: 100,
                          },
                        },
                        legend: {
                          labels: {
                            // This more specific font property overrides the global property
                            fontColor: "black",
                            fontSize: 15,
                          },
                          // fullWidth: true,
                        },
                        layout: {
                          padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                          },
                          width: 100,
                          height: 100,
                        },
                      }}
                      data={{
                        labels: ["Win", "Lose", "Draw"],
                        datasets: [
                          {
                            data: radarData.you,
                            backgroundColor: "rgba(255,99,132,0.2)",
                            label: "You",
                            borderColor: "rgba(255,99,132,1)",
                            borderWidth: 2,
                          },
                          {
                            data: radarData.player,
                            backgroundColor: "rgba(93,149,241,0.2)",
                            label: player,
                            borderColor: "rgba(93,149,241,1)",
                            borderWidth: 2,
                          },
                        ],
                      }}
                    />
                  </div>
                </div>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ display: "flex", justifyContent: "center" }}>
            {player === null ? (
              <Button
                onClick={() => {
                  setFind((prev) => !prev);
                  if (!find) realtime.quickPlay();
                  else realtime.cancelQuickPlay();
                }}
                style={{
                  background: `${!find ? "#00adff" : "#ff0000c9"}`,
                  color: "white",
                  fontWeight: 600,
                  width: 100,
                }}
              >
                {!find ? "Find" : "Cancle"}
              </Button>
            ) : (
              <></>
            )}
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
