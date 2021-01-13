import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ForgotPassword from "./component/forgotPassword";
import Game from "./component/game";
import Header from "./component/header";
import HomePage from "./component/homePage";
import Loading from "./component/loading";
import NotFound from "./component/notFound";
import SignIn from "./component/signIn";
import SignUp from "./component/signUp";
import Profile from "./component/profile";
import UpdateProfile from "./component/updateProfile";
import ChangePassword from "./component/changePassword";

import Background from "./component/background";

import { connect } from "react-redux";
import action from "./storage/action";

function App({ updateToken }) {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      updateToken(localStorage.getItem("token"));
    }
    //
  }, []);

  return (
    <Router>
      <Loading>
        <Background />
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
            <Profile />
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

export default connect(
  (state) => ({ token: state.token }),
  (dispatch) => ({
    updateToken: (token) => dispatch(action.TOKEN.update(token)),
  })
)(App);
