import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ItemGame from "../itemGame";
import ItemUserOnline from "../itemUserOnline";
import ListGame from "../listGame";
import ListUserOnline from "../listUserOnline";
import apiService from "./api";
import action from "../../storage/action";

const Page = ({
  listRoom,
  listUser,
  setListRoom,
  turnOffLoading,
  turnOnLoading,
}) => {
  const [filterListRoom, setFilterListRoom] = useState(listRoom);

  const _handleFilterByID = (id) => {
    if (id) {
      setFilterListRoom(
        listRoom.filter((item) => {
          if (item.id.search(id) !== -1) return item;
        })
      );
    } else {
      setFilterListRoom(listRoom);
    }
  };

  useEffect(() => {
    turnOnLoading();
    (async () => {
      try {
        const { success, message, data } = await apiService.getListRoom();

        if (success) {
          setListRoom(data.listRoom);
          setFilterListRoom(data.listRoom);
        } else {
          alert(message);
        }
      } catch (e) {
        alert("Cannot connect to server");
        // console.log("[ERROR]:", e);
      }

      turnOffLoading();
    })();
  }, []);

  return (
    <Grid container style={{ justifyContent: "center", height: "90vh" }}>
      <Grid container item md={10} xs={12}>
        <Grid item xs={9}>
          <ListGame onFilterByID={_handleFilterByID}>
            {filterListRoom.map((item) => (
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
  listRoom: state.listRoom,
  listUser: state.listUser,
});

const mapDispatchToProps = (dispatch) => ({
  setListRoom: (listRoom) => {
    dispatch(action.LIST_ROOM.update(listRoom));
  },

  turnOnLoading: () => {
    dispatch(action.LOADING.turnOn());
  },

  turnOffLoading: () => {
    dispatch(action.LOADING.turnOff());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
