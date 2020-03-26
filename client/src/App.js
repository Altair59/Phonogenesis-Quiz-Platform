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
import {readCookie} from "./actions/user";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		readCookie(this);
	}

	render() {
		const {currentUser} = this.state;
		if (currentUser === undefined){
			return <div/>
		}

		return (
			<BrowserRouter>
				<Switch>
					<React.Fragment>
						{!currentUser ?
							<Route
								path={['/', 'login', '/admin', 'professor', '/professor/groups', '/professor/quiz', '/student/gen', '/student', '/student/quiz', '/student/groups']}
								render={({history}) => (<LoginPage history={history} app={this}/>)}/> :
							(currentUser.type === 'admin' ?
									(<Route exact path={['/', '/admin', '/login']}
									        render={({history}) => (<AdminPage history={history} app={this}/>)}/>) :
									(currentUser.type === 'student' ?
											(<React.Fragment>
												<Route path='/:(?!student).+' render={({history}) => {
													alert("Access Denied! Redirected back to your main page.");
													return <StudentMain history={history} app={this}/>
												}}/>
												<Route exact path={['/student', '/']} render={({history}) => (
													<StudentMain history={history} app={this}/>)}/>
												<Route exact path='/student/gen' render={({history}) => (
													<SimpleGenerator history={history} app={this}/>)}/>
												<Route exact path='/student/quiz' render={({history}) => (
													<QuizTaker history={history} app={this}/>)}/>
												<Route exact path='/student/groups' render={({history}) => (
													<StudentGroupPage history={history} app={this}/>)}/>
											</React.Fragment>)
											:
											(currentUser.type === 'professor' ? (<React.Fragment>
													<Route path='/:(?!student).+' render={({history}) => {
														alert("Access Denied! Redirected back to your main page.");
														return <ProfessorHome history={history} app={this}/>
													}}/>
													<Route exact path={['/professor', '/']} render={({history}) =>
														(<ProfessorHome history={history} app={this}/>)}/>
													<Route exact path='/professor/groups' render={({history}) => (
														<GroupsPage history={history} app={this}/>)}/>
													<Route exact path='/professor/quiz' render={({history}) => (
														<QuizGenerator history={history} app={this}/>)}/>
												</React.Fragment>) : (
													<Route exact path='/login' render={({history}) => {
														alert("Invalid user type! Redirecting to login page.");
														return <LoginPage redir={true} history={history}
														                  app={this}/>
													}}/>
												)
											)


									)
							)
						}
					</React.Fragment>
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
