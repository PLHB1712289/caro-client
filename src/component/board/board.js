import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../index.css";

import Square from "../square/square";
import APIService from "./apiService";

const size = 30;
const Board = () => {
  const [squares, setSquares] = useState(Array(size * size).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    APIService.getGame(id).then((game) => {
      // if (squares) {
      // do sth
      // }
    });
  }, [id]);

  const handleClick = (i) => {
    const squaresTemp = squares.slice();
    const res = calculateWinner(squaresTemp);
    if (res || squaresTemp[i]) {
      return res;
    }
    squaresTemp[i] = xIsNext ? "X" : "O";
    setSquares(squaresTemp);
    setXIsNext(!xIsNext);

    APIService.makeAMove(i, id);
  };

  const renderRow = (row) => {
    let valuesRow = [];
    for (let col = 0; col < size; col++) {
      valuesRow = valuesRow.concat(row * size + col);
    }
    return valuesRow.map((index, i) => {
      return (
        <Square value={squares[index]} onClick={() => handleClick(index)} />
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
        <div className="board-row" key={i}>
          {renderRow(row)}
        </div>
      );
    });
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + squares[winner];
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div>
      <div className="status">{status}</div>
      {boardRender()}
    </div>
  );
};

const calculateWinner = (squares) => {
  for (let i = 0; i < squares.length; i++) {
    let res = checkWin(squares, i);
    if (res !== -1) {
      return res;
    }
  }
  return null;
};
const checkWin = (squares, index) => {
  let res = checkTopLeft(squares, index);

  if (res !== -1) {
    return res;
  }
  res = checkTop(squares, index);
  if (res !== -1) {
    return res;
  }
  res = checkTopRight(squares, index);
  if (res !== -1) {
    return res;
  }
  res = checkBottom(squares, index);
  if (res !== -1) {
    return res;
  }
  res = checkBottomLeft(squares, index);
  if (res !== -1) {
    return res;
  }
  res = checkBottomRight(squares, index);
  if (res !== -1) {
    return res;
  }
  res = checkRight(squares, index);
  if (res !== -1) {
    return res;
  }
  res = checkLeft(squares, index);
  if (res !== -1) {
    return res;
  }
  return -1;
};

const checkLeft = (squares, index) => {
  //check existed
  if (
    squares[index - 1] &&
    squares[index - 2] &&
    squares[index - 3] &&
    squares[index - 4]
  ) {
    if (
      squares[index] === squares[index - 1] &&
      squares[index - 1] === squares[index - 2] &&
      squares[index - 2] === squares[index - 3] &&
      squares[index - 3] === squares[index - 4]
    ) {
      return index;
    }
  }
  return -1;
};
const checkRight = (squares, index) => {
  //check existed
  if (
    squares[index + 1] &&
    squares[index + 2] &&
    squares[index + 3] &&
    squares[index - +4]
  ) {
    if (
      squares[index] === squares[index + 1] &&
      squares[index + 1] === squares[index + 2] &&
      squares[index + 2] === squares[index + 3] &&
      squares[index + 3] === squares[index + 4]
    ) {
      return index;
    }
  }
  return -1;
};
const checkTopLeft = (squares, index) => {
  //check existed
  if (
    squares[index - (size + 1)] &&
    squares[index - (size + 1) * 2] &&
    squares[index - (size + 1) * 3] &&
    squares[index - (size + 1) * 4]
  ) {
    if (
      squares[index] === squares[index - (size + 1)] &&
      squares[index - (size + 1)] === squares[index - (size + 1) * 2] &&
      squares[index - (size + 1) * 2] === squares[index - (size + 1) * 3] &&
      squares[index - (size + 1) * 3] === squares[index - (size + 1) * 4]
    ) {
      return index;
    }
  }
  return -1;
};

const checkTopRight = (squares, index) => {
  //check existed
  if (
    squares[index - (size - 1)] &&
    squares[index - (size - 1) * 2] &&
    squares[index - (size - 1) * 3] &&
    squares[index - (size - 1) * 4]
  ) {
    if (
      squares[index] === squares[index - (size - 1)] &&
      squares[index - (size - 1)] === squares[index - (size - 1) * 2] &&
      squares[index - (size - 1) * 2] === squares[index - (size - 1) * 3] &&
      squares[index - (size - 1) * 3] === squares[index - (size - 1) * 4]
    ) {
      return index;
    }
  }
  return -1;
};
const checkTop = (squares, index) => {
  //check existed
  if (
    squares[index - size] &&
    squares[index - size * 2] &&
    squares[index - size * 3] &&
    squares[index - size * 4]
  ) {
    if (
      squares[index] === squares[index - size] &&
      squares[index - size] === squares[index - size * 2] &&
      squares[index - size * 2] === squares[index - size * 3] &&
      squares[index - size * 3] === squares[index - size * 4]
    ) {
      return index;
    }
  }
  return -1;
};
const checkBottomLeft = (squares, index) => {
  //check existed
  if (
    squares[index + (size - 1)] &&
    squares[index + (size - 1) * 2] &&
    squares[index + (size - 1) * 3] &&
    squares[index + (size - 1) * 4]
  ) {
    if (
      squares[index] === squares[index + (size - 1)] &&
      squares[index + (size - 1)] === squares[index + (size - 1) * 2] &&
      squares[index + (size - 1) * 2] === squares[index + (size - 1) * 3] &&
      squares[index + (size - 1) * 3] === squares[index + (size - 1) * 4]
    ) {
      return index;
    }
  }
  return -1;
};
const checkBottom = (squares, index) => {
  //check existed
  if (
    squares[index + size] &&
    squares[index + size * 2] &&
    squares[index + size * 3] &&
    squares[index + size * 4]
  ) {
    if (
      squares[index] === squares[index + size] &&
      squares[index + size] === squares[index + size * 2] &&
      squares[index + size * 2] === squares[index + size * 3] &&
      squares[index + size * 3] === squares[index + size * 4]
    ) {
      return index;
    }
  }
  return -1;
};
const checkBottomRight = (squares, index) => {
  //check existed
  if (
    squares[index + (size + 1)] &&
    squares[index + (size + 1) * 2] &&
    squares[index + (size + 1) * 3] &&
    squares[index + (size + 1) * 4]
  ) {
    if (
      squares[index] === squares[index + size + 1] &&
      squares[index + (size + 1)] === squares[index + (size + 1) * 2] &&
      squares[index + (size + 1) * 2] === squares[index + (size + 1) * 3] &&
      squares[index + (size + 1) * 3] === squares[index + (size + 1) * 4]
    ) {
      return index;
    }
  }
  return -1;
};
export default Board;
