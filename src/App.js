import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";

import Home from "src/pages/Home";
import Friends from "src/pages/Friends";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/friends" component={Friends} />
      </Router>
    );
  }
}

export default App;
