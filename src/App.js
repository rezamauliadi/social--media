import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import Home from "src/pages/Home";
import Friends from "src/pages/Friends";
import User from "src/pages/User";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={Friends} />
        <Route path="/users/:userId" component={User} />
      </Router>
    );
  }
}

export default App;
