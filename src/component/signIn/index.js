import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router-dom";
import { ReactComponent as FacebookIcon } from "../../assert/svg-icon/facebook-icon.svg";
import { ReactComponent as GoogleIcon } from "../../assert/svg-icon/google-icon.svg";
import config from "../../config";
import Progress from "../progress";
import useStyles from "./style";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const SignIn = () => {
  // Style
  const classes = useStyles();

  // React router hook
  const history = useHistory();

  // State
  const [isLoad, setIsLoad] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(false);

  // handle event change input form
  const handleChangeEmail = (e) => {
    const { value } = e.target;
    setEmail(value);

    if (isRememberMe) {
      localStorage.setItem("email", value);
    }
  };

  const handleChangePassword = (e) => {
    const { value } = e.target;
    setPassword(value);

    if (isRememberMe) {
      localStorage.setItem("password", value);
    }
  };

  const handleChangeRemeberMe = (e) => {
    const { checked } = e.target;

    setIsRememberMe(checked);

    if (checked) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  };

  // handle event submit form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    setIsLoad(true);

    setTimeout(() => {
      setIsLoad(false);
      history.push("/");
    }, 500);
  };

  // handle click
  const handleOnClickSignUp = () => {
    history.push("/sign-up");
  };
  const handleOnClickForgotPassword = () => {
    history.push("/forgot-password");
  };

  // handle component didmount
  useEffect(() => {
    if (!localStorage.getItem("email") && !localStorage.getItem("password"))
      return;

    setEmail(localStorage.getItem("email"));
    setPassword(localStorage.getItem("password"));
    setIsRememberMe(true);
  }, []);

  return (
    <Progress isDisplay={isLoad}>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              onSubmit={handleSubmitForm}
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
                onChange={handleChangeEmail}
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
                onChange={handleChangePassword}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                checked={isRememberMe}
                onChange={handleChangeRemeberMe}
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
                    onClick={handleOnClickForgotPassword}
                    style={{ cursor: "pointer" }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    variant="body2"
                    onClick={handleOnClickSignUp}
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
                callback={() => {
                  alert("FB login");
                }}
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
                onSuccess={(response) => {
                  alert("GG login success");
                  console.log(response);
                }}
                onFailure={() => {
                  alert("Login with GG failed");
                }}
                cookiePolicy={"single_host_origin"}
              />

              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </Progress>
  );
};

export default SignIn;
