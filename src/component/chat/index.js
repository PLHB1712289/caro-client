import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import Message from "../message";
import apiService from "./api";

const Chat = ({ idGame, socket }) => {
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
    <Grid
      container
      item
      md={12}
      xs={12}
      style={{
        margin: "10px 0",
        border: "2px solid rgba(0,0,0,0.8)",
        borderRadius: 5,
        backgroundColor: "rgba(255,255,255,0.1)",
      }}
    >
      <Grid
        item
        md={12}
        xs={12}
        style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: "1rem",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        CHAT
      </Grid>

      <div style={{ width: "100%", height: "200px", overflowY: "auto" }}>
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
