import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import "./QuizTaker.css";
import QuestionBlock from "./QuestionComp/QuestionBlock";
import TopBar from "./TopBar.js"
import Countdown from 'react-countdown-now';
import {withRouter} from "react-router-dom";

const answerPool = ['word-final obstruent devoicing', 'word-initial aspiration of voiceless stops', 'intervocalic fricative voicing', 'vowel laxing in closed syllables', 'palatal mutation of velar stops to postalveolar affricates before front vowels', 'word-final stop devoicing', 'word-final consonant devoicing', 'obstruent devoicing in codas', 'obstruent devoicing in codas', 'aspiration of voiceless stops in onsets', 'aspiration of voiceless stops in codas', 'word-final aspiration of voiceless stops', 'intervocalic fricative voicing', 'intervocalic obstruent voicing', 'intervocalic spirantization of voiced stops', 'postvocalic spirantization of voiced stops', 'spirantization of voiceless stops in codas', 'high vowel laxing in closed syllables', 'mid vowel laxing in closed syllables', 'palatal mutation of velar stops to postalveolar affricates before front vowels', 'palatal mutation of velar stops to postalveolar fricatives before front vowels', 'palatal mutation of velar stops to alveolar affricates before front vowels', 'palatal mutation of velar stops to alveolar fricatives before front vowels', 'palatal mutation of alveolar stops to postalveolar affricates before front vowels', 'palatal mutation of alveolar stops to postalveolar fricatives before front vowels', 'palatal mutation of alveolar stops to alveolar affricates before front vowels', 'palatal mutation of alveolar stops to alveolar fricatives before front vowels', 'palatal mutation of velar stops to postalveolar affricates before high front vowels', 'palatal mutation of velar stops to postalveolar fricatives before high front vowels', 'palatal mutation of velar stops to alveolar affricates before high front vowels', 'palatal mutation of velar stops to alveolar fricatives before high front vowels', 'palatal mutation of alveolar stops to postalveolar affricates before high front vowels', 'palatal mutation of alveolar stops to postalveolar fricatives before high front vowels', 'palatal mutation of alveolar stops to alveolar affricates before high front vowels', 'palatal mutation of alveolar stops to alveolar fricatives before high front vowels', 'palatalization of velars after front vowels', 'palatalization of velars before front vowels', 'palatalization of velar fricatives after front vowels', 'palatalization of velar fricatives before front vowels', 'palatalization of velars after high front vowels', 'palatalization of velars before high front vowels', 'palatalization of velar fricatives after high front vowels', 'palatalization of velar fricatives before high front vowels', 'regressive vowel nasalization', 'progressive vowel nasalization', 'regressive vowel nasalization from nasal codas', 'word-final vowel devoicing', 'word-final high vowel devoicing', 'word-final vowel devoicing after voiceless consonants', 'word-final high vowel devoicing after voiceless consonants', 'vowel devoicing between voiceless consonants', 'high vowel devoicing between voiceless consonants', 'postnasal voicing of stops', 'postnasal voicing of obstruents', 'postnasal voicing of fricatives', 'word-final raising of mid vowels', 'word-final lowerinɡ of hiɡh vowels', 'word-final raising of low vowels', 'raising of mid vowels before voiceless codas', 'raising of low vowels before voiceless codas', 'raising of mid vowels before voiced codas', 'uvularization of velars after back non-high vowels', 'uvularization of velars before back non-high vowels', 'velarization of /l/ before back vowels', 'velarization of /l/ after back vowels', 'dentalization of alveolar stops before front vowels', 'dentalization and spirantization of alveolar stops before front vowels', 'lateralization of /d/ before nonhigh vowels', 'lateralization of /d/ after nonhigh vowels', 'retraction of high front vowels after postalveolars', 'retraction of high front vowels after velars', 'fronting of high back vowels after alveolars', 'word-final ashibilation of alveolar fricatives', 'ashibilation of alveolar fricatives in codas', 'debuccalization of /s/ in codas', 'velarization of /l/ in codas', 'intervocalic deletion of voiced velar obstruents', 'intervocalic deletion of velar obstruents', 'intervocalic deletion of voiced velar oral stops', 'intervocalic deletion of voiced obstruents', 'intervocalic deletion of voiced oral stops', 'deletion of high vowels in final closed syllables to create rising sonority codas', 'deletion of high front vowels in final closed syllables to carete rising sonority codas'];

