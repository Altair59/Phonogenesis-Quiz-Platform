import React from "react";
import {withRouter} from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import QuizTile from "./QuizTile.js"
import TopBar from "./TopBar.js"
import Divider from "@material-ui/core/Divider"

class StudentMain extends React.Component {

  render() {
    let { state } = this.props.location;
    return (
      <div>
        <TopBar {...state}/>
        <h1>{state.name ? state.name : "Anonymous"}</h1>
        <h3>Email: <span>{state.email ? state.email : "Undefined"}</span></h3>
        <h3>Enrolled: </h3>
        <Divider/>
        <h2>Activity History</h2>
        <div id="activities">
        <Grid container spacing={1} alignItems="flex-end">
            {state.quizzes.map((quiz, i) => {
              return(
                <Grid item>
                  <QuizTile {...quiz} />
                </Grid>
              );
            })}
        </Grid>
        </div>
      </div>
    );
  }

}

export default withRouter(StudentMain);
