import React, { Component } from "react";
import App from "./App";
import Product from "./Product/Product";
import Results from "./Results/Results";
import { BrowserRouter as Router, Route } from "react-router-dom";

class Routes extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={App} />
            <Route exact path="/items/:id" component={Product} />
            <Route exact path="/items" component={Results} />
          </div>
        </Router>
      </div>
    );
  }
}

export default Routes;
