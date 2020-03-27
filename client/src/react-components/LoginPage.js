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

import {login, handleTextFieldChange} from "../actions/user";

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

	render() {
		return (
			<div>
				<div className="loginForm">
					<Grid container spacing={1} alignItems="flex-end">
						<Grid item>
							<AccountCircle/>
						</Grid>
						<Grid item>
							<TextField
								id="username"
								label="Username"
								onChange={(e) => handleTextFieldChange(e, this)}
								error={this.state.err}
								helperText={this.state.err ? "Incorrect username or password" : ''}
							/>
						</Grid>
					</Grid>

					<div className="passwordForm">
						<TextField
							id="password"
							label="Password"
							onChange={(e) => handleTextFieldChange(e, this)}
							error={this.state.err}
							type={this.state.showPassword ? 'text' : 'password'}
							helperText={this.state.err ? "Incorrect username or password" : ''}
							InputProps={{
								endAdornment:
								<InputAdornment>
	                <IconButton
	                  onClick={() => this.setState({showPassword: !this.state.showPassword})}
	                >
	                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
	                </IconButton>
	              </InputAdornment>,
							}}
						/>

					</div>
					<div className="loginButton">
						<Button onClick={() => login(this, this.props)}>Login</Button>
					</div>
				</div>

				<div className="makeAccountButton">
					<Button onClick={() => this.props.history.push("/signup")}>Don't have an account? Sign up here.</Button>
				</div>
			</div>
		);
	}
}

export default withRouter(Login);
