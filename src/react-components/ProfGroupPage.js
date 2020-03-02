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

import "./ProfGroupPage.css";

class ProfGroupPage extends React.Component {
	group = function (s, n) {
		this.students = s;
		this.name = n;
	};

	constructor(props) {
		super(props);
		let students = [new this.group(this.props.users.slice(1, 3), "csc309"), new this.group(this.props.users.slice(2, 4), "csc369")];
		let inputs = [];
		inputs.push('');
		for (let i = 0; i < students.length; i++) {
			inputs.push('');
		}
		this.state = {students: students, redirect: "/professor/groups", value: inputs, users: this.props.users};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	removeStudent = (i, j) => {
		console.log(i, j);
		this.state.students[j].students.splice(i, 1);
		this.setState({redirect: "/professor/groups"})
	};

	handleChange(e, j) {
		this.state.value[j] = e.target.value;
	};

	findUser(name) {
		for (let i = 0; i < this.state.users.length; i++) {
			if (this.state.users[i].name === name) {
				return this.state.users[i];
			}
		}
	}

	handleSubmit = j => {
		if (this.verify_invite(this.state.value[j + 1], j) === true) {
			alert('Invited');
			this.state.students[j].students.push(this.findUser(this.state.value[j + 1]));
			this.setState({redirect: "/professor/groups"});
		} else {
			alert('Invalid student');
		}
		//this.setState({value: ''});
		//e.preventDefault();
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

	createGroup = () => {
		this.state.students.push(new this.group([], this.state.value[0]));
		this.state.value.push('');
		this.setState({redirect: "/professor/groups"});
	};

	removeGroup = j => {
		this.state.students.splice(j, 1);
		this.state.value.splice(j + 1, 1);
		this.setState({redirect: "/professor/groups"});
	};


	render() {
		let {state} = this.props.location;
		return (
			<div>
				<TopBar {...state} />
				<Grid container direction="column" justify="flex-start" alignItems="center">
					<Grid item>
						<h2>Create Group</h2>
						<TextField onChange={(e) => {
							this.handleChange(e, 0)
						}} label="Name">Group Name</TextField>

						<IconButton
							onClick={this.createGroup}><AddShoppingCartIcon>Create
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
											onClick={this.removeGroup.bind(this, j)}><DeleteIcon>Remove</DeleteIcon></IconButton>
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
