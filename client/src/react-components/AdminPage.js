import React from "react";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import TopBar from "./TopBar.js";
import {withRouter} from "react-router-dom";
import {getUsers, removeUser, addUser, editUser} from "../actions/user";

import "./AdminPage.css";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import {Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

class AdminPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currEdit: -1,
			usernameError: "",
			users: [],
			apiResponse: null
		};

		getUsers(this);
	}

	editUser = i => {
		if (i === this.state.currEdit) {
			const newName = document.getElementById("edit-name".concat(i.toString())).value;
			const newEmail = document.getElementById("edit-email".concat(i.toString())).value;
			const newPassword = document.getElementById("edit-password".concat(i.toString())).value;
			const currUsername = document.getElementById("edit-username".concat(i.toString())).value;

			const info = {
				name: newName,
				type: this.state.users[i].type,
				username: currUsername,
				password: newPassword,
				email: newEmail,
				groups: this.state.users[i].groups,
				quizzes: this.state.users[i].quizzes
			};
			editUser(this, this.state.users[i].username, info);
			this.setState({currEdit: -1});
		} else {
			this.setState({currEdit: i});
		}
	};

	handleTextFieldChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	onTypeChange = (e) => {
		this.setState({type: e.target.value});
	};

	render() {
		return (
			<div>
				<TopBar/>

				<Grid container id="admin-add-user" direction="row" alignItems="center" justify="center" spacing={3}>
					<Grid item><h3>Total User Count: <span id="userCount">{this.state.users.length}</span></h3></Grid>
					<Grid item><FormControl variant="outlined">
						<InputLabel className="text-field-label-off">Type</InputLabel>
						<Select value={"student"} onChange={this.onTypeChange}>
							<MenuItem value={"student"}>student</MenuItem>
							<MenuItem value={"professor"}>professor</MenuItem>
						</Select>
					</FormControl></Grid>
					<Grid item><TextField
						id="name" variant="outlined"
						label="Name"
						onChange={this.handleTextFieldChange}
					/></Grid>
					<Grid item><TextField
						id="email" variant="outlined"
						label="Email"
						onChange={this.handleTextFieldChange}
					/></Grid>
					<Grid item><TextField
						id="username" variant="outlined"
						label="Username" error={this.state.usernameError !== ""} helperText={this.state.usernameError}
						onChange={this.handleTextFieldChange}
					/></Grid>
					<Grid item><TextField
						id="password" variant="outlined"
						label="Password"
						onChange={this.handleTextFieldChange}
					/></Grid>
					<Grid item><Button variant="contained" color="primary" onClick={addUser(this,this.state.username)}>Add
						User</Button></Grid>
				</Grid>
				<br/>
				<hr/>
				<br/>
				<TableContainer component={Paper}>
					<Table className="table" aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="center">Type</TableCell>
								<TableCell align="center">Name</TableCell>
								<TableCell align="center">Email</TableCell>
								<TableCell align="center">Username</TableCell>
								<TableCell align="center">Password</TableCell>
								<TableCell align="center">Edit User</TableCell>
								<TableCell align="center">Remove User</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.state.users.map((user, i) => (
								<TableRow key={user.name}>
									<TableCell align="center"><TextField variant="outlined" disabled
									                                     align="center" defaultValue={user.type}
									                                     required
									                                     id={"edit-type".concat(i.toString())}>{user.type}</TextField></TableCell>
									<TableCell align="center"><TextField variant="outlined"
									                                     disabled={this.state.currEdit !== i}
									                                     align="center" defaultValue={user.name}
									                                     required
									                                     id={"edit-name".concat(i.toString())}>{user.name}</TextField></TableCell>
									<TableCell align="center"><TextField variant="outlined"
									                                     disabled={this.state.currEdit !== i}
									                                     align="center" defaultValue={user.email}
									                                     required
									                                     id={"edit-email".concat(i.toString())}>{user.email}</TextField></TableCell>
									<TableCell align="center"><TextField variant="outlined" disabled required
									                                     align="center" defaultValue={user.username}
									                                     id={"edit-username".concat(i.toString())}>{user.username}</TextField></TableCell>
									<TableCell align="center"><TextField variant="outlined" required
									                                     disabled={this.state.currEdit !== i}
									                                     align="center" defaultValue={user.password}
									                                     id={"edit-password".concat(i.toString())}>{user.password}</TextField></TableCell>

									<TableCell align="center">
										{
											i === this.state.currEdit ?
												<Button variant="contained" onClick={this.editUser.bind(this, i)}
												        className={"admin-apply-but"}>Apply</Button> :
												<Button variant="contained" onClick={this.editUser.bind(this, i)}
												        className={"admin-edit-but"}>Edit</Button>
										}
									</TableCell>
									<TableCell align="center">
										<Button variant="contained" disabled={user.type === "admin"}
										        onClick={removeUser(this, user.username)}>
											Remove
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		);
	}
}

export default withRouter(AdminPage);
