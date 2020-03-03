import React from "react";

import QuestionBlock from "./QuestionComp/QuestionBlock";
import TopBar from "./TopBar";
import {withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {shuffleQuestion, transIPAg, ruleList, getShuffledQList} from "./QuizData";
import {FormGroup, Select} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import "./SimpleGenerator.css"


const QUESTION_SIZE_MIN = 15;
const QUESTION_SIZE_MAX = 40;

class SimpleGenerator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedRule: "Random",
			sizeSelectWarn: "",
			selectedSize: 15,
			selectedType: "Random",
			canChangeType: true,
			isShuffle: false,
			isIPAg: false,
			question: null,
			genKey: 0
		}
	}

	onGetQuestion = (e) => {
		if (this.state.sizeSelectWarn !== "") {
			alert("There is error in provided data!");
			return;
		}

		const type = this.state.selectedType;
		const rule = this.state.selectedRule;

		let curQuestion;
		let shuffledQList = getShuffledQList();
		if (rule !== "Random") {
			for (let i = 0; i < shuffledQList.length; i++) {
				if (rule === shuffledQList[i].rule) {
					curQuestion = shuffledQList[i];
					break;
				}
			}
		} else if (type !== "Random") {
			for (let i = 0; i < shuffledQList.length; i++) {
				if (type === shuffledQList[i].ruleType) {
					curQuestion = shuffledQList[i];
					break;
				}
			}
		} else {
			curQuestion = shuffledQList[0];
		}

		if (this.state.isShuffle) {
			shuffleQuestion(curQuestion);
		}

		if (this.state.isIPAg) {
			transIPAg(curQuestion, true);
		} else {
			transIPAg(curQuestion, false);
		}

		this.setState({question: curQuestion, genKey: this.state.genKey + 1});
		e.preventDefault();
	};

	onTypeChange = (e) => {
		this.setState({selectedType: e.target.value});
	};

	validateSizeSelection = (e) => {
		const selSize = Number(e.target.value);

		if (selSize < QUESTION_SIZE_MIN || selSize > QUESTION_SIZE_MAX) {
			this.setState({sizeSelectWarn: "out of range"});
		} else {
			this.setState({sizeSelectWarn: ""});
		}
	};

	onSizeChange = (e) => {
		this.setState({selectedSize: Number(e.target.value)});
	};

	onRuleChange = (e) => {
		const targetVal = e.target.value;
		this.setState({selectedRule: targetVal});

		if (targetVal !== "Random") {
			this.setState({canChangeType: false, selectedType: "Random"});
		} else {
			this.setState({canChangeType: true});
		}
	};

	onShuffleChange = (e) => {
		this.setState({isShuffle: !this.state.isShuffle});
	};

	onIPAgChange = (e) => {
		this.setState({isIPAg: !this.state.isIPAg});
	};

	render() {
		const isValidSize = this.state.sizeSelectWarn !== "";

		return (
			<div>
				<TopBar {...this.props.location.state}/>
				<Grid container direction="row" justify="center" alignItems="flex-start" spacing={4} id={"gen-form"}>
					<Grid item>
						<FormControl variant="outlined">
							<InputLabel style={{marginTop: "-7px", marginLeft: "-12px"}}>Rule</InputLabel>
							<Select value={this.state.selectedRule} onChange={this.onRuleChange}>
								<MenuItem value={"Random"}>Random</MenuItem>
								{ruleList.map((question) => (
									<MenuItem value={question.rule} key={question}>{question.rule}</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>

					<Grid item><TextField
						label="QuizData Size (15-30)"
						error={isValidSize}
						helperText={this.state.sizeSelectWarn}
						type="number"
						value={this.state.selectedSize}
						variant="outlined"
						InputLabelProps={{
							shrink: true,
						}}
						onChange={this.onSizeChange}
						onBlur={this.validateSizeSelection}
					/></Grid>

					<Grid item><FormControl variant="outlined" disabled={!this.state.canChangeType}>
						<InputLabel id="typeLabel" style={{marginTop: "-7px", marginLeft: "-12px"}}>QuizData
							Type</InputLabel>
						<Select labelId="typeLabel" value={this.state.selectedType} onChange={this.onTypeChange}>
							<MenuItem value={"Random"}>Random</MenuItem>
							<MenuItem value={"Alternating"}>Alternating</MenuItem>
							<MenuItem value={"Neutralizing"}>Neutralizing</MenuItem>
							<MenuItem value={"Mixed - Alternating & Neutralizing"}>Mixed -
								Alternating & Neutralizing</MenuItem>
						</Select>
					</FormControl></Grid>


					<Grid item><FormGroup id={"gen-switches"}>
						<FormControlLabel
							control={
								<Switch
									checked={this.state.isShuffle}
									onChange={this.onShuffleChange}
									color="primary"
								/>
							}
							label="Shuffle"
						/>
						<FormControlLabel
							control={
								<Switch
									checked={this.state.isIPAg}
									onChange={this.onIPAgChange}
									color="primary"
								/>
							}
							label="IPA [ɡ]"
						/>
					</FormGroup></Grid>

					<Grid item>
						<Button variant="contained" color="primary" onClick={this.onGetQuestion}>Generate
							QuizData</Button>
					</Grid>
				</Grid>

				<QuestionBlock instTxt={"Get QuizData"} question={this.state.question} submitAction={this.onGetQuestion}
				               qCount={this.state.selectedSize} isReadOnly={false} showAnswer={false} isQuiz={false}
				               canShowUR={true} canShowPhoneme={true} key={this.state.genKey}/>
			</div>
		);
	};
}

export default withRouter(SimpleGenerator);
