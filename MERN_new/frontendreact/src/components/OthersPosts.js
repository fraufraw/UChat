import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Router,Route,hashHistory} from 'react-router';
import { Link,BrowserRouter} from 'react-router-dom';
import PostCard from './PostCard';

class OthersPosts extends Component {
    constructor(props) {
      super(props);
      this.state = {
        posts: [],
        keyword: '',

        UserName: this.props.history.location.state.UserName, 
        PassWord: this.props.history.location.state.PassWord,
        userId: this.props.history.location.state.userId,
        publisher: this.props.history.location.state.publisher

      };
    }

    componentDidMount() {
        const data = {
          user: this.state.publisher,
         };

    axios
      .post('http://localhost:8082/api/othersposts', data)
      .then(res => {
        this.setState({
          keyword: '',
          posts: res.data
        })
 
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
      <div className="Searchtitle">
        <div className="container">
          <div className="row">
            <div className="col-md-11 m-auto">
              <br />
              <Link to={{pathname:"/show-list", state:{UserName: this.state.UserName,
                            PassWord: this.state.PassWord,
                            userId: this.state.userId}}} className="btn btn-outline-warning float-right">
                  Back
              </Link>
            </div>
            <div className="col-md-10 m-auto">
              <h1 className="display-4 text-center">{this.state.publisher}{"'s Profile"}</h1>
              <br/>
              <hr/>
              <h4 className = 'text-1 lead'> {this.state.publisher} {"'s Posts"}</h4>
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

export default OthersPosts;