import React, { useEffect, useState } from "react";
import ItemHistoryGame from "../itemHistoryGame";
import useStyle from "./styleHistory";
import action from "../../storage/action";
import { connect } from "react-redux";
import HistoryDetailGame from "../historyDetailGame";

let prevListHistory = [
  { no: 1, id: "123", name: 123, player1: 123, player2: 123 },
  { no: 2, id: "124", name: 123, player1: 123, player2: 123 },
  { no: 3, id: "125", name: 123, player1: 123, player2: 123 },
  { no: 4, id: "126", name: 123, player1: 123, player2: 123 },
  { no: 5, id: "127", name: 123, player1: 123, player2: 123 },
  { no: 6, id: "128", name: 123, player1: 123, player2: 123 },
  { no: 7, id: "129", name: 123, player1: 123, player2: 123 },
  { no: 8, id: "130", name: 123, player1: 123, player2: 123 },
  { no: 9, id: "131", name: 123, player1: 123, player2: 123 },
  { no: 10, id: "132", name: 123, player1: 123, player2: 123 },
];

const HistoryGame = ({ turnOnLoading, turnOffLoading }) => {
  const classes = useStyle();

  const [listHistory, setListHistory] = useState(prevListHistory);

  const [listPage, setListPage] = useState(["<<", 1, 2, 3, ">>"]);
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
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      turnOffLoading();
    })();
    console.log("UPDATE PAGE", page);
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
        <div className={classes.column} style={{ width: "20%" }}>
          Room Name
        </div>
        <div className={classes.column} style={{ width: "25%" }}>
          Player1
        </div>
        <div className={classes.column} style={{ width: "25%" }}>
          Player2
        </div>
      </div>
      <div style={{ height: 490 }}>
        {listHistory.map((itemHistory, index) => (
          <ItemHistoryGame
            key={index}
            data={itemHistory}
            onClick={() => {
              setOpenGameHistory(true);
              setIdGame(itemHistory.id);
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
