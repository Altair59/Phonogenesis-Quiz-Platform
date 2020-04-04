import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import "./mainstyle.css"

import {signUp, handleTextFieldChange} from '../actions/user'
import {withRouter} from "react-router-dom"

import "./SignUp.css";

class SignUp extends React.Component {
	state = {
		username: "",
		password: "",
		name: "",
		email: "",
		type: "",
	};


	changeSelected(event) {
		this.setState({
			type: event.currentTarget.textContent.toLowerCase()
		})
		console.log(this.state.type)
	}

	render() {
		const state = this.state;

		return (
			<div className="render-container">
				<div className="signUpForm">
					<div className="formList">
						<div className="form">
							<TextField
								id="username"
								label="Username"
								fullWidth={true}
								onChange={(e) => handleTextFieldChange(e, this)}
							/>
						</div>

						<div className="form">
							<TextField
								id="password"
								label="Password"
								fullWidth={true}
								onChange={(e) => handleTextFieldChange(e, this)}
							/>
						</div>

						<div className="form">
							<TextField
								id="name"
								label="Name"
								fullWidth={true}
								onChange={(e) => handleTextFieldChange(e, this)}
							/>
						</div>

						<div className="form">
							<TextField
								id="email"
								label="Email"
								fullWidth={true}
								onChange={(e) => handleTextFieldChange(e, this)}
							/>
						</div>

						<div className="form">
							<div className="select-button">
								<InputLabel id="type-label">Account Type</InputLabel>
								<Select fullWidth={true}
												value={state.type}
												onChange={(e) => this.changeSelected(e)}
												id={"type-sel"}>

										<MenuItem
											value={"student"}
										>
											Student
										</MenuItem>
										<MenuItem
											value={"professor"}
										>
											Professor
										</MenuItem>
									}
								</Select>
							</div>
						</div>
					</div>

					<div className="signUpButton">
						<Button  variant="contained" color="primary" onClick={() => signUp(this, state)}>Sign Up</Button>
					</div>

				</div>
			</div>
		)
	}
}

export default withRouter(SignUp)
