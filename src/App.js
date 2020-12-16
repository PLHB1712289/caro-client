import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./component/signIn";
import SignUp from "./component/signUp";
import Page from "./component/page";
import NotFound from "./component/notFound";
import ForgotPassword from "./component/forgotPassword";
import Board from "../src/component/board/board";
import Game from "./component/game/game";
import CreateNewGame from "./component/createGame";
import AccessGame from "./component/accessGame/accessGame";
function App() {
  return (
    <Router>
      <Switch>
        <Route path={"/sign-in"}>
          <SignIn />
        </Route>

        <Route path={"/sign-up"}>
          <SignUp />
        </Route>

        <Route path={"/forgot-password"}>
          <ForgotPassword />
        </Route>

        <Route path={"/new-game"}>
          <CreateNewGame />
        </Route>

        <Route path={"/game/:id"}>
          <Board />
        </Route>

        <Route path={"/"}>
          <Page />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
