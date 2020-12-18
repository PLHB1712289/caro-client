import React, { useState } from "react";
import useStyle from "./style";
import NewGame from "../newGame";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";

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
        <div>GAME</div>
        {token ? (
          <Button
            onClick={() => {
              setOpenNewGame(true);
            }}
          >
            NewGame
          </Button>
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
