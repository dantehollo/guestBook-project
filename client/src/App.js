import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UserView from './components/UserView'
import User from './components/User'
import PostView from './components/PostView'
import Post from './components/Post'
import CommentView from './components/CommentView'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/comment/:id" component={Comment}/>
          <Route exact path="/user/:id" component={User}/>
          <Route exact path="/user" component={UserView}/>
          <Route exact path="/comment" component={CommentView}/>
          <Route exact path="/:id" component={Post}/>
          <Route exact path="/" component={PostView}/>
        </Switch>
      </div>  
    </Router>
  );
}

export default App;
