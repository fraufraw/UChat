import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Router,Route,hashHistory} from 'react-router';
import { Link,BrowserRouter} from 'react-router-dom';
import PostCard from './PostCard';

class Searchcomment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],//contains posts
            messages: [],//contains comments
            keyword: '',
                    //let the search function remember user info, so user will be allowed to visit post list
        UserName: this.props.history.location.state.UserName,
        PassWord: this.props.history.location.state.PassWord,
        userId: this.props.history.location.state.userId
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
    onSubmit = e => {
        e.preventDefault();
        const data = {
          text: this.state.keyword,
         };

    axios
      .post('http://localhost:8082/api/searchcomment', data)
      .then(res => {
        this.setState({//pass data from backend to frontend
          keyword: '',
          messages: res.data
        })
      })
      .catch(err => {
        console.log("Error in Search comment!");
      })
    //set data to be an list of messages


    
  };

    render() {
//if change the following line to const posts = this.state.posts;  , it should be able to display post infos instead of author
//after some changes

//The following part is from show post list component.
        const posts = this.state.messages;
        console.log("PrintPost: " + posts);
        let postList;
    
        if(!posts) {
          postList = "there is no post record!";
        } else {
          postList = posts.map((post, k) =>
            <PostCard
            post={post} 
            UserName={this.state.UserName} 
            userId={this.state.userId} key={k} />
          );
        }

    return (
        <div className="Searchcomment">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <br />
                <Link to={{pathname:"/show-list", 
              state:{UserName: this.state.UserName,
                            PassWord: this.state.PassWord,
                            userId: this.state.userId}}} className="btn btn-outline-warning float-left">
                  Back
              </Link>
              </div>
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Search Comment</h1>
  
                <form noValidate onSubmit={this.onSubmit}>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='comment text'
                      name='keyword'
                      className='form-control'
                      value={this.state.keyword}
                      onChange={this.onChange}
                    />
                  </div>
                  <br />
  
                  <input
                      type="submit"
                      className="btn btn-outline-warning btn-block mt-4"
                   />
                </form>
  
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

export default Searchcomment;