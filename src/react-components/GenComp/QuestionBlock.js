import React from "react";
import "./QuestionBlock.css"
import DropdownBlock from "./DropdownBlock";

const DEFAULT_HINT = "Full Phonemes";
const DEFAULT_GEN_TYPE = "CADT";

//  instTxt, question, submitAction, carryBlock (null)
export default class QuestionBlock extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showAns: false,
			showUR: false,
			showPhoneme: false,
			hintMode: DEFAULT_HINT,
			genType: DEFAULT_GEN_TYPE,
			qCount: props.qCount
		};
	}

	clickShowAnswer = (e) => {
		this.setState({showAns: true});
		this.setState({showUR: true});
		this.setState({showPhoneme: true});
		e.preventDefault();
	};

	onGetHint = (e) => {
		switch (this.state.hintMode) {
			case "Full Phonemes":
				this.setState({showPhoneme: true});
				break;

			case "UR":
				this.setState({showUR: true});
				break;

			default:
				break;
		}

		e.preventDefault();
	};

	onGenMore = (e) => {
		switch (this.state.genType) {
			case "CADT":
				this.setState({qCount: this.state.qCount + 5});
				break;

			case "CAND":

				break;

			case "NCAD":

				break;

			default:
				break;
		}

		e.preventDefault();
	};

	onHintChange = (e) => {
		this.setState({hintMode: e.target.value})
	};

	onGenTypeChange = (e) => {
		this.setState({genType: e.target.value})
	};

	render() {
		const showUR = this.state.showUR;
		const showAns = this.state.showAns;
		const showPhoneme = this.state.showPhoneme;
		const question = this.props.question;
		const endIndex = Math.min(this.state.qCount, question.UR.length);
		const templates = question.templates;
		const sp1 = endIndex / 3;
		const sp2 = endIndex / 3 * 2;
		const urs = [question.UR.slice(0, sp1), question.UR.slice(sp1, sp2), question.UR.slice(sp2, endIndex)];
		const srs = [question.SR.slice(0, sp1), question.SR.slice(sp1, sp2), question.SR.slice(sp2, endIndex)];
		const gls = [question.gloss.slice(0, sp1), question.gloss.slice(sp1, sp2),
			question.gloss.slice(sp2, question.gloss.length)];

		return (
			<div>
				<table id={"infoTable"}>
					<tbody>
					<tr>
						{
							typeof this.props.carryBlock !== 'undefined' && this.props.carryBlock !== null ?
								(<td id={"carryBlock"}>{this.props.carryBlock}</td>) : null
						}

						<td id={"helpForm"}>
							<fieldset className={"formElement"} id={"helpBlock"}>
								<legend id={"helpTitle"}>Extra Help</legend>
								<div id={"hintBlock"}>
									<DropdownBlock options={["Full Phonemes", "UR"]} default={DEFAULT_HINT}
									               title={"More Hints"} onChange={this.onHintChange}/>
									<button onClick={this.onGetHint}>Get Hint!</button>
								</div>

								<div id={"genMore"}>
									<DropdownBlock options={["CADT", "CAND", "NCAD"]} default={DEFAULT_GEN_TYPE}
									               title={"Generate More"} onChange={this.onGenTypeChange}/>
									<button onClick={this.onGenMore}>Get More!</button>
								</div>
							</fieldset>
						</td>

						<td id={"templateData"}>
							<h3>Templates:</h3>
							<ul>
								{
									templates.map((template) => (<li key={template}>{template}</li>))
								}
							</ul>
						</td>
					</tr>
					</tbody>
				</table>

				<div id={"buttonField"}>
					<button onClick={this.props.submitAction}>{this.props.instTxt}</button>
					<button onClick={this.clickShowAnswer}>Get Answer</button>
				</div>
				<hr/>
				<div id={"hintField"}>
					{showAns ? (<p id={"answerText"}><span>{question.answer}</span></p>) : null}
					{showPhoneme ? (<p><span className={"hintTitle"}>Phonemes: </span>{question.phoneme}</p>) : null}
					<p><span className={"hintTitle"}>Phones of Interest: </span>{question.poi}
						<span className={"hintTitle"}>Rule Type: </span>{question.ruleType}
						<span className={"hintTitle"}>Count: </span>{this.state.qCount}</p>
				</div>

				<table className={"qusTable"} id={"qusT1"}>
					<tbody>
					<tr className={"headerRow"}>
						{showUR ? <th className={"headerRow"}>UR</th> : null}
						<th className={"headerRow"}>SR</th>
						<th className={"headerRow"}>Gloss</th>
					</tr>

					{
						urs[0].map((urWord, i) => (
							<tr key={urWord}>
								{showUR ? <td>{urWord}</td> : null}
								<td className={"srCol"}>{srs[0][i]}</td>
								<td>{gls[0][i]}</td>
							</tr>
						))
					}
					</tbody>
				</table>

				<table className={"qusTable"} id={"qusT2"}>
					<tbody>
					<tr className={"headerRow"}>
						{showUR ? <th className={"headerRow"}>UR</th> : null}
						<th className={"headerRow"}>SR</th>
						<th className={"headerRow"}>Gloss</th>
					</tr>

					{
						urs[1].map((urWord, i) => (
							<tr key={urWord}>
								{showUR ? <td>{urWord}</td> : null}
								<td className={"srCol"}>{srs[1][i]}</td>
								<td>{gls[1][i]}</td>
							</tr>
						))
					}
					</tbody>
				</table>

				<table className={"qusTable"}>
					<tbody>
					<tr className={"headerRow"}>
						{showUR ? <th className={"headerRow"}>UR</th> : null}
						<th className={"headerRow"}>SR</th>
						<th className={"headerRow"}>Gloss</th>
					</tr>

					{
						urs[2].map((urWord, i) => (
							<tr key={urWord}>
								{showUR ? <td>{urWord}</td> : null}
								<td className={"srCol"}>{srs[2][i]}</td>
								<td>{gls[2][i]}</td>
							</tr>
						))
					}
					</tbody>
				</table>

			</div>
		);
	}
}
