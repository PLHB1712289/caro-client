import { Button, Dialog, Slide, Switch, withStyles } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import realtime from "../../realtime";
import apiService from "./apiService";
import useStyles from "./style";

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        // backgroundColor: theme.palette.primary.main,
        backgroundColor: "#00c853",
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({ open, onClose }) {
  const passwordInputRef = useRef(null);

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
    // alert(`Name: ${roomName} - Password: ${lock ? password : "No password"}`);

    try {
      const { success, message, data } = await apiService.createRoom(
        roomName,
        password
      );

      if (success) {
        realtime.joinRoom(data.id);
        history.push(`/game/${data.id}`);
        return;
      }

      alert(message);
    } catch (e) {
      alert("Cannot connect to server");
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div style={{ background: "rgba(2,13,24,0.85)", color: "white" }}>
        <DialogTitle
          style={{
            width: 350,
            height: 50,
            textAlign: "center",
            background: "rgba(2,13,24,0.2)",
            alignItems: "center",
            padding: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ fontWeight: 1000 }}>New Room</div>
        </DialogTitle>

        <div className={classes.paper} style={{ color: "white" }}>
          <form
            className={classes.form}
            noValidate
            onSubmit={_handleSubmitForm}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: 30,
                alignContent: "center",
                alignItems: "center",
                margin: "5px 0",
              }}
            >
              <label>Room Name</label>
              <input
                style={{
                  width: "70%",
                  height: 30,
                  borderRadius: 4,
                  padding: 5,
                }}
                type="text"
                value={roomName}
                onChange={_handleChangeRoomName}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: 30,
                alignContent: "center",
                alignItems: "center",
                margin: "10px 0",
              }}
            >
              <label>Password</label>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "70%",
                  // background: "white",
                  justifyContent: "space-between",
                }}
              >
                <AntSwitch
                  checked={lock}
                  onChange={(e) => {
                    setLock(e.target.checked);
                    setTimeout(() => {
                      passwordInputRef.current.focus();
                    }, 10);
                  }}
                />
                <input
                  ref={passwordInputRef}
                  style={{
                    width: "80%",
                    height: 30,
                    borderRadius: 4,
                    padding: 5,
                  }}
                  disabled={!lock}
                  type="password"
                  value={password}
                  onChange={_handleChangePassword}
                />
              </div>
            </div>

            <DialogActions
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                style={{
                  background: "#00adff",
                  color: "white",
                  fontWeight: 600,
                  width: 100,
                  height: 30,
                }}
                type="submit"
              >
                Create
              </Button>
            </DialogActions>
          </form>
        </div>
      </div>
    </Dialog>
  );
}
