import React from "react";

import TopBar from "./TopBar.js"
import {withRouter} from "react-router-dom"

import "./QuizGenerator.css";

class AdvancedGenerator extends React.Component {
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

export default withRouter(AdvancedGenerator);
