import React, { useState, useEffect } from "react";
import Cup from "../../assert/img/cup.png";
import Rank from "../../assert/img/ranking.png";
import useStyle from "./styleProfile";
import { Radar } from "react-chartjs-2";
import action from "../../storage/action";
import { connect } from "react-redux";
import apiService from "./apiService";

const ProfilePlayer = ({ turnOnLoading, turnOffLoading }) => {
  const classes = useStyle();

  // States
  const [avatarUrl, setAvatarUrl] = useState(
    "https://res.cloudinary.com/dofdj0lqd/image/upload/v1610186880/aqutfu6ccnjdqo9vd3zb.png"
  );
  const [draw, setDraw] = useState(0);
  const [win, setWin] = useState(0);
  const [lose, setLose] = useState(0);
  const [totalGame, setTotalGame] = useState(0);
  const [email, setEmail] = useState("");
  const [id, setID] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [cup, setCup] = useState("0");
  const [totalUser, setTotalUser] = useState("0");
  const [rank, setRank] = useState("0");

  useEffect(() => {
    turnOnLoading();
    (async () => {
      const { success, data } = await apiService.getUser();
      if (success === true) {
        setTotalGame(data.totalGame);
        setWin(data.totalGameWin);
        setLose(data.totalGameLose);
        setDraw(data.totalGame - data.totalGameWin - data.totalGameLose);
        setEmail(data.email);
        setID(data.id);
        setFullname(data.fullname);
        setCup(data.cup);
        setTotalUser(data.totalUser);
        setRank(data.rank);
        setAvatarUrl(data.avatarUrl);
        setUsername(data.username);
      }
      turnOffLoading();
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: "20px 0px", display: "flex" }}>
      <div style={{ width: "50%" }}>
        <div style={{ display: "flex", alignItems: "center", color: "white" }}>
          <img alt="img" className={classes.avatar} src={avatarUrl} />
          <div style={{ width: "100%", marginRight: 10 }}>
            <div className={classes.username}>{username}</div>
            <div className={classes.infoBasic}>
              <div className={classes.titleInfoBasic}>ID:</div>
              <div className={classes.valueInfoBasic}>{id}</div>
            </div>
            <div className={classes.infoBasic}>
              <div className={classes.titleInfoBasic}>FullName:</div>
              <div className={classes.valueInfoBasic}>{fullname}</div>
            </div>
            <div className={classes.infoBasic}>
              <div className={classes.titleInfoBasic}>Email:</div>
              <div className={classes.valueInfoBasic}>{email}</div>
            </div>
          </div>
        </div>

        <div className={classes.containerInfomation}>
          {/* Profile user */}
          <div style={{ width: "100%" }}>
            <div className={classes.containerIndexGameAndRateWin}>
              <div className={classes.indexTitle}>
                <div>Game:</div>
                <div className={classes.indexContentValue}>{totalGame}</div>
              </div>
              <div className={classes.indexTitle}>
                <div>Rate Win:</div>
                <div className={classes.indexContentValue}>
                  {Math.ceil(
                    (parseFloat(win) / parseFloat(totalGame)) * 100,
                    2
                  )}
                  %
                </div>
              </div>
            </div>

            {/* Infomation */}
            <div className={classes.containerDetailIndex}>
              <div className={classes.subsContainerDetailInfo}>
                <div className={classes.itemDetail}>
                  <div className={classes.itemDetailTitle}>Win</div>
                  <div className={classes.itemDetailValue}>
                    <div style={{ fontSize: "1.4rem" }}>{win}</div>
                    <div style={{ fontSize: "0.5rem" }}>game</div>
                  </div>
                </div>
                <div className={classes.itemDetail}>
                  <div className={classes.itemDetailTitle}>Draw</div>
                  <div className={classes.itemDetailValue}>
                    <div style={{ fontSize: "1.4rem" }}>{draw}</div>
                    <div style={{ fontSize: "0.5rem" }}>game</div>
                  </div>
                </div>
                <div className={classes.itemDetail}>
                  <div className={classes.itemDetailTitle}>Lose</div>
                  <div className={classes.itemDetailValue}>
                    <div style={{ fontSize: "1.4rem" }}>{lose}</div>
                    <div style={{ fontSize: "0.5rem" }}>game</div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: "50%",
                  margin: 10,
                }}
              >
                <div className={classes.itemDetail}>
                  <div className={classes.itemDetailTitle}>
                    <img
                      alt="rank"
                      src={Rank}
                      style={{ width: 50, height: 50 }}
                    />
                  </div>
                  <div className={classes.itemDetailValue}>
                    <div style={{ fontSize: "1.4rem", color: "yellow" }}>
                      {rank}
                    </div>
                    <div style={{ fontSize: "0.5rem" }}>/{totalUser}</div>
                  </div>
                </div>
                <div className={classes.itemDetail}>
                  <div className={classes.itemDetailTitle}>
                    <img
                      alt="cup"
                      src={Cup}
                      style={{ width: 50, height: 50 }}
                    />
                  </div>
                  <div className={classes.itemDetailValue}>
                    <div style={{ fontSize: "1.4rem", color: "yellow" }}>
                      {cup} cup
                    </div>
                    <div style={{ fontSize: "0.5rem" }}>/{totalGame} game</div>
                  </div>
                </div>
                <div className={classes.itemDetail}>
                  <div className={classes.itemDetailTitle}>
                    <img
                      alt="cup"
                      src={Cup}
                      style={{ width: 50, height: 50 }}
                    />
                  </div>
                  <div className={classes.itemDetailValue}>
                    <div style={{ fontSize: "1.4rem", color: "yellow" }}>
                      10
                    </div>
                    <div style={{ fontSize: "0.5rem" }}>/10</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.containerChart}>
        <Radar
          width={"20%"}
          height={"20%"}
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
                data: [
                  Math.floor((win / totalGame) * 100),
                  Math.floor((lose / totalGame) * 100),
                  Math.floor((draw / totalGame) * 100),
                ],
                backgroundColor: "rgba(255,99,132,0.2)",
                label: "You",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 2,
              },
            ],
          }}
        />
      </div>
    </div>
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

export default connect(() => ({}), mapDispatchToProps)(ProfilePlayer);
