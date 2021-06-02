import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import CreatePost from './components/CreatePost';
import ShowPostList from './components/ShowPostList';
import ShowPostDetails from './components/ShowPostDetails';
import UpdatePostInfo from './components/UpdatePostInfo';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={ShowPostList} />
          <Route path='/create-Post' component={CreatePost} />
          <Route path='/edit-Post/:id' component={UpdatePostInfo} />
          <Route path='/show-Post/:id' component={ShowPostDetails} />
        </div>
      </Router>
    );
  }
}

export default App;