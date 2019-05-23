import React, { Component } from "react";
import createGame from "./index";

class Canvas extends Component {
  componentDidMount() {
    createGame();
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div id="game" />;
  }
}

export default Canvas;
