import React from "react";
import "../../index.css";

const Square = ({ onClick, value }) => {
  const color = value === "X" ? "red" : "green";
  return (
    <button
      className="square"
      onClick={onClick}
      style={{
        background: "rgba(255,255,255,0.07)",
        color: color,
        border: "1px solid rgba(255,255,255,0.25)",
      }}
    >
      {value}
    </button>
  );
};

export default Square;
