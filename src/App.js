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
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => (<Login />)}/>
            <Route exact path='/admin' render={() => (<AdminPage />)}/>
            <Route exact path='/professor/gen' render={() => (<AdvancedGenerator />)}/>
            <Route exact path='/professor/groups' render={() => (<GroupsPage />)}/>
            <Route exact path='/professor/quiz' render={() => (<QuizGenerator />)}/>
            <Route exact path='/student/gen' render={() => (<SimpleGenerator />)}/>
            <Route exact path='/student/stats' render={() => (<Statistics />)}/>
            <Route exact path='/student/quiz' render={() => (<QuizTaker />)}/>
            // Add other pages here:
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
