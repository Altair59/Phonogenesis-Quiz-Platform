import React from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import TopBar from "./TopBar.js"
import {withRouter} from "react-router-dom"
import {users, getUserByUsername, getStudentsByGroup} from "./User";


import "./ProfGroupPage.css";

class ProfGroupPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			newGroupName: '',
			err: false,
			trig: 0
		};
	}

	removeStudent = (group, stuObj) => {
		stuObj["groups"] = stuObj["groups"].filter(e => e !== group);
		this.forceUpdate();
	};


	createGroup = () => {
		let {state} = this.props.location;
		const prof = getUserByUsername(state.username);
		const name = document.getElementById("new-group-name-field").value;

		let reg = /^[0-9a-zA-Z]+[-]?[0-9a-zA-Z]+$/;

		if (prof.groups.includes(name)){
			alert("Group already exists!");
			this.setState({err: true});
		} else if (!reg.test(name)){
			alert("Group must be alphanumeric strings with an optional - in the middle!");
			this.setState({err: true});
		} else {
			prof.groups.push(name);
			alert("Successfully added group");
			this.setState({err: false})
		}
		this.forceUpdate();
	};

	removeGroup = (group) => {
		for (let i = 0; i < users.length; i++) {
			const user = users[i];
			if (user.type === "student" || user.type === "professor") {
				user["groups"] = user["groups"].filter(e => e !== group);
			}
		}
		this.forceUpdate();
	};

	onAddGroup = (group) => {
		const username = document.getElementById("add-input-".concat(group)).value;
		const user = getUserByUsername(username);

		if (!user) {
			alert("No user with given username found!");
			return;
		}

		if (user.type !== "student") {
			alert("Only student can be invited to group!");
			return;
		}

		if (user.groups.includes(group)) {
			alert("Student already in group!");
			return;
		}

		user.groups.push(group);
		alert("Student Added!");
		this.setState({trig: this.state.trig + 1});
		this.forceUpdate();
	};

	render() {
		let {state} = this.props.location;
		const prof = getUserByUsername(state.username);
		const groups = prof.groups;
		const groupMap = {};

		for (let gi = 0; gi < groups.length; gi++) {
			groupMap[groups[gi]] = getStudentsByGroup(groups[gi]);
		}

		return (
			<div>
				<TopBar {...state} />
				<Grid container id="prof-group-lst" direction="column" justify="flex-start" alignItems="flex-start">
					<Grid item>
						<h2>Create Group</h2>
						<TextField id="new-group-name-field" label="Name" error={this.state.err}
						           helperText={this.state.err ? "invalid group name" : ''}>Group Name</TextField>

						<IconButton onClick={this.createGroup}><AddIcon>Create Group</AddIcon></IconButton>
					</Grid>
					{
						groups.map((group) => (
							<Grid item key={group}>
								<Grid container spacing={2} direction="row" justify="flex-start" alignItems="center">
									<Grid item><h2>{group}</h2></Grid>
									<Grid item>
										<IconButton onClick={this.removeGroup.bind(this, group)}>
											<DeleteIcon>Remove</DeleteIcon></IconButton>
									</Grid>
								</Grid>
								<TableContainer component={Paper}>
									<Table aria-label="student table">
										<TableHead>
											<TableRow>
												<TableCell>Name</TableCell>
												<TableCell>Email</TableCell>
												<TableCell>Username</TableCell>
												<TableCell>Remove Student</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{
												groupMap[group].map((stuObj) => (
													<TableRow key={stuObj.username}>
														<TableCell>{stuObj.name}</TableCell>
														<TableCell>{stuObj.email}</TableCell>
														<TableCell>{stuObj.username}</TableCell>
														<TableCell>
															<IconButton
																onClick={this.removeStudent.bind(this, group, stuObj)}><DeleteIcon>Remove</DeleteIcon></IconButton>
														</TableCell>
													</TableRow>
												))
											}
										</TableBody>
									</Table>

									<form>
										<TextField id={"add-input-".concat(group)} label="Name">Name</TextField>
										<IconButton onClick={this.onAddGroup.bind(this, group)}><AddIcon>Add
											Student</AddIcon></IconButton>
									</form>
								</TableContainer>
							</Grid>
						))
					}
				</Grid>
			</div>
		)
	}
}

export default withRouter(ProfGroupPage);
