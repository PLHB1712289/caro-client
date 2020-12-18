import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import ListGame from "../listGame";
import ItemGame from "../itemGame";
import ListUserOnline from "../listUserOnline";
import ItemUserOnline from "../itemUserOnline";
import { connect } from "react-redux";

const Page = ({ listGame, listUser }) => {
  const [filterListGame, setFilterListGame] = useState(listGame);

  const _handleFilterByID = (id) => {
    if (id) {
      setFilterListGame(
        listGame.filter((item) => {
          if (item.id.search(id) !== -1) return item;
        })
      );
    } else {
      setFilterListGame(listGame);
    }
  };

  return (
    <Grid container style={{ justifyContent: "center", height: "90vh" }}>
      <Grid container item md={10} xs={12}>
        <Grid item xs={9}>
          <ListGame onFilterByID={_handleFilterByID}>
            {filterListGame.map((item) => (
              <ItemGame data={item} />
            ))}
          </ListGame>
        </Grid>

        <Grid item xs={3}>
          <ListUserOnline>
            {listUser.map((item) => (
              <ItemUserOnline data={item} />
            ))}
          </ListUserOnline>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  listGame: state.listGame,
  listUser: state.listUser,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
