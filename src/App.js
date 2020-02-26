import React from 'react';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Login from './react-components/Login';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => (<Login />)}/>
            // Add other pages here:
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
