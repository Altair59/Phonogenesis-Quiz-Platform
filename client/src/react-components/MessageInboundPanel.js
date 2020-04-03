import React from "react";
import {withRouter} from "react-router-dom"
import Button from "@material-ui/core/Button"
import "./mainstyle.css"
import "./MessageInboundPanel.css"
import {deleteMessage} from "../actions/user";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";


class MessageInboundPanel extends React.Component {
	constructor(props) {
		super(props);
	}

	onDeleteMessage = (msg) => {
		deleteMessage(this.props.page, this.props.currentUser.username, msg._id);
	};

	render() {
		return (
			<div id={"msg-inbound-panel"}>
				<GridList cols={3}>
					{this.props.currentUser.messages.map((msg, index) => (
						<GridListTile key={index} className={"message-tile"}>
							<Card variant="outlined">
								<CardContent>
									<h5 className={"message-timestamp"}>{msg.timeStamp}</h5>
								</CardContent>

								<CardContent>
									<h3>{msg.content}</h3>
								</CardContent>

								<CardActions>
									<Button onClick={this.onDeleteMessage.bind(this, msg)} size="small">remove</Button>
								</CardActions>
							</Card>
						</GridListTile>
					))}
				</GridList>
			</div>
		);
	}
}

export default withRouter(MessageInboundPanel);