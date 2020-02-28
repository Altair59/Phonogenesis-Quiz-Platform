import React from "react";

import "./SimpleGenerator.css";
import DropdownBlock from "./GenComp/DropdownBlock";
import CheckboxBlock from "./GenComp/CheckboxBlock";
import RangeSelectionBlock from "./GenComp/RangeSelectionBlock";
import HelpBlock from "./GenComp/HelpBlock";

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
				<HelpBlock/>
				<CheckboxBlock title={"Shuffle Result"}/>
				<CheckboxBlock title={"Use IPA [ɡ]"}/>
			</form>
		);
	};
}


export default SimpleGenerator;
