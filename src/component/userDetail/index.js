import { CssBaseline, Grid, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import action from "../../storage/action";
import apiService from "../profile/apiService";
import useStyles from "./style";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserDetail = ({
  open,
  onClose,
  setToken,
  turnOnLoading,
  turnOffLoading,
  userId,
}) => {
  console.log("Check user id:", userId);
  // React router hook
  const history = useHistory();

  // Style
  const classes = useStyles();

  // States
  const [user, setUser] = useState(null);
  const [winRate, setWinRate] = useState(null);
  useEffect(() => {
    if (user === null) {
      turnOnLoading();
      const getUser = async () => {
        const { success, message, data } = await apiService.getUserById(userId);
        if (success === true && data !== user) {
          setUser(data);
          if (data.totalGame !== 0) {
            const win = (data.totalGameWin / data.totalGame) * 100 + "";

            setWinRate(win + "%");
          } else {
            setWinRate(0);
          }
        }
        console.log("Check user:", data);
        turnOffLoading();
      };
      getUser();
    }
  });

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            {user !== null ? (
              <div className={classes.paper}>
                <img
                  src={user.avatarUrl}
                  style={{ width: 200, height: 200, borderRadius: 100 }}
                  alt=""
                />

                <form className={classes.form} noValidate>
                  <Grid container spacing={3}>
                    <Grid item xs={5}>
                      <Typography variant="h6">Fullname:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography
                        variant="h6"
                        style={{ wordWrap: "break-word" }}
                      >
                        {user.fullname}
                      </Typography>
                    </Grid>

                    <Grid item xs={5}>
                      <Typography variant="h6">Started Date:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography
                        variant="h6"
                        style={{ wordWrap: "break-word" }}
                      >
                        {user.createdDate}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="h6">Total game:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="h6">{user.totalGame}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="h6">Win Rate:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="h6">{winRate}</Typography>
                    </Grid>
                  </Grid>
                </form>
              </div>
            ) : (
              <div></div>
            )}
          </Grid>
        </DialogContent>
      </Dialog>
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

  setToken: (token) => {
    dispatch(action.TOKEN.update(token));
  },
});

export default connect(() => ({}), mapDispatchToProps)(UserDetail);
