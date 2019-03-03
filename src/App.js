
// External Libraries
import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

// Internal Components and CSS
import './App.css';
import Selection from './pages/Selection/Selection';
import Config from './pages/Config/Config';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/:selection" component={Config} />
          <Route path="/" component={Selection} />
        </Switch>
      </div>
    );
  }
}

export default App;
