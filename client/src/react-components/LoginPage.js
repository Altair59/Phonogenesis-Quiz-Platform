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
          user: null,
	      apiResponse: []
      };
    }

	callAPI(email, password) {
    	const info = {
    		email: email,
		    password: password
	    };
		fetch("http://localhost:9000/users/login", {method: 'POST', body: info})
			.then(res => this.setState({ apiResponse: res }));
	}

	componentWillMount() {
		this.callAPI();
	}

    login = () => {

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
