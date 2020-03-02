import React from "react";

import DropdownBlock from "./QuestionComp/DropdownBlock";
import CheckboxBlock from "./QuestionComp/CheckboxBlock";
import RangeSelectionBlock from "./QuestionComp/RangeSelectionBlock";
import QuestionBlock from "./QuestionComp/QuestionBlock";


const question1 = {
	templates: ['[consonant]-[vowel]', '[consonant]-[vowel]-[consonant]', '[consonant]-[vowel]-[consonant]-[vowel]', '[consonant]-[vowel]-[obstruent,voiceless]-[obstruent,voiceless]-[vowel]', '[consonant]-[vowel]-[obstruent,voiced]-[consonant,voiced]-[vowel]', '[consonant]-[vowel]-[sonorant,contoid]-[consonant]-[vowel]', '[consonant]-[vowel]-[consonant]-[vowel]-[consonant]', '[consonant]-[vowel]-[obstruent,voiceless]-[obstruent,voiceless]-[vowel]-[consonant]', '[consonant]-[vowel]-[obstruent,voiced]-[consonant,voiced]-[vowel]-[consonant]', '[consonant]-[vowel]-[sonorant,contoid]-[consonant]-[vowel]-[consonant]'],
	poi: "['c', 'ɟ', 'ç', 'ʝ', 'ɲ', 'k', 'g', 'x', 'ɣ', 'ŋ']",
	ruleType: "Alternating",
	phoneme: "p b t d k g ʔ t͡ʃ d͡ʒ f v θ ð s z ʃ ʒ x ɣ m n ŋ l w j i e ɔ o æ ɑ",
	answer: "palatalization of velars after high front vowels",
	gloss: ['\'bounce\'', '\'wheat\'', '\'mosquito\'', '\'awaken\'', '\'two\'', '\'coastline\'', '\'rain\'', '\'lose\'', '\'we (incl)\'', '\'bring\'', '\'you (dual)\'', '\'what\'', '\'ketchup\'', '\'sun\'', '\'build\'', '\'lake\'', '\'west\'', '\'fight\'', '\'destroy\'', '\'thumb\'', '\'kneel\'', '\'few\'', '\'then\'', '\'black\'', '\'pretend\'', '\'food\'', '\'apple\'', '\'onion\'', '\'horn\'', '\'soybean\''],
	SR: ['diɲxɑ', 'ʃiɟe', 'ɣiçseɣ', 'ŋoʒziç', 'kicɑθ', 'ŋictog', 'xiɲʔo', 'lɔmiɟ', 'kiɲd͡ʒɑt͡ʃ', 'ʔicʃɑ', 'giʝneɣ', 'kɔfxiʝ', 'ʃiçɔ', 'liɲvoŋ', 'θiɲ', 'koxoʒ', 'ʒiʒŋi', 'zid͡ʒŋe', 'ɣɔɣjɔz', 'gæŋjɔ', 'ɣot͡ʃxæ', 'xoɣɣɔ', 'ɣækʔil', 'ʒogʒi', 'ðex', 'ŋɔp', 'ŋe', 'jældeʒ', 'ʔɑnmæ', 'pesin'],
	UR: ['diŋxɑ', 'ʃige', 'ɣixseɣ', 'ŋoʒzix', 'kikɑθ', 'ŋiktog', 'xiŋʔo', 'lɔmig', 'kiŋd͡ʒɑt͡ʃ', 'ʔikʃɑ', 'giɣneɣ', 'kɔfxiɣ', 'ʃixɔ', 'liŋvoŋ', 'θiŋ', 'koxoʒ', 'ʒiʒŋi', 'zid͡ʒŋe', 'ɣɔɣjɔz', 'gæŋjɔ', 'ɣot͡ʃxæ', 'xoɣɣɔ', 'ɣækʔil', 'ʒogʒi', 'ðex', 'ŋɔp', 'ŋe', 'jældeʒ', 'ʔɑnmæ', 'pesin']
};

const questionList = [question1];


const QUESTION_SIZE_MIN = 15;
const QUESTION_SIZE_MAX = 40;
const RULE_SELECTION_MIN = 1;
const RULE_SELECTION_MAX = 3;

class SimpleGenerator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	onGetQuestion = (e) => {

	};

	render() {
		return (
			<form id={"simpleGenForm"}>
				<div id={"questionForm"}>
					<QuestionBlock instTxt={"Get Question"} question={questionList[0]}
					               submitAction={this.onGetQuestion} qCount={15} isReadOnly={false} showAnswer={false}
					               genBlock={(
						               <div id={"genSpecForm"}>
							               <RangeSelectionBlock rangeMax={RULE_SELECTION_MAX}
							                                    rangeMin={RULE_SELECTION_MIN}
							                                    allowEmpty={true} default={''}
							                                    title={"Rule NO. (range 1-3, blank for random)"}/>
							               <RangeSelectionBlock rangeMax={QUESTION_SIZE_MAX}
							                                    rangeMin={QUESTION_SIZE_MIN}
							                                    allowEmpty={true} default={''}
							                                    title={"Question Size (range 15-40)"}/>
							               <DropdownBlock
								               options={["Random", "Alternating", "Neutralizing", "Mixed - Alternating & Neutralizing"]}
								               default={"Random"} title={"Question Type"}/>
							               <CheckboxBlock title={"Shuffle Result"}/>
							               <CheckboxBlock title={"Use IPA [ɡ]"}/>
						               </div>
					               )}/>
				</div>

			</form>
		);
	};
}


export default SimpleGenerator;
