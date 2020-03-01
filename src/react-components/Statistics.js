import React from "react";
import {useLocation} from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import QuizTile from "./QuizTile.js"
import TopBar from "./TopBar.js"

import "./Statistics.css";

const Statistics = () => {

  const { state } = useLocation();

  return (
    <div>
      <TopBar
        type={state.type}
        name={state.name}
        email={state.email}
        username={state.username}
        password={state.password}
      />
      <h1>{state ? state.name : "Anonymous"}</h1>
      <h3>Email: <span>{state ? state.email : "Undefined"}</span></h3>
      <h3>Enrolled: </h3>
      <br/>
      <h2>Activity History</h2>
      <div id="activities">
      <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <QuizTile quizId="1" score="17/20"></QuizTile>
          </Grid>
          <Grid item>
          </Grid>
      </Grid>
      </div>
    </div>
  );

}

export default Statistics;
