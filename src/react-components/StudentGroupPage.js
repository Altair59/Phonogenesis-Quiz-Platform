import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {withRouter} from "react-router-dom";
import TopBar from "./TopBar.js";
import {getUserByUsername} from "./User.js";

import "./StudentGroupPage.css";
import QuizTaker from "./QuizTaker";
import {Quiz} from "./QuizData";

class StudentGroupPage extends React.Component {
	render() {
		const student = getUserByUsername(this.props.location.state.username);
		console.log(student.groups);
		return (

			<div>
                {
                    false ? null : <QuizTaker quiz={new Quiz([], 1, 1)}/>
                }
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
						{student.groups.map((group, i) => {
							return (
								<div className="gridContainer">
									<Grid item key={i}>
										<Paper className="groupItem">
											<h3 id="groupName">{group}</h3>
										</Paper>
									</Grid>
								</div>
							);
						})}
					</Grid>
				</div>
			</div>
		);
	}
}

export default withRouter(StudentGroupPage);
