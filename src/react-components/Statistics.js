import React from "react";
import {useLocation} from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import QuizTile from "./QuizTile.js"

import "./Statistics.css";

const Statistics = () => {

  const { state } = useLocation();

  return (
    <div>
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
