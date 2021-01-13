import {
  Container,
  CssBaseline,
  Grid,
  Typography,
  Paper,
  Tabs,
  Tab,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import apiService from "./apiService";
import useStyles from "./style";
import action from "../../storage/action";
import { connect } from "react-redux";
import ProfilePlayer from "./profilePlayer";
import HistoryGame from "./historyGame";
import UpdateProfile from "../updateProfile";
import ChangePassword from "../changePassword";

const Profile = ({ turnOnLoading, turnOffLoading, currentTab }) => {
  // Styles
  const classes = useStyles();

  // States
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://res.cloudinary.com/dofdj0lqd/image/upload/v1610186880/aqutfu6ccnjdqo9vd3zb.png"
  );
  const [draw, setDraw] = useState(0);
  const [win, setWin] = useState(0);
  const [lose, setLose] = useState(0);
  const [totalGame, setTotalGame] = useState(0);
  const [series, setSeries] = useState([]);
  const [options] = useState({
    labels: ["Win", "Lose", "Draw"],
    colors: ["#00FF00", "#FF0000", "#3F51B5"],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              color: "black",
            },
            value: {
              color: "black",
            },
          },
        },
      },
    },
  });

  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (user === null) {
      turnOnLoading();
      const getUser = async () => {
        const { success, data } = await apiService.getUser();
        if (success === true && data !== user) {
          setUser(data);

          setWin(data.totalGameWin);
          setLose(data.totalGameLose);
          setTotalGame(data.totalGame);
          setDraw(data.totalGame - data.totalGameLose - data.totalGameWin);
          if (data.avatarUrl !== null) {
            setAvatarUrl(data.avatarUrl);
          }
        }
        turnOffLoading();
      };
      getUser();
    }

    if (user !== null && series.length === 0) {
      //set for chart
      let temp = [];

      temp.push(user.totalGameWin);
      temp.push(user.totalGameLose);
      temp.push(user.totalGame - user.totalGameWin - user.totalGameLose);

      setSeries(temp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, series]);

  let containerProfile = <ProfilePlayer />;

  switch (tab) {
    case 0:
      containerProfile = <ProfilePlayer />;
      break;

    case 1:
      containerProfile = <HistoryGame />;
      break;

    case 2:
      containerProfile = <UpdateProfile />;
      break;

    case 3:
      containerProfile = <ChangePassword />;
      break;

    default:
      containerProfile = <ProfilePlayer />;
      break;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        Width: "100vw",
        alignItems: "center",
      }}
    >
      <div style={{ width: "70%" }}>
        <Paper square style={{ background: "rgba(0,0,0,0)" }}>
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={(e, newValue) => setTab(newValue)}
            aria-label="tab"
            centered
          >
            <Tab
              label="Profile Player"
              fullWidth
              style={{ color: "white", fontWeight: 600 }}
            />
            <Tab
              label="History game"
              fullWidth
              style={{ color: "white", fontWeight: 600 }}
            />
            <Tab
              label="Edit Infomation"
              fullWidth
              style={{ color: "white", fontWeight: 600 }}
            />
            <Tab
              label="Change Password"
              fullWidth
              style={{ color: "white", fontWeight: 600 }}
            />
          </Tabs>
        </Paper>
        {/* {tab === 0 ? <ProfilePlayer /> : <HistoryGame />} */}
        {containerProfile}
        {/* <Container
        component="main"
        maxWidth="xs"
        style={{
          border: "1px solid white",
          alignSelf: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255,255,255,0.9)",
        }}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <h1>Profile</h1>
          <img src={avatarUrl} style={{width:200,height:200,borderRadius:100}}></img>

          <form className={classes.form} noValidate>
            {user !== null ? (
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <Typography variant="h6">Username:</Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="h6" style={{wordWrap: "break-word"}}>{user.username}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="h6">Fullname:</Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="h6" style={{wordWrap: "break-word"}}>{user.fullname}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="h6">Email:</Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="h6" style={{wordWrap: "break-word"}}>{user.email}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="h6">Total game:</Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="h6">{totalGame}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="h6">Win:</Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="h6">{win}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="h6">Lose:</Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="h6">{lose}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="h6">Draw:</Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="h6">{draw}</Typography>
                </Grid>
                {series.length > 0 ? (
                  <div>
                    <Grid item xs={12}>
                      <Chart
                        options={options}
                        series={series}
                        type="donut"
                        width="330px"
                      />
                    </Grid>
                  </div>
                ) : (
                  <div></div>
                )}
              </Grid>
            ) : (
              <div></div>
            )}
          </form>
        </div>
      </Container> */}
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

export default connect(() => ({}), mapDispatchToProps)(Profile);