// 30 ur
const questionList = [{
	templates: ['[consonant]-[vowel]', '[consonant]-[vowel]-[consonant]', '[consonant]-[vowel]-[consonant]-[vowel]', '[consonant]-[vowel]-[obstruent,voiceless]-[obstruent,voiceless]-[vowel]', '[consonant]-[vowel]-[obstruent,voiced]-[consonant,voiced]-[vowel]', '[consonant]-[vowel]-[sonorant,contoid]-[consonant]-[vowel]', '[consonant]-[vowel]-[consonant]-[vowel]-[consonant]', '[consonant]-[vowel]-[obstruent,voiceless]-[obstruent,voiceless]-[vowel]-[consonant]', '[consonant]-[vowel]-[obstruent,voiced]-[consonant,voiced]-[vowel]-[consonant]', '[consonant]-[vowel]-[sonorant,contoid]-[consonant]-[vowel]-[consonant]'],
	poi: "['c', 'ɟ', 'ç', 'ʝ', 'ɲ', 'k', 'g', 'x', 'ɣ', 'ŋ']",
	ruleType: "Alternating",
	phoneme: "p b t d k g ʔ t͡ʃ d͡ʒ f v θ ð s z ʃ ʒ x ɣ m n ŋ l w j i e ɔ o æ ɑ",
	answer: "palatalization of velars after high front vowels",
	gloss: ['\'bounce\'', '\'wheat\'', '\'mosquito\'', '\'awaken\'', '\'two\'', '\'coastline\'', '\'rain\'', '\'lose\'', '\'we (incl)\'', '\'bring\'', '\'you (dual)\'', '\'what\'', '\'ketchup\'', '\'sun\'', '\'build\'', '\'lake\'', '\'west\'', '\'fight\'', '\'destroy\'', '\'thumb\'', '\'kneel\'', '\'few\'', '\'then\'', '\'black\'', '\'pretend\'', '\'food\'', '\'apple\'', '\'onion\'', '\'horn\'', '\'soybean\''],
	SR: ['diɲxɑ', 'ʃiɟe', 'ɣiçseɣ', 'ŋoʒziç', 'kicɑθ', 'ŋictog', 'xiɲʔo', 'lɔmiɟ', 'kiɲd͡ʒɑt͡ʃ', 'ʔicʃɑ', 'giʝneɣ', 'kɔfxiʝ', 'ʃiçɔ', 'liɲvoŋ', 'θiɲ', 'koxoʒ', 'ʒiʒŋi', 'zid͡ʒŋe', 'ɣɔɣjɔz', 'gæŋjɔ', 'ɣot͡ʃxæ', 'xoɣɣɔ', 'ɣækʔil', 'ʒogʒi', 'ðex', 'ŋɔp', 'ŋe', 'jældeʒ', 'ʔɑnmæ', 'pesin'],
	UR: ['diŋxɑ', 'ʃige', 'ɣixseɣ', 'ŋoʒzix', 'kikɑθ', 'ŋiktog', 'xiŋʔo', 'lɔmig', 'kiŋd͡ʒɑt͡ʃ', 'ʔikʃɑ', 'giɣneɣ', 'kɔfxiɣ', 'ʃixɔ', 'liŋvoŋ', 'θiŋ', 'koxoʒ', 'ʒiʒŋi', 'zid͡ʒŋe', 'ɣɔɣjɔz', 'gæŋjɔ', 'ɣot͡ʃxæ', 'xoɣɣɔ', 'ɣækʔil', 'ʒogʒi', 'ðex', 'ŋɔp', 'ŋe', 'jældeʒ', 'ʔɑnmæ', 'pesin']
}, {
	templates: ['[consonant]-[vowel]', '[consonant]-[vowel]-[consonant]', '[consonant]-[vowel]-[consonant]-[vowel]', '[consonant]-[vowel]-[obstruent,voiceless]-[obstruent,voiceless]-[vowel]', '[consonant]-[vowel]-[obstruent,voiced]-[consonant,voiced]-[vowel]', '[consonant]-[vowel]-[sonorant,contoid]-[consonant]-[vowel]', '[consonant]-[vowel]-[consonant]-[vowel]-[consonant]', '[consonant]-[vowel]-[obstruent,voiceless]-[obstruent,voiceless]-[vowel]-[consonant]', '[consonant]-[vowel]-[obstruent,voiced]-[consonant,voiced]-[vowel]-[consonant]', '[consonant]-[vowel]-[sonorant,contoid]-[consonant]-[vowel]-[consonant]'],
	poi: "['c', 'ɟ', 'ç', 'ʝ', 'k', 'ɡ', 'x', 'ɣ']",
	ruleType: "Alternating",
	phoneme: "p b t d k ɡ ʔ t͡ʃ d͡ʒ f v θ ð s z h x ɣ m n r l j i ɔ o u a",
	answer: "palatalization of velars after front vowels",
	gloss: ['\'inland\'', '\'mud\'', '\'evil\'', '\'brown\'', '\'fox\'', '\'face\'', '\'avoid\'', '\'corn\'', '\'threaten\'', '\'think\'', '\'almond\'', '\'honey\'', '\'choose\'', '\'sit\'', '\'baby\'', '\'full\'', '\'parent\'', '\'regret\'', '\'night\'', '\'shark\'', '\'drink\'', '\'tongue\'', '\'laugh\'', '\'that\'', '\'island\'', '\'repeat\'', '\'owl\'', '\'rabbit\'', '\'put\'', '\'hair\''],
	SR: ['miɟɡɔʔ', 'jici', 'niʝɡɔl', 'dihhiç', 't͡ʃiɟdu', 'jiɟu', 'xicu', 'ziʝ', 't͡ʃiʝjɔ', 'ɣiçso', 'ɣafiç', 'θicxi', 'xiçko', 'ɡɔdiç', 'xiçxɔ', 'fɔɡɔ', 'kɔsu', 'xub', 'dufxif', 'xɔ', 'pulɣa', 'ɣirkoj', 'ɡat͡ʃxap', 'ɡu', 'ɣɔxu', 'ɡij', 'ɣɔxaɡ', 'dolha', 'd͡ʒuθud͡ʒ', 'laðzaj'],
	UR: ['miɡɡɔʔ', 'jiki', 'niɣɡɔl', 'dihhix', 't͡ʃiɡdu', 'jiɡu', 'xiku', 'ziɣ', 't͡ʃiɣjɔ', 'ɣixso', 'ɣafix', 'θikxi', 'xixko', 'ɡɔdix', 'xixxɔ', 'fɔɡɔ', 'kɔsu', 'xub', 'dufxif', 'xɔ', 'pulɣa', 'ɣirkoj', 'ɡat͡ʃxap', 'ɡu', 'ɣɔxu', 'ɡij', 'ɣɔxaɡ', 'dolha', 'd͡ʒuθud͡ʒ', 'laðzaj']
}];

