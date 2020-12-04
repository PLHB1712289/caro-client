import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Header from "../header";
import NotFound from "../notFound";

const Page = () => {
  const match = useRouteMatch();
  return (
    <>
      <Header />
      <Switch>
        <Route path={`${match.url}profile`}>
          <div>Profile</div>
        </Route>

        <Route path={`${match.url}`} exact>
          <div>Home Page</div>
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default Page;
