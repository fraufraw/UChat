//import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import Posts from './components/POSTS/POSTS';
//import App from './App';

class App extends Component{
render(){
  return (
    <div className="App">
      <Posts/>
    </div>
  );
}
}

export default App;
