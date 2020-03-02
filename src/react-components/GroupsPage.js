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
import TopBar from "./TopBar.js"
import { withRouter } from "react-router-dom"

import "./GroupsPage.css";

class GroupsPage extends React.Component {
	constructor(props) {
		super(props);
		let students = [this.props.users.slice(1, 3), this.props.users.slice(2, 4)];
		let inputs = [];
		for (let i=0;i<students.length;i++){
			inputs.push('');
		}
		this.state = {students: students, redirect: "/professor/groups", value: inputs, users: this.props.users};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	removeStudent = (i,j) => {
		console.log(i,j);
		this.state.students[j].splice(i, 1);
		this.setState({redirect: "/professor/groups"})
	};

	handleChange (e,j){
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
		if (this.verify_invite(this.state.value[j], j) === true) {
			alert('Invited');
			this.state.students[j].push(this.findUser(this.state.value[j]));
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
		for (let j = 0; j < this.state.students[group].length; j++) {
			is_enrolled.push(this.state.students[group][j].name);
		}
		return (!is_enrolled.includes(name));
	}



	render() {
		let { state } = this.props.location;
		return (
			<div>
				<TopBar {...state}></TopBar>
				{
					this.state.students.map((group, j) => (
						<div key = {j}>
							<h2>group {j}</h2>
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
											group.map((row, i) => (
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
									<TextField onChange={(e) => {this.handleChange(e,j)}} label="Name">Name</TextField>
									<IconButton
										onClick={this.handleSubmit.bind(this,j)}><AddShoppingCartIcon>Invite</AddShoppingCartIcon></IconButton>
								</form>
							</TableContainer>
						</div>
					))
				}
			</div>
		)
	}
}

export default withRouter(GroupsPage);
