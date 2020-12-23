import { Grid, IconButton, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Message from "../message";
import apiService from "./api";
import useStyles from "./style";
import SendIcon from "@material-ui/icons/Send";

const Chat = ({ idGame, socket }) => {
  const classes = useStyles();

  const [listMess, setListMess] = useState([]);
  const [content, setContent] = useState("");

  const _handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const _handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const { success, message } = await apiService.sendMessage({
        message: content,
        idGame: idGame,
      });

      if (success) {
        setContent("");
        setListMess((preState) =>
          preState.concat({
            type: "1",
            username: "You",
            contentMessage: content,
          })
        );

        return;
      }

      alert(message);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Grid container item md={12} xs={12} className={classes.root}>
      <Grid item md={12} xs={12} className={classes.title}>
        CHAT
      </Grid>

      <div className={classes.container}>
        {listMess.map((mess) => {
          return <Message message={mess} />;
        })}
      </div>

      <Grid item md={12} xs={12}>
        <form onSubmit={_handleSubmitForm} className={classes.formSendMess}>
          <input
            className={classes.input}
            onChange={_handleChangeContent}
            value={content}
          />
          <IconButton className={classes.buttonSend}>
            <SendIcon style={{ color: "white" }} />
          </IconButton>
        </form>
      </Grid>
    </Grid>
  );
};

export default Chat;
