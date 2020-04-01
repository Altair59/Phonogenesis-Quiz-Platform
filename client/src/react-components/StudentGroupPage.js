import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import {withRouter} from "react-router-dom";
import TopBar from "./TopBar.js";

import "./StudentGroupPage.css";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {getGroupUserList} from "../actions/group";

class StudentGroupPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			g2u: {}
		};
		getGroupUserList(this, this.props.app.state.currentUser.username);
	}

	render() {
		return (
			<div>
				<TopBar history={this.props.history} app={this.props.app}/>

				<h1 className="title">Enrolled Groups</h1>
				<Divider/>
				<div id="groupsList">
					<Grid container spacing={3} justify="flex-start" alignItems="flex-start">{
						Object.keys(this.state.g2u).sort().map(group => {
							if (this.state.g2u[group]) {
								return <Grid item key={group}>
									<Paper className="groupItem">
										<h3 id={"groupName"}>{group}</h3>
										<br/>
										<TableContainer component={Paper}><Table aria-label={group}>
											<TableHead>
												<TableRow>
													<TableCell>Name</TableCell>
													<TableCell>Email</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>{
												this.state.g2u[group].map((userObj, index) => {
													if (index === 0) {
														return <TableRow key={userObj.username}>
															<TableCell><span
																className={"ownerTxt"}>{userObj.name}</span></TableCell>
															<TableCell><span
																className={"ownerTxt"}>{userObj.email}</span></TableCell>
														</TableRow>
													} else {
														return <TableRow key={userObj.username}>
															<TableCell>{userObj.name}</TableCell>
															<TableCell>{userObj.email}</TableCell>
														</TableRow>
													}
												})}
											</TableBody>
										</Table></TableContainer>


									</Paper>
								</Grid>
							} else {
								return null;
							}
						})}
					</Grid>
				</div>
			</div>
		);


	}
}

export default withRouter(StudentGroupPage);
