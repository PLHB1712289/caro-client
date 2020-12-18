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
import { useHistory } from "react-router-dom";
import { ReactComponent as FacebookIcon } from "../../assert/svg-icon/facebook-icon.svg";
import { ReactComponent as GoogleIcon } from "../../assert/svg-icon/google-icon.svg";
import config from "../../config";
import apiService from "./apiService";
import useStyles from "./style";
import action from "../../storage/action";
import { connect } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SignIn = ({
  open,
  onClose,
  onSignInSuccess,
  turnOnLoading,
  turnOffLoading,
}) => {
  // React router hook
  const history = useHistory();

  // Style
  const classes = useStyles();

  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle event change input form
  const _handleChangeEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const _handleChangePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  // handle event submit form
  const _handleSubmitForm = async (e) => {
    e.preventDefault();
    turnOnLoading();
    const { success, message, token } = await apiService.signIn(
      email,
      password
    );

    if (success) {
      localStorage.setItem("token", token);
      onSignInSuccess(token);
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

    // request to server
    const { success, message, token } = await apiService.signInWithFB(
      id,
      accessToken
    );
    turnOffLoading();
    if (success) {
      localStorage.setItem("token", token);
      onSignInSuccess(token);
      onClose();
      turnOffLoading();
      return;
    }

    turnOffLoading();
    alert(message);
  };

  // callback GG
  const _callbackGG = async (response) => {
    turnOnLoading();

    // get accessToken
    const { tokenId, accessToken } = response;

    // request to server
    const { success, message, token } = await apiService.signInWithGG(
      tokenId,
      accessToken
    );

    if (success) {
      localStorage.setItem("token", token);
      onSignInSuccess(token);
      onClose();
      turnOffLoading();
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
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={_handleChangeEmail}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
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
                      onClick={renderProps.onClick}
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
});

export default connect(() => {}, mapDispatchToProps)(SignIn);
