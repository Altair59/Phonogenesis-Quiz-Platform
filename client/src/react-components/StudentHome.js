import React from "react";
import {withRouter} from "react-router-dom"
import TopBar from "./TopBar.js"
import "./mainstyle.css"
import Divider from "@material-ui/core/Divider";
import {findUser} from "../actions/user";
import MessagePanel from "./MessagePanel";

class StudentHome extends React.Component {
	constructor(props) {
		super(props);
		this.props.history.push("/student");
		this.state = {currentUser: null};
		findUser(this, this.props.app.state.currentUser.username);
	}

	render() {
		if (this.state.currentUser === null) {
			return <div/>
		}

		const student = this.state.currentUser;

		return (
			<div className="render-container">
				<TopBar history={this.props.history} app={this.props.app}/>
				<div className="main-area">
					<h2>Account Information</h2>
					<Divider/><br/>
					<div><span className="bold">Name: </span><span className="text">{student.name ? student.name : "Anonymous"}</span></div>
					<div><span className="bold">Email: </span><span className="text">{student.email ? student.email : "Undefined"}</span></div>
					<div><span onClick={() => this.props.history.push("/student/groups")} className="bold" id="link-button">Enrolled:</span><span
						className="text"> {student.groups.length > 0 ? student.groups.join(", ") : "None"}</span>
					</div>
					<br/>
					<MessagePanel page={this} currentUser={student}/>
				</div>
			</div>
		);
	}

}

export default withRouter(StudentHome);
