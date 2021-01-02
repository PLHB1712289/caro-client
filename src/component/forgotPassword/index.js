import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Grid,
  Link
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { useHistory } from "react-router-dom";
import action from "../../storage/action";
import useStyles from "./style";
import apiService from "../profile/apiService";

const ForgotPassword = () => {
  // Styles
  const classes = useStyles();
  const history = useHistory();

  // States
    
  const [email,setEmail]=useState(null);
  const [errorEmail,setErrorEmail]=useState(null);

  //handle
  const _handleChangeEmail=(e)=>{
    const { value } = e.target;
    setEmail(value);
  };
  const _handleSubmitForm=async(e)=>{
    e.preventDefault();
    if(email!==null)
    {
      const {success,message,data}=await apiService.forgotPassword(email);
      alert(message);
    }
  }
  return(
    <div
      style={{
      justifyContent:'center',
      alignItems:'center',
      display:'flex',
      flexDirection:'column',
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
            
            {errorEmail===null?
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  autoFocus
                  value={email}
                  onChange={_handleChangeEmail}
                />:
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
            }
            
           
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

export default ForgotPassword;
