import { Button, Dialog, Slide } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useEffect, useState } from "react";
import useStyles from "./style";
import realtime from "../../realtime";
import TAG from "../../realtime/data";
import { BoxLoading } from "react-loadingg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({ open, onClose, idRoom }) {
  // Style
  const classes = useStyles();

  // State
  const [idUser, setIdUser] = useState("");
  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    realtime.setCallback(TAG.RESPONSE_INVITE, ({ success, message }) => {
      if (success) {
        onClose();
      } else {
        setError(message);
      }

      setWaiting(false);
    });
  }, []);

  const _handleChangeIdUser = (e) => {
    const { value } = e.target;
    setIdUser(value);
  };

  // handle event submit form
  const _handleSubmitForm = async (e) => {
    e.preventDefault();
    if (idUser && !waiting) {
      realtime.invitePlayer(idUser, idRoom);
      setError("");
      setWaiting(true);
    } else {
      setWaiting(false);
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
          <div style={{ fontWeight: 1000 }}>Invite</div>
        </DialogTitle>

        <div className={classes.paper} style={{ color: "white" }}>
          <form
            className={classes.form}
            noValidate
            onSubmit={_handleSubmitForm}
          >
            {waiting ? (
              <>
                <BoxLoading />
                <div style={{ width: 30, height: 50 }}></div>
              </>
            ) : (
              <>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "1.2rem",
                    color: "red",
                    fontWeight: 600,
                  }}
                >
                  {error}
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
                  <label>ID Player</label>

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
                      style={{
                        width: "80%",
                        height: 30,
                        borderRadius: 4,
                        padding: 5,
                      }}
                      type="text"
                      value={idUser}
                      onChange={_handleChangeIdUser}
                    />
                  </div>
                </div>
              </>
            )}

            <DialogActions
              style={{ display: "flex", justifyContent: "center" }}
            >
              {waiting ? (
                <Button
                  style={{
                    background: "red",
                    color: "white",
                    fontWeight: 600,
                    width: 100,
                    height: 30,
                  }}
                  type="submit"
                >
                  Cancel
                </Button>
              ) : (
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
              )}
            </DialogActions>
          </form>
        </div>
      </div>
    </Dialog>
  );
}
