import React from "react";
import {useLocation} from "react-router-dom"
import Grid from '@material-ui/core/Grid';

import "./styles.css";

const Statistics = () => {

  const { state } = useLocation();
  return (
    <div>
      <h1>{state.name}</h1>
      <h3>Email: <span>{state.email}</span></h3>
      <h3>Enrolled: </h3>
      <br/>
      <h2>Activity History</h2>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
        </Grid>
        <Grid item>
        </Grid>
      </Grid>
    </div>
  );

}

export default Statistics;
