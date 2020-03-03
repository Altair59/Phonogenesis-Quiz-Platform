import React from "react";
import {withRouter} from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import QuizTile from "./QuizTile.js"
import TopBar from "./TopBar.js"
import Divider from "@material-ui/core/Divider"
import "./MainPage.css"
import {getUserByUsername} from "./User";

class StudentMain extends React.Component {

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
                </div>
			</div>
		);
	}

}

export default withRouter(StudentMain);
