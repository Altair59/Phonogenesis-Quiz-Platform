import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TopBar from "./TopBar.js"
import {withRouter} from "react-router-dom"

import "./QuizGenerator.css";

class QuizGenerator extends React.Component {
  render() {
    return(
      <div>
        <TopBar {...this.props.location.state}> </TopBar>
        <h1>Quiz Generator</h1>
        <h3>Inst</h3>
      </div>
    )
  }
}

export default withRouter(QuizGenerator);
