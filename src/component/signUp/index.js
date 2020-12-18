import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import signUp from "./services";
import useStyles from "./styles";
import { connect } from "react-redux";

const SignUpForm = ({ token }) => {
  // Styles
  const classes = useStyles();
  const history = useHistory();

  // States
  const [isLoad, setIsLoad] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  // Setup
  const handleSubmitForm = (e) => {
    e.preventDefault();

    // Check
    if (!fullName || !email || !password) {
      alert("Please fill all!");
      return;
    }

    setIsLoad(true);

    (async () => {
      try {
        const { success, message } = await signUp({
          email,
          fullName,
          password,
        });
        setIsLoad(false);

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
        setIsLoad(false);
        alert("Can't connect server!");
      }
    })();
  };

  const handleChangeEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleChangeFullName = (e) => {
    const { value } = e.target;
    setFullName(value);
  };

  const handleChangePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/");
    }
  }, []);

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
          <form className={classes.form} noValidate onSubmit={handleSubmitForm}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              autoComplete="fullName"
              autoFocus
              onChange={handleChangeFullName}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email Address"
              type="email"
              onChange={handleChangeEmail}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChangePassword}
            />
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

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
