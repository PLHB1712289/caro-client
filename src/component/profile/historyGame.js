import React, { useEffect, useState } from "react";
import ItemHistoryGame from "../itemHistoryGame";
import useStyle from "./styleHistory";
import action from "../../storage/action";
import { connect } from "react-redux";
import HistoryDetailGame from "../historyDetailGame";

import apiService from "./apiService";

let prevListHistory = [
  {
    no: 1,
    id: "123",
    name: 123,
    player1: 123,
    player2: 123,
    date: "10:30 - 10/03/2020",
  },
  {
    no: 2,
    id: "124",
    name: 123,
    player1: 123,
    player2: 123,
    date: "10:30 - 10/03/2020",
  },
  {
    no: 3,
    id: "125",
    name: 123,
    player1: 123,
    player2: 123,
    date: "10:30 - 10/03/2020",
  },
  {
    no: 4,
    id: "126",
    name: 123,
    player1: 123,
    player2: 123,
    date: "10:30 - 10/03/2020",
  },
  {
    no: 5,
    id: "127",
    name: 123,
    player1: 123,
    player2: 123,
    date: "10:30 - 10/03/2020",
  },
  {
    no: 6,
    id: "128",
    name: 123,
    player1: 123,
    player2: 123,
    date: "10:30 - 10/03/2020",
  },
  {
    no: 7,
    id: "129",
    name: 123,
    player1: 123,
    player2: 123,
    date: "10:30 - 10/03/2020",
  },
  {
    no: 8,
    id: "130",
    name: 123,
    player1: 123,
    player2: 123,
    date: "10:30 - 10/03/2020",
  },
  {
    no: 9,
    id: "131",
    name: 123,
    player1: 123,
    player2: 123,
    date: "10:30 - 10/03/2020",
  },
  {
    no: 10,
    id: "132",
    name: 123,
    player1: 123,
    player2: 123,
    date: "10:30 - 10/03/2020",
  },
];

const HistoryGame = ({ turnOnLoading, turnOffLoading }) => {
  const classes = useStyle();

  const [listHistory, setListHistory] = useState(prevListHistory);

  const [listPage, setListPage] = useState([1, 2, 3]);
  const [page, setPage] = useState(1);
  const [filterByID, setFilterByID] = useState("");
  const [openGameHistory, setOpenGameHistory] = useState(false);
  const [idGame, setIdGame] = useState(null);

  const _handleChangeFilter = (e) => {
    const value = e.target.value;
    setFilterByID(value);

    if (value) {
      setListHistory((prev) => {
        return prev.filter((itemHistory) => {
          if (itemHistory.id.search(value) !== -1) return itemHistory;
          return null;
        });
      });
    } else {
      setListHistory(prevListHistory);
    }
  };
  useEffect(() => {
    turnOnLoading();
    (async () => {
      const { success, data } = await apiService.getHistoryGame(page);
      if (success) {
        setListHistory(data.listGame);

        let maxPage = ~~(data.totalItem / 10);

        maxPage += data.totalItem % 10 !== 0 ? 1 : 0;

        const newListPage = [];
        for (let i = 0; i < maxPage; i++) {
          newListPage.push(i + 1);
        }
        setListPage(newListPage);
      }
      // console.log(data);
      turnOffLoading();
    })();
    console.log("UPDATE PAGE", page);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // useEffect(()=>{},[filter])

  return (
    <div>
      <HistoryDetailGame
        open={openGameHistory}
        setOpen={setOpenGameHistory}
        idGame={idGame}
      />
      <div className={classes.container} onClick={() => {}}>
        <div className={classes.column} style={{ width: "5%" }}>
          No
        </div>
        <div
          className={classes.column}
          style={{ width: "25%", display: "flex", justifyContent: "center" }}
        >
          <div style={{ marginRight: 5 }}>ID</div>
          <input value={filterByID} onChange={_handleChangeFilter} />
        </div>
        <div className={classes.column} style={{ width: "15%" }}>
          Room Name
        </div>
        <div className={classes.column} style={{ width: "17.5%" }}>
          Player1
        </div>
        <div className={classes.column} style={{ width: "17.5%" }}>
          Player2
        </div>
        <div className={classes.column} style={{ width: "20%" }}>
          Date
        </div>
      </div>
      <div style={{ height: 490 }}>
        {listHistory.map((itemHistory, index) => (
          <ItemHistoryGame
            key={index}
            data={{
              ...itemHistory,
              no: index + 1 + 10 * (page - 1),
              name: "Room Name",
            }}
            onClick={() => {
              setOpenGameHistory(true);
              setIdGame(itemHistory._id);
              // alert("Hello");
            }}
          />
        ))}
      </div>
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: 10,
          marginTop: 10,
          display: "flex",
          color: "white",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "30%" }}></div>
        <div style={{ width: "40%", textAlign: "center" }}>
          {listPage.map((itemPage, index) => (
            <button
              key={index}
              style={{
                margin: "0 4px",
                cursor: "pointer",
                background: `${itemPage === page ? "green" : ""}`,
              }}
              onClick={() => setPage(itemPage)}
            >
              {itemPage}
            </button>
          ))}
        </div>

        <div style={{ width: "30%", textAlign: "end", paddingRight: 10 }}>
          Page {page}
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

export default connect(() => ({}), mapDispatchToProps)(HistoryGame);
