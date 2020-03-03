import React from "react";
import {withRouter} from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import QuizTile from "./QuizTile.js"
import TopBar from "./TopBar.js"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import "./MainPage.css"
import {users, getUserByUsername} from "./User";
import {quizList} from "./QuizData.js"

class StudentMain extends React.Component {

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
	}

	render() {
		let {state} = this.props.location;
		const currStudent = getUserByUsername(state.username);
		console.log(currStudent);
		console.log(quizList);

		return (
			<div>
				<TopBar {...state}/>
				<div className="main-area">
                    <h1>{currStudent.name ? currStudent.name : "Anonymous"}</h1>
                    <h3>Email: <span className="text">{currStudent.email ? currStudent.email : "Undefined"}</span></h3>
                    <h3>Enrolled: <span className="text">{currStudent.groups.length > 0 ? currStudent.groups.join(", ") : "None"}</span></h3>
                    <Divider/>
                    <h2>Activity History</h2>
                    <div className="tileContainer">
                        <Grid container spacing={3} justify="flex-start" alignItems="flex-start">
                            {quizList.map((quiz, i) => {
																if(currStudent.groups.includes(quiz.group) && quiz.isCompleted) {
																	return (
	                                    <Grid item key={i}>
	                                        <QuizTile {...quiz} />
	                                    </Grid>
	                                );
																}
																else {
																	return null;
																}
                            })}
                        </Grid>
                    </div>

										<Divider/>
                    <h2>Pending Quizzes</h2>
										<div className="tileContainer">
                        <Grid container spacing={3} justify="flex-start" alignItems="flex-start">
                            {quizList.map((quiz, i) => {
															if(currStudent.groups.includes(quiz.group) && !quiz.isCompleted) {
																return (
																		<Grid item key={i}>
																				<Button onClick={() => this.takeQuiz(quiz)}>Take Quiz: {quiz.name}</Button>
																		</Grid>
																);
															}
															else {
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
