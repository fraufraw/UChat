import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link,BrowserRouter} from 'react-router-dom';

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
      const comments = this.state.messages;
      let commentList;
      if(!comments) {
          commentList = "there is no post record!";
        } else {
          commentList = comments.map((comment,k) =>
          <tr key={k}>
              <th scope="row">{comment.author}{":    "}  {comment.text} </th>
              <td>Date:{comment.updated_date} {/**PostID:{comment.Postid} commentID:{comment._id} */}</td>
              <td>Liked: {comment.Message_liked_number}</td>
            </tr>
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
  
                <div className="message">
          <table className="table table-hover table-white">
            {commentList}
          </table>
          </div>
  
  
  
            </div>
            </div>
          </div>
        </div>
      );
    }
}

export default Searchcomment;