import React from "react";
import {withRouter} from "react-router-dom"
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import "./LoginPage.css";

import {login} from "../actions/user";

class Login extends React.Component {

	constructor(props) {
		super(props);
		this.props.history.push("/login");
		this.state = {
			err: false,
			username: "",
			password: ""
		};
	}

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
					<Button onClick={() => login(this, this.props)}>Login</Button>
				</div>
			</div>
		);
	}
}

export default withRouter(Login);
