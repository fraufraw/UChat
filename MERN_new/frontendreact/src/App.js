import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import CreatePost from './components/CreatePost';
import ShowPostList from './components/ShowPostList';
import ShowPostDetails from './components/ShowPostDetails';
import UpdatePostInfo from './components/UpdatePostInfo';
import LoginRegister from './components/LoginRegister';
import Searchtitle from './components/Searchtitle';
import Searchcomment from './components/Searchcomment';
import Searchdescription from './components/SearchbyDescription';
import Search from './components/Search';
import myposts from './components/myposts';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={LoginRegister} />
          <Route path='/show-list' component={ShowPostList} />
          <Route path='/create-Post' component={CreatePost} />
          <Route path='/edit-Post/:id' component={UpdatePostInfo} />
          <Route path='/show-Post/:id' component={ShowPostDetails} />
          <Route path='/searchtitle' component={Searchtitle} />
          <Route path='/searchcomment' component={Searchcomment} />
          <Route path='/searchdescription' component={Searchdescription} />
          <Route path='/search' component={Search} />
          <Route path='/myposts' component={myposts} />
        </div>
      </Router>
    );
  }
}

export default App;