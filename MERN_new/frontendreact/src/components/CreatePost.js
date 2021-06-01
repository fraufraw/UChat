import React, { Component } from 'react';
import { Link,BrowserRouter } from 'react-router-dom';
//import { Router, Route,hashHistory} from 'react-router';
import '../App.css';
import axios from 'axios';

//add a props here to get the parameter from other page 
class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author:this.props.history.location.state.UserName,
      description:'',
      published_date:'',
      publisher:this.props.history.location.state.UserName,
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

    const dateObject = new Date(Date.now());
    const date = dateObject.toLocaleString("en-US", {timeZoneName: "short"});
    //const date = Date.now();

    const data = {
      title: this.state.title,
      author: this.state.author,
      description: this.state.description,
      published_date: date,
      publisher: this.state.publisher,
      posterId: this.state.userId
    };

    axios
      .post('http://localhost:8082/api/posts', data)
      .then(res => {
        this.setState({
          title: '',
          author: this.props.history.location.state.UserName,
          description:'',
          published_date:'',
          publisher:'',
          posterId: this.state.userId
        })
        this.props.history.push({
          pathname:'/show-list',
          state:{
              UserName: this.state.UserName,
              PassWord: this.state.PassWord,
              userId: this.state.userId
          }
        });
        //('/show-list');
      })
      .catch(err => {
        console.log("Error in CreatePost!");
      })
  };

  render() {
    return (
      <div className="CreatePost">
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
              <h1 className="display-4 text-center">Add Post</h1>
              <p className="lead text-center">
                  Create new post
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Title of the Post'
                    name='title'
                    className='form-control'
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                </div>
                <br />
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Describe this post'
                    name='description'
                    className='form-control'
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>publisher {this.state.publisher}</div>
                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;