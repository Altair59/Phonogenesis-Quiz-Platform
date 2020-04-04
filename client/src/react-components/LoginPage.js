import React from "react";
import {withRouter} from "react-router-dom"
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import "./LoginPage.css";

import {login} from "../actions/user";

class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			err: false,
			username: "",
			password: "",
			showPassword: false
		};
	}

	handleTextFieldChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	render() {
		return (
			<div id="render-container">
				<div className="loginForm">
					<div className="formItem">
						<Grid container spacing={1} justify="center" alignItems="flex-end">
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
					</div>

					<div className="formItem" id="passwordBox">
						<TextField
							id="password"
							label="Password"
							onChange={this.handleTextFieldChange}
							error={this.state.err}
							type={this.state.showPassword ? 'text' : 'password'}
							helperText={this.state.err ? "Incorrect username or password" : ''}
							InputProps={{
								endAdornment:
									<InputAdornment>
										<IconButton onClick={
											() => this.setState({showPassword: !this.state.showPassword})}>
											{this.state.showPassword ? <Visibility/> : <VisibilityOff/>}
										</IconButton>
									</InputAdornment>,
							}}
						/>
					</div>
					<div className="formItem">
						<Button variant="contained" color="primary"
						        onClick={() => login(this.props.app, this.state.username, this.state.password)}>Login</Button>
					</div>
				</div>

				<div className="makeAccountButton">
					<p>Don't have an account? Sign up<a href="/signup"> here</a>.</p>
				</div>
			</div>
		);
	}
}

export default withRouter(Login);
