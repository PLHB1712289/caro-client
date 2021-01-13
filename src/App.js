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
import Profile from "./component/profile";
import UpdateProfile from "./component/updateProfile";
import ChangePassword from "./component/changePassword";
import UserDetail from "./component/userDetail";
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

          <Route path={"/auth/forgot-password"}>
            <ForgotPassword />
          </Route>
          <Route path={"/auth/get-user-by-id"}>
            <UserDetail />
          </Route>
          <Route path={"/auth/profile"}>
            <Profile/>
          </Route>
          <Route path={"/auth/update"}>
            <UpdateProfile/>
          </Route>
          <Route path={"/auth/change-password"}>
            <ChangePassword/>
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
