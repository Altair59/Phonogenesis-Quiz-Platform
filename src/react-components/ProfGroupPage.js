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
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Grid from '@material-ui/core/Grid';
import TopBar from "./TopBar.js"
import {withRouter} from "react-router-dom"
import {users, getUserByName, groups} from "./User";


import "./ProfGroupPage.css";

class ProfGroupPage extends React.Component {
	group = function (s, n) {
		this.students = s;
		this.name = n;
	};

	constructor(props) {
		super(props);
		let students = [];
		let inputs = [];
		inputs.push('');
		for (let i = 0; i < students.length; i++) {
			inputs.push('');
		}
		this.state = {students: students, redirect: "/professor/groups", value: inputs, users: users, err: false};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	removeStudent = (i, j) => {
		let student = getUserByName(this.state.students[j].students[i].name);
		let groupName = this.state.students[j].name;
		student.groups = student.groups.filter(function (e) {
			return e !== groupName;});
		this.state.students[j].students.splice(i, 1);
		this.setState({redirect: "/professor/groups"})
	};

	handleChange(e, j) {
		this.setState({value: this.state.value.slice(0, j).concat([e.target.value]).concat(this.state.value.slice(j + 1, this.state.value.length))});
	};

	findUser(name) {
		for (let i = 0; i < this.state.users.length; i++) {
			if (this.state.users[i].name === name) {
				return this.state.users[i];
			}
		}
	}

	handleSubmit = (j) => {
		if (this.verify_invite(this.state.value[j + 1], j) === true) {
			alert('Invited');
			let student = getUserByName(this.findUser(this.state.value[j + 1]).name);
			student.groups.push(this.state.students[j].name);
			this.state.students[j].students.push(this.findUser(this.state.value[j + 1]));
			this.setState({redirect: "/professor/groups"});
		} else {
			alert('Invalid student');
		}
	};

	verify_invite(name, group) {
		if (name === '') return false;
		let is_student = [];
		for (let i = 0; i < this.state.users.length; i++) {
			if (this.state.users[i].type === "student") {
				is_student.push(this.state.users[i].name);
			}
		}
		if (!is_student.includes(name)) return false;
		let is_enrolled = [];
		for (let j = 0; j < this.state.students[group].students.length; j++) {
			is_enrolled.push(this.state.students[group].students[j].name);
		}
		return (!is_enrolled.includes(name));
	}

	validate_group(prof){
		let reg = /^[0-9a-zA-Z]+[-]?[0-9a-zA-Z]+$/;
		for (let i=0;i<prof.groups.length;i++){
			if (prof.groups[i] === this.state.value[0]){
				return false;
			}
		}
		return reg.test(this.state.value[0]);
	}

	createGroup = (state) => {
		let prof = getUserByName(state.name);
		if (this.validate_group(prof)){
			this.setState({err: false});
			this.state.students.push(new this.group([], this.state.value[0]));
			this.state.value.push('');
			prof.groups.push(this.state.value[0]);
			this.setState({redirect: "/professor/groups"});
		} else {
			this.setState({err: true});
		}

	};

	removeGroup = (j,state) => {
		let prof = getUserByName(state.name);
		let groupName = this.state.students[j].name;
		for (let i=0;i<this.state.students[j].students.length;i++){
			let student = getUserByName(this.state.students[j].students[i].name);
			student.groups = student.groups.filter(function (e) {
				return e !== groupName;});
		}
		this.state.students.splice(j, 1);
		this.state.value.splice(j + 1, 1);
		prof.groups = prof.groups.filter(function (e) {
			return e !== groupName;
		});
		this.setState({redirect: "/professor/groups"});
	};


	render() {
		let {state} = this.props.location;
		console.log(users);
		return (
			<div>
				<TopBar {...state} />
				<Grid container id="prof-group-lst" direction="column" justify="flex-start" alignItems="flex-start">
					<Grid item>
						<h2>Create Group</h2>
						<TextField onChange={(e) => {
							this.handleChange(e, 0)
						}} label="Name" error={this.state.err}
						           helperText={this.state.err ? "Incorrect group name" : ''}>Group Name</TextField>

						<IconButton
							onClick={this.createGroup.bind(this, state)}><AddShoppingCartIcon>Create
							Group</AddShoppingCartIcon></IconButton>
					</Grid>
					{
						this.state.students.map((group, j) => (
							<Grid item key={j}>
								<Grid container spacing={2} direction="row"
								      justify="flex-start"
								      alignItems="center">
									<Grid item>
										<h2>group {this.state.students[j].name}</h2>
									</Grid>
									<Grid item>
										<IconButton
											onClick={this.removeGroup.bind(this, j, state)}><DeleteIcon>Remove</DeleteIcon></IconButton>
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
												this.state.students[j].students.map((row, i) => (
													<TableRow key={row.name}>
														<TableCell>{row.name}</TableCell>
														<TableCell>{row.email}</TableCell>
														<TableCell>{row.username}</TableCell>
														<TableCell>
															<IconButton
																onClick={this.removeStudent.bind(this, i, j)}><DeleteIcon>Remove</DeleteIcon></IconButton>
														</TableCell>
													</TableRow>
												))
											}
										</TableBody>
									</Table>

									<form>
										<TextField onChange={(e) => {
											this.handleChange(e, j + 1)
										}} label="Name">Name</TextField>
										<IconButton
											onClick={this.handleSubmit.bind(this, j)}><AddShoppingCartIcon>Invite</AddShoppingCartIcon></IconButton>
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
