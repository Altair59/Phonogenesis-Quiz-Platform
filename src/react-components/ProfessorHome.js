import React from "react";
import {withRouter} from "react-router-dom"
import TopBar from "./TopBar.js"
import Avatar from '@material-ui/core/Avatar';

class ProfessorHome extends React.Component {
	render() {
		let { state } = this.props.location;
		return (
			<div>
				<TopBar {...state} />
				<Avatar alt="Professor" src="/src/react-components/david.jpg"/>
			</div>
		);
	}

}

export default withRouter(ProfessorHome);