import React from "react"
import Paper from '@material-ui/core/Paper'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";


const questionList = [{
	templates: ['[consonant]-[vowel]', '[consonant]-[vowel]-[consonant]', '[consonant]-[vowel]-[consonant]-[vowel]', '[consonant]-[vowel]-[obstruent,voiceless]-[obstruent,voiceless]-[vowel]', '[consonant]-[vowel]-[obstruent,voiced]-[consonant,voiced]-[vowel]', '[consonant]-[vowel]-[sonorant,contoid]-[consonant]-[vowel]', '[consonant]-[vowel]-[consonant]-[vowel]-[consonant]', '[consonant]-[vowel]-[obstruent,voiceless]-[obstruent,voiceless]-[vowel]-[consonant]', '[consonant]-[vowel]-[obstruent,voiced]-[consonant,voiced]-[vowel]-[consonant]', '[consonant]-[vowel]-[sonorant,contoid]-[consonant]-[vowel]-[consonant]'],
	poi: "['c', 'ɟ', 'ç', 'ʝ', 'ɲ', 'k', 'g', 'x', 'ɣ', 'ŋ']",
	ruleType: "Alternating",
	phoneme: "p b t d k g ʔ t͡ʃ d͡ʒ f v θ ð s z ʃ ʒ x ɣ m n ŋ l w j i e ɔ o æ ɑ",
	answer: "palatalization of velars after high front vowels",
	gloss: ['\'bounce\'', '\'wheat\'', '\'mosquito\'', '\'awaken\'', '\'two\'', '\'coastline\'', '\'rain\'', '\'lose\'', '\'we (incl)\'', '\'bring\'', '\'you (dual)\'', '\'what\'', '\'ketchup\'', '\'sun\'', '\'build\'', '\'lake\'', '\'west\'', '\'fight\'', '\'destroy\'', '\'thumb\'', '\'kneel\'', '\'few\'', '\'then\'', '\'black\'', '\'pretend\'', '\'food\'', '\'apple\'', '\'onion\'', '\'horn\'', '\'soybean\''],
	SR: ['diɲxɑ', 'ʃiɟe', 'ɣiçseɣ', 'ŋoʒziç', 'kicɑθ', 'ŋictog', 'xiɲʔo', 'lɔmiɟ', 'kiɲd͡ʒɑt͡ʃ', 'ʔicʃɑ', 'giʝneɣ', 'kɔfxiʝ', 'ʃiçɔ', 'liɲvoŋ', 'θiɲ', 'koxoʒ', 'ʒiʒŋi', 'zid͡ʒŋe', 'ɣɔɣjɔz', 'gæŋjɔ', 'ɣot͡ʃxæ', 'xoɣɣɔ', 'ɣækʔil', 'ʒogʒi', 'ðex', 'ŋɔp', 'ŋe', 'jældeʒ', 'ʔɑnmæ', 'pesin'],
	UR: ['diŋxɑ', 'ʃige', 'ɣixseɣ', 'ŋoʒzix', 'kikɑθ', 'ŋiktog', 'xiŋʔo', 'lɔmig', 'kiŋd͡ʒɑt͡ʃ', 'ʔikʃɑ', 'giɣneɣ', 'kɔfxiɣ', 'ʃixɔ', 'liŋvoŋ', 'θiŋ', 'koxoʒ', 'ʒiʒŋi', 'zid͡ʒŋe', 'ɣɔɣjɔz', 'gæŋjɔ', 'ɣot͡ʃxæ', 'xoɣɣɔ', 'ɣækʔil', 'ʒogʒi', 'ðex', 'ŋɔp', 'ŋe', 'jældeʒ', 'ʔɑnmæ', 'pesin']
}, {
	templates: ['[consonant]-[vowel]', '[consonant]-[vowel]-[consonant]', '[consonant]-[vowel]-[consonant]-[vowel]', '[consonant]-[vowel]-[obstruent,voiceless]-[obstruent,voiceless]-[vowel]', '[consonant]-[vowel]-[obstruent,voiced]-[consonant,voiced]-[vowel]', '[consonant]-[vowel]-[sonorant,contoid]-[consonant]-[vowel]', '[consonant]-[vowel]-[consonant]-[vowel]-[consonant]', '[consonant]-[vowel]-[obstruent,voiceless]-[obstruent,voiceless]-[vowel]-[consonant]', '[consonant]-[vowel]-[obstruent,voiced]-[consonant,voiced]-[vowel]-[consonant]', '[consonant]-[vowel]-[sonorant,contoid]-[consonant]-[vowel]-[consonant]'],
	poi: "['c', 'ɟ', 'ç', 'ʝ', 'k', 'ɡ', 'x', 'ɣ']",
	ruleType: "Alternating",
	phoneme: "p b t d k ɡ ʔ t͡ʃ d͡ʒ f v θ ð s z h x ɣ m n r l j i ɔ o u a",
	answer: "palatalization of velars after front vowels",
	gloss: ['\'inland\'', '\'mud\'', '\'evil\'', '\'brown\'', '\'fox\'', '\'face\'', '\'avoid\'', '\'corn\'', '\'threaten\'', '\'think\'', '\'almond\'', '\'honey\'', '\'choose\'', '\'sit\'', '\'baby\'', '\'full\'', '\'parent\'', '\'regret\'', '\'night\'', '\'shark\'', '\'drink\'', '\'tongue\'', '\'laugh\'', '\'that\'', '\'island\'', '\'repeat\'', '\'owl\'', '\'rabbit\'', '\'put\'', '\'hair\''],
	SR: ['miɟɡɔʔ', 'jici', 'niʝɡɔl', 'dihhiç', 't͡ʃiɟdu', 'jiɟu', 'xicu', 'ziʝ', 't͡ʃiʝjɔ', 'ɣiçso', 'ɣafiç', 'θicxi', 'xiçko', 'ɡɔdiç', 'xiçxɔ', 'fɔɡɔ', 'kɔsu', 'xub', 'dufxif', 'xɔ', 'pulɣa', 'ɣirkoj', 'ɡat͡ʃxap', 'ɡu', 'ɣɔxu', 'ɡij', 'ɣɔxaɡ', 'dolha', 'd͡ʒuθud͡ʒ', 'laðzaj'],
	UR: ['miɡɡɔʔ', 'jiki', 'niɣɡɔl', 'dihhix', 't͡ʃiɡdu', 'jiɡu', 'xiku', 'ziɣ', 't͡ʃiɣjɔ', 'ɣixso', 'ɣafix', 'θikxi', 'xixko', 'ɡɔdix', 'xixxɔ', 'fɔɡɔ', 'kɔsu', 'xub', 'dufxif', 'xɔ', 'pulɣa', 'ɣirkoj', 'ɡat͡ʃxap', 'ɡu', 'ɣɔxu', 'ɡij', 'ɣɔxaɡ', 'dolha', 'd͡ʒuθud͡ʒ', 'laðzaj']
}];

class QuizTile extends React.Component {
  constructor(props) {
		super(props);
	}

  render() {
    return(
      <Paper elevation={3}>
        <h4>Quiz #{this.props.quizId+1}</h4>
        <p>Score: {this.props.score}/{this.props.quizSize}</p>
        <ExpansionPanel>
         <ExpansionPanelSummary
           expandIcon={<ExpandMoreIcon />}
         >
           More details
         </ExpansionPanelSummary>
         <ExpansionPanelDetails>
          <Grid container spacing={1} alignItems="flex-end" key={this.props.quizId}>
            {this.props.studentAnswers.map((sAnswer, i) => {
              return(
                <Grid item key={i}>
                  <Paper elevation={2}>
                    <p><strong>Question #{i+1}:</strong></p>
                    <p>Your Answer: {sAnswer}</p>
                    <p>Correct Answer: {questionList[i].answer}</p>
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
         </ExpansionPanelDetails>
        </ExpansionPanel>
      </Paper>
    )
  }
}

export default withRouter(QuizTile)
