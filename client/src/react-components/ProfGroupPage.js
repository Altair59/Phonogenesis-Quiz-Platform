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
import {removeGroup, addGroup, getGroupUserList, addToGroup, removeFromGroup} from "../actions/group";
import {editUser, readCookie} from "../actions/user";


import "./ProfGroupPage.css";

class ProfGroupPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			newGroupName: '',
			err: false,
			g2u: {}
		};
		getGroupUserList(this, this.props.app.state.currentUser.username);
	}

	addToGroup = (group) => {
		const username = document.getElementById("add-input-".concat(group)).value;
		addToGroup(this, username, group);
		this.forceUpdate();
	};

	removeStudent = (group, user) => {
		removeFromGroup(this, user, group);
		this.forceUpdate();
	};


	createGroup = () => {
		const name = document.getElementById("new-group-name-field").value;
		addGroup(this, name);
	};

	removeGroup = (group) => {
		removeGroup(this, group);
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
						Object.keys(this.state.g2u).sort().map((group) => {
							if (this.state.g2u[group]) {
								return <Grid item key={group}>
									<Grid container spacing={2} direction="row" justify="flex-start"
									      alignItems="center">
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
													this.state.g2u[group].map((stuObj, index) => {
														if (index > 0) {
															return <TableRow key={stuObj.username}>
																<TableCell>{stuObj.name}</TableCell>
																<TableCell>{stuObj.email}</TableCell>
																<TableCell>{stuObj.username}</TableCell>
																<TableCell>
																	<IconButton
																		onClick={this.removeStudent.bind(this, group, stuObj.username)}><DeleteIcon>Remove</DeleteIcon></IconButton>
																</TableCell>
															</TableRow>
														}
													})
												}
											</TableBody>
										</Table>

										<form>
											<TextField id={"add-input-".concat(group)}
											           label="Name">Name</TextField>
											<IconButton onClick={this.addToGroup.bind(this, group)}><AddIcon>Add
												Student</AddIcon></IconButton>
										</form>
									</TableContainer>
								</Grid>
							} else {
								return null;
							}
						})
					}
				</Grid>
			</div>
		)

	}
}

export default withRouter(ProfGroupPage);
