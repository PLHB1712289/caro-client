import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({ open, setOpen, title, description }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
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
          {title}
        </DialogTitle>
        <DialogContent
          style={{
            width: 350,
            textAlign: "center",
          }}
        >
          <DialogContentText id="alert-dialog-slide-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button
            onClick={handleClose}
            style={{ background: "#ff0001e3", color: "white", fontWeight: 600 }}
          >
            Cancle
          </Button> */}
          <Button
            onClick={handleClose}
            style={{ background: "#00adff", color: "white", fontWeight: 600 }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
