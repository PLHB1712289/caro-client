import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ForgotPassword from "./component/forgotPassword";
import Game from "./component/game";
import Header from "./component/header";
import HomePage from "./component/homePage";
import Loading from "./component/loading";
import NotFound from "./component/notFound";
import SignIn from "./component/signIn";
import SignUp from "./component/signUp";
// import realtime from "./realtime";
import Background from "./component/background";

function App() {
  // useEffect(() => {
  //   realtime.connect();
  // }, []);

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
