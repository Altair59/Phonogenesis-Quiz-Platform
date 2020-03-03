import React from "react";

import TextField from "@material-ui/core/TextField";
import TopBar from "./TopBar.js"
import {withRouter} from "react-router-dom"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import NativeSelect from '@material-ui/core/NativeSelect';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import FormHelperText from '@material-ui/core/FormHelperText';
import {ruleList, Question, Quiz, quizList, getRuleByName} from "./QuizData";
import {groups} from "./User";
import "./QuizGenerator.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class QuizGenerator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeErr: false,
			qCount: 0
		};
	};

	makeQuiz = () => {
		const targetGroup = document.getElementById("group-sel").value;

		if (!targetGroup || targetGroup === '') {
			alert("Must have a destination group!");
			return;
		}

		const quizTime = Number(document.getElementById("quiz-time").value);

		if (quizTime <= 10) {
			alert("Time must be positive integer >= 10!");
			this.setState({timeErr: true});
			return;
		} else {
			this.setState({timeErr: false});
		}

		const quizName = document.getElementById("quiz-name").value;
		const qList = [];

		for (let i = 0; i < this.state.qCount; i++) {
			const canUR = document.getElementById("ur-check-".concat(i.toString())).checked;
			const canPhoneme = document.getElementById("phoneme-check-".concat(i.toString())).checked;
			const maxCADT = document.getElementById("max-cadt-sel-".concat(i.toString())).value;
			const ruleTxt = document.getElementById("rule-sel-".concat(i.toString())).value;

			qList.push(new Question(getRuleByName(ruleTxt), canUR, canPhoneme, maxCADT));
		}

		const new_quiz = new Quiz(qList, quizTime, targetGroup, quizName);
		quizList.push(new_quiz);

		const targetUsers = groups[targetGroup];

		for (let i = 0; i < targetUsers.length; i++) {
			targetUsers[i].quizzes.push(new_quiz);
		}

		this.forceUpdate();
		alert("Quiz created and sent to all group members!");
	};

	createQuestionBlock = () => {
		this.setState({qCount: this.state.qCount + 1});
	};

	render() {
		return (
			<div id="main">
				<TopBar {...this.props.location.state}> </TopBar>
				<br/><br/>

				<Grid container direction="column" spacing={4} justify="center" alignItems="center">
					<Grid item>
						<Grid container direction="row" justify="center" alignItems="center" className="qgblock"
						      spacing={4}>
							<Grid item>
								<TextField id="quiz-name" label="Quiz Name" variant="outlined"/>
							</Grid>
							<Grid item>
								<TextField id="quiz-time" type="number" variant="outlined"
								           label="Time Limit (in seconds)"
								           error={this.state.timeErr}/>
							</Grid>
							<Grid item>
								<h4>Target Group: &nbsp;</h4>
								<NativeSelect id="group-sel" label={"ddd"}>
									{Object.keys(groups).map((group) => (
										<option key={group} value={group}>{group}</option>
									))}
								</NativeSelect>
							</Grid>

							<Grid item>
								<Button variant="contained" color="primary" onClick={this.makeQuiz}>Send Quiz</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<hr/>
						<br/>
						{
							Array.from(Array(this.state.qCount).keys()).map((i) => (
								<Grid container spacing={4} direction="row" id="q" key={i} justify="center"
								      alignItems="center">
									<Grid item><FormControlLabel
										control={<Switch id={"ur-check-".concat(i.toString())}/>}
										label="Allow UR"/></Grid>
									<Grid item><FormControlLabel
										control={<Switch id={"phoneme-check-".concat(i.toString())}/>}
										label="Allow Phoneme"/></Grid>
									<Grid item>
										<NativeSelect id={"max-cadt-sel-".concat(i.toString())}>
											<option value={0}>0</option>
											<option value={1}>1</option>
											<option value={2}>2</option>
											<option value={3}>3</option>
										</NativeSelect>
										<FormHelperText>max cadt#</FormHelperText>
									</Grid>
									<Grid item>
										<NativeSelect id={"rule-sel-".concat(i.toString())}>
											{ruleList.map((rule, j) => (
												<option key={j} value={rule.ruleTxt}>{rule.ruleTxt}</option>
											))}
										</NativeSelect>
										<FormHelperText>Rule</FormHelperText>
									</Grid>
								</Grid>
							))
						}
						<br/>
						<hr/>
					</Grid>
					<Grid item>
						<Button variant="outlined" color="secondary" onClick={this.createQuestionBlock}>Add
							Question</Button>
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default withRouter(QuizGenerator);
