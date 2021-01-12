import { Container, CssBaseline, Grid, Typography,Button,Avatar,TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import apiService from "../profile/apiService";
import useStyles from "./style";
import action from "../../storage/action";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import '../../index.css';
const UpdateProfile = ({ turnOnLoading, turnOffLoading }) => {
  // Styles
  const classes = useStyles();

  // React router hook
  const history = useHistory();

  // States
  const [user, setUser] = useState(null);
  const [avatarUrl,setAvatarUrl]=useState("https://res.cloudinary.com/dofdj0lqd/image/upload/v1610186880/aqutfu6ccnjdqo9vd3zb.png");
  const [selectedFile,setSelectedFile]=useState(null);
  const [username,setUsername]=useState(null);
  const [usernameError,setUsernameError]=useState(null);
  useEffect(() => {
    
    if (user === null) {
      turnOnLoading();
      const getUser = async () => {
        const { success, data } = await apiService.getUser();
        if (success === true && data !== user) {
          setUser(data);
          setUsername(data.username);
          if(data.avatarUrl!==null)
          {
            setAvatarUrl(data.avatarUrl);
          }
        }
        console.log("Check user:",data);
        turnOffLoading();
      };
      getUser();
    }
    if(username!==null && username.length===0)
    {
      setUsernameError("Username can't be empty");
    }
    if(username!==null && username.length>0)
    {
      setUsernameError(null);
    }
    
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  const _handleSubmitForm=async(e)=>{
    e.preventDefault();
    console.log("Username:",username);
    
    //upload avatar to cloudinary
    const formData=new FormData();
    formData.append("file",selectedFile);
    formData.append("upload_preset","g5jpmso5");
    const upload=await axios.post("https://api.cloudinary.com/v1_1/dofdj0lqd/image/upload",formData);
    console.log("After upload:",upload);
    setAvatarUrl(upload.data.secure_url);

    //update user
    const {success,message,data}=await apiService.updateUser(avatarUrl,username);
    alert(message);

    console.log("Update profile");

  }

  const _handleChangeUsername=(e)=>{    
    setUsername(e.target.value);
  }
  const onFileChange=(e)=>{
    let reader = new FileReader();

    setSelectedFile(e.target.files[0]);
    console.log("File info:",e.target.files[0]);
    reader.onload = () => {
      setAvatarUrl(reader.result);
      
    }
    reader.readAsDataURL(e.target.files[0]);
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
          <div  className="image-upload"style={{flexDirection:'column',alighItems:'center',justifyContent:'center'}}>
            <label for="file-input">
              <img src={avatarUrl} style={{width:200,height:200,borderRadius:100}}></img>

            </label>

            <input id="file-input" type="file"onChange={onFileChange}  />
          </div>
          <div >
              <Typography variant="h6" style={{marginLeft:20}} >
                      Choose your avatar
              </Typography>
            </div>
          <div style={{marginBottom:20}}></div>  
          <form className={classes.form} noValidate onSubmit={_handleSubmitForm}>
            
            
            {user !== null ? (
                
                <Grid container spacing={1}>
                    <Typography variant="h6">Username:</Typography>

                    {usernameError===null ?
                    <TextField
                      autoFocus
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      value={username}
                      onChange={_handleChangeUsername}
                      />:
                      <TextField
                        error
                        autoFocus
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        onChange={_handleChangeUsername}
                        value={username}
                        helperText={usernameError}
                      />
                    }
                    
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