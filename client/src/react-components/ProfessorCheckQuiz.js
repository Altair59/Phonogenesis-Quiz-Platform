import React from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TopBar from "./TopBar.js";
import {withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";

import {getUserQuizzes, getStudentQuizObj} from "../actions/quiz";
import NativeSelect from "@material-ui/core/NativeSelect";

class ProfessorCheckQuiz extends React.Component {

	constructor(props) {
		super(props);
		this.props.history.push("/professor/quizresult");
		this.state = {
			showResult: false,
			studentQuizObj: [],
			currentQuizName: "",
			quizzes: []
		};
		getUserQuizzes(this, this.props.app.state.currentUser.username);
	}

	showDetails = (quiz) => {
		localStorage.setItem("quiz", JSON.stringify(quiz));
		localStorage.setItem("isActive", "0");
		this.props.history.push("/quiztaker");
	};

	getStudentQuiz = () => {
		const currentQuizName = document.getElementById("quiz-sel").value;
		this.setState({currentQuizName: currentQuizName});
		let groupName = "";
		this.state.quizzes.map((quiz) => {
			if (quiz.name === currentQuizName){
				groupName = quiz.group;
			}
		});
		getStudentQuizObj(this, groupName, currentQuizName);
	};

	render() {
		return (
			<div>
				<TopBar history={this.props.history} app={this.props.app}/>
				<br/><br/>

				<Grid container direction="column" spacing={2} justify="center" alignItems="center">
					<Grid item>
						<Grid container direction="row" justify="center" alignItems="center" spacing={4}>
							<Grid item>
								<h4>Target Quiz: &nbsp;</h4>
								<NativeSelect id="quiz-sel">
									{this.state.quizzes.map((quiz) => (
										<option key={quiz.name} value={quiz.name}>{quiz.name}</option>
									))}
								</NativeSelect>
							</Grid>
							<Grid item>
								<Button variant="outlined" color="secondary" onClick={this.getStudentQuiz.bind(this)}>Check
									Results</Button>
							</Grid>
						</Grid>
					</Grid>

					<Grid item>
						<Grid container direction="row" justify="flex-start"
						      alignItems="center">
							<Grid item><h2>{this.state.currentQuizName}</h2></Grid>
						</Grid>

						<TableContainer component={Paper}>
							<Table aria-label="student-quiz table">
								<TableHead>
									<TableRow>
										<TableCell>Name</TableCell>
										<TableCell>Email</TableCell>
										<TableCell>Username</TableCell>
										<TableCell>Group</TableCell>
										<TableCell>Score</TableCell>
										<TableCell>Time Completed</TableCell>
										<TableCell>Detailed Answer</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										this.state.studentQuizObj.map((sqObj) => (
											<TableRow key={sqObj.username}>
												<TableCell>{sqObj.name}</TableCell>
												<TableCell>{sqObj.email}</TableCell>
												<TableCell>{sqObj.username}</TableCell>
												<TableCell>{sqObj.group}</TableCell>
												<TableCell>{sqObj.score}</TableCell>
												<TableCell>{sqObj.timeStamp}</TableCell>
												<TableCell>
													<Button disabled={!sqObj.quiz}
														onClick={this.showDetails.bind(this, sqObj.quiz)}>Detail</Button>
												</TableCell>
											</TableRow>
										))
									}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default withRouter(ProfessorCheckQuiz);