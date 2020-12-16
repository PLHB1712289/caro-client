import React,{useEffect} from "react";
import "../../index.css"
import Board from "../board/board";

const Game=(props)=>{
    /*useEffect(()=>{
        axios.get(`/user/${userID}/boards` )
            .then(response=>{
                setBoards(response.data);
            })
            .catch(function (error) {
                console.log(error);

            })
    });*/
    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
};

export  default Game;