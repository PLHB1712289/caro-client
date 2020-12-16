import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import io from "socket.io-client";
import config from "../../config";
import Header from "../header";
import NotFound from "../notFound";
import SOCKET_TAG from "./dataConst";
import CreateNewGame from "../createGame";
import Game from "../game/game";
import AccessGame from "../accessGame/accessGame";
const Page = () => {
  // React router hook
  const match = useRouteMatch();
  const history = useHistory();
  const [numOfOnlineUsers, setNumOfOnlineUsers] = useState(0);
  const [socket, setSocket] = useState(null);

  // component didmount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/sign-in");
      return;
    }
  }, [history]);

  // setup socket.io
  useEffect(() => {
    // create new connection
    const newSocket = io(`${config.URL_SERVER}`, { transports: ["websocket"] });

    // setup event recieve data from server
    newSocket.on(SOCKET_TAG.RESPONSE_UPDATE_USER_ONLINE, ({ numberUser }) => {
      setNumOfOnlineUsers(numberUser);
    });

    // update socket
    setSocket(newSocket);

    // disconnect
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route path={`${match.url}profile`}>
          <div>Profile</div>
        </Route>

        <Route path={`${match.url}game/:id`}>
          <Game socket={socket} />
        </Route>

        <Route path={`${match.url}`} exact>
          <div>Home Page</div>
          <div>Số lượng người đang online: {numOfOnlineUsers}</div>
          <CreateNewGame />
          <AccessGame />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default Page;
