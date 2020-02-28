import React from "react";

import "./styles.css";

const templates = ["Template 1", "Template 2", "Template 3"];
const templateItems = templates.map((templates) => <li>{templates}</li>);
const question1 = {
	firstHint: "Phones of Interest: ['t', 'd', 'ʃ', 'ʒ'] Rule Type: Neutralizing",
	secondHint: "Phonemes: p b t d k ɡ ʔ t͡ʃ d͡ʒ f v θ ð s z ʃ ʒ m n ŋ w j i e ɛ ɔ u a",
	answer: "Rule: palatal mutation of alveolar stops to postalveolar fricatives before front vowels ===== [alveolar,oral stop] -> [postalveolar,fricative,continuant,posterior,laminal,strident],[] / _ [front,vowel]",
	gloss: ["a","b","c"],
	SR: ["A", "B", "C"],
	UR: ["X", "Y", "Z"],
	len: 3
};

class QuizTaker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {question: question1, num_question: question1.len, showAns: false, showUR: false};
	}

	clickShowAnswer = e => {
		this.setState({showAns: true});
	};

	clickShowUR = e => {
		this.setState({showUR: true});
	};

	render() {
		return (
			<div>
				<h1>Templates:</h1>
				<ul>{templateItems}</ul>
				<button onClick={this.clickShowUR}>Get Question!</button>
				<button onClick={this.clickShowAnswer}>Show Answer!</button>
				{this.state.showAns ? (<p>{this.state.question.answer}</p>) : null}
			</div>
		);
	}
}

export default QuizTaker;
