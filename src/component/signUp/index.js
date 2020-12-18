import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import action from "../../storage/action";
import signUp from "./services";
import useStyles from "./styles";

const SignUpForm = ({ token, turnOnLoading, turnOffLoading }) => {
  // Styles
  const classes = useStyles();
  const history = useHistory();

  // States
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  // Setup
  const _handleSubmitForm = (e) => {
    e.preventDefault();

    // Check
    if (!username || !email || !password) {
      setUsername(username ? username : "");
      setEmail(email ? email : "");
      setPassword(password ? password : "");
      return;
    }

    turnOnLoading();

    (async () => {
      try {
        const { success, message } = await signUp({
          email,
          username,
          password,
        });
        turnOffLoading();

        if (success) {
          const redirectSignIn = window.confirm(
            `${message}. Do you want to redirect signin?`
          );
          if (redirectSignIn) {
            history.push(`/login`);
          }
        } else {
          alert(message);
        }
      } catch (e) {
        turnOffLoading();
        alert("Can't connect server!");
      }
    })();
  };

  const _handleChangeEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const _handleChangeUsername = (e) => {
    const { value } = e.target;
    setUsername(value);
  };

  const _handleChangePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/");
    }
  }, [history]);

  (() => {
    if (token) history.push("/");
  })();

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        style={{
          border: "1px solid gray",
          alignSelf: "center",
          borderRadius: 10,
          justifyContent: "center",
          backgroundColor: "rgba(255,255,255,0.9)",
        }}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={_handleSubmitForm}
          >
            {username === null || username.length > 0 ? (
              <TextField
                autoFocus
                fullWidth
                variant="outlined"
                margin="normal"
                label="Username"
                onChange={_handleChangeUsername}
              />
            ) : (
              <TextField
                error
                autoFocus
                fullWidth
                variant="outlined"
                margin="normal"
                label="Username"
                onChange={_handleChangeUsername}
                helperText="Please fill username"
              />
            )}

            {email === null || email.length > 0 ? (
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email Address"
                type="email"
                onChange={_handleChangeEmail}
              />
            ) : (
              <TextField
                error
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email Address"
                type="email"
                onChange={_handleChangeEmail}
                helperText="Please fill email"
              />
            )}

            {password === null || password.length > 0 ? (
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                onChange={_handleChangePassword}
              />
            ) : (
              <TextField
                error
                variant="outlined"
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                onChange={_handleChangePassword}
                helperText="Please fill password"
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  turnOnLoading: () => {
    dispatch(action.LOADING.turnOn());
  },

  turnOffLoading: () => {
    dispatch(action.LOADING.turnOff());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
