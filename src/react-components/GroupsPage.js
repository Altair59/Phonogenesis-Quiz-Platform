import React from "react";

import "./GroupsPage.css";

class GroupsPage extends React.Component {
	constructor(props) {
		super(props);
		let students = this.props.users.slice(1, 3);
		this.state = {students: students, redirect: "/professor/groups", value: '', users: this.props.users};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	removeStudent = i => {
		this.state.students.splice(i, 1);
		this.setState({redirect: "/professor/groups"})
	};

	handleChange(e) {
		this.setState({value: e.target.value});
	}

	findUser(name) {
		for (let i = 0; i < this.state.users.length; i++) {
			if (this.state.users[i].name === name) {
				return this.state.users[i];
			}
		}
	}

	handleSubmit(e) {
		if (this.verify_invite(this.state.value) === true) {
			alert('Invited');
			this.state.students.push(this.findUser(this.state.value));
			this.setState({redirect: "/professor/groups"});
		} else {
			alert('Invalid student');
		}
		this.setState({value: ''});
		e.preventDefault();
	}

	verify_invite(name) {
		if (name === '') return false;
		let is_student = [];
		for (let i = 0; i < this.state.users.length; i++) {
			if (this.state.users[i].type === "student") {
				is_student.push(this.state.users[i].name);
			}
		}
		if (!is_student.includes(name)) return false;
		let is_enrolled = [];
		for (let j = 0; j < this.state.students.length; j++) {
			is_enrolled.push(this.state.students[j].name);
		}
		return (!is_enrolled.includes(name));
	}

	render() {
		return (
			<div>
				<table>
					<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Username</th>
						<th>Remove Student</th>
					</tr>
					</thead>
					<tbody>
					{this.state.students.map((row, i) => (
						<tr key={row.name}>
							<td align="right">{row.name}</td>
							<td align="right">{row.email}</td>
							<td align="right">{row.username}</td>
							<td align="right">
								<button onClick={this.removeStudent.bind(this, i)}>Remove</button>
							</td>
						</tr>
					))}
					</tbody>
				</table>

				<form onSubmit={this.handleSubmit}>
					<label>
						Name:
						<input type="text" value={this.state.value}
						       onChange={this.handleChange}/>
					</label>
					<input type="submit" value="Invite"/>
				</form>
			</div>
		)
	}
}

export default GroupsPage;