import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.scss';
import axios from 'axios';

class showPostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: "this.props.match.params.id",
      post: {},
      comments: []
    };
  }

  componentDidMount() {
    
    axios
      .get('http://localhost:8082/api/posts/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          post: res.data
        })
      })
      .catch(err => {
        console.log("Error from ShowPostDetails");
      })
    //
    //+this.props.match.params.id
    axios
      .get('http://localhost:8082/api/message/'+this.props.match.params.id)
      .then(res => {
        this.setState({
           comments: res.data
        })
      })
      .catch(err => {
        console.log("Error from ShowPostDetails");
      })
  };

  onDeleteClick (id) {
    axios
      .delete('http://localhost:8082/api/posts/'+id)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error form ShowPostDetails_deleteClick");
      })
  };

  onDeleteClickMessage (id) {
    axios
      .delete('http://localhost:8082/api/message/'+id)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error form ShowPostDetails_deleteClick");
      })
  };


  render() {
    const comments = this.state.comments;
    console.log("PrintPost: " + comments);
    //console.log("Print id: " + this.props.match.params.id);
    let commentList;
    if(!comments) {
        commentList = "there is no post record!";
      } else {
        commentList = comments.map((comment,k) =>
        <tr key={k}>
            <th scope="row">{comment.author}{":---"}  {comment.text}</th>
            <td>{comment.updated_date} {comment.Postid}</td>
        </tr>
        );
      }

    const post = this.state.post;
    let PostItem = <div>
      <table className="navbar navbar-dark bg-dark mb-3">
        {/* <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead> */}
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Title</td>
            <td>{ post.title }</td>
          </tr>
          {/* 
          <tr>
            <th scope="row">2</th>
            <td>Author</td>
            <td>{ post.author }</td>
          </tr>
          */}
          <tr>
            <th scope="row">2</th>
            <td>Publisher</td>
            <td>{ post.publisher }</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Published Date</td>
            <td>{ post.published_date }</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Description</td>
            <td>{ post.description }</td>
          </tr>
        </tbody>
      </table>
    </div>

    return (
      <div className="ShowPostDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show Post List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Post's Record</h1>
              <p className="lead text-center">
                  View Post's Info
              </p>
              <hr /> <br />
            </div>
          </div>
          <div>
            { PostItem }
          </div>

          <div className="message">
          <table className="table table-hover table-dark">
            <h1>CommentList: </h1> 
            {commentList}
          </table>
          </div>
          
          

          <div className="row">
            <div className="col-md-6">
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClickMessage.bind(this,post._id)}>Clear Message</button><br />
            </div>

            <div className="col-md-6">
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,post._id)}>Delete Post</button><br />
            </div>

            <div className="col-md-6">
              <Link to={`/edit-Post/${post._id}`} className="btn btn-outline-info btn-lg btn-block">
                    Add message
              </Link>
              <br />
            </div>

          </div>
            {/* <br />
            <button type="button" class="btn btn-outline-info btn-lg btn-block">Edit Book</button>
            <button type="button" class="btn btn-outline-danger btn-lg btn-block">Delete Book</button> */}

        </div>
      </div>
    );
  }
}

export default showPostDetails;
