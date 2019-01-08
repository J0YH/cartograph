import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './views/Home';
import Login from './views/Login';
import Tracker from './views/frame/tracker/Tracker';
import Frame from './views/frame/Frame';
import Editor from './views/frame/editor/Editor';
import Log from './views/frame/log/Log';
import Account from './views/frame/account/Account';
import Logout from './views/Logout';
import About from './views/About';


class App extends Component {
  render() {
    // console.log(localStorage.getItem(''))
    return (
      <Router>
        <div className='root-container'>
          <Route exact path='/' component={Home} />
          <Route path='/frame' component={Frame} />
          <Route exact path='/frame/tracker' component={Tracker} />
          <Route path='/frame/tracker/:tab' component={Tracker} />
          <Route exact path='/frame/editor' component={Editor} />
          <Route path='/frame/editor/:tab' component={Editor} />
          <Route exact path='/frame/log' component={Log} />
          <Route path='/frame/log/:tab' component={Log} />
          <Route exact path='/frame/account' component={Account} />
          <Route exact path='/logout' component={Logout} />
          <Route exact path='/about' component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
