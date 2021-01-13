import React from "react";
import Cup from "../../assert/img/cup.png";
import Rank from "../../assert/img/ranking.png";
import useStyle from "./styleProfile";
import { Radar } from "react-chartjs-2";

const ProfilePlayer = () => {
  const classes = useStyle();
  return (
    <div style={{ padding: "20px 0px", display: "flex" }}>
      <div style={{ width: "50%" }}>
        <div style={{ display: "flex", alignItems: "center", color: "white" }}>
          <img
            className={classes.avatar}
            src="https://instagram.fvca1-1.fna.fbcdn.net/v/t51.2885-19/s320x320/136791049_1030270517482250_5647993121982104893_n.jpg?_nc_ht=instagram.fvca1-1.fna.fbcdn.net&_nc_ohc=1V_U-D9VDeQAX9Vv7Nr&tp=1&oh=4ecc30f8f9da0c28750cc71b5b667f29&oe=6028F2AE"
          />
          <div style={{ width: "100%", marginRight: 10 }}>
            <div className={classes.username}>baobao_1234</div>
            <div className={classes.infoBasic}>
              <div className={classes.titleInfoBasic}>ID:</div>
              <div className={classes.valueInfoBasic}>12344</div>
            </div>
            <div className={classes.infoBasic}>
              <div className={classes.titleInfoBasic}> FullName:</div>
              <div className={classes.valueInfoBasic}>Phan Le Hoai Bao</div>
            </div>
            <div className={classes.infoBasic}>
              <div className={classes.titleInfoBasic}>Email:</div>
              <div className={classes.valueInfoBasic}>
                phanlehoaibaok10@gmail.com
              </div>
            </div>
          </div>
        </div>

        <div className={classes.containerInfomation}>
          {/* Profile user */}
          <div style={{ width: "100%" }}>
            <div className={classes.containerIndexGameAndRateWin}>
              <div className={classes.indexTitle}>
                <div>Game:</div>
                <div className={classes.indexContentValue}>1234</div>
              </div>
              <div className={classes.indexTitle}>
                <div>Rate Win:</div>
                <div className={classes.indexContentValue}>89%</div>
              </div>
            </div>

            {/* Infomation */}
            <div className={classes.containerDetailIndex}>
              <div className={classes.subsContainerDetailInfo}>
                <div className={classes.itemDetail}>
                  <div className={classes.itemDetailTitle}>Win</div>
                  <div className={classes.itemDetailValue}>
                    <div style={{ fontSize: "1.4rem" }}>10</div>
                    <div style={{ fontSize: "0.5rem" }}>game</div>
                  </div>
                </div>
                <div className={classes.itemDetail}>
                  <div className={classes.itemDetailTitle}>Draw</div>
                  <div className={classes.itemDetailValue}>
                    <div style={{ fontSize: "1.4rem" }}>10</div>
                    <div style={{ fontSize: "0.5rem" }}>game</div>
                  </div>
                </div>
                <div className={classes.itemDetail}>
                  <div className={classes.itemDetailTitle}>Lose</div>
                  <div className={classes.itemDetailValue}>
                    <div style={{ fontSize: "1.4rem" }}>10</div>
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
                    <img src={Rank} style={{ width: 50, height: 50 }} />
                  </div>
                  <div className={classes.itemDetailValue}>
                    <div style={{ fontSize: "1.4rem", color: "yellow" }}>
                      10
                    </div>
                    <div style={{ fontSize: "0.5rem" }}>/10</div>
                  </div>
                </div>
                <div className={classes.itemDetail}>
                  <div className={classes.itemDetailTitle}>
                    <img src={Cup} style={{ width: 50, height: 50 }} />
                  </div>
                  <div className={classes.itemDetailValue}>
                    <div style={{ fontSize: "1.4rem", color: "yellow" }}>
                      10
                    </div>
                    <div style={{ fontSize: "0.5rem" }}>cup</div>
                  </div>
                </div>
                <div className={classes.itemDetail}>
                  <div className={classes.itemDetailTitle}>
                    <img src={Cup} style={{ width: 50, height: 50 }} />
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
                data: [50, 50, 50],
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

export default ProfilePlayer;
