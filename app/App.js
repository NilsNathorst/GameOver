import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Pages
import Game from "./pages/Game";

const App = () => (
  <Fragment>
    <Router>
      <Route exact path='/' render={() => <h1>Start</h1>} />
      <Route path='/game' component={Game} />
    </Router>
  </Fragment>
);

export default App;
