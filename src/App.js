import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ForgotPassword from "./component/forgotPassword";
import Header from "./component/header";
import HomePage from "./component/homePage";
import NotFound from "./component/notFound";
import SignUp from "./component/signUp";
import SignIn from "./component/signIn";
import Game from "./component/game";
import Loading from "./component/loading";

function App() {
  return (
    <Router>
      <Loading>
        <Header />

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

          <Route path={"/profile"}>
            <div>Profile</div>
          </Route>

          <Route path={"/game/:id"}>
            <Game />
          </Route>

          <Route path={"/player/:id"}>
            <div>Player</div>
          </Route>

          <Route path={"/"}>
            <HomePage />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Loading>
    </Router>
  );
}

export default App;
