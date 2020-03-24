import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import "./QuizTaker.css";
import QuestionBlock from "./QuestionBlock";
import TopBar from "./TopBar.js"
import Countdown from 'react-countdown-now';
import {withRouter} from "react-router-dom";
import {getQuizByName} from "./QuizData";

// Get answers from server
// Code below requires server call
const answerPool = ['word-final obstruent devoicing', 'word-initial aspiration of voiceless stops', 'intervocalic fricative voicing', 'vowel laxing in closed syllables', 'palatal mutation of velar stops to postalveolar affricates before front vowels', 'word-final stop devoicing', 'word-final consonant devoicing', 'obstruent devoicing in codas', 'obstruent devoicing in codas', 'aspiration of voiceless stops in onsets', 'aspiration of voiceless stops in codas', 'word-final aspiration of voiceless stops', 'intervocalic fricative voicing', 'intervocalic obstruent voicing', 'intervocalic spirantization of voiced stops', 'postvocalic spirantization of voiced stops', 'spirantization of voiceless stops in codas', 'high vowel laxing in closed syllables', 'mid vowel laxing in closed syllables', 'palatal mutation of velar stops to postalveolar affricates before front vowels', 'palatal mutation of velar stops to postalveolar fricatives before front vowels', 'palatal mutation of velar stops to alveolar affricates before front vowels', 'palatal mutation of velar stops to alveolar fricatives before front vowels', 'palatal mutation of alveolar stops to postalveolar affricates before front vowels', 'palatal mutation of alveolar stops to postalveolar fricatives before front vowels', 'palatal mutation of alveolar stops to alveolar affricates before front vowels', 'palatal mutation of alveolar stops to alveolar fricatives before front vowels', 'palatal mutation of velar stops to postalveolar affricates before high front vowels', 'palatal mutation of velar stops to postalveolar fricatives before high front vowels', 'palatal mutation of velar stops to alveolar affricates before high front vowels', 'palatal mutation of velar stops to alveolar fricatives before high front vowels', 'palatal mutation of alveolar stops to postalveolar affricates before high front vowels', 'palatal mutation of alveolar stops to postalveolar fricatives before high front vowels', 'palatal mutation of alveolar stops to alveolar affricates before high front vowels', 'palatal mutation of alveolar stops to alveolar fricatives before high front vowels', 'palatalization of velars after front vowels', 'palatalization of velars before front vowels', 'palatalization of velar fricatives after front vowels', 'palatalization of velar fricatives before front vowels', 'palatalization of velars after high front vowels', 'palatalization of velars before high front vowels', 'palatalization of velar fricatives after high front vowels', 'palatalization of velar fricatives before high front vowels', 'regressive vowel nasalization', 'progressive vowel nasalization', 'regressive vowel nasalization from nasal codas', 'word-final vowel devoicing', 'word-final high vowel devoicing', 'word-final vowel devoicing after voiceless consonants', 'word-final high vowel devoicing after voiceless consonants', 'vowel devoicing between voiceless consonants', 'high vowel devoicing between voiceless consonants', 'postnasal voicing of stops', 'postnasal voicing of obstruents', 'postnasal voicing of fricatives', 'word-final raising of mid vowels', 'word-final lowerinɡ of hiɡh vowels', 'word-final raising of low vowels', 'raising of mid vowels before voiceless codas', 'raising of low vowels before voiceless codas', 'raising of mid vowels before voiced codas', 'uvularization of velars after back non-high vowels', 'uvularization of velars before back non-high vowels', 'velarization of /l/ before back vowels', 'velarization of /l/ after back vowels', 'dentalization of alveolar stops before front vowels', 'dentalization and spirantization of alveolar stops before front vowels', 'lateralization of /d/ before nonhigh vowels', 'lateralization of /d/ after nonhigh vowels', 'retraction of high front vowels after postalveolars', 'retraction of high front vowels after velars', 'fronting of high back vowels after alveolars', 'word-final ashibilation of alveolar fricatives', 'ashibilation of alveolar fricatives in codas', 'debuccalization of /s/ in codas', 'velarization of /l/ in codas', 'intervocalic deletion of voiced velar obstruents', 'intervocalic deletion of velar obstruents', 'intervocalic deletion of voiced velar oral stops', 'intervocalic deletion of voiced obstruents', 'intervocalic deletion of voiced oral stops', 'deletion of high vowels in final closed syllables to create rising sonority codas', 'deletion of high front vowels in final closed syllables to carete rising sonority codas'];

class QuizTaker extends React.Component {
	constructor(props) {
		super(props);
		const quiz = getQuizByName(this.props.location.state.quiz.name);

		this.state = {
			questionIndex: 0,
			choices: this.genChoicesFromPool(quiz.questions[0].rule.ruleTxt, 4),
			score: 0,
			studentAnswers: [],
			qKey: 0
		};
	}

	genChoicesFromPool(answer, size) {
		const choices = [];
		let haveAns = false;

		for (let i = 0; i < size; i++) {
			if (!haveAns && (i === size - 1 || Math.random() > 0.5)) {
				choices.push(answer);
				haveAns = true;
			} else {
				let choice = answerPool[Math.floor(Math.random() * answerPool.length)];

				if (choice === answer) {
					i--;
				} else {
					choices.push(choice)
				}
			}
		}

		return choices;
	};

