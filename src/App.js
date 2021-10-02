import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Dashboards from "./components/Dashboards";
import EditPage from "./edit/Edit";

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Dashboards />
        </Route>
        <Route path="/edit">
          <EditPage />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
