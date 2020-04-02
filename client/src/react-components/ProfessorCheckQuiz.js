import React from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import TopBar from "./TopBar.js";
import {withRouter} from "react-router-dom";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

//import "./ProfGroupPage.css";

class ProfessorCheckQuiz extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showResult: false,
			currentQuizName: "",
			pastQuizzes: {}
		};
	}

	handleQuizSelect = (event) => {
		this.setState({currentQuizName: event.target.value});
	};

	render() {
		return (
			<div>
				<TopBar history={this.props.history} app={this.props.app}/>
				<br/><br/>

				<Grid container direction="column" spacing={4} justify="center" alignItems="center">
					<Grid item>
						<Grid container direction="row" justify="center" alignItems="center" spacing={4}>
							<Grid item>
								<h4>Target Quiz: &nbsp;</h4>
								<Select id="quiz-sel" label={"ddd"} onChange={this.handleQuizSelect}>
									{this.state.quizzes.map((quiz) => (
										<MenuItem key={quiz.name} value={quiz.name}>{quiz.name}</MenuItem>
									))}
								</Select>
							</Grid>
							<Grid item>
								<Button variant="outlined" color="secondary" onClick={this.checkQuiz}>Check
									Results</Button>
							</Grid>
						</Grid>
					</Grid>

					{
						Object.keys(this.state.pastQuizzes).sort().map((student) => {
							if (this.state.g2u[student]) {
								return <Grid item key={group}>
									<Grid container spacing={2} direction="row" justify="flex-start"
									      alignItems="center">
										<Grid item><h2>{group}</h2></Grid>
										<Grid item>
											<IconButton onClick={this.removeGroup.bind(this, group)}>
												<DeleteIcon>Remove</DeleteIcon></IconButton>
										</Grid>
									</Grid>
									<TableContainer component={Paper}>
										<Table aria-label="student table">
											<TableHead>
												<TableRow>
													<TableCell>Name</TableCell>
													<TableCell>Email</TableCell>
													<TableCell>Username</TableCell>
													<TableCell>Remove Student</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{
													this.state.g2u[group].map((stuObj, index) => {
														if (index > 0) {
															return <TableRow key={stuObj.username}>
																<TableCell>{stuObj.name}</TableCell>
																<TableCell>{stuObj.email}</TableCell>
																<TableCell>{stuObj.username}</TableCell>
																<TableCell>
																	<IconButton
																		onClick={this.removeStudent.bind(this, group, stuObj.username)}><DeleteIcon>Remove</DeleteIcon></IconButton>
																</TableCell>
															</TableRow>
														}
													})
												}
											</TableBody>
										</Table>

										<form>
											<TextField id={"add-input-".concat(group)}
											           label="Name">Name</TextField>
											<IconButton onClick={this.addToGroup.bind(this, group)}><AddIcon>Add
												Student</AddIcon></IconButton>
										</form>
									</TableContainer>
								</Grid>
							} else {
								return null;
							}
						})
					}
				</Grid>
			</div>
		)
	}
}

export default withRouter(ProfessorCheckQuiz);