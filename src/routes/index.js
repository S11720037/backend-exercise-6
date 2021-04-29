import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Register, Login } from "../pages";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
