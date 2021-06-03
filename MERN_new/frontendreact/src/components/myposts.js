import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Router,Route,hashHistory} from 'react-router';
import { Link,BrowserRouter} from 'react-router-dom';
import PostCard from './PostCard';

class myposts extends Component {
    constructor(props) {
      super(props);
      this.state = {
        posts: [],
        keyword: '',

        UserName: this.props.history.location.state.UserName,//by this way we get the value from other page 
        PassWord: this.props.history.location.state.PassWord,
        userId: this.props.history.location.state.userId

      };
    }


    
    componentDidMount() {
       
    

        
        const data = {
          user: this.state.UserName,
         };

    axios
      .post('http://localhost:8082/api/myposts', data)
      .then(res => {
        this.setState({
          keyword: '',
          posts: res.data
        })
 //       this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in Searchtitle!");
      })
  };


  render() {

    const posts = this.state.posts;
    console.log("PrintPost: " + posts);
    let postList;

    if(!posts) {
      postList = "there is no post record!";
    } else {
      postList = posts.map((post, k) =>
        <PostCard post={post} UserName={this.state.UserName} PassWord={this.state.PassWord} userId={this.state.userId} key={k} />
      );//this is a way to past parameter to another function
    }


    return (
      <div className="Profile">
        <div className="container">
          <div className="row">
            <div className="col-md-11 m-auto">
              <br />
              <Link to={{pathname:"/show-list", state:{UserName: this.state.UserName,
                            PassWord: this.state.PassWord,
                            userId: this.state.userId}}} className="btn btn-outline-warning float-left">
                  Back
              </Link>
            </div>
            <div className="col-md-12 m-auto">
              <h1 className="display-4 text-center">My User Profile</h1>
              <hr/>
                <h4 className = 'text-1 lead'>User: {this.state.UserName} </h4>
                <h4 className = 'text-2 lead'>ID: {this.state.userId} </h4>
              <br/>


              <div className="list">
                {postList}
              </div>



          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default myposts;