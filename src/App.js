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

class App extends React.Component {
	constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
	}

	callAPI() {
    fetch("http://localhost:5000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
	}

	componentWillMount() {
	    this.callAPI();
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<Switch>
						<Route exact path='/' render={() => (<LoginPage/>)}/>
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
				<p className="App-intro">{this.state.apiResponse}</p>
			</div>


		);
	}
}

export default App;
