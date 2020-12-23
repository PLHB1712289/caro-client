import { Button } from "@material-ui/core";
import React from "react";
import Chat from "../chat";

const InfoGame = () => {
  return (
    <div
      style={{
        width: "100%",
        background: "#01060a",
        padding: 10,
        borderRadius: 5,
        color: "white",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontWeight: 700,
        }}
      >
        STATUS
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontWeight: 600,
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: 5,
        }}
      >
        <div
          style={{
            margin: "5px 0",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: 10,
              width: "100%",
              textAlign: "center",
            }}
          >
            Player1 - X
          </div>
          <div
            style={{
              width: "50%",
              width: "100%",
              height: 50,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>baobao</div>
            <div style={{ fontSize: "0.7rem" }}>id: 12345</div>
          </div>
          <div
            style={{
              padding: 10,
              width: "100%",
              textAlign: "center",
            }}
          >
            05:00
          </div>
        </div>
        <div
          style={{
            margin: "5px 0",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: 10,
              width: "100%",
              textAlign: "center",
            }}
          >
            Player2 - O
          </div>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.3)",
              width: "100%",
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div>phanbao_091jaa</div>
            <div style={{ fontSize: "0.7rem" }}>id: 38384ns</div>
          </div>
          <div
            style={{
              padding: 10,
              width: "100%",
              textAlign: "center",
            }}
          >
            05:00
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "10px 0",
          borderRadius: 5,
          backgroundColor: "rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            fontWeight: 600,
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            width: "100%",
            textAlign: "center",
          }}
        >
          HISTORY
        </div>
        <div
          style={{
            width: "100%",
            height: "20vh",
            overflowX: "auto",
            padding: 5,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              margin: "5px 0",
            }}
          >
            1
          </div>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              margin: "5px 0",
            }}
          >
            1
          </div>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              margin: "5px 0",
            }}
          >
            1
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Button
          style={{
            background: "rgba(255,255,255,0.7)",
            fontWeight: 700,
            margin: 3,
            width: "20%",
          }}
        >
          Start
        </Button>
        <Button
          style={{
            background: "rgba(255,255,255,0.7)",
            fontWeight: 700,
            margin: 3,
            width: "20%",
          }}
        >
          Exit
        </Button>
        <Button
          style={{
            background: "rgba(255,255,255,0.7)",
            fontWeight: 700,
            margin: 3,
            width: "20%",
          }}
        >
          Start
        </Button>
        <Button
          style={{
            background: "rgba(255,255,255,0.7)",
            fontWeight: 700,
            margin: 3,
            width: "20%",
          }}
        >
          Start
        </Button>
      </div>
      <Chat />
    </div>
  );
};

export default InfoGame;
