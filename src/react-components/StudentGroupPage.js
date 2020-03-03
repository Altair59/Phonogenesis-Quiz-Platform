import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {withRouter} from "react-router-dom";
import TopBar from "./TopBar.js";
import {getUserByName} from "./User";

import "./StudentGroupPage.css";

class StudentGroupPage extends React.Component {

  render() {
    const student = getUserByName(this.props.location.state.name);
    console.log(student.groups)
    return(
      <div>
        <TopBar {...this.props.location.state}></TopBar>
        <h1 className="title">Current Groups</h1>
        <div>
          <Grid container spacing={3} justify="flex-start" alignItems="flex-start" className="gridContainer">
          {
            student.groups.map((group, i) => {
              return(
                <Grid className="groupItem" item key={i}>
                  <Paper>
                    <h3>{group}</h3>
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        </div>
        <Divider />
        <h1 className="title">Invites</h1>
        <div>
          <Grid container spacing={3} justify="flex-start" alignItems="flex-start" className="gridContainer">
          {
            student.groups.map((group, i) => {
              return(
                <Grid className="groupItem" item key={i}>
                  <Paper>
                    <h3>{group}</h3>
                    <Button>
                      Accept Invite
                    </Button>
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        </div>
      </div>
    )
  }
}

export default withRouter(StudentGroupPage)
