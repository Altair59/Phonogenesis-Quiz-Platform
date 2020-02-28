import React from "react";
import "./GenComp.css"

//  title
export default class CheckboxBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div className={"formElement"}>
				<label className={"labelText"}> {this.props.title}</label>
				<input type={"checkbox"}/>
			</div>
		);
	}
}