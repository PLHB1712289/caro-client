import React, {useState} from "react";
import { useHistory } from "react-router-dom";

import {
    Box,
    Button, Checkbox, FormControlLabel, Grid, IconButton, Link, TextField,
} from "@material-ui/core";
import useStyles from "./style";
import Progress from "../progress";
import apiService from "../game/apiService";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import config from "../../config";
import {ReactComponent as FacebookIcon} from "../../assert/svg-icon/facebook-icon.svg";
import GoogleLogin from "react-google-login";
import {ReactComponent as GoogleIcon} from "../../assert/svg-icon/google-icon.svg";
const AccessGame=(props)=>{
    let history = useHistory();

    const classes = useStyles();
    const size=30;
    const [id,setID]=useState("");
    // State
    const [isLoad, setIsLoad] = useState(false);
    const onChangeID=(e)=>{
        setID(e.target.value);
    }
    // handle event submit form
    const _handleSubmitForm = async (e) => {
        e.preventDefault();

        console.log("Check id game");
        console.log(id);
        const {success, message} = await apiService.accessGame(
            id
        );
        console.log("Check message");
        console.log(success,message);
        history.push(`/game/${id}`);

    };
    return(
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

                autoFocus
                value={id}
                onChange={onChangeID}
            />
            <Button
                type="submit"
                fullWidth
                color="primary"
                className={classes.submit}
            >
                Access Game
            </Button>

        </form>

    );
};

export default AccessGame;

