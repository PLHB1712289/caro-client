import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Crown from "../../assert/img/crown.png";
import action from "../../storage/action";
import apiService from "../profile/apiService";
import RankItem from "../rankItem";

const Rank = ({ turnOnLoading, turnOffLoading }) => {
  // States
  const [listUserRank, setListUserRank] = useState([]);

  const renderListUserRank = () => {
    return listUserRank.map((item, i) => {
      return <RankItem data={item} key={i} rank={i + 1} />;
    });
  };
  useEffect(() => {
    if (listUserRank.length === 0) {
      turnOnLoading();
      const getUser = async () => {
        const { success, data } = await apiService.getListUserRank();
        console.log("Check list user rank:", data);
        if (success === true) {
          setListUserRank(data);
        }
        turnOffLoading();
      };
      getUser();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          width: "650px",
        }}
      >
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <h1 style={{ color: "#F0FFFF" }}>Rank</h1>
          <img
            src={Crown}
            style={{ width: 50, height: 50, marginLeft: "10px" }}
            alt=""
          ></img>
        </div>

        <div
          style={{
            borderTop: "1px solid #F0FFFF",
          }}
        >
          {renderListUserRank()}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  turnOnLoading: () => {
    dispatch(action.LOADING.turnOn());
  },

  turnOffLoading: () => {
    dispatch(action.LOADING.turnOff());
  },
});

export default connect(() => ({}), mapDispatchToProps)(Rank);
