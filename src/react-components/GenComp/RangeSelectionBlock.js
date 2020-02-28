import React from "react";
import "./GenComp.css"

// rangeMax, rangeMin, allowEmpty, default, title
export default class RangeSelectionBlock extends React.Component {

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
				<legend className={"labelText"}>{this.props.title}</legend>
				<div className={"inputBlock"}>
					<input value={selection} onChange={this.onChange} onBlur={this.onBlur}/>
					{warning === "" ? null : (<p className={"validateWarn"}>{warning}</p>)}
				</div>

			</div>
		);
	}
}
