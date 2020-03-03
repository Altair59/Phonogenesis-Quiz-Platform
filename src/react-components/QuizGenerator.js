import React from "react";

import TextField from "@material-ui/core/TextField";
import TopBar from "./TopBar.js"
import {withRouter} from "react-router-dom"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import FormHelperText from '@material-ui/core/FormHelperText';
import {ruleList} from "./QuizData";
import {groups} from "./User";
import {Question} from "./QuizData";
import {Quiz} from "./QuizData";
import "./QuizGenerator.css";
import Grid from "@material-ui/core/Grid";
import {quizList} from "./QuizData";

class QuizGenerator extends React.Component {
	question_block = function () {
		this.content = null;
		this.ur_check = false;
		this.phe_check = false;
		this.max_cadt = 0;
		this.rule = '';
	};

	constructor(props) {
		super(props);
		this.state = {name: '', time: 0, questions: [], err: false, redirect: "/professor/quiz", group: ''};
	};

	handleNameChange = e => {
		this.setState({name: e.target.value});
	};

	handleTimeChange = e => {
		this.setState({time: parseInt(e.target.value)});
	};

	createQuestionBlock = e => {
		this.state.questions.push(new this.question_block());
		this.setState({redirect: "/professor/quiz"});
	};

	handleUrCheck(e, i) {
		let tmp = this.state.questions[i];
		tmp.ur_check = e.target.checked;
		this.updateQuestion(i, tmp);

	};

	handlePheCheck(e, i) {
		let tmp = this.state.questions[i];
		tmp.phe_check = e.target.checked;
		this.updateQuestion(i, tmp);
	};

	handleCadtSelect(e, i) {
		let tmp = this.state.questions[i];
		tmp.max_cadt = e.target.value;
		this.updateQuestion(i, tmp);
	};

	updateQuestion(i, q) {
		this.setState({questions: this.state.questions.slice(0, i).concat([q]).concat(this.state.questions.slice(i + 1, this.state.questions.length))});
		this.setState({redirect: "/professor/quiz"});
	}

	handleRuleSelect(e, i) {
		let tmp = this.state.questions[i];
		tmp.rule = e.target.value;
		this.updateQuestion(i, tmp);
	}

	handleGroupSelect(e) {
		this.setState({group: e.target.value});
		this.setState({redirect: "/professor/quiz"});
	}

	validateName(){
		for(let i=0;i<quizList.length;i++){
			if (quizList[i].name === this.state.name){
				return false;
			}
		}
		return true;
	}

	validateQuestion(){
		for(let i=0;i<this.state.questions.length;i++){
			if (this.state.questions[i].rule === ''){
				return false;
			}
		}
		return true;
	}

	makeQuiz = () => {
		if (this.state.name === '') {
			alert("Quiz name cannot be empty!");
		} else if (!this.validateName()){
			alert("Quiz name has already been taken!")
		} else if (this.state.questions.length === 0) {
			alert("You must include at least one question!")
		} else if (!this.validateQuestion()){
			alert("You must specify a rule for each question!")
		} else if (this.state.group === ''){
			alert("You must specify a group to send quiz!")
		} else {
			let quiz_questions = [];
			for (let i = 0; i < this.state.questions.length; i++) {
				let new_question = new Question(this.state.questions[i].rule, this.state.questions[i].ur_check, this.state.questions[i].phe_check, this.state.questions[i].max_cadt);
				quiz_questions.push(new_question);
			}
			let new_quiz = new Quiz(quiz_questions, this.state.time, this.state.group, this.state.name);
			quizList.push(new_quiz);
			this.distributeQuiz(new_quiz);
			alert("Quiz Distributed");
			this.setState({name: '', time: 0, questions: [], err: false, group: '', redirect: "/professor/quiz"});
		}
	};

	distributeQuiz(quiz) {
		let targetUser = groups[quiz.group];

		for (let i = 0; i < targetUser.length; i++) {
			targetUser[i].quizzes.push(quiz);
		}
	};

	render() {
		return (
			<div id="main">
				<TopBar {...this.props.location.state}> </TopBar>
				<Grid container direction="row" justify="flex-start" alignItems="center" className="qgblock">
					<Grid item>
						<h4>Define Quiz Name</h4>
					</Grid>
					<Grid item>
						<TextField value={this.state.name} onChange={this.handleNameChange}
						           label="Name">Name</TextField>
					</Grid>
					<Grid item>
						<h4>Set Time Limit</h4>
					</Grid>
					<Grid item>
						<TextField type="number" inputProps={{min: "0", max: "9999999", step: "1"}} value={this.state.time} onChange={this.handleTimeChange} label="Time"
						           error={this.state.err}
						           helperText={this.state.err ? "MUST BE DIGITS" : ''}>Time</TextField>
					</Grid>
					<Grid item>
						<h4>Add Quiz Question</h4>
					</Grid>
					<Grid item>
						<IconButton
							onClick={this.createQuestionBlock}><AddIcon>Create
							Group</AddIcon></IconButton>
					</Grid>
				</Grid>
				{this.state.questions.map((row, i) => (
					<Grid container direction="row" id="q" key={i} justify="center" alignItems="center">
						<Grid item>
							<FormControlLabel control={<Switch checked={this.state.questions[i].ur_check}
							                                   onChange={(e) => {
								                                   this.handleUrCheck(e, i)
							                                   }}
							                                   value="ur_check"/>} label="UR"/>
						</Grid>
						<Grid item>
							<FormControlLabel control={<Switch checked={this.state.questions[i].phe_check}
							                                   onChange={(e) => {
								                                   this.handlePheCheck(e, i)
							                                   }}
							                                   value="phe_check"/>} label="Phe"/>
						</Grid>
						<Grid item>
							<Select value={this.state.questions[i].max_cadt} onChange={(e) => {
								this.handleCadtSelect(e, i)
							}}>
								<MenuItem value={0}>0</MenuItem>
								<MenuItem value={1}>1</MenuItem>
								<MenuItem value={2}>2</MenuItem>
								<MenuItem value={3}>3</MenuItem>
							</Select>
							<FormHelperText>cadt#</FormHelperText>
						</Grid>
						<Grid item>
							<Select value={this.state.questions[i].rule}
							        onChange={(e) => this.handleRuleSelect(e, i)}>
								{ruleList.map((rule, j) => (
									<MenuItem key={j} value={ruleList[j].rule}>{ruleList[j].rule}</MenuItem>
								))}
							</Select>
							<FormHelperText>Rule</FormHelperText>
						</Grid>
					</Grid>
				))}
				<Grid container direction="row" justify="flex-start" alignItems="flex-start" className="qgblock">
					<Grid item>
						<h4>Select which group to send to </h4>
					</Grid>
					<Grid item>
						<Select value={this.state.group} onChange={(e) => this.handleGroupSelect(e)}>
							{Object.keys(groups).map((group, j) => (
								<MenuItem key={j} value={Object.keys(groups)[j]}>{Object.keys(groups)[j]}</MenuItem>
							))}
						</Select>
					</Grid>
				</Grid>
				<Grid container direction="row" justify="flex-start" alignItems="flex-start" className="qgblock">
					<Grid item>
						<h4>Distribute</h4>
					</Grid>
					<Grid item>
						<IconButton onClick={this.makeQuiz}><ArrowUpwardIcon/></IconButton>
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default withRouter(QuizGenerator);
