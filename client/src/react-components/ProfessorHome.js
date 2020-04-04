import React from "react";
import {withRouter} from "react-router-dom"
import TopBar from "./TopBar.js"
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import "./mainstyle.css"
import mark from "./avatars/mark_avatar.jpg";
import Divider from "@material-ui/core/Divider";
import MessagePanel from "./MessagePanel";

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

	constructor(props) {
		super(props);
		this.props.history.push("/professor");
	}


	render() {
		const prof = this.props.app.state.currentUser;

		return (
			<div className="render-container">
				<TopBar history={this.props.history} app={this.props.app}/>
				<div className="main-area">
					<h2>Account Information</h2>
					<Divider/><br/>
					<Avatar alt={prof.name} src={mark} className={this.classes.large}/>

					<div><span className="bold">Name: </span><span className="text">{prof.name ? prof.name : "Anonymous"}</span></div>
					<div><span className="bold">Email: </span><span className="text">{prof.email ? prof.email : "Undefined"}</span></div>
					<div><span onClick={() => this.props.history.push("/professor/groups")} className="bold" id="link-button">Instructing:</span><span
						className="text"> {prof.groups.length > 0 ? prof.groups.join(", ") : "None"}</span>
					</div>
					<br/>
					<MessagePanel app={this.props.app}/>
				</div>
			</div>
		);
	}

}

export default withRouter(ProfessorHome);
