import React from "react";
import {withRouter} from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import TopBar from "./TopBar.js"
import Button from "@material-ui/core/Button"
import "./mainstyle.css"
import Paper from "@material-ui/core/Paper";

class StudentMain extends React.Component {

	onReview(quiz)  {
		const {state} = this.props.location;
		this.props.history.push({
			pathname: "/student/quiz",
			state: {
				quiz: quiz,
				id: state.id,
				type: state.type,
				name: state.name,
				email: state.email,
				password: state.password,
				username: state.username
			}
		})
	};

	takeQuiz = (quiz) => {
		const {state} = this.props.location;
		this.props.history.push({
			pathname: "/student/quiz",
			state: {
				quiz: quiz,
				id: state.id,
				type: state.type,
				name: state.name,
				email: state.email,
				password: state.password,
				username: state.username
			}
		})
	};

	render() {
		//let {state} = this.props.location;
		//const currStudent = getUserByUsername(state.username);
		let {app} = this.props;
		console.log(app)
		const currStudent = app.currentUser;
		console.log(currStudent)
		const quizList = currStudent.quizzes;

		return (
			<div>
				<TopBar {...app}/>
				<div className="main-area">
					<h1>{currStudent.name ? currStudent.name : "Anonymous"}</h1>
					<h3>Email: <span className="text">{currStudent.email ? currStudent.email : "Undefined"}</span></h3>
					<h3>Enrolled: <span
						className="text">{currStudent.groups.length > 0 ? currStudent.groups.join(", ") : "None"}</span>
					</h3>
					<br/>
					<hr/>
					<br/>
					<h2>Activity History</h2>
					<div className="tileContainer">
						<Grid container spacing={3} justify="flex-start" alignItems="flex-start">
							{quizList.map((quiz, i) => {
								if (quiz.isCompleted) {
									return (
										<Grid item key={i}>
											<Paper elevation={3}>
												<h4>Quiz: {quiz.name}</h4>
												<p>Score: {quiz.pastScore}/{quiz.questions.length}</p>
												<Button onClick={this.onReview.bind(this, quiz)}>Review</Button>
											</Paper>
										</Grid>
									);
								} else {
									return null;
								}
							})}
						</Grid>
					</div>

					<br/>
					<hr/>
					<br/>
					<h2>Pending Quizzes</h2>
					<div className="tileContainer">
						<Grid container spacing={3} justify="flex-start" alignItems="flex-start">
							{quizList.map((quiz, i) => {
								if (currStudent.groups.includes(quiz.group) && !quiz.isCompleted) {
									return (
										<Grid item key={i}>
											<Button onClick={() => this.takeQuiz(quiz)}>Take Quiz: {quiz.name}</Button>
										</Grid>
									);
								} else {
									return null;
								}
							})}
						</Grid>
					</div>
				</div>
			</div>
		);
	}

}

export default withRouter(StudentMain);
