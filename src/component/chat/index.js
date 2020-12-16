import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Message from "../message";
import apiService from "./api";
import SOCKET_TAG from "../page/dataConst";

const Chat = ({ idGame, socket }) => {
  const [listMess, setListMess] = useState([]);

  const [trigger, setTrigger] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const {
          success,
          message,
          listMessage,
        } = await apiService.getListMessage(idGame);

        if (success) {
          setListMess(listMessage);
          return;
        }

        alert(message);
      } catch (e) {
        alert("Get list chat error");
      }
    })();
  }, [trigger]);

  //set up socket
  if (socket) {
    socket.emit(SOCKET_TAG.REQUEST_JOIN_GAME, { idGame });

    socket.on(SOCKET_TAG.RESPONSE_SEND_MESSAGE, ({ message }) => {
      setTrigger("1");
    });
  }

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

        socket.emit(SOCKET_TAG.REQUEST_SEND_MESSAGE, { idGame, message });
        return;
      }

      alert(message);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Grid
      container
      item
      md={12}
      xs={12}
      style={{ border: "1px solid rgba(0,0,0,0.2)", padding: 2 }}
    >
      <Grid item md={12} xs={12} style={{ background: "green" }}>
        Chat
      </Grid>

      <div style={{ width: "100%", height: "200px", overflowY: "scroll" }}>
        {listMess.map((mess) => {
          return <Message message={mess} />;
        })}
      </div>

      <Grid item md={12} xs={12}>
        <form onSubmit={_handleSubmitForm} style={{ width: "100%" }}>
          <input
            type="text"
            style={{ width: "75%" }}
            onChange={_handleChangeContent}
            value={content}
          />
          <button style={{ width: "20%" }}>send</button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Chat;
