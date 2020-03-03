import React from "react"
import Paper from '@material-ui/core/Paper'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";
import {withRouter} from "react-router-dom";
import "./QuizTile.css"
import {ruleList} from "./QuizData.js"

class QuizTile extends React.Component {
	render() {
		return (
			<Paper elevation={3}>
				<div className="act-paper">
					<h4>Quiz: {this.props.name}</h4>
					<h4>Time Limit: {this.props.timeLim}</h4>
					<p>Score: {this.props.score}/{this.props.quizSize}</p>
				</div>
				<ExpansionPanel>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon/>}
					>
						More details
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Grid container spacing={2} alignItems="flex-end" key={this.props.name}>
						/*{this.props.studentAnswers.map((sAnswer, i) => {
							return (
								<Grid item key={i}>
									<Paper elevation={2}>
										<div className="act-paper">
											<p><strong>Question #{i + 1}:</strong></p>
											<p>Your Answer: {sAnswer}</p>
											<p>Correct Answer: {ruleList[i].ruleTxt}</p>
										</div>
									</Paper>
								</Grid>
							)
						})}*/
						</Grid>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</Paper>
		)
	}
}

export default withRouter(QuizTile)
