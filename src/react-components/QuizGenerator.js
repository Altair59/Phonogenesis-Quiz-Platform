import React from "react";

import TextField from "@material-ui/core/TextField";
import TopBar from "./TopBar.js"
import {withRouter} from "react-router-dom"
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import FormHelperText from '@material-ui/core/FormHelperText';
import {ruleList} from "./QuizData";

import "./QuizGenerator.css";
import Grid from "@material-ui/core/Grid";



const groupList = ["csc263", "csc309", "csc236"];


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

		let reg = /^[0-9]+$/;
		if (reg.test(e.target.value)) {
			this.setState({err: false});
			this.setState({time: parseInt(e.target.value)});
		} else {
			this.setState({err: true});
		}
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

	render() {
		return (
			<div id="main">
				<TopBar {...this.props.location.state}> </TopBar>
				<Grid container direction="row" justify="flex-start" alignItems="center" className="qgblock">
					<Grid item>
						<h4>Define Quiz Name</h4>
					</Grid>
					<Grid item>
						<TextField onChange={this.handleNameChange} label="Name">Name</TextField>
					</Grid>
					<Grid item>
						<h4>Set Time Limit</h4>
					</Grid>
					<Grid item>
						<TextField onChange={this.handleTimeChange} label="Time" error={this.state.err}
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
							{groupList.map((rule, j) => (
								<MenuItem key={j} value={groupList[j]}>{groupList[j]}</MenuItem>
							))}
						</Select>
					</Grid>
				</Grid>
				<Grid container direction="row" justify="flex-start" alignItems="flex-start" className="qgblock">
					<Grid item>
						<h4>Distribute</h4>
					</Grid>
					<Grid item>
						<IconButton><ArrowUpwardIcon/></IconButton>
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default withRouter(QuizGenerator);
