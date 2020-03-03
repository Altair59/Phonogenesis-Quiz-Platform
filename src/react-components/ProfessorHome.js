import React from "react";
import {withRouter} from "react-router-dom"
import TopBar from "./TopBar.js"
import Avatar from '@material-ui/core/Avatar';
import Divider from "@material-ui/core/Divider";
import { makeStyles } from '@material-ui/core/styles';
import "./MainPage.css"
import {getUserByUsername} from "./User";
import mark from "./avatars/mark_avatar.jpg";

class ProfessorHome extends React.Component {
	classes = makeStyles(theme => ({
		root: {
			display: 'flex',
			'& > *': {
				margin: theme.spacing(1),
			},
		},
		small: {
			width: theme.spacing(3),
			height: theme.spacing(3),
		},
		large: {
			width: theme.spacing(7),
			height: theme.spacing(7),
		},
	}));
	render() {
		let { state } = this.props.location;
		const prof = getUserByUsername(state.username);
		return (
			<div>
				<TopBar {...state}/>
				<div className="main-area">
					<Avatar alt={prof.name} src={mark} className={this.classes.large}/>
					<h1>{prof.name ? prof.name : "Anonymous"}</h1>
					<h3>Email: <span className="text">{prof.email ? prof.email : "Undefined"}</span></h3>
					<h3>Instructing: <span
						className="text">{prof.groups.length > 0 ? prof.groups.join(", ") : "None"}</span></h3>
					<Divider/>
					<h2>Activity History</h2>
				</div>
			</div>
		);
	}

}

export default withRouter(ProfessorHome);