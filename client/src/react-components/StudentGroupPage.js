import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import {withRouter} from "react-router-dom";
import TopBar from "./TopBar.js";

import "./StudentGroupPage.css";

class StudentGroupPage extends React.Component {
	render() {
		return <div/>
		// const { app } = this.props;
		// const student = app.state.currentUser;
		// return (
		//
		// 	<div>
		// 		<TopBar app={app}/>
		// 		<h1 className="title">Enrolled Groups</h1>
		// 		<Divider/>
		// 		<div id="groupsList">
		// 			<Grid
		// 				container
		// 				spacing={3}
		// 				justify="flex-start"
		// 				alignItems="flex-start"
		// 			>
		// 				{student.groups.map((group, i) => (
		// 					<Grid item key={i}>
		// 						<Paper className="groupItem">
		// 							<h3 id="groupName">{group}</h3>
		// 						</Paper>
		// 					</Grid>
		// 				))}
		// 			</Grid>
		// 		</div>
		// 	</div>
		// );
	}
}

export default withRouter(StudentGroupPage);
