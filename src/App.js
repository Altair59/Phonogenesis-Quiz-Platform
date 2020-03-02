import React from 'react';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import LoginPage from './react-components/LoginPage';
import AdminPage from './react-components/AdminPage';
import AdvancedGenerator from './react-components/AdvancedGenerator';
import GroupsPage from './react-components/GroupsPage';
import SimpleGenerator from './react-components/SimpleGenerator';
import QuizGenerator from './react-components/QuizGenerator';
import UserMain from './react-components/UserMain';
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
            <Route exact path='/' render={() => (<LoginPage users={this.users}/>)}/>
            <Route exact path='/admin' render={() => (<AdminPage users={this.users}/>)}/>
            <Route exact path='/professor/gen' render={() => (<AdvancedGenerator />)}/>
            <Route exact path='/professor' render={() => (<GroupsPage users={this.users}/>)}/>
            <Route exact path='/professor/quiz' render={() => (<QuizGenerator />)}/>
            <Route exact path='/student/gen' render={() => (<SimpleGenerator />)}/>
            <Route exact path='/student' render={() => (<UserMain />)}/>
            <Route exact path='/student/quiz' render={() => (<QuizTaker />)}/>
          </Switch>
        </BrowserRouter>
      </div>


    );
  }
}

export default App;
