import { Button, Dialog, Slide, Switch, withStyles } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./style";

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
  const [idRoom, setIdRoom] = useState("");

  const _handleChangeIdRoom = (e) => {
    const { value } = e.target;
    setIdRoom(value);
  };

  // handle event submit form
  const _handleSubmitForm = async (e) => {
    e.preventDefault();
    if (idRoom) {
      history.push(`/game/${idRoom}`);
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
          <div style={{ fontWeight: 1000 }}>Join Room</div>
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
                margin: "10px 0",
              }}
            >
              <label>Room ID</label>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "70%",
                  // background: "white",
                  justifyContent: "space-between",
                }}
              >
                <input
                  ref={passwordInputRef}
                  style={{
                    width: "80%",
                    height: 30,
                    borderRadius: 4,
                    padding: 5,
                  }}
                  type="text"
                  value={idRoom}
                  onChange={_handleChangeIdRoom}
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
                OK
              </Button>
            </DialogActions>
          </form>
        </div>
      </div>
    </Dialog>
  );
}
