import React, { Component } from "react";
import StockProfile from "./StockProfile";
import StockPrice from "./StockPrice";
import StockProfileTable from "./StockProfileTable";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
       
      <Router>
        <Routes>

          <Route path="/" element={<p>This is the home page</p>}></Route>
          <Route exact path="/stock-profile" element={<StockProfileTable/>} />
          <Route exact path="/stock-price" element={<StockPrice/>} />
        </Routes>
      </Router>

    );
  }
}