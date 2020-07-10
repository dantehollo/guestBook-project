import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import GuestView from './components/GuestView'
import Guest from './components/Guest'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={GuestView}/>
          <Route exact path="/guestBook/:id" component={Guest}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
