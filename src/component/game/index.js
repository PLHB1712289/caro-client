import React, { useEffect } from "react";
import "../../index.css";
import Board from "../board/board";
import { useRouteMatch } from "react-router-dom";
import Chat from "../chat";

const Game = ({ socket }) => {
  const match = useRouteMatch();
  const { id: idGame } = match.params;

  return (
    <div className="game">
      Game - ID: {idGame}
      <div className="game-board">{/* <Board /> */}</div>
      <div className="game-info">
        <div>status</div>
        <ol>{/* TODO */}</ol>

        {/* <Chat idGame={idGame} socket={socket} /> */}
      </div>
    </div>
  );
};

export default Game;
