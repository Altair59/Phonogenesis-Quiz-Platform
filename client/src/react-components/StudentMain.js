import React from "react";
import {withRouter} from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import TopBar from "./TopBar.js"
import Button from "@material-ui/core/Button"
import "./mainstyle.css"
import Paper from "@material-ui/core/Paper";

class StudentMain extends React.Component {
	constructor(props) {
		super(props);
		this.props.history.push("/student");
		this.state = {};
	}

	onReview(quiz) {
		localStorage.setItem("quiz", JSON.stringify(quiz));
		localStorage.setItem("quizPastStamp", "0");
		this.props.history.push("/student/quiz");
		this.props.app.forceUpdate();
	};

	takeQuiz(quiz) {
		localStorage.setItem("quiz", JSON.stringify(quiz));
		localStorage.setItem("quizPastStamp", "0");
		this.props.history.push("/student/quiz");
		this.props.app.forceUpdate();
	};

	render() {
		const student = this.props.app.state.currentUser;

		return (
			<div>
				<TopBar history={this.props.history} app={this.props.app}/>
				<div className="main-area">
					<h1>{student.name ? student.name : "Anonymous"}</h1>
					<h3>Email: <span className="text">{student.email ? student.email : "Undefined"}</span></h3>
					<h3>Enrolled: <span
						className="text">{student.groups.length > 0 ? student.groups.join(", ") : "None"}</span>
					</h3>
					<br/>
					<hr/>
					<br/>
					<h2>Activity History</h2>
					<div className="tileContainer">
						<Grid container spacing={3} justify="flex-start" alignItems="flex-start">
							{student.quizzes.map((quiz, i) => {
								if (quiz.past_results.length > 0) {
									return (
										<Grid item key={i}>
											<Paper elevation={3}>
												<h4>Quiz: {quiz.name}</h4>
												<p>Last Score: {quiz.past_results[quiz.past_results.length - 1].score}/
													{quiz.questions.length}</p>
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
							{student.quizzes.map((quiz, i) => {
								if (quiz.past_results.length <= 0) {
									return (<Grid item key={i}>
										<Button onClick={this.takeQuiz.bind(this, quiz)}>Take
											Quiz: {quiz.name}</Button>
									</Grid>);
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
