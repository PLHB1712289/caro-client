import { Button, Container, CssBaseline, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import apiService from "../profile/apiService";
import useStyles from "./style";
import action from "../../storage/action";
import { connect } from "react-redux";
import AlertDialog from "../alertDialog";
const ChangePassword = ({ turnOnLoading, turnOffLoading }) => {
  // Styles
  const classes = useStyles();

  // States

  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [reNewPassword, setReNewPassword] = useState(null);
  //const [message,setMessage]=useState(null);
  const [messageErrorNewPass, setMessageErrorNewPass] = useState(null);
  const [messageErrorReNew, setMessageErrorReNew] = useState(null);
  const [user, setUser] = useState(null);
  const [canChange, setCanChange] = useState(null);

  const [openDialog,setOpenDialog]=useState(false);
  const [messageAlert,setMessageAlert]=useState(null);
  const [titleAlert,setTitleAlert]=useState(null);
  useEffect(() => {
    if (user !== null && canChange === null) {
      if (user.password !== null) {
        setCanChange(true);
      } else {
        setCanChange(false);
      }
    }
    if (user === null) {
      turnOnLoading();

      const getUser = async () => {
        const res = await apiService.getUser();
        setUser(res.data);
        turnOffLoading();

      };
      getUser();

    }
    if (newPassword !== null && newPassword.length < 7) {
      setMessageErrorNewPass("New password must have atleast 7 characters");
    } else {
      setMessageErrorNewPass(null);
    }
    if (
      newPassword !== null &&
      reNewPassword !== null &&
      reNewPassword !== newPassword
    ) {
      setMessageErrorReNew(
        "Re-new password must be the same with new password"
      );
    }
    if (
      newPassword !== null &&
      reNewPassword !== null &&
      reNewPassword === newPassword
    ) {
      setMessageErrorReNew(null);
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reNewPassword, newPassword, user, canChange]);

  const _handleSubmitForm = async (e) => {
    e.preventDefault();
    turnOnLoading();

    if (
      reNewPassword !== null &&
      newPassword !== null &&
      oldPassword !== null &&
      messageErrorNewPass===null &&
      messageErrorReNew===null
    ) {
      const { success,message } = await apiService.changePassword(
        oldPassword,
        newPassword
      );
      setOpenDialog(true);
      if(success===true)
      {
        setTitleAlert("Success");
      }
      else
      {
        setTitleAlert("Failed");
      }
      setMessageAlert(message);
      //alert(message);
    }
    turnOffLoading();

  };
  const _handleChangeOldPassword = (e) => {
    const { value } = e.target;
    setOldPassword(value);
  };
  const _handleChangeNewPassword = (e) => {
    const { value } = e.target;
    setNewPassword(value);
  };
  const _handleChangeReNewPassword = (e) => {
    const { value } = e.target;
    setReNewPassword(value);
  };
  if (canChange === null) {
    return <div></div>;
  }
  if (canChange === false) {
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
            <h1>Cannot Change Password</h1>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {openDialog===true?
        <AlertDialog open={openDialog} setOpen={setOpenDialog} description={messageAlert} title={titleAlert}></AlertDialog>:
        <div></div>
      }
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
          <h1>Change Password</h1>
          <form
            className={classes.form}
            noValidate
            onSubmit={_handleSubmitForm}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Old Password"
              type="password"
              value={oldPassword}
              onChange={_handleChangeOldPassword}
            />
            {messageErrorNewPass === null ? (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="New Password"
                type="password"
                value={newPassword}
                onChange={_handleChangeNewPassword}
              />
            ) : (
              <TextField
                error
                autoFocus
                fullWidth
                variant="outlined"
                margin="normal"
                label="New Password"
                required
                type="password"
                onChange={_handleChangeNewPassword}
                helperText={messageErrorNewPass}
              />
            )}

            {messageErrorReNew !== null ? (
              <TextField
                error
                autoFocus
                fullWidth
                variant="outlined"
                margin="normal"
                label="Re-new Password"
                required
                type="password"
                onChange={_handleChangeReNewPassword}
                helperText={messageErrorReNew}
              />
            ) : (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Re-new Password"
                type="password"
                value={reNewPassword}
                onChange={_handleChangeReNewPassword}
              />
            )}
            {/* {message!=="Change password success."?
                        <div style={{color:'red'}}>{message}</div>
                        :
                        <div style={{color:'green'}}>{message}</div>
                    } */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Accept
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
export default connect(() => ({}), mapDispatchToProps)(ChangePassword);
