import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function refreshPage() {
  window.location.reload(false);
}

class showPostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: "this.props.match.params.id",
      post: {},
      comments: [],
      title: '',
      description: '',
      published_date: '',
      publisher: '',
      Liked_number: 0,
      UserName: this.props.history.location.state.UserName,
      PassWord: this.props.history.location.state.PassWord,
      userId: this.props.history.location.state.userId
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/posts/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          post: res.data,
          title: res.data.title,
          description: res.data.description,
          published_date: res.data.published_date,
          publisher: res.data.publisher,
          Liked_number: res.data.Liked_number
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

  //this will refresh the page
  /* 
  refreshPage(){ 
    return window.location.reload(); 
  }
  */
  onDeleteClick (id) {
    axios
      .delete('http://localhost:8082/api/posts/'+id)
      .then(res => {
        //this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error form ShowPostDetails_deleteClick");
      })

    axios
      .delete('http://localhost:8082/api/message/'+id)
      .then(res => {
        this.props.history.push
        ({
          pathname:"/show-list",
          state:{
              UserName: this.state.UserName,
              PassWord: this.state.PassWord,
              userId: this.state.userId
          }
        });
        //("/show-list");
      })
      .catch(err => {
        console.log("Error form ShowPostDetails_deleteClick");
      })

  };

  onDeleteClickMessage (id) {
    axios
      .delete('http://localhost:8082/api/message/'+id)
      .then(res => {
        //this.props.history.push('/show-Post/'+id);
      })
      .catch(err => {
        console.log("Error form ShowPostDetails_deleteClick");
      })
    
    refreshPage();
  };

  //this one is to add like to Post
  clickAddLike(id){
    const data = {
      title: this.state.title,
      author: this.state.author,
      description: this.state.description,
      published_date: this.state.published_date,
      publisher: this.state.publisher,
      Liked_number: (this.state.Liked_number+1)
    };

    axios
      .put('http://localhost:8082/api/posts/'+ id, data)
      .then(res => {
        //this.props.history.push('/show-Post/'+ id);
      })
      .catch(err => {
        console.log("Error in UpdatePostInfo!");
      })
    
      refreshPage();
  }

  //this one is to add like to message
  clickMessageAddLike(Mtext,Mauthor,update,like, Messid, id){
    const message={
      text: Mtext,
      author: Mauthor,
      updated_date: update,
      Postid: id,
      Message_liked_number: (like + 1)
    }
    axios
      .put('http://localhost:8082/api/message/' + Messid, message)
      .then(res => {
        //this.props.history.push('/show-Post/'+id);
      })
      .catch(err => {
        console.log("Error in UpdateMessageInfo!");
      })

      refreshPage();
  }



  render() {
    const post = this.state.post;
    const comments = this.state.comments;
    //console.log("PrintPost: " + comments);
    //console.log("Print id: " + this.props.match.params.id);
    let commentList;
    if(!comments) {
        commentList = "there is no post record!";
      } else {
        commentList = comments.map((comment,k) =>
        <tr key={k}>
            <th scope="row">{comment.author}{":---"}  {comment.text} </th>
            <td>Date:{comment.updated_date} PostID:{comment.Postid} commentID:{comment._id}</td>
            <td>Liked: {comment.Message_liked_number}</td>
            <button type="button" className="btn btn-outline-warning float-left" onClick={this.clickMessageAddLike.bind(this,comment.text,comment.author,comment.updated_date,comment.Message_liked_number,comment._id,post._id)}>Like</button>
        </tr>
        );
      }

    
    let PostItem = <div>
      <table className="navbar navbar-dark bg-dark mb-3">
        <tbody>
          <tr>
            <th scope="row"></th>
            <td>Title:</td>
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
            <th scope="row"></th>
            <td>Description:</td>
            <td>{ post.description }</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td>Publisher:</td>
            <td>{ post.publisher }</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td>Published Date:</td>
            <td>{ post.published_date }</td>
          </tr>

          <tr>
            <th scope="row"></th>
            <td>Total Liked: {post.Liked_number}</td>
            <td><button type="button" className="btn btn-outline-warning float-left" onClick={this.clickAddLike.bind(this,post._id)}>Like</button></td>
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
              <Link to={{pathname:"/show-list", state:{UserName: this.state.UserName,
                            PassWord: this.state.PassWord,
                            userId: this.state.userId}}} className="btn btn-outline-warning float-left">
                  Back
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
              <Link to={{pathname:`/edit-Post/${post._id}`, 
                            state:{UserName: this.state.UserName,
                            PassWord: this.state.PassWord,
                            userId: this.state.userId}}} className="btn btn-outline-info btn-lg btn-block">
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