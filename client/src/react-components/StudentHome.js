import React from "react";
import {withRouter} from "react-router-dom"
import TopBar from "./TopBar.js"
import "./mainstyle.css"
import Divider from "@material-ui/core/Divider";
import MessagePanel from "./MessagePanel";

class StudentHome extends React.Component {
	constructor(props) {
		super(props);
		this.props.history.push("/student");
		this.state = {};
	}

	render() {
		const student = this.props.app.state.currentUser;

		if (!student) {
			return <div/>
		}

		return (
			<div className="render-container">
				<TopBar history={this.props.history} app={this.props.app}/>
				<div className="main-area">
					<h1>{student.name ? student.name : "Anonymous"}</h1>
					<h3>Email: <span className="text">{student.email ? student.email : "Undefined"}</span></h3>
					<h3>Enrolled: <span
						className="text">{student.groups.length > 0 ? student.groups.join(", ") : "None"}</span>
					</h3>
					<br/><Divider/><br/>
					<MessagePanel app={this.props.app}/>
				</div>
			</div>
		);
	}

}

export default withRouter(StudentHome);
