import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Router,Route,hashHistory} from 'react-router';
import { Link,BrowserRouter} from 'react-router-dom';
import PostCard from './PostCard';

class Searchtitle extends Component {
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

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
    onSubmit = e => {
        e.preventDefault();
    

        
        const data = {
          title: this.state.keyword,
         };

    axios
      .post('http://localhost:8082/api/searchtitle', data)
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
      <div className="Searchtitle">
        <div className="container">
          <div className="row">
            <div className="col-md-11 m-auto">
              <br />
              <Link to={{pathname:"/search", state:{UserName: this.state.UserName,
                            PassWord: this.state.PassWord,
                            userId: this.state.userId}}} className="btn btn-outline-warning float-left">
                  Back
              </Link>
            </div>
            <div className="col-md-11 m-auto">
              <h1 className="display-4 text-center">Search Title</h1>
              <hr/>
              <br/>
              <br/>
              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Keyword of the Post Title'
                    name='keyword'
                    className='form-control'
                    value={this.state.keyword}
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <button type="submit" className="btn btn-outline-warning btn-block mt-4" >
                    Search
                  </button>
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

export default Searchtitle;