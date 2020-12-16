import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  TextField,
} from "@material-ui/core";
import useStyles from "./style";
import Progress from "../progress";
import apiService from "./apiService";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import config from "../../config";
import { ReactComponent as FacebookIcon } from "../../assert/svg-icon/facebook-icon.svg";
import GoogleLogin from "react-google-login";

import { ReactComponent as GoogleIcon } from "../../assert/svg-icon/google-icon.svg";

const CreateNewGame = (props) => {
  const classes = useStyles();
  const size = 30;
  const [name, setName] = useState("");
  const history = useHistory();
  // State
  const [isLoad, setIsLoad] = useState(false);
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  // handle event submit form
  const createNewGame = async (e) => {
    e.preventDefault();
    const { success, message, id } = await apiService.createNewGame(name);

    if (success) {
      history.push(`/game/${id}`);
    }
  };
  return (
    <form className={classes.form} noValidate onSubmit={createNewGame}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        autoFocus
        value={name}
        onChange={onChangeName}
      />
      <Button
        type="submit"
        fullWidth
        color="primary"
        className={classes.submit}
        onClick={createNewGame}
      >
        New Game
      </Button>
    </form>
  );
};

export default CreateNewGame;
