import React from "react";
import {withRouter} from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import QuizTile from "./QuizTile.js"
import TopBar from "./TopBar.js"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import "./MainPage.css"
import {getUserByUsername} from "./User";

class StudentMain extends React.Component {

	takeQuiz = (quiz) => {
		this.props.history.push({
			pathname: "/student/quiz",
			state: {
				quiz: quiz,
				username: this.props.location.username
			}
		})
	}

	render() {
		let {state} = this.props.location;
		const student = getUserByUsername(state.username);

		return (
			<div>
				<TopBar {...state}/>
				<div className="main-area">
                    <h1>{student.name ? student.name : "Anonymous"}</h1>
                    <h3>Email: <span className="text">{student.email ? student.email : "Undefined"}</span></h3>
                    <h3>Enrolled: <span className="text">{student.groups.length > 0 ? student.groups.join(", ") : "None"}</span></h3>
                    <Divider/>
                    <h2>Activity History</h2>
                    <div id="activities">
                        <Grid container spacing={3} justify="flex-start" alignItems="flex-start">
                            {state.quizzes.map((quiz, i) => {
                                return (
                                    <Grid item key={i}>
                                        <QuizTile {...quiz} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </div>

										<Divider/>
                    <h2>Pending Quizzes</h2>
										<div id="quizzes">
                        <Grid container spacing={3} justify="flex-start" alignItems="flex-start">
                            {state.quizzes.map((quiz, i) => {
                                return (
                                    <Grid item key={i}>
                                        <Button onClick={() => this.takeQuiz(quiz)}>{quiz.name}</Button>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </div>
                </div>
			</div>
		);
	}

}

export default withRouter(StudentMain);
