import React from "react";
import {withRouter} from "react-router-dom"
import Button from "@material-ui/core/Button"
import "./mainstyle.css"
import "./MessageOutboundPanel.css"
import {TextField} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {findUser, getUsers, sendMessage} from "../actions/user";
import {broadcastMessage} from "../actions/group";
import Grid from "@material-ui/core/Grid";


class MessageOutboundPanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: "p2p",
			users: null,
			targetUser: this.props.currentUser.username,
			targetGroup: this.props.currentUser.groups[0]
		};
		getUsers(this);
	}

	onModeChange = (event) => {
		this.setState({mode: event.target.value});
	};

	onUserChange = (event) => {
		this.setState({targetUser: event.target.value});
	};

	onGroupChange = (event) => {
		this.setState({targetGroup: event.target.value});
	};

	onSend = (event) => {
		event.preventDefault();
		const rawMessage = document.getElementById("message-textfield").value;
		if (!rawMessage || rawMessage.length < 1) {
			alert("Message cannot be empty!");
			return;
		}

		const message = `From ${this.props.currentUser.username}: ${rawMessage}`;
		switch (this.state.mode) {
			case "p2p":
				if (!this.state.targetUser) {
					alert("Must select target user!");
					return;
				}
				sendMessage(this.state.targetUser, message);
				alert("Message Sent");
				break;

			case "p2g":
				if (!this.state.targetGroup) {
					alert("Must select target group!");
					return;
				}
				broadcastMessage(this.state.targetGroup, message);
				alert("Message Sent");
				break;

			default:
				console.log("FATAL ERROR UNKNOWN MODE");
				break;
		}
		findUser(this.props.page, this.props.currentUser.username);
	};

	render() {
		if (this.state.users === null) {
			return <div/>
		}

		return (
			<div>
				<Grid container justify="flex-start" alignItems="flex-end" spacing={3}>
					<Grid item>
						<TextField multiline required label={"message"} id={"message-textfield"}/>
					</Grid>
					<Grid item>
						<Select onChange={this.onModeChange} value={this.state.mode} id={"mode-sel"}>
							<MenuItem value={"p2p"}>Send to User</MenuItem>
							<MenuItem value={"p2g"}>Broadcast to Group</MenuItem>
						</Select>
					</Grid>
					<Grid item>
						{
							this.state.mode === "p2p" ? (
								<Select value={this.state.targetUser} onChange={this.onUserChange} id={"user-sel"}>
									{
										this.state.users.map(user => (
											<MenuItem key={user.username}
											          value={user.username}>{user.username}</MenuItem>
										))
									}
								</Select>
							) : (
								<Select value={this.state.targetGroup} onChange={this.onGroupChange} id={"group-sel"}>
									{
										this.props.currentUser.groups.map(group => (
											<MenuItem key={group} value={group}>{group}</MenuItem>
										))
									}
								</Select>
							)
						}
					</Grid>
					<Grid item>
						<Button variant="contained" color="primary" onClick={this.onSend}>Send</Button>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withRouter(MessageOutboundPanel);