import React from 'react';

import {Route, Switch, BrowserRouter} from 'react-router-dom';
import './App.css';

import LoginPage from './react-components/LoginPage';
import AdminPage from './react-components/AdminPage';
import GroupsPage from './react-components/ProfGroupPage';
import SimpleGenerator from './react-components/SimpleGenerator';
import QuizGenerator from './react-components/QuizGenerator';
import StudentMain from './react-components/StudentMain';
import QuizTaker from './react-components/QuizTaker';
import ProfessorHome from "./react-components/ProfessorHome";
import StudentGroupPage from "./react-components/StudentGroupPage"

const readCookie = (app) => {
  fetch("http://localhost:9000/users/check-session/")
    .then(res => {
      if(res.status === 200) {
				console.log(res)
        return res.json();
      }
    })
    .then(json => {
			console.log(json)
      if (json && json.currentUser && json.userType) {
        app.setState({ currentUser: json.currentUser, userType: json.userType});
				console.log(app.state)
      }
    })
    .catch(error => {
      console.log(error);
    });
};

class App extends React.Component {
	constructor(props) {
		super(props);
		readCookie(this);
	}

	state = {
		currentUser: null,
		userType: ""
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<Switch>
						<Route
							exact path={['/', '/login']}
							render={({ history }) => {
								if (!this.state.currentUser) {
									return (<LoginPage app={this}/>)
								} else {
									if (this.state.userType === "student") {
										return (<StudentMain/>)
									}
									else if (this.state.userType === "professor") {
										return (<ProfessorHome/>)
									} else if (this.state.userType === "admin") {
										return (<AdminPage/>)
									}
								}
							}
						}/>
						<Route exact path='/admin' render={() => (<AdminPage/>)}/>
						<Route exact path='/professor' render={() => (<ProfessorHome/>)}/>
						<Route exact path='/professor/groups' render={() => (<GroupsPage/>)}/>
						<Route exact path='/professor/quiz' render={() => (<QuizGenerator/>)}/>
						<Route exact path='/student/gen' render={() => (<SimpleGenerator/>)}/>
						<Route exact path='/student' render={() => (<StudentMain/>)}/>
						<Route exact path='/student/quiz' render={() => (<QuizTaker/>)}/>
						<Route exact path='/student/groups' render={() => (<StudentGroupPage/>)}/>
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
