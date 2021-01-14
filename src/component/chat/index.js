import { Grid, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import React, { useEffect, useState } from "react";
import Message from "../message";
import apiService from "./api";
import useStyles from "./style";
import realtime from "../../realtime";
import TAG from "../../realtime/data";

const Chat = ({ idRoom, isPlayer, idGame }) => {
  const classes = useStyles();

  const [content, setContent] = useState("");
  const [listMess, setListMess] = useState([]);

  useEffect(() => {
    // get list message
    (async () => {
      try {
        if (idGame) {
          const { success, message, data } = await apiService.getListMessage(
            idRoom,
            idGame
          );

          if (success) {
            setListMess(data.listMessage);
          } else {
            console.log(message);
          }
        } else {
          const { success, message, data } = await apiService.getListMessage(
            idRoom
          );

          if (success) {
            setListMess(data.listMessage);
          } else {
            console.log(message);
          }
        }
      } catch (e) {
        console.log("[ERROR-IN4GAME]:", e.message);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idRoom]);

  useEffect(() => {
    realtime.setCallback(TAG.RESPONSE_SEND_MESS, ({ message }) => {
      setListMess((prev) => prev.concat(message));
    });

    return () => realtime.removeCallback(TAG.RESPONSE_SEND_MESS);
  }, []);

  const _handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const _handleSubmitForm = async (e) => {
    e.preventDefault();
    if (content) {
      const token = localStorage.getItem("token") || "";
      realtime.sendMessage(idRoom, content, token);
      setContent("");
    }
  };

  return (
    <Grid container item md={12} xs={12} className={classes.root}>
      <Grid item md={12} xs={12} className={classes.title}>
        CHAT
      </Grid>

      <div
        className={classes.container}
        style={{ height: `${!isPlayer ? "170px" : "132px"}` }}
      >
        {listMess.map((mess) => {
          return <Message message={mess} />;
        })}
      </div>

      {isPlayer ? (
        <Grid item md={12} xs={12}>
          <form onSubmit={_handleSubmitForm} className={classes.formSendMess}>
            <input
              className={classes.input}
              onChange={_handleChangeContent}
              value={content}
            />
            <IconButton className={classes.buttonSend} type="submit">
              <SendIcon style={{ color: "white" }} />
            </IconButton>
          </form>
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default Chat;
