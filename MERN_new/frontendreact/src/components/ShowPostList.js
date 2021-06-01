import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Router,Route,hashHistory} from 'react-router';
import { Link,BrowserRouter} from 'react-router-dom';
import PostCard from './PostCard';

class ShowPostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      UserName: this.props.history.location.state.UserName,//by this way we get the value from other page 
      PassWord: this.props.history.location.state.PassWord,
      userId: this.props.history.location.state.userId





    };
  }
  //do this all the time 
  componentDidMount() {
    axios
      .get('http://localhost:8082/api/posts')
      .then(res => {
        this.setState({
          posts: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowPostList');
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
    //we don't need to pass user's info when they logout
    return (
      <div className="ShowPostList">
        <div className="container">
          <br/>
          <Link to="/" className="btn btn-outline-warning float-left">
            Logout
          </Link>
          
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Posts List</h2>
            </div>
            <div className="col-md-11">
            <Link to={{pathname: "/searchtitle",state:{UserName: this.state.UserName,
                            PassWord: this.state.PassWord,
                            userId: this.state.userId}}} className="btn btn-outline-warning float-right">
                SEARCH TITLE
              </Link>
              <Link to={{pathname: "/myposts",state:{UserName: this.state.UserName,
                            PassWord: this.state.PassWord,
                            userId: this.state.userId}}} className="btn btn-outline-warning float-right">
                MY USER PROFILE
              </Link>
              {/** and here is the way we pass parameter by link */}
              
              <Link to={{pathname: "/create-Post",state:{UserName: this.state.UserName,
                            PassWord: this.state.PassWord,
                            userId: this.state.userId}}} className="btn btn-outline-warning float-right">
                + Add New Post
              </Link>
              
              <br />
              
              <br />
              <h4>User: {this.state.UserName} ID: {this.state.userId}</h4>
              <hr />
            </div>

          </div>

          <div className="list">
                {postList}
          </div>
        </div>
      </div>


    );
  }
}

export default ShowPostList;