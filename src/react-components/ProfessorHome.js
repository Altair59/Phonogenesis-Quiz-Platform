import React from "react";
import {withRouter} from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import QuizTile from "./QuizTile.js"
import TopBar from "./TopBar.js"
import Divider from "@material-ui/core/Divider"

class ProfessorHome extends React.Component {

	render() {
		let { state } = this.props.location;
		return (
			<div>
				<TopBar {...state} />
				<h1>HOME FOR PROF</h1>
			</div>
		);
	}

}

export default withRouter(ProfessorHome);