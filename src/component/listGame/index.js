import { Button, Tooltip, Zoom } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import NewGame from "../newGame";
import QuickPlay from "../quickPlay";
import JoinRoomByID from "../joinRoomByID";
import useStyle from "./style";

const ListGame = ({ children, onFilterByID, token }) => {
  const classes = useStyle();

  const [id, setID] = useState("");
  const [openNewGame, setOpenNewGame] = useState(false);
  const [openQuickPlay, setOpenQuickPlay] = useState(false);
  const [openJoinGameByID, setOpenJoinGameByID] = useState(false);

  const _handleChangeID = (e) => {
    setID(e.target.value);
    onFilterByID(e.target.value);
  };

  return (
    <div className={classes.container}>
      <NewGame
        open={openNewGame}
        onClose={() => {
          setOpenNewGame(false);
        }}
      />

      <QuickPlay open={openQuickPlay} setOpen={setOpenQuickPlay} />

      <JoinRoomByID
        open={openJoinGameByID}
        onClose={() => setOpenJoinGameByID(false)}
      />

      <div className={classes.title}>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontSize: "1.5rem",
            color: "white",
          }}
        >
          GAME
        </div>
        {token ? (
          <div>
            <Tooltip title="Join Room By ID" TransitionComponent={Zoom} arrow>
              <Button
                onClick={() => {
                  setOpenJoinGameByID(true);
                }}
                className={classes.button}
              >
                Join Room
              </Button>
            </Tooltip>

            <Tooltip
              title="Quick play with another player"
              TransitionComponent={Zoom}
              arrow
            >
              <Button
                onClick={() => {
                  setOpenQuickPlay(true);
                }}
                className={classes.button}
              >
                Quick Play
              </Button>
            </Tooltip>
            <Tooltip title="Create a new room" TransitionComponent={Zoom} arrow>
              <Button
                onClick={() => {
                  setOpenNewGame(true);
                }}
                className={classes.button}
              >
                New Game
              </Button>
            </Tooltip>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className={classes.filter}>
        <div className={classes.no}>No.</div>
        <div className={classes.filterID}>
          <label style={{ marginRight: 3 }} for="filter-game">
            ID
          </label>
          <input id="filter-game" value={id} onChange={_handleChangeID} />
        </div>
        <div className={classes.column}>Name</div>
        <div className={classes.column}>Player1</div>
        <div className={classes.column}>Player2</div>
        <div className={classes.column}>Status</div>
        <div style={{ width: "5%", textAlign: "center" }}>Lock</div>
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ListGame);
