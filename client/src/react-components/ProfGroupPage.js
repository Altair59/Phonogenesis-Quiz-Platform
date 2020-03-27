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
import {removeGroup, getGroups, addGroup, editGroup, findUGroup} from "../actions/group";
import {getUsers, editUser, findUser} from "../actions/user";


import "./ProfGroupPage.css";

class ProfGroupPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			newGroupName: '',
			err: false,
			trig: 0,
			groupsWithStuObj: [],
			groupsWithStuName: [],
			users: []
		};
		getUsers(this);
		getGroups(this);
		console.log(this.state.groupsWithStuName)
	}

	addToGroup = (group) => {
		const username = document.getElementById("add-input-".concat(group.name)).value;
		const user = findUser(this,username);

		if (!user) {
			alert("No user with given username found!");
			return;
		}

		if (user.type !== "student") {
			alert("Only student can be invited to group!");
			return;
		}

		if (user.groups.includes(group.name)) {
			alert("Student already in group!");
			return;
		}
		user.groups.push(group.name);
		const userInfo = {
			name: user.name,
			type: user.type,
			username: user.username,
			password: user.password,
			email: user.email,
			groups: user.groups,
			quizzes: user.quizzes
		};
		editUser(this,user.username, userInfo);

		group.students.push(username);
		const groupInfo = {
			name: group.name,
			students: group.students,
			owner: group.owner
		};
		editGroup(this,group.name,groupInfo);

		alert("Student Added!");
		this.setState({trig: this.state.trig + 1});
		this.forceUpdate();
	};

	removeStudent = (group, user) => {
		user.groups = user.groups.filter(e => e !== group.name);
		const userInfo = {
			name: user.name,
			type: user.type,
			username: user.username,
			password: user.password,
			email: user.email,
			groups: user.groups,
			quizzes: user.quizzes
		};
		editUser(this,user.username, userInfo);

		group.students = group.students.filter(e => e !== user.username);
		const groupInfo = {
			name: group.name,
			students: group.students,
			owner: group.owner
		};
		editGroup(this,group.name,groupInfo);

		this.forceUpdate();
	};


	createGroup = () => {
		const name = document.getElementById("new-group-name-field").value;

		let reg = /^[0-9a-zA-Z]+[-]?[0-9a-zA-Z]+$/;

		if (!reg.test(name)) {
			alert("Group must be alphanumeric strings with an optional - in the middle!");
			this.setState({err: true});
		} else {
			const info = {
				name: name,
				owner: this.props.app.state.currentUser.username
			};
			addGroup(this, info);
			const prof = this.props.app.state.currentUser;
			prof.groups.push(name);
			const profInfo = {
				name: prof.name,
				type: prof.type,
				username: prof.username,
				password: prof.password,
				email: prof.email,
				groups: prof.groups,
				quizzes: prof.quizzes
			};
			editUser(this, prof.username, profInfo);
			alert("Successfully added group");
			this.setState({err: false})
		}
		this.forceUpdate();
	};

	removeGroup = (group) => {
		for (let i = 0; i < group.students.length; i++) {
			const user = group.students[i];
			if (user.type === "student" || user.type === "professor") {
				const info = {
					name: user.name,
					type: user.type,
					username: user.username,
					password: user.password,
					email: user.email,
					groups: user.groups.filter(e => e !== group.name),
					quizzes: user.quizzes
				};
				editUser(this, user.username, info);
			}
		}
		removeGroup(this,group.name);
		this.forceUpdate();
	};

	render() {
		return (
			<div>
				<TopBar history={this.props.history} app={this.props.app}/>
				<Grid container id="prof-group-lst" direction="column" justify="flex-start" alignItems="flex-start">
					<Grid item>
						<h2>Create Group</h2>
						<TextField id="new-group-name-field" label="Name" error={this.state.err}
						           helperText={this.state.err ? "invalid group name" : ''}>Group Name</TextField>

						<IconButton onClick={this.createGroup.bind(this)}><AddIcon>Create Group</AddIcon></IconButton>
					</Grid>
					{
						this.state.groupsWithStuObj.map((group) => (
							<Grid item key={group.name}>
								<Grid container spacing={2} direction="row" justify="flex-start" alignItems="center">
									<Grid item><h2>{group.name}</h2></Grid>
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
												group.students.map((stuObj) => (
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
										<TextField id={"add-input-".concat(group.name)} label="Name">Name</TextField>
										<IconButton onClick={this.addToGroup.bind(this, group)}><AddIcon>Add
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