	onSubmitAnswer = (e) => {
		const quiz = getQuizByName(this.props.location.state.quiz.name);
		const choice = this.state.choices[e.currentTarget.id];
		quiz.pastAnswer.push(choice);

		if (choice === quiz.questions[this.state.questionIndex].rule.ruleTxt) {
			this.setState({score: this.state.score + 1});
		}
		this.setState({studentAnswers: this.state.studentAnswers.concat(choice)});

		const newIndex = this.state.questionIndex + 1;
		this.setState({questionIndex: newIndex});
		this.setState({qKey: this.state.qKey + 1});

		if (newIndex < quiz.questions.length) {
			this.setState({choices: this.genChoicesFromPool(quiz.questions[newIndex].rule.ruleTxt, 4)});
		}

		e.preventDefault();
	};

	onTimeUp = () => {
		const quiz = getQuizByName(this.props.location.state.quiz.name);
		alert("You've used up all your time!");
		this.setState({questionIndex: quiz.questions.length});
	};

	onBackToMain = (e) => {
		const {state} = this.props.location;
		this.props.history.push({
			pathname: '/student',
			state: {
				id: state.id,
				type: state.type,
				name: state.name,
				email: state.email,
				password: state.password,
				username: state.username
			}
		});
		e.preventDefault();
	};

	render() {
		const quiz = getQuizByName(this.props.location.state.quiz.name);
		const size = quiz.questions.length;
		const index = this.state.questionIndex;
		const score = this.state.score;
		const choices = this.state.choices;
		const studentAnswers = this.state.studentAnswers;
		const pastAnswers = quiz.pastAnswer;
		const qKey = this.state.qKey;
		const currQuestion = quiz.questions[index];

		if (index < size && currQuestion && !quiz.isCompleted) {
			return (
				<div>
					<TopBar {...this.props.location.state}/>
					<br/>
					<h3 id="quiz-title">Quiz: {quiz.name}</h3>
					<hr className="qtaker-hr"/>
					<QuestionBlock instTxt={"Get QuizData"} rule={currQuestion.rule} qCount={currQuestion.size}
					               isQuiz={true} isReadOnly={false} showAnswer={false}
					               genMoreLimit={currQuestion.maxCADT} key={qKey} canShowUR={currQuestion.canUR}
					               canShowPhoneme={currQuestion.canPhoneme}/>
					<hr className="qtaker-hr"/>
					<Grid container direction="row" justify="center" alignItems="center" spacing={10}>
						<Grid item id="ctd"> Time Remain &nbsp; <CountdownTimer id="ctd-timer"
						                                                        msec={quiz.timeLim * 1000}
						                                                        onTimeUp={this.onTimeUp}/>
						</Grid>

						<Grid item>
							<Grid id="selectAnswer" container direction="column" justify="center"
							      alignItems="flex-start" spacing={2}>

								<Grid item><Button variant="contained" id={0}
								                   onClick={this.onSubmitAnswer}>{choices[0]}</Button></Grid>
								<Grid item><Button variant="contained" id={1}
								                   onClick={this.onSubmitAnswer}>{choices[1]}</Button></Grid>
								<Grid item><Button variant="contained" id={2}
								                   onClick={this.onSubmitAnswer}>{choices[2]}</Button></Grid>
								<Grid item><Button variant="contained" id={3}
								                   onClick={this.onSubmitAnswer}>{choices[3]}</Button></Grid>
							</Grid>
						</Grid>

					</Grid>

				</div>
			);
		} else {
			if (!quiz.isCompleted) {
				quiz.pastScore = score;
				quiz.isCompleted = true;
			}
			return (
				<div>
					<TopBar {...this.props.location.state}/>
					<Grid container direction="column" justify="flex-start" alignItems="center">
						<Grid item>
							<h2>You've Completed the Quiz!<br/> Score: {quiz.pastScore}/{size}</h2><br/>
							<Button variant="contained" onClick={this.onBackToMain}>Back to Main Page</Button>
							<br/>
						</Grid>

						<Grid item>
							{quiz.questions.map((question, index) => (
								<div key={index}>
									<QuestionBlock instTxt={"Get QuizData"} rule={question.rule}
									               qCount={question.size} isReadOnly={true} showAnswer={true}
									               genMoreLimit={question.maxCADT} isQuiz={false}/>
									<p><span id="correctAnswerTxt">Correct Answer: {question.rule.ruleTxt}</span></p>
									<p><span id="studentAnswerTxt">Your Answer: {
										studentAnswers[index] ? studentAnswers[index] : (
											pastAnswers[index] ? pastAnswers[index] : "Timed Out"
										)
									}</span></p>
									<br/>
									<hr/>
								</div>
							))}
						</Grid>
					</Grid>
				</div>
			);
		}
	}
}

class CountdownTimer extends React.PureComponent {
	render() {
		return (
			<Countdown date={Date.now() + this.props.msec} onComplete={this.props.onTimeUp}/>
		);
	}
}

export default withRouter(QuizTaker);
