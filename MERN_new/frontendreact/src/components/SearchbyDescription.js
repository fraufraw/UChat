import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Router,Route,hashHistory} from 'react-router';
import { Link,BrowserRouter} from 'react-router-dom';
import PostCard from './PostCard';

class Searchdescription extends Component {
    constructor(props) {
      super(props);
      this.state = {
        posts: [],//contains posts
        keyword: '',//contains search keywords
        
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
          description: this.state.keyword,//record data from input
         };

    axios
      .post('http://localhost:8082/api/searchbydescription', data)
      .then(res => {//pass data to backend, then from backend to here
        this.setState({
          keyword: '',
          posts: res.data
        })
      })
      .catch(err => {
        console.log("Error in Search description!");
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
      );
    }


    return (
      <div className="Searchdescription">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to={{pathname:"/show-list", state:{UserName: this.state.UserName,
                            PassWord: this.state.PassWord,
                            userId: this.state.userId}}} className="btn btn-outline-warning float-left">
                  Back
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Search Post by Description</h1>

              <form noValidate onSubmit={this.onSubmit}>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='keyword of the Post'
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

export default  Searchdescription ;