
// External Libraries
import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

// Internal Components and CSS
import './App.css';
import Selection from './pages/Selection/Selection';
import Config from './pages/Config/Config';
import MarksInput from './pages/MarksInput/MarksInput';
import Output from './pages/Output/Output';
import Options from './pages/Options/Options';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/config" component={Options} />
          <Route path="/:selection/output" component={Output} />
          <Route path="/:selection/marks_input" component={MarksInput} />
          <Route path="/:selection" component={Config} />
          <Route path="/" component={Selection} />
        </Switch>
      </div>
    );
  }
}

export default App;
