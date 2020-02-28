import React from "react";
import "./GenComp.css"

//  options, title, default
export default class DropdownBlock extends React.Component {
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
				<legend className={"labelText"}> {this.props.title}</legend>
				<select className={"inputBlock"} onChange={this.onChange} value={selection}>
					{this.props.options.map((option) =>
						<option key={option}>{option}</option>
					)}
				</select>

			</div>
		);
	}
}