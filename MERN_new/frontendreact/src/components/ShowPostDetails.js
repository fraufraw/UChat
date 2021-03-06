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
      userId: this.props.history.location.state.userId,
      UserState: '',
      posterId:''
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
          Liked_number: res.data.Liked_number,
          posterId:res.data.posterId
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
    if(this.state.userId === this.state.post.posterId)
    {
    axios
      .delete('http://localhost:8082/api/posts/'+id)
      .then(res => {
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
    
    }else{
      this.setState({
        UserState:'Sorry, you are not the publisher of this post.'
      })
    };

  };

  onDeleteClickAllMessage (id) {
    if(this.state.userId === this.state.post.posterId){
    axios
      .delete('http://localhost:8082/api/message/'+id)
      .then(res => {
        //this.props.history.push('/show-Post/'+id);
      })
      .catch(err => {
        console.log("Error form ShowPostDetails_deleteClick");
      })
    
    refreshPage();
    }else{
      this.setState({
        UserState:'Sorry, you are not the publisher of this post.'
      })
    };
  };

  onDeleteClickThisMessage (id,messageid, messageuser) {
    if(this.state.userId === messageuser){
    axios
      .delete('http://localhost:8082/api/message/'+id+'/'+messageid)
      .then(res => {
        //this.props.history.push('/show-Post/'+id);
      })
      .catch(err => {
        console.log("Error form ShowPostDetails_deleteClick");
      })
    
    refreshPage();
    
    }else{
      this.setState({
        UserState:'Sorry, you are not the author of this message.'
      })
    };
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
    let commentList;
    if(!comments) {
        commentList = "there is no post record!";
      } else {
        commentList = comments.map((comment,k) =>
        <div key={k} className = "col-md-11">
          <br/>
          <table >
            <tbody>
              <td>{comment.author}:</td>
            </tbody>
          </table>
          <p id = "rcorners3" className = "col-md-11 m-auto">
            <td>{comment.text}</td>
            <br/>
            <button type="button" className="btn btn-outline-warning float-right tab " onClick={this.onDeleteClickThisMessage.bind(this,post._id,comment._id,comment.Userid)}>Delete</button>
            <button type="button" className="btn btn-outline-warning float-right " onClick={this.clickMessageAddLike.bind(this,comment.text,comment.author,comment.updated_date,comment.Message_liked_number,comment._id,post._id)}>Liked: {comment.Message_liked_number}</button>
            <br/>
            <br/>
          </p>
          <div className = 'text-float-right'>{comment.updated_date}</div>
      </div>
        );
      }

    let PostItem = <div>
      <p id = "rcorners1" className = 'title'>
          { post.title }
      </p>
      <table>
          <tbody>
            <td>Publisher:</td>
            <td><Link to={{pathname:`/othersposts/`, 
                            state:{UserName: this.state.UserName,
                            PassWord: this.state.PassWord,
                            userId: this.state.userId,
                            publisher: post.publisher}}}>
                   { post.publisher }
              </Link></td>
          </tbody>
      </table>
      <p id = "rcorners2" className = 'col-md-11 m-auto'>
            <td>{ post.description }</td>
            <button type="button" className="btn btn-outline-warning float-right" onClick={this.clickAddLike.bind(this,post._id)}>Liked: {post.Liked_number}</button>
            <br/>
            <br/>
      </p>
      <div className = 'text-float-right'>{ post.published_date }
      </div>
    </div>

    return (
      <div className="ShowPostDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-12 m-auto">
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
          <h4 className = 'warning'>{this.state.UserState}</h4>
          <div className="message">
          <br/>
          <h4 className = 'comment lead'>Comments: </h4>
          <div> 
            {commentList}
          </div>
          </div>
          
          <div className="row col-md-11 m-auto">
            <div className="col-md-6 ">
            <br/>
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClickAllMessage.bind(this,post._id)}>Clear Comments</button><br />
              {/*<h4 className = 'warning'>{this.state.UserState}</h4>*/}
            </div>

            <div className="col-md-6 ">
            <br/>
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,post._id)}>Delete Post</button><br />
            </div>
            <div className="col-md-6 ">
              <Link to={{pathname:`/edit-Post/${post._id}`, 
                            state:{UserName: this.state.UserName,
                            PassWord: this.state.PassWord,
                            userId: this.state.userId}}} className="btn btn-outline-info btn-lg btn-block">
                    Add Comment
              </Link>
              <br />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default showPostDetails;