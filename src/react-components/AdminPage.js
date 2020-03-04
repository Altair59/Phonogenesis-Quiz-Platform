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
import {users, getUserByUsername} from "./User";
import TopBar from "./TopBar.js";
import {withRouter} from "react-router-dom";

import "./AdminPage.css";
import Grid from "@material-ui/core/Grid";

class AdminPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {currEdit: -1};
	}


	state = {
		redirect: null
	};
	addUser = e => {
		users.push({
			type: this.state.type,
			name: this.state.name,
			email: this.state.email,
			username: this.state.username,
			password: this.state.password,
			groups: []
		});
		this.setState({redirect: "/admin"});
	};

	editUser = i => {
		console.log(this.state);

		if (i === this.state.currEdit) {
			const newName = document.getElementById("edit-name".concat(i.toString())).value;
			const newEmail = document.getElementById("edit-email".concat(i.toString())).value;
			const newPassword = document.getElementById("edit-password".concat(i.toString())).value;
			const currUsername = document.getElementById("edit-username".concat(i.toString())).value;

			const currUser = getUserByUsername(currUsername);
			currUser.email = newEmail;
			currUser.name = newName;
			currUser.password = newPassword;

			this.setState({currEdit: -1});
		} else {

			this.setState({currEdit: i});
		}

	};

	removeUser = i => {
		users.splice(i, 1);
		this.setState({redirect: "/admin"});
	};

	handleTextFieldChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	render() {
		return (
			<div>
				<TopBar {...this.props.location.state}/>

				<Grid container id="admin-add-user" direction="row" alignItems="center" justify="center" spacing={3}>
					<Grid item><h3>Total User Count: <span id="userCount">{users.length}</span></h3></Grid>
					<Grid item><TextField
						id="type" variant="outlined"
						label="Type"
						onChange={this.handleTextFieldChange}
					/></Grid>
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
						label="Username"
						onChange={this.handleTextFieldChange}
					/></Grid>
					<Grid item><TextField
						id="password" variant="outlined"
						label="Password"
						onChange={this.handleTextFieldChange}
					/></Grid>
					<Grid item><Button variant="contained" color="primary" onClick={this.addUser}>Add User</Button></Grid>
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
							{users.map((row, i) => (
								<TableRow key={row.name}>
									<TableCell align="center"><TextField variant="outlined" disabled
									                                     align="center" defaultValue={row.type} required
									                                     id={"edit-type".concat(i.toString())}>{row.type}</TextField></TableCell>
									<TableCell align="center"><TextField variant="outlined"
									                                     disabled={this.state.currEdit !== i}
									                                     align="center" defaultValue={row.name} required
									                                     id={"edit-name".concat(i.toString())}>{row.name}</TextField></TableCell>
									<TableCell align="center"><TextField variant="outlined"
									                                     disabled={this.state.currEdit !== i}
									                                     align="center" defaultValue={row.email} required
									                                     id={"edit-email".concat(i.toString())}>{row.email}</TextField></TableCell>
									<TableCell align="center"><TextField variant="outlined" disabled required
									                                     align="center" defaultValue={row.username}
									                                     id={"edit-username".concat(i.toString())}>{row.username}</TextField></TableCell>
									<TableCell align="center"><TextField variant="outlined" required
									                                     disabled={this.state.currEdit !== i}
									                                     align="center" defaultValue={row.password}
									                                     id={"edit-password".concat(i.toString())}>{row.password}</TextField></TableCell>

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
										<Button variant="contained" onClick={this.removeUser.bind(this, i)}>
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
