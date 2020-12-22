import React, { useState } from "react";
import useStyle from "./style";
import NewGame from "../newGame";
import { Button, Tooltip, Zoom, withStyles } from "@material-ui/core";
import { connect } from "react-redux";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const ListGame = ({ children, onFilterByID, token }) => {
  const classes = useStyle();

  const [id, setID] = useState("");
  const [openNewGame, setOpenNewGame] = useState(false);

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
      <div className={classes.title}>
        <div
          style={{ alignItems: "center", display: "flex", fontSize: "1.5rem" }}
        >
          GAME
        </div>
        {token ? (
          <div>
            <Tooltip title="New game" TransitionComponent={Zoom} arrow>
              <Button
                onClick={() => {
                  setOpenNewGame(true);
                }}
                style={{ background: "green", margin: "0px 2px" }}
              >
                Quick Play
              </Button>
            </Tooltip>
            <Tooltip title="New game" TransitionComponent={Zoom} arrow>
              <Button
                onClick={() => {
                  setOpenNewGame(true);
                }}
                style={{ background: "green", margin: "0px 2px" }}
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
        <div className={classes.column}>Player1</div>
        <div className={classes.column}>Player2</div>
        <div className={classes.column}>status</div>
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
