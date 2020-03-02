import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

//  options, title, default, onChange
export default class DropdownBlock extends React.Component {
	constructor(props) {
		super(props);

		this.state = {selection: props.default}
	}

	onChange = (e) => {
		this.setState({selection: e.target.value});
		this.props.onChange(e);
	};

	render() {
		const selection = this.state.selection;

		return (
			<div className={"formElement"}>
				<legend className={"labelText"}> {this.props.title}</legend>
				<Select className={"inputBlock"} onChange={this.onChange} value={selection}>
					{this.props.options.map((option) =>
						<MenuItem key={option}>{option}</MenuItem>
					)}
				</Select>

			</div>
		);
	}
}