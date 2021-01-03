import React from "react";
import "../../index.css";
import Square from "../square/square";

const size = 20;

const Board = ({ onClickCell, board }) => {
  const renderRow = (row) => {
    let valuesRow = [];
    for (let col = 0; col < size; col++) {
      valuesRow = valuesRow.concat(row * size + col);
    }
    return valuesRow.map((index, i) => {
      return (
        <Square
          value={board[index]}
          onClick={() => {
            onClickCell(index);
          }}
        />
      );
    });
  };
  const boardRender = () => {
    let rows = [];
    for (let row = 0; row < size; row++) {
      rows = rows.concat(row);
    }
    return rows.map((row, i) => {
      return (
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="board-row"
          key={i}
        >
          {renderRow(row)}
        </div>
      );
    });
  };

  return <div>{boardRender()}</div>;
};

export default Board;
