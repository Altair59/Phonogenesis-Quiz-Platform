import React from "react";
import {useLocation} from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import QuizTile from "./QuizTile.js"
import TopBar from "./TopBar.js"
import Divider from "@material-ui/core/Divider"

import "./Statistics.css";

const Statistics = () => {

  const { user } = useLocation();

  return (
    <div>
      <TopBar user={user}></TopBar>
      <h1>{user ? user.name : "Anonymous"}</h1>
      <h3>Email: <span>{user ? user.email : "Undefined"}</span></h3>
      <h3>Enrolled: </h3>
      <Divider/>
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
