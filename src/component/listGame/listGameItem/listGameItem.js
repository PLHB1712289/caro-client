import axios from 'axios';
import React,{useState} from "react";
import { BrowserRouter as Router, Switch, Route, Link,useParams,useHistory } from 'react-router-dom';
import {Avatar,
    Box,
    Button,
    Checkbox,
    CssBaseline,
    FormControlLabel,
    Grid,
    IconButton,
    Paper,
    TextField,
    Typography,} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/core/SvgIcon/SvgIcon";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import config from "../../../config";
import {ReactComponent as FacebookIcon} from "../../../assert/svg-icon/facebook-icon.svg";
import GoogleLogin from "react-google-login";
import {ReactComponent as GoogleIcon} from "../../../assert/svg-icon/google-icon.svg";
import Progress from "../../progress";
import useStyles from "../style";

const Board=(props)=> {
    const [name,setName]=useState("");
    const classes = useStyles();

    return(
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={8} md={7} className={classes.image} />
            <Grid item xs={12} sm={4} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
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
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={_handleChangeEmail}
                        />
                        <TextField
                            variant="outlined"
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                            checked={isRememberMe}
                            onChange={_handleChangeRemeberMe}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link
                                    variant="body2"
                                    onClick={_handleOnClickForgotPassword}
                                    style={{ cursor: "pointer" }}
                                >
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    variant="body2"
                                    onClick={_handleOnClickSignUp}
                                    style={{ cursor: "pointer" }}
                                >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <div
                            style={{
                                marginTop: 20,
                                fontSize: "1rem",
                                textAlign: "center",
                            }}
                        >
                            or connect with
                        </div>

                        <FacebookLogin
                            appId={config.FB_APP_ID}
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={_callbackFB}
                            render={(renderProps) => (
                                <IconButton
                                    className={classes.socialLoginFB}
                                    onClick={renderProps.onClick}
                                >
                                    <div
                                        style={{
                                            width: 25,
                                            height: 25,
                                        }}
                                    >
                                        <FacebookIcon />
                                    </div>
                                    <span className={classes.titleSocialLogin}>
                      Sign in with Facebook
                    </span>
                                </IconButton>
                            )}
                        />

                        <GoogleLogin
                            clientId={config.GG_APP_ID}
                            render={(renderProps) => (
                                <IconButton
                                    className={classes.socialLoginFB}
                                    onClick={renderProps.onClick}
                                >
                                    <div
                                        style={{
                                            width: 25,
                                            height: 25,
                                            textAlign: "center",
                                        }}
                                    >
                                        <GoogleIcon />
                                    </div>

                                    <span className={classes.titleSocialLogin}>
                      Sign in with Google
                    </span>
                                </IconButton>
                            )}
                            onSuccess={_callbackGG}
                            onFailure={_callbackGGFailed}
                        />

                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );



};


export default Board;


