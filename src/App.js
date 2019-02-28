
// External Libraries
import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

// Internal Components
import './App.css';
import Selection from './pages/Selection/Selection';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" component={Selection} />
        </Switch>
      </div>
    );
  }
}

export default App;
