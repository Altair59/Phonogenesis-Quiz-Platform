import React from "react"
import Paper from '@material-ui/core/Paper'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class QuizTile extends React.Component {
  constructor(props) {
		super(props);
		this.state = {}
	}

  render() {
    return(
      <Paper elevation={3}>
        <h4>Quiz #{this.props.quizId}</h4>
        <p>Score: {this.props.score}</p>
        <ExpansionPanel>
         <ExpansionPanelSummary
           expandIcon={<ExpandMoreIcon />}
         >
           More details
         </ExpansionPanelSummary>
         <ExpansionPanelDetails>
           kajlfkaklsfj
         </ExpansionPanelDetails>
        </ExpansionPanel>
      </Paper>
    )
  }
}

export default QuizTile
