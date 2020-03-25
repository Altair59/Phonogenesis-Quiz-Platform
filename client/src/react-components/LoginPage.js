import React from "react";
import {withRouter} from "react-router-dom"
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import "./LoginPage.css";

const log = console.log;

/* Component for the Home page */
class LoginPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			err: false,
			username: "",
			password: ""
		};
	}

	login = (username, password) => {
		const info = {
			username: username,
			password: password
		};
		fetch("http://localhost:9000/users/login", {
			method: 'POST',
			body: JSON.stringify(info),
			headers: {
				Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
			}
		})
		.then(res => {
			if (res.status === 200) {
				return res.json()
			}
		})
		.then(json => {
			const newCookie = "username="+json.username
			document.cookie = newCookie;
			if (json.currentUser !== undefined && json.userType !== "") {
				this.props.app.setState({ currentUser: json.currentUser, userType: json.userType});
				console.log(this.props.app.state)
			}
		})
		.catch(error => {
			console.log(error);
		});
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
					<Button onClick={() => this.login(this.state.username, this.state.password)}>Login</Button>
				</div>
			</div>
		);
	}
}

export default withRouter(LoginPage);