class QuizTaker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			questionIndex: 0,
			choices: this.genChoicesFromPool(questionList[0].answer, 4),
			allowUR: true,
			allowPhonemes: true,
			maxGenMore: 2,
			quizSize: 2,
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
		const choice = this.state.choices[e.currentTarget.id];

		if (choice === questionList[this.state.questionIndex].answer) {
			this.setState({score: this.state.score + 1});
		}
		this.setState({studentAnswers: this.state.studentAnswers.concat(choice)});

		const newIndex = this.state.questionIndex + 1;
		this.setState({questionIndex: newIndex});
		this.setState({qKey: this.state.qKey + 1});

		if (newIndex < this.state.quizSize) {
			this.setState({choices: this.genChoicesFromPool(questionList[newIndex].answer, 4)});
		}

		e.preventDefault();
	};

	onTimeUp = () => {
		alert("You've used up all your time!");
		this.setState({questionIndex: questionList.length});
	};

	onBackToMain = (e) => {
		let { state } = this.props.location;
		this.props.history.push({
			pathname: '/student',
			state: {
				type: state.type,
				name: state.name,
				email: state.email,
				username: state.username,
				password: state.password,
				quizzes: [...state.quizzes, {...this.state, quizId: state.quizzes.length}]
			}
		});
		e.preventDefault();
	};

	render() {
		const size = this.state.quizSize;
		const index = this.state.questionIndex;
		const score = this.state.score;
		const choices = this.state.choices;
		const studentAnswers = this.state.studentAnswers;
		const genMoreLimit = this.state.maxGenMore;
		const qKey = this.state.qKey;

		if (index < size) {
			return (
				<div>
					<TopBar {...this.props.location.state}/>
					<QuestionBlock instTxt={"Get Question"} question={questionList[index]} qCount={20}
					               isReadOnly={false} showAnswer={false} genMoreLimit={genMoreLimit} key={qKey}/>
					<br/>
					<hr/>
					<br/>
					<Grid container direction="row" justify="center" alignItems="center" spacing={10}>
						<Grid item id="ctd">
							Time Remain &nbsp; <CountdownTimer onTimeUp={this.onTimeUp}/>
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
			return (
				<div>
					<TopBar {...this.props.location.state}/>
					<Grid container direction="column" justify="flex-start" alignItems="center">
						<Grid item>
							<h2>You've Completed the Quiz!<br/> Score: {score}/{size}</h2>
							<Button variant="contained" onClick={this.onBackToMain}>Back to Main Page</Button>
						</Grid>

						<Grid item>
							{questionList.map((question, index) => (
								<div key={index}>
									<QuestionBlock instTxt={"Get Question"} question={questionList[index]}
									               qCount={20} isReadOnly={true} showAnswer={true}
									               genMoreLimit={genMoreLimit}/>
									<p id="correctAnswerTxt">Correct Answer: {question.answer}</p>
									<p id="studentAnswerTxt">Your Answer: {
										studentAnswers[index] ? studentAnswers[index] : "Timed Out"
									}</p>
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
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Countdown date={Date.now() + 10000} onComplete={this.props.onTimeUp}/>
		);
	}
}

export default withRouter(QuizTaker);
