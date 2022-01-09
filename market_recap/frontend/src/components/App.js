import React, { Component } from "react";
import ReactDOM from "react-dom";
import HomePage from "./HomePage";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div>
            <HomePage />
          </div>
        );
      }

}
function bootstraptest(){
  return (
    <div>
  <div class="jumbotron text-center">
  <h1>My First Bootstrap Page</h1>
  <p>Resize this responsive page to see the effect!</p>
</div>
{/* 
<div class="container">
  <div class="row">
    <div class="col-sm-4">
      <h3>Column 1</h3>
      <p>Lorem ipsum dolor..</p>
    </div>
    <div class="col-sm-4">
      <h3>Column 2</h3>
      <p>Lorem ipsum dolor..</p>
    </div>
    <div class="col-sm-4">
      <h3>Column 3</h3>
      <p>Lorem ipsum dolor..</p>
    </div>
  </div>
</div> */}
</div>
);
}

const appDiv =  document.getElementById("app");

ReactDOM.render(<App />, appDiv);
ReactDOM.render(<bootstraptest />, document.getElementById("fm-component"));