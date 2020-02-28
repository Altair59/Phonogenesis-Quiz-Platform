import React from "react";

import "./styles.css";

const QUESTION_SIZE_MIN = 15;
const QUESTION_SIZE_MAX = 40;
const RULE_SELECTION_MIN = 1;
const RULE_SELECTION_MAX = 3;

class SimpleGenerator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<form>
				<RangeSelectionBlock rangeMax={RULE_SELECTION_MAX} rangeMin={RULE_SELECTION_MIN} allowEmpty={true}
				                     default={''} title={"Rule NO. (range 1-3, blank for random)"}/>
				<RangeSelectionBlock rangeMax={QUESTION_SIZE_MAX} rangeMin={QUESTION_SIZE_MIN} allowEmpty={true}
				                     default={''} title={"Question Size (range 15-40)"}/>
				<DropdownBlock options={["Random", "Alternating", "Neutralizing", "Mixed - Alternating & Neutralizing"]}
				               default={"Random"} title={"Question Type"}/>
				<DropdownBlock options={["Full Phonemes", "UR"]} default={"Full Phonemes"} title={"More Hints"}/>
				<DropdownBlock options={["CADT", "CAND", "NCAD"]} default={"CADT"} title={"Question Type"}/>
			</form>
		);
	};
}

// rangeMax, rangeMin, allowEmpty, default, title
class RangeSelectionBlock extends React.Component {

	constructor(props) {
		super(props);
		this.state = {selection: props.default, warning: ''}
	}

	onBlur = (e) => {
		const input = e.target.value;

		if (!this.props.allowEmpty && input.length === 0) {     //  NUMBER OR BLANK ONLY
			this.setState({warning: "can't be empty"});
			return;
		}

		if (input.length > 0) {     //  RANGE CHECK IF IT'S NON-EMPTY
			const selected = Number(input);

			if (selected > this.props.rangeMax || selected < this.props.rangeMin) {
				this.setState({warning: "out of range"})
			}
		}
	};

	onChange = (e) => {
		const input = e.target.value;

		if (input.match(/^\d*$/)) {      //  ONLY REGISTER INPUT IF IT'S A NUMBER
			this.setState({selection: input, warning: ""})
		}
	};

	render() {
		const selection = this.state.selection;
		const warning = this.state.warning;

		return (
			<div className={"formElement"}>
				<legend className={"titleText"}>{this.props.title}</legend>
				<div className={"inputBlock"}>
					<input value={selection} onChange={this.onChange} onBlur={this.onBlur}/>
					{warning === "" ? null : (<p className={"validateWarn"}>{warning}</p>)}
				</div>
			</div>
		);
	}
}

//  options, title, default
class DropdownBlock extends React.Component {
	constructor(props) {
		super(props);

		this.state = {selection: props.default}
	}

	onChange = (e) => {
		this.setState({selection: e.target.value})
	};

	render() {
		const selection = this.state.selection;

		return (
			<div className={"formElement"}>
				<legend className={"titleText"}>{this.props.title}</legend>
				<select  className={"inputBlock"} onChange={this.onChange} value={selection}>
					{this.props.options.map((option) =>
						<option key={option}>{option}</option>
					)}
				</select>
			</div>
		);
	}
}

export default SimpleGenerator;
