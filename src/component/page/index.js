import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import io from "socket.io-client";
import config from "../../config";
import Header from "../header";
import NotFound from "../notFound";
const socket = io(config.URL_SERVER, { transports: ["websocket"] });

const Page = () => {
  // React router hook
  const match = useRouteMatch();
  const history = useHistory();
  const [numOfOnlineUsers, setNumOfOnlineUsers] = useState(0);
  socket.on("updateNumOfOnlineUsers", (data) => setNumOfOnlineUsers(data));
  // component didmount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/sign-in");
      return;
    }
  }, [history]);

  return (
    <>
      <Header />
      <Switch>
        <Route path={`${match.url}profile`}>
          <div>Profile</div>
        </Route>
        <Route path={`${match.url}`} exact>
          <div>Home Page</div>
          <div>Số lượng người đang online: {numOfOnlineUsers}</div>
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default Page;
