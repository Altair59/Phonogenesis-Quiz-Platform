import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import {withRouter} from "react-router-dom";
import TopBar from "./TopBar.js";
import {getUserByUsername} from "./User.js";

import "./StudentGroupPage.css";

class StudentGroupPage extends React.Component {
	render() {
		const student = getUserByUsername(this.props.location.state.username);
		console.log(student.groups);
		return (

			<div>
				<TopBar {...this.props.location.state}/>
				<h1 className="title">Enrolled Groups</h1>
				<Divider/>
				<div id="groupsList">
					<Grid
						container
						spacing={3}
						justify="flex-start"
						alignItems="flex-start"
					>
						{student.groups.map((group, i) => (
							<Grid item key={i}>
								<Paper className="groupItem">
									<h3 id="groupName">{group}</h3>
								</Paper>
							</Grid>
						))}
					</Grid>
				</div>
			</div>
		);
	}
}

export default withRouter(StudentGroupPage);
