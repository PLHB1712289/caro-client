import {
  Button,
  CssBaseline,
  Dialog,
  DialogContent,
  FormControlLabel,
  FormGroup,
  Grid,
  Slide,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./style";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewGame = ({ open, onClose, onSignInSuccess }) => {
  // React router hook
  const history = useHistory();

  // Style
  const classes = useStyles();

  // State
  const [password, setPassword] = useState("");
  const [roomName, setRoomName] = useState("Room Caro");

  const [lock, setLock] = React.useState(false);

  const _handleChangePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const _handleChangeRoomName = (e) => {
    const { value } = e.target;
    setRoomName(value);
  };

  // handle event submit form
  const _handleSubmitForm = async (e) => {
    e.preventDefault();
    alert(`Name: ${roomName} - Password: ${lock ? password : "No password"}`);
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
        style={{ transition: "width 1", transitionTimingFunction: "ease-out" }}
      >
        <DialogContent>
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                NEW ROOM
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={_handleSubmitForm}
              >
                <TextField
                  // variant="outlined"
                  id="standard-basic"
                  margin="normal"
                  required
                  fullWidth
                  name="roomName"
                  label="Room Name"
                  type="text"
                  id="room-name"
                  autoComplete="room name"
                  value={roomName}
                  onChange={_handleChangeRoomName}
                />
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={lock}
                        onChange={(e) => {
                          setLock(e.target.checked);
                        }}
                      />
                    }
                    label={"Set Password"}
                  />
                </FormGroup>
                {lock ? (
                  <TextField
                    id="standard-basic"
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
                ) : (
                  <TextField
                    id="standard-basic"
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
                    disabled
                  />
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Create Room
                </Button>
              </form>
            </div>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewGame;
