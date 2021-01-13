import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import realtime from "../../realtime";
import { BoxLoading } from "react-loadingg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    setWaiting((prev) => (open === false ? false : prev));
  }, [open]);

  const _handleRequestDraw = () => {
    realtime.requestDraw(null);
    setWaiting(true);
  };

  const _handleClickCancelDraw = () => {
    setWaiting(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          style={{
            width: 350,
            background: "rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          Request Draw
        </DialogTitle>
        <DialogContent
          style={{
            width: 350,
            textAlign: "center",
            position: "relative",
          }}
        >
          {waiting && (
            <div style={{ height: 90 }}>
              <BoxLoading />
              <div
                style={{
                  position: "absolute",
                  top: 85,
                  left: 150,
                  fontWeight: 700,
                }}
              >
                waiting...
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (!waiting) handleClose();
              else {
                _handleClickCancelDraw();
                handleClose();
              }
            }}
            style={{ background: "#ff0001e3", color: "white", fontWeight: 600 }}
          >
            Cancle
          </Button>
          {!waiting && (
            <Button
              onClick={_handleRequestDraw}
              style={{ background: "#00adff", color: "white", fontWeight: 600 }}
            >
              OK
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
