import React from "react";

const Background = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -50,
        backgroundColor: "rgba(2,13,24,0.9)",
      }}
    ></div>
  );
};

export default Background;
