import React from 'react';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Login from './react-components/Login';
import AdminPage from './react-components/AdminPage';
import AdvancedGenerator from './react-components/AdvancedGenerator';
import GroupsPage from './react-components/GroupsPage';
import SimpleGenerator from './react-components/SimpleGenerator';
import QuizGenerator from './react-components/QuizGenerator';
import Statistics from './react-components/Statistics';
import QuizTaker from './react-components/QuizTaker';

class App extends React.Component {
  users = [
    {type: "professor", name: "David", email: "david@gmail.com", username: "david123", password: "password"},
    {type: "student", name: "Josh", email: "joshhan619@gmail.com", username: "joshhan619", password: "password"},
    {type: "student", name: "Adrian", email: "adrian@gmail.com", username: "adrianz", password: "password"},
    {type: "student", name: "Youhai", email: "youhai@gmail.com", username: "liyouhai", password: "password"}
  ];

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => (<Login users={this.users}/>)}/>
            <Route exact path='/admin' render={() => (<AdminPage rows={this.users}/>)}/>
            <Route exact path='/professor/' render={() => (<AdvancedGenerator />)}/>
            <Route exact path='/professor/groups' render={() => (<GroupsPage />)}/>
            <Route exact path='/professor/quiz' render={() => (<QuizGenerator />)}/>
            <Route exact path='/student/' render={() => (<SimpleGenerator />)}/>
            <Route exact path='/student/stats' render={() => (<Statistics />)}/>
            <Route exact path='/student/quiz' render={() => (<QuizTaker />)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
