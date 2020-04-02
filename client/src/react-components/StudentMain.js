import React from "react";
import {withRouter} from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import TopBar from "./TopBar.js"
import Button from "@material-ui/core/Button"
import "./mainstyle.css"
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import {deleteMessage, findUser} from "../actions/user";

class StudentMain extends React.Component {
	constructor(props) {
		super(props);
		this.props.history.push("/student");
		this.state = {currentUser: null};
		findUser(this, this.props.app.state.currentUser.username);
	}

	onDeleteMessage = (msg) => {
		deleteMessage(this, this.state.currentUser.username, msg._id);
	};

	render() {
		if (this.state.currentUser === null){
			return <div/>
		}

		const student = this.state.currentUser;

		return (
			<div>
				<TopBar history={this.props.history} app={this.props.app}/>
				<div className="main-area">
					<h1>{student.name ? student.name : "Anonymous"}</h1>
					<h3>Email: <span className="text">{student.email ? student.email : "Undefined"}</span></h3>
					<h3>Enrolled: <span
						className="text">{student.groups.length > 0 ? student.groups.join(", ") : "None"}</span>
					</h3>
					<br/>
					<Divider/>
					<br/>
					<h2>Income Messages</h2>
					<br/>
					<Grid container direction="column" justify="flex-start" alignItems="flex-start">
						{student.messages.map((msg, index) => (
							<Card key={index}>
								<CardContent>
									<h4>{msg.content}</h4>
								</CardContent>

								<CardActions>
									<Button onClick={this.onDeleteMessage.bind(this, msg)} size="small">remove</Button>
								</CardActions>
							</Card>
						))}
					</Grid>
				</div>
			</div>
		);
	}

}

export default withRouter(StudentMain);
