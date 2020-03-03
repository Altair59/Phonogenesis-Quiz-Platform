import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import {withRouter} from "react-router-dom";

class StudentGroupPage extends React.Component {

  render() {
    return(
      <div>
        <h3>Current Groups</h3>
        <Grid container spacing={3} justify="flex-start" alignItems="flex-start">
          {}
        </Grid>
        <Divider />
        <h3> Invites </h3>
        <Grid container spacing={3} justify="flex-start" alignItems="flex-start">
          {}
        </Grid>
      </div>
    )
  }
}
