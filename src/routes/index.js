import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Register } from "../pages";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
