import {
  Container,
  CssBaseline,
  Grid,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import apiService from "../profile/apiService";
import useStyles from "./style";
import action from "../../storage/action";
import { connect } from "react-redux";
import axios from "axios";
import "../../index.css";
import Camera from "../../assert/img/camera.png";
import AlertDialog from "../alertDialog";

const UpdateProfile = ({ turnOnLoading, turnOffLoading }) => {
  // Styles
  const classes = useStyles();

  // States
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://res.cloudinary.com/dofdj0lqd/image/upload/v1610186880/aqutfu6ccnjdqo9vd3zb.png"
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const [fullname, setFullname] = useState(null);
  const [fullnameError, setFullnameError] = useState(null);

  const [message, setMessage] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [messageAlert, setMessageAlert] = useState(null);
  const [titleAlert, setTitleAlert] = useState(null);
  useEffect(() => {
    if (user === null) {
      turnOnLoading();
      const getUser = async () => {
        const { success, data } = await apiService.getUser();
        if (success === true && data !== user) {
          setUser(data);
          setFullname(data.fullname);
          if (data.avatarUrl !== null) {
            setAvatarUrl(data.avatarUrl);
          }
        }
        console.log("Check user:", data);
        turnOffLoading();
      };
      getUser();
    }

    if (fullname !== null && fullname.length === 0) {
      setFullnameError("Fullname can't be empty");
    }
    if (fullname !== null && fullname.length > 0) {
      setFullnameError(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, fullname]);
  const _handleSubmitForm = async (e) => {
    turnOnLoading();
    e.preventDefault();
    console.log("SelectedFile:", selectedFile);
    if (selectedFile !== null) {
      //upload avatar to cloudinary
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "g5jpmso5");
      const upload = await axios.post(
        "https://api.cloudinary.com/v1_1/dofdj0lqd/image/upload",
        formData
      );
      console.log("After upload:", upload);
      setAvatarUrl(upload.data.secure_url);
    }

    //update user
    const { success, message, data } = await apiService.updateUser(
      avatarUrl,
      fullname
    );
    console.log("Update profile");
    setMessage(message);
    setOpenDialog(true);
    if (success === true) {
      setTitleAlert("Success");
    } else {
      setTitleAlert("Failed");
    }
    setMessageAlert(message);
    //alert(message);

    turnOffLoading();
  };

  const _handleChangeFullname = (e) => {
    setFullname(e.target.value);
  };
  const onFileChange = (e) => {
    let reader = new FileReader();

    setSelectedFile(e.target.files[0]);
    console.log("File info:", e.target.files[0]);
    reader.onload = () => {
      setAvatarUrl(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
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
      {openDialog === true ? (
        <AlertDialog
          open={openDialog}
          setOpen={setOpenDialog}
          description={messageAlert}
          title={titleAlert}
        ></AlertDialog>
      ) : (
        <div></div>
      )}
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
          <h1>Profile</h1>
          <div
            className="image-upload"
            style={{
              flexDirection: "column",
              alighItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <label for="file-input">
              <img
                src={avatarUrl}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 100,
                  cursor: "pointer",
                }}
                alt=""
              />

              <div style={{ position: "absolute" }}>
                <div style={{ position: "absolute", bottom: 25, left: 170 }}>
                  <img
                    src={Camera}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      cursor: "pointer",
                    }}
                    alt=""
                  ></img>
                </div>
              </div>

              {/* <img src={avatarUrl} style={{width:200,height:200,borderRadius:100}}>
                <div style={{flex: 1,justifyContent: 'flex-end',alignItems: 'flex-start'}}>
                  <img src={Camera} style={{width:50,height:50,borderRadius:25,alignItems: 'center',justifyContent: 'center'}}></img>
                </div>
              </img> */}
            </label>

            <input id="file-input" type="file" onChange={onFileChange} />
          </div>
          <div>
            <Typography variant="h6" style={{ marginLeft: 20 }}>
              Choose your avatar
            </Typography>
          </div>
          <div style={{ marginBottom: 20 }}></div>
          <form
            className={classes.form}
            noValidate
            onSubmit={_handleSubmitForm}
          >
            {user !== null ? (
              <Grid container spacing={1}>
                <Typography variant="h6">Fullname:</Typography>
                {fullnameError === null ? (
                  <TextField
                    autoFocus
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={fullname}
                    onChange={_handleChangeFullname}
                  />
                ) : (
                  <TextField
                    error
                    autoFocus
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    onChange={_handleChangeFullname}
                    value={fullname}
                    helperText={fullnameError}
                  />
                )}
                {/* <Typography variant="h6" style={{wordWrap: "break-word"}}>{username}</Typography> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Update
                </Button>
                {message !== null ? (
                  <AlertDialog description={message} />
                ) : (
                  <div></div>
                )}
              </Grid>
            ) : (
              <div></div>
            )}
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

export default connect(() => ({}), mapDispatchToProps)(UpdateProfile);
