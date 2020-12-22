import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ReactComponent as FacebookIcon } from "../../assert/svg-icon/facebook-icon.svg";
import { ReactComponent as GoogleIcon } from "../../assert/svg-icon/google-icon.svg";
import config from "../../config";
import realtime from "../../realtime";
import action from "../../storage/action";
import apiService from "./apiService";
import useStyles from "./style";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SignIn = ({ open, onClose, setToken, turnOnLoading, turnOffLoading }) => {
  // React router hook
  const history = useHistory();

  // Style
  const classes = useStyles();

  // State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // handle event change input form
  const _handleChangeUsername = (e) => {
    const { value } = e.target;
    setUsername(value);
  };

  const _handleChangePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  // handle event submit form
  const _handleSubmitForm = async (e) => {
    e.preventDefault();
    turnOnLoading();

    const { success, message, data } = await apiService.signIn(
      username,
      password
    );

    if (success) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      realtime.updateListUserOnline(data.token);
      onClose();
      turnOffLoading();
      return;
    }
    turnOffLoading();
    alert(message);
  };

  // handle click
  const _handleOnClickSignUp = () => {
    onClose();
    history.push("/sign-up");
  };
  const _handleOnClickForgotPassword = () => {
    onClose();
    history.push("/forgot-password");
  };

  // callback FB
  const _callbackFB = async (response) => {
    turnOnLoading();

    // get accessToken
    const { id, accessToken } = response;

    try {
      // request to server
      const { success, message, data } = await apiService.signInWithFB(
        id,
        accessToken
      );

      if (success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        onClose();
        turnOffLoading();
        realtime.updateListUserOnline(data.token);
        return;
      }

      alert(message);
    } catch (e) {
      alert("Cannot connect to server");
    }
    turnOffLoading();
  };

  // callback GG
  const _callbackGG = async (response) => {
    turnOnLoading();

    // get accessToken
    const { tokenId, accessToken } = response;

    // request to server
    const { success, message, data } = await apiService.signInWithGG(
      tokenId,
      accessToken
    );

    if (success) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      onClose();
      turnOffLoading();
      realtime.updateListUserOnline(data.token);
      return;
    }

    turnOffLoading();
    alert(message);
  };

  const _callbackGGFailed = async (response) => {
    alert(response.details);
  };

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
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={_handleSubmitForm}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  autoFocus
                  value={username}
                  onChange={_handleChangeUsername}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={_handleChangePassword}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      variant="body2"
                      onClick={_handleOnClickForgotPassword}
                      style={{ cursor: "pointer" }}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      variant="body2"
                      onClick={() => {
                        _handleOnClickSignUp();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <div
                  style={{
                    marginTop: 20,
                    fontSize: "1rem",
                    textAlign: "center",
                  }}
                >
                  or connect with
                </div>

                <FacebookLogin
                  appId={config.FB_APP_ID}
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={_callbackFB}
                  render={(renderProps) => (
                    <IconButton
                      className={classes.socialLoginFB}
                      onClick={() => {
                        turnOnLoading();
                        renderProps.onClick();
                      }}
                    >
                      <div
                        style={{
                          width: 25,
                          height: 25,
                        }}
                      >
                        <FacebookIcon />
                      </div>
                      <span className={classes.titleSocialLogin}>
                        Sign in with Facebook
                      </span>
                    </IconButton>
                  )}
                />

                <GoogleLogin
                  clientId={config.GG_APP_ID}
                  render={(renderProps) => (
                    <IconButton
                      className={classes.socialLoginFB}
                      onClick={renderProps.onClick}
                    >
                      <div
                        style={{
                          width: 25,
                          height: 25,
                          textAlign: "center",
                        }}
                      >
                        <GoogleIcon />
                      </div>

                      <span className={classes.titleSocialLogin}>
                        Sign in with Google
                      </span>
                    </IconButton>
                  )}
                  onSuccess={_callbackGG}
                  onFailure={_callbackGGFailed}
                />
              </form>
            </div>
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

export default connect(() => ({}), mapDispatchToProps)(SignIn);
