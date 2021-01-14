import { Grid, Tooltip, Zoom } from "@material-ui/core";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "../../index.css";
import Board from "../board";
import Chat from "../chat";
import useStyles from "./style";
import useStylesInfoGame from "./styleDetailGame";

const size = 20;

const DetailGame = ({ userID, dataGame }) => {
  // style
  const classes = useStyles();
  const classesInfoGame = useStylesInfoGame();

  const {
    player1,
    player2,
    playerX,
    idGame,
    winner,
    board: boardData,
    history,
  } = dataGame || {
    player1: { username: "baobao", id: "123" },
    player2: { username: "lili", id: "321" },
    idGame: "123",
    playerX: "123",
    winner: "123",
    board: Array(size * size).fill(null),
    history: [{ index: 0, board: Array(size * size).fill("O") }],
  };

  // states
  const [board, setBoard] = useState(boardData);

  const player1_X = playerX === player1.id ? "X" : "O";
  const player2_X = playerX === player2.id ? "X" : "O";

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const usernameWinner =
  //   winner === player1.id
  //     ? winner === userID
  //       ? "You"
  //       : player1.username
  //     : winner === userID
  //     ? "You"
  //     : player2.username;

  return (
    <>
      <Grid container className={classes.root}>
        <Grid container item xs={12} md={10}>
          <Grid item md={8} className={classes.board}>
            <div>
              <div
                style={{
                  height: 30,
                  marginBottom: 2,
                  color: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Game ID: {idGame}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>Room Owner </div>
                  <Tooltip
                    title={`${player1.username} - ${player1.id}`}
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <img
                      style={{
                        width: 30,
                        height: 30,
                        background: "pink",
                        borderRadius: "50%",
                        marginLeft: 10,
                      }}
                      src={player2.avatarUrl}
                    />
                  </Tooltip>
                </div>
              </div>
              <Board board={board} onClickCell={() => {}} />
            </div>
          </Grid>

          <Grid container item md={4} style={{ justifyContent: "center" }}>
            <div className={classesInfoGame.root}>
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 5,
                  height: "30vh",
                }}
              >
                <div style={{ height: "100%", display: "flex" }}>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        marginBottom: 5,
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        color: `${player1_X === "X" ? "red" : "green"}`,
                      }}
                    >
                      Player {player1_X}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px 20px",
                        background: `${"highlightPlayer1"}`,
                        borderRadius: 10,
                        width: "80%",
                      }}
                    >
                      <img
                        style={{
                          width: 100,
                          height: 100,
                          background: "pink",
                          borderRadius: 10,
                        }}
                        src={player1.avatarUrl}
                      />
                      <div style={{ marginLeft: 5 }}>
                        <div
                          style={{ textAlign: "center", fontSize: "1.1rem" }}
                        >
                          {player1.username}
                        </div>
                        <div
                          style={{ fontSize: "0.7rem", textAlign: "center" }}
                        >
                          ID: {player1.id}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        marginBottom: 5,
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        color: `${player2_X === "X" ? "red" : "green"}`,
                      }}
                    >
                      Player {player2_X}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px 20px",
                        background: `${"highlightPlayer2"}`,
                        borderRadius: 10,
                        width: "80%",
                      }}
                    >
                      <img
                        style={{
                          width: 100,
                          height: 100,
                          background: "pink",
                          borderRadius: 10,
                        }}
                        src={player2.avatarUrl}
                      />
                      <div style={{ marginLeft: 5 }}>
                        <div
                          style={{ textAlign: "center", fontSize: "1.1rem" }}
                        >
                          {player2.username}
                        </div>
                        <div
                          style={{ fontSize: "0.7rem", textAlign: "center" }}
                        >
                          ID: {player2.id}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={classesInfoGame.historyContainer}>
                <div className={classesInfoGame.historyTitle}>HISTORY</div>
                <div className={classesInfoGame.historyContent}>
                  {history.map((item, index) => {
                    return (
                      <div
                        style={{
                          backgroundColor: "rgba(255,255,255,0.1)",
                          margin: "5px 0",
                          textAlign: "center",
                          cursor: "pointer",
                          display: "flex",
                          padding: 5,
                          color: `${
                            item.board[item.index] === "X" ? "red" : "green"
                          }`,
                          fontWeight: 600,
                        }}
                        key={index}
                        onClick={() => {
                          setBoard(item.board);
                        }}
                      >
                        <div style={{ width: "20%" }}>{index + 1}.</div>
                        <div
                          style={{
                            width: "15%",
                          }}
                        >
                          {item.board[item.index]}
                        </div>
                        <div style={{ width: "20%" }}>
                          ({~~(item.index / size)}, {item.index % size})
                        </div>
                        <div style={{ width: "40%" }}>
                          {player1_X === item.board[item.index]
                            ? player1.username
                            : player2.username}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Chat isPlayer={false} idRoom={"idRoom"} idGame={idGame} />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const parseToken = (token) => {
  try {
    return jwtDecode(token).id;
  } catch (e) {
    return null;
  }
};

const mapStateToProps = (state) => ({
  userID: parseToken(state.token),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DetailGame);
