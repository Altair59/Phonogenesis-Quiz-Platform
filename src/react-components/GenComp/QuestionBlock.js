import React from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


//  instTxt, question, nextQuestion (null), genBlock (null)
export default class QuestionBlock extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showAns: false,
			showUR: false,
			showPhoneme: false,
			isQuiz: typeof props === "undefined" || props.genBlock === null,
			qCount: props.qCount
		};
	}

	onShowAnswer = (e) => {
		this.setState({showAns: true});
		this.setState({showUR: true});
		this.setState({showPhoneme: true});
		e.preventDefault();
	};

	onGetPhonemes = (e) => {
		this.setState({showPhoneme: true});
		e.preventDefault();
	};

	onGetUR = (e) => {
		this.setState({showUR: true});
		e.preventDefault();
	};

	onMoreCADT = (e) => {
		this.setState({qCount: this.state.qCount + 5});
		e.preventDefault();
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
			<Grid container direction="column" justify="flex-start" alignItems="center" spacing={7}>
				<Grid item>
					<Grid container direction="row" justify="flex-start" alignItems="center" spacing={7}>

						<Grid item>
							<Grid container direction="column" justify="space-evenly" alignItems="center"
							      spacing={2}>
								{
									typeof this.props.genBlock !== 'undefined' && this.props.genBlock !== null ?
										(<Grid item>{this.props.genBlock}</Grid>) : null
								}
							</Grid>
						</Grid>

						<Grid item>
							<Typography variant="h5">Templates: </Typography>
							<ul>
								{
									templates.map((template) => (
										<li key={template}>{template}</li>))
								}
							</ul>
						</Grid>
					</Grid>
				</Grid>

				<Grid item>
					<Grid container direction="row" justify="flex-start" alignItems="center" spacing={7}>
						<Grid item>
							<Grid container direction={"column"} justify={"flex-start"} alignItems={"center"}
							      spacing={2}>
								<Grid item>
									<Grid container direction={"row"} justify="flex-start" alignItems={"center"} spacing={7}>
										<Grid item>
											<Grid container direction="column" justify="space-evenly" alignItems="center"
											      spacing={3}>
												<Grid item>
													<ButtonGroup variant="contained" color="primary"
													             aria-label={"contained primary hint button group"}>
														<Button onClick={this.onGetPhonemes}>Get Phonemes</Button>
														<Button onClick={this.onGetUR}>Get UR</Button>
													</ButtonGroup>
												</Grid>

												<Grid item>
													<ButtonGroup variant="contained" color="primary"
													             aria-label={"contained primary hint button group"}>
														<Button onClick={this.onMoreCADT}>More CADT</Button>
														<Button>More CAND</Button>
														<Button>More NCAD</Button>
													</ButtonGroup>
												</Grid>
											</Grid>
										</Grid>

										{this.state.isQuiz ? (
											<Grid item>[
												<Button vraiant="contained" color="primary" onClick={this.props.nextQuestion}>Next
													Question</Button>
											</Grid>
										) : (
											<Grid item>
												<Button vraiant="contained" color="primary" onClick={this.onShowAnswer}>Show
													Answer</Button>
											</Grid>
										)}
									</Grid>
								</Grid>

								{showAns ? (<Grid item>Rule: {question.answer}</Grid>) : null}
								{showPhoneme ? (<Grid item>Phonemes: {question.phoneme}</Grid>) : null}
								<Grid item>Phones of Interest: {question.poi}</Grid>
								<Grid item>Rule Type: {question.ruleType}</Grid>
								<Grid item>Count: {this.state.qCount}</Grid>
							</Grid>
						</Grid>

						<Grid item>
							<Grid container direction={"row"} justify="space-evenly" alignItems={"center"}>

								{[0, 1, 2].map((index) => (
									<Grid item>
										<TableContainer component={Paper}>
											<Table aria-label="question data table">
												<TableHead>
													<TableRow>
														{showUR ? <TableCell align="center">UR</TableCell> : null}
														<TableCell align="center">SR</TableCell>
														<TableCell align="center">Gloss</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{
														urs[index].map((urWord, i) => (
															<TableRow key={urWord}>
																{showUR ?
																	<TableCell align="center">{urWord}</TableCell> : null}
																<TableCell align="center">{srs[index][i]}</TableCell>
																<TableCell align="center">{gls[index][i]}</TableCell>
															</TableRow>
														))
													}
												</TableBody>
											</Table>
										</TableContainer>
									</Grid>
								))}
							</Grid>
						</Grid>
					</Grid>
				</Grid>


			</Grid>
		);
	}
}
