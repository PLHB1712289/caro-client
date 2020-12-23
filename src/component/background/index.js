import React from "react";
import background from "../../assert/img/background.jpg";
import background2 from "../../assert/img/bg2.jpg";
import background3 from "../../assert/img/bg3.jpg";

const Background = () => {
  return (
    <div>
      <img
        style={{
          height: "100vh",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -100,
        }}
      />
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
    </div>
  );
};

export default Background;
