import React from "react";
import {withRouter} from "react-router-dom"
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import {users} from "./User"
import "./LoginPage.css";

/* Component for the Home page */
class LoginPage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          err: false,
          user: null
      };
    }

    login = e => {
        let filtered_user = users.filter(user => user.username === this.state.username);
        if (filtered_user.length === 1) {
            if (filtered_user[0].password === this.state.password) {
              if (filtered_user[0].type === "student") {
                this.props.history.push({
                  pathname: '/' + filtered_user[0].type,
                  state: {
                    id: filtered_user[0].id,
                    type: filtered_user[0].type,
                    name: filtered_user[0].name,
                    email: filtered_user[0].email,
                    username: filtered_user[0].username,
                    password: filtered_user[0].password,
                    quizzes: []
                  }
                });
              } else {
                this.props.history.push({
                  pathname: '/' + filtered_user[0].type,
                  state: {
                    id: filtered_user[0].id,
                    type: filtered_user[0].type,
                    name: filtered_user[0].name,
                    email: filtered_user[0].email,
                    username: filtered_user[0].username,
                    password: filtered_user[0].password
                  }
                });
              }
            } else {
                this.setState({err: true})
            }
        } else if (filtered_user.length === 0) {
            this.setState({err: true})
        }
    };


  handleTextFieldChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

  render() {
		return (
			<div className="loginForm">
				<Grid container spacing={1} alignItems="flex-end">
					<Grid item>
						<AccountCircle/>
					</Grid>
					<Grid item>
						<TextField
							id="username"
							label="Username"
							onChange={this.handleTextFieldChange}
							error={this.state.err}
							helperText={this.state.err ? "Incorrect username or password" : ''}
						/>
					</Grid>
				</Grid>

				<div className="passwordForm">
					<TextField
						id="password"
						label="Password"
						onChange={this.handleTextFieldChange}
						error={this.state.err}
						helperText={this.state.err ? "Incorrect username or password" : ''}
					/>
				</div>
				<div className="loginButton">
					<Button onClick={this.login}>Login</Button>
				</div>
			</div>
		);
	}
}

export default withRouter(LoginPage);
