import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';

import "./styles.css";

/* Component for the Home page */
class Login extends React.Component {
  render() {
    return (
      <div className="loginForm">
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
          <TextField
            id="username"
            label="Username"
          />
          </Grid>
        </Grid>

        <div className="passwordForm">
          <TextField
            id="password"
            label="Password"
          />
        </div>
        <div className="loginButton">
          <Button>Login</Button>
        </div>
      </div>
    );
  }
}

export default Login;
