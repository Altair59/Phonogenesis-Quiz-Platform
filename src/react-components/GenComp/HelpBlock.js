import React from "react";
import DropdownBlock from "./DropdownBlock"
import "./GenComp.css"
import "./HelpBlock.css"

export default class HelpBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	onGenMore = (e) => {

	};

	onGetHint = (e) => {

	};

	render() {
		return (
			<fieldset className={"formElement"} id={"helpBlock"}>
				<legend id={"helpTitle"}>Extra Help</legend>
				<div id={"hintBlock"}>
					<DropdownBlock options={["Full Phonemes", "UR"]} default={"Full Phonemes"} title={"More Hints"}/>
					<button onClick={this.onGetHint}>Get Hint!</button>
				</div>

				<div id={"genMore"}>
					<DropdownBlock options={["CADT", "CAND", "NCAD"]} default={"CADT"} title={"Generate More"}/>
					<button onClick={this.onGenMore}>Get More!</button>
				</div>
			</fieldset>
		);
	}
}