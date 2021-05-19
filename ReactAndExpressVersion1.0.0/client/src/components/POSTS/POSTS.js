import React, { Component } from 'react';
import "./POSTS.css";
//import App from './App';

class Posts extends Component{
constructor(){
  super();
  this.state={
    POSTS: []
  }
}
componentDidMount(){
  fetch("/api/POSTS")
  .then(res=>res.json())
  .then(POSTS=>this.setState({POSTS:POSTS},()=>console.log('FETCH')))
}

render(){
  return (
    <div className="App">
      <title>UChat</title>
      <div>
        <nav className="navbar navbar-dark bg-dark mb-3">
            <a href="/" className="navbar-brand">UChat</a>
        </nav>
        <div className="container">
            <form action="/" method="POST">
                <div className="form-group">
                    <label>HOME PAGE</label>
                </div>
            </form>
            <form action="/new" method="POST">
                <div className="form-group">
                    <button type="submit" className="btn btn-outline-success">New Post</button>
                </div>
            </form>
            <ul className="list-group">
                {this.state.POSTS.map(post=>
                  <li><button>{post}</button></li>
                )}
            </ul>
        </div>
      </div>
    </div>
  );
}
}

export default Posts;