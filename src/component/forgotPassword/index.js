import { Button, Container, CssBaseline, TextField } from "@material-ui/core";
import React, { useState } from "react";
import apiService from "../profile/apiService";
import useStyles from "./style";
import action from "../../storage/action";
import { connect } from "react-redux";

const ForgotPassword = ({ turnOnLoading, turnOffLoading }) => {
  // Styles
  const classes = useStyles();

  // States

  const [email, setEmail] = useState(null);
  const [errorEmail] = useState(null);

  //handle
  const _handleChangeEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  };
  const _handleSubmitForm = async (e) => {
    e.preventDefault();
    turnOnLoading();

    if (email !== null) {
      const { message } = await apiService.forgotPassword(email);
      alert(message);
    }
    turnOffLoading();

  };
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container
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
          <h1>Forget Password</h1>
          <form
            className={classes.form}
            noValidate
            onSubmit={_handleSubmitForm}
          >
            {errorEmail === null ? (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email"
                autoFocus
                value={email}
                onChange={_handleChangeEmail}
              />
            ) : (
              <TextField
                error
                autoFocus
                fullWidth
                variant="outlined"
                margin="normal"
                label="Email"
                value={email}
                onChange={_handleChangeEmail}
                helperText={errorEmail}
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Send Mail
            </Button>
          </form>
        </div>
      </Container>
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
export default connect(() => ({}), mapDispatchToProps)(ForgotPassword);
